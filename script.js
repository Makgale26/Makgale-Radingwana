// script.js

// === Theme Toggle ===
function toggleTheme() {
  const body = document.body;
  const icon = document.querySelector('#theme-toggle i');
  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
    icon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
  } else {
    icon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
  }
}

// === Typing Animation ===
const typingText = document.querySelector('.typing-text');
const skills = [
  'Full-Stack Development',
  'Python & Automation',
  'C# & .NET APIs',
  'Cybersecurity',
  'UI/UX Design'
];

let skillIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentSkill = skills[skillIndex];

  if (isDeleting) {
    typingText.textContent = currentSkill.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentSkill.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentSkill.length) {
    isDeleting = true;
    setTimeout(type, 1500);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    skillIndex = (skillIndex + 1) % skills.length;
    setTimeout(type, 500);
    return;
  }

  const speed = isDeleting ? 30 : 70;
  setTimeout(type, speed);
}

// === Stats Counter Animation ===
const stats = [
  { id: 'exp', value: 2 },
  { id: 'proj', value: 15 },
  { id: 'tech', value: 12 },
  { id: 'commits', value: 500 }
];

const duration = 2000;

function animateCounter(id, finalValue) {
  const el = document.getElementById(id);
  let start = 0;
  const increment = Math.ceil(finalValue / (duration / 20));
  const timer = setInterval(() => {
    start += increment;
    if (start >= finalValue) {
      el.textContent = finalValue;
      clearInterval(timer);
    } else {
      el.textContent = start;
    }
  }, 20);
}

// Animate when scrolled into view
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.forEach(stat => animateCounter(stat.id, stat.value));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

// === Mobile Menu Toggle ===
document.querySelector('.nav-toggle').addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('show');
});

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
  type();
});