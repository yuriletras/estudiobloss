let autoSlideTimeout; // Variável para armazenar o timeout do autoplay
let carouselItems; // Variável para armazenar todos os itens do carrossel
let brandsCarouselContainer; // O contêiner que terá o scroll (o #brands-carousel-container)

// Função para rolar o carrossel
function scrollCarousel(direction) {
    // No seu HTML, o elemento com a capacidade de rolagem é o 'brandsCarouselContainer'
    // E o '.carousel-slide' é um filho dele que contém os itens.
    // O scroll-snap está no 'brandsCarouselContainer'.
    // Portanto, o elemento a ser rolado é 'brandsCarouselContainer'.
    const scrollTarget = brandsCarouselContainer;

    // Adição de verificação se o carrossel de marcas está visível
    const brandsCarouselWrapper = document.getElementById('brands-carousel-wrapper');
    if (brandsCarouselWrapper && brandsCarouselWrapper.classList.contains('hidden')) {
        // Não rolar se o carrossel estiver escondido
        return; 
    }

    if (!scrollTarget) {
        console.error("Contêiner do carrossel ou slide interno não encontrado para rolagem.");
        return;
    }

    // Pega a largura do primeiro item para calcular o scroll
    // E adiciona o gap que está no .carousel-slide
    const itemWidth = carouselItems[0].offsetWidth;
    const computedStyle = window.getComputedStyle(carouselItems[0].parentNode);
    const gap = parseFloat(computedStyle.getPropertyValue('gap') || '0px');
    
    // Considera a largura do item + o gap (espaçamento à direita do item)
    const itemFullWidth = itemWidth + gap; 

    // Define a quantidade de rolagem.
    // Opção 1: Rolar por um único item por vez (mais "fino")
    const scrollAmount = itemFullWidth; 

    // Opção 2: Rolar por um "bloco" de itens visíveis de cada vez (se quiser que pule mais)
    // const itemsPerView = Math.floor(scrollTarget.offsetWidth / itemFullWidth);
    // const scrollAmount = itemFullWidth * itemsPerView; 

    if (direction === 1) { // Próximo
        scrollTarget.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        // Lógica para loop quando chega ao final:
        // Se estiver perto do final e rolar para o próximo, voltar ao início.
        // A precisão da detecção do final pode variar com scroll-snap.
        // Uma abordagem simples: se a próxima rolagem exceder o total, vá para o início.
        if (scrollTarget.scrollLeft + scrollAmount >= scrollTarget.scrollWidth - scrollTarget.clientWidth - itemFullWidth / 2) {
             // - itemFullWidth / 2 é para compensar o scroll-snap, que pode parar um pouco antes do final
            setTimeout(() => { // Pequeno delay para a rolagem suave terminar
                scrollTarget.scrollTo({ left: 0, behavior: 'smooth' });
            }, 600); // Ajuste o tempo para ser um pouco mais que o 'behavior: smooth'
        }

    } else { // Anterior
        scrollTarget.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        // Lógica para loop quando chega ao início:
        if (scrollTarget.scrollLeft - scrollAmount <= itemFullWidth / 2) { // Se estiver perto do início
            setTimeout(() => {
                scrollTarget.scrollTo({ left: scrollTarget.scrollWidth, behavior: 'smooth' }); // Vai para o final
            }, 600); // Ajuste o tempo
        }
    }
}

// Função para iniciar o autoplay
function startAutoSlide() {
    clearTimeout(autoSlideTimeout); // Garante que não há múltiplos timeouts rodando
    autoSlideTimeout = setTimeout(() => {
        scrollCarousel(1); // Rola para o próximo "bloco" ou item
        startAutoSlide(); // Reinicia o autoplay
    }, 5000); // Muda de "slide" (bloco de rolagem) a cada 5 segundos
}

