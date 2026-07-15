# Architecture Specification: Sai Fabrics Group Website

## 1. Approved Technology Stack
*   **Build Tool & Dev Server:** Vite (configured for multi-page builds)
*   **Core Structure:** Semantic HTML5 (separate files for each page to maximize SEO indexing)
*   **Styling:** Bootstrap 5 (for grid layout and responsive utility classes) + Custom CSS3 (for typography, design system branding, and override controls)
*   **Typography:** Google Fonts (Outfit for headers, Inter for body copy)
*   **Animations:** GSAP (GreenSock Animation Platform) + ScrollTrigger plugin
*   **Data Graphics:** Chart.js / Animated SVG counters (for statistics representation)
*   **Icons:** Bootstrap Icons (loaded locally via npm/compiled assets — no emojis)
*   **Deployment Architecture:** Static website compilation (HTML/JS/CSS), client-only deployment (no Node.js production backend). Forms handled via serverless endpoints.

## 2. Codebase Directory Structure
The application lives in the `./app` directory to maintain root architecture safety:
```
app/
├── index.html              # Home Page
├── about.html              # About Us
├── solutions.html          # Solutions/Services
├── infrastructure.html     # Infrastructure & Quality
├── industries.html         # Industries We Serve
├── blog.html               # Blog/Insights
├── contact.html            # Contact Us
├── package.json            # NPM configuration & dependencies
├── vite.config.js          # Multi-page build configuration for Vite
├── src/
│   ├── main.js             # Core script entry
│   ├── styles/
│   │   ├── main.css        # Branding tokens (color, spaces, fonts)
│   │   ├── components.css  # Shared elements (Navbar, Footer, Buttons)
│   │   └── pages/          # Scoped CSS files per page
│   ├── modules/
│   │   ├── animations.js   # GSAP scroll triggers and entrance animations
│   │   ├── charts.js       # Stats data graphics rendering
│   │   └── forms.js        # Contact validation and file uploads
│   └── assets/
│       └── images/         # Placeholders for fabric patterns and blog layouts
```

## 3. Approved Enhancements
1.  **Interactive Fabric Viewer:** A canvas element displaying scrollable patterns when hovering fabric items (Silk, Satin, Linen, Cotton).
2.  **ScrollTriggered Manufacturing Timeline:** Process timeline (Consultation ➔ Artwork Evaluation ➔ Fabric Selection, etc.) revealing cards sequentially along an animated SVG "printing path".
3.  **Visual Requirement Builder:** Interactive slider for ordering quantity/fabric selection updating a real-time summary card on the contact page.

## 4. Compiled Requirements
*   Fully responsive pages optimized for desktop/laptop and mobile screen sizes.
*   GSAP animations for content reveals.
*   Graphics showing key metrics (10+ Years Experience, 100% Quality Inspection).
*   No emojis; icons used instead.
*   Informational placeholders for missing data (Phone, Email, Google Map, Factory photos).
*   Strict implementation of page titles and meta descriptions provided in `info.pdf`.

## 5. Development & Error Prevention Checklist
*   **Root Folder Safety:** Build all files strictly inside `./app/`.
*   **GSAP Resizing Adjustments:** Standardize scroll triggers to prevent layout shifts.
*   **Font Scaling:** Use CSS clamp scales for headers.
*   **Local Placeholders:** Build abstract inline SVGs and geometric patterns to ensure immediate display without asset dependencies.
