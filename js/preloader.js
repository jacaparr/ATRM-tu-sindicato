/**
 * Preloader Controller for ATRM tu sindicato
 * Handles the loading animation and smooth transition to main content
 */

(function() {
  'use strict';
  
  // Configuration
  const CONFIG = {
    FADE_OUT_DURATION: 800, // milliseconds (matches CSS transition)
    MAX_DISPLAY_TIME: 5000, // 5 seconds safety timeout
    MIN_DISPLAY_TIME: 500   // Minimum time to show preloader (for better UX)
  };

  let startTime = Date.now();
  let hasRemoved = false;
  
  /**
   * Remove the preloader from the DOM
   */
  function removePreloader() {
    if (hasRemoved) return;
    hasRemoved = true;
    
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    // Add fade-out class to trigger CSS animation
    preloader.classList.add('fade-out');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      if (preloader && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
      
      // Re-enable body scroll
      document.body.classList.remove('preloader-active');
    }, CONFIG.FADE_OUT_DURATION);
  }
  
  /**
   * Handle page load completion
   */
  function onPageLoad() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, CONFIG.MIN_DISPLAY_TIME - elapsedTime);
    
    // Ensure minimum display time for better UX
    setTimeout(removePreloader, remainingTime);
  }
  
  /**
   * Safety timeout to ensure preloader doesn't stay forever
   */
  function setSafetyTimeout() {
    setTimeout(() => {
      if (!hasRemoved) {
        console.warn('Preloader: Safety timeout triggered after 5 seconds');
        removePreloader();
      }
    }, CONFIG.MAX_DISPLAY_TIME);
  }
  
  /**
   * Initialize preloader behavior
   */
  function init() {
    // Prevent body scroll while preloader is active
    document.body.classList.add('preloader-active');
    
    // Set up safety timeout
    setSafetyTimeout();
    
    // Listen for page load
    if (document.readyState === 'complete') {
      // Page already loaded
      onPageLoad();
    } else {
      // Wait for page to load
      window.addEventListener('load', onPageLoad);
    }
    
    // Also listen for DOMContentLoaded as a fallback
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        // If window.onload doesn't fire quickly, use DOMContentLoaded + small delay
        setTimeout(() => {
          if (!hasRemoved && document.readyState === 'interactive') {
            onPageLoad();
          }
        }, 1000);
      });
    }
  }
  
  // Initialize when script loads
  init();
})();
