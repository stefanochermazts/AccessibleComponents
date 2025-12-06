/**
 * Accessible Components Library - Main JS
 * Framework Agnostic (Vanilla JS)
 * WCAG 2.1 AA Compliant
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initTabs();
  initAccordions();
  initModals();
  initCarousels();
  // Batch 1 Components
  initComboboxes();
  initDisclosures();
  initTooltips();
  initSliders();
  // Batch 2 Components
  initListboxes();
  initMeters();
  initSpinbuttons();
  initToolbars();
  initTables();
  initGrids();
  initTreeViews();
  initTreegrids();
  initFeeds();
  initSplitters();
  // New APG set
  initMenuButtons();
  initMenubars();
  initSwitches();
  initProgressbars();
  initRadioGroups();
  initAlertdialogs();
  initLanguageMenus();
  initToasts();
  initPagination();
});

/* --- A. Navigation --- */

function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navList = document.querySelector('.nav-list');

  if (!menuBtn || !navList) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isExpanded);
  });

  function toggleMenu(show) {
    menuBtn.setAttribute('aria-expanded', show);
    if (show) {
      navList.classList.add('is-open');
      document.addEventListener('keydown', handleMenuKeydown);
    } else {
      navList.classList.remove('is-open');
      document.removeEventListener('keydown', handleMenuKeydown);
    }
  }

  function handleMenuKeydown(e) {
    if (e.key === 'Escape') {
      toggleMenu(false);
      menuBtn.focus();
    }
  }
}

/* --- A.3 Tabs --- */

function initTabs() {
  const tabLists = document.querySelectorAll('[role="tablist"]');

  tabLists.forEach(tabList => {
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    
    tabs.forEach(tab => {
      tab.addEventListener('click', changeTab);
      tab.addEventListener('keydown', handleTabKeydown);
    });

    function changeTab(e) {
      const targetTab = e.currentTarget;
      const parentList = targetTab.closest('[role="tablist"]');
      const siblings = parentList.querySelectorAll('[role="tab"]');
      const panels = document.querySelectorAll(`[aria-labelledby^="${parentList.id || 'tab'}"]`); // Broad selector, refine if needed

      // Deselect all
      siblings.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });

      // Select clicked
      targetTab.setAttribute('aria-selected', 'true');
      targetTab.removeAttribute('tabindex');

      // Handle Panels
      const controlsId = targetTab.getAttribute('aria-controls');
      document.querySelectorAll('[role="tabpanel"]').forEach(p => {
        if (p.id === controlsId) {
          p.hidden = false;
        } else if (p.getAttribute('aria-labelledby') === targetTab.id || p.dataset.group === parentList.dataset.group) {
           // Logic depends on markup grouping. Assuming simpler: hide all related, show target.
           // Ideally, find the specific panel for this tab group.
           // Let's assume panels are siblings or found via ID.
           if(p.id !== controlsId && p.closest('.tabs') === parentList.closest('.tabs')) {
             p.hidden = true;
           }
        }
      });
    }

    function handleTabKeydown(e) {
      const targetTab = e.currentTarget;
      const firstTab = tabs[0];
      const lastTab = tabs[tabs.length - 1];
      let nextTab = null;

      switch (e.key) {
        case 'ArrowRight':
          nextTab = targetTab.nextElementSibling || firstTab;
          break;
        case 'ArrowLeft':
          nextTab = targetTab.previousElementSibling || lastTab;
          break;
        case 'Home':
          nextTab = firstTab;
          break;
        case 'End':
          nextTab = lastTab;
          break;
      }

      if (nextTab) {
        nextTab.focus();
        nextTab.click(); // Optional: auto-activate on focus
        e.preventDefault();
      }
    }
  });
}

/* --- C.1 Accordion --- */

function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-header button');

  accordions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const contentId = btn.getAttribute('aria-controls');
      const content = document.getElementById(contentId);

      btn.setAttribute('aria-expanded', !isExpanded);
      if (content) {
        content.hidden = isExpanded; // If was expanded, now hidden
      }
    });
  });
}

/* --- C.2 Modal --- */

function initModals() {
  const triggers = document.querySelectorAll('[data-modal-target]');
  const closeBtns = document.querySelectorAll('[data-modal-close]');
  const overlays = document.querySelectorAll('.modal-overlay');

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modalTarget;
      const modal = document.getElementById(modalId);
      if (modal) openModal(modal, btn);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  function openModal(modal, trigger) {
    modal.setAttribute('aria-hidden', 'false');
    modal.triggerElement = trigger; // Store trigger to restore focus
    
    // Find focusable elements
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableContent = modal.querySelectorAll(focusableSelector);
    const firstFocusable = focusableContent[0];
    const lastFocusable = focusableContent[focusableContent.length - 1];

    if (firstFocusable) firstFocusable.focus();

    function trapFocus(e) {
      const isTab = e.key === 'Tab';
      if (!isTab) return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    }

    function handleKeydown(e) {
      if (e.key === 'Escape') {
        closeModal(modal);
      }
      trapFocus(e);
    }

    modal.addEventListener('keydown', handleKeydown);
    modal.keydownHandler = handleKeydown; // Store to remove later
  }

  function closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    modal.removeEventListener('keydown', modal.keydownHandler);
    if (modal.triggerElement) {
      modal.triggerElement.focus();
      modal.triggerElement = null;
    }
  }
}

