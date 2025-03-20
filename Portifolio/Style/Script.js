document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('h1');
    const p = document.querySelector('p');
    const menuBtn = document.querySelector('.menu-btn');
    const menuItems = document.querySelector('.menu-items');
    const interactiveElement = document.querySelector('.interactive-element');
    const colors = ['#009BD9', '#FCCF00', '#831409', '#44AF35'];

    // Animações de entrada
    [h1, p].forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 500 + 100);
    });

    // Efeito arco-íris nas letras
    function applyRainbowEffect(elementId, colors) {
        const element = document.getElementById(elementId);
        if (!element) return;
        const text = element.innerText;
        element.innerHTML = '';
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.innerText = text[i];
            span.style.color = colors[i % colors.length];
            element.appendChild(span);
        }
    }

    ['colorful-title', 'colorful-text'].forEach(id => applyRainbowEffect(id, colors));

    // Menu toggle
    if (menuBtn && menuItems) {
        menuBtn.addEventListener('click', () => {
            menuItems.classList.toggle('show');
        });
    }

    // Mudança de cor ao clicar no círculo
    if (interactiveElement) {
        interactiveElement.addEventListener('click', () => {
            interactiveElement.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        });
    }
});
