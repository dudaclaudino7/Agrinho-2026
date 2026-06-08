function mostrar(card){

const info =
card.querySelector(".info");

if(info.style.display === "block"){

info.style.display = "none";

}else{

info.style.display = "block";

}

}

function responder(correta){

const resultado =
document.getElementById("resultado");

const certificado =
document.getElementById("certificado");

if(correta){

resultado.innerHTML =
"✅ Correto! O milho é um símbolo das Festas Juninas.";

resultado.style.color =
"green";

certificado.style.display =
"block";

}else{

resultado.innerHTML =
"❌ Resposta incorreta. Tente novamente.";

resultado.style.color =
"red";

}

}