/* --- D.1 Carousel --- */

function initCarousels() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    const inner = carousel.querySelector('.carousel-inner');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('[data-action="prev"]');
    const nextBtn = carousel.querySelector('[data-action="next"]');
    const playPauseBtn = carousel.querySelector('[data-action="play-pause"]');
    
    let currentIndex = 0;
    let intervalId = null;
    let isPlaying = false; // Start paused or check data attribute

    function updateSlide(index) {
      // Ensure index bounds
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      
      currentIndex = index;
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Accessibility updates
      slides.forEach((slide, i) => {
        if (i === currentIndex) {
          slide.removeAttribute('aria-hidden');
          // slide.removeAttribute('tabindex'); 
        } else {
          slide.setAttribute('aria-hidden', 'true');
          // slide.setAttribute('tabindex', '-1');
        }
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));

    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playPauseBtn.textContent = isPlaying ? '⏸' : '▶'; // Or change aria-label
        playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause Carousel' : 'Play Carousel');
        
        if (isPlaying) {
          intervalId = setInterval(() => updateSlide(currentIndex + 1), 3000);
        } else {
          clearInterval(intervalId);
        }
      });
    }
  });
}

/* --- E. New APG Components --- */

/* E.1 Combobox */
function initComboboxes() {
  const combos = document.querySelectorAll('.wcag-combobox-wrapper');

  combos.forEach(combo => {
    const input = combo.querySelector('input[role="combobox"]');
    const listbox = combo.querySelector('ul[role="listbox"]');
    const toggleBtn = combo.querySelector('.combo-toggle-btn');
    
    if (!input || !listbox) return;
    
    const options = Array.from(listbox.querySelectorAll('[role="option"]'));
    let activeIndex = -1;

    // Toggle Listbox
    function toggleList(show) {
      if (show) {
        listbox.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
      } else {
        listbox.hidden = true;
        input.setAttribute('aria-expanded', 'false');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        activeIndex = -1;
        updateActiveDescendant();
      }
    }

    function updateActiveDescendant() {
      options.forEach((opt, i) => {
        if (i === activeIndex) {
          opt.classList.add('focused');
          input.setAttribute('aria-activedescendant', opt.id);
          opt.scrollIntoView({ block: 'nearest' });
        } else {
          opt.classList.remove('focused');
        }
      });
      if (activeIndex === -1) {
        input.removeAttribute('aria-activedescendant');
      }
    }

    function selectOption(index) {
      if (index >= 0 && index < options.length) {
        input.value = options[index].textContent;
        toggleList(false);
        input.focus();
      }
    }

    // Event Listeners
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isExpanded = input.getAttribute('aria-expanded') === 'true';
        toggleList(!isExpanded);
        input.focus();
      });
    }

    input.addEventListener('click', () => {
      if (input.getAttribute('aria-expanded') === 'false') {
        toggleList(true);
      }
    });

    input.addEventListener('keydown', (e) => {
      const isExpanded = input.getAttribute('aria-expanded') === 'true';

      switch(e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!isExpanded) {
            toggleList(true);
            activeIndex = 0;
          } else {
            activeIndex = (activeIndex + 1) % options.length;
          }
          updateActiveDescendant();
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isExpanded) {
            toggleList(true);
            activeIndex = options.length - 1;
          } else {
            activeIndex = (activeIndex - 1 + options.length) % options.length;
          }
          updateActiveDescendant();
          break;
        case 'Enter':
          if (isExpanded && activeIndex > -1) {
            e.preventDefault();
            selectOption(activeIndex);
          }
          break;
        case 'Escape':
          if (isExpanded) {
            e.preventDefault();
            toggleList(false);
          }
          break;
        case 'Tab':
          if (isExpanded) {
            toggleList(false);
          }
          break;
      }
    });

    // Click on options
    options.forEach((opt, i) => {
      opt.addEventListener('click', () => {
        selectOption(i);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!combo.contains(e.target)) {
        toggleList(false);
      }
    });
  });
}

/* E.2 Disclosure */
function initDisclosures() {
  const buttons = document.querySelectorAll('.disclosure-btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const contentId = btn.getAttribute('aria-controls');
      const content = document.getElementById(contentId);

      btn.setAttribute('aria-expanded', !isExpanded);
      if (content) content.hidden = isExpanded;
    });
  });
}

/* E.3 Tooltip */
function initTooltips() {
  // Tooltips are mostly CSS-driven with :hover and :focus
  // Add Escape key support for dismissing (WCAG 1.4.13)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Force blur on any focused element that might be showing a tooltip
      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }
    }
  });
}

