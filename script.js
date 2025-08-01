// Theme toggle
function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

// Animate stats counting
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

document.addEventListener('DOMContentLoaded', () => {
  // Animate counts
  animateCount('exp', 1);
  animateCount('proj', 5);
  animateCount('tech', 8);
  animateCount('commits', 500);

  // Hamburger menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('show');
  });
});
