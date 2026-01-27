// ATRM Professional Animations & Microinteractions

(function() {
  'use strict';

  // ============================================
  // 1. SMOOTH SCROLL ANIMATIONS
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Initialize scroll animations
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.premium-card, .glass-card, .grid > *');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      animateOnScroll.observe(el);
    });
  }

  // ============================================
  // 2. STICKY HEADER EFFECT
  // ============================================
  function initStickyHeader() {
    const header = document.querySelector('.premium-header');
    if (!header) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }

  // ============================================
  // 3. BACK TO TOP BUTTON
  // ============================================
  function initBackToTop() {
    let btn = document.querySelector('.back-to-top');
    
    // Create button if doesn't exist
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'back-to-top';
      btn.innerHTML = '↑';
      btn.setAttribute('aria-label', 'Volver arriba');
      document.body.appendChild(btn);
    }

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    // Scroll to top on click
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================
  // 4. BUTTON RIPPLE EFFECT
  // ============================================
  function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn-premium, button');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          left: ${x}px;
          top: ${y}px;
          pointer-events: none;
          animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add ripple animation
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes ripple {
          from {
            transform: scale(0);
            opacity: 1;
          }
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ============================================
  // 5. CARD TILT EFFECT (3D hover)
  // ============================================
  function initCardTilt() {
    const cards = document.querySelectorAll('.premium-card, .glass-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ============================================
  // 6. LOADING STATES
  // ============================================
  function showLoading(element) {
    if (!element) return;
    
    element.style.position = 'relative';
    element.style.pointerEvents = 'none';
    element.style.opacity = '0.6';
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255, 107, 53, 0.2);
      border-top-color: #FF6B35;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    `;
    
    element.appendChild(spinner);
    
    // Add spin animation
    if (!document.getElementById('spin-style')) {
      const style = document.createElement('style');
      style.id = 'spin-style';
      style.textContent = `
        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  function hideLoading(element) {
    if (!element) return;
    
    element.style.pointerEvents = '';
    element.style.opacity = '';
    
    const spinner = element.querySelector('.loading-spinner');
    if (spinner) spinner.remove();
  }

  // ============================================
  // 7. SMOOTH PAGE TRANSITIONS
  // ============================================
  function initPageTransitions() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    window.addEventListener('load', () => {
      document.body.style.opacity = '1';
    });
    
    // Fade out on link clicks
    const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.target !== '_blank' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          document.body.style.opacity = '0';
          setTimeout(() => {
            window.location.href = link.href;
          }, 300);
        }
      });
    });
  }

  // ============================================
  // 8. PARALLAX EFFECT
  // ============================================
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
      parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        const yPos = -(window.pageYOffset * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // ============================================
  // 9. NUMBER COUNTER ANIMATION
  // ============================================
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString('es-ES');
    }, 16);
  }

  // ============================================
  // INITIALIZE ALL
  // ============================================
  function init() {
    // Wait for DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    initScrollAnimations();
    initStickyHeader();
    initBackToTop();
    initRippleEffect();
    initCardTilt();
    // initPageTransitions(); // Uncomment if needed
    initParallax();
    
    // Expose utility functions
    window.ATRM = window.ATRM || {};
    window.ATRM.showLoading = showLoading;
    window.ATRM.hideLoading = hideLoading;
    window.ATRM.animateCounter = animateCounter;
  }

  init();
})();
