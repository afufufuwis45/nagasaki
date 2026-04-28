(function(){
  const spiral=document.querySelector('.spiral');
  if(!spiral)return;
  let rot=0, lastX=null;
  const layout=()=>{
    const cards=[...spiral.querySelectorAll('.spiral-item')];
    cards.forEach((el,i)=>{
      const angle=i*72;
      const y=(i-1.5)*118;
      el.style.transform=`rotateY(${angle}deg) translateZ(210px) translateY(${y}px)`;
    });
    update();
  };
  const update=()=>{spiral.style.transform=`translateZ(-240px) rotateY(${rot}deg)`};
  window.addEventListener('scroll',()=>{spiral.style.top=(48+window.scrollY*.03)+'%';},{passive:true});
  window.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){rot+=e.deltaX*.22;update();}},{passive:true});
  spiral.parentElement.addEventListener('touchstart',e=>{lastX=e.touches[0].clientX},{passive:true});
  spiral.parentElement.addEventListener('touchmove',e=>{if(lastX==null)return;const x=e.touches[0].clientX;rot+=(x-lastX)*.55;lastX=x;update();},{passive:true});
  layout();
})();
