/* 
  Sai Fabrics Group - Dynamic Stats Counters
*/

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initStatsCounters();
});

/**
 * Animates numerical statistics values using GSAP ScrollTrigger
 */
function initStatsCounters() {
  const stats = [
    { id: '#stat-years', end: 10, suffix: '+' },
    { id: '#stat-designs', end: 5000, suffix: '+' }, // Displays "5000+" to represent "Thousands of designs"
    { id: '#stat-fabrics', end: 12, suffix: '+' },
    { id: '#stat-quality', end: 100, suffix: '%' }
  ];

  stats.forEach(stat => {
    const el = document.querySelector(stat.id);
    if (!el) return;

    // Reset inner text to start value for smooth entrance transition
    el.innerText = '0' + stat.suffix;

    const counterObj = { value: 0 };

    gsap.to(counterObj, {
      value: stat.end,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        el.innerText = Math.floor(counterObj.value) + stat.suffix;
      }
    });
  });
}
