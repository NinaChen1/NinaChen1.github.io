/* ------------------ About Me & Hero 等逻辑可自行添加 ------------------ */

/* ------------------ Projects 数据 & 模态 ------------------ */
const projectData = [
  {
    title: "Smart Trash Can",
    desc: "An intelligent trash can that sorts waste automatically.",
    images: ["https://images.unsplash.com/photo-1581578017426-1c6c6c8f6b8b","https://images.unsplash.com/photo-1581578017426-1c6c6c8f6b8b?crop=entropy&cs=tinysrgb"],
    videos: ["videos/demo1.mp4"],
    docs: [{name:"Specification PDF", link:"documents/spec1.pdf"}]
  },
  { title: "Health Monitoring System", desc: "Wearable sensors to monitor vital signs in real time.", images:["https://images.unsplash.com/photo-1581090700227-1e37b190418e"], videos:["videos/demo2.mp4"], docs:[{name:"User Manual", link:"documents/manual2.pdf"}] }
];

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

/* ------------------ 项目卡片点击模态 ------------------ */
const modal=document.getElementById('projectModal');
const closeBtn=modal.querySelector('.modal-close');
const modalTitle=document.getElementById('modalTitle');
const modalDesc=document.getElementById('modalDesc');
const modalImages=document.getElementById('modalImages');
const imagesWrapper=modalImages.querySelector('.images-wrapper');
const prevBtn=modalImages.querySelector('.prev-btn');
const nextBtn=modalImages.querySelector('.next-btn');
const modalVideos=document.getElementById('modalVideos');
const modalDocs=document.getElementById('modalDocs');
let currentImageIndex=0;

cards.forEach(card=>{
  card.addEventListener('click',()=>{
    const index=card.dataset.index;
    const data=projectData[index]; if(!data) return;
    modal.style.display='flex';
    modalTitle.textContent=data.title;
    modalDesc.textContent=data.desc;

    imagesWrapper.innerHTML='';
    data.images.forEach(src=>{const img=document.createElement('img'); img.src=src; imagesWrapper.appendChild(img);});
    currentImageIndex=0; updateModalImages();

    modalVideos.innerHTML='';
    if(data.videos) data.videos.forEach(src=>{const video=document.createElement('video'); video.controls=true; video.style.width='100%'; video.style.marginTop='20px'; video.src=src; modalVideos.appendChild(video);});

    modalDocs.innerHTML='';
    if(data.docs) data.docs.forEach(d=>{const a=document.createElement('a'); a.href=d.link; a.target='_blank'; a.textContent=d.name; modalDocs.appendChild(a);});
  });
});

function updateModalImages(){
  const imgs=imagesWrapper.querySelectorAll('img');
  imgs.forEach((img,i)=>{img.classList.toggle('active',i===currentImageIndex);});
  imagesWrapper.style.transform=`translateX(-${currentImageIndex*imagesWrapper.clientWidth}px)`;
}

prevBtn.addEventListener('click',()=>{if(currentImageIndex>0) currentImageIndex--; updateModalImages();});
nextBtn.addEventListener('click',()=>{if(currentImageIndex<imagesWrapper.children.length-1) currentImageIndex++; updateModalImages();});
imagesWrapper.addEventListener('mousedown',e=>{isDown=true; startX=e.pageX-imagesWrapper.offsetLeft; scrollLeft=currentImageIndex*imagesWrapper.clientWidth;});
imagesWrapper.addEventListener('mouseup',e=>{isDown=false; const x=e.pageX-imagesWrapper.offsetLeft; const walk=startX-x; if(walk>50 && currentImageIndex<imagesWrapper.children.length-1) currentImageIndex++; if(walk<-50 && currentImageIndex>0) currentImageIndex--; updateModalImages();});

closeBtn.addEventListener('click',()=>modal.style.display='none');
window.addEventListener('click',e=>{if(e.target===modal) modal.style.display='none';});

/* ------------------ 鼠标拖尾 ------------------ */
const canvas=document.getElementById('cursorTrail');
const ctx=canvas.getContext('2d');
let trail=[]; canvas.width=window.innerWidth; canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{canvas.width=window.innerWidth; canvas.height=window.innerHeight;});
window.addEventListener('mousemove',e=>{trail.push({x:e.clientX,y:e.clientY,life:120});});
function animateTrail(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  trail.forEach(p=>{ctx.fillStyle=`rgba(255,0,0,${p.life/120})`; ctx.beginPath(); ctx.arc(p.x,p.y,3,0,Math.PI*2); ctx.fill(); p.life--;});
  trail=trail.filter(p=>p.life>0);
  requestAnimationFrame(animateTrail);
}
animateTrail();
