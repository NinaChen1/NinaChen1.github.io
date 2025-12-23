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
const trailContainer = document.getElementById("cursor-trail-container");
document.addEventListener("mousemove", e => {
  const dot = document.createElement("div");
  dot.className = "trail-dot";
  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";
  trailContainer.appendChild(dot);

  // 2秒后消失
  setTimeout(() => {
    dot.remove();
  }, 2000);
});
