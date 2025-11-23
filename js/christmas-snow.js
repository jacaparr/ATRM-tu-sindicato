/**
 * Nieve cayendo por toda la página
 * Script para generar copos de nieve animados
 */

(function() {
  'use strict';
  
  function initChristmasSnow() {
    // Crear canvas para la nieve
    const canvas = document.createElement('canvas');
    canvas.id = 'christmas-snow';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Configurar tamaño
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    // Crear copos de nieve
    const snowflakes = [];
    const snowflakeCount = 80;
    
    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speedY: Math.random() * 1 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.6 + 0.4
      });
    }
    
    // Animar copos
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      snowflakes.forEach(flake => {
        ctx.save();
        ctx.globalAlpha = flake.opacity;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffffff';
        ctx.fill();
        ctx.restore();
        
        // Mover el copo
        flake.y += flake.speedY;
        flake.x += flake.speedX;
        
        // Reaparece arriba cuando sale por abajo
        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }
        
        // Mantener dentro de los límites horizontales
        if (flake.x > canvas.width) flake.x = 0;
        if (flake.x < 0) flake.x = canvas.width;
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }
  
  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChristmasSnow);
  } else {
    initChristmasSnow();
  }
})();
