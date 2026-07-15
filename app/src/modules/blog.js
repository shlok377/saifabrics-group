/* 
  Sai Fabrics Group - Blog Filtering Interactivity
*/

import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize blog filters if page elements exist
  if (document.querySelector('.sf-filter-btn')) {
    initBlogFilters();
  }
});

/**
 * Filter blog items based on category tabs using GSAP transitions
 */
function initBlogFilters() {
  const filters = document.querySelectorAll('.sf-filter-btn');
  const cards = document.querySelectorAll('.sf-blog-card');

  if (filters.length === 0 || cards.length === 0) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      // Switch active button tab styles
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      // Arrays to group actions for GSAP anim transitions
      const cardsToHide = [];
      const cardsToShow = [];

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          cardsToShow.push(card);
        } else {
          cardsToHide.push(card);
        }
      });

      // Animate card exits
      if (cardsToHide.length > 0) {
        gsap.to(cardsToHide, {
          opacity: 0,
          scale: 0.95,
          y: 10,
          duration: 0.2,
          stagger: 0.03,
          onComplete: () => {
            cardsToHide.forEach(c => c.classList.add('hidden'));
          }
        });
      }

      // Show and animate card entrances
      cardsToShow.forEach(c => c.classList.remove('hidden'));
      gsap.fromTo(cardsToShow,
        { opacity: 0, scale: 0.95, y: 10 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.35, 
          stagger: 0.04, 
          ease: 'power2.out',
          delay: cardsToHide.length > 0 ? 0.22 : 0 
        }
      );
    });
  });
}
