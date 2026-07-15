# Detailed Architecture & Task Specifications: Sai Fabrics Group Website

## 1. Approved Technical Specs & Configurations

### A. Package Setup (`app/package.json`)
```json
{
  "name": "saifabrics-website",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "bootstrap": "^5.3.3",
    "bootstrap-icons": "^1.11.3",
    "gsap": "^3.12.5"
  },
  "devDependencies": {
    "vite": "^5.2.11"
  }
}
```

### B. Bundler Config (`app/vite.config.js`)
```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        solutions: resolve(__dirname, 'solutions.html'),
        infrastructure: resolve(__dirname, 'infrastructure.html'),
        industries: resolve(__dirname, 'industries.html'),
        blog: resolve(__dirname, 'blog.html'),
        contact: resolve(__dirname, 'contact.html')
      }
    }
  }
});
```

## 2. Core Data Contracts

```typescript
interface InquiryData {
  name: string;               // Required, min length 2
  companyName: string;        // Required
  mobileNumber: string;       // Required, regex: ^[+0-9\s-]{10,15}$
  emailAddress: string;       // Required, regex: email pattern
  productRequirement: string; // Dropdown: "Fashion Apparel" | "Ethnic Wear" | "Kids Wear" | "Women's Wear" | "Men's Wear" | "Designer Collections" | "Lifestyle Products" | "Other"
  fabricType: string;         // Dropdown: "Polyester" | "Cotton" | "Rayon" | "Viscose" | "Linen" | "Silk Blends" | "Satin" | "Crepe" | "Chiffon" | "Georgette" | "Knitted" | "Woven"
  orderQuantity: number;      // Required, integer >= 1
  message: string;            // Optional, max length 1000
  artworkFile: File | null;   // Optional, max size 10MB, allowed types: jpg, png, pdf, ai
}

interface FabricItem {
  id: string;                 // e.g. "cotton-sateen"
  name: string;               // e.g. "Premium Cotton"
  description: string;
  idealFor: string[];         // e.g. ["Fashion Apparel", "Kids Wear"]
  texturePattern: string;     // URL or CSS/SVG pattern identifier
  baseColor: string;          // Hex color representing fabric base
}

interface BlogPost {
  id: string;                 // URL slug
  title: string;
  category: "Digital Textile Printing" | "Fashion Industry Trends" | "Fabric Selection Guides" | "Manufacturing Best Practices" | "Sustainability";
  summary: string;            // Short overview
  publishDate: string;        // YYYY-MM-DD
  readTime: string;           // e.g. "5 min read"
}
```

## 3. Component Architecture and State Division

*   **Global Navigation:** Stateful (`isMobileMenuOpen`, `activePage`)
*   **Inquiry Form Wizard:** Stateful (`formData`, `formErrors`, `isSubmitting`, `uploadProgress`)
*   **Fabric Visualizer:** Stateful (`activeFabricId`, `mouseCoordinates`)
*   **Stats Counters:** Stateful (`hasAnimated` - triggered by GSAP ScrollTrigger)
*   **Process Timeline:** Stateless (Pure scroll-driven animations via GSAP)
*   **Blog Filter:** Stateful (`activeCategory`)
*   **Footer:** Stateless

---

## 4. Development Sprint Backlog

### Phase 1: Setup & Initialization
*   [ ] **Task 1.1: Project Setup and Dependencies**
    *   *Assignee:* Coder
    *   *Authorized Files:* `app/package.json`, `app/vite.config.js`
    *   *Definition of Done:* Setup package and bundler config, execute `npm install`, confirm server launches.

### Phase 2: Shell Layout & Style Tokens
*   [ ] **Task 2.1: Design Tokens & Typography Setup**
    *   *Assignee:* UI Designer
    *   *Authorized Files:* `app/src/styles/main.css`
    *   *Definition of Done:* Define branding variables and baseline typography configuration.
*   [ ] **Task 2.2: Shared Header, Navigation & Mobile Menu**
    *   *Assignee:* Coder
    *   *Authorized Files:* `app/*.html`, `app/src/main.js`, `app/src/styles/components.css`
    *   *Definition of Done:* Build header grid markup and toggle JS mobile navbar interactions.
*   [ ] **Task 2.3: Shared Footer Layout & Icons**
    *   *Assignee:* Coder
    *   *Authorized Files:* `app/*.html`, `app/src/styles/components.css`
    *   *Definition of Done:* Implement footer standard references containing bootstrap icon indicators.

