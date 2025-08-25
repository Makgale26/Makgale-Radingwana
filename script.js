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
  function animateCount(id, end) {
    let start = 0;
    const speed = 19;
    const step = Math.ceil(end / 100);
    const el = document.getElementById(id);
    const h3 = el.closest('h3');
  
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        el.textContent = end;
        clearInterval(timer);
        // Fade in the number
        h3.style.opacity = 1;
        h3.style.transform = 'translateY(0)';
      } else {
        el.textContent = start;
      }
    }, speed);
  }

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
  "Develop full-stack applications with React, Node.js, and MongoDB.",
  "Design responsive, user-friendly web interfaces and APIs.",
  "Analyze data, automate workflows, and manage cloud deployments.",
  "Perform cybersecurity analysis and implement security best practices."
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
  const toggle = document.getElementById('theme-toggle');
  const icon = toggle.querySelector('i');

  // Check user's preference
  const isDark = localStorage.getItem('dark-mode') === 'enabled' || 
                 !window.matchMedia('(prefers-color-scheme: light)').matches;

  if (isDark) {
    document.body.classList.add('dark-mode'); // or however you apply dark mode
    icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
  } else {
    document.body.classList.remove('dark-mode');
    icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
      icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    } else {
      localStorage.setItem('dark-mode', 'disabled');
      icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }
  })

  // Mobile Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });


  // Start typing when page loads
  document.addEventListener("DOMContentLoaded", type);


