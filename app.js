// Função para exibir texto em um elemento HTML específico
function exibeTextoNaTela(tag, texto) {
    let campoSelecionado = document.querySelector(tag);
    campoSelecionado.innerHTML = texto;
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
    const mensagemBoasVindas = "Seja bem vindo, ao jogo do número secreto!";
    const escolhaFrase = `Escolha um número entre 1 e ${numeroLimite}`;

    // Converte texto em áudio
    setTimeout(function() {
        responsiveVoice.speak(mensagemBoasVindas, "Brazilian Portuguese Female", {rate:1.2});
        setTimeout(function() {
            responsiveVoice.speak(escolhaFrase, "Brazilian Portuguese Female", {rate:1.2});
        }, 1000);
    }, 1000);
    
    // Exibe mensagens na tela
    exibeTextoNaTela("h1", "Jogo do Número Secreto");
    exibeTextoNaTela("p", escolhaFrase);
}

// Função para gerar um número aleatório único dentro do limite definido
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite +1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        // Reinicia a lista caso todos os números já tenham sido sorteados
        listaDeNumerosSorteados = [];

    } else if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // Caso o número já tenha sido escolhido chama novamente a função
        return gerarNumeroAleatorio();

    } else {
        // Adiciona o número escolhido a lista é retorna o valor dele
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

// Função para limpar o campo de entrada do usuário
function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    document.getElementById("reiniciar").setAttribute("disabled", true);
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
}

// Função para verificar se o chute do usuário está correto
function verificarChute() {
    let chute = parseInt(document.querySelector("input").value);

    if (isNaN(chute) || chute < 1 || chute > numeroLimite) {
        let mensagemDeNumeroMaximo = `Por favor, insira um número entre 1 e ${numeroLimite}.`;
        responsiveVoice.speak(mensagemDeNumeroMaximo, "Brazilian Portuguese Female", {rate:1.2});
        exibeTextoNaTela("p", mensagemDeNumeroMaximo);
        return;

    } else if (chute === numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você acertou! Após ${tentativas} ${palavraTentativa}. O número secreto é ${numeroSecreto}.`;

        exibeTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
        responsiveVoice.speak("Parabéns, você acertou!", "Brazilian Portuguese Female", {rate:1.2});

    } else {
        if (chute > numeroSecreto) {
            exibeTextoNaTela("p", "O número secreto é menor!");
            responsiveVoice.speak("O número secreto é menor!", "Brazilian Portuguese Female", {rate:1.2});

        } else {
            exibeTextoNaTela("p", "O número secreto é maior!");
            responsiveVoice.speak("O número secreto é maior!", "Brazilian Portuguese Female", {rate:1.2});
        }

        tentativas++;
        limparCampo();
    }
}

// Variáveis globais
var numeroLimite = 100;
var listaDeNumerosSorteados = [];
var numeroSecreto = gerarNumeroAleatorio();
var tentativas = 1;

// Inicializa o jogo
exibirMensagemInicial();

