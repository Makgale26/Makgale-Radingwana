
// Typing Animation
function initTypingAnimation() {
  const typingText = document.querySelector('.typing-text');
  const texts = [
    'Full Stack Development',
    'Process Automation', 
    'Cybersecurity Analysis',
    'Data Analysis',
    'Graphic Design'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => { isDeleting = true; }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
    
    const typingSpeed = isDeleting ? 100 : 150;
    setTimeout(typeWriter, typingSpeed);
  }
  
  if (typingText) {
    setTimeout(typeWriter, 1000);
  }
}

// Navigation Functions
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

  // Listen for scroll events
  window.addEventListener('scroll', updateActiveTab);
  updateActiveTab(); // Initial call
}

// Theme Toggle Functions
window.toggleTheme = function() {
  const body = document.body;
  const themeIcon = document.querySelector('#theme-toggle i');
  
  body.classList.toggle('light-mode');
  
  if (body.classList.contains('light-mode')) {
    themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    localStorage.setItem('theme', 'dark');
  }
}

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

// Stats Animation
function animateStats() {
  const statNumbers = {
    exp: 2,
    proj: 15,
    tech: 12,
    commits: 500
  };

  Object.keys(statNumbers).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      const target = statNumbers[id];
      let current = 0;
      const increment = target / 50;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current);
      }, 50);
    }
  });
}

// Graphics Filter Functions
function initGraphicsFilter() {
  const categoryTabs = document.querySelectorAll('.category-tab');
  const designCards = document.querySelectorAll('.design-card');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      categoryTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      const category = tab.dataset.category;

      // Filter cards
      designCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Contact Form Functions
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Clear previous errors
    clearErrors();
    
    // Validate
    let isValid = true;
    
    if (!nameInput.value.trim()) {
      showError('name-error', 'Name is required');
      isValid = false;
    }
    
    if (!emailInput.value.trim()) {
      showError('email-error', 'Email is required');
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError('email-error', 'Please enter a valid email');
      isValid = false;
    }
    
    if (!messageInput.value.trim()) {
      showError('message-error', 'Message is required');
      isValid = false;
    }
    
    if (isValid) {
      // Simulate form submission
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        form.reset();
        submitBtn.innerHTML = '<i class="bi bi-send"></i> Send Message';
        submitBtn.disabled = false;
      }, 2000);
    }
  });

  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
      element.textContent = '';
      element.classList.remove('show');
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initTypingAnimation();
  initNavigation();
  initThemeToggle();
  initGraphicsFilter();
  initContactForm();
  
  // Animate stats when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.classList.contains('stats')) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  });
  
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
