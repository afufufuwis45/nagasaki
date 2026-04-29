(function(){
  // 画像が存在する場合だけプレースホルダーを画像に置き換える
  document.querySelectorAll('.img-slot[data-img]').forEach(slot => {
    const src = slot.dataset.img;
    const img = new Image();
    img.onload = () => {
      slot.classList.add('has-image');
      slot.textContent = '';
      img.alt = slot.closest('a')?.innerText?.trim() || '旅の写真';
      slot.appendChild(img);
    };
    img.src = src;
  });

  const spiral = document.querySelector('.spiral');
  const wrap = document.querySelector('.spiral-wrap');
  if(!spiral || !wrap) return;

  const items = [...spiral.querySelectorAll('.spiral-item')];
  let rot = 0;
  let floatTick = 0;

  // 調整ポイント
  const radius = 235;      // 螺旋の横幅。大きくすると円が大きくなる
  const yStep = 54;        // 縦間隔。狭めるなら45、広げるなら65
  const turnDeg = 38;      // 1枚ごとの回転角度
  const rotSpeed = 0.045;  // 自動回転速度

  function layout(){
    const centerIndex = (items.length - 1) / 2;
    items.forEach((el, i) => {
      const angle = i * turnDeg;
      const y = (i - centerIndex) * yStep;
      el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) translateY(${y}px)`;
    });
  }

  function animate(){
    rot += rotSpeed;
    floatTick += 0.01;
    const floatY = Math.sin(floatTick) * 18;
    spiral.style.transform = `translateZ(-285px) translateY(${floatY}px) rotateY(${rot}deg)`;
    requestAnimationFrame(animate);
  }

  layout();
  animate();
})();
