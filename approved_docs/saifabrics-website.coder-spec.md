# Copy and Safety Specifications: Sai Fabrics Group Website

## 1. Professional Contact Details Replacements
*   **Phone Number:** `+91 261 400 9000`
*   **Email Address:** `contact@saifabrics.com`
*   **Website URL:** `www.saifabrics.com`
*   **Physical Address:** `Plot No. 142, Surat Textile Industrial Estate, Ring Road, Surat, Gujarat, 395002, India`
*   **Google Map:** Rendered via interactive vector placeholder styled with design system parameters.

## 2. Form Security & Privacy Statements

### A. Artwork File Upload Area Warning (Injected above/below Dropzone)
"🔒 **Design Security:** Your uploaded artwork is encrypted, stored securely, and used exclusively for your print sample analysis. We sign strict Non-Disclosure Agreements (NDAs) with all brand partners to protect proprietary designs."

### B. Inquiry Form Submission Consent
"By submitting, you agree to allow Sai Fabrics Group to contact you regarding your printing requirements. Your details are processed securely and never sold to third parties."

## 3. Upload Safeguards and Constraints
*   **Supported File Formats:** `.jpg`, `.jpeg`, `.png`, `.pdf`, `.tiff`, `.ai`
*   **Max Payload Size:** `10 MB`
*   **Invalid File Error Copy:** "Unsupported file type or file exceeds 10MB limit. Please upload high-resolution print files under 10MB."

## 4. Input Fields Validation Rules & Error Messages
*   **Name Input (`name`):** Required. Error: *"Please enter your full name."*
*   **Company Name (`company`):** Required. Error: *"Please specify your brand or company name."*
*   **Email Input (`email`):** Regex match (`^[^\s@]+@[^\s@]+\.[^\s@]+$`). Error: *"Please enter a valid business email address (e.g. name@brand.com)."*
*   **Phone Input (`mobile`):** Length between 10 and 15 digits (`^[+0-9\s-]{10,15}$`). Error: *"Please enter a valid phone number including country code."*
*   **Quantity Selector (`quantity`):** Required positive integer >= 1. Error: *"Please enter a valid order quantity (minimum 1 unit)."*
