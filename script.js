gsap.registerPlugin(ScrollTrigger);

// Hero 区域动画：滚动时淡出
gsap.to(".hero", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",  // 当 .hero 区域的顶部到达视口顶部时开始
    end: "bottom top", // 当 .hero 区域的底部到达视口顶部时结束
    scrub: true,       // 让动画随着滚动进度平滑过渡
  }
});

// About Me 区域动画：滚动时滑入并淡入
gsap.to(".about", {
  opacity: 1,
  transform: "translateY(0)",
  duration: 1.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",  // 当 .about 区域的顶部到达视口 80% 时开始
    end: "top 20%",    // 当 .about 区域的顶部到达视口 20% 时结束
    scrub: true,       // 滚动控制动画
  }
});


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

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<points.length;i++){
    const p = points[i];
    ctx.beginPath();
    ctx.arc(p.x,p.y,3,0,Math.PI*2); // 点大小
    ctx.fillStyle = `rgba(255,0,0,${p.alpha})`;
    ctx.fill();
    p.alpha *= 0.92; // 渐隐
  }
  requestAnimationFrame(animate);
}
animate();
