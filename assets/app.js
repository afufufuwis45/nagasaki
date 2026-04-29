(function(){
  const spiral = document.querySelector('.spiral');
  if(!spiral) return;

  let autoRot = 0;
  let floatTick = 0;

  // ===== 調整ポイント =====
  const radius = 225;          // 螺旋の半径。大きくすると横に広がる
  const yStep = 46;            // 螺旋の縦間隔。狭めるなら40、広げるなら55
  const turnDeg = 38;          // 1枚ごとの回転角度。小さくすると密な螺旋、大きくするとばらける
  const autoRotSpeed = 0.055;  // 自動回転速度。遅くするなら0.03、速くするなら0.08
  const floatSpeed = 0.018;    // ふわっと上下する速度
  const floatRange = 18;       // ふわっと上下する幅
  const cameraZ = -270;        // 全体の奥行き。小さくすると近く、大きくすると遠く見える
  // =======================

  function layout(){
    const items = [...spiral.querySelectorAll('.spiral-item')];
    const count = items.length;
    if(count === 0) return;

    const centerIndex = (count - 1) / 2;

    items.forEach((el, i) => {
      const angle = i * turnDeg;
      const y = (i - centerIndex) * yStep;

      // クリックできる画像カードとして扱う。スクロール連動・ドラッグ操作はなし。
      el.style.transform =
        `rotateY(${angle}deg) translateZ(${radius}px) translateY(${y}px)`;
    });
  }

  function animate(){
    autoRot += autoRotSpeed;
    floatTick += floatSpeed;

    const floatY = Math.sin(floatTick) * floatRange;

    spiral.style.transform =
      `translateZ(${cameraZ}px) translateY(${floatY}px) rotateY(${autoRot}deg)`;

    requestAnimationFrame(animate);
  }

  layout();
  animate();
})();
