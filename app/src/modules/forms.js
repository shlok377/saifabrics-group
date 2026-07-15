/* 
  Sai Fabrics Group - Client Side B2B Form Validation and File Upload Gate
*/

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('inquiry-form');
  if (form) {
    initFormInteractivity();
  }
});

/**
 * Validates inputs and handles file drag/drop interfaces
 */
function initFormInteractivity() {
  const zone = document.getElementById('file-upload-zone');
  const fileInput = document.getElementById('form-file');
  const infoBar = document.getElementById('file-info-bar');
  const nameLabel = document.getElementById('file-display-name');
  const sizeLabel = document.getElementById('file-display-size');
  const removeBtn = document.getElementById('file-remove-btn');
  const form = document.getElementById('inquiry-form');

  const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'pdf', 'tiff', 'ai'];
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  if (!zone || !fileInput || !infoBar) return;

  // --- Drag & Drop Zone Styling ---
  ['dragenter', 'dragover'].forEach(eventName => {
    zone.addEventListener(eventName, (e) => {
      e.preventDefault();
      zone.style.borderColor = 'var(--text-color)';
      zone.style.backgroundColor = '#FFFFFF';
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    zone.addEventListener(eventName, (e) => {
      e.preventDefault();
      zone.style.borderColor = 'var(--border-color)';
      zone.style.backgroundColor = 'var(--bg-color)';
    }, false);
  });

  // Handle dropped files
  zone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
      fileInput.files = files;
      handleFileVerification(files[0]);
    }
  });

  // Handle clicked files
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      handleFileVerification(fileInput.files[0]);
    }
  });

  // Remove file attachments
  removeBtn.addEventListener('click', () => {
    resetFileAttachment();
  });

  /**
   * Validates sizes and extension formats
   */
  function handleFileVerification(file) {
    const filename = file.name;
    const extension = filename.split('.').pop().toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      alert(`Invalid format: .${extension}. Only standard print design files (.jpg, .jpeg, .png, .pdf, .tiff, .ai) are supported.`);
      resetFileAttachment();
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert(`File size exceeds 10MB limits. Please optimize your design file.`);
      resetFileAttachment();
      return;
    }

    // Populate feedback details
    nameLabel.innerText = filename;
    sizeLabel.innerText = `(${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
    infoBar.style.display = 'flex';
  }

  function resetFileAttachment() {
    fileInput.value = '';
    infoBar.style.display = 'none';
  }

  // --- Submission Verification ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const company = document.getElementById('form-company').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Check presence
    if (!name || !company || !email || !phone || !message) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    // Phone verification
    const phoneRegex = /^[+]?[0-9\s-]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid B2B contact phone number (10 to 15 digits).');
      return;
    }

    // Email verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid company email address.');
      return;
    }

    // Simulate success
    alert(`Thank you, ${name}!\nYour inquiry for ${company} has been submitted.\n\nOur production team will review your specifications and contact you at ${email} shortly.`);
    form.reset();
    resetFileAttachment();
  });
}
