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

// 鼠标轨迹效果
// 鼠标拖尾（应用于整个网页）
const trailContainer = document.createElement('div');
trailContainer.id = 'cursor-trail-container';
document.body.appendChild(trailContainer);

let lastMouse = { x: 0, y: 0 };
let dots = [];

// 鼠标移动记录位置
document.addEventListener('mousemove', e => {
  lastMouse.x = e.clientX;
  lastMouse.y = e.clientY;
});

// 每帧生成拖尾点
function animateTrail() {
  const dot = document.createElement('div');
  dot.className = 'trail-dot';
  dot.style.left = lastMouse.x + 'px';
  dot.style.top = lastMouse.y + 'px';
  trailContainer.appendChild(dot);

  dots.push(dot);

  // 保持最多 100 个点，删除老点
  if (dots.length > 100) {
    const oldDot = dots.shift();
    oldDot.remove();
  }

  // 逐渐缩小和淡出
  setTimeout(() => {
    dot.style.opacity = 0;
    dot.style.transform = 'scale(0)';
  }, 10);

  requestAnimationFrame(animateTrail);
}

animateTrail();