/* E.4 Slider */
function initSliders() {
  const sliders = document.querySelectorAll('.wcag-slider');

  sliders.forEach(slider => {
    const thumb = slider.querySelector('.slider-thumb');
    const fill = slider.querySelector('.slider-fill');
    const valueDisplay = slider.nextElementSibling; // .slider-value
    
    if (!thumb || !fill) return;
    
    const min = parseInt(slider.getAttribute('aria-valuemin') || 0);
    const max = parseInt(slider.getAttribute('aria-valuemax') || 100);
    
    let isDragging = false;

    function updateValue(val) {
      // Clamp
      if (val < min) val = min;
      if (val > max) val = max;

      // Update visual
      const percent = ((val - min) / (max - min)) * 100;
      thumb.style.left = `${percent}%`;
      fill.style.width = `${percent}%`;

      // Update ARIA
      slider.setAttribute('aria-valuenow', val);
      if (valueDisplay && valueDisplay.classList.contains('slider-value')) {
        valueDisplay.textContent = val;
      }
    }

    // Mouse Interaction
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      handleMove(e);
      slider.focus();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      handleMove(e);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    function handleMove(e) {
      const rect = slider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      let percent = x / width;
      
      if (percent < 0) percent = 0;
      if (percent > 1) percent = 1;

      const val = Math.round(min + (max - min) * percent);
      updateValue(val);
    }

    // Keyboard Interaction
    slider.addEventListener('keydown', (e) => {
      let val = parseInt(slider.getAttribute('aria-valuenow'));
      const step = 1;
      const largeStep = 10;

      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          val += step;
          e.preventDefault();
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          val -= step;
          e.preventDefault();
          break;
        case 'PageUp':
          val += largeStep;
          e.preventDefault();
          break;
        case 'PageDown':
          val -= largeStep;
          e.preventDefault();
          break;
        case 'Home':
          val = min;
          e.preventDefault();
          break;
        case 'End':
          val = max;
          e.preventDefault();
          break;
      }
      
      updateValue(val);
    });
  });
}

/* --- Batch 2: Additional APG Components --- */

/* E.5 Listbox */
function initListboxes() {
  const listboxes = document.querySelectorAll('.wcag-listbox[role="listbox"]');

  listboxes.forEach(listbox => {
    const options = Array.from(listbox.querySelectorAll('[role="option"]'));
    const isMultiSelect = listbox.getAttribute('aria-multiselectable') === 'true';
    let activeIndex = 0;

    // Make listbox focusable
    if (!listbox.hasAttribute('tabindex')) {
      listbox.setAttribute('tabindex', '0');
    }

    function updateFocus(index) {
      options.forEach((opt, i) => {
        if (i === index) {
          opt.classList.add('focused');
          opt.scrollIntoView({ block: 'nearest' });
        } else {
          opt.classList.remove('focused');
        }
      });
      activeIndex = index;
    }

    function selectOption(index, toggle = false) {
      if (isMultiSelect) {
        const isSelected = options[index].getAttribute('aria-selected') === 'true';
        options[index].setAttribute('aria-selected', toggle ? !isSelected : 'true');
      } else {
        options.forEach((opt, i) => {
          opt.setAttribute('aria-selected', i === index ? 'true' : 'false');
        });
      }
    }

    listbox.addEventListener('click', (e) => {
      const option = e.target.closest('[role="option"]');
      if (option) {
        const index = options.indexOf(option);
        updateFocus(index);
        selectOption(index, isMultiSelect);
      }
    });

    listbox.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowDown':
          e.preventDefault();
          updateFocus((activeIndex + 1) % options.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          updateFocus((activeIndex - 1 + options.length) % options.length);
          break;
        case 'Home':
          e.preventDefault();
          updateFocus(0);
          break;
        case 'End':
          e.preventDefault();
          updateFocus(options.length - 1);
          break;
        case ' ':
        case 'Enter':
          e.preventDefault();
          selectOption(activeIndex, isMultiSelect && e.key === ' ');
          break;
      }
    });

    // Initialize first option
    if (options.length > 0) {
      updateFocus(0);
    }
  });
}

/* E.6 Meter */
function initMeters() {
  const meters = document.querySelectorAll('.wcag-meter');

  meters.forEach(meter => {
    const fill = meter.querySelector('.meter-fill');
    const value = parseFloat(meter.getAttribute('aria-valuenow') || 0);
    const min = parseFloat(meter.getAttribute('aria-valuemin') || 0);
    const max = parseFloat(meter.getAttribute('aria-valuemax') || 100);
    const low = parseFloat(meter.getAttribute('data-valuelow') || 33);
    const high = parseFloat(meter.getAttribute('data-valuehigh') || 66);

    const percent = ((value - min) / (max - min)) * 100;
    fill.style.width = `${percent}%`;

    // Determine color based on thresholds
    if (value < low) {
      fill.classList.add('low');
    } else if (value < high) {
      fill.classList.add('medium');
    } else {
      fill.classList.add('high');
    }

    fill.textContent = `${Math.round(percent)}%`;
  });
}

