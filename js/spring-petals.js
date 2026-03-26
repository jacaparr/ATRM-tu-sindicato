/**
 * Pétalos cayendo por toda la pí¡gina
 * Script para generar pétalos (azahar/flores de primavera) animados
 */

(function() {
  'use strict';

  function initSpringPetals() {
    // Crear canvas para los pétalos si no existe
    if (document.getElementById('spring-petals')) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'spring-petals';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Configurar tamaño
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Crear pétalos - colores de azahar (blanco), y flores típicas del Bando (rosas, rojos suaves)
    const petals = [];
    const petalCount = 35; // Menos que la nieve para no saturar
    const colors = ['#ffffff', '#ffb7b2', '#ff9a9e', '#fecfef', '#ffffff', '#ffd1dc'];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 4,
        speedY: Math.random() * 1.2 + 0.5,
        speedX: Math.random() * 2 - 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 2 - 1) * 0.03,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach(petal => {
        // Movimiento de caída mí¡s suave y ondulante
        petal.y += petal.speedY;
        petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.8;
        petal.rotation += petal.rotationSpeed;

        // Resetear pétalo si sale de la pantalla
        if (petal.y > canvas.height + 10) {
          petal.y = -10;
          petal.x = Math.random() * canvas.width;
        }
        if (petal.x > canvas.width + 10) {
          petal.x = -10;
        } else if (petal.x < -10) {
          petal.x = canvas.width + 10;
        }

        // Dibujar pétalo (forma curvada asimétrica)
        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);
        
        ctx.beginPath();
        ctx.fillStyle = petal.color;
        
        // Sombra suave para darle efecto 3D
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 2;
        
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(petal.size, -petal.size, 0, -petal.size * 2);
        ctx.quadraticCurveTo(-petal.size, -petal.size * 0.5, 0, 0);
        
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpringPetals);
  } else {
    initSpringPetals();
  }
})();

