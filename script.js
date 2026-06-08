// ====================================
// QUIZ
// ====================================

function responder(correta){

    const resultado =
    document.getElementById("resultado");

    const certificado =
    document.getElementById("certificado");

    if(correta){

        resultado.innerHTML =
        "✅ Correto! O milho é um dos principais símbolos das Festas Juninas.";

        resultado.style.color =
        "#2e7d32";

        certificado.style.display =
        "block";

        certificado.scrollIntoView({
            behavior:"smooth"
        });

        localStorage.setItem(
            "quizConcluido",
            "true"
        );

    }else{

        resultado.innerHTML =
        "❌ Resposta incorreta. Tente novamente.";

        resultado.style.color =
        "#d32f2f";

    }

}

// ====================================
// BOAS-VINDAS
// ====================================

window.addEventListener("load",()=>{

    document.body.style.opacity =
    "0";

    setTimeout(()=>{

        document.body.style.transition =
        "opacity 1s";

        document.body.style.opacity =
        "1";

    },100);

});

// ====================================
// MENSAGEM INICIAL
// ====================================

setTimeout(()=>{

    const visitou =
    localStorage.getItem(
        "visitouSite"
    );

    if(!visitou){

        alert(
            "🌱 Bem-vindo ao projeto Raízes da Cultura! Explore o conteúdo e descubra como a agricultura contribui para a cultura brasileira."
        );

        localStorage.setItem(
            "visitouSite",
            "true"
        );

    }

},1000);

// ====================================
// BOTÃO VOLTAR AO TOPO
// ====================================

const botaoTopo =
document.getElementById("topo");

if(botaoTopo){

    botaoTopo.addEventListener(
        "click",
        ()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }
    );

}

// ====================================
// ANIMAÇÃO DOS CARDS
// ====================================

const cards =
document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener(
        "mouseenter",
        ()=>{

            card.style.transform =
            "translateY(-8px)";

        }
    );

    card.addEventListener(
        "mouseleave",
        ()=>{

            card.style.transform =
            "translateY(0px)";

        }
    );

});

// ====================================
// CERTIFICADO SALVO
// ====================================

window.addEventListener(
"load",
()=>{

    const certificado =
    document.getElementById(
        "certificado"
    );

    const quizConcluido =
    localStorage.getItem(
        "quizConcluido"
    );

    if(
        quizConcluido === "true"
    ){

        certificado.style.display =
        "block";

    }

});

// ====================================
// DATA AUTOMÁTICA
// ====================================

const dataAtual =
new Date();

const rodape =
document.querySelector("footer");

if(rodape){

    const ano =
    document.createElement("p");

    ano.innerHTML =
    "© " +
    dataAtual.getFullYear();

    rodape.appendChild(ano);

}