// Script.js
document.addEventListener('DOMContentLoaded', () => {
    // Elementos DOM
    const h1 = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');
    const menuBtn = document.querySelector('.menu-btn');
    const menuItems = document.querySelector('.menu-items');
    const scrollDown = document.querySelector('.scroll-down');
    const sections = document.querySelectorAll('.section');
    const projectCards = document.querySelectorAll('.project-card');
    const coin = document.querySelector('.mario-coin');
    const levelBar = document.querySelector('.level-fill');
    const levelText = document.querySelector('.level-text'); // Novo elemento
    const contactForm = document.querySelector('.contact-form');
    const marioRunFooter = document.querySelector('.mario-run'); // Renomeado para maior clareza
    const clouds = document.querySelectorAll('.cloud'); // Selecionar nuvens
    
    // Cores do tema Mario
    const colors = ['#E52521', '#FCCF00', '#009BD9', '#44AF35'];
    let currentColorIndex = 0; // Para o ciclo de cores do título
    
    // Animações de entrada
    const animateElements = () => {
        // H1 e Subtitle já têm transição CSS, apenas mudamos a opacidade e transform
        if (h1) {
            setTimeout(() => {
                h1.style.opacity = '1';
                h1.style.transform = 'translateY(0)';
            }, 100);
        }
        // Subtitle tem efeito de digitação, então sua animação inicial será tratada lá.
    };
    
    // Efeito arco-íris nas letras do título
    const applyRainbowEffect = (element, colors) => {
        if (!element) return;
        const text = element.innerText;
        element.innerHTML = ''; // Limpa o conteúdo original
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.innerText = text[i];
            // Aplica a cor inicial. O ciclo de cores será feito por outra função.
            span.style.color = colors[i % colors.length]; 
            span.style.transition = 'color 0.5s ease'; // Transição suave para a mudança de cor
            element.appendChild(span);
        }
    };

    // Ciclo de cores contínuo no título
    const startColorCycle = (element, colors) => {
        if (!element || element.querySelectorAll('span').length === 0) return;

        const letters = element.querySelectorAll('span');
        
        setInterval(() => {
            letters.forEach((letter, index) => {
                // Alterna a cor de cada letra sequencialmente no array de cores
                letter.style.color = colors[(currentColorIndex + index) % colors.length];
            });
            currentColorIndex = (currentColorIndex + 1) % colors.length; // Avança para a próxima cor inicial
        }, 800); // Velocidade do ciclo de cores (mais rápido)
    };
    
    // Menu toggle
    const setupMenu = () => {
        if (menuBtn && menuItems) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Impede que o clique se propague para o document
                menuItems.classList.toggle('show');
            });
            
            // Fechar menu ao clicar fora
            document.addEventListener('click', (e) => {
                if (!menuBtn.contains(e.target) && !menuItems.contains(e.target)) {
                    menuItems.classList.remove('show');
                }
            });
        }
    };
    
    // Scroll suave
    const setupSmoothScroll = () => {
        if (scrollDown) {
            scrollDown.addEventListener('click', () => {
                const projetosSection = document.querySelector('#Projetos');
                if (projetosSection) {
                    window.scrollTo({
                        top: projetosSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        }
        
        // Links do menu
        document.querySelectorAll('.menu-items a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu após seleção
                    menuItems.classList.remove('show');
                }
            });
        });
    };
    
    // Animação ao rolar (Intersection Observer)
    const setupScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1 // A seção se torna visível quando 10% dela está na tela
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opcional: parar de observar depois que a animação é aplicada
                    // observer.unobserve(entry.target); 
                } else {
                    // Opcional: Remover 'visible' quando sai da tela (se quiser reanimar)
                    // entry.target.classList.remove('visible'); 
                }
            });
        }, observerOptions);
        
        // Observar todas as seções
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Observar cards de projeto separadamente para atraso de animação
        projectCards.forEach((card) => {
            observer.observe(card);
        });
    };
    
    // Efeito de digitação no subtítulo
    const typeWriterEffect = () => {
        if (!subtitle) return;
        
        const text = "Desenvolvedor | Criador de Jogos | Entusiasta de TI";
        let i = 0;
        
        subtitle.textContent = ''; // Limpa o texto inicial
        subtitle.style.opacity = '1'; // Já começa visível
        
        const typing = setInterval(() => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                // O efeito arco-íris do subtítulo agora é feito por `applyRainbowEffect` e `startColorCycle`
                // applyRainbowEffect(subtitle, colors); // Removido, pois o subtítulo não tem ciclo de cores
            }
        }, 100);
    };
    
    // Efeito de moeda
    const setupCoinEffect = () => {
        if (coin && h1) {
            // Animação ao passar o mouse no título
            h1.addEventListener('mouseover', () => {
                coin.style.transform = 'scale(1.2) rotate(360deg)';
                coin.style.transition = 'transform 0.3s';
                setTimeout(() => {
                    coin.style.transform = 'scale(1)'; // Reset após animação
                }, 300);
            });
            
            // Animação ao clicar na moeda
            coin.addEventListener('click', () => {
                coin.style.transform = 'scale(1.5) rotate(1080deg)';
                setTimeout(() => {
                    coin.style.transform = 'scale(1) rotate(0)';
                }, 500);
            });
        }
    };
    
    // Animação da barra de nível
    const animateLevelBar = () => {
        if (levelBar && levelText) {
            const targetWidth = 75; // %
            let currentWidth = 0;
            const duration = 1500; // ms
            const interval = 50; // ms

            const increment = (targetWidth / (duration / interval));

            const animation = setInterval(() => {
                if (currentWidth < targetWidth) {
                    currentWidth += increment;
                    levelBar.style.width = `${currentWidth}%`;
                    levelText.textContent = `Nível: ${Math.round(currentWidth)}%`;
                } else {
                    levelBar.style.width = `${targetWidth}%`;
                    levelText.textContent = `Nível: ${targetWidth}%`;
                    clearInterval(animation);
                }
            }, interval);
        }
    };
    
    // Formulário de contato
    const setupContactForm = () => {
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Evita o recarregamento da página
                
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada!';
                submitBtn.style.backgroundColor = '#44AF35'; // Verde de sucesso
                submitBtn.disabled = true; // Desabilita o botão para evitar múltiplos envios
                
                // Simula um envio e reseta o formulário
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = ''; // Volta a cor original
                    submitBtn.disabled = false; // Reabilita o botão
                    contactForm.reset(); // Limpa os campos do formulário
                }, 3000);
            });
        }
    };
    
    // Efeito de pulo nos botões
    const setupButtonEffects = () => {
        document.querySelectorAll('a, button').forEach(btn => {
            // Evita aplicar a botões específicos que já têm animações próprias
            if (btn.classList.contains('menu-btn') || btn.classList.contains('submit-btn')) {
                return;
            }

            btn.addEventListener('mousedown', () => {
                btn.style.transform = 'translateY(5px)';
            });
            
            btn.addEventListener('mouseup', () => {
                btn.style.transform = 'translateY(0)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });
    };
    
    // Animação do Mario correndo no footer (já movida para CSS)
    // A função setupMarioAnimation foi removida pois o CSS já cuida da animação
    // Apenas precisamos garantir que o elemento exista no HTML e o CSS o animará.

    // Efeito de Parallax nas Nuvens
    const setupCloudParallax = () => {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            clouds.forEach(cloud => {
                // Quanto mais baixo na tela, mais lenta a nuvem se move (simulando distância)
                const speed = parseFloat(cloud.dataset.speed) || 0.1; // Adicionar data-speed no HTML para controle
                cloud.style.transform = `translateX(${scrollY * speed}px)`;
            });
        });
    };

    // Inicialização
    const init = () => {
        animateElements();
        applyRainbowEffect(h1, colors); // Aplica as cores iniciais ao título
        startColorCycle(h1, colors); // Inicia o ciclo de cores no título
        setupMenu();
        setupSmoothScroll();
        setupScrollAnimations();
        typeWriterEffect();
        setupCoinEffect();
        animateLevelBar();
        setupContactForm();
        setupButtonEffects();
        setupCloudParallax(); // Nova função para o efeito de paralaxe
    };
    
    init();
});
