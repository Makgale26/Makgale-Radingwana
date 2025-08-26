
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
    themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
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
    icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
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

  Object.keys(statNumbers).forEach((id, index) => {
    const element = document.getElementById(id);
    
    if (element) {
      const target = statNumbers[id];
      let current = 0;
      const duration = 2000;
      const totalSteps = 60;
      const stepTime = duration / totalSteps;
      
      // Reset to 0 first
      element.textContent = '0';
      
      // Add delay for each stat
      setTimeout(() => {
        const timer = setInterval(() => {
          if (target <= 20) {
            // For small numbers, increment by 1
            current += 1;
          } else if (target <= 100) {
            // For medium numbers, increment by 2-3
            current += Math.ceil(target / 30);
          } else {
            // For large numbers, increment more
            current += Math.ceil(target / 40);
          }
          
          if (current >= target) {
            current = target;
            element.textContent = target;
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(current);
          }
        }, stepTime);
      }, index * 400); // 400ms delay between each stat
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

  // Real-time validation on input
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  // Add real-time validation listeners
  nameInput.addEventListener('blur', () => validateField('name'));
  emailInput.addEventListener('blur', () => validateField('email'));
  messageInput.addEventListener('blur', () => validateField('message'));

  // Clear errors on input
  nameInput.addEventListener('input', () => clearFieldError('name-error'));
  emailInput.addEventListener('input', () => clearFieldError('email-error'));
  messageInput.addEventListener('input', () => clearFieldError('message-error'));

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    clearErrors();
    
    // Validate all fields
    let isValid = true;
    isValid = validateField('name') && isValid;
    isValid = validateField('email') && isValid;
    isValid = validateField('message') && isValid;
    
    if (isValid) {
      // Simulate form submission
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      
      setTimeout(() => {
        showSuccessMessage('Thank you for your message! I\'ll get back to you soon.');
        form.reset();
        submitBtn.innerHTML = '<i class="bi bi-send"></i> Send Message';
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }, 2000);
    } else {
      // Shake form on validation error
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 500);
    }
  });

  function validateField(fieldName) {
    const input = document.getElementById(fieldName);
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch(fieldName) {
      case 'name':
        if (!value) {
          errorMessage = 'Name is required';
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters';
          isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          errorMessage = 'Name should only contain letters and spaces';
          isValid = false;
        }
        break;
        
      case 'email':
        if (!value) {
          errorMessage = 'Email is required';
          isValid = false;
        } else if (!isValidEmail(value)) {
          errorMessage = 'Please enter a valid email address';
          isValid = false;
        }
        break;
        
      case 'message':
        if (!value) {
          errorMessage = 'Message is required';
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = 'Message must be at least 10 characters';
          isValid = false;
        } else if (value.length > 1000) {
          errorMessage = 'Message must be less than 1000 characters';
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      showError(fieldName + '-error', errorMessage);
      input.classList.add('error');
    } else {
      clearFieldError(fieldName + '-error');
      input.classList.remove('error');
      input.classList.add('valid');
    }

    return isValid;
  }

  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const input = errorElement.parentElement.querySelector('input, textarea');
    
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }
    
    if (input) {
      input.classList.add('error');
      input.classList.remove('valid');
    }
  }

  function clearFieldError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement && errorElement.classList.contains('show')) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }
  }

  function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    
    errorElements.forEach(element => {
      element.textContent = '';
      element.classList.remove('show');
    });
    
    inputs.forEach(input => {
      input.classList.remove('error', 'valid');
    });
  }

  function showSuccessMessage(message) {
    // Create success notification
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.innerHTML = `
      <i class="bi bi-check-circle-fill"></i>
      <span>${message}</span>
    `;
    
    // Insert before form
    form.parentNode.insertBefore(successDiv, form);
    
    // Animate in
    setTimeout(() => successDiv.classList.add('show'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      successDiv.classList.remove('show');
      setTimeout(() => successDiv.remove(), 300);
    }, 5000);
  }

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
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
  const statsSection = document.querySelector('.stats');
  console.log('Stats section found:', statsSection); // Debug log
  
  if (statsSection) {
    let animationTriggered = false;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationTriggered) {
          console.log('Stats section intersecting, triggering animation');
          animationTriggered = true;
          setTimeout(() => {
            animateStats();
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3 // Trigger when 30% of the stats section is visible
    });
    
    observer.observe(statsSection);
    
    // Manual trigger after page load as fallback
    setTimeout(() => {
      if (!animationTriggered) {
        console.log('Fallback: triggering stats animation');
        animateStats();
        animationTriggered = true;
      }
    }, 2000);
    
    // Also add a click handler for testing
    statsSection.addEventListener('click', () => {
      console.log('Stats section clicked, triggering animation');
      animateStats();
    });
  } else {
    console.error('Stats section not found');
  }
});
