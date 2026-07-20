/* 
  Sai Fabrics Group - Core Script Entry & Expressive Micro-Physics Engine
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/main.css';
import './styles/components.css';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCustomCursor();
  initButtonRipples();
  initMagneticButtons();
  initCardParallax();
  initHeroFabricCanvas();
});

/**
 * Interactive Fabric Pattern Canvas Background for Top Hero Sections
 */
function initHeroFabricCanvas() {
  const heroes = document.querySelectorAll('.sf-hero, .sf-about-hero, .sf-solutions-hero, .sf-infra-hero, .sf-industries-hero, .sf-blog-hero, .sf-contact-hero');
  heroes.forEach(hero => {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      hero.style.setProperty('--hero-mouse-x', `${x}px`);
      hero.style.setProperty('--hero-mouse-y', `${y}px`);
    });
  });
}

/**
 * Initializes navbar behaviors (active tab highlight and mobile menu toggle)
 */
function initNavigation() {
  const navToggle = document.getElementById('sf-nav-toggle');
  const navMenu = document.getElementById('sf-nav-menu');
  const navLinks = document.querySelectorAll('.sf-nav-link');
  const header = document.getElementById('sf-header');

  // Toggle mobile navigation menu
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('open');
      navMenu.classList.toggle('open', isOpen);
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  }

  // Active Link Highlighting based on pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Dynamic Scroll Header Shadow Effect
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('shadow-sm');
        header.style.padding = '0.2rem 0';
      } else {
        header.classList.remove('shadow-sm');
        header.style.padding = '0';
      }
    }
  });
}

/**
 * Custom Floating Tactile Cursor Ring with smooth Lerp movement
 */
function initCustomCursor() {
  // Only execute on desktop viewport screens
  if (window.innerWidth < 992) return;

  const dot = document.createElement('div');
  dot.className = 'sf-cursor-dot';
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.className = 'sf-cursor-ring';
  document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Smooth lerp loop for outer ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Expand ring over interactive elements
  const hoverTargets = 'a, button, .sf-btn, .sf-card, .sf-fabric-btn, .sf-filter-btn, .sf-builder-choice-btn, input, textarea';
  
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.add('sf-cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      document.body.classList.remove('sf-cursor-hover');
    }
  });
}

/**
 * Dynamic Organic Ink Ripple Generator on Button Click
 */
function initButtonRipples() {
  const buttons = document.querySelectorAll('.sf-btn, button, .sf-fabric-btn, .sf-filter-btn, .sf-builder-choice-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'sf-ink-ripple';
      
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x - size / 2}px`;
      ripple.style.top = `${y - size / 2}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

/**
 * Magnetic Pull Physics on Buttons
 */
function initMagneticButtons() {
  const magneticTargets = document.querySelectorAll('.sf-btn-primary, .sf-btn-secondary, .sf-logo');

  magneticTargets.forEach(target => {
    target.addEventListener('mousemove', (e) => {
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull up to 8px offset
      target.style.transform = `translate(${x * 0.25}px, ${y * 0.25 - 2}px) scale(1.02)`;
    });

    target.addEventListener('mouseleave', () => {
      target.style.transform = 'translate(0px, 0px) scale(1.0)';
    });
  });
}

/**
 * Subtle 3D Mouse Parallax Tilt on Cards
 */
function initCardParallax() {
  const cards = document.querySelectorAll('.sf-card, .sf-stat-card, .sf-why-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}
