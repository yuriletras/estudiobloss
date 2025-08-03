document.addEventListener('DOMContentLoaded', () => {
    console.log('portfolio-transitions.js carregado');

    const portfolioItems = document.querySelectorAll('.portfolio-full-item');
    const portfolioSection = document.querySelector('#full-portfolio-section');

    if (!portfolioItems.length) {
        console.warn('Nenhum item com classe .portfolio-full-item encontrado');
        return;
    }
    if (!portfolioSection) {
        console.warn('Seção #full-portfolio-section não encontrada');
        return;
    }

    // Inicializar estilos iniciais
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        item.style.display = 'block';
        const elements = item.querySelectorAll('.portfolio-full-item-description, .portfolio-full-item-image, h3, p, ul, li');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(15px)';
            el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            el.style.display = '';
        });
    });

    // Forçar visibilidade da seção e dos itens
    portfolioSection.classList.add('active');
    console.log('Forçando visibilidade da seção #full-portfolio-section');
    portfolioItems.forEach((item, index) => {
        setTimeout(() => {
            console.log('Ativando item do portfólio:', index);
            item.classList.add('active');
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            const elements = item.querySelectorAll('.portfolio-full-item-description, .portfolio-full-item-image, h3, p, ul, li');
            elements.forEach((el, elIndex) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, elIndex * 100);
            });
        }, index * 150);
    });

    // IntersectionObserver apenas para itens que entram na viewport posteriormente
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('active')) {
                console.log('Item do portfólio visível:', index);
                entry.target.classList.add('active');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                const elements = entry.target.querySelectorAll('.portfolio-full-item-description, .portfolio-full-item-image, h3, p, ul, li');
                elements.forEach((el, elIndex) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, elIndex * 100);
                });
            }
        });
    }, { root: null, threshold: 0.1 });

    portfolioItems.forEach(item => {
        observer.observe(item);
    });
});