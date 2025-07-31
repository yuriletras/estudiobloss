document.addEventListener('DOMContentLoaded', function() {
    // ---- SCRIPT PARA O MENU HAMBURGUER (NOVO) ----
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links-menu');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('nav-links-active');
            hamburgerMenu.classList.toggle('is-active');
        });

        // Adiciona um evento de clique para fechar o menu ao selecionar um link (opcional, mas recomendado para UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-links-active');
                hamburgerMenu.classList.remove('is-active');
            });
        });
    }

    // ---- FIM DO SCRIPT PARA O MENU HAMBURGUER ----


    // ---- Script para o botão de voltar ----
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', function(event) {
            event.preventDefault();
            window.history.back();
        });
    }

    // ---- SCRIPT para o modal de tela cheia com transição, arrastar e zoom ----
    const portfolioImageContainers = document.querySelectorAll('.portfolio-full-item-image');
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const modalContentWrapper = document.querySelector('.modal-content-wrapper');
    const modalCloseBtn = document.querySelector('.modal-close-btn');

    let isDragging = false;
    let startX;
    let startY;
    let offsetX = 0;
    let offsetY = 0;
    let zoomLevel = 1;
    const minZoom = 0.5;
    const maxZoom = 3;
    const zoomSensitivity = 0.1;

    portfolioImageContainers.forEach(container => {
        container.addEventListener('click', function() {
            const imageSrc = container.querySelector('img').src;

            const modalImage = document.createElement('img');
            modalImage.classList.add('modal-image');
            modalImage.src = imageSrc;
            modalImage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel})`;
            modalImage.style.transition = 'transform 0.1s ease-out';

            modalContentWrapper.innerHTML = '';
            modalContentWrapper.appendChild(modalImage);
            modalContentWrapper.appendChild(modalCloseBtn);

            fullscreenModal.classList.add('active');

            modalImage.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX - offsetX;
                startY = e.clientY - offsetY;
                modalImage.style.cursor = 'grab';
            });

            modalImage.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                offsetX = e.clientX - startX;
                offsetY = e.clientY - startY;
                modalImage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel})`;
            });

            modalImage.addEventListener('mouseup', () => {
                isDragging = false;
                modalImage.style.cursor = 'default';
            });

            modalImage.addEventListener('mouseleave', () => {
                if (!isDragging) return;
                isDragging = false;
                modalImage.style.cursor = 'default';
            });

            modalImage.addEventListener('wheel', (e) => {
                e.preventDefault();

                const zoomDirection = e.deltaY > 0 ? -1 : 1;
                zoomLevel += zoomDirection * zoomSensitivity;
                zoomLevel = Math.max(minZoom, Math.min(maxZoom, zoomLevel));

                modalImage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel})`;
            }, { passive: false });
        });
    });

    function closeModal() {
        fullscreenModal.classList.remove('active');
        offsetX = 0;
        offsetY = 0;
        zoomLevel = 1;
        const existingImage = modalContentWrapper.querySelector('.modal-image');
        if (existingImage) {
            existingImage.remove();
        }
    }

    modalCloseBtn.addEventListener('click', closeModal);

    fullscreenModal.addEventListener('click', function(event) {
        if (event.target === fullscreenModal) {
            closeModal();
        }
    });

    // ---- Animação na página de portfólio ----
    const portfolioItems = document.querySelectorAll('.portfolio-full-item');
    if (portfolioItems.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        portfolioItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
            observer.observe(item);
        });
    }
});