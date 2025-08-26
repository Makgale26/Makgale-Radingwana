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

  // Form validation and submission
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      let isValid = true;
      
      // Clear previous errors
      document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
      });
      
      // Validate name
      if (name.length < 2) {
        showError('name-error', 'Name must be at least 2 characters long');
        isValid = false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate message
      if (message.length < 10) {
        showError('message-error', 'Message must be at least 10 characters long');
        isValid = false;
      }
      
      if (isValid) {
        // Simulate form submission
        submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
        submitBtn.disabled = true;
        
        setTimeout(() => {
          contactForm.reset();
          submitBtn.innerHTML = '<i class="bi bi-send"></i> Send Message';
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  }

  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