document.addEventListener('DOMContentLoaded', (event) => {
    brandsCarouselContainer = document.getElementById('brands-carousel-container'); // O container principal com scroll
    carouselItems = document.querySelectorAll('#brands-carousel-container .carousel-item'); // Todos os itens

    // --- LÓGICA DO CARROSSEL DE MARCAS/PROJETOS INICIAL ---
    // (Mantida e ligeiramente ajustada para o novo contexto de visibilidade)
    const brandsCarouselWrapper = document.getElementById('brands-carousel-wrapper'); // Seu carrossel de marcas principal
    const viewAllBrandsBtn = document.getElementById('view-all-brands-btn'); // Botão "Ver Portfólio Completo" da seção de marcas
    const hideBrandsBtn = document.getElementById('hide-brands-btn'); // Botão "Esconder Portfólio" da seção de marcas
    const allProjectsGrid = document.getElementById('all-projects-grid'); // A grade completa de marcas/projetos

    if (brandsCarouselContainer && carouselItems.length > 0) {
        startAutoSlide(); // Inicia o autoplay

        // Lógica para as setas de navegação do carrossel
        const prevButton = brandsCarouselContainer.querySelector('.prev');
        const nextButton = brandsCarouselContainer.querySelector('.next');

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                clearTimeout(autoSlideTimeout); // Para o autoplay na interação manual
                scrollCarousel(-1);
                startAutoSlide(); // Reinicia o autoplay após a rolagem manual
            });
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                clearTimeout(autoSlideTimeout); // Para o autoplay na interação manual
                scrollCarousel(1);
                startAutoSlide(); // Reinicia o autoplay após a rolagem manual
            });
        }
    } else {
        console.warn("Elementos do carrossel de marcas não encontrados. Verifique seu HTML para '#brands-carousel-container'.");
    }

    // --- LÓGICA DE EXIBIÇÃO/OCULTAÇÃO DA SEÇÃO DE MARCAS COMPLETA ---
    // (Se você tiver uma seção de 'Ver todas as Marcas' separada do portfólio principal)
    if (viewAllBrandsBtn && hideBrandsBtn && allProjectsGrid && brandsCarouselWrapper) {
        // Inicialmente, a grade completa de marcas está oculta e o botão de esconder também
        allProjectsGrid.classList.add('hidden');
        hideBrandsBtn.classList.add('hidden');

        viewAllBrandsBtn.addEventListener('click', function() {
            allProjectsGrid.classList.remove('hidden'); // Mostra a grade completa
            allProjectsGrid.classList.add('visible'); // Adiciona visibilidade para transição
            brandsCarouselWrapper.classList.add('hidden'); // Esconde o carrossel de marcas
            this.classList.add('hidden'); // Esconde o botão "Ver Todas as Marcas"
            hideBrandsBtn.classList.remove('hidden'); // Mostra o botão "Esconder Marcas"
            
            setTimeout(() => {
                allProjectsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        });

        hideBrandsBtn.addEventListener('click', function() {
            allProjectsGrid.classList.remove('visible'); // Remove visibilidade para transição de volta
            allProjectsGrid.classList.add('hidden'); // Esconde a grade completa
            brandsCarouselWrapper.classList.remove('hidden'); // Mostra o carrossel de marcas
            this.classList.add('hidden'); // Esconde o botão "Esconder Marcas"
            viewAllBrandsBtn.classList.remove('hidden'); // Mostra o botão "Ver Todas as Marcas"

            brandsCarouselWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }


    // --- LÓGICA DO HAMBÚRGUER MENU ---
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active'); // Para animação do X
            navLinks.classList.toggle('open'); // Para mostrar/esconder o menu
        });

        // Fechar o menu ao clicar em um link (opcional)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburgerMenu.classList.remove('active');
            });
        });
    } else {
        console.warn("Elementos do menu hambúrguer não encontrados. Verifique seu HTML.");
    }

    // --- LÓGICA DE ROLAGEM SUAVE PARA ÂNCORAS (SEÇÕES DA PÁGINA) ---
    // IMPORTANTE: Ajustei esta lógica para não interferir com os botões de expandir/esconder
    // que usam `preventDefault()` e seu próprio scrollIntoView.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Verifica se o ID do link é um dos nossos botões de expandir/esconder
            const linkId = this.getAttribute('id');
            if (linkId === 'view-full-portfolio-btn' || linkId === 'hide-full-portfolio-btn' ||
                linkId === 'view-all-brands-btn' || linkId === 'hide-brands-btn') {
                // Se for um desses botões, a lógica específica deles já lida com o preventDefault e scroll.
                return; 
            }

            e.preventDefault(); // Previni o comportamento padrão apenas para links de âncora *não* gerenciados.

            const targetId = this.getAttribute('href');
            // Verifica se o targetId é válido e se o elemento existe
            if (targetId && document.querySelector(targetId)) {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // === NOVA LÓGICA PARA O PORTFÓLIO COMPLETO (Ver / Esconder Portfólio Completo) ===
    const viewFullPortfolioBtn = document.getElementById('view-full-portfolio-btn');
    const hideFullPortfolioBtn = document.getElementById('hide-full-portfolio-btn');
    const fullPortfolioSection = document.getElementById('full-portfolio-section'); // A nova seção completa

    // Verificação para garantir que todos os elementos existem
    if (viewFullPortfolioBtn && hideFullPortfolioBtn && fullPortfolioSection) {
        // Inicialmente, a seção completa já está com 'hidden' no HTML/CSS,
        // mas garantimos que o botão de esconder também esteja no estado correto.
        hideFullPortfolioBtn.classList.add('hidden');

        // Event listener para o botão "Ver Portfólio Completo"
        viewFullPortfolioBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Impede que o link padrão de '#' role para o topo
            
            fullPortfolioSection.classList.remove('hidden'); // Remove a classe 'hidden'
            fullPortfolioSection.classList.add('visible'); // Adiciona 'visible' para transição suave (se definido no CSS)
            
            this.classList.add('hidden'); // Esconde o botão "Ver Portfólio Completo"
            hideFullPortfolioBtn.classList.remove('hidden'); // Mostra o botão "Esconder Portfólio"

            // Opcional: Rolagem suave para a seção do portfólio expandido
            // Um pequeno atraso para que a transição CSS tenha tempo de começar antes da rolagem
            setTimeout(() => {
                // Rolando para o início da seção do portfólio completo
                fullPortfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300); // 300ms corresponde ao seu var(--transition-speed) no CSS
        });

        // Event listener para o botão "Esconder Portfólio"
        hideFullPortfolioBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Impede que o link padrão de '#' role para o topo

            fullPortfolioSection.classList.remove('visible'); // Remove 'visible' para transição de volta
            // A classe 'hidden' vai realmente ocultar o elemento
            fullPortfolioSection.classList.add('hidden'); 

            this.classList.add('hidden'); // Esconde o botão "Esconder Portfólio"
            viewFullPortfolioBtn.classList.remove('hidden'); // Mostra o botão "Ver Portfólio Completo"

            // Opcional: Rolagem suave de volta para a seção de chamada do portfólio
            const portfolioCallSection = document.getElementById('portfolio-call'); // Seu section original
            if (portfolioCallSection) {
                portfolioCallSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // === NOVA LÓGICA: MODAL DE VISUALIZAÇÃO DE IMAGEM ===
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.image-modal-close-btn');

    // Seleciona todas as imagens dentro dos itens do portfólio completo
    const portfolioFullImages = document.querySelectorAll('.portfolio-full-item-image img');

    portfolioFullImages.forEach(image => {
        image.addEventListener('click', function() {
            modalImage.src = this.src; // Define a imagem do modal como a imagem clicada
            imageModal.classList.add('open'); // Abre o modal
            document.body.style.overflow = 'hidden'; // Impede rolagem do corpo
        });
    });

    // Fecha o modal ao clicar no botão de fechar
    closeBtn.addEventListener('click', function() {
        imageModal.classList.remove('open'); // Fecha o modal
        document.body.style.overflow = 'auto'; // Restaura rolagem do corpo
    });

    // Fecha o modal ao clicar fora da imagem (no fundo do modal)
    imageModal.addEventListener('click', function(event) {
        // Se o clique foi no próprio modal (e não na imagem dentro dele)
        if (event.target === imageModal) {
            imageModal.classList.remove('open'); // Fecha o modal
            document.body.style.overflow = 'auto'; // Restaura rolagem do corpo
        }
    });
}); // Fechamento do document.addEventListener('DOMContentLoaded'