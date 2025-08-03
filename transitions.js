document.addEventListener('DOMContentLoaded', () => {
    console.log('transitions.js carregado');

    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const pageTransition = document.createElement('div');
    pageTransition.classList.add('page-transition');
    document.body.appendChild(pageTransition);

    if (!sections.length) {
        console.warn('Nenhuma seção com classe .section encontrada');
        return;
    }
    if (!navLinks.length) {
        console.warn('Nenhum link com classe .nav-links encontrado');
        return;
    }

    // Verificar suporte para prefers-reduced-motion
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Inicializar estilos iniciais
    sections.forEach(section => {
        if (!reduceMotion) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(40px)';
            section.style.filter = 'blur(8px)';
            const elements = section.querySelectorAll('h1, h2, h3, h4, p, .social-icons i, .btn');
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.filter = 'blur(8px)';
            });
        }
    });

    function showSection(sectionId) {
        console.log('Mostrando seção:', sectionId);
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
                if (!reduceMotion) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                    section.style.filter = 'blur(0)';
                    const elements = section.querySelectorAll('h1, h2, h3, h4, p, .social-icons i, .btn');
                    elements.forEach((el, index) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                            el.style.filter = 'blur(0)';
                        }, index * 500);
                    });
                } else {
                    section.style.opacity = '1';
                    const elements = section.querySelectorAll('h1, h2, h3, h4, p, .social-icons i, .btn');
                    elements.forEach(el => {
                        el.style.opacity = '1';
                    });
                }
            }
        });
    }

    function resetSection(section) {
        if (!reduceMotion) {
            section.classList.remove('active');
            section.style.opacity = '0';
            section.style.transform = 'translateY(40px)';
            section.style.filter = 'blur(8px)';
            const elements = section.querySelectorAll('h1, h2, h3, h4, p, .social-icons i, .btn');
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.filter = 'blur(8px)';
            });
        }
    }

    function smoothScroll(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            console.log('Rolando para:', targetId);
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        } else {
            console.warn('Elemento não encontrado:', targetId);
        }
    }

    function handlePageTransition(href) {
        console.log('Iniciando transição de página para:', href);
        if (!reduceMotion) {
            pageTransition.classList.add('active');
            setTimeout(() => {
                window.location.href = href;
            }, 1000);
        } else {
            window.location.href = href;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (e.defaultPrevented) return;
            e.preventDefault();
            const href = link.getAttribute('href');
            console.log('Link clicado:', href);

            if (href.includes('#')) {
                const sectionId = href.split('#')[1];
                if (document.getElementById(sectionId)) {
                    showSection(sectionId);
                    smoothScroll(`#${sectionId}`);
                } else {
                    handlePageTransition(href);
                }
            } else {
                handlePageTransition(href);
            }
        }, { passive: false });
    });

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Seção visível:', entry.target.id);
                entry.target.classList.add('active');
                if (!reduceMotion) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.filter = 'blur(0)';
                    const elements = entry.target.querySelectorAll('h1, h2, h3, h4, p, .social-icons i, .btn');
                    elements.forEach((el, index) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                            el.style.filter = 'blur(0)';
                        }, index * 500);
                    });
                } else {
                    entry.target.style.opacity = '1';
                    const elements = entry.target.querySelectorAll('h1, h2, h3, h4, p, .social-icons i, .btn');
                    elements.forEach(el => {
                        el.style.opacity = '1';
                    });
                }
            } else {
                // Reativar animação ao sair da viewport
                resetSection(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Forçar visibilidade da primeira seção com atraso inicial
    if (sections.length > 0) {
        console.log('Ativando primeira seção:', sections[0].id);
        setTimeout(() => {
            sections[0].classList.add('active');
            if (!reduceMotion) {
                sections[0].style.opacity = '1';
                sections[0].style.transform = 'translateY(0)';
                sections[0].style.filter = 'blur(0)';
                const elements = sections[0].querySelectorAll('h1, h2, h3, h4, p, .social-icons i, .btn');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                        el.style.filter = 'blur(0)';
                    }, index * 500);
                });
            } else {
                sections[0].style.opacity = '1';
                const elements = sections[0].querySelectorAll('h1, h2, h3, h4, p, .social-icons i, .btn');
                elements.forEach(el => {
                    el.style.opacity = '1';
                });
            }
        }, 300);
    }

    window.addEventListener('load', () => {
        console.log('Página carregada, removendo transição');
        pageTransition.classList.remove('active');
    });
});