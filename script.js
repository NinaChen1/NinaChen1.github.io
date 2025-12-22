// 鼠标轨迹红点
const cursorDot = document.createElement('div');
cursorDot.classList.add('cursor-dot');
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', e => {
  cursorDot.style.left = e.clientX - 5 + 'px';
  cursorDot.style.top = e.clientY - 5 + 'px';
});

// 鼠标点击爱心
document.addEventListener('click', e => {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = (e.pageX - 10) + 'px';
  heart.style.top = (e.pageY - 10) + 'px';
  document.body.appendChild(heart);
  
  // 1秒后移除
  setTimeout(() => {
    heart.remove();
  }, 1000);
});