/* E.7 Spinbutton */
function initSpinbuttons() {
  const spinbuttons = document.querySelectorAll('.wcag-spinbutton');

  spinbuttons.forEach(spinbutton => {
    const valueEl = spinbutton.querySelector('.spinbutton-value');
    const decrementBtn = spinbutton.querySelector('[data-action="decrement"]');
    const incrementBtn = spinbutton.querySelector('[data-action="increment"]');
    
    if (!valueEl) return;

    const min = parseFloat(valueEl.getAttribute('aria-valuemin') || 0);
    const max = parseFloat(valueEl.getAttribute('aria-valuemax') || 100);
    const step = parseFloat(valueEl.getAttribute('data-step') || 1);

    function updateValue(newValue) {
      let val = newValue;
      if (val < min) val = min;
      if (val > max) val = max;

      valueEl.textContent = val;
      valueEl.setAttribute('aria-valuenow', val);

      // Update button states
      if (decrementBtn) decrementBtn.disabled = val <= min;
      if (incrementBtn) incrementBtn.disabled = val >= max;
    }

    if (decrementBtn) {
      decrementBtn.addEventListener('click', () => {
        const current = parseFloat(valueEl.getAttribute('aria-valuenow'));
        updateValue(current - step);
      });
    }

    if (incrementBtn) {
      incrementBtn.addEventListener('click', () => {
        const current = parseFloat(valueEl.getAttribute('aria-valuenow'));
        updateValue(current + step);
      });
    }

    valueEl.addEventListener('keydown', (e) => {
      const current = parseFloat(valueEl.getAttribute('aria-valuenow'));
      switch(e.key) {
        case 'ArrowUp':
          e.preventDefault();
          updateValue(current + step);
          break;
        case 'ArrowDown':
          e.preventDefault();
          updateValue(current - step);
          break;
        case 'Home':
          e.preventDefault();
          updateValue(min);
          break;
        case 'End':
          e.preventDefault();
          updateValue(max);
          break;
        case 'PageUp':
          e.preventDefault();
          updateValue(current + step * 10);
          break;
        case 'PageDown':
          e.preventDefault();
          updateValue(current - step * 10);
          break;
      }
    });

    // Initialize
    const initialValue = parseFloat(valueEl.getAttribute('aria-valuenow') || min);
    updateValue(initialValue);
  });
}

/* E.8 Toolbar */
function initToolbars() {
  const toolbars = document.querySelectorAll('[role="toolbar"]');

  toolbars.forEach(toolbar => {
    const controls = Array.from(toolbar.querySelectorAll('button, [role="button"]'));
    
    toolbar.addEventListener('keydown', (e) => {
      const currentIndex = controls.indexOf(document.activeElement);
      let nextIndex = -1;

      switch(e.key) {
        case 'ArrowRight':
          nextIndex = (currentIndex + 1) % controls.length;
          break;
        case 'ArrowLeft':
          nextIndex = (currentIndex - 1 + controls.length) % controls.length;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = controls.length - 1;
          break;
      }

      if (nextIndex !== -1) {
        e.preventDefault();
        controls[nextIndex].focus();
      }
    });
  });
}

/* E.9 Table (Sortable) */
function initTables() {
  const tables = document.querySelectorAll('.wcag-table');

  tables.forEach(table => {
    const headers = table.querySelectorAll('thead th[aria-sort]');
    
    headers.forEach((header, columnIndex) => {
      header.addEventListener('click', () => {
        const currentSort = header.getAttribute('aria-sort');
        const newSort = currentSort === 'ascending' ? 'descending' : 'ascending';
        
        // Reset all headers
        headers.forEach(h => h.setAttribute('aria-sort', 'none'));
        header.setAttribute('aria-sort', newSort);

        // Sort table
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        rows.sort((a, b) => {
          const aText = a.cells[columnIndex].textContent.trim();
          const bText = b.cells[columnIndex].textContent.trim();
          
          // Try numeric comparison first
          const aNum = parseFloat(aText);
          const bNum = parseFloat(bText);
          
          if (!isNaN(aNum) && !isNaN(bNum)) {
            return newSort === 'ascending' ? aNum - bNum : bNum - aNum;
          }
          
          // Fallback to string comparison
          return newSort === 'ascending' 
            ? aText.localeCompare(bText)
            : bText.localeCompare(aText);
        });

        // Re-append sorted rows
        rows.forEach(row => tbody.appendChild(row));
      });

      // Keyboard support
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    });
  });
}

/* E.10 Grid */
function initGrids() {
  const grids = document.querySelectorAll('.wcag-grid[role="grid"]');

  grids.forEach(grid => {
    const cells = Array.from(grid.querySelectorAll('[role="gridcell"]'));
    let currentCell = 0;

    // Make grid focusable
    if (!grid.hasAttribute('tabindex')) {
      grid.setAttribute('tabindex', '0');
    }

    function focusCell(index) {
      if (index >= 0 && index < cells.length) {
        cells.forEach((cell, i) => {
          if (i === index) {
            cell.setAttribute('tabindex', '0');
            cell.focus();
          } else {
            cell.setAttribute('tabindex', '-1');
          }
        });
        currentCell = index;
      }
    }

    grid.addEventListener('keydown', (e) => {
      const row = Math.floor(currentCell / 3); // Assuming 3 columns
      const col = currentCell % 3;
      let newIndex = currentCell;

      switch(e.key) {
        case 'ArrowRight':
          newIndex = currentCell + 1;
          e.preventDefault();
          break;
        case 'ArrowLeft':
          newIndex = currentCell - 1;
          e.preventDefault();
          break;
        case 'ArrowDown':
          newIndex = currentCell + 3;
          e.preventDefault();
          break;
        case 'ArrowUp':
          newIndex = currentCell - 3;
          e.preventDefault();
          break;
        case 'Home':
          newIndex = row * 3;
          e.preventDefault();
          break;
        case 'End':
          newIndex = row * 3 + 2;
          e.preventDefault();
          break;
      }

      focusCell(newIndex);
    });

    // Initialize first cell
    if (cells.length > 0) {
      cells[0].setAttribute('tabindex', '0');
    }
  });
}

