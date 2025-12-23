/* ------------------ About Me 淡入 ------------------ */
const fadeElements=document.querySelectorAll('.fade-in');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('show');}
  });
},{threshold:0.3});
fadeElements.forEach(el=>observer.observe(el));

/* ------------------ 3D 滚盘效果 + 惯性回弹 ------------------ */
const carousel = document.getElementById('projectsCarousel');
const cards = carousel.querySelectorAll('.project-card');
let isDown=false,startX,scrollLeft,velocity=0,rafId=null;

function updateCarousel(){
  const centerX = carousel.getBoundingClientRect().left + carousel.clientWidth/2;
  cards.forEach(card=>{
    const rect=card.getBoundingClientRect();
    const cardCenter=rect.left + rect.width/2;
    const offset=(centerX-cardCenter)/rect.width;
    const scale=Math.max(0.8,1.3-Math.abs(offset)*0.5);
    const rotateY=Math.max(-25,Math.min(25, offset*25));
    const translateX = offset*20;
    const translateZ = (1-Math.min(Math.abs(offset),1))*50;
    const shadow = 10 + (1 - Math.abs(offset))*50;
    card.style.transform=`translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`;
    card.style.boxShadow=`0 ${shadow}px ${shadow*2}px rgba(0,0,0,0.6)`;
    card.style.zIndex=Math.floor((1-Math.abs(offset))*100);
  });
}
updateCarousel();
window.addEventListener('resize',updateCarousel);

carousel.addEventListener('mousedown',e=>{isDown=true;startX=e.pageX-carousel.offsetLeft;scrollLeft=carousel.scrollLeft;velocity=0;if(rafId) cancelAnimationFrame(rafId);});
carousel.addEventListener('mouseleave',()=>{isDown=false;});
carousel.addEventListener('mouseup',()=>{isDown=false;startInertia();});
carousel.addEventListener('mousemove',e=>{if(!isDown) return; e.preventDefault(); const x=e.pageX-carousel.offsetLeft; const walk=startX-x; carousel.scrollLeft=scrollLeft+walk; velocity=walk; updateCarousel();});

function startInertia(){
  let decay=0.95;
  function step(){
    carousel.scrollLeft+=velocity;
    velocity*=decay;
    if(carousel.scrollLeft<0){velocity=0; carousel.scrollLeft=0;}
    if(carousel.scrollLeft>carousel.scrollWidth-carousel.clientWidth){velocity=0; carousel.scrollLeft=carousel.scrollWidth-carousel.clientWidth;}
    updateCarousel();
    if(Math.abs(velocity)>0.5) rafId=requestAnimationFrame(step);
    else snapToCenter();
  }
  rafId=requestAnimationFrame(step);
}

function snapToCenter(){
  const centerX=carousel.getBoundingClientRect().left+carousel.clientWidth/2;
  let closest=cards[0],minDist=Infinity;
  cards.forEach(card=>{const rect=card.getBoundingClientRect(); const dist=Math.abs((rect.left+rect.width/2)-centerX); if(dist<minDist){minDist=dist;closest=card;}});
  const rect=closest.getBoundingClientRect();
  const offset=(rect.left+rect.width/2)-centerX;
  smoothScroll(offset);
}
function smoothScroll(offset){
  let duration=300,start=carousel.scrollLeft,startTime=performance.now();
  function animate(time){
    let elapsed=time-startTime;
    let progress=Math.min(elapsed/duration,1);
    carousel.scrollLeft=start+offset*progress;
    updateCarousel();
    if(progress<1) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

/* ------------------ 鼠标拖尾 ------------------ */
const canvas=document.getElementById('cursorTrail');
const ctx=canvas.getContext('2d');
let trail=[]; canvas.width=window.innerWidth; canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{canvas.width=window.innerWidth; canvas.height=window.innerHeight;});
window.addEventListener('mousemove',e=>{trail.push({x:e.clientX,y:e.clientY,life:200});});
function animateTrail(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  trail.forEach(p=>{ctx.fillStyle=`rgba(255,0,0,${p.life/200})`; ctx.beginPath(); ctx.arc(p.x,p.y,10,0,Math.PI*2); ctx.fill(); p.life--;});
  trail=trail.filter(p=>p.life>0);
  requestAnimationFrame(animateTrail);
}
animateTrail();

