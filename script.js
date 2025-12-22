// ----------------- 鼠标轨迹 -----------------
const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circles = [];

document.addEventListener('mousemove', e => {
  circles.push({
    x: e.clientX,
    y: e.clientY,
    alpha: 1,
    radius: 5
  });
});

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for (let i = 0; i < circles.length; i++) {
    const c = circles[i];
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,0,0,${c.alpha})`;
    ctx.fill();
    c.alpha -= 0.01; // 持续时间约2秒
    if (c.alpha <= 0) {
      circles.splice(i,1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}
animate();

// 调整窗口大小
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ----------------- 点击爱心 -----------------
document.addEventListener('click', e => {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = (e.pageX - 10) + 'px';
  heart.style.top = (e.pageY - 10) + 'px';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);
});
