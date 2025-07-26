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

    if (!brandsCarouselContainer || carouselItems.length === 0) {
        console.warn("Elementos do carrossel de marcas não encontrados. Verifique seu HTML.");
        return;
    }

    // Inicia o autoplay
    startAutoSlide(); 

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
});

// --- Lógica de rolagem suave para âncoras (seções da página) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});