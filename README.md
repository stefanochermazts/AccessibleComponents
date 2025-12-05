# 🎨 Accessible Components - WCAG 2.1 AA Design System

> A complete library of accessible UI components, framework-agnostic, designed for WCAG 2.1 Level AA compliance.

[![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS-Custom%20Properties-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
[![License MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌐 Live Demo

**[→ View Live Demo](https://accessible.chermaz.com/)**

---

## 📋 Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Available Components](#available-components)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Accessibility Testing](#accessibility-testing)
- [WordPress Integration](#wordpress-integration)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### 🎯 Accessibility "By Design"

- ✅ **WCAG 2.1 Level AA** compliant
- ✅ **Complete keyboard navigation** for all components
- ✅ **Screen reader friendly** with correct ARIA attributes
- ✅ **Color contrast** verified (min 4.5:1)
- ✅ **Focus management** following best practices
- ✅ **Progressive Enhancement** - works without JavaScript

### 🚀 Technology

- 🎨 **Vanilla JavaScript (ES6+)** - No dependencies
- 🎨 **CSS Custom Properties** - Centralized Design System
- 🎨 **Framework Agnostic** - Use anywhere
- 🎨 **Modern and Lightweight** - Optimized performance

### 🎨 Design System

- 📐 **Centralized tokens** for colors, spacing, typography
- 🎨 **Accessible pastel palette**
- 🔧 **Real-time customizer** with contrast verification
- 🌗 **Dark Mode support** (optional)

---

## 🌐 Live Demo

**[→ accessible.chermaz.com](https://accessible.chermaz.com/)**

Or run locally by opening `index.html` in a browser!

```bash
# Start a local server
python3 -m http.server 8000
# or
npx serve
```

Then visit: http://localhost:8000

---

## 🧩 Available Components

### A. Navigation (4)

| Component | Description | ARIA Pattern |
|-----------|-------------|--------------|
| **Skip Link** | Skip to main content | - |
| **Breadcrumbs** | Navigation path | `aria-current="page"` |
| **Tabs** | Tabbed panels | `role="tablist"`, `role="tab"`, `role="tabpanel"` |
| **Main Navigation** | Responsive main menu | `role="navigation"`, `aria-expanded` |

### B. Input & Forms (3)

| Component | Description | ARIA Pattern |
|-----------|-------------|--------------|
| **Buttons** | Accessible buttons | States: hover, focus, disabled |
| **Input Fields** | Input fields with validation | `aria-invalid`, `aria-describedby` |
| **Checkbox/Radio Custom** | Styled controls | Hidden input + custom label |

### C. Content & Feedback (4)

| Component | Description | ARIA Pattern |
|-----------|-------------|--------------|
| **Accordion** | Expandable content | `aria-expanded`, `aria-controls` |
| **Modal** | Dialog window | `role="dialog"`, `aria-modal`, focus trap |
| **Cards** | Clickable cards | Single link with extended area |
| **Alerts** | Notifications and messages | `role="alert"`, `role="status"` |

### D. Media (1)

| Component | Description | ARIA Pattern |
|-----------|-------------|--------------|
| **Carousel** | Image slider | Play/Pause, `aria-hidden` for hidden slides |

### E. W3C APG Components (14)

| Component | Description | Keyboard | ARIA Pattern |
|-----------|-------------|----------|--------------|
| **Combobox** | Autocomplete dropdown | ↑↓ Enter Esc | `role="combobox"`, `aria-activedescendant` |
| **Disclosure** | Show/Hide | Enter Space | `aria-expanded` |
| **Tooltip** | Info popup | Esc | `role="tooltip"`, `aria-describedby` |
| **Slider** | Range selector | ↑↓←→ Home End PgUp PgDn | `role="slider"`, `aria-valuenow` |
| **Listbox** | Selectable list | ↑↓ Space Home End | `role="listbox"`, `aria-selected` |
| **Meter** | Level indicator | - | `role="meter"`, `aria-valuenow` |
| **Spinbutton** | Numeric input | ↑↓ Home End PgUp PgDn | `role="spinbutton"`, `aria-valuenow` |
| **Toolbar** | Toolbar | ←→ Home End | `role="toolbar"` |
| **Table** | Sortable table | Enter/Space on header | `aria-sort` |
| **Grid** | Navigable grid | ↑↓←→ Home End | `role="grid"`, `role="gridcell"` |
| **Tree View** | Hierarchical tree | ↑↓←→ Enter Space | `role="tree"`, `aria-expanded` |
| **Treegrid** | Hierarchical grid | Click expand btn | `role="treegrid"`, `aria-level` |
| **Feed** | Infinite scroll | Auto scroll | `role="feed"`, `role="article"` |
| **Window Splitter** | Resizable separator | ←→ Home End | `role="separator"`, `aria-valuenow` |

**Total: 26 components** 🎉

---

## 🚀 Quick Start

### 1. Download the Project

```bash
git clone https://github.com/your-username/accessible-components.git
cd accessible-components
```

### 2. Include Files in Your Project

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Accessible Project</title>
  
  <!-- CSS Assets -->
  <link rel="stylesheet" href="assets/css/base.css">
  <link rel="stylesheet" href="assets/css/components.css">
</head>
<body>

  <!-- Your components here -->
  
  <!-- JS Logic -->
  <script src="assets/js/main.js"></script>
</body>
</html>
```

### 3. Use the Components

**All 26 components** have dedicated HTML reference files in `components/` folder. Each file includes:
- Complete HTML markup
- ARIA pattern documentation
- Keyboard navigation instructions
- Required attributes
- CSS class references
- JavaScript dependencies

**Example:** Copy markup from `components/combobox.html`:

```html
<!-- Combobox with full ARIA support -->
<div class="wcag-combobox-wrapper">
  <label id="combo1-label" class="form-label">Favorite Fruit</label>
  <div class="combo-input-wrapper">
    <input 
      type="text" 
      role="combobox" 
      aria-autocomplete="list" 
      aria-expanded="false" 
      aria-haspopup="listbox" 
      aria-controls="combo1-listbox"
      id="combo1-input"
      class="form-input"
    >
    <button type="button" class="combo-toggle-btn" aria-label="Show options" tabindex="-1">▼</button>
  </div>
  <ul id="combo1-listbox" role="listbox" aria-labelledby="combo1-label" class="combo-listbox" hidden>
    <li role="option" id="opt1">Apple</li>
    <li role="option" id="opt2">Banana</li>
    <li role="option" id="opt3">Orange</li>
  </ul>
</div>
```

**Browse all components:** Check the `components/` folder for ready-to-use markup.

JavaScript initializes automatically on `DOMContentLoaded`!

---

## 📁 Project Structure

```
accessible-components/
├── assets/
│   ├── css/
│   │   ├── base.css          # Reset and base utilities
│   │   ├── components.css    # Component styles (all 26)
│   │   └── tokens.css        # Design System tokens (CSS variables)
│   └── js/
│       ├── main.js           # Accessible component logic (all 26)
│       └── themer.js         # Theme customizer (optional)
├── components/               # HTML reference files (26 components)
│   ├── accordion.html        # C. Content & Feedback
│   ├── alerts.html           # C. Content & Feedback
│   ├── breadcrumbs.html      # A. Navigation
│   ├── buttons.html          # B. Input & Forms
│   ├── cards.html            # C. Content & Feedback
│   ├── carousel.html         # D. Media
│   ├── checkbox-radio.html   # B. Input & Forms
│   ├── combobox.html         # E. W3C APG
│   ├── disclosure.html       # E. W3C APG
│   ├── feed.html             # E. W3C APG
│   ├── grid.html             # E. W3C APG
│   ├── input.html            # B. Input & Forms
│   ├── listbox.html          # E. W3C APG
│   ├── meter.html            # E. W3C APG
│   ├── modal.html            # C. Content & Feedback
│   ├── navigation.html       # A. Navigation
│   ├── skip-link.html        # A. Navigation
│   ├── slider.html           # E. W3C APG
│   ├── spin-button.html      # E. W3C APG
│   ├── splitter.html         # E. W3C APG
│   ├── table.html            # E. W3C APG
│   ├── tabs.html             # A. Navigation
│   ├── toolbar.html          # E. W3C APG
│   ├── tooltip.html          # E. W3C APG
│   ├── treegrid.html         # E. W3C APG
│   └── tree-view.html        # E. W3C APG
├── documents/
│   ├── ANALYSIS.md           # Functional project analysis
│   ├── ACCESSIBILITY-TESTING.md  # Accessibility testing guide
│   └── COMPONENTS-GUIDE.md   # Detailed component documentation
├── .artiforge/
│   ├── codebase-analysis-report.md  # Architecture analysis
│   └── plan-w3c-apg-components.md   # Development plan
├── index.html                # Live demo of all 26 components
├── todo.md                   # Task list
└── README.md                 # This file
```

---

## 🎨 Design System

### CSS Custom Properties (Tokens)

All components use centralized CSS variables defined in `assets/css/tokens.css`:

```css
:root {
  /* Brand Colors */
  --c-primary: #4F46E5;        /* Indigo 600 */
  --c-primary-light: #E0E7FF;  /* Indigo 100 - Pastel */
  
  /* Semantic Colors */
  --c-success: #047857;
  --c-error: #B91C1C;
  --c-warning: #B45309;
  
  /* Typography */
  --font-family-base: system-ui, -apple-system, sans-serif;
  --fs-base: 1rem;
  
  /* Spacing (4px grid) */
  --space-4: 1rem;
  --space-8: 2rem;
  
  /* Focus (Accessibility) */
  --focus-ring-color: var(--c-primary);
  --focus-ring-width: 3px;
}
```

### Customization

To customize the theme:

1. **Method 1:** Edit `assets/css/tokens.css` directly
2. **Method 2:** Use the Theme Customizer in `index.html` ("Theme Customizer" section)
3. **Method 3:** Override variables in your CSS:

```css
:root {
  --c-primary: #your-color;
  --font-family-base: 'Your Font', sans-serif;
}
```

---

## 🧪 Accessibility Testing

### Automated Tests

```bash
# Use axe-core DevTools (browser extension)
# Or Lighthouse
lighthouse http://localhost:8000/index.html --only-categories=accessibility
```

### Manual Tests

See the **Complete testing guide**: `documents/ACCESSIBILITY-TESTING.md`

Quick checklist:
- ✅ Complete keyboard navigation (Tab, Arrows, Enter, Esc)
- ✅ Visible focus on all elements
- ✅ Screen reader announces roles, states, and values
- ✅ Color contrast ≥ 4.5:1

---

## 🔌 WordPress Integration

### As a Plugin (In Development)

The project is designed to be distributed as a **WordPress Plugin** with:
- Shortcodes for each component (e.g., `[wcag-combobox]`)
- Native Gutenberg blocks
- Admin panel to customize the Design System

Planned structure:

```
wp-content/plugins/wcag-accessible-components/
├── assets/ (symlink or copy from this project)
├── blocks/ (Gutenberg blocks)
├── inc/
│   ├── admin-settings.php
│   └── shortcodes.php
└── wcag-accessible-components.php (Main plugin file)
```

---

## 📚 Documentation

### Available Documents

1. **README.md** (this file) - General overview
2. **[ANALYSIS.md](documents/ANALYSIS.md)** - Detailed functional analysis
3. **[ACCESSIBILITY-TESTING.md](documents/ACCESSIBILITY-TESTING.md)** - Testing guide
4. **[COMPONENTS-GUIDE.md](documents/COMPONENTS-GUIDE.md)** - Component documentation
5. **[todo.md](todo.md)** - Roadmap and completed tasks

### External Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [W3C ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### How to Contribute

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Guidelines

- All components must be WCAG 2.1 AA compliant
- Use Vanilla JavaScript (no frameworks)
- Follow the existing Design System (CSS tokens)
- Document new components
- Add accessibility tests

---

## 📄 License

This project is released under the **MIT License**. See the `LICENSE` file for details.

```
MIT License

Copyright (c) 2025 Accessible Components

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👏 Acknowledgments

- [W3C WAI](https://www.w3.org/WAI/) for WCAG and ARIA guidelines
- [axe-core](https://github.com/dequelabs/axe-core) for testing tools
- All contributors who made this project possible

---

## 📞 Contact

- **Project:** [GitHub Repository](https://github.com/your-username/accessible-components)
- **Issues:** [GitHub Issues](https://github.com/your-username/accessible-components/issues)
- **Documentation:** [Wiki](https://github.com/your-username/accessible-components/wiki)
- **Live Demo:** [accessible.chermaz.com](https://accessible.chermaz.com/)

---

<p align="center">
  Made with ❤️ for a more accessible web
</p>

<p align="center">
  <strong>WCAG 2.1 AA Compliant</strong> | <strong>Framework Agnostic</strong> | <strong>Open Source</strong>
</p>
