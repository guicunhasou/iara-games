const dados = document.querySelector('#dados');
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const simularCadastro = document.querySelector('#simularCadastro');
const mensagem = document.querySelector('#mensagem-formulario');

function exibirMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo ? `mensagem-formulario ${tipo}` : 'mensagem-formulario';
}

dados.addEventListener('input', () => exibirMensagem(''));

dados.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter' && !evento.isComposing && (evento.target === nome || evento.target === email)) {
    evento.preventDefault();
    simularCadastro.click();
  }
});

simularCadastro.addEventListener('click', () => {
  if (!nome.reportValidity() || !email.reportValidity()) {
    exibirMensagem('Confira o nome e o e-mail fictícios.', 'erro');
    return;
  }

  if (nome.value.trim().length < 2) {
    exibirMensagem('Informe um nome fictício com pelo menos dois caracteres.', 'erro');
    nome.focus();
    return;
  }

  nome.value = '';
  email.value = '';
  exibirMensagem('Simulação concluída. Nenhuma conta foi criada.', 'sucesso');
});

dados.disabled = false;
exibirMensagem('');
