// Configuración del canvas para efectos de fondo
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Redimensionar canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Partículas de fondo
const particles = [];
const particleCount = 50;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.3 + 0.1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = '#00ffff';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ffff';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Crear partículas
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Animar partículas
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

// Cursor personalizado con efecto neon mejorado
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
const trails = [];
const trailLength = 15;

// Crear elementos de rastro
for (let i = 0; i < trailLength; i++) {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  document.body.appendChild(trail);
  trails.push({
    element: trail,
    x: 0,
    y: 0,
    delay: i * 2
  });
}

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

// Seguir el movimiento del mouse con suavizado
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Función de animación del cursor
function animateCursor() {
  // Suavizado del movimiento
  targetX += (mouseX - targetX) * 0.1;
  targetY += (mouseY - targetY) * 0.1;

  // Posicionar cursor principal
  cursor.style.left = (targetX - 15) + 'px';
  cursor.style.top = (targetY - 15) + 'px';

  // Posicionar punto central
  cursorDot.style.left = (targetX - 3) + 'px';
  cursorDot.style.top = (targetY - 3) + 'px';

  // Actualizar rastros con delay
  for (let i = trails.length - 1; i > 0; i--) {
    trails[i].x += (trails[i - 1].x - trails[i].x) * 0.3;
    trails[i].y += (trails[i - 1].y - trails[i].y) * 0.3;
  }
  trails[0].x = targetX;
  trails[0].y = targetY;

  // Aplicar posiciones con opacidad decreciente
  trails.forEach((trail, index) => {
    const opacity = Math.max(0, (trailLength - index) / trailLength * 0.8);
    const size = Math.max(2, 8 - index * 0.3);

    trail.element.style.left = (trail.x - size / 2) + 'px';
    trail.element.style.top = (trail.y - size / 2) + 'px';
    trail.element.style.opacity = opacity;
    trail.element.style.width = size + 'px';
    trail.element.style.height = size + 'px';
    trail.element.style.boxShadow = `0 0 ${10 + index}px rgba(0, 255, 255, ${opacity})`;
  });

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Efecto al hacer hover sobre enlaces
const links = document.querySelectorAll('a, button');
links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    cursor.style.borderColor = '#ff00ff';
    cursor.style.boxShadow = `
                    0 0 15px #ff00ff,
                    0 0 25px #ff00ff,
                    0 0 35px #ff00ff,
                    inset 0 0 15px rgba(255, 0, 255, 0.3)
                `;
    cursorDot.style.background = '#ff00ff';
    cursorDot.style.boxShadow = '0 0 15px #ff00ff';
  });

  link.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.borderColor = '#00ffff';
    cursor.style.boxShadow = `
                    0 0 10px #00ffff,
                    0 0 20px #00ffff,
                    0 0 30px #00ffff,
                    inset 0 0 10px rgba(0, 255, 255, 0.2)
                `;
    cursorDot.style.background = '#00ffff';
    cursorDot.style.boxShadow = '0 0 10px #00ffff';
  });
});

// Click effect
document.addEventListener('mousedown', () => {
  cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'scale(1)';
});

// Ocultar cursor en dispositivos móviles
if (window.innerWidth <= 768) {
  cursor.style.display = 'none';
  cursorDot.style.display = 'none';
  trails.forEach(trail => trail.element.style.display = 'none');
}

// Configuración del carousel
        const carousel = document.getElementById('carousel');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const indicatorsContainer = document.getElementById('indicators');
        
        const cards = document.querySelectorAll('.product-card');
        const totalCards = cards.length;
        let currentIndex = 0;
        const cardsPerView = window.innerWidth > 768 ? 3 : 1;
        const maxIndex = Math.max(0, totalCards - cardsPerView);

        // Crear indicadores
        for (let i = 0; i <= maxIndex; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }

        const indicators = document.querySelectorAll('.indicator');

        // Función para ir a slide específico
        function goToSlide(index) {
            currentIndex = index;
            const translateX = -(currentIndex * (400 + 32)); // 400px card width + 32px margin
            carousel.style.transform = `translateX(${translateX}px)`;
            
            // Actualizar indicadores
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        }

        // Siguiente slide
        function nextSlide() {
            if (currentIndex < maxIndex) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0); // Volver al inicio
            }
        }

        // Slide anterior
        function prevSlide() {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(maxIndex); // Ir al final
            }
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto-play opcional (descomenta para activar)
        // setInterval(nextSlide, 5000);

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });

        // Soporte para gestos táctiles básicos
        let startX = 0;
        let endX = 0;

        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Umbral mínimo para el swipe
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        });

        // Responsive: recalcular en resize
        window.addEventListener('resize', () => {
            goToSlide(0); // Resetear al primer slide
        });

