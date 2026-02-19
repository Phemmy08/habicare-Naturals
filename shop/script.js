/* ============================================================
   HABIECARE NATURALS — SHOP PAGE JAVASCRIPT
   shop.js — Vanilla JS only, defensive coding throughout
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     1. INITIALIZE LUCIDE ICONS
  ---------------------------------------------------------- */
  function initLucide() {
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    } else {
      console.warn('[HabieCare] Lucide icons library not found.');
    }
  }

  /* ----------------------------------------------------------
     2. HEADER SCROLL EFFECT
     Adds "header-scrolled" class when page scrolled >= 50px
  ---------------------------------------------------------- */
  function initScrollHeader() {
    var header = document.getElementById('siteHeader');
    if (!header) return;

    var SCROLL_THRESHOLD = 50;
    var ticking = false;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY >= SCROLL_THRESHOLD) {
            header.classList.add('header-scrolled');
          } else {
            header.classList.remove('header-scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Run once on init in case page loads mid-scroll
    onScroll();
  }

  /* ----------------------------------------------------------
     3. MOBILE MENU TOGGLE
     Hamburger open / close + overlay + escape key + body scroll lock
  ---------------------------------------------------------- */
  function initMobileMenu() {
    var hamburgerBtn  = document.getElementById('hamburgerBtn');
    var mobileMenu    = document.getElementById('mobileMenu');
    var mobileOverlay = document.getElementById('mobileOverlay');
    var mobileCloseBtn = document.getElementById('mobileCloseBtn');

    if (!hamburgerBtn || !mobileMenu || !mobileOverlay) return;

    var isOpen = false;

    /* Open menu */
    function openMenu() {
      isOpen = true;

      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');

      // Overlay: show then fade in
      mobileOverlay.classList.add('visible');
      // Force reflow before adding active class so transition fires
      void mobileOverlay.offsetWidth;
      mobileOverlay.classList.add('active');

      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');

      // Move focus into menu for accessibility
      if (mobileCloseBtn) {
        mobileCloseBtn.focus();
      }
    }

    /* Close menu */
    function closeMenu() {
      isOpen = false;

      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');

      mobileOverlay.classList.remove('active');

      // Wait for overlay fade out then hide
      mobileOverlay.addEventListener(
        'transitionend',
        function handler() {
          mobileOverlay.classList.remove('visible');
          mobileOverlay.removeEventListener('transitionend', handler);
        }
      );

      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');

      // Return focus to hamburger
      hamburgerBtn.focus();
    }

    /* Toggle */
    function toggleMenu() {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    /* Event: hamburger button */
    hamburgerBtn.addEventListener('click', toggleMenu);

    /* Event: close button inside mobile menu */
    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', closeMenu);
    }

    /* Event: overlay click */
    mobileOverlay.addEventListener('click', function () {
      if (isOpen) closeMenu();
    });

    /* Event: Escape key */
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.keyCode === 27) && isOpen) {
        closeMenu();
      }
    });

    /* Close menu when a mobile nav link is clicked */
    var mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (isOpen) closeMenu();
      });
    });
  }

  /* ----------------------------------------------------------
     4. CART STATE
     Simple in-memory cart counter
  ---------------------------------------------------------- */
  var cartCount = 0;

  function getCartBadges() {
    return document.querySelectorAll('.cart-badge');
  }

  function updateCartBadges(count) {
    var badges = getCartBadges();
    badges.forEach(function (badge) {
      badge.textContent = count;

      // Trigger bump animation
      badge.classList.remove('bump');
      void badge.offsetWidth; // reflow
      badge.classList.add('bump');

      setTimeout(function () {
        badge.classList.remove('bump');
      }, 400);
    });
  }

  /* ----------------------------------------------------------
     5. CART TOAST NOTIFICATION
  ---------------------------------------------------------- */
  var toastTimer = null;

  function showToast(message) {
    var toast = document.getElementById('cartToast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    // Clear any existing timer
    if (toastTimer) clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
      toastTimer = null;
    }, 2800);
  }

  /* ----------------------------------------------------------
     6. ADD TO CART INTERACTION
  ---------------------------------------------------------- */
  function initAddToCart() {
    var addToCartBtns = document.querySelectorAll('.add-to-cart');

    if (!addToCartBtns.length) return;

    addToCartBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var productName = btn.getAttribute('data-product') || 'Product';
        var productPrice = btn.getAttribute('data-price') || '0';

        cartCount += 1;
        updateCartBadges(cartCount);

        // Console log for debugging / future API integration
        console.log('[HabieCare Cart] Item added:', {
          name: productName,
          price: Number(productPrice),
          quantity: 1,
          cartTotal: cartCount,
        });

        // User feedback
        showToast('\u2713 ' + productName + ' added to cart');

        // Button micro-feedback
        var originalText = btn.textContent;
        btn.textContent = 'Added!';
        btn.disabled = true;

        setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled = false;
        }, 1400);
      });
    });
  }

  /* ----------------------------------------------------------
     7. VIEW PRODUCT INTERACTION
     Placeholder: logs intent, ready for routing/modal
  ---------------------------------------------------------- */
  function initViewProduct() {
    var viewBtns = document.querySelectorAll('.btn-outline');

    if (!viewBtns.length) return;

    viewBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var productName = btn.getAttribute('data-product') || 'Product';

        console.log('[HabieCare] View product:', productName);
        // Future: navigate to product detail page or open modal
      });
    });
  }

  /* ----------------------------------------------------------
     8. SMOOTH SCROLL FOR ANCHOR LINKS
  ---------------------------------------------------------- */
  function initSmoothScroll() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        var headerHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
          10
        ) || 76;

        var targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      });
    });
  }

  /* ----------------------------------------------------------
     INIT — Run everything on DOMContentLoaded
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initLucide();
    initScrollHeader();
    initMobileMenu();
    initAddToCart();
    initViewProduct();
    initSmoothScroll();

    console.log('[HabieCare Naturals] Shop page initialized.');
  });

})();