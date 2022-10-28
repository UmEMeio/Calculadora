const previaOperacaoText = document.querySelector("#previous-operation");
const operacaoAtualText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculadora {
  constructor(previaOperacaoText, operacaoAtualText) {
    this.previaOperacaoText = previaOperacaoText;
    this.operacaoAtualText = operacaoAtualText;
    this.operacaoAtual = "";
  }

  // add digit to calculator screen
  addDigito(digito) {


    if (digito === "." && this.operacaoAtualText.innerText.includes(".")) {
      return;
    }

    this.operacaoAtual = digito;
    this.atualizarTela();
  }


  processaOperacao(operacao) {

    if (this.operacaoAtualText.innerText === "" && operacao !== "C") {

      if (this.previaOperacaoText.innerText !== "") {
        this.mudarOperacao(operacao);
      }
      return;
    }

    // Get current and previous values
    let valorOperacao;
    let previa = +this.previaOperacaoText.innerText.split(" ")[0];
    let atual = +this.operacaoAtualText.innerText;

    switch (operacao) {
      case "+":
        valorOperacao = previa + atual;
        this.atualizarTela(valorOperacao, operacao, atual, previa);
        break;
      case "-":
        valorOperacao = previa - atual;
        this.atualizarTela(valorOperacao, operacao, atual, previa);
        break;
      case "*":
        valorOperacao = previa * atual;
        this.atualizarTela(valorOperacao, operacao, atual, previa);
        break;
      case "/":
        valorOperacao = previa / atual;
        this.atualizarTela(valorOperacao, operacao, atual, previa);
        break;
      case "DEL":
        this.processaDelOperacao();
        break;
      case "CE":
        this.processaLimparAtualOperacao();
        break;
      case "C":
        this.processaLimparOperador();
        break;
      case "=":
        this.processaOperadorIgual();
        break;
      default:
        return;
    }
  }
  atualizarTela(
    valorOperacao = null,
    operacao = null,
    atual = null,
    previa = null
  ) {
    if (valorOperacao === null) {
      // Append number to current value
      this.operacaoAtualText.innerText += this.operacaoAtual;
    } else {

      if (previa === 0) {
        valorOperacao = atual;
      }

      this.previaOperacaoText.innerText = `${valorOperacao} ${operacao}`;
      this.operacaoAtualText.innerText = "";
    }
  }

  mudarOperacao(operacao) {
    const OperacoesMath = ["*", "-", "+", "/"];

    if (!OperacoesMath.includes(operacao)) {
      return;
    }

    this.previaOperacaoTextText.innerText =
      this.previaOperacaoTextText.innerText.slice(0, -1) + operacao;
  }


  processaDelOperacao() {
    this.operacaoAtualText.innerText =
      this.operacaoAtualText.innerText.slice(0, -1);
  }


  processaLimparAtualOperacao() {
    this.operacaoAtualText.innerText = "";
  }


  processaLimparOperador() {
    this.operacaoAtualText.innerText = "";
    this.previaOperacaoText.innerText = "";
  }

  processaOperadorIgual() {
    let operacao = this.previaOperacaoText.innerText.split(" ")[1];

    this.processaOperacao(operacao);
  }
}

const calc = new Calculadora(previaOperacaoText, operacaoAtualText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigito(value);
    } else {
      calc.processaOperacao(value);
    }
  });
});
