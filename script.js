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

// 鼠标拖尾
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
  const dot = document.createElement('div');
  dot.className = 'trail-dot';
  dot.style.left = lastMouse.x + 'px';
  dot.style.top = lastMouse.y + 'px';
  trailContainer.appendChild(dot);
  dots.push(dot);
  if(dots.length > 120){
    const oldDot = dots.shift();
    oldDot.remove();
  }
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

// Projects Modal
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = modal.querySelector('.modal-close');

cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    modal.style.display = 'block';
    modalBody.innerHTML = `
      <h2>Project ${index + 1} Details</h2>
      <p>Description of this project goes here.</p>
      <img src="${card.style.backgroundImage.slice(5, -2)}" style="width:100%;margin-top:20px;border-radius:12px;">
      <video controls style="width:100%; margin-top:20px;">
        <source src="videos/demo${index+1}.mp4" type="video/mp4">
      </video>
    `;
  });
});

closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => {
  if(e.target === modal) modal.style.display = 'none';
});
