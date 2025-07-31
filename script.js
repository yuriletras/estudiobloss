document.addEventListener('DOMContentLoaded', () => {
    // ---- LÓGICA DO MENU HAMBÚRGUER ----
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links-menu');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburgerMenu.classList.toggle('active');
        });
    }

    // ---- LÓGICA DO CARROSSEL DE MARCAS ----
    let currentSlide = 0;
    const carouselContainer = document.getElementById('brands-carousel-container');
    const prevBtn = document.querySelector('.carousel-wrapper .prev');
    const nextBtn = document.querySelector('.carousel-wrapper .next');
    const dotsContainer = document.getElementById('brands-carousel-dots');
    
    if (carouselContainer && prevBtn && nextBtn && dotsContainer) {
        const slides = carouselContainer.querySelectorAll('.carousel-item');
        const totalSlides = slides.length;
        const itemsPerSlide = window.innerWidth >= 768 ? 3 : 1;
        const totalPages = Math.ceil(totalSlides / itemsPerSlide);
        const slideWidth = carouselContainer.offsetWidth;

        // Cria os dots
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
        const dots = dotsContainer.querySelectorAll('.dot');
        
        const updateCarousel = () => {
            const offset = -currentSlide * slideWidth;
            carouselContainer.style.transform = `translateX(${offset}px)`;
            
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalPages;
            updateCarousel();
        };

        const prevSlide = () => {
            currentSlide = (currentSlide - 1 + totalPages) % totalPages;
            updateCarousel();
        };
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        window.addEventListener('resize', () => {
             // Lógica de redimensionamento aqui se necessário
        });
        
        updateCarousel(); // Inicia o carrossel
    }

    // ---- LÓGICA DE TRADUÇÃO ----
    const translations = {
        'en': {
            // Seus textos em inglês aqui
            "page-title": "bloss studio",
            "nav-about-us": "ABOUT US",
            "nav-services": "SERVICES",
            "nav-brands": "BRANDS",
            "nav-portfolio": "PORTFOLIO",
            "nav-contact": "CONTACT",
            "hero-title-line1": "Brands <span class=\"text-italic\">are born</span>",
            "hero-title-line2": "every day.",
            "hero-paragraph": "But growing with essence, purpose and identity is for those who truly decide to blossom.",
            "about-us-subtitle": "ABOUT US",
            "about-us-title": "Outstanding visual identity and <span class=\"italic-text\">refined</span> design that reflect the essence of your brand.",
            "about-us-p1": "We develop logos, color palettes, typography and graphic elements that represent the brand's essence.",
            "about-us-p2": "Working with us means professionalism, security and quality. We are ready to bring your project to life.",
            "talk-to-us-btn": "TALK TO US",
            "send-email-btn": "SEND EMAIL",
            "services-title": "Our Services",
            "service-1-h3": "Brand Visual Identity",
            "service-1-p": "logo, color palette, typography, brand manual — all built based on the DNA of your business.",
            "service-2-h3": "Design for Social Media",
            "service-2-p": "Posts, templates and highlights that translate the essence of your brand and strengthen your digital presence.",
            "service-3-h3": "Strategic Instagram Consulting",
            "service-3-p": "Analysis, positioning and practical guidance for entrepreneurs who want to grow with purpose on social networks.",
            "brands-title": "Brands that blossomed with us",
            "portfolio-call-paragraph": "Each project is a unique story — and the next one can be yours.",
            "view-portfolio-btn": "→ View full portfolio",
            "contact-subtitle": "Let's talk",
            "contact-title": "You've Come This Far <span class=\"italic-text\">For a Reason</span>!",
            "contact-paragraph": "If your brand is ready to grow with authenticity, I can help you turn it into a success story. Let's build something incredible together!",
            "talk-to-us-btn-contact": "TALK TO US",
            "send-email-btn-contact": "SEND EMAIL",
            "social-find-us": "Find us on social media:",
            "final-phrase-light": "The world needs to feel what only your brand has.",
            "final-phrase-blossom": "It’s time to <span class=\"blossom-italic\">bloss</span>om.",
            "copyright-text": "&copy; 2025 bloss studio. All rights reserved.",
            "developed-by-text": "Developed by",
            // Novos textos para a página de portfólio
            "page-title-portfolio": "Portfolio - bloss studio",
            "portfolio-page-title": "Our Portfolio",
            "portfolio-page-subtitle": "A collection of works that blossomed through design and strategy.",
            "project-rebranding-title": "Project: Renascer Coffee Rebranding",
            "project-rebranding-desc": "Detailed description of the rebranding project for the fictional brand “Renascer Coffee”. Our work involved creating a new visual identity from scratch, from the logo to the color palettes, typography and application guidelines for digital and print media. The objective was to modernize the brand's image, conveying its artisanal and premium essence. This project demonstrated how strategic design can revitalize a company's presence in the market, attracting a new audience and solidifying its position.",
            "project-rebranding-services": "**Services:** Logo Creation, Visual Identity Design, Brand Manual, Packaging.",
            "project-rebranding-client": "**Client:** Renascer Coffee",
            "project-rebranding-year": "**Year:** 2023",
            "project-campaign-title": "Creation of a Digital Campaign for Bloom Fitness",
            "project-campaign-desc": "Development and execution of a complete digital marketing campaign for the launch of the new “Bloom Fitness” service. This included content strategy, design of visual pieces for social networks (Instagram, Facebook), creation of paid ads (Google Ads, Meta Ads) and continuous performance monitoring. The campaign resulted in a significant increase in engagement (35% growth) and online lead conversions (15% increase in registrations).",
            "project-campaign-services": "**Services:** Digital Marketing, Social Media Design, Paid Traffic Management, Data Analysis.",
            "project-campaign-client": "**Client:** Bloom Fitness",
            "project-campaign-year": "**Year:** 2024",
            "project-website-title": "Website Development for OdontoCare Clinic",
            "project-website-desc": "Creation of a responsive and optimized institutional website for the OdontoCare Clinic. The project focused on an intuitive user experience, ease of online scheduling and a clear presentation of services. We implemented a modern design, integration with a scheduling system and basic SEO to improve the clinic's online visibility.",
            "project-website-services": "**Services:** Web Design, Front-end Development, UX/UI Design, SEO.",
            "project-website-client": "**Client:** OdontoCare Clinic",
            "project-website-year": "**Year:** 2023",
            "project-packaging-title": "Packaging Design for “Terra Viva” Organic Foods",
            "project-packaging-desc": "Creation of a complete line of ecological and attractive packaging for the organic food brand “Terra Viva”. The challenge was to communicate freshness, naturalness and sustainability through design, using recyclable materials and a clean aesthetic. The result was an increase in sales and brand recognition in the natural products segment.",
            "project-packaging-services": "**Services:** Packaging Design, Illustration, Branding.",
            "project-packaging-client": "**Client:** Terra Viva Organic Foods",
            "project-packaging-year": "**Year:** 2024",
            "project-app-title": "Interface Design for “CityGuide” App",
            "project-app-desc": "Interface design (UI/UX) for the mobile app “CityGuide”, an interactive tourist guide. The focus was on usability, navigability and aesthetics, creating intuitive screens for searching for locations, reviews and routes. The prototype developed allowed testing and validating the user experience before final development.",
            "project-app-services": "**Services:** UI/UX Design, Prototyping, Wireframing.",
            "project-app-client": "**Client:** CityGuide StartUp",
            "project-app-year": "**Year:** 2023",
            "project-graphic-title": "Creation of Graphic Material for Corporate Event “InovaTech Summit”",
            "project-graphic-desc": "Development of all graphic material for the “InovaTech Summit” event, including banners, badges, folders, presentations and social media posts. The objective was to create a cohesive and professional visual identity that conveyed the event's innovation and technology.",
            "project-graphic-services": "**Services:** Graphic Design, Layout, Banner Creation, Arts for Events.",
            "project-graphic-client": "**Client:** InovaTech Solutions",
            "project-graphic-year": "**Year:** 2024",
            "project-ecommerce-title": "E-commerce Development for Handicraft Store “Mãos Que Criam”",
            "project-ecommerce-desc": "Construction of a complete virtual store for “Mãos Que Criam”, a handicraft store. The project included platform customization, responsive design, integration of payment methods and optimization for the product catalog. The online store allowed the client to expand their business throughout Brazil.",
            "project-ecommerce-services": "**Services:** E-commerce Development, Web Design, Product Optimization.",
            "project-ecommerce-client": "**Client:** Mãos Que Criam Artesanato",
            "project-ecommerce-year": "**Year:** 2023",
            "project-social-media-title": "Strategy and Content for Social Media “Pet Feliz PetShop”",
            "project-social-media-desc": "Creation of content strategy and social media management for the “Pet Feliz” PetShop. We developed an editorial calendar, created visual posts and engaging captions, and monitored interactions to grow the online community and traffic to the physical and online store.",
            "project-social-media-services": "**Services:** Social Media Management, Content Creation, Social Media Design.",
            "project-social-media-client": "**Client:** Pet Feliz PetShop",
            "project-social-media-year": "**Year:** 2024",
            "project-illustration-title": "Creation of Personalized Illustrations for Children's Book “Luna's Adventure”",
            "project-illustration-desc": "Development of vibrant and captivating illustrations for the children's book “Luna's Adventure”. Each illustration was created to complement the narrative and engage the young audience, bringing the story's characters and settings to life.",
            "project-illustration-services": "**Services:** Digital Illustration, Editorial Design, Character Creation.",
            "project-illustration-client": "**Client:** Fantasia Publishing House",
            "project-illustration-year": "**Year:** 2023",
            "project-video-title": "Production of Institutional Video for “Soluções Sustentáveis LTDA”",
            "project-video-desc": "Production of a 2-minute institutional video for the company “Soluções Sustentáveis LTDA”. The video highlighted the company's mission, values and positive impacts on the environment, using animations, testimonials and high-quality images to convey its message.",
            "project-video-services": "**Services:** Script, Video Editing, Motion Graphics, Sound Design.",
            "project-video-client": "**Client:** Soluções Sustentáveis LTDA",
            "project-video-year": "**Year:** 2024",
        },
        'pt-BR': {
            // Seus textos em português aqui
            "page-title": "estúdio bloss",
            "nav-about-us": "SOBRE NÓS",
            "nav-services": "SERVIÇOS",
            "nav-brands": "MARCAS",
            "nav-portfolio": "PORTFÓLIO",
            "nav-contact": "CONTATO",
            "hero-title-line1": "Marcas <span class=\"text-italic\">nascem</span>",
            "hero-title-line2": "todos os dias.",
            "hero-paragraph": "Mas crescer com essência, propósito e identidade é pra quem decide florescer de verdade.",
            "about-us-subtitle": "SOBRE NÓS",
            "about-us-title": "Identidade visual marcante e design <span class=\"italic-text\">refinado</span> que refletem a essência da sua marca.",
            "about-us-p1": "Desenvolvemos logotipos, paletas de cores, tipografia e elementos gráficos que representam a essência da marca.",
            "about-us-p2": "Trabalhar conosco significa profissionalismo, segurança e qualidade. Estamos prontos para dar vida ao seu projeto.",
            "talk-to-us-btn": "FALE CONOSCO",
            "send-email-btn": "ENVIAR E-MAIL",
            "services-title": "Nossos Serviços",
            "service-1-h3": "Identidade Visual de Marcas",
            "service-1-p": "logotipo, paleta de cores, tipografia, manual de marca — tudo construído com base no DNA do seu negócio.",
            "service-2-h3": "Design para Redes Sociais",
            "service-2-p": "Posts, templates e destaques que traduzem a essência da sua marca e fortalecem sua presença digital.",
            "service-3-h3": "Consultoria Estratégica para Instagram",
            "service-3-p": "Análise, posicionamento e direcionamento prático para empreendedores que querem crescer com propósito nas redes.",
            "brands-title": "Marcas que floresceram conosco",
            "portfolio-call-paragraph": "Cada projeto é uma história única — e a próxima pode ser a sua.",
            "view-portfolio-btn": "→ Ver portfólio completo",
            "contact-subtitle": "Vamos conversar",
            "contact-title": "Você Chegou Até Aqui <span class=\"italic-text\">Por Um Motivo</span>!",
            "contact-paragraph": "Se sua marca está pronta para crescer com autenticidade, eu posso te ajudar a transformá-la em uma história de sucesso. Vamos construir algo incrível juntos!",
            "talk-to-us-btn-contact": "FALE CONOSCO",
            "send-email-btn-contact": "ENVIAR E-MAIL",
            "social-find-us": "Nos encontre nas redes:",
            "final-phrase-light": "O mundo precisa sentir o que só a sua marca tem.",
            "final-phrase-blossom": "It’s time to <span class=\"blossom-italic\">bloss</span>om.",
            "copyright-text": "&copy; 2025 estúdio bloss. Todos os direitos reservados.",
            "developed-by-text": "Desenvolvido por",
            // Novos textos para a página de portfólio
            "page-title-portfolio": "Portfólio - estúdio bloss",
            "portfolio-page-title": "Nosso Portfólio",
            "portfolio-page-subtitle": "Uma coleção de trabalhos que floresceram através do design e estratégia.",
            "project-rebranding-title": "Projeto: Rebranding Café Renascer",
            "project-rebranding-desc": "Descrição detalhada do projeto de rebranding para a marca fictícia \"Café Renascer\". Nosso trabalho envolveu a criação de uma nova identidade visual do zero, desde o logotipo até as paletas de cores, tipografia e diretrizes de aplicação para mídias digitais e impressas. O objetivo foi modernizar a imagem da marca, transmitindo sua essência artesanal e premium. Este projeto demonstrou como um design estratégico pode revitalizar a presença de uma empresa no mercado, atraindo um novo público e solidificando sua posição.",
            "project-rebranding-services": "**Serviços:** Criação de Logotipo, Design de Identidade Visual, Manual de Marca, Embalagens.",
            "project-rebranding-client": "**Cliente:** Café Renascer",
            "project-rebranding-year": "**Ano:** 2023",
            "project-campaign-title": "Criação de Campanha Digital para Bloom Fitness",
            "project-campaign-desc": "Desenvolvimento e execução de uma campanha de marketing digital completa para o lançamento do novo serviço \"Bloom Fitness\". Isso incluiu estratégia de conteúdo, design de peças visuais para redes sociais (Instagram, Facebook), criação de anúncios pagos (Google Ads, Meta Ads) e monitoramento contínuo de performance. A campanha resultou em um aumento significativo no engajamento (35% de crescimento) e nas conversões de leads online (15% de aumento em matrículas).",
            "project-campaign-services": "**Serviços:** Marketing Digital, Design para Redes Sociais, Gestão de Tráfego Pago, Análise de Dados.",
            "project-campaign-client": "**Cliente:** Bloom Fitness",
            "project-campaign-year": "**Ano:** 2024",
            "project-website-title": "Desenvolvimento de Website para Clínica OdontoCare",
            "project-website-desc": "Criação de um website institucional responsivo e otimizado para a Clínica OdontoCare. O projeto focou em uma experiência de usuário intuitiva, facilidade de agendamento online e apresentação clara dos serviços. Implementamos um design moderno, integração com sistema de agendamento e SEO básico para melhorar a visibilidade online da clínica.",
            "project-website-services": "**Serviços:** Web Design, Desenvolvimento Front-end, UX/UI Design, SEO.",
            "project-website-client": "**Cliente:** Clínica OdontoCare",
            "project-website-year": "**Ano:** 2023",
            "project-packaging-title": "Design de Embalagens para Alimentos Orgânicos \"Terra Viva\"",
            "project-packaging-desc": "Criação de uma linha completa de embalagens ecológicas e atraentes para a marca de alimentos orgânicos \"Terra Viva\". O desafio foi comunicar frescor, naturalidade e sustentabilidade através do design, utilizando materiais recicláveis e uma estética limpa. O resultado foi um aumento nas vendas e reconhecimento da marca no segmento de produtos naturais.",
            "project-packaging-services": "**Serviços:** Design de Embalagens, Ilustração, Branding.",
            "project-packaging-client": "**Cliente:** Terra Viva Alimentos Orgânicos",
            "project-packaging-year": "**Ano:** 2024",
            "project-app-title": "Design de Interface para Aplicativo \"CityGuide\"",
            "project-app-desc": "Design de interface (UI/UX) para o aplicativo móvel \"CityGuide\", um guia turístico interativo. O foco foi na usabilidade, navegabilidade e estética, criando telas intuitivas para busca de locais, avaliações e rotas. O protótipo desenvolvido permitiu testar e validar a experiência do usuário antes do desenvolvimento final.",
            "project-app-services": "**Serviços:** UI/UX Design, Prototipagem, Wireframing.",
            "project-app-client": "**Cliente:** CityGuide StartUp",
            "project-app-year": "**Ano:** 2023",
            "project-graphic-title": "Criação de Material Gráfico para Evento Corporativo \"InovaTech Summit\"",
            "project-graphic-desc": "Desenvolvimento de todo o material gráfico para o evento \"InovaTech Summit\", incluindo banners, crachás, folder, apresentações e posts para redes sociais. O objetivo era criar uma identidade visual coesa e profissional que transmitisse a inovação e tecnologia do evento.",
            "project-graphic-services": "**Serviços:** Design Gráfico, Diagramação, Criação de Banners, Artes para Eventos.",
            "project-graphic-client": "**Cliente:** InovaTech Solutions",
            "project-graphic-year": "**Ano:** 2024",
            "project-ecommerce-title": "Desenvolvimento de E-commerce para Loja de Artesanato \"Mãos Que Criam\"",
            "project-ecommerce-desc": "Construção de uma loja virtual completa para a \"Mãos Que Criam\", uma loja de artesanato. O projeto incluiu customização da plataforma, design responsivo, integração de meios de pagamento e otimização para catálogo de produtos. A loja online permitiu que a cliente expandisse seu negócio para todo o Brasil.",
            "project-ecommerce-services": "**Serviços:** E-commerce Development, Web Design, Otimização de Produtos.",
            "project-ecommerce-client": "**Cliente:** Mãos Que Criam Artesanato",
            "project-ecommerce-year": "**Ano:** 2023",
            "project-social-media-title": "Estratégia e Conteúdo para Redes Sociais \"Pet Feliz PetShop\"",
            "project-social-media-desc": "Criação de estratégia de conteúdo e gerenciamento de redes sociais para a PetShop \"Pet Feliz\". Desenvolvemos um calendário editorial, criamos posts visuais e legendas engajadoras, e monitoramos as interações para aumentar a comunidade online e o tráfego para a loja física e online.",
            "project-social-media-services": "**Serviços:** Gestão de Mídias Sociais, Criação de Conteúdo, Design para Redes Sociais.",
            "project-social-media-client": "**Cliente:** Pet Feliz PetShop",
            "project-social-media-year": "**Ano:** 2024",
            "project-illustration-title": "Criação de Ilustrações Personalizadas para Livro Infantil \"A Aventura da Luna\"",
            "project-illustration-desc": "Desenvolvimento de ilustrações vibrantes e cativantes para o livro infantil \"A Aventura da Luna\". Cada ilustração foi criada para complementar a narrativa e envolver o público jovem, trazendo vida aos personagens e cenários da história.",
            "project-illustration-services": "**Serviços:** Ilustração Digital, Design Editorial, Criação de Personagens.",
            "project-illustration-client": "**Cliente:** Editora Fantasia",
            "project-illustration-year": "**Ano:** 2023",
            "project-video-title": "Produção de Vídeo Institucional para \"Soluções Sustentáveis LTDA\"",
            "project-video-desc": "Produção de um vídeo institucional de 2 minutos para a empresa \"Soluções Sustentáveis LTDA\". O vídeo destacou a missão, valores e os impactos positivos da empresa no meio ambiente, utilizando animações, depoimentos e imagens de alta qualidade para transmitir sua mensagem.",
            "project-video-services": "**Serviços:** Roteiro, Edição de Vídeo, Motion Graphics, Sonoplastia.",
            "project-video-client": "**Cliente:** Soluções Sustentáveis LTDA",
            "project-video-year": "**Ano:** 2024",
        }
    };
    
    // Início da lógica de tradução
    let currentLang = 'pt-BR';

    const updateTranslations = (lang) => {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = translations[lang][key];
            if (translation) {
                // Manter o HTML interno
                element.innerHTML = translation;
            }
        });
        document.getElementById('language-toggle').innerHTML = translations[lang]['nav-about-us'] === "SOBRE NÓS" ? "EN <i class=\"fas fa-chevron-down\"></i>" : "PT <i class=\"fas fa-chevron-down\"></i>";
        
        // Atualiza os títulos das páginas
        const pageTitleElement = document.querySelector('title');
        if (pageTitleElement) {
            const pageTitleKey = pageTitleElement.getAttribute('data-translate');
            if (pageTitleKey && translations[lang][pageTitleKey]) {
                pageTitleElement.textContent = translations[lang][pageTitleKey];
            }
        }
    };

    const toggleLanguage = () => {
        currentLang = currentLang === 'pt-BR' ? 'en' : 'pt-BR';
        updateTranslations(currentLang);
        localStorage.setItem('lang', currentLang);
    };

    const languageToggleBtn = document.getElementById('language-toggle');
    if (languageToggleBtn) {
        languageToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleLanguage();
        });
    }

    // Inicializa a tradução com base na preferência do usuário ou padrão
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        currentLang = savedLang;
    }
    updateTranslations(currentLang);

    // ---- LÓGICA DO MODAL DE IMAGEM (para a página index.html) ----
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.image-modal-close-btn');

    if (imageModal && modalImage && closeBtn) {
        const carouselItems = document.querySelectorAll('.carousel-item img');

        carouselItems.forEach(image => {
            image.addEventListener('click', () => {
                modalImage.src = image.src;
                imageModal.classList.add('open');
            });
        });

        closeBtn.addEventListener('click', () => {
            imageModal.classList.remove('open');
        });

        imageModal.addEventListener('click', (event) => {
            if (event.target === imageModal) {
                imageModal.classList.remove('open');
            }
        });
    }

    

    
});