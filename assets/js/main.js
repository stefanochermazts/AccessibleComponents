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