/* E.11 Tree View */
function initTreeViews() {
  const trees = document.querySelectorAll('.wcag-tree[role="tree"]');

  trees.forEach(tree => {
    const items = Array.from(tree.querySelectorAll('[role="treeitem"]'));

    items.forEach(item => {
      const content = item.querySelector('.tree-item-content');
      const hasChildren = item.querySelector('ul') !== null;

      if (hasChildren) {
        item.setAttribute('aria-expanded', 'false');
      }

      content.addEventListener('click', () => {
        // Toggle expansion
        if (hasChildren) {
          const isExpanded = item.getAttribute('aria-expanded') === 'true';
          item.setAttribute('aria-expanded', !isExpanded);
        }

        // Selection
        items.forEach(i => i.setAttribute('aria-selected', 'false'));
        item.setAttribute('aria-selected', 'true');
      });

      content.addEventListener('keydown', (e) => {
        const isExpanded = item.getAttribute('aria-expanded') === 'true';

        switch(e.key) {
          case 'ArrowRight':
            if (hasChildren && !isExpanded) {
              e.preventDefault();
              item.setAttribute('aria-expanded', 'true');
            }
            break;
          case 'ArrowLeft':
            if (hasChildren && isExpanded) {
              e.preventDefault();
              item.setAttribute('aria-expanded', 'false');
            }
            break;
          case 'Enter':
          case ' ':
            e.preventDefault();
            content.click();
            break;
        }
      });

      // Make focusable
      content.setAttribute('tabindex', item === items[0] ? '0' : '-1');
    });
  });
}

/* E.12 Treegrid */
function initTreegrids() {
  const treegrids = document.querySelectorAll('.wcag-treegrid[role="treegrid"]');

  treegrids.forEach(treegrid => {
    const rows = Array.from(treegrid.querySelectorAll('[role="row"]'));
    
    rows.forEach(row => {
      const expandBtn = row.querySelector('.treegrid-expand-btn');
      const level = parseInt(row.getAttribute('aria-level') || 1);
      
      if (expandBtn) {
        row.setAttribute('aria-expanded', 'false');
        
        // Initialize: hide all child rows on page load
        let nextRow = row.nextElementSibling;
        while (nextRow && parseInt(nextRow.getAttribute('aria-level')) > level) {
          nextRow.hidden = true;
          nextRow.style.display = 'none';
          nextRow = nextRow.nextElementSibling;
        }
        
        expandBtn.addEventListener('click', () => {
          const isExpanded = row.getAttribute('aria-expanded') === 'true';
          const newState = !isExpanded;
          
          row.setAttribute('aria-expanded', newState);
          expandBtn.textContent = newState ? '▼' : '▶';
          expandBtn.setAttribute('aria-label', newState ? 'Collapse' : 'Expand');
          
          // Toggle child rows
          let nextRow = row.nextElementSibling;
          while (nextRow && parseInt(nextRow.getAttribute('aria-level')) > level) {
            nextRow.hidden = !newState; // If expanding (newState=true), show (hidden=false)
            nextRow.style.display = newState ? '' : 'none';
            nextRow = nextRow.nextElementSibling;
          }
        });
      }
    });
  });
}

/* E.13 Feed */
function initFeeds() {
  const feeds = document.querySelectorAll('.wcag-feed[role="feed"]');

  feeds.forEach(feed => {
    let articleCount = feed.querySelectorAll('[role="article"]').length;
    const loadingIndicator = feed.querySelector('.feed-loading');

    feed.addEventListener('scroll', () => {
      const scrollTop = feed.scrollTop;
      const scrollHeight = feed.scrollHeight;
      const clientHeight = feed.clientHeight;

      // Load more when near bottom
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        loadMoreArticles();
      }
    });

    function loadMoreArticles() {
      if (loadingIndicator && !loadingIndicator.hidden) return; // Already loading

      if (loadingIndicator) loadingIndicator.hidden = false;

      // Simulate loading
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          const article = document.createElement('article');
          article.className = 'feed-article';
          article.setAttribute('role', 'article');
          article.setAttribute('aria-posinset', ++articleCount);
          article.setAttribute('aria-setsize', '-1');
          article.setAttribute('tabindex', '0');
          article.innerHTML = `
            <h4>Articolo ${articleCount}</h4>
            <p>Contenuto caricato dinamicamente. Questo è un esempio di pattern Feed per infinite scroll accessibile.</p>
          `;
          feed.insertBefore(article, loadingIndicator);
        }
        
        if (loadingIndicator) loadingIndicator.hidden = true;
      }, 500);
    }
  });
}

