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
  const fabricBtns = document.querySelectorAll('#builder-fabric-select .sf-builder-choice-btn');
  const typeBtns = document.querySelectorAll('#builder-type-select .sf-builder-choice-btn');
  const qtyInput = document.getElementById('builder-qty');
  const qtyValDisplay = document.getElementById('builder-qty-val');
  
  // Summary outputs
  const summaryFabric = document.getElementById('summary-fabric');
  const summaryQty = document.getElementById('summary-qty');
  const summaryType = document.getElementById('summary-type');
  const summaryTimeline = document.getElementById('summary-timeline');
  const applyBtn = document.getElementById('builder-apply-btn');

  let currentFabric = 'cotton';
  let currentQty = 500;
  let currentType = 'sample';

  // Track button switches
  fabricBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fabricBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFabric = btn.getAttribute('data-value');
      updateSummary();
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

  qtyInput.addEventListener('input', (e) => {
    currentQty = parseInt(e.target.value);
    qtyValDisplay.innerText = `${currentQty}m`;
    updateSummary();
  });

  // Apply summary specifications to form message field
  applyBtn.addEventListener('click', () => {
    const messageField = document.getElementById('form-message');
    if (!messageField) return;

    const fabricName = currentFabric.charAt(0).toUpperCase() + currentFabric.slice(1);
    const typeLabel = currentType === 'sample' ? 'Sample Development' : 'Bulk Production';
    const timelineText = currentType === 'sample' ? '4-6 Business Days' : '10-15 Business Days';
    
    messageField.value = `Hello, I would like to request a quote for:\n- Fabric Base: ${fabricName}\n- Target Quantity: ${currentQty} meters\n- Execution Mode: ${typeLabel}\n- Estimated Turnaround Target: ${timelineText}\n\nPlease contact me with official pricing and scheduling.`;
    
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

