const canvas = document.getElementById('cursor-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const circles = [];

document.addEventListener('mousemove', e => {
  for (let i=0; i<5; i++) {
    circles.push({
      x: e.clientX + (Math.random()*10-5),
      y: e.clientY + (Math.random()*10-5),
      alpha: 1,
      radius: 4
    });
  }
});

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let i = 0; i < circles.length; i++) {
    const c = circles[i];
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.radius, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,75,92,${c.alpha})`;
    ctx.fill();
    c.alpha -= 0.008;
    if (c.alpha <= 0) {
      circles.splice(i,1);
      i--;
    }
  }
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.addEventListener('click', e => {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = (e.pageX - 10) + 'px';
  heart.style.top = (e.pageY - 10) + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
});

