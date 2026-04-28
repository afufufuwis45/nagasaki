(function(){
  const spiral = document.querySelector('.spiral');
  if(!spiral) return;

  let autoRot = 0;
  let autoY = 0;
  const radius = 220;
  const yStep = 74;
  const turnDeg = 42;
  const descendLimit = 360;

  function layout(){
    const items = [...spiral.querySelectorAll('.spiral-item')];
    const centerIndex = (items.length - 1) / 2;
    items.forEach((el, i) => {
      const angle = i * turnDeg;
      const y = (i - centerIndex) * yStep;
      el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) translateY(${y}px)`;
    });
  }

  function animate(){
    autoRot += 0.12;        // 回転速度：大きくすると速くなる
    autoY += 0.18;          // 下降速度：大きくすると速く下がる
    if(autoY > descendLimit) autoY = -descendLimit;

    spiral.style.transform = `translateZ(-265px) translateY(${autoY}px) rotateY(${autoRot}deg)`;
    requestAnimationFrame(animate);
  }

  layout();
  animate();
})();
