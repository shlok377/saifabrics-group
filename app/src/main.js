/* 
  Sai Fabrics Group - Core Script Entry
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/main.css';
import './styles/components.css';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

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
    if (window.scrollY > 20) {
      header.classList.add('shadow-sm');
      header.style.padding = '0.2rem 0';
    } else {
      header.classList.remove('shadow-sm');
      header.style.padding = '0';
    }
  });
}
