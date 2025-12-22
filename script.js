// 鼠标轨迹
const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

document.addEventListener('mousemove', e => {
  // 多生成几个点，使轨迹密集
  for (let i = 0; i < 5; i++) {
    particles.push({
      x: e.clientX + (Math.random() * 10 - 5),
      y: e.clientY + (Math.random() * 10 - 5),
      alpha: 1,
      radius: 4
    });
  }
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,75,92,${p.alpha})`;
    ctx.fill();
    p.alpha -= 0.008; // 持续约2秒
    if (p.alpha <= 0) {
      particles.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(draw);
}
draw();

// 调整窗口大小
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// 点击爱心
document.addEventListener('click', e => {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = (e.pageX - 10) + 'px';
  heart.style.top = (e.pageY - 10) + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
});

