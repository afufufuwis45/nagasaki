(function(){
  const spiral = document.querySelector('.spiral');
  const wrap = document.querySelector('.spiral-wrap');
  if(!spiral || !wrap) return;

  let autoRot = 0;
  let autoY = 0;
  let dragRot = 0;
  let scrollY = 0;

  // 調整ポイント
  const radius = 220;
  const yStep = 54;        // 螺旋の縦間隔。狭めたい場合は小さく、広げたい場合は大きくする
  const turnDeg = 42;      // 1枚ごとの回転角度
  const descendLimit = 300;

  let isDragging = false;
  let startX = 0;
  let startRot = 0;

  function layout(){
    const items = [...spiral.querySelectorAll('.spiral-item')];
    const centerIndex = (items.length - 1) / 2;
    items.forEach((el, i) => {
      const angle = i * turnDeg;
      const y = (i - centerIndex) * yStep;
      el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) translateY(${y}px)`;
    });
  }

  function updateScrollY(){
    const rect = wrap.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const center = rect.top + rect.height / 2;
    const progress = (vh / 2 - center) / vh;
    scrollY = progress * 220; // 縦スクロール時の上下移動量。大きくするとスクロール反応が強くなる
  }

  function animate(){
    autoRot += 0.08;       // 自動回転速度
    autoY += 0.12;         // 自動下降速度
    if(autoY > descendLimit) autoY = -descendLimit;

    const totalRot = autoRot + dragRot;
    const totalY = autoY + scrollY;
    spiral.style.transform = `translateZ(-265px) translateY(${totalY}px) rotateY(${totalRot}deg)`;
    requestAnimationFrame(animate);
  }

  // 縦スクロールで螺旋が上下に動く処理
  window.addEventListener('scroll', updateScrollY, { passive:true });
  window.addEventListener('resize', updateScrollY);

  // 横ドラッグ/横スワイプで螺旋を回す処理
  wrap.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startRot = dragRot;
    wrap.setPointerCapture?.(e.pointerId);
  });

  wrap.addEventListener('pointermove', (e) => {
    if(!isDragging) return;
    const dx = e.clientX - startX;
    dragRot = startRot + dx * 0.45;
  });

  function endDrag(e){
    isDragging = false;
    try { wrap.releasePointerCapture?.(e.pointerId); } catch(_) {}
  }
  wrap.addEventListener('pointerup', endDrag);
  wrap.addEventListener('pointercancel', endDrag);

  layout();
  updateScrollY();
  animate();
})();
