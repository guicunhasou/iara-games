const formulario = document.querySelector('#dados');
const mensagemFormulario = document.querySelector('#mensagem-formulario');

function exibirMensagem(mensagem, tipo) {
  mensagemFormulario.textContent = mensagem;
  mensagemFormulario.className = `mensagem-formulario ${tipo}`;
}

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();

  if (!formulario.checkValidity()) {
    formulario.reportValidity();
    return;
  }

  const nome = formulario.elements.nome.value.trim();
  const email = formulario.elements.email.value.trim();
  const senha = formulario.elements.senha.value;

  if (!nome || !email || !senha) {
    exibirMensagem('Preencha todos os campos para continuar.', 'erro');
    return;
  }

  exibirMensagem('Cadastro validado com sucesso!', 'sucesso');
  formulario.reset();
});
