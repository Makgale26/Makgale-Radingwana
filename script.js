// Theme toggle function
function toggleTheme() {
  document.body.classList.toggle('light-mode');
  const toggle = document.getElementById('theme-toggle');
  const icon = toggle.querySelector('i');
  
  if (document.body.classList.contains('light-mode')) {
    localStorage.setItem('theme', 'light');
    icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
  } else {
    localStorage.setItem('theme', 'dark');
    icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
  }
}

// Animate stats counting
function animateCount(id, end) {
  let start = 0;
  const speed = 30;
  const step = Math.ceil(end / 100);
  const el = document.getElementById(id);
  const h3 = el.closest('h3');

  const timer = setInterval(() => {
    start += step;
    if (start >= end) {
      el.textContent = end;
      clearInterval(timer);
      // Fade in the number
      if (h3) {
        h3.style.opacity = 1;
        h3.style.transform = 'translateY(0)';
      }
    } else {
      el.textContent = start;
    }
  }, speed);
}

// Typing animation
function initTypingAnimation() {
  const texts = [
    "Develop full-stack applications with React, Node.js, and MongoDB.",
    "Design responsive, user-friendly web interfaces and APIs.",
    "Analyze data, automate workflows, and manage cloud deployments.",
    "Perform cybersecurity analysis and implement security best practices."
  ];
  
  const typingText = document.querySelector(".typing-text");
  if (!typingText) return;
  
  let index = 0;
  let charIndex = 0;

  function type() {
    if (index < texts.length) {
      if (charIndex <= texts[index].length) {
        typingText.textContent = texts[index].substring(0, charIndex);
        charIndex++;
        setTimeout(type, 80);
      } else {
        setTimeout(erase, 1500);
      }
    } else {
      index = 0;
      setTimeout(type, 500);
    }
  }

  function erase() {
    if (charIndex >= 0) {
      typingText.textContent = texts[index].substring(0, charIndex);
      charIndex--;
      setTimeout(erase, 30);
    } else {
      index++;
      setTimeout(type, 500);
    }
  }

  type();
}

// Initialize stats animation
function initStats() {
  // Animate counts
  animateCount('exp', 1);
  animateCount('proj', 5);
  animateCount('tech', 8);
  animateCount('commits', 500);
}

// Initialize theme toggle
function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const icon = toggle.querySelector('i');

  // Check saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
  }
}

// Initialize navigation
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navTabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('show');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Update active tab based on scroll position
  function updateActiveTab() {
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navTabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('href') === `#${currentSection}`) {
        tab.classList.add('active');
      }
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove active class from all tabs
      navTabs.forEach(tab => tab.classList.remove('active'));

      // Add active class to clicked tab
      if (this.classList.contains('nav-tab')) {
        this.classList.add('active');
      }

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

      // Close mobile menu if open
      if (navLinks) navLinks.classList.remove('show');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Update active tab on scroll
  window.addEventListener('scroll', updateActiveTab);
  updateActiveTab();
}

// Initialize contact form
function initContactForm() {
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
}

// Graphics section category filtering
function initGraphicsFilter() {
  const categoryTabs = document.querySelectorAll('.category-tab');
  const designCards = document.querySelectorAll('.design-card');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      categoryTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      // Filter design cards
      designCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initTypingAnimation();
  initStats();
  initContactForm();
  initThemeToggle();
  initGraphicsFilter();
});