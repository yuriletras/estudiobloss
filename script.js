document.addEventListener('DOMContentLoaded', () => {
    // ---- LÓGICA DO MENU HAMBÚRGUER ----
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links-menu');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburgerMenu.classList.toggle('active');
            hamburgerMenu.setAttribute('aria-expanded', hamburgerMenu.classList.contains('active'));
        });

        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburgerMenu.classList.remove('active');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---- LÓGICA DO CARROSSEL DE MARCAS ----
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const dots = document.querySelectorAll('.carousel-dot');

    if (carouselTrack && prevBtn && nextBtn && dots.length > 0) {
        const items = carouselTrack.querySelectorAll('.carousel-item');
        const totalItems = items.length / 2;
        let currentIndex = 0;
        let isDragging = false;
        let startX = 0;
        let autoScrollInterval;

        const getItemWidth = () => {
            const item = items[0];
            const style = window.getComputedStyle(item);
            const marginRight = parseFloat(style.marginRight) || 0;
            return item.offsetWidth + marginRight;
        };
        let itemWidth = getItemWidth();

        const updateCarousel = (index, useTransition = true) => {
            currentIndex = (index + totalItems) % totalItems;
            const offset = -currentIndex * itemWidth;
            carouselTrack.style.transition = useTransition ? 'transform 0.5s ease-in-out' : 'none';
            carouselTrack.style.transform = `translateX(${offset}px)`;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });

            if (currentIndex === 0 && !useTransition) {
                setTimeout(() => {
                    carouselTrack.style.transition = 'none';
                    carouselTrack.style.transform = `translateX(0)`;
                    carouselTrack.offsetHeight;
                    carouselTrack.style.transition = 'transform 0.5s ease-in-out';
                }, 500);
            }
        };

        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                updateCarousel(currentIndex + 1);
            }, 3000);
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoScroll();
            updateCarousel(currentIndex - 1);
            startAutoScroll();
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopAutoScroll();
            updateCarousel(currentIndex + 1);
            startAutoScroll();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                stopAutoScroll();
                const index = parseInt(dot.getAttribute('data-index'), 10);
                updateCarousel(index);
                startAutoScroll();
            });
        });

        carouselTrack.addEventListener('mouseenter', stopAutoScroll);
        carouselTrack.addEventListener('mouseleave', startAutoScroll);

        carouselTrack.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            stopAutoScroll();
        });

        carouselTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].clientX;
            const deltaX = x - startX;
            if (Math.abs(deltaX) > 50) {
                updateCarousel(currentIndex + (deltaX < 0 ? 1 : -1));
                isDragging = false;
                startAutoScroll();
            }
        });

        carouselTrack.addEventListener('touchend', () => {
            isDragging = false;
            startAutoScroll();
        });

        window.addEventListener('resize', () => {
            itemWidth = getItemWidth();
            updateCarousel(currentIndex, false);
        });

        updateCarousel(currentIndex, false);
        startAutoScroll();
    }

    // ---- LÓGICA DO CARROSSEL DE DEPOIMENTOS ----
    const testimonialWrapper = document.querySelector('.testimonial-cards-wrapper');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialPrevBtn = document.getElementById('prev-btn');
    const testimonialNextBtn = document.getElementById('next-btn');
    let testimonialIndex = 0;
    let testimonialAutoScrollInterval;

    if (testimonialWrapper && testimonialCards.length > 0 && testimonialPrevBtn && testimonialNextBtn) {
        const updateTestimonialCarousel = () => {
            const cardWidth = testimonialCards[0].offsetWidth;
            const translateValue = -cardWidth * testimonialIndex;
            testimonialWrapper.style.transform = `translateX(${translateValue}px)`;
        };

        const startTestimonialAutoScroll = () => {
            testimonialAutoScrollInterval = setInterval(() => {
                testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
                updateTestimonialCarousel();
            }, 5000);
        };

        const stopTestimonialAutoScroll = () => {
            clearInterval(testimonialAutoScrollInterval);
        };

        testimonialNextBtn.addEventListener('click', () => {
            stopTestimonialAutoScroll();
            if (testimonialIndex < testimonialCards.length - 1) {
                testimonialIndex++;
            } else {
                testimonialIndex = 0;
            }
            updateTestimonialCarousel();
            startTestimonialAutoScroll();
        });

        testimonialPrevBtn.addEventListener('click', () => {
            stopTestimonialAutoScroll();
            if (testimonialIndex > 0) {
                testimonialIndex--;
            } else {
                testimonialIndex = testimonialCards.length - 1;
            }
            updateTestimonialCarousel();
            startTestimonialAutoScroll();
        });

        testimonialWrapper.parentElement.addEventListener('mouseenter', stopTestimonialAutoScroll);
        testimonialWrapper.parentElement.addEventListener('mouseleave', startTestimonialAutoScroll);

        window.addEventListener('resize', updateTestimonialCarousel);

        startTestimonialAutoScroll();
    }

    // ---- LÓGICA DE TRADUÇÃO ----
    const translations = {
        'en': {
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
            "project-odontocare-title": "Project: OdontoCare Visual Identity",
            "project-odontocare-desc": "Creation of a complete visual identity for the OdontoCare clinic, including logo, color palette, typography, and promotional materials.",
            "project-odontocare-services": "**Services:** Logo, Visual Identity, Printed Materials.",
            "project-odontocare-client": "**Client:** OdontoCare Clinic",
            "project-odontocare-year": "**Year:** 2023",
            "project-ecovida-title": "Project: EcoVida Social Media",
            "project-ecovida-desc": "Development of templates and visual content for EcoVida's social media, a brand of sustainable products.",
            "project-ecovida-services": "**Services:** Social Media Design, Post Templates, Highlights.",
            "project-ecovida-client": "**Client:** EcoVida",
            "project-ecovida-year": "**Year:** 2024",
            "project-modaviva-title": "Project: Moda Viva Branding",
            "project-modaviva-desc": "Creation of a vibrant visual identity for the fashion brand Moda Viva, with logo, color palette, and marketing materials.",
            "project-modaviva-services": "**Services:** Logo, Visual Identity, Promotional Materials.",
            "project-modaviva-client": "**Client:** Moda Viva",
            "project-modaviva-year": "**Year:** 2023",
            "project-technow-title": "Project: TechNow Digital Strategy",
            "project-technow-desc": "Strategic Instagram consulting for TechNow, with content planning, post design, and ad management.",
            "project-technow-services": "**Services:** Instagram Consulting, Post Design, Ad Management.",
            "project-technow-client": "**Client:** TechNow",
            "project-technow-year": "**Year:** 2024",
            "project-sabornatural-title": "Project: Sabor Natural Visual Identity",
            "project-sabornatural-desc": "Development of a visual identity for Sabor Natural, focusing on organic foods, including logo, packaging, and promotional materials.",
            "project-sabornatural-services": "**Services:** Logo, Packaging, Visual Identity.",
            "project-sabornatural-client": "**Client:** Sabor Natural",
            "project-sabornatural-year": "**Year:** 2023",
            "project-artevida-title": "Project: ArteVida Social Campaign",
            "project-artevida-desc": "Creation of a visual campaign for the NGO ArteVida, with social media posts and printed materials promoting inclusion through art.",
            "project-artevida-services": "**Services:** Social Media Design, Printed Materials.",
            "project-artevida-client": "**Client:** ArteVida NGO",
            "project-artevida-year": "**Year:** 2024",
            "project-luxojoias-title": "Project: LuxoJoias Branding",
            "project-luxojoias-desc": "Development of a sophisticated visual identity for LuxoJoias, with logo, color palette, and brand manual reflecting exclusivity.",
            "project-luxojoias-services": "**Services:** Logo, Visual Identity, Brand Manual.",
            "project-luxojoias-client": "**Client:** LuxoJoias",
            "project-luxojoias-year": "**Year:** 2023",
            "project-petamor-title": "Project: PetAmor Digital Strategy",
            "project-petamor-desc": "Planning and execution of a digital strategy for PetAmor, with post design and content management for social media, increasing engagement.",
            "project-petamor-services": "**Services:** Social Media Design, Instagram Consulting.",
            "project-petamor-client": "**Client:** PetAmor",
            "project-petamor-year": "**Year:** 2024",
            "testimonials-title": "What our clients say",
            "testimonial-1-quote": "\"Bloss Studio completely transformed our brand's visual identity. The result exceeded all expectations and our market presence has never been stronger. Incredible and dedicated professionals!\"",
            "testimonial-1-client-name": "Ana Lúcia",
            "testimonial-1-client-title": "CEO, Renascer Coffee",
            "testimonial-2-quote": "\"Working with the team was a smooth and very creative experience. They captured the essence of our idea and turned it into a design that truly stands out. I highly recommend them!\"",
            "testimonial-2-client-name": "João Marcos",
            "testimonial-2-client-title": "Director, Bloom Fitness",
            "testimonial-3-quote": "\"The attention to detail and passion for what they do are evident in every project. Our new website is visually stunning and extremely functional. We are very satisfied with the work!\"",
            "testimonial-3-client-name": "Beatriz Costa",
            "testimonial-3-client-title": "Founder, OdontoCare Clinic",
            "back-to-home": "← Back",
            "visual-samples-title": "Visual Samples",
            "enlarge-image": "Enlarge Image",
            "view-details": "View Details"
        },
        'pt-BR': {
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
            "project-odontocare-title": "Projeto: Identidade Visual OdontoCare",
            "project-odontocare-desc": "Criação de uma identidade visual completa para a clínica OdontoCare, incluindo logotipo, paleta de cores, tipografia e materiais promocionais.",
            "project-odontocare-services": "**Serviços:** Logotipo, Identidade Visual, Materiais Impressos.",
            "project-odontocare-client": "**Cliente:** Clínica OdontoCare",
            "project-odontocare-year": "**Ano:** 2023",
            "project-ecovida-title": "Projeto: Redes Sociais EcoVida",
            "project-ecovida-desc": "Desenvolvimento de templates e conteúdos visuais para as redes sociais da EcoVida, uma marca de produtos sustentáveis.",
            "project-ecovida-services": "**Serviços:** Design para Redes Sociais, Templates de Posts, Destaques.",
            "project-ecovida-client": "**Cliente:** EcoVida",
            "project-ecovida-year": "**Ano:** 2024",
            "project-modaviva-title": "Projeto: Branding Moda Viva",
            "project-modaviva-desc": "Criação de uma identidade visual vibrante para a marca de moda Moda Viva, com logotipo, paleta de cores e materiais de marketing.",
            "project-modaviva-services": "**Serviços:** Logotipo, Identidade Visual, Materiais Promocionais.",
            "project-modaviva-client": "**Cliente:** Moda Viva",
            "project-modaviva-year": "**Ano:** 2023",
            "project-technow-title": "Projeto: Estratégia Digital TechNow",
            "project-technow-desc": "Consultoria estratégica para o Instagram da TechNow, com planejamento de conteúdo, design de posts e gestão de anúncios.",
            "project-technow-services": "**Serviços:** Consultoria Instagram, Design de Posts, Gestão de Anúncios.",
            "project-technow-client": "**Cliente:** TechNow",
            "project-technow-year": "**Ano:** 2024",
            "project-sabornatural-title": "Projeto: Identidade Visual Sabor Natural",
            "project-sabornatural-desc": "Desenvolvimento de uma identidade visual para a Sabor Natural, com foco em alimentos orgânicos, incluindo logotipo, embalagens e materiais promocionais.",
            "project-sabornatural-services": "**Serviços:** Logotipo, Embalagens, Identidade Visual.",
            "project-sabornatural-client": "**Cliente:** Sabor Natural",
            "project-sabornatural-year": "**Ano:** 2023",
            "project-artevida-title": "Projeto: Campanha Social ArteVida",
            "project-artevida-desc": "Criação de uma campanha visual para a ONG ArteVida, com posts para redes sociais e materiais impressos que promovem inclusão através da arte.",
            "project-artevida-services": "**Serviços:** Design para Redes Sociais, Materiais Impressos.",
            "project-artevida-client": "**Cliente:** ONG ArteVida",
            "project-artevida-year": "**Ano:** 2024",
            "project-luxojoias-title": "Projeto: Branding LuxoJoias",
            "project-luxojoias-desc": "Desenvolvimento de uma identidade visual sofisticada para a LuxoJoias, com logotipo, paleta de cores e manual de marca que refletem exclusividade.",
            "project-luxojoias-services": "**Serviços:** Logotipo, Identidade Visual, Manual de Marca.",
            "project-luxojoias-client": "**Cliente:** LuxoJoias",
            "project-luxojoias-year": "**Ano:** 2023",
            "project-petamor-title": "Projeto: Estratégia Digital PetAmor",
            "project-petamor-desc": "Planejamento e execução de uma estratégia digital para a PetAmor, com design de posts e gestão de conteúdo para redes sociais, aumentando o engajamento.",
            "project-petamor-services": "**Serviços:** Design para Redes Sociais, Consultoria Instagram.",
            "project-petamor-client": "**Cliente:** PetAmor",
            "project-petamor-year": "**Ano:** 2024",
            "testimonials-title": "O que nossos clientes dizem",
            "testimonial-1-quote": "\"O estúdio bloss transformou completamente a identidade visual da nossa marca. O resultado superou todas as expectativas e nossa presença no mercado nunca foi tão forte. Profissionais incríveis e dedicados!\"",
            "testimonial-1-client-name": "Ana Lúcia",
            "testimonial-1-client-title": "CEO, Café Renascer",
            "testimonial-2-quote": "\"Trabalhar com a equipe foi uma experiência fluida e muito criativa. Eles capturaram a essência da nossa ideia e a transformaram em um design que realmente se destaca. Recomendo de olhos fechados!\"",
            "testimonial-2-client-name": "João Marcos",
            "testimonial-2-client-title": "Diretor, Bloom Fitness",
            "testimonial-3-quote": "\"A atenção aos detalhes e a paixão pelo que fazem são evidentes em cada projeto. Nosso novo site é visualmente deslumbrante e extremamente funcional. Estamos muito satisfeitos com o trabalho!\"",
            "testimonial-3-client-name": "Beatriz Costa",
            "testimonial-3-client-title": "Fundadora, Clínica OdontoCare",
            "back-to-home": "← Voltar",
            "visual-samples-title": "Amostras Visuais",
            "enlarge-image": "Ampliar Imagem",
            "view-details": "Ver Detalhes"
        }
    };

    let currentLang = 'pt-BR';

    const updateTranslations = (lang) => {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = translations[lang][key];
            if (translation) {
                const img = element.querySelector('img');
                if (img) {
                    element.innerHTML = translation + ' ';
                    element.appendChild(img);
                } else {
                    element.innerHTML = translation;
                }
            }
        });
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            const navAboutUsText = translations[lang]['nav-about-us'];
            if (navAboutUsText === "SOBRE NÓS") {
                languageToggle.innerHTML = "EN <i class=\"fas fa-chevron-down\"></i>";
            } else {
                languageToggle.innerHTML = "PT <i class=\"fas fa-chevron-down\"></i>";
            }
        }

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

    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
        currentLang = savedLang;
        updateTranslations(currentLang);
    } else {
        updateTranslations(currentLang);
    }

    // ---- LÓGICA DO MODAL DE IMAGEM ----
    const imageModal = document.getElementById('image-modal') || document.getElementById('fullscreen-modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.image-modal-close-btn') || document.querySelector('.modal-close-btn');

    if (imageModal && modalImage && closeBtn) {
        const carouselItems = document.querySelectorAll('.carousel-item');
        const portfolioItems = document.querySelectorAll('.portfolio-full-item');
        const sampleItems = document.querySelectorAll('.sample-item');

        const openModal = (image) => {
            modalImage.src = '';
            modalImage.classList.remove('loaded');
            imageModal.classList.add('open');
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modalImage.onload = () => {
                modalImage.classList.add('loaded');
                const spinner = imageModal.querySelector('.spinner');
                if (spinner) {
                    spinner.classList.remove('active');
                }
            };
        };

        // Modal para carrossel de marcas (index.html)
        carouselItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('image-overlay') || e.target.classList.contains('overlay-text')) {
                    const image = item.querySelector('img');
                    if (image) {
                        openModal(image);
                    }
                }
            });
        });

        // Modal para itens de portfólio e amostras visuais (portfolio.html)
        portfolioItems.forEach(item => {
            const overlay = item.querySelector('.image-overlay');
            if (overlay) {
                overlay.addEventListener('click', () => {
                    const image = item.querySelector('img');
                    if (image) {
                        openModal(image);
                    }
                });
            }
        });

        sampleItems.forEach(item => {
            const overlay = item.querySelector('.image-overlay');
            if (overlay) {
                overlay.addEventListener('click', () => {
                    const image = item.querySelector('img');
                    if (image) {
                        openModal(image);
                    }
                });
            }
        });

        closeBtn.addEventListener('click', () => {
            imageModal.classList.remove('open');
            modalImage.src = '';
            modalImage.classList.remove('loaded');
            const spinner = imageModal.querySelector('.spinner');
            if (spinner) {
                spinner.classList.add('active');
            }
        });

        imageModal.addEventListener('click', (event) => {
            if (event.target === imageModal) {
                imageModal.classList.remove('open');
                modalImage.src = '';
                modalImage.classList.remove('loaded');
                const spinner = imageModal.querySelector('.spinner');
                if (spinner) {
                    spinner.classList.add('active');
                }
            }
        });
    }

    // ---- REMOVER SPINNER APÓS CARREGAMENTO DAS IMAGENS ----
    document.querySelectorAll('.portfolio-full-item img, .sample-item img').forEach(img => {
        img.addEventListener('load', () => {
            const spinner = img.parentElement.querySelector('.spinner');
            if (spinner) {
                spinner.classList.remove('active');
            }
        });
        if (img.complete) {
            const spinner = img.parentElement.querySelector('.spinner');
            if (spinner) {
                spinner.classList.remove('active');
            }
        }
    });

    // ---- BOTÃO VOLTAR AO TOPO ----
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});