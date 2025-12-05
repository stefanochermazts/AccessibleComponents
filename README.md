# Accessible Components – WCAG 2.1 AA Design System
Framework‑agnostic, accessible UI components (26) with HTML5, CSS3, Vanilla JS (ES6+), WCAG 2.1 AA, and WAI‑ARIA APG patterns.  
[Live Demo](https://accessible.chermaz.com/) • [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/) • [ARIA APG](https://www.w3.org/WAI/ARIA/apg/)

---

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Components (26)](#components-26)
- [How to Use the Components](#how-to-use-the-components)
- [Styling & Theming](#styling--theming)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
Accessible, reusable components with full keyboard support, correct ARIA, and design tokens. The live demo (`index.html`) shows all 26 components; each component has a dedicated HTML snippet in `components/`.

---

## Project Structure
```mermaid
graph TD
  A[root /] --> B[assets/]
  A --> C[components/]
  A --> D[documents/]
  A --> E[index.html]
  A --> F[todo.md]
  A --> G[.artiforge/]
  B --> B1[css/ (base.css, components.css, tokens.css)]
  B --> B2[js/ (main.js, themer.js)]
  C --> C1[26 component HTML files]
  D --> D1[ANALYSIS.md]
  D --> D2[ACCESSIBILITY-TESTING.md]
  D --> D3[COMPONENTS-GUIDE.md]
  G --> G1[plans, reports]
```

Top-level:
- `assets/css/`: `base.css`, `components.css`, `tokens.css`
- `assets/js/`: `main.js`, `themer.js`
- `components/`: 26 HTML reference snippets (one per component)
- `documents/`: ANALYSIS, ACCESSIBILITY-TESTING, COMPONENTS-GUIDE
- `index.html`: Live demo (all components)
- `todo.md`: Tasks
- `.artiforge/`: Plans & reports (should be git-ignored)

---

## Technology Stack
- HTML5, CSS3, JavaScript (ES6+)
- CSS Custom Properties (design tokens)
- Libraries: JSZip 3.10.1, FileSaver.js 2.0.5
- Standards: WCAG 2.1 AA, WAI-ARIA Authoring Practices Guide

---

## Components (26)

### A. Navigation (4)
- Skip Link (`skip-link.html`)
- Breadcrumbs (`breadcrumbs.html`)
- Tabs (`tabs.html`)
- Main Navigation (`navigation.html`)

### B. Input & Forms (3)
- Buttons (`buttons.html`)
- Input Fields (`input.html`)
- Custom Checkbox/Radio (`checkbox-radio.html`)

### C. Content & Feedback (4)
- Accordion (`accordion.html`)
- Modal (`modal.html`)
- Cards (`cards.html`)
- Alerts (`alerts.html`)

### D. Media (1)
- Carousel (`carousel.html`)

### E. W3C APG Components (14)
- Combobox (`combobox.html`)
- Disclosure (`disclosure.html`)
- Tooltip (`tooltip.html`)
- Slider (`slider.html`)
- Listbox (`listbox.html`)
- Meter (`meter.html`)
- Spinbutton (`spin-button.html`)
- Toolbar (`toolbar.html`)
- Table (`table.html`)
- Grid (`grid.html`)
- Tree View (`tree-view.html`)
- Treegrid (`treegrid.html`)
- Feed (`feed.html`)
- Window Splitter (`splitter.html`)

---

## How to Use the Components
### Quick start (3 steps)
1) Serve or open the demo  
   - Open `index.html` directly, or run a simple server:  
   ```bash
   python3 -m http.server 8000
   # or
   npx serve
   ```
   Then visit `http://localhost:8000`.

2) Copy markup from `components/*.html`  
   - Each file includes: required HTML, ARIA attributes, keyboard notes, and the classes used.

3) Include the assets  
   ```html
   <link rel="stylesheet" href="assets/css/base.css">
   <link rel="stylesheet" href="assets/css/components.css">
   <script src="assets/js/main.js"></script>
   ```
   JS auto-initializes on `DOMContentLoaded`; no manual init needed.

### Minimal per-APG hints
- Tabs: `role="tablist"`, `role="tab"`, `role="tabpanel"`, roving tabindex, ↑/↓ or ←/→, Home/End.  
- Combobox: `role="combobox"` + `aria-controls`, `aria-expanded`, `aria-autocomplete="list"`, listbox/options; keys ↑/↓ Enter Esc.  
- Listbox: `role="listbox"`, `role="option"`, `aria-selected`; ↑/↓, Space/Enter, Home/End.  
- Slider: `role="slider"`, `aria-valuenow|min|max`; keys ←/→, PgUp/PgDn, Home/End.  
- Tree / Treegrid: `aria-level`, `aria-expanded`; ←/→ to collapse/expand, ↑/↓ to move.  
- Dialog (Modal): `role="dialog"` + `aria-modal="true"`; focus trap; Esc closes.  
- Tooltip: `role="tooltip"`, `aria-describedby`; show on focus/hover, Esc hides.

---

## Styling & Theming
- Design tokens: `assets/css/tokens.css` (colors, spacing, typography, focus).  
- Component styles: `assets/css/components.css`.  
- Base/reset: `assets/css/base.css`.  
- Live theming & contrast checker: `themer.js` injected into `index.html`.

Override tokens in your app:
```css
:root {
  --c-primary: #your-color;
  --font-family-base: 'Your Font', sans-serif;
}
```

---

## Accessibility
- Target: WCAG 2.1 AA (primary button at AAA contrast).  
- Correct ARIA roles/states for interactive patterns.  
- Keyboard support per APG (Tab/Shift+Tab, arrows, Home/End, PgUp/PgDn).  
- Visible focus rings (configurable via tokens).  
- See `documents/ACCESSIBILITY-TESTING.md` for full checklists (keyboard, screen reader, axe/Lighthouse).

---

## Testing
- Manual: keyboard through all components; focus visible; screen reader announces roles/states/values.  
- Automated: run axe DevTools or Lighthouse:  
  ```bash
  lighthouse http://localhost:8000/index.html --only-categories=accessibility
  ```
- Contrast: verify tokens with the built-in contrast checker in the Theme Customizer section of `index.html`.

---

## Documentation
- `documents/ANALYSIS.md` — Functional analysis  
- `documents/ACCESSIBILITY-TESTING.md` — Testing guide (automated + manual)  
- `documents/COMPONENTS-GUIDE.md` — Per-component details (markup, ARIA, keyboard)  
- Live demo: [accessible.chermaz.com](https://accessible.chermaz.com/)

---

## Contributing
1) Fork and create a feature branch.  
2) Keep WCAG 2.1 AA compliance; follow design tokens.  
3) Update docs when adding/changing components; include accessibility tests.  
4) Submit a PR.

---

## License
MIT. If `LICENSE` is present, refer to it.  
Acks: W3C WAI (WCAG/ARIA), axe-core, contributors.
