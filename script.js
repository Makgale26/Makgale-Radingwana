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

  const texts = [
    "clean code and user-focused design.",
    "responsive websites and interactive apps.",
    "open-source projects and scalable solutions."
  ];
  const typingText = document.querySelector(".typing-text");
  let index = 0;
  let charIndex = 0;

  function type() {
    if (index < texts.length) {
      if (charIndex <= texts[index].length) {
        typingText.textContent = texts[index].substring(0, charIndex);
        charIndex++;
        setTimeout(type, 80); // Speed of typing (lower = faster)
      } else {
        // Pause before erasing
        setTimeout(erase, 1500);
      }
    } else {
      // Loop back to first phrase
      index = 0;
      setTimeout(type, 500);
    }
  }

  function erase() {
    if (charIndex >= 0) {
      typingText.textContent = texts[index].substring(0, charIndex);
      charIndex--;
      setTimeout(erase, 30); // Speed of erasing
    } else {
      index++;
      setTimeout(type, 500); // Delay before next phrase
    }
  }

  // Start typing when page loads
  document.addEventListener("DOMContentLoaded", type);


