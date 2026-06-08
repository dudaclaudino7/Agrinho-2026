// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== QUIZ INTERATIVO ====================
    const quizOptions = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    let quizAnswered = false;

    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Impede resposta duplicada
            if (quizAnswered) {
                feedback.innerHTML = 'ℹ️ Você já respondeu essa pergunta! Recarregue a página para tentar novamente.';
                feedback.style.color = '#ffb703';
                return;
            }

            const isCorrect = this.getAttribute('data-correct') === 'true';
            
            if (isCorrect) {
                // Resposta correta
                feedback.innerHTML = '✅ Correto! O milho é realmente o símbolo das Festas Juninas! 🌽';
                feedback.style.color = '#2d6a4f';
                this.classList.add('correct');
                quizAnswered = true;
                
                // Desabilita todas as opções
                quizOptions.forEach(opt => {
                    opt.style.pointerEvents = 'none';
                    opt.classList.add('disabled');
                });
            } else {
                // Resposta errada
                feedback.innerHTML = '❌ Ops! O símbolo das Festas Juninas é o milho. Tente novamente! 🌽';
                feedback.style.color = '#e63946';
                
                // Efeito de shake na opção errada
                this.style.transform = 'shake 0.3s ease-in-out';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
    });

    // ==================== CERTIFICADO ====================
    const btnCertificado = document.getElementById('btnCertificado');
    const celebration = document.getElementById('celebration');
    let certificadoEmitido = false;

    btnCertificado.addEventListener('click', function() {
        if (certificadoEmitido) {
            celebration.innerHTML = '📜 Certificado já foi emitido! Obrigado por participar!';
            celebration.style.color = '#1b4332';
            return;
        }

        // Gera certificado
        const dataAtual = new Date();
        const dataFormatada = dataAtual.toLocaleDateString('pt-BR');
        const horaAtual = dataAtual.toLocaleTimeString('pt-BR');
        
        celebration.innerHTML = `
            🎓✨ PARABÉNS! Certificado emitido com sucesso! ✨🎓<br>
            <small style="font-size: 0.9rem;">📅 ${dataFormatada} às ${horaAtual}</small><br>
            <small style="font-size: 0.8rem;">🌟 Você agora é um guardião da cultura agrícola brasileira! 🌟</small>
        `;
        celebration.style.color = '#1b4332';
        celebration.style.fontWeight = 'bold';
        celebration.style.fontSize = '1.1rem';
        
        certificadoEmitido = true;
        
        // Efeito de confete simples
        criarConfete();
        
        // Muda texto do botão
        this.innerHTML = '✅ Certificado Emitido ✅';
        this.style.opacity = '0.7';
    });

    // ==================== FUNÇÃO DE CONFETI ====================
    function criarConfete() {
        const colors = ['#ffb703', '#fb8500', '#2d6a4f', '#1b4332', '#e9ecef'];
        
        for (let i = 0; i < 50; i++) {
            const confete = document.createElement('div');
            confete.innerHTML = ['🎉', '✨', '🌟', '🎊', '🌽', '☕', '🍇'][Math.floor(Math.random() * 7)];
            confete.style.position = 'fixed';
            confete.style.left = Math.random() * 100 + '%';
            confete.style.top = '-20px';
            confete.style.fontSize = Math.random() * 20 + 10 + 'px';
            confete.style.pointerEvents = 'none';
            confete.style.zIndex = '9999';
            confete.style.animation = `cair ${Math.random() * 2 + 2}s linear forwards`;
            document.body.appendChild(confete);
            
            // Remove após a animação
            setTimeout(() => {
                confete.remove();
            }, 3000);
        }
    }

    // ==================== ANIMAÇÃO CSS PARA CONFETI ====================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cair {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);

    // ==================== SCROLL SUAVE PARA ÂNCORAS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== CONTADOR DE VISUALIZAÇÃO ====================
    let contador = localStorage.getItem('visitasRaizesCultura');
    if (contador) {
        contador = parseInt(contador) + 1;
    } else {
        contador = 1;
    }
    localStorage.setItem('visitasRaizesCultura', contador);
    
    // Mostra contador no console (opcional)
    console.log(`🌱 Raízes da Cultura - Visitado ${contador} vezes`);

    // ==================== TÍTULO DINÂMICO ====================
    const titulos = [
        '🌱 Raízes da Cultura',
        '🌽 Agro Forte, Futuro Sustentável',
        '☕ Cultura Brasileira',
        '🍇 Vale a pena visitar de novo!'
    ];
    
    let index = 0;
    setInterval(() => {
        index = (index + 1) % titulos.length;
        document.title = titulos[index];
    }, 5000);
});