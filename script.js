  function scrollToAbout() {
  const aboutSection = document.getElementById('about');
  aboutSection.scrollIntoView({ behavior: 'smooth' }); // 平滑滚动到 About Me 部分
}

// 鼠标拖尾
const canvas = document.getElementById('cursorTrail');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const points = [];
const maxPoints = 60; // 拖尾点数
window.addEventListener('mousemove', e => {
  points.push({x:e.clientX, y:e.clientY, alpha:1});
  if(points.length>maxPoints) points.shift();
});

function animateTrail() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<points.length;i++){
    const p = points[i];
    ctx.beginPath();
    ctx.arc(p.x,p.y,3,0,Math.PI*2); // 点大小
    ctx.fillStyle = `rgba(255,0,0,${p.alpha})`;
    ctx.fill();
    p.alpha *= 0.92; // 渐隐
  }
  requestAnimationFrame(animateTrail);
}
animateTrail();


