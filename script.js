// ==================== AGUARDAR CARREGAMENTO DA PÁGINA ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== QUIZ INTERATIVO ====================
    const quizOptions = document.querySelectorAll('.quiz-option');
    const feedbackQuiz = document.getElementById('feedbackQuiz');
    let quizRespondido = false;

    if (quizOptions.length > 0) {
        quizOptions.forEach(btn => {
            btn.addEventListener('click', function() {
                if (quizRespondido) {
                    feedbackQuiz.innerHTML = 'ℹ️ Você já respondeu o quiz! Recarregue a página para tentar novamente.';
                    feedbackQuiz.style.color = '#ffb703';
                    return;
                }

                const isCorrect = this.getAttribute('data-correct') === 'true';
                
                if (isCorrect) {
                    feedbackQuiz.innerHTML = '✅ Correto! O milho é o símbolo das Festas Juninas! 🌽';
                    feedbackQuiz.style.color = '#2d6a4f';
                    this.classList.add('correct');
                    quizRespondido = true;
                    
                    // Desabilita todos os botões do quiz
                    quizOptions.forEach(btn => {
                        btn.disabled = true;
                        btn.classList.add('disabled');
                    });
                    
                    // Salva no localStorage que o quiz foi completado
                    localStorage.setItem('quizCompletado', 'true');
                    
                    // Atualiza contador de quizzes
                    atualizarContadorQuiz();
                    
                } else {
                    feedbackQuiz.innerHTML = '❌ Errado! O símbolo das Festas Juninas é o milho. Tente novamente! 🌽';
                    feedbackQuiz.style.color = '#e63946';
                    
                    // Efeito de shake no botão errado
                    this.style.transform = 'translateX(5px)';
                    setTimeout(() => this.style.transform = '', 100);
                    setTimeout(() => this.style.transform = 'translateX(-5px)', 200);
                    setTimeout(() => this.style.transform = '', 300);
                }
            });
        });
    }

    // ==================== FUNÇÃO PARA ATUALIZAR CONTADOR DE QUIZ ====================
    function atualizarContadorQuiz() {
        let quizCount = localStorage.getItem('quizCount');
        if (quizCount) {
            quizCount = parseInt(quizCount) + 1;
        } else {
            quizCount = 1;
        }
        localStorage.setItem('quizCount', quizCount);
        
        const quizCountElement = document.getElementById('quizCount');
        if (quizCountElement) {
            quizCountElement.textContent = quizCount;
        }
    }

    // ==================== CONTADOR DE VISITAS ====================
    let visitas = localStorage.getItem('visitasRaizes');
    if (visitas) {
        visitas = parseInt(visitas) + 1;
    } else {
        visitas = 1;
    }
    localStorage.setItem('visitasRaizes', visitas);
    
    const visitCountElement = document.getElementById('visitCount');
    if (visitCountElement) {
        visitCountElement.textContent = visitas;
    }
    
    console.log(`🌱 Raízes da Cultura - Visitado ${visitas} vezes`);

    // ==================== CERTIFICADO ====================
    const btnGerar = document.getElementById('gerarCertificado');
    const nomeInput = document.getElementById('nomeUsuario');
    const mensagemCert = document.getElementById('mensagemCertificado');
    const preview = document.getElementById('previewCertificado');
    const nomeCertificado = document.getElementById('nomeCertificado');
    const dataCertificado = document.getElementById('dataCertificado');
    let certificadoGerado = false;

    if (btnGerar) {
        btnGerar.addEventListener('click', function() {
            const nome = nomeInput ? nomeInput.value.trim() : '';
            
            // Validação do nome
            if (nome === '') {
                mensagemCert.innerHTML = '⚠️ Por favor, digite seu nome!';
                mensagemCert.style.color = '#e63946';
                return;
            }
            
            // Verifica se o quiz foi respondido
            const quizCompletado = localStorage.getItem('quizCompletado');
            if (quizCompletado !== 'true') {
                mensagemCert.innerHTML = '⚠️ Responda o quiz primeiro para gerar o certificado!';
                mensagemCert.style.color = '#e63946';
                return;
            }
            
            // Verifica se já gerou certificado
            if (certificadoGerado) {
                mensagemCert.innerHTML = '📜 Certificado já foi gerado!';
                mensagemCert.style.color = '#1b4332';
                return;
            }
            
            // Gera certificado
            const agora = new Date();
            const dataFormatada = agora.toLocaleDateString('pt-BR');
            const hora = agora.toLocaleTimeString('pt-BR');
            
            if (nomeCertificado) nomeCertificado.textContent = nome;
            if (dataCertificado) dataCertificado.textContent = `Emitido em: ${dataFormatada} às ${hora}`;
            
            if (preview) preview.style.display = 'block';
            
            mensagemCert.innerHTML = '🎓✨ CERTIFICADO GERADO COM SUCESSO! ✨🎓';
            mensagemCert.style.color = '#1b4332';
            
            certificadoGerado = true;
            btnGerar.disabled = true;
            btnGerar.textContent = '✅ Certificado Gerado ✅';
            
            // Salva no localStorage
            localStorage.setItem('certificadoGerado', 'true');
            localStorage.setItem('nomeUsuario', nome);
            localStorage.setItem('dataCertificado', dataFormatada);
            
            // Atualiza contador de certificados
            atualizarContadorCertificados();
            
            // Efeito de confetes
            criarConfetes();
        });
    }

    // ==================== FUNÇÃO PARA CRIAR CONFETES ====================
    function criarConfetes() {
        const emojis = ['🎉', '✨', '🌟', '🌽', '☕', '🍇', '🌱', '🎊', '⭐', '💚'];
        
        for (let i = 0; i < 60; i++) {
            const confete = document.createElement('div');
            confete.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confete.style.position = 'fixed';
            confete.style.left = Math.random() * 100 + '%';
            confete.style.top = '-30px';
            confete.style.fontSize = (Math.random() * 20 + 10) + 'px';
            confete.style.pointerEvents = 'none';
            confete.style.zIndex = '9999';
            confete.style.animation = `confete ${Math.random() * 2 + 2}s linear forwards`;
            document.body.appendChild(confete);
            
            setTimeout(() => confete.remove(), 3000);
        }
    }

    // ==================== CONTADOR DE CERTIFICADOS ====================
    function atualizarContadorCertificados() {
        let certCount = localStorage.getItem('certCount');
        if (certCount) {
            certCount = parseInt(certCount) + 1;
        } else {
            certCount = 1;
        }
        localStorage.setItem('certCount', certCount);
        
        const certCountElement = document.getElementById('certCount');
        if (certCountElement) {
            certCountElement.textContent = certCount;
        }
    }

    // Carregar contadores na inicialização
    const quizCompletado = localStorage.getItem('quizCompletado');
    if (quizCompletado === 'true') {
        const quizCount = localStorage.getItem('quizCount');
        const quizCountElement = document.getElementById('quizCount');
        if (quizCountElement && quizCount) quizCountElement.textContent = quizCount;
    }
    
    const certCount = localStorage.getItem('certCount');
    const certCountElement = document.getElementById('certCount');
    if (certCountElement && certCount) certCountElement.textContent = certCount;

    // ==================== BAIXAR CERTIFICADO COMO PNG ====================
    const baixarCertificado = document.getElementById('baixarCertificado');
    
    if (baixarCertificado) {
        baixarCertificado.addEventListener('click', function() {
            const elemento = document.getElementById('previewCertificado');
            
            if (elemento && typeof html2canvas !== 'undefined') {
                html2canvas(elemento, {
                    scale: 2,
                    backgroundColor: '#ffffff',
                    logging: false
                }).then(canvas => {
                    const link = document.createElement('a');
                    const nome = nomeInput ? nomeInput.value.trim() : 'visitante';
                    link.download = `certificado_${nome.replace(/ /g, '_')}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                    
                    // Mensagem de sucesso
                    const msg = document.createElement('div');
                    msg.textContent = '📥 Certificado baixado com sucesso!';
                    msg.style.position = 'fixed';
                    msg.style.bottom = '20px';
                    msg.style.left = '50%';
                    msg.style.transform = 'translateX(-50%)';
                    msg.style.background = '#2d6a4f';
                    msg.style.color = 'white';
                    msg.style.padding = '10px 20px';
                    msg.style.borderRadius = '30px';
                    msg.style.zIndex = '10000';
                    document.body.appendChild(msg);
                    setTimeout(() => msg.remove(), 3000);
                }).catch(error => {
                    console.error('Erro ao gerar imagem:', error);
                    alert('Erro ao gerar o certificado. Tente novamente ou tire um print da tela!');
                });
            } else {
                alert('💡 Dica: Você pode tirar um print da tela (Windows: Win + Shift + S) para salvar seu certificado!');
            }
        });
    }

    // ==================== SISTEMA DE AVALIAÇÃO POR ESTRELAS ====================
    const stars = document.querySelectorAll('.star');
    const ratingFeedback = document.getElementById('ratingFeedback');
    const avgRatingSpan = document.getElementById('avgRating');
    const totalRatingsSpan = document.getElementById('totalRatings');

    // Carregar avaliações do localStorage
    let avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    
    function atualizarMediaAvaliacoes() {
        if (avaliacoes.length === 0) {
            if (avgRatingSpan) avgRatingSpan.textContent = '0.0';
            if (totalRatingsSpan) totalRatingsSpan.textContent = '0';
            return;
        }
        
        const soma = avaliacoes.reduce((acc, val) => acc + val, 0);
        const media = soma / avaliacoes.length;
        
        if (avgRatingSpan) avgRatingSpan.textContent = media.toFixed(1);
        if (totalRatingsSpan) totalRatingsSpan.textContent = avaliacoes.length;
        
        // Atualizar estrelas da média
        const estrelasCheias = Math.round(media);
        if (stars.length > 0) {
            stars.forEach((star, index) => {
                if (index < estrelasCheias) {
                    star.textContent = '★';
                } else {
                    star.textContent = '☆';
                }
            });
        }
    }
    
    // Inicializar média
    atualizarMediaAvaliacoes();
    
    // Evento de clique nas estrelas
    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const valor = parseInt(this.getAttribute('data-value'));
                
                // Adicionar avaliação
                avaliacoes.push(valor);
                localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
                
                // Atualizar exibição
                atualizarMediaAvaliacoes();
                
                // Feedback
                if (ratingFeedback) {
                    const mensagens = {
                        1: '😔 Obrigado pelo feedback! Vamos melhorar!',
                        2: '🙁 Obrigado! Trabalharemos para melhorar.',
                        3: '😐 Obrigado! Ficamos felizes com sua avaliação.',
                        4: '🙂 Obrigado! Que bom que gostou!',
                        5: '😍 Perfeito! Ficamos muito felizes! 🌟'
                    };
                    ratingFeedback.textContent = mensagens[valor] || 'Obrigado pela avaliação!';
                    ratingFeedback.style.color = '#2d6a4f';
                }
                
                // Destacar estrelas selecionadas
                stars.forEach((s, i) => {
                    if (i < valor) {
                        s.textContent = '★';
                        s.style.color = '#ffb703';
                    } else {
                        s.textContent = '☆';
                        s.style.color = '#ccc';
                    }
                });
                
                // Desabilitar após avaliar (opcional)
                stars.forEach(s => s.style.pointerEvents = 'none');
            });
            
            // Hover nas estrelas
            star.addEventListener('mouseenter', function() {
                const valor = parseInt(this.getAttribute('data-value'));
                stars.forEach((s, i) => {
                    if (i < valor) {
                        s.textContent = '★';
                        s.style.color = '#ffb703';
                    } else {
                        s.textContent = '☆';
                        s.style.color = '#ccc';
                    }
                });
            });
            
            star.addEventListener('mouseleave', function() {
                const media = avaliacoes.length > 0 ? 
                    avaliacoes.reduce((a,b) => a+b, 0) / avaliacoes.length : 0;
                const mediaInt = Math.round(media);
                stars.forEach((s, i) => {
                    if (i < mediaInt) {
                        s.textContent = '★';
                        s.style.color = '#ffb703';
                    } else {
                        s.textContent = '☆';
                        s.style.color = '#ccc';
                    }
                });
            });
        });
    }

    // ==================== NEWSLETTER ====================
    const newsletterBtn = document.getElementById('newsletterBtn');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterFeedback = document.getElementById('newsletterFeedback');
    
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const email = newsletterEmail ? newsletterEmail.value.trim() : '';
            
            if (email === '') {
                if (newsletterFeedback) {
                    newsletterFeedback.textContent = '⚠️ Digite um e-mail válido!';
                    newsletterFeedback.style.color = '#e63946';
                }
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                if (newsletterFeedback) {
                    newsletterFeedback.textContent = '⚠️ E-mail inválido! Use exemplo@email.com';
                    newsletterFeedback.style.color = '#e63946';
                }
                return;
            }
            
            // Salvar e-mail no localStorage
            let emails = JSON.parse(localStorage.getItem('newsletterEmails')) || [];
            if (!emails.includes(email)) {
                emails.push(email);
                localStorage.setItem('newsletterEmails', JSON.stringify(emails));
                
                if (newsletterFeedback) {
                    newsletterFeedback.textContent = '✅ Inscrito com sucesso! Você receberá nossas novidades.';
                    newsletterFeedback.style.color = '#2d6a4f';
                }
                if (newsletterEmail) newsletterEmail.value = '';
            } else {
                if (newsletterFeedback) {
                    newsletterFeedback.textContent = 'ℹ️ Este e-mail já está inscrito!';
                    newsletterFeedback.style.color = '#ffb703';
                }
            }
        });
    }

    // ==================== BOTÃO VOLTAR AO TOPO ====================
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== SMOOTH SCROLL PARA LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== CARREGAR DADOS SALVOS ====================
    // Carregar nome do usuário se já tiver certificado
    const nomeSalvo = localStorage.getItem('nomeUsuario');
    if (nomeSalvo && nomeInput) {
        nomeInput.value = nomeSalvo;
    }
    
    // Verificar se já gerou certificado antes
    const certificadoJaGerado = localStorage.getItem('certificadoGerado');
    if (certificadoJaGerado === 'true' && btnGerar) {
        const nomeAntigo = localStorage.getItem('nomeUsuario');
        if (nomeAntigo && nomeCertificado) nomeCertificado.textContent = nomeAntigo;
        
        const dataAntiga = localStorage.getItem('dataCertificado');
        if (dataAntiga && dataCertificado) dataCertificado.textContent = `Emitido em: ${dataAntiga}`;
        
        if (preview) preview.style.display = 'block';
        certificadoGerado = true;
        btnGerar.disabled = true;
        btnGerar.textContent = '✅ Certificado Gerado ✅';
    }

    // ==================== DATA ATUAL NO FOOTER (OPCIONAL) ====================
    const anoAtual = new Date().getFullYear();
    const footerAno = document.querySelector('.footer-ano');
    if (footerAno) {
        footerAno.textContent = anoAtual;
    }

    console.log('✅ JavaScript carregado com sucesso!');
    console.log('📊 Estatísticas:', {
        visitas: visitas,
        quizCompletado: localStorage.getItem('quizCompletado'),
        totalAvaliacoes: avaliacoes.length
    });
});

// ==================== FUNÇÃO PARA MOSTRAR DETALHES DA TRADIÇÃO ====================
function showTraditionDetail(titulo, icone, descricao) {
    // Criar modal dinamicamente
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '10001';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.borderRadius = '20px';
    modalContent.style.padding = '30px';
    modalContent.style.maxWidth = '500px';
    modalContent.style.width = '90%';
    modalContent.style.textAlign = 'center';
    modalContent.style.position = 'relative';
    
    modalContent.innerHTML = `
        <span style="position: absolute; top: 15px; right: 20px; font-size: 2rem; cursor: pointer; color: #999;">&times;</span>
        <div style="font-size: 4rem;">${icone}</div>
        <h2 style="color: #2d6a4f; margin: 15px 0;">${titulo}</h2>
        <p style="color: #4a4e69; line-height: 1.6;">${descricao}</p>
        <button style="margin-top: 20px; padding: 10px 25px; background: #2d6a4f; color: white; border: none; border-radius: 25px; cursor: pointer;">Fechar</button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Fechar modal
    const closeBtn = modalContent.querySelector('span');
    const closeButton = modalContent.querySelector('button');
    
    const fecharModal = () => {
        modal.remove();
    };
    
    closeBtn.onclick = fecharModal;
    closeButton.onclick = fecharModal;
    modal.onclick = (e) => {
        if (e.target === modal) fecharModal();
    };
}

// ==================== FUNÇÃO PARA ANIMAR IMPACTO ====================
function animateImpacto(elemento) {
    const numeroElemento = elemento.querySelector('.counter');
    if (numeroElemento && !numeroElemento.hasAttribute('data-animado')) {
        const alvo = parseInt(numeroElemento.getAttribute('data-target'));
        let atual = 0;
        const incremento = alvo / 30;
        
        const intervalo = setInterval(() => {
            atual += incremento;
            if (atual >= alvo) {
                numeroElemento.textContent = alvo + (numeroElemento.textContent.includes('%') ? '%' : '');
                clearInterval(intervalo);
            } else {
                numeroElemento.textContent = Math.floor(atual) + (numeroElemento.textContent.includes('%') ? '%' : '');
            }
        }, 30);
        
        numeroElemento.setAttribute('data-animado', 'true');
    }
}

// ==================== EXPORTAR FUNÇÕES GLOBAIS ====================
window.showTraditionDetail = showTraditionDetail;
window.animateImpacto = animateImpacto;