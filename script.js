/* ======================
   Intersection Observer
   控制 About Me 动画触发
====================== */
const aboutSection = document.getElementById("about");
const lines = document.querySelectorAll(".line");
const photo = document.getElementById("aboutPhoto");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        // 文本逐行出现（Apple keynote 节奏）
        lines.forEach((line, index) => {
          setTimeout(() => {
            line.classList.add("show");
          }, index * 200);
        });

        // 照片出现
        photo.classList.add("show");

        // 只触发一次
        observer.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(aboutSection);

/* ======================
   点击照片浮动
====================== */
photo.addEventListener("click", () => {
  photo.classList.toggle("float");
});

/* ======================
   鼠标红点延迟跟随
====================== */
const cursorDot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", e => {
  cursorDot.style.transform =
    `translate(${e.clientX}px, ${e.clientY}px)`;
});