/* E.14 Window Splitter */
function initSplitters() {
  const splitters = document.querySelectorAll('.wcag-splitter');

  splitters.forEach(splitter => {
    const container = splitter.parentElement;
    const pane1 = splitter.previousElementSibling;
    const pane2 = splitter.nextElementSibling;
    
    if (!pane1 || !pane2) return;

    let isDragging = false;
    let startX = 0;
    let startWidth = 0;

    splitter.setAttribute('tabindex', '0');
    splitter.setAttribute('role', 'separator');
    splitter.setAttribute('aria-valuenow', '50');
    splitter.setAttribute('aria-valuemin', '10');
    splitter.setAttribute('aria-valuemax', '90');

    function updateSplit(percent) {
      if (percent < 10) percent = 10;
      if (percent > 90) percent = 90;
      
      pane1.style.flex = `0 0 ${percent}%`;
      pane2.style.flex = `1`;
      splitter.setAttribute('aria-valuenow', Math.round(percent));
    }

    splitter.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startWidth = pane1.offsetWidth;
      document.body.style.cursor = 'col-resize';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const delta = e.clientX - startX;
      const newWidth = startWidth + delta;
      const percent = (newWidth / container.offsetWidth) * 100;
      updateSplit(percent);
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      document.body.style.cursor = '';
    });

    // Keyboard support
    splitter.addEventListener('keydown', (e) => {
      const current = parseFloat(splitter.getAttribute('aria-valuenow'));
      let newPercent = current;

      switch(e.key) {
        case 'ArrowLeft':
          newPercent = current - 5;
          e.preventDefault();
          break;
        case 'ArrowRight':
          newPercent = current + 5;
          e.preventDefault();
          break;
        case 'Home':
          newPercent = 10;
          e.preventDefault();
          break;
        case 'End':
          newPercent = 90;
          e.preventDefault();
          break;
      }

      updateSplit(newPercent);
    });

    // Initialize at 50/50
    updateSplit(50);
  });
}

/* --- F. Nuovi componenti APG --- */

function initMenuButtons() {
  const menus = document.querySelectorAll('.wcag-menu-button');

  menus.forEach(menuWrapper => {
    const trigger = menuWrapper.querySelector('.menu-button-trigger');
    const menu = menuWrapper.querySelector('[role="menu"]');
    const items = Array.from(menu?.querySelectorAll('[role="menuitem"]') || []);

    if (!trigger || !menu) return;

    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    menu.hidden = true;

    function closeMenu() {
      trigger.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      menuWrapper.classList.remove('menu-button--open');
    }

    function openMenu() {
      trigger.setAttribute('aria-expanded', 'true');
      menu.hidden = false;
      menuWrapper.classList.add('menu-button--open');
      if (items[0]) items[0].focus();
    }

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMenu();
      }
    });

    menu.addEventListener('keydown', (e) => {
      const currentIndex = items.indexOf(document.activeElement);
      let nextIndex = currentIndex;

      switch (e.key) {
        case 'ArrowDown':
          nextIndex = (currentIndex + 1) % items.length;
          e.preventDefault();
          break;
        case 'ArrowUp':
          nextIndex = (currentIndex - 1 + items.length) % items.length;
          e.preventDefault();
          break;
        case 'Home':
          nextIndex = 0;
          e.preventDefault();
          break;
        case 'End':
          nextIndex = items.length - 1;
          e.preventDefault();
          break;
        case 'Escape':
          closeMenu();
          trigger.focus();
          break;
        case 'Tab':
          closeMenu();
          break;
      }

      if (nextIndex !== currentIndex && items[nextIndex]) {
        items[nextIndex].focus();
      }
    });

    items.forEach(item => {
      item.addEventListener('click', () => {
        closeMenu();
        trigger.focus();
      });
    });

    document.addEventListener('click', (e) => {
      if (!menuWrapper.contains(e.target)) {
        closeMenu();
      }
    });
  });
}

function initMenubars() {
  const menubars = document.querySelectorAll('.wcag-menubar[role="menubar"]');

  menubars.forEach(bar => {
    const rootItems = Array.from(bar.querySelectorAll('[role="menuitem"]')).filter(item => item.closest('[role="menu"]') === null || item.closest('[role="menu"]').getAttribute('role') !== 'menu');

    function closeSubmenus(except) {
      bar.querySelectorAll('[role="menu"]').forEach(menu => {
        if (menu !== except) {
          menu.hidden = true;
          const parentButton = menu.previousElementSibling;
          if (parentButton && parentButton.getAttribute('role') === 'menuitem') {
            parentButton.setAttribute('aria-expanded', 'false');
          }
        }
      });
    }

    function focusRoot(index) {
      const item = rootItems[index];
      if (item) item.focus();
    }

    rootItems.forEach((item, index) => {
      const submenu = item.nextElementSibling && item.nextElementSibling.getAttribute('role') === 'menu'
        ? item.nextElementSibling
        : null;

      if (submenu) {
        submenu.hidden = true;
        item.setAttribute('aria-haspopup', 'true');
        item.setAttribute('aria-expanded', 'false');
      }

      item.addEventListener('click', () => {
        if (!submenu) return;
        const isOpen = item.getAttribute('aria-expanded') === 'true';
        closeSubmenus(isOpen ? null : submenu);
        item.setAttribute('aria-expanded', String(!isOpen));
        submenu.hidden = isOpen;
        if (!isOpen) {
          const firstSubItem = submenu.querySelector('[role="menuitem"]');
          firstSubItem?.focus();
        }
      });

      item.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowRight':
            e.preventDefault();
            focusRoot((index + 1) % rootItems.length);
            break;
          case 'ArrowLeft':
            e.preventDefault();
            focusRoot((index - 1 + rootItems.length) % rootItems.length);
            break;
          case 'ArrowDown':
            if (submenu) {
              e.preventDefault();
              closeSubmenus(submenu);
              item.setAttribute('aria-expanded', 'true');
              submenu.hidden = false;
              const firstSubItem = submenu.querySelector('[role="menuitem"]');
              firstSubItem?.focus();
            }
            break;
          case 'Escape':
            closeSubmenus();
            item.focus();
            break;
          case 'Home':
            e.preventDefault();
            focusRoot(0);
            break;
          case 'End':
            e.preventDefault();
            focusRoot(rootItems.length - 1);
            break;
        }
      });
    });

    bar.addEventListener('keydown', (e) => {
      const activeMenuItem = e.target.closest('[role="menuitem"]');
      const parentMenu = activeMenuItem?.closest('[role="menu"]');
      if (!parentMenu || parentMenu === bar) return;

      const subItems = Array.from(parentMenu.querySelectorAll('[role="menuitem"]'));
      const currentIndex = subItems.indexOf(activeMenuItem);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          subItems[(currentIndex + 1) % subItems.length].focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          subItems[(currentIndex - 1 + subItems.length) % subItems.length].focus();
          break;
        case 'Escape':
          e.preventDefault();
          parentMenu.hidden = true;
          const controller = parentMenu.previousElementSibling;
          if (controller) {
            controller.setAttribute('aria-expanded', 'false');
            controller.focus();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          const parentRootIndex = rootItems.indexOf(parentMenu.previousElementSibling);
          if (parentRootIndex > -1) {
            closeSubmenus();
            focusRoot((parentRootIndex - 1 + rootItems.length) % rootItems.length);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          const parentRootIndexRight = rootItems.indexOf(parentMenu.previousElementSibling);
          if (parentRootIndexRight > -1) {
            closeSubmenus();
            focusRoot((parentRootIndexRight + 1) % rootItems.length);
          }
          break;
      }
    });

    document.addEventListener('click', (e) => {
      if (!bar.contains(e.target)) {
        closeSubmenus();
      }
    });
  });
}

