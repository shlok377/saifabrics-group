/* 
  Sai Fabrics Group - GSAP and Motion Animations
*/

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Initialize fabric visualizer if container exists
  if (document.getElementById('fabric-selector-list')) {
    initFabricVisualizer();
  }

  // Initialize process timeline if timeline container exists
  if (document.getElementById('sf-timeline-container')) {
    initProcessTimeline();
  }

  // Initialize global entrance reveals
  initGlobalScrollReveals();
});

/**
 * Script for interactive fabric visualizer (color shifts & mouse tracking lens)
 */
function initFabricVisualizer() {
  const buttons = document.querySelectorAll('.sf-fabric-btn');
  const screen = document.getElementById('fabric-preview-screen');
  const canvas = document.getElementById('fabric-pattern-canvas');
  const displayName = document.getElementById('fabric-display-name');
  const displayDesc = document.getElementById('fabric-display-desc');

  if (!screen || !canvas) return;

  // Track relative cursor positions inside visualizer screen
  screen.addEventListener('mousemove', (e) => {
    const rect = screen.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Smoothly animate CSS variables using GSAP
    gsap.to(screen, {
      '--mouse-x': `${x}px`,
      '--mouse-y': `${y}px`,
      duration: 0.15,
      ease: 'power1.out'
    });
  });

  // Handle fabric selection switches
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const color = btn.getAttribute('data-color');
      const desc = btn.getAttribute('data-desc');
      const name = btn.innerText;

      // Color shift preview window
      gsap.to(screen, {
        backgroundColor: color,
        duration: 0.6,
        ease: 'power2.out'
      });

      // Text swap fade transitions
      gsap.to('.sf-fabric-details-card', {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
          displayName.innerText = name;
          displayDesc.innerText = desc;
          gsap.to('.sf-fabric-details-card', {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });

      // Scale pulse canvas texture representing weave change
      gsap.fromTo(canvas, 
        { scale: 0.95, opacity: 0.1 },
        { scale: 1, opacity: 0.3, duration: 0.5, ease: 'power2.out' }
      );
    });
  });
}

/**
 * Script for animated SVG process timeline (draw thread line and fade cards on scroll)
 */
function initProcessTimeline() {
  const path = document.querySelector('#timeline-path');
  const items = document.querySelectorAll('.sf-timeline-item');
  
  if (!path || items.length === 0) return;

  const pathLength = path.getTotalLength();
  
  // Set initial SVG stroke dash settings
  gsap.set(path, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength
  });

  // Animate drawing the thread line as we scroll the container
  gsap.to(path, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#sf-timeline-container',
      start: 'top 50%',
      end: 'bottom 50%',
      scrub: 0.5
    }
  });

  // Highlight timeline items and animate text card fades when scroll reaches them
  items.forEach(item => {
    // Hide initially
    gsap.set(item.querySelector('.sf-timeline-card'), { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: item,
      start: 'top 75%',
      onEnter: () => {
        item.classList.add('active');
        gsap.to(item.querySelector('.sf-timeline-card'), {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      },
      onLeaveBack: () => {
        item.classList.remove('active');
        gsap.to(item.querySelector('.sf-timeline-card'), {
          opacity: 0,
          y: 30,
          duration: 0.3,
          ease: 'power2.in'
        });
      }
    });
  });
}

/**
 * Global Scroll reveal entrances for headings and card blocks
 */
function initGlobalScrollReveals() {
  const reveals = document.querySelectorAll('.sf-card, .sf-section-header, .sf-excellence, .sf-cta-banner');

  reveals.forEach(el => {
    // Skip items already animated sequentially by custom components
    if (el.closest('.sf-timeline-container') || el.closest('.sf-fabric-visualizer-grid')) return;

    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  });
}
