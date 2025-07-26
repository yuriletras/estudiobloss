let slideIndex = 1;
let autoSlideTimeout; // Variável para armazenar o timeout do autoplay

// Função principal para mostrar os slides
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");

    // Lida com o wrap-around do slide index
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Esconde todos os slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove a classe "active" de todos os pontos
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Mostra o slide atual e marca o ponto correspondente como "active"
    slides[slideIndex - 1].style.display = "flex"; // Usa 'flex' para exibir os itens lado a lado
    dots[slideIndex - 1].className += " active";
}

// Função para avançar/retroceder os slides (usada pelos pontos)
function currentSlide(n) {
    clearTimeout(autoSlideTimeout); // Limpa o autoplay quando o usuário interage
    showSlides(slideIndex = n);
    startAutoSlide(); // Reinicia o autoplay após a interação
}

// Função para avançar os slides automaticamente
function plusSlides(n) {
    clearTimeout(autoSlideTimeout); // Limpa o autoplay ao avançar manualmente
    showSlides(slideIndex += n);
    startAutoSlide(); // Reinicia o autoplay
}

// Inicializa o carrossel e a lógica do hambúrguer na carga da página
document.addEventListener('DOMContentLoaded', (event) => {
    // Lógica existente do carrossel
    showSlides(slideIndex);
    startAutoSlide(); // Inicia o autoplay ao carregar a página

    // Lógica para o botão hambúrguer - ADIÇÃO CRÍTICA AQUI
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) { // Verifica se os elementos existem antes de adicionar o evento
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('open'); // Adiciona/remove a classe 'open' no nav-links
            hamburgerMenu.classList.toggle('active'); // Adiciona/remove 'active' para a animação do hambúrguer
        });

        // Opcional: Fechar o menu ao clicar em um link (para uma melhor UX mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburgerMenu.classList.remove('active');
            });
        });
    }
});

// Função para iniciar o autoplay
function startAutoSlide() {
    clearTimeout(autoSlideTimeout); // Garante que não há múltiplos timeouts rodando
    autoSlideTimeout = setTimeout(() => {
        plusSlides(1); // Avança para o próximo slide
    }, 5000); // Muda de slide a cada 5 segundos (5000ms)
}

// Lógica para alternar entre carrossel e grade de projetos
const viewAllBrandsBtn = document.getElementById('view-all-brands-btn');
const hideBrandsBtn = document.getElementById('hide-brands-btn');
const brandsCarouselContainer = document.getElementById('brands-carousel-container');
const brandsCarouselDots = document.getElementById('brands-carousel-dots');
const allBrandsGrid = document.getElementById('all-brands-grid');

viewAllBrandsBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Impede o comportamento padrão do link
    brandsCarouselContainer.classList.add('hidden');
    brandsCarouselDots.classList.add('hidden');
    allBrandsGrid.classList.add('visible'); // Usa 'visible' para exibir como flex
    viewAllBrandsBtn.classList.add('hidden');
    hideBrandsBtn.classList.remove('hidden');
    clearTimeout(autoSlideTimeout); // Para o autoplay quando a grade está visível
});

hideBrandsBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Impede o comportamento padrão do link
    brandsCarouselContainer.classList.remove('hidden');
    brandsCarouselDots.classList.remove('hidden');
    allBrandsGrid.classList.remove('visible'); // Remove 'visible' para esconder a grade
    viewAllBrandsBtn.classList.remove('hidden');
    hideBrandsBtn.classList.add('hidden');
    showSlides(slideIndex); // Garante que o carrossel recomece do slide atual
    startAutoSlide(); // Reinicia o autoplay ao voltar para o carrossel
});

// Lógica para o menu de navegação (rolagem suave)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});