### Phase 3: Content Pages - Home & About
*   [ ] **Task 3.1: Home Page Grid & Layout Content**
    *   *Assignee:* UI Designer
    *   *Authorized Files:* `app/index.html`, `app/src/styles/pages/home.css`
    *   *Definition of Done:* Build layout structure and CSS layout alignments for Home page sections.
*   [ ] **Task 3.2: Stats Counter Graphics & ScrollTrigger**
    *   *Assignee:* Coder
    *   *Authorized Files:* `app/index.html`, `app/src/modules/charts.js`, `app/src/styles/pages/home.css`
    *   *Definition of Done:* Render numbers in dynamic counters utilizing GSAP animation.
*   [ ] **Task 3.3: About Page Markup & Values Grid**
    *   *Assignee:* UI Designer
    *   *Authorized Files:* `app/about.html`, `app/src/styles/pages/about.css`
    *   *Definition of Done:* Build static Grid values displaying mission/vision profiles.

### Phase 4: Solutions & Industries
*   [ ] **Task 4.1: Solutions Catalog & Services Grid**
    *   *Assignee:* UI Designer
    *   *Authorized Files:* `app/solutions.html`, `app/src/styles/pages/solutions.css`
    *   *Definition of Done:* Populate and style services lists and textile options selectors.
*   [ ] **Task 4.2: Solutions Interactive Fabric Viewer**
    *   *Assignee:* Coder
    *   *Authorized Files:* `app/solutions.html`, `app/src/modules/animations.js`, `app/src/styles/pages/solutions.css`
    *   *Definition of Done:* Script canvas mouse coordinate spotlight fabric viewer overlay.
*   [ ] **Task 4.3: Industries We Serve Catalog**
    *   *Assignee:* UI Designer
    *   *Authorized Files:* `app/industries.html`, `app/src/styles/pages/industries.css`
    *   *Definition of Done:* Build responsive cards illustrating client industry domains.

### Phase 5: Infrastructure & Blog
*   [ ] **Task 5.1: Infrastructure page & Animated Manufacturing Timeline**
    *   *Assignee:* Coder
    *   *Authorized Files:* `app/infrastructure.html`, `app/src/modules/animations.js`, `app/src/styles/pages/infrastructure.css`
    *   *Definition of Done:* Setup manufacturing stages alongside continuous line SVG scroll anim triggers.
*   [ ] **Task 5.2: Blog Grid & Category Filtering**
    *   *Assignee:* Coder
    *   *Authorized Files:* `app/blog.html`, `app/src/main.js`, `app/src/styles/pages/blog.css`
    *   *Definition of Done:* Code instant category display filters using card selectors.

### Phase 6: Contact & Form Wizard
*   [ ] **Task 6.1: Contact Page UI & Inquiry Form Layout**
    *   *Assignee:* UI Designer
    *   *Authorized Files:* `app/contact.html`, `app/src/styles/pages/contact.css`
    *   *Definition of Done:* Render inquiry template grids and contact detail segments.
*   [ ] **Task 6.2: Inquiry Form Verification & File Upload Feedback**
    *   *Assignee:* Coder
    *   *Authorized Files:* `app/src/modules/forms.js`, `app/contact.html`
    *   *Definition of Done:* Implement JS input validation rules and drag-drop progress animations.
*   [ ] **Task 6.3: Visual Requirement Builder Animation**
    *   *Assignee:* Coder
    *   *Authorized Files:* `app/contact.html`, `app/src/modules/animations.js`, `app/src/styles/pages/contact.css`
    *   *Definition of Done:* Wire selector changes to animate card elements via GSAP scaling hooks.

### Phase 7: Verification & Final Polish
*   [ ] **Task 7.1: Global Scroll Reveals**
    *   *Assignee:* Coder
    *   *Authorized Files:* `app/src/modules/animations.js`
    *   *Definition of Done:* Setup unified entrance scrolls triggers globally.
*   [ ] **Task 7.2: SEO Meta checks & Compilation Verification**
    *   *Assignee:* Quality Tester
    *   *Authorized Files:* `app/*.html`, `app/vite.config.js`
    *   *Definition of Done:* Ensure precise titles matching info.pdf are present and vite compiles successfully.
