document.addEventListener('DOMContentLoaded', () => {
    // ---- LÓGICA DO MODAL DE IMAGEM ----
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const modalImage = document.getElementById('modal-image');
    const closeFullscreenBtn = document.querySelector('.modal-close-btn');
    const modalSpinner = fullscreenModal?.querySelector('.spinner');

    if (fullscreenModal && modalImage && closeFullscreenBtn && modalSpinner) {
        const portfolioItems = document.querySelectorAll('.portfolio-full-item .image-overlay, .sample-item .image-overlay');
        let startX, startY, translateX = 0, translateY = 0, scale = 1;
        let isDragging = false;

        portfolioItems.forEach(overlay => {
            overlay.style.cursor = 'pointer'; // Indica que o overlay é clicável
            overlay.addEventListener('click', () => {
                const clickedImage = overlay.parentElement.querySelector('img');
                if (clickedImage) {
                    modalImage.src = ''; // Resetar src para evitar flickering
                    modalImage.classList.remove('loaded');
                    modalSpinner.classList.add('active');
                    translateX = 0;
                    translateY = 0;
                    scale = 1;
                    modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
                    modalImage.src = clickedImage.src;
                    modalImage.alt = clickedImage.alt;
                    fullscreenModal.classList.add('open');
                    document.body.classList.add('no-scroll');
                }
            });
        });

        modalImage.addEventListener('load', () => {
            modalSpinner.classList.remove('active');
            modalImage.classList.add('loaded');
        });

        closeFullscreenBtn.addEventListener('click', () => {
            fullscreenModal.classList.remove('open');
            document.body.classList.remove('no-scroll');
            modalImage.classList.remove('loaded');
            modalSpinner.classList.add('active');
            modalImage.src = '';
        });

        fullscreenModal.addEventListener('click', (event) => {
            if (event.target === fullscreenModal) {
                fullscreenModal.classList.remove('open');
                document.body.classList.remove('no-scroll');
                modalImage.classList.remove('loaded');
                modalSpinner.classList.add('active');
                modalImage.src = '';
            }
        });

        modalImage.addEventListener('wheel', (event) => {
            event.preventDefault();
            const zoomSpeed = 0.1;
            const minScale = 1;
            const maxScale = 3;
            scale += event.deltaY < 0 ? zoomSpeed : -zoomSpeed;
            scale = Math.min(Math.max(minScale, scale), maxScale);
            modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            modalImage.style.cursor = scale > 1 ? 'grab' : 'default';
        });

        modalImage.addEventListener('mousedown', (event) => {
            if (scale > 1) {
                isDragging = true;
                startX = event.clientX - translateX;
                startY = event.clientY - translateY;
                modalImage.style.cursor = 'grabbing';
            }
        });

        modalImage.addEventListener('mousemove', (event) => {
            if (isDragging) {
                translateX = event.clientX - startX;
                translateY = event.clientY - startY;
                modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            }
        });

        modalImage.addEventListener('mouseup', () => {
            isDragging = false;
            modalImage.style.cursor = scale > 1 ? 'grab' : 'default';
        });

        modalImage.addEventListener('mouseleave', () => {
            isDragging = false;
            modalImage.style.cursor = scale > 1 ? 'grab' : 'default';
        });

        modalImage.addEventListener('touchstart', (event) => {
            if (scale > 1 && event.touches.length === 1) {
                isDragging = true;
                startX = event.touches[0].clientX - translateX;
                startY = event.touches[0].clientY - translateY;
            }
        });

        modalImage.addEventListener('touchmove', (event) => {
            if (isDragging && event.touches.length === 1) {
                translateX = event.touches[0].clientX - startX;
                translateY = event.touches[0].clientY - startY;
                modalImage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            }
        });

        modalImage.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    // ---- LÓGICA DOS SPINNERS ----
    const images = document.querySelectorAll('.portfolio-full-item-image img, .sample-item img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
            const spinner = img.parentElement.querySelector('.spinner');
            if (spinner) {
                spinner.classList.remove('active');
            }
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                const spinner = img.parentElement.querySelector('.spinner');
                if (spinner) {
                    spinner.classList.remove('active');
                }
            });
        }
    });
});