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