function initSwitches() {
  const switches = document.querySelectorAll('.wcag-switch [role="switch"]');

  switches.forEach(sw => {
    const wrapper = sw.closest('.wcag-switch');
    function setState(on) {
      sw.setAttribute('aria-checked', on);
      wrapper?.classList.toggle('is-on', on);
      sw.textContent = on ? 'On' : 'Off';
      sw.dispatchEvent(new CustomEvent('switchChange', { detail: { checked: on }, bubbles: true }));
    }

    sw.addEventListener('click', () => {
      const isOn = sw.getAttribute('aria-checked') === 'true';
      setState(!isOn);
    });

    sw.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const isOn = sw.getAttribute('aria-checked') === 'true';
        setState(!isOn);
      }
    });

    // Initialize
    setState(sw.getAttribute('aria-checked') === 'true');
  });
}

function initProgressbars() {
  const bars = document.querySelectorAll('.wcag-progressbar');

  bars.forEach(bar => {
    const fill = bar.querySelector('.progressbar-fill');
    const label = bar.querySelector('.progressbar-label');
    const min = parseFloat(bar.getAttribute('aria-valuemin') || '0');
    const max = parseFloat(bar.getAttribute('aria-valuemax') || '100');

    function setProgress(value) {
      let v = value;
      if (v < min) v = min;
      if (v > max) v = max;
      bar.setAttribute('aria-valuenow', v);
      const percent = ((v - min) / (max - min)) * 100;
      if (fill) fill.style.width = `${percent}%`;
      if (label) label.textContent = `${Math.round(percent)}%`;
    }

    const startValue = parseFloat(bar.getAttribute('aria-valuenow') || min);
    setProgress(startValue);

    // Demo buttons (optional)
    const increaseBtn = bar.parentElement?.querySelector('[data-progress-action="increase"]');
    const resetBtn = bar.parentElement?.querySelector('[data-progress-action="reset"]');

    if (increaseBtn) {
      increaseBtn.addEventListener('click', () => {
        const current = parseFloat(bar.getAttribute('aria-valuenow') || min);
        setProgress(current + 10);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        setProgress(min);
      });
    }
  });
}

function initRadioGroups() {
  const groups = document.querySelectorAll('.wcag-radiogroup[role="radiogroup"]');

  groups.forEach(group => {
    const radios = Array.from(group.querySelectorAll('[role="radio"]'));

    function setChecked(index) {
      radios.forEach((radio, i) => {
        const isSelected = i === index;
        radio.setAttribute('aria-checked', isSelected);
        radio.setAttribute('tabindex', isSelected ? '0' : '-1');
      });
      radios[index]?.focus();
      group.dispatchEvent(new CustomEvent('radioChange', { detail: { index }, bubbles: true }));
    }

    radios.forEach((radio, index) => {
      radio.addEventListener('click', () => setChecked(index));

      radio.addEventListener('keydown', (e) => {
        let next = index;
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            next = (index + 1) % radios.length;
            e.preventDefault();
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            next = (index - 1 + radios.length) % radios.length;
            e.preventDefault();
            break;
          case 'Home':
            next = 0;
            e.preventDefault();
            break;
          case 'End':
            next = radios.length - 1;
            e.preventDefault();
            break;
          case ' ':
          case 'Enter':
            e.preventDefault();
            setChecked(index);
            return;
        }
        setChecked(next);
      });
    });

    // Initialize first checked or first item
    const presetIndex = radios.findIndex(r => r.getAttribute('aria-checked') === 'true');
    setChecked(presetIndex >= 0 ? presetIndex : 0);
  });
}

