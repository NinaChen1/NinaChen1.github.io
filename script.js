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

// 简单的翻书效果 - 只在 Hero 和 About Me 之间
document.addEventListener('DOMContentLoaded', function() {
    const pageTurner = document.getElementById('pageTurner');
    const heroSection = document.getElementById('hero');
    const aboutSection = document.getElementById('about');
    const navLinks = document.querySelectorAll('.nav a');
    
    let isTransitioning = false;
    let isAtHero = true; // 当前在 Hero 页面
    
    // 检查是否应该触发翻页
    function checkScroll() {
        if (isTransitioning) return;
        
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // 当 Hero 的底部接近视口顶部时（向下滚动到 About）
        if (isAtHero && heroBottom < windowHeight * 0.3) {
            flipToAbout();
        }
        
        // 当 About 的顶部接近视口底部时（向上滚动回 Hero）
        if (!isAtHero && window.scrollY < heroSection.offsetHeight * 0.5) {
            flipToHero();
        }
    }
    
    // 翻到 About
    function flipToAbout() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        pageTurner.style.display = 'block';
        pageTurner.style.opacity = '1';
        pageTurner.style.transform = 'rotateX(0deg)';
        pageTurner.classList.add('turning');
        
        // 强制重绘
        pageTurner.offsetHeight;
        
        // 开始动画
        setTimeout(() => {
            // 动画完成后
            setTimeout(() => {
                pageTurner.style.display = 'none';
                pageTurner.classList.remove('turning');
                isAtHero = false;
                isTransitioning = false;
            }, 1000);
        }, 10);
    }
    
    // 翻回 Hero
    function flipToHero() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        pageTurner.style.display = 'block';
        pageTurner.style.opacity = '1';
        pageTurner.style.transform = 'rotateX(90deg)';
        pageTurner.classList.add('turning');
        
        // 强制重绘
        pageTurner.offsetHeight;
        
        // 反向动画
        setTimeout(() => {
            pageTurner.style.transform = 'rotateX(0deg)';
            
            // 动画完成后
            setTimeout(() => {
                pageTurner.style.display = 'none';
                pageTurner.classList.remove('turning');
                isAtHero = true;
                isTransitioning = false;
            }, 1000);
        }, 10);
    }
    
    // 监听滚动
    window.addEventListener('scroll', checkScroll);
    
    // 导航栏点击处理
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#about' && isAtHero) {
                e.preventDefault();
                flipToAbout();
                // 手动滚动到 About
                setTimeout(() => {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            } else if (href === '#hero' && !isAtHero) {
                e.preventDefault();
                flipToHero();
                // 手动滚动到 Hero
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 500);
            }
        });
    });
    
    // 初始化检查
    function init() {
        // 检查初始位置
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;
        isAtHero = scrollPosition < heroSection.offsetHeight * 0.7;
        pageTurner.style.display = 'none';
    }
    
    // 页面加载完成后初始化
    setTimeout(init, 100);
});
