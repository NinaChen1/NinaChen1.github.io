const aboutSection = document.getElementById("about");
const lines = document.querySelectorAll(".about-line span");
const image = document.getElementById("aboutImage");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      lines.forEach((line, index) => {
        setTimeout(() => {
          line.classList.add("show");
        }, index * 220);
      });

      image.classList.add("show");

      observer.disconnect();
    }
  });
}, {
  threshold: 0.5
});

observer.observe(aboutSection);
