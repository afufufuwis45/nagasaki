(function(){
  const spiral = document.querySelector('.spiral');
  const items = Array.from(document.querySelectorAll('.spiral-item'));
  if(!spiral || items.length === 0) return;

  const radius = 235;
  const yStep = 34;
  const turnDeg = 34;
  const rotSpeed = 0.045;
  const floatSpeed = 0.012;
  const floatRange = 25;
  let frame = 0;

  function layout(){
    const center = (items.length - 1) / 2;
    items.forEach((el, i) => {
      const angle = i * turnDeg;
      const y = (i - center) * yStep;
      el.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) translateY(${y}px)`;
    });
  }

  function animate(){
    frame += 1;
    const rot = frame * rotSpeed;
    const y = Math.sin(frame * floatSpeed) * floatRange;
    spiral.style.transform = `translateZ(-285px) translateY(${y}px) rotateY(${rot}deg)`;
    requestAnimationFrame(animate);
  }

  layout();
  animate();
})();
