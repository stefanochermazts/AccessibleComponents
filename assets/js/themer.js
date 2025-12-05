/**
 * Accessible Design System Themer & Contrast Checker
 * Allows real-time editing of CSS variables and checks WCAG contrast.
 */

class ThemeEditor {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.computedStyle = getComputedStyle(document.documentElement);
    this.groups = this.getVariableGroups();
    
    this.init();
  }

  getVariableGroups() {
    return {
      'Brand Colors': [
        { name: '--c-primary', type: 'color', label: 'Primary Brand' },
        { name: '--c-primary-light', type: 'color', label: 'Primary Light' },
        { name: '--c-primary-dark', type: 'color', label: 'Primary Dark' },
        { name: '--c-secondary', type: 'color', label: 'Secondary Brand' },
        { name: '--c-secondary-light', type: 'color', label: 'Secondary Light' },
        { name: '--c-secondary-dark', type: 'color', label: 'Secondary Dark' },
      ],
      'Neutral Colors': [
        { name: '--c-white', type: 'color', label: 'White' },
        { name: '--c-gray-50', type: 'color', label: 'Gray 50 (Bg)' },
        { name: '--c-gray-100', type: 'color', label: 'Gray 100' },
        { name: '--c-gray-200', type: 'color', label: 'Gray 200 (Borders)' },
        { name: '--c-gray-700', type: 'color', label: 'Gray 700 (Body Text)' },
        { name: '--c-gray-900', type: 'color', label: 'Gray 900 (Headings)' },
      ],
      'Semantic Colors': [
        { name: '--c-success', type: 'color', label: 'Success' },
        { name: '--c-error', type: 'color', label: 'Error' },
        { name: '--c-warning', type: 'color', label: 'Warning' },
        { name: '--c-info', type: 'color', label: 'Info' },
      ],
      'Typography': [
        { name: '--fs-base', type: 'text', label: 'Base Font Size' },
        { name: '--lh-base', type: 'text', label: 'Base Line Height' },
        { name: '--font-family-base', type: 'text', label: 'Font Family' },
      ],
      'Shapes': [
        { name: '--radius-md', type: 'text', label: 'Border Radius (MD)' },
        { name: '--focus-ring-width', type: 'text', label: 'Focus Width' },
      ]
    };
  }

  init() {
    this.renderEditor();
    this.renderContrastChecker();
    this.updateContrastDisplay();
  }

  getCurrentValue(varName) {
    return this.computedStyle.getPropertyValue(varName).trim();
  }

  renderEditor() {
    const editorDiv = document.createElement('div');
    editorDiv.className = 'themer-editor';
    
    // Styles for the editor
    const style = document.createElement('style');
    style.textContent = `
      .themer-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
      .themer-group { background: #fff; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; }
      .themer-group h3 { margin-top: 0; font-size: 1rem; margin-bottom: 1rem; border-bottom: 2px solid #f3f4f6; padding-bottom: 0.5rem; }
      .themer-field { margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between; }
      .themer-field label { font-size: 0.875rem; color: #374151; }
      .themer-field input[type="color"] { width: 40px; height: 40px; padding: 0; border: none; cursor: pointer; }
      .themer-field input[type="text"] { width: 120px; padding: 4px; font-size: 0.875rem; border: 1px solid #d1d5db; border-radius: 4px; }
      
      .contrast-dashboard { background: #1f2937; color: #fff; padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 2rem; }
      .contrast-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
      .contrast-card { background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 0.25rem; text-align: center; }
      .contrast-card.pass { border-left: 4px solid #10b981; }
      .contrast-card.fail { border-left: 4px solid #ef4444; }
      .contrast-ratio { font-size: 2rem; font-weight: bold; display: block; margin: 0.5rem 0; }
      .contrast-badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; }
      .bg-pass { background: #10b981; color: #fff; }
      .bg-fail { background: #ef4444; color: #fff; }
    `;
    document.head.appendChild(style);

    const grid = document.createElement('div');
    grid.className = 'themer-grid';

    for (const [groupName, fields] of Object.entries(this.groups)) {
      const groupDiv = document.createElement('div');
      groupDiv.className = 'themer-group';
      
      const title = document.createElement('h3');
      title.textContent = groupName;
      groupDiv.appendChild(title);

      fields.forEach(field => {
        const wrapper = document.createElement('div');
        wrapper.className = 'themer-field';

        const label = document.createElement('label');
        label.textContent = field.label;
        label.htmlFor = `field-${field.name}`;

        const input = document.createElement('input');
        input.type = field.type;
        input.id = `field-${field.name}`;
        input.value = this.getCurrentValue(field.name);
        
        if (field.type === 'color') {
          // Ensure value is hex for color input
          const rgb = this.parseColor(this.getCurrentValue(field.name));
          const hex = '#' + rgb.map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
          }).join('');
          input.value = hex;
        }

        input.addEventListener('input', (e) => {
          document.documentElement.style.setProperty(field.name, e.target.value);
          this.updateContrastDisplay();
        });

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        groupDiv.appendChild(wrapper);
      });

      grid.appendChild(groupDiv);
    }

    editorDiv.appendChild(grid);
    this.container.appendChild(editorDiv);
  }

  renderContrastChecker() {
    const dashboard = document.createElement('div');
    dashboard.className = 'contrast-dashboard';
    dashboard.innerHTML = '<h3 style="color:white; margin-top:0;">Real-time WCAG Contrast Check</h3><div class="contrast-grid" id="contrast-grid"></div>';
    
    // Insert before the editor
    this.container.insertBefore(dashboard, this.container.firstChild);
    this.contrastGrid = dashboard.querySelector('#contrast-grid');
  }

  updateContrastDisplay() {
    this.contrastGrid.innerHTML = '';

    const checks = [
      { 
        label: 'Primary Button', 
        fgVar: '--c-white', 
        bgVar: '--c-primary',
        description: 'Text on Primary Color'
      },
      { 
        label: 'Body Text', 
        fgVar: '--c-gray-700', 
        bgVar: '--c-gray-50',
        description: 'Main Text on Background'
      },
      { 
        label: 'Headings', 
        fgVar: '--c-gray-900', 
        bgVar: '--c-gray-50',
        description: 'Headings on Background'
      },
      {
        label: 'Secondary Button',
        fgVar: '--c-secondary-dark',
        bgVar: '--c-secondary-light',
        description: 'Text on Secondary Color'
      }
    ];

    checks.forEach(check => {
      const fg = this.getComputedColor(check.fgVar);
      const bg = this.getComputedColor(check.bgVar);
      const ratio = this.getContrastRatio(fg, bg);
      const passesAA = ratio >= 4.5;
      const passesAAA = ratio >= 7;

      const card = document.createElement('div');
      card.className = `contrast-card ${passesAA ? 'pass' : 'fail'}`;
      
      card.innerHTML = `
        <div style="font-weight:bold; margin-bottom:4px;">${check.label}</div>
        <div style="font-size:0.8rem; opacity:0.8;">${check.description}</div>
        <span class="contrast-ratio">${ratio.toFixed(2)}</span>
        <div style="display:flex; justify-content:center; gap:8px;">
          <span class="contrast-badge ${passesAA ? 'bg-pass' : 'bg-fail'}">AA ${passesAA ? 'PASS' : 'FAIL'}</span>
          <span class="contrast-badge ${passesAAA ? 'bg-pass' : 'bg-fail'}">AAA ${passesAAA ? 'PASS' : 'FAIL'}</span>
        </div>
        <div style="margin-top:8px; font-size:0.7rem; display:flex; justify-content:center; gap:4px;">
           <span style="display:inline-block; width:12px; height:12px; background:${fg}; border:1px solid #fff;"></span>
           vs
           <span style="display:inline-block; width:12px; height:12px; background:${bg}; border:1px solid #fff;"></span>
        </div>
      `;
      
      this.contrastGrid.appendChild(card);
    });
  }

  // --- Helpers ---

  getComputedColor(varName) {
    // Need to get the value from the element to account for live updates
    // But getComputedStyle might be slow in a loop? It's fine for this demo.
    // Note: document.documentElement.style.getPropertyValue gets the INLINE style
    // getComputedStyle gets the resolved style.
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }

  getContrastRatio(c1, c2) {
    const lum1 = this.getLuminance(c1);
    const lum2 = this.getLuminance(c2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  getLuminance(color) {
    const rgb = this.parseColor(color);
    const [r, g, b] = rgb.map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  parseColor(colorStr) {
    // Create a dummy element to handle all color formats (hex, hsl, rgb, names)
    const div = document.createElement('div');
    div.style.color = colorStr;
    document.body.appendChild(div);
    const computed = getComputedStyle(div).color;
    document.body.removeChild(div);

    // Computed style is always 'rgb(r, g, b)' or 'rgba(r, g, b, a)'
    const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }
    return [0, 0, 0]; // Fallback
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new ThemeEditor('theme-editor-container');
});

