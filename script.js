// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

// 获取所有项目
const projects = document.querySelectorAll('.project-item');

// 为每个项目添加动画
projects.forEach((project) => {
  gsap.fromTo(project,
    {
      opacity: 0,          // 初始透明
      y: 100,              // 初始下移
      rotationX: -15,      // 初始旋转
    },
    {
      opacity: 1,          // 滚动后变为完全不透明
      y: 0,                // 滚动后恢复正常位置
      rotationX: 0,        // 恢复正常角度
      duration: 1.2,       // 动画持续时间
      ease: "power2.out",  // 缓动效果
      scrollTrigger: {
        trigger: project,          // 触发的元素
        start: "top 80%",           // 项目顶部到达视口80%时开始
        end: "top 20%",             // 项目顶部到达视口20%时结束
        scrub: true                 // 使动画随着滚动进度变化
      }
    }
  );
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
