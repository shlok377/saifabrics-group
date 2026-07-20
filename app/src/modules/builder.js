/* 
  Sai Fabrics Group - Visual B2B Requirement Specification Builder
*/

import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('builder-qty')) {
    initRequirementBuilder();
  }
});

/**
 * Updates specification summary and populates inquiry form
 */
function initRequirementBuilder() {
  const pickerTrigger = document.getElementById('fabric-picker-trigger');
  const swatchModal = document.getElementById('sf-swatch-modal');
  const modalOverlay = document.getElementById('sf-swatch-modal-overlay');
  const modalClose = document.getElementById('sf-modal-close');
  const swatchCards = document.querySelectorAll('.sf-swatch-card');

  const triggerThumb = document.getElementById('trigger-swatch-thumb');
  const triggerName = document.getElementById('trigger-fabric-name');
  const triggerSub = document.getElementById('trigger-fabric-subtext');

  const typeBtns = document.querySelectorAll('#builder-type-select .sf-builder-choice-btn');
  const qtyInput = document.getElementById('builder-qty');
  const qtyValDisplay = document.getElementById('builder-qty-val');
  
  // Summary outputs
  const summaryFabric = document.getElementById('summary-fabric');
  const summaryQty = document.getElementById('summary-qty');
  const summaryType = document.getElementById('summary-type');
  const summaryTimeline = document.getElementById('summary-timeline');
  const applyBtn = document.getElementById('builder-apply-btn');

  let currentFabric = 'Cotton';
  let currentQty = 500;
  let currentType = 'sample';

  // Open Modal
  if (pickerTrigger && swatchModal) {
    pickerTrigger.addEventListener('click', () => {
      swatchModal.classList.add('open');
    });
  }

  // Close Modal
  function closeModal() {
    if (swatchModal) {
      swatchModal.classList.remove('open');
    }
  }

  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);

  // Swatch Card Selection
  swatchCards.forEach(card => {
    card.addEventListener('click', () => {
      swatchCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const val = card.getAttribute('data-value');
      const color = card.getAttribute('data-color');
      const sub = card.getAttribute('data-sub');

      currentFabric = val;

      if (triggerThumb) triggerThumb.style.backgroundColor = color;
      if (triggerName) triggerName.innerText = val;
      if (triggerSub) triggerSub.innerText = sub;

      updateSummary();
      setTimeout(closeModal, 150);
    });
  });

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.getAttribute('data-value');
      updateSummary();
    });
  });

  const presetPills = document.querySelectorAll('.sf-preset-pill');

  function updateSliderVisuals(val) {
    currentQty = parseInt(val);
    if (qtyInput) qtyInput.value = currentQty;
    if (qtyValDisplay) qtyValDisplay.innerText = `${currentQty.toLocaleString()}m`;

    // Calculate slider fill percentage for custom gradient track
    if (qtyInput) {
      const min = parseInt(qtyInput.min) || 50;
      const max = parseInt(qtyInput.max) || 5000;
      const pct = ((currentQty - min) / (max - min)) * 100;
      qtyInput.style.background = `linear-gradient(to right, var(--accent-color) 0%, var(--accent-color) ${pct}%, #E8E3DC ${pct}%, #E8E3DC 100%)`;
    }

    // Sync Preset Pill Active state
    presetPills.forEach(pill => {
      const pQty = parseInt(pill.getAttribute('data-qty'));
      pill.classList.toggle('active', pQty === currentQty);
    });

    updateSummary();
  }

  if (qtyInput) {
    qtyInput.addEventListener('input', (e) => {
      updateSliderVisuals(e.target.value);
    });
    // Initial call to set gradient track
    updateSliderVisuals(qtyInput.value);
  }

  presetPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const pQty = pill.getAttribute('data-qty');
      updateSliderVisuals(pQty);
    });
  });

  // Apply summary specifications to form message field
  applyBtn.addEventListener('click', () => {
    const messageField = document.getElementById('form-message');
    if (!messageField) return;

    const fabricName = currentFabric.charAt(0).toUpperCase() + currentFabric.slice(1);
    const typeLabel = currentType === 'sample' ? 'Sample Development' : 'Bulk Production';
    const timelineText = currentType === 'sample' ? '4-6 Business Days' : '10-15 Business Days';
    
    messageField.value = `Hello, I would like to request a quote for:\n- Fabric Base: ${fabricName}\n- Target Quantity: ${currentQty} meters\n- Execution Mode: ${typeLabel}\n- Estimated Time: ${timelineText}\n\nPlease contact me with official pricing and scheduling.`;
    
    // Smooth scroll up to B2B Form Card
    const targetElement = document.getElementById('form-message');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetElement.focus();
      
      // Visual feedback highlight glow
      gsap.fromTo('.sf-contact-form-card', 
        { outline: '2px solid transparent' },
        { outline: '2px solid var(--accent-color)', duration: 0.4, yoyo: true, repeat: 1 }
      );
    }
  });

  /**
   * Update summary UI text
   */
  function updateSummary() {
    let timelineText = '';

    if (currentType === 'sample') {
      timelineText = '4-6 Business Days';
      summaryType.innerText = 'Sample Development';
    } else {
      timelineText = '10-15 Business Days';
      summaryType.innerText = 'Bulk Production';
    }

    const fabricDisplayName = currentFabric.charAt(0).toUpperCase() + currentFabric.slice(1);
    summaryFabric.innerText = fabricDisplayName;
    summaryQty.innerText = `${currentQty} meters`;
    summaryTimeline.innerText = timelineText;
  }

  // Initial Calculation
  updateSummary();
}

