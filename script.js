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

// 翻书效果 - 只在 Hero 和 About Me 之间
document.addEventListener('DOMContentLoaded', function() {
    const pageTransition = document.getElementById('pageTransition');
    const heroSection = document.getElementById('hero');
    const aboutSection = document.getElementById('about');
    const heroWrapper = document.getElementById('heroWrapper');
    const navLinks = document.querySelectorAll('.nav a');
    
    let isTransitioning = false;
    let currentPage = 'hero'; // 'hero' 或 'about'
    
    // 页面状态管理
    function showHeroPage() {
        heroWrapper.style.zIndex = '3'; // Hero 在最前面
        heroWrapper.style.pointerEvents = 'auto';
        aboutSection.style.zIndex = '2';
        aboutSection.style.pointerEvents = 'none';
        currentPage = 'hero';
        
        // 确保滚动到顶部
        window.scrollTo(0, 0);
    }
    
    function showAboutPage() {
        heroWrapper.style.zIndex = '2';
        heroWrapper.style.pointerEvents = 'none';
        aboutSection.style.zIndex = '3'; // About 在最前面
        aboutSection.style.pointerEvents = 'auto';
        currentPage = 'about';
        
        // 滚动到 About 部分
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 翻书过渡动画
    function flipToAbout(callback) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // 显示过渡层在 Hero 上方
        pageTransition.style.zIndex = '4';
        pageTransition.style.display = 'block';
        pageTransition.style.opacity = '1';
        pageTransition.style.transform = 'rotateX(0deg)';
        pageTransition.classList.remove('flip-back');
        
        // 强制重绘
        pageTransition.offsetHeight;
        
        // 开始向前翻转动画
        setTimeout(() => {
            pageTransition.classList.add('flip-forward');
            
            // 动画完成后切换到 About 页面
            setTimeout(() => {
                showAboutPage();
                pageTransition.style.display = 'none';
                pageTransition.classList.remove('flip-forward');
                isTransitioning = false;
                if (callback) callback();
            }, 800);
        }, 50);
    }
    
    function flipToHero(callback) {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        // 先确保在 About 页面前
        pageTransition.style.zIndex = '4';
        pageTransition.style.display = 'block';
        pageTransition.style.opacity = '1';
        pageTransition.style.transform = 'rotateX(0deg)';
        pageTransition.classList.remove('flip-forward');
        
        // 强制重绘
        pageTransition.offsetHeight;
        
        // 开始向后翻转动画
        setTimeout(() => {
            pageTransition.classList.add('flip-back');
            
            // 动画完成后切换到 Hero 页面
            setTimeout(() => {
                showHeroPage();
                pageTransition.style.display = 'none';
                pageTransition.classList.remove('flip-back');
                isTransitioning = false;
                if (callback) callback();
            }, 800);
        }, 50);
    }
    
    // 监听滚动事件 - 从 Hero 翻到 About
    let hasFlipped = false;
    window.addEventListener('scroll', function() {
        if (currentPage !== 'hero') return;
        
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const heroHeight = heroSection.offsetHeight;
        
        // 当滚动超过 Hero 高度的 30% 时触发翻页
        if (!hasFlipped && scrollTop > heroHeight * 0.3) {
            flipToAbout();
            hasFlipped = true;
        }
        
        // 如果回到顶部，重置标志
        if (hasFlipped && scrollTop < heroHeight * 0.1) {
            hasFlipped = false;
        }
    });
    
    // 导航栏点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#hero' && currentPage === 'about') {
                e.preventDefault();
                flipToHero();
            } else if (href === '#about' && currentPage === 'hero') {
                e.preventDefault();
                flipToAbout();
            }
            // 如果已经在目标页面，让默认的锚点跳转工作
        });
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' && currentPage === 'hero') {
            flipToAbout();
        } else if (e.key === 'ArrowUp' && currentPage === 'about') {
            flipToHero();
        } else if (e.key === 'Home') {
            if (currentPage === 'about') {
                flipToHero();
            }
        } else if (e.key === 'End') {
            if (currentPage === 'hero') {
                flipToAbout();
            }
        }
    });
    
    // 初始化页面状态
    function initPageState() {
        // 检测初始滚动位置
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const heroHeight = heroSection.offsetHeight;
        
        if (scrollTop > heroHeight * 0.5) {
            // 如果页面加载时已经在 About 区域
            currentPage = 'about';
            showAboutPage();
        } else {
            // 正常在 Hero 区域
            currentPage = 'hero';
            showHeroPage();
        }
        
        hasFlipped = (currentPage === 'about');
    }
    
    // 页面加载完成后初始化
    setTimeout(() => {
        initPageState();
        pageTransition.style.display = 'none';
    }, 100);
});
