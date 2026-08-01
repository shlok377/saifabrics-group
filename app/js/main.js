/* ================================================================================
   SAI FABRICS GROUP - MASTER INTERACTIVITY JS
   ================================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initNavigation();
  initCanvasFabricEffect();
  initMetricCounters();
  initGalleryFilters();
  initFabricPreviewer();
  initModals();
  initQuoteCalculator();
  initFabricSwatchModal();
});

/* 0. LAUNCH SPLASH SCREEN (HOME PAGE ONLY) */
function initSplashScreen() {
  const splash = document.getElementById('splashScreen');
  if (!splash) return;

  // Lock body scrolling during launch splash
  document.body.style.overflow = 'hidden';

  // Display for 1.5 seconds (1500ms) before initiating fade out
  setTimeout(() => {
    splash.classList.add('fade-out');
    document.body.style.overflow = '';
    
    // Clean up from DOM after fade-out transition completes
    setTimeout(() => {
      splash.remove();
    }, 500);
  }, 1500);
}

/* 1. NAVIGATION & MOBILE MENU */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const header = document.querySelector('.site-header');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}

/* 2. HERO CANVAS FABRIC WAVE EFFECT */
function initCanvasFabricEffect() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let lines = [];
  const lineCount = 35;
  let step = 0;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    lines = [];
    for (let i = 0; i < lineCount; i++) {
      lines.push({
        y: (height / lineCount) * i,
        amplitude: 15 + Math.random() * 25,
        frequency: 0.005 + Math.random() * 0.008,
        speed: 0.015 + Math.random() * 0.02,
        color: i % 2 === 0 ? 'rgba(212, 163, 79, ' + (0.15 + (i / lineCount) * 0.25) + ')' : 'rgba(229, 184, 105, ' + (0.08 + (i / lineCount) * 0.15) + ')'
      });
    }
  }

  window.addEventListener('resize', resize);
  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);
    step += 1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      ctx.beginPath();
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = line.color;

      for (let x = 0; x <= width; x += 15) {
        const y = line.y + Math.sin(x * line.frequency + step * line.speed) * line.amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* 3. DYNAMIC COUNTERS */
function initMetricCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endVal = parseInt(target.getAttribute('data-target') || '0', 10);
        const suffix = target.getAttribute('data-suffix') || '';
        let startVal = 0;
        const duration = 1800;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = endVal / steps;

        const timer = setInterval(() => {
          startVal += increment;
          if (startVal >= endVal) {
            target.textContent = endVal.toLocaleString() + suffix;
            clearInterval(timer);
          } else {
            target.textContent = Math.floor(startVal).toLocaleString() + suffix;
          }
        }, stepTime);

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* 4. GALLERY & PORTFOLIO FILTERS */
function initGalleryFilters() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-card');

  if (!tabBtns.length || !galleryItems.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category') || '';
        if (filter === 'all' || cat.includes(filter)) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease-out';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  const searchInput = document.getElementById('portfolioSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      galleryItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/* 5. INTERACTIVE FABRIC PREVIEWER (EXACT 12 FABRIC CATEGORIES) */
const fabricDatabase = {
  polyester: {
    title: 'Polyester Fabric',
    desc: 'Durable synthetic fabric offering bright color output. Ideal for sportswear, active apparel, and sublimation digital printing.',
    img: 'assets/img/textile_printing_hero.jpg'
  },
  cotton: {
    title: 'Cotton Fabric (60x60 Combed)',
    desc: 'Soft, breathable 100% combed cotton with great ink absorption and AZO-free dyes. Great for everyday apparel and kidswear.',
    img: 'assets/img/ethnic_silk_swatch.jpg'
  },
  rayon: {
    title: 'Rayon Staple Fabric',
    desc: 'Smooth cellulose fabric offering fluid drape and high color fastness. Ideal for women\'s tops, dresses, and ethnic apparel.',
    img: 'assets/img/factory_machinery.jpg'
  },
  viscose: {
    title: 'Viscose Fabric',
    desc: 'Smooth fabric with a premium hand-feel and high-definition print detail. Reliance and European export compliant.',
    img: 'assets/img/factory_machinery.jpg'
  },
  linen: {
    title: 'Linen Fabric',
    desc: 'Natural textured flax fabric. Offers a unique surface feel that pairs well with botanical and geometric prints.',
    img: 'assets/img/ethnic_silk_swatch.jpg'
  },
  silk: {
    title: 'Silk Blends',
    desc: 'Natural silk blend fabric designed for gold foil accents and reactive digital printing for luxury fashion brands.',
    img: 'assets/img/ethnic_silk_swatch.jpg'
  },
  satin: {
    title: 'Satin Fabric',
    desc: 'Smooth glossy fabric offering rich color depth, clean contrast, and fluid drape for evening and festive wear.',
    img: 'assets/img/foil_glitter_fabric.jpg'
  },
  crepe: {
    title: 'Crepe Fabric',
    desc: 'Wrinkle-resistant crinkled fabric that holds sharp print details and deep color penetration for women\'s wear.',
    img: 'assets/img/digital_chiffon_swatch.jpg'
  },
  chiffon: {
    title: 'Chiffon Fabric',
    desc: 'Lightweight sheer fabric. Ideal for dupattas, scarves, overlays, and flowing multi-layered fashion garments.',
    img: 'assets/img/digital_chiffon_swatch.jpg'
  },
  georgette: {
    title: 'Georgette Fabric',
    desc: 'Semi-sheer crinkled fabric made for printed sarees, ethnic festive gowns, and pleated fashion lines.',
    img: 'assets/img/foil_glitter_fabric.jpg'
  },
  knitted: {
    title: 'Knitted Fabrics',
    desc: 'Flexible stretch knits suited for 3D raised rubber, khari prints, and high-density digital fabric printing.',
    img: 'assets/img/textile_printing_hero.jpg'
  },
  woven: {
    title: 'Woven Fabrics',
    desc: 'Durable woven fabric suited for commercial garments, uniform textiles, and home furnishing applications.',
    img: 'assets/img/factory_machinery.jpg'
  }
};

function initFabricPreviewer() {
  const previewScreen = document.getElementById('previewerScreen');
  const previewTitle = document.getElementById('previewerTitle');
  const previewDesc = document.getElementById('previewerDesc');
  const fabricBtns = document.querySelectorAll('.preview-fabric-btn');

  if (!previewScreen) return;

  function updatePreviewer(key) {
    const data = fabricDatabase[key];
    if (!data) return;

    fabricBtns.forEach(b => {
      if (b.getAttribute('data-fabric') === key) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    previewScreen.style.backgroundImage = `url('${data.img}')`;
    if (previewTitle) previewTitle.textContent = data.title;
    if (previewDesc) previewDesc.textContent = data.desc;
  }

  fabricBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-fabric') || 'polyester';
      updatePreviewer(key);
    });
  });

  updatePreviewer('polyester');
}

