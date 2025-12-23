// About Me 动画
const aboutSection = document.getElementById("about");
const lines = document.querySelectorAll(".about-line span");
const image = document.getElementById("aboutImage");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      lines.forEach((line, idx) => {
        setTimeout(() => line.classList.add("show"), idx * 250);
      });
      image.classList.add("show");
      observer.disconnect();
    }
  });
}, { threshold: 0.5 });

observer.observe(aboutSection);

// 鼠标拖尾（全局自然密集）
const trailContainer = document.createElement('div');
trailContainer.id = 'cursor-trail-container';
document.body.appendChild(trailContainer);

let lastMouse = { x: 0, y: 0 };
let dots = [];

document.addEventListener('mousemove', e => {
  lastMouse.x = e.clientX;
  lastMouse.y = e.clientY;
});

function animateTrail() {
  // 每帧生成一个点
  const dot = document.createElement('div');
  dot.className = 'trail-dot';
  dot.style.left = lastMouse.x + 'px';
  dot.style.top = lastMouse.y + 'px';
  trailContainer.appendChild(dot);
  dots.push(dot);

  // 最多 120 个点
  if(dots.length > 120){
    const oldDot = dots.shift();
    oldDot.remove();
  }

  // 渐隐缩小
  setTimeout(()=>{
    dot.style.opacity = 0;
    dot.style.transform = 'scale(0)';
  },10);

  requestAnimationFrame(animateTrail);
}
animateTrail();

// About Me 图片 Parallax
document.querySelector('.about-inner').addEventListener('mousemove', e => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  image.style.transform = `translate(${x*10 -5}px, ${y*10 -5}px) scale(1.02)`;
});
document.querySelector('.about-inner').addEventListener('mouseleave', () => {
  image.style.transform = 'translate(0,0) scale(1)';
});

// Projects 中心卡片放大
const carousel = document.getElementById('projectsCarousel');
const cards = carousel.querySelectorAll('.project-card');

function updateCenterCard() {
  const carouselRect = carousel.getBoundingClientRect();
  const carouselCenter = carouselRect.left + carouselRect.width / 2;

  cards.forEach(card => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const offset = Math.abs(carouselCenter - cardCenter);

    if(offset < cardRect.width / 2){
      card.classList.add('center');
    } else {
      card.classList.remove('center');
    }
  });
}

updateCenterCard();
carousel.addEventListener('scroll', ()=>requestAnimationFrame(updateCenterCard));
window.addEventListener('resize', updateCenterCard);
