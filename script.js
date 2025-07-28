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
    // CORREÇÃO: No seu HTML, a seção do carrossel de marcas é 'brands-section'.
    // A variável 'brandsCarouselWrapper' foi usada na lógica de "Ver todas as marcas" e pode estar confusa.
    // O carrossel principal é a seção #marcas
    const brandsSection = document.getElementById('marcas'); 
    const portfolioCallSection = document.getElementById('portfolio-call'); // A seção antes do portfólio completo

    // A lógica anterior ocultava o carouselWrapper, mas na estrutura atual
    // você esconde a brands-section para mostrar o full-portfolio-section
    if (brandsSection && brandsSection.classList.contains('hidden') || 
        portfolioCallSection && portfolioCallSection.classList.contains('hidden')) {
        // Não rolar se o carrossel estiver escondido ou se a seção de chamada estiver escondida (indicando que o portfólio completo está aberto)
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
    const scrollAmount = itemFullWidth; 

    if (direction === 1) { // Próximo
        scrollTarget.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        // Lógica para loop quando chega ao final:
        if (scrollTarget.scrollLeft + scrollAmount >= scrollTarget.scrollWidth - scrollTarget.clientWidth - itemFullWidth / 2) {
            setTimeout(() => { 
                scrollTarget.scrollTo({ left: 0, behavior: 'smooth' });
            }, 600); 
        }

    } else { // Anterior
        scrollTarget.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        // Lógica para loop quando chega ao início:
        if (scrollTarget.scrollLeft - scrollAmount <= itemFullWidth / 2) { 
            setTimeout(() => {
                scrollTarget.scrollTo({ left: scrollTarget.scrollWidth, behavior: 'smooth' }); 
            }, 600); 
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
    // --- Lógica de Tradução (Adicionada aqui) ---
    const languageToggle = document.getElementById('language-toggle');
    // Tenta carregar do localStorage, senão padrão 'pt'
    let currentLang = localStorage.getItem('lang') || 'pt'; 
    const dropdownIcon = languageToggle ? languageToggle.querySelector('i') : null; // Pega o ícone de seta

    const translations = {
        'pt': {
            'page-title': 'estúdio bloss',
            // Navbar
            'nav-about-us': 'SOBRE NÓS',
            'nav-services': 'SERVIÇOS',
            'nav-brands': 'MARCAS',
            'nav-portfolio': 'PORTFÓLIO',
            'nav-contact': 'CONTATO',
            // Hero Section
            'hero-title-line1': 'Marcas <span class="text-italic">nascem</span>',
            'hero-title-line2': 'todos os dias.',
            'hero-paragraph': 'Mas crescer com essência, propósito e identidade é pra quem decide florescer de verdade.',
            // About Us Section
            'about-us-subtitle': 'SOBRE NÓS',
            'about-us-title': 'Identidade visual marcante e design <span class="italic-text">refinado</span> que refletem a essência da sua marca.',
            'about-us-p1': 'Desenvolvemos logotipos, paletas de cores, tipografia e elementos gráficos que representam a essência da marca.',
            'about-us-p2': 'Trabalhar conosco significa profissionalismo, segurança e qualidade. Estamos prontos para dar vida ao seu projeto.',
            'talk-to-us-btn': 'FALE CONOSCO',
            'send-email-btn': 'ENVIAR E-MAIL',
            // Services Section
            'services-title': 'Nossos Serviços',
            'service-1-h3': 'Identidade Visual de Marcas',
            'service-1-p': 'logotipo, paleta de cores, tipografia, manual de marca — tudo construído com base no DNA do seu negócio.',
            'service-2-h3': 'Design para Redes Sociais',
            'service-2-p': 'Posts, templates e destaques que traduzem a essência da sua marca e fortalecem sua presença digital.',
            'service-3-h3': 'Consultoria Estratégica para Instagram',
            'service-3-p': 'Análise, posicionamento e direcionamento prático para empreendedores que querem crescer com propósito nas redes.',
            // Brands Section
            'brands-title': 'Marcas que floresceram conosco',
            // Portfolio Call To Action
            'portfolio-call-paragraph': 'Cada projeto é uma história única — e a próxima pode ser a sua.',
            'view-portfolio-btn': '→ Ver portfólio completo',
            // Full Portfolio Section
            'project-rebranding-title': 'Projeto: Rebranding Café Renascer',
            'project-rebranding-desc': 'Descrição detalhada do projeto de rebranding para a marca fictícia "Café Renascer". Nosso trabalho envolveu a criação de uma nova identidade visual do zero, desde o logotipo até as paletas de cores, tipografia e diretrizes de aplicação para mídias digitais e impressas. O objetivo foi modernizar a imagem da marca, transmitindo sua essência artesanal e premium. Este projeto demonstrou como um design estratégico pode revitalizar a presença de uma empresa no mercado, atraindo um novo público e solidificando sua posição.',
            'project-rebranding-services': '**Serviços:** Criação de Logotipo, Design de Identidade Visual, Manual de Marca, Embalagens.',
            'project-rebranding-client': '**Cliente:** Café Renascer',
            'project-rebranding-year': '**Ano:** 2023',

            'project-campaign-title': 'Criação de Campanha Digital para Bloom Fitness',
            'project-campaign-desc': 'Desenvolvimento e execução de uma campanha de marketing digital completa para o lançamento do novo serviço "Bloom Fitness". Isso incluiu estratégia de conteúdo, design de peças visuais para redes sociais (Instagram, Facebook), criação de anúncios pagos (Google Ads, Meta Ads) e monitoramento contínuo de performance. A campanha resultou em um aumento significativo no engajamento (35% de crescimento) e nas conversões de leads online (15% de aumento em matrículas).',
            'project-campaign-services': '**Serviços:** Marketing Digital, Design para Redes Sociais, Gestão de Tráfego Pago, Análise de Dados.',
            'project-campaign-client': '**Cliente:** Bloom Fitness',
            'project-campaign-year': '**Ano:** 2024',

            'project-website-title': 'Desenvolvimento de Website para Clínica OdontoCare',
            'project-website-desc': 'Criação de um website institucional responsivo e otimizado para a Clínica OdontoCare. O projeto focou em uma experiência de usuário intuitiva, facilidade de agendamento online e apresentação clara dos serviços. Implementamos um design moderno, integração com sistema de agendamento e SEO básico para melhorar a visibilidade online da clínica.',
            'project-website-services': '**Serviços:** Web Design, Desenvolvimento Front-end, UX/UI Design, SEO.',
            'project-website-client': '**Cliente:** Clínica OdontoCare',
            'project-website-year': '**Ano:** 2023',

            'project-packaging-title': 'Design de Embalagens para Alimentos Orgânicos "Terra Viva"',
            'project-packaging-desc': 'Criação de uma linha completa de embalagens ecológicas e atraentes para a marca de alimentos orgânicos "Terra Viva". O desafio foi comunicar frescor, naturalidade e sustentabilidade através do design, utilizando materiais recicláveis e uma estética limpa. O resultado foi um aumento nas vendas e reconhecimento da marca no segmento de produtos naturais.',
            'project-packaging-services': '**Serviços:** Design de Embalagens, Ilustração, Branding.',
            'project-packaging-client': '**Cliente:** Terra Viva Alimentos Orgânicos',
            'project-packaging-year': '**Ano:** 2024',

            'project-app-title': 'Design de Interface para Aplicativo "CityGuide"',
            'project-app-desc': 'Design de interface (UI/UX) para o aplicativo móvel "CityGuide", um guia turístico interativo. O foco foi na usabilidade, navegabilidade e estética, criando telas intuitivas para busca de locais, avaliações e rotas. O protótipo desenvolvido permitiu testar e validar a experiência do usuário antes do desenvolvimento final.',
            'project-app-services': '**Serviços:** UI/UX Design, Prototipagem, Wireframing.',
            'project-app-client': '**Cliente:** CityGuide StartUp',
            'project-app-year': '**Ano:** 2023',

            'project-graphic-title': 'Criação de Material Gráfico para Evento Corporativo "InovaTech Summit"',
            'project-graphic-desc': 'Desenvolvimento de todo o material gráfico para o evento "InovaTech Summit", incluindo banners, crachás, folder, apresentações e posts para redes sociais. O objetivo era criar uma identidade visual coesa e profissional que transmitisse a inovação e tecnologia do evento.',
            'project-graphic-services': '**Serviços:** Design Gráfico, Diagramação, Criação de Banners, Artes para Eventos.',
            'project-graphic-client': '**Cliente:** InovaTech Solutions',
            'project-graphic-year': '**Ano:** 2024',

            'project-ecommerce-title': 'Desenvolvimento de E-commerce para Loja de Artesanato "Mãos Que Criam"',
            'project-ecommerce-desc': 'Construção de uma loja virtual completa para a "Mãos Que Criam", uma loja de artesanato. O projeto incluiu customização da plataforma, design responsivo, integração de meios de pagamento e otimização para catálogo de produtos. A loja online permitiu que a cliente expandisse seu negócio para todo o Brasil.',
            'project-ecommerce-services': '**Serviços:** E-commerce Development, Web Design, Otimização de Produtos.',
            'project-ecommerce-client': '**Cliente:** Mãos Que Criam Artesanato',
            'project-ecommerce-year': '**Ano:** 2023',

            'project-social-media-title': 'Estratégia e Conteúdo para Redes Sociais "Pet Feliz PetShop"',
            'project-social-media-desc': 'Criação de estratégia de conteúdo e gerenciamento de redes sociais para a PetShop "Pet Feliz". Desenvolvemos um calendário editorial, criamos posts visuais e legendas engajadoras, e monitoramos as interações para aumentar a comunidade online e o tráfego para a loja física e online.',
            'project-social-media-services': '**Serviços:** Gestão de Mídias Sociais, Criação de Conteúdo, Design para Redes Sociais.',
            'project-social-media-client': '**Cliente:** Pet Feliz PetShop',
            'project-social-media-year': '**Ano:** 2024',

            'project-illustration-title': 'Criação de Ilustrações Personalizadas para Livro Infantil "A Aventura da Luna"',
            'project-illustration-desc': 'Desenvolvimento de ilustrações vibrantes e cativantes para o livro infantil "A Aventura da Luna". Cada ilustração foi criada para complementar a narrativa e envolver o público jovem, trazendo vida aos personagens e cenários da história.',
            'project-illustration-services': '**Serviços:** Ilustração Digital, Design Editorial, Criação de Personagens.',
            'project-illustration-client': '**Cliente:** Editora Fantasia',
            'project-illustration-year': '**Ano:** 2023',

            'project-video-title': 'Produção de Vídeo Institucional para "Soluções Sustentáveis LTDA"',
            'project-video-desc': 'Produção de um vídeo institucional de 2 minutos para a empresa "Soluções Sustentáveis LTDA". O vídeo destacou a missão, valores e os impactos positivos da empresa no meio ambiente, utilizando animações, depoimentos e imagens de alta qualidade para transmitir sua mensagem.',
            'project-video-services': '**Serviços:** Roteiro, Edição de Vídeo, Motion Graphics, Sonoplastia.',
            'project-video-client': '**Cliente:** Soluções Sustentáveis LTDA',
            'project-video-year': '**Ano:** 2024',
            
            'hide-portfolio-btn': '← Esconder Portfólio',
            // Contact Section
            'contact-subtitle': 'Vamos conversar',
            'contact-title': 'Você Chegou Até Aqui <span class="italic-text">Por Um Motivo</span>?',
            'contact-paragraph': 'Se sua marca está pronta para crescer com autenticidade, eu posso te ajudar a transformá-la em uma história de sucesso. Vamos construir algo incrível juntos!',
            'talk-to-us-btn-contact': 'FALE CONOSCO', 
            'send-email-btn-contact': 'ENVIAR E-MAIL', 
            'social-find-us': 'Nos encontre nas redes:',
            // Final Phrase Section
            'final-phrase-light': 'O mundo precisa sentir o que só a sua marca tem.',
            'final-phrase-blossom': 'It’s time to <span class="blossom-italic">bloss</span>om.',
            // Footer
            'copyright-text': '&copy; 2025 estúdio bloss. Todos os direitos reservados.',
'developed-by-text': 'Desenvolvido por <img src="img/ybarbosa.png" alt="Descrição da imagem do desenvolvedor" class="developer-logo">', 
},
        'en': {
            'page-title': 'blossom studio',
            // Navbar
            'nav-about-us': 'ABOUT US',
            'nav-services': 'SERVICES',
            'nav-brands': 'BRANDS',
            'nav-portfolio': 'PORTFOLIO',
            'nav-contact': 'CONTACT',
            // Hero Section
            'hero-title-line1': 'Brands <span class="text-italic">are born</span>',
            'hero-title-line2': 'every day.',
            'hero-paragraph': 'But growing with essence, purpose, and identity is for those who truly decide to blossom.',
            // About Us Section
            'about-us-subtitle': 'ABOUT US',
            'about-us-title': 'Striking visual identity and <span class="italic-text">refined</span> design that reflect the essence of your brand.',
            'about-us-p1': 'We develop logos, color palettes, typography, and graphic elements that represent the brand\'s essence.',
            'about-us-p2': 'Working with us means professionalism, security, and quality. We are ready to bring your project to life.',
            'talk-to-us-btn': 'TALK TO US',
            'send-email-btn': 'SEND EMAIL',
            // Services Section
            'services-title': 'Our Services',
            'service-1-h3': 'Brand Visual Identity',
            'service-1-p': 'logo, color palette, typography, brand manual — all built based on your business\'s DNA.',
            'service-2-h3': 'Social Media Design',
            'service-2-p': 'Posts, templates, and highlights that translate your brand\'s essence and strengthen your digital presence.',
            'service-3-h3': 'Strategic Instagram Consulting',
            'service-3-p': 'Analysis, positioning, and practical guidance for entrepreneurs who want to grow with purpose on social media.',
            // Brands Section
            'brands-title': 'Brands that blossomed with us',
            // Portfolio Call To Action
            'portfolio-call-paragraph': 'Every project is a unique story — and the next one could be yours.',
            'view-portfolio-btn': '→ View full portfolio',
            // Full Portfolio Section
            'project-rebranding-title': 'Project: Café Renascer Rebranding',
            'project-rebranding-desc': 'Detailed description of the rebranding project for the fictional brand "Café Renascer." Our work involved creating a new visual identity from scratch, from the logo to color palettes, typography, and application guidelines for digital and print media. The goal was to modernize the brand\'s image, conveying its artisanal and premium essence. This project demonstrated how strategic design can revitalize a company\'s market presence, attracting new audiences and solidifying its position.',
            'project-rebranding-services': '**Services:** Logo Creation, Visual Identity Design, Brand Manual, Packaging.',
            'project-rebranding-client': '**Client:** Café Renascer',
            'project-rebranding-year': '**Year:** 2023',

            'project-campaign-title': 'Digital Campaign Creation for Bloom Fitness',
            'project-campaign-desc': 'Development and execution of a complete digital marketing campaign for the launch of the new "Bloom Fitness" service. This included content strategy, visual asset design for social media (Instagram, Facebook), paid ad creation (Google Ads, Meta Ads) and continuous performance monitoring. The campaign resulted in a significant increase in engagement (35% growth) and online lead conversions (15% increase in sign-ups).',
            'project-campaign-services': '**Services:** Digital Marketing, Social Media Design, Paid Traffic Management, Data Analysis.',
            'project-campaign-client': '**Client:** Bloom Fitness',
            'project-campaign-year': '**Year:** 2024',

            'project-website-title': 'Website Development for OdontoCare Clinic',
            'project-website-desc': 'Creation of a responsive and optimized institutional website for OdontoCare Clinic. The project focused on an intuitive user experience, easy online scheduling, and clear presentation of services. We implemented a modern design, integration with a scheduling system, and basic SEO to improve the clinic\'s online visibility.',
            'project-website-services': '**Services:** Web Design, Front-end Development, UX/UI Design, SEO.',
            'project-website-client': '**Client:** OdontoCare Clinic',
            'project-website-year': '**Year:** 2023',

            'project-packaging-title': 'Packaging Design for "Terra Viva" Organic Foods',
            'project-packaging-desc': 'Creation of a complete line of eco-friendly and attractive packaging for the organic food brand "Terra Viva." The challenge was to communicate freshness, naturalness, and sustainability through design, using recyclable materials and a clean aesthetic. The result was an increase in sales and brand recognition in the natural products segment.',
            'project-packaging-services': '**Services:** Packaging Design, Illustration, Branding.',
            'project-packaging-client': '**Client:** Terra Viva Organic Foods',
            'project-packaging-year': '**Year:** 2024',

            'project-app-title': 'Interface Design for "CityGuide" App',
            'project-app-desc': 'Interface (UI/UX) design for the "CityGuide" mobile application, an interactive tourist guide. The focus was on usability, navigability, and aesthetics, creating intuitive screens for searching locations, reviews, and routes. The developed prototype allowed for testing and validating the user experience before final development.',
            'project-app-services': '**Services:** UI/UX Design, Prototyping, Wireframing.',
            'project-app-client': '**Client:** CityGuide StartUp',
            'project-app-year': '**Year:** 2023',

            'project-graphic-title': 'Graphic Material Creation for "InovaTech Summit" Corporate Event',
            'project-graphic-desc': 'Development of all graphic material for the "InovaTech Summit" event, including banners, badges, folders, presentations, and social media posts. The goal was to create a cohesive and professional visual identity that conveyed the innovation and technology of the event.',
            'project-graphic-services': '**Services:** Graphic Design, Layout, Banner Creation, Event Arts.',
            'project-graphic-client': '**Client:** InovaTech Solutions',
            'project-graphic-year': '**Year:** 2024',

            'project-ecommerce-title': 'E-commerce Development for "Mãos Que Criam" Handicraft Store',
            'project-ecommerce-desc': 'Construction of a complete online store for "Mãos Que Criam," a handicraft store. The project included platform customization, responsive design, payment method integration, and product catalog optimization. The online store allowed the client to expand their business throughout Brazil.',
            'project-ecommerce-services': '**Services:** E-commerce Development, Web Design, Product Optimization.',
            'project-ecommerce-client': '**Client:** Mãos Que Criam Handicraft',
            'project-ecommerce-year': '**Year:** 2023',

            'project-social-media-title': 'Strategy and Content for "Pet Feliz PetShop" Social Media',
            'project-social-media-desc': 'Content strategy creation and social media management for "Pet Feliz PetShop." We developed an editorial calendar, created engaging visual posts and captions, and monitored interactions to increase the online community and traffic to both the physical and online stores.',
            'project-social-media-services': '**Services:** Social Media Management, Content Creation, Social Media Design.',
            'project-social-media-client': '**Client:** Pet Feliz PetShop',
            'project-social-media-year': '**Year:** 2024',

            'project-illustration-title': 'Creation of Custom Illustrations for "Luna\'s Adventure" Children\'s Book',
            'project-illustration-desc': 'Development of vibrant and captivating illustrations for the children\'s book "Luna\'s Adventure." Each illustration was created to complement the narrative and engage the young audience, bringing characters and story settings to life.',
            'project-illustration-services': '**Services:** Digital Illustration, Editorial Design, Character Creation.',
            'project-illustration-client': '**Client:** Editora Fantasia',
            'project-illustration-year': '**Year:** 2023',

            'project-video-title': 'Institutional Video Production for "Sustainable Solutions LTD"',
            'project-video-desc': 'Production of a 2-minute institutional video for the company "Sustainable Solutions LTD." The video highlighted the company\'s mission, values, and positive environmental impacts, using animations, testimonials, and high-quality footage to convey its message.',
            'project-video-services': '**Services:** Scriptwriting, Video Editing, Motion Graphics, Sound Design.',
            'project-video-client': '**Client:** Sustainable Solutions LTD',
            'project-video-year': '**Year:** 2024',

            'hide-portfolio-btn': '← Hide Portfolio',
            // Contact Section
            'contact-subtitle': 'Let\'s talk',
            'contact-title': 'You Got Here <span class="italic-text">For A Reason</span>?',
            'contact-paragraph': 'If your brand is ready to grow with authenticity, I can help you transform it into a success story. Let\'s build something amazing together!',
            'talk-to-us-btn-contact': 'TALK TO US',
            'send-email-btn-contact': 'SEND EMAIL',
            'social-find-us': 'Find us on social media:',
            // Final Phrase Section
            'final-phrase-light': 'The world needs to feel what only your brand has.',
            'final-phrase-blossom': 'It’s time to <span class="blossom-italic">bloss</span>om.',
            // Footer
            'copyright-text': '&copy; 2025 estúdio bloss. All rights reserved.',
            'developed-by-text': 'Developed by <img src="img/ybarbosa.png" alt="Developer logo" class="developer-logo">', 
        }
    };

    function setLanguage(lang) {
        // Altera o texto do botão de idioma
        if (languageToggle && dropdownIcon) {
            const newButtonText = languageToggle.getAttribute(`data-lang-btn-${lang}`);
            languageToggle.innerHTML = `${newButtonText} ${dropdownIcon.outerHTML}`;
        }
        
        // Atualiza o título da página
        const pageTitleElement = document.querySelector('title');
        if (pageTitleElement) {
            pageTitleElement.textContent = translations[lang]['page-title'];
        }

        // Percorre todos os elementos com o atributo data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            // Verifica se a chave existe para o idioma atual
            if (translations[lang] && translations[lang][key]) {
                // Usa innerHTML para manter tags HTML como <span>
                element.innerHTML = translations[lang][key]; 
            }
        });
        currentLang = lang;
        localStorage.setItem('lang', lang); // Salva a preferência
        document.documentElement.lang = lang; // Atualiza o atributo lang do <html> para acessibilidade
    }

    // Inicializa a página com o idioma salvo ou padrão ao carregar
    setLanguage(currentLang);

    // Adiciona o evento de clique ao botão de idioma
    if (languageToggle) {
        languageToggle.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o comportamento padrão do link
            const newLang = currentLang === 'pt' ? 'en' : 'pt';
            setLanguage(newLang);
        });
    }

    // --- Suas lógicas existentes a partir daqui ---

    brandsCarouselContainer = document.getElementById('brands-carousel-container'); // O container principal com scroll
    carouselItems = document.querySelectorAll('#brands-carousel-container .carousel-item'); // Todos os itens

    // --- LÓGICA DO CARROSSEL DE MARCAS/PROJETOS INICIAL ---
    // (Mantida e ligeiramente ajustada para o novo contexto de visibilidade)
    // OBS: O viewAllBrandsBtn e hideBrandsBtn não estão no HTML que você me enviou.
    // O view-full-portfolio-btn e hide-full-portfolio-btn são os botões que controlam a seção `full-portfolio-section`.
    // Ajustei a referência para o botão correto baseado no seu HTML fornecido anteriormente.
    // Removed old brandsCarouselWrapper related elements if they are not in HTML

    if (brandsCarouselContainer && carouselItems.length > 0) {
        startAutoSlide(); // Inicia o autoplay

        // Lógica para as setas de navegação do carrossel
        // Certifique-se que prevButton e nextButton são filhos diretos ou estão em escopo correto
        const prevButton = document.querySelector('.brands-section .prev'); // Ajustado para a seção correta
        const nextButton = document.querySelector('.brands-section .next'); // Ajustado para a seção correta

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
    // Removi as variáveis viewAllBrandsBtn, hideBrandsBtn e allProjectsGrid
    // pois elas não correspondem ao HTML que você me enviou na última interação.
    // A lógica para 'Ver Portfólio Completo' e 'Esconder Portfólio' está abaixo
    // usando as variáveis corretas: viewFullPortfolioBtn, hideFullPortfolioBtn, fullPortfolioSection.

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
            if (linkId === 'view-full-portfolio-btn' || linkId === 'hide-full-portfolio-btn') {
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
    const portfolioCallSection = document.getElementById('portfolio-call'); // A seção original de chamada do portfólio

    // Verificação para garantir que todos os elementos existem
    if (viewFullPortfolioBtn && hideFullPortfolioBtn && fullPortfolioSection && portfolioCallSection) {
        // Inicialmente, a seção completa já está com 'hidden' no HTML/CSS,
        // mas garantimos que o botão de esconder também esteja no estado correto.
        hideFullPortfolioBtn.classList.add('hidden');

        // Event listener para o botão "Ver Portfólio Completo"
        viewFullPortfolioBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Impede que o link padrão de '#' role para o topo
            
            fullPortfolioSection.classList.remove('hidden'); // Remove a classe 'hidden'
            // Opcional: Adicionar classe 'visible' para transição suave via CSS, se tiver
            fullPortfolioSection.classList.add('visible'); 
            
            // Esconder a seção do carrossel de marcas e a chamada de portfólio
            const brandsSection = document.getElementById('marcas');
            if (brandsSection) brandsSection.classList.add('hidden');
            if (portfolioCallSection) portfolioCallSection.classList.add('hidden');

            this.classList.add('hidden'); // Esconde o botão "Ver Portfólio Completo"
            hideFullPortfolioBtn.classList.remove('hidden'); // Mostra o botão "Esconder Portfólio"

            // Opcional: Rolagem suave para a seção do portfólio expandido
            setTimeout(() => {
                fullPortfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300); 
        });

        // Event listener para o botão "Esconder Portfólio"
        hideFullPortfolioBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Impede que o link padrão de '#' role para o topo

            fullPortfolioSection.classList.remove('visible'); // Remove 'visible' para transição de volta
            fullPortfolioSection.classList.add('hidden'); // Esconde a seção completa

            // Mostrar a seção do carrossel de marcas e a chamada de portfólio
            const brandsSection = document.getElementById('marcas');
            if (brandsSection) brandsSection.classList.remove('hidden');
            if (portfolioCallSection) portfolioCallSection.classList.remove('hidden');

            this.classList.add('hidden'); // Esconde o botão "Esconder Portfólio"
            viewFullPortfolioBtn.classList.remove('hidden'); // Mostra o botão "Ver Portfólio Completo"

            // Rolagem suave de volta para a seção de chamada do portfólio
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
    const portfolioFullImages = document.querySelectorAll('.portfolio-full-item-image img, .carousel-item img'); // Incluindo imagens do carrossel também

    portfolioFullImages.forEach(image => {
        image.addEventListener('click', function() {
            modalImage.src = this.src; // Define a imagem do modal como a imagem clicada
            imageModal.classList.add('open'); // Abre o modal
            document.body.style.overflow = 'hidden'; // Impede rolagem do corpo
        });
    });

    // Garante que o closeBtn existe antes de adicionar listener
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            imageModal.classList.remove('open'); // Fecha o modal
            document.body.style.overflow = 'auto'; // Restaura rolagem do corpo
        });
    }

    // Fecha o modal ao clicar fora da imagem (no fundo do modal)
    if (imageModal) { // Garante que imageModal existe
        imageModal.addEventListener('click', function(event) {
            // Se o clique foi no próprio modal (e não na imagem dentro dele)
            if (event.target === imageModal) {
                imageModal.classList.remove('open'); // Fecha o modal
                document.body.style.overflow = 'auto'; // Restaura rolagem do corpo
            }
        });
    }
}); // Fechamento do document.addEventListener('DOMContentLoaded')