(function(){
  const spiral = document.querySelector('.spiral');
  const wrap = document.querySelector('.spiral-wrap');
  if(!spiral || !wrap) return;

  let autoRot = 0;
  let autoY = 0;
  let dragRot = 0;
  let scrollY = 0;

  // ===== 調整ポイント =====
  const radius = 220;      // 螺旋の半径
  const yStep = 45;        // 螺旋の縦間隔。狭めるなら45、広げるなら65くらい
  const turnDeg = 42;      // 1枚ごとの回転角度
  const autoRotSpeed = 0.08; // 自動回転速度
  const autoYSpeed = 0.12;   // 自動下降速度
  const scrollPower = 220;   // 縦スクロール時の上下移動量
  const dragPower = 0.45;    // 横スワイプ時の回転感度
  // =======================

  let isDragging = false;
  let startX = 0;
  let startRot = 0;

  function layout(){
    const items = [...spiral.querySelectorAll('.spiral-item')];
    const count = items.length;
    if(count === 0) return;

    const centerIndex = (count - 1) / 2;
    const loopHeight = count * yStep;

    items.forEach((el, i) => {
      const angle = i * turnDeg;

      // 基本位置 + 自動下降
      let y = (i - centerIndex) * yStep + autoY;

      // 無限ループ処理
      // 下に流れたものを自然に上へ戻す
      y = ((y + loopHeight / 2) % loopHeight + loopHeight) % loopHeight - loopHeight / 2;

      el.style.transform =
        `rotateY(${angle}deg) translateZ(${radius}px) translateY(${y}px)`;
    });
  }

  function updateScrollY(){
    const rect = wrap.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const center = rect.top + rect.height / 2;
    const progress = (vh / 2 - center) / vh;

    scrollY = progress * scrollPower;
  }

  function animate(){
    autoRot += autoRotSpeed;
    autoY += autoYSpeed;

    layout();

    const totalRot = autoRot + dragRot;

    spiral.style.transform =
      `translateZ(-265px) translateY(${scrollY}px) rotateY(${totalRot}deg)`;

    requestAnimationFrame(animate);
  }

  // 縦スクロールで螺旋全体が上下に動く
  window.addEventListener('scroll', updateScrollY, { passive:true });
  window.addEventListener('resize', updateScrollY);

  // 横ドラッグ / 横スワイプで螺旋を回す
  wrap.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startRot = dragRot;
    wrap.setPointerCapture?.(e.pointerId);
  });

  wrap.addEventListener('pointermove', (e) => {
    if(!isDragging) return;

    const dx = e.clientX - startX;
    dragRot = startRot + dx * dragPower;
  });

  function endDrag(e){
    isDragging = false;
    try {
      wrap.releasePointerCapture?.(e.pointerId);
    } catch(_) {}
  }

  wrap.addEventListener('pointerup', endDrag);
  wrap.addEventListener('pointercancel', endDrag);
  wrap.addEventListener('pointerleave', endDrag);

  layout();
  updateScrollY();
  animate();
})();