/* 6. MODAL SYSTEM */
function initModals() {
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close');

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalOverlays.forEach(overlay => overlay.classList.remove('active'));
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}

function openInspectModal(title, imageSrc, desc, specs) {
  const modal = document.getElementById('inspectModal');
  if (!modal) return;

  const imgEl = modal.querySelector('#inspectModalImg');
  const titleEl = modal.querySelector('#inspectModalTitle');
  const descEl = modal.querySelector('#inspectModalDesc');
  const specsEl = modal.querySelector('#inspectModalSpecs');

  if (imgEl) imgEl.src = imageSrc;
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = desc;
  if (specsEl && specs) {
    specsEl.innerHTML = specs.map(s => `<li><strong>${s.label}:</strong> ${s.val}</li>`).join('');
  }

  modal.classList.add('active');
}

/* 7. POP-UP FABRIC SWATCH SELECTOR MODAL (EXACT 12 CATEGORIES) */
function initFabricSwatchModal() {
  const openBtn = document.getElementById('openFabricModalBtn');
  const modal = document.getElementById('fabricSwatchModal');
  const closeBtn = document.getElementById('closeFabricModalBtn');
  const swatchItems = document.querySelectorAll('.swatch-card-item');

  const hiddenInput = document.getElementById('calcFabric');
  const labelEl = document.getElementById('selectedFabricLabel');
  const summaryFabric = document.getElementById('summaryFabric');

  if (!openBtn || !modal) return;

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  swatchItems.forEach(item => {
    item.addEventListener('click', () => {
      const val = item.getAttribute('data-fabric-val') || 'Polyester';
      const icon = item.getAttribute('data-icon') || 'fa-swatchbook';

      swatchItems.forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');

      if (hiddenInput) hiddenInput.value = val;
      if (labelEl) {
        labelEl.innerHTML = `<i class="fa-solid ${icon}" style="margin-right: 0.6rem;"></i> ${val}`;
      }
      if (summaryFabric) {
        summaryFabric.textContent = val;
      }

      modal.classList.remove('active');
      showToast(`Selected Fabric: ${val}`, 'info');
    });
  });
}

/* 8. ENQUIRY SPEC SUMMARY CALCULATOR */
function initQuoteCalculator() {
  const form = document.getElementById('quoteCalcForm');
  if (!form) return;

  const hiddenInput = document.getElementById('calcFabric');
  const metersInput = document.getElementById('calcMeters');

  const summaryFabric = document.getElementById('summaryFabric');
  const summaryMeters = document.getElementById('summaryMeters');
  const summaryStatus = document.getElementById('summaryStatus');

  function updateSummary() {
    if (hiddenInput && summaryFabric) {
      summaryFabric.textContent = hiddenInput.value || 'Polyester';
    }
    if (metersInput && summaryMeters) {
      const meters = parseInt(metersInput.value || '2500', 10);
      summaryMeters.textContent = meters.toLocaleString() + ' Meters';
    }
    if (summaryStatus) {
      summaryStatus.textContent = 'Ready for Factory Processing';
    }
  }

  [metersInput].forEach(el => {
    el?.addEventListener('input', updateSummary);
    el?.addEventListener('change', updateSummary);
  });

  updateSummary();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Enquiry Submitted Successfully! Our engineering team will contact you shortly.', 'success');
    form.reset();
    updateSummary();
  });
}

/* 9. TOAST SYSTEM */
function showToast(msg, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
  toast.innerHTML = `<i class="fa-solid ${iconClass}" style="color: var(--gold-imperial); font-size: 1.2rem;"></i> <span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
