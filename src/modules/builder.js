/* 
  Sai Fabrics Group - Visual B2B Requirement Builder & Cost Estimator
*/

import { gsap } from 'gsap';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('builder-qty')) {
    initRequirementBuilder();
  }
});

/**
 * Calculates dynamic estimates and applies animation overlays
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
  const summaryCost = document.getElementById('summary-cost');
  const applyBtn = document.getElementById('builder-apply-btn');

  // Estimate Constant Parameters
  const FABRIC_RATES = {
    cotton: 250,
    polyester: 180,
    viscose: 220,
    linen: 300
  };

  let currentFabric = 'cotton';
  let currentQty = 500;
  let currentType = 'sample';
  let currentCost = 0;

  // Track button switches
  fabricBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fabricBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFabric = btn.getAttribute('data-value');
      calculateAndAnimate();
    });
  });

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.getAttribute('data-value');
      calculateAndAnimate();
    });
  });

  qtyInput.addEventListener('input', (e) => {
    currentQty = parseInt(e.target.value);
    qtyValDisplay.innerText = `${currentQty}m`;
    calculateAndAnimate();
  });

  // Apply summary estimations to form message field
  applyBtn.addEventListener('click', () => {
    const messageField = document.getElementById('form-message');
    if (!messageField) return;

    const fabricName = currentFabric.charAt(0).toUpperCase() + currentFabric.slice(1);
    const typeLabel = currentType === 'sample' ? 'Sample Development' : 'Bulk Production';
    
    messageField.value = `Hello, I would like to request an inquiry for:\n- Fabric Base: ${fabricName}\n- Target Quantity: ${currentQty} meters\n- Execution Mode: ${typeLabel}\n- Budget Estimate: ${summaryCost.innerText}\n\nPlease contact me with official quotes and lead times.`;
    
    // Smooth scroll up to B2B Form Card
    const targetElement = document.getElementById('inquiry-form');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Visual feedback highlight glow
      gsap.fromTo('.sf-contact-form-card', 
        { outline: '2px solid transparent' },
        { outline: '2px solid var(--accent-color)', duration: 0.4, yoyo: true, repeat: 1 }
      );
    }
  });

  /**
   * Run math calculations and execute GSAP value count counters
   */
  function calculateAndAnimate() {
    let price = 0;
    let timelineText = '';

    const baseRate = FABRIC_RATES[currentFabric];

    if (currentType === 'sample') {
      // Setup charges flat ₹12,000 + ₹350/m printing
      price = 12000 + (currentQty * 350);
      timelineText = '4-6 Business Days';
      summaryType.innerText = 'Sample Development';
    } else {
      // Bulk production discounts
      let volumeDiscount = 1.0;
      if (currentQty >= 2000) volumeDiscount = 0.80; // 20% off
      else if (currentQty >= 500) volumeDiscount = 0.90; // 10% off

      price = currentQty * baseRate * volumeDiscount;
      timelineText = '10-15 Business Days';
      summaryType.innerText = 'Bulk Production';
    }

    const fabricDisplayName = currentFabric.charAt(0).toUpperCase() + currentFabric.slice(1);
    summaryFabric.innerText = fabricDisplayName;
    summaryQty.innerText = `${currentQty} meters`;
    summaryTimeline.innerText = timelineText;

    // Number counting animations using GSAP
    const costObj = { value: currentCost };
    gsap.to(costObj, {
      value: price,
      duration: 0.45,
      ease: 'power1.out',
      onUpdate: () => {
        currentCost = Math.floor(costObj.value);
        summaryCost.innerText = formatCurrency(currentCost);
      }
    });
  }

  function formatCurrency(num) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  }

  // Initial Calculation
  calculateAndAnimate();
}
