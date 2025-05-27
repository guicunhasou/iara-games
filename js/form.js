const btnConta = document.querySelector('#criarConta')
btnConta.addEventListener('click', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos corretamente!');
        return;
    }

    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido!');
        return;
    }

    alert('Você realizou seu cadastro!');
});