function initAlertdialogs() {
  const triggers = document.querySelectorAll('[data-alertdialog-target]');
  const overlays = document.querySelectorAll('.alertdialog-overlay');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetId = trigger.getAttribute('data-alertdialog-target');
      const dialog = document.getElementById(targetId);
      if (dialog) openDialog(dialog, trigger);
    });
  });

  overlays.forEach(overlay => {
    const closeButtons = overlay.querySelectorAll('[data-alertdialog-close]');
    closeButtons.forEach(btn => btn.addEventListener('click', () => closeDialog(overlay)));
  });

  function openDialog(dialog, trigger) {
    dialog.setAttribute('aria-hidden', 'false');
    dialog.triggerElement = trigger;
    const focusable = dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }

    function onKeydown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDialog(dialog);
      }
      trapFocus(e);
    }

    dialog.addEventListener('keydown', onKeydown);
    dialog.keydownHandler = onKeydown;
  }

  function closeDialog(dialog) {
    dialog.setAttribute('aria-hidden', 'true');
    if (dialog.keydownHandler) {
      dialog.removeEventListener('keydown', dialog.keydownHandler);
    }
    if (dialog.triggerElement) {
      dialog.triggerElement.focus();
      dialog.triggerElement = null;
    }
  }
}

function initLanguageMenus() {
  const langMenus = document.querySelectorAll('.wcag-language-menu');

  langMenus.forEach(menu => {
    const trigger = menu.querySelector('.language-menu-trigger');
    const items = Array.from(menu.querySelectorAll('[data-lang]'));
    const popup = menu.querySelector('[role="menu"]');

    if (!trigger || !popup) return;

    popup.hidden = true;
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');

    function close() {
      trigger.setAttribute('aria-expanded', 'false');
      popup.hidden = true;
    }

    function open() {
      trigger.setAttribute('aria-expanded', 'true');
      popup.hidden = false;
      items[0]?.focus();
    }

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      isOpen ? close() : open();
    });

    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(i => i.setAttribute('aria-pressed', 'false'));
        item.setAttribute('aria-pressed', 'true');
        trigger.textContent = item.textContent;
        trigger.dataset.currentLang = item.dataset.lang;
        close();
        trigger.dispatchEvent(new CustomEvent('languageChange', { detail: { lang: item.dataset.lang }, bubbles: true }));
      });
    });

    popup.addEventListener('keydown', (e) => {
      const currentIndex = items.indexOf(document.activeElement);
      let nextIndex = currentIndex;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = (currentIndex + 1) % items.length;
          break;
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = (currentIndex - 1 + items.length) % items.length;
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = items.length - 1;
          break;
        case 'Escape':
          e.preventDefault();
          close();
          trigger.focus();
          return;
      }
      if (nextIndex !== currentIndex && items[nextIndex]) {
        items[nextIndex].focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target)) close();
    });
  });
}

function initToasts() {
  // No-op initialization; helper exposed globally
  window.showToast = function(message, options = {}) {
    const { type = 'status', timeout = 4000 } = options;
    let container = document.getElementById('apg-toasts');
    if (!container) {
      container = document.createElement('div');
      container.id = 'apg-toasts';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `wcag-toast wcag-toast-${type}`;
    toast.setAttribute('role', type === 'alert' ? 'alert' : 'status');
    toast.tabIndex = 0;
    toast.textContent = message;

    container.appendChild(toast);
    toast.focus();

    setTimeout(() => {
      toast.classList.add('is-leaving');
      setTimeout(() => toast.remove(), 300);
    }, timeout);
  };

  // Demo triggers
  const demoBtns = document.querySelectorAll('[data-toast-message]');
  demoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const msg = btn.getAttribute('data-toast-message') || 'Status update';
      const type = btn.getAttribute('data-toast-type') || 'status';
      window.showToast(msg, { type });
    });
  });
}

function initPagination() {
  const paginations = document.querySelectorAll('.wcag-pagination');

  paginations.forEach(pagination => {
    const total = parseInt(pagination.getAttribute('data-total-pages') || '1', 10);
    let current = parseInt(pagination.getAttribute('data-current-page') || '1', 10);
    const list = pagination.querySelector('.pagination-list');
    const prevBtn = pagination.querySelector('[data-pagination="prev"]');
    const nextBtn = pagination.querySelector('[data-pagination="next"]');

    function render() {
      list.innerHTML = '';
      for (let i = 1; i <= total; i++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = i;
        btn.className = 'pagination-page';
        btn.setAttribute('aria-label', `Vai alla pagina ${i}`);
        btn.setAttribute('aria-current', i === current ? 'page' : 'false');
        btn.disabled = i === current;
        btn.addEventListener('click', () => {
          current = i;
          pagination.setAttribute('data-current-page', String(current));
          pagination.dispatchEvent(new CustomEvent('pageChange', { detail: { page: current }, bubbles: true }));
          render();
        });
        list.appendChild(btn);
      }

      if (prevBtn) prevBtn.disabled = current === 1;
      if (nextBtn) nextBtn.disabled = current === total;
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (current > 1) {
          current -= 1;
          render();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (current < total) {
          current += 1;
          render();
        }
      });
    }

    pagination.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          if (current < total) {
            current += 1;
            render();
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (current > 1) {
            current -= 1;
            render();
          }
          break;
        case 'Home':
          e.preventDefault();
          current = 1;
          render();
          break;
        case 'End':
          e.preventDefault();
          current = total;
          render();
          break;
      }
    });

    render();
  });
}

