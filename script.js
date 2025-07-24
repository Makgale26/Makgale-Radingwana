function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

function animateCount(id, end) {
  let start = 0;
  const speed = 19;
  const step = Math.ceil(end / 100);
  const el = document.getElementById(id);

  const timer = setInterval(() => {
    start += step;
    if (start >= end) {
      el.textContent = end;
      clearInterval(timer);
    } else {
      el.textContent = start;
    }
  }, speed);
}

window.addEventListener('DOMContentLoaded', () => {
  animateCount('exp', 1);
  animateCount('proj', 5);
  animateCount('tech', 8);
  animateCount('commits', 500);
});
