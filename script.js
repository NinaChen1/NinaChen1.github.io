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

// 页面翻书效果
document.addEventListener('DOMContentLoaded', function() {
    const pageTransition = document.getElementById('pageTransition');
    const heroWrapper = document.getElementById('heroWrapper');
    const aboutSection = document.getElementById('about');
    const navLinks = document.querySelectorAll('.nav a');
    
    let isTransitioning = false;
    let transitionTriggered = false;
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // 当 About 部分进入视口时触发过渡
        if (!transitionTriggered && aboutPosition < windowHeight * 0.7) {
            startPageTransition();
            transitionTriggered = true;
        }
        
        // 如果向上滚动回到 Hero 区域，重置效果
        if (transitionTriggered && window.scrollY < windowHeight * 0.3) {
            resetPageTransition();
            transitionTriggered = false;
        }
    });
    
    // 导航链接点击处理
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#about' && !transitionTriggered) {
                e.preventDefault();
                startPageTransition(() => {
                    // 过渡完成后滚动到 About 部分
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                });
                transitionTriggered = true;
            }
        });
    });
    
    function startPageTransition(callback) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // 显示过渡层
        pageTransition.style.display = 'block';
        pageTransition.style.opacity = '1';
        pageTransition.classList.remove('visible');
        
        // 强制重绘
        pageTransition.offsetHeight;
        
        // 开始过渡动画
        setTimeout(() => {
            pageTransition.classList.add('visible');
            
            // 动画完成后隐藏过渡层
            setTimeout(() => {
                pageTransition.style.display = 'none';
                isTransitioning = false;
                if (callback) callback();
            }, 1200);
        }, 50);
    }
    
    function resetPageTransition() {
        pageTransition.classList.remove('visible');
        pageTransition.style.display = 'none';
    }
    
    // 添加键盘快捷键支持（可选）
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' && !transitionTriggered) {
            startPageTransition(() => {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            });
            transitionTriggered = true;
        }
    });
    
    // 初始化
    pageTransition.style.display = 'none';
});
