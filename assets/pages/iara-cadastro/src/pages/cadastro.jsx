import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Logo from '../assets/logo.svg';
import { auth } from '../services/firebase';
import './cadastro.css';

function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [toast, setToast] = useState({ mensagem: '', tipo: '' });

  const mostrarToast = (mensagem, tipo) => {
    setToast({ mensagem, tipo });
    window.setTimeout(() => setToast({ mensagem: '', tipo: '' }), 3000);
  };

  const handleCadastro = async (evento) => {
    evento.preventDefault();

    if (senha !== confirmarSenha) {
      mostrarToast('As senhas não conferem.', 'erro');
      return;
    }

    setCarregando(true);

    try {
      const credencial = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(credencial.user, { displayName: nome.trim() });
      mostrarToast('Cadastro realizado com sucesso!', 'sucesso');
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
      window.setTimeout(() => navigate('/'), 1200);
    } catch (error) {
      mostrarToast(
        error.code === 'auth/email-already-in-use'
          ? 'Não foi possível usar este e-mail.'
          : 'Não foi possível criar a conta.',
        'erro',
      );
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div>
      <header>
        <nav aria-label="Menu principal">
          <Link className="logo" to="/" aria-label="Página de login da Iara Games">
            <img src={Logo} alt="Iara Games" />
          </Link>
          <ul className="menu">
            <li className="inativo"><span aria-disabled="true">Loja</span></li>
            <li className="inativo"><span aria-disabled="true">Biblioteca</span></li>
            <li className="inativo"><span aria-disabled="true">Fórum</span></li>
            <li className="inativo"><span aria-disabled="true">Suporte</span></li>
          </ul>
          <Link className="perfil" to="/" aria-label="Voltar ao login">
            <i className="fa-solid fa-circle-user" aria-hidden="true"></i>
          </Link>
        </nav>
      </header>

      <main id="conteudo-principal">
        <div className="container">
          <h1>Cadastre-se</h1>
          <form onSubmit={handleCadastro}>
            <div>
              <label className="visually-hidden" htmlFor="nome-cadastro">Nome de usuário</label>
              <input
                id="nome-cadastro"
                name="nome"
                type="text"
                className="form-control"
                placeholder="Nome de usuário"
                autoComplete="name"
                minLength={2}
                maxLength={50}
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                required
              />
            </div>

            <div>
              <label className="visually-hidden" htmlFor="email-cadastro">E-mail</label>
              <input
                id="email-cadastro"
                name="email"
                type="email"
                className="form-control"
                placeholder="E-mail"
                autoComplete="email"
                value={email}
                onChange={(evento) => setEmail(evento.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label className="visually-hidden" htmlFor="senha-cadastro">Senha</label>
              <input
                id="senha-cadastro"
                name="senha"
                type={mostrarSenha ? 'text' : 'password'}
                className="form-control"
                placeholder="Senha"
                autoComplete="new-password"
                minLength={8}
                maxLength={64}
                value={senha}
                onChange={(evento) => setSenha(evento.target.value)}
                required
              />
              <button
                className="eye-icon"
                type="button"
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                aria-pressed={mostrarSenha}
                onClick={() => setMostrarSenha((valorAtual) => !valorAtual)}
              >
                <FontAwesomeIcon icon={mostrarSenha ? faEyeSlash : faEye} aria-hidden="true" />
              </button>
            </div>

            <div className="input-group">
              <label className="visually-hidden" htmlFor="confirmacao-senha">Confirmar senha</label>
              <input
                id="confirmacao-senha"
                name="confirmacao-senha"
                type={mostrarConfirmacao ? 'text' : 'password'}
                className="form-control"
                placeholder="Confirmar senha"
                autoComplete="new-password"
                minLength={8}
                maxLength={64}
                value={confirmarSenha}
                onChange={(evento) => setConfirmarSenha(evento.target.value)}
                required
              />
              <button
                className="eye-icon"
                type="button"
                aria-label={mostrarConfirmacao ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'}
                aria-pressed={mostrarConfirmacao}
                onClick={() => setMostrarConfirmacao((valorAtual) => !valorAtual)}
              >
                <FontAwesomeIcon icon={mostrarConfirmacao ? faEyeSlash : faEye} aria-hidden="true" />
              </button>
            </div>

            <button type="submit" className="botao" disabled={carregando}>
              {carregando ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          {toast.mensagem && (
            <div
              className={`popup ${toast.tipo}`}
              role={toast.tipo === 'erro' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {toast.mensagem}
            </div>
          )}

          <p className="cadastro-link">
            Já tem uma conta? <Link to="/">Entrar</Link>
          </p>
        </div>
      </main>

      <footer>
        <div className="decoracao"></div>
        <div className="footer">
          <ul className="icones">
            <li>
              <a aria-label="Facebook (abre em nova aba)" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-facebook icon" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a aria-label="X (abre em nova aba)" href="https://x.com" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-x-twitter icon" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a aria-label="YouTube (abre em nova aba)" href="https://www.youtube.com.br" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-youtube icon" aria-hidden="true"></i>
              </a>
            </li>
          </ul>

          <div className="linha"></div>

          <ul className="links">
            <li><span aria-disabled="true">Trabalhe conosco</span></li>
            <li><span aria-disabled="true">Sobre nós</span></li>
            <li><span aria-disabled="true">Parceiros</span></li>
            <li><span aria-disabled="true">Termos de uso</span></li>
            <li><span aria-disabled="true">Política de privacidade</span></li>
          </ul>

          <div className="linha"></div>

          <div className="informacoes">
            <p className="legal">
              © 2025, Iara Games. Todos os direitos reservados. Iara Games e o logotipo da Iara Games são marcas comerciais ou registradas da Iara Games no Brasil e em outros países.
            </p>
            <div className="contato-botao">
              <p className="contato">
                Entre em contato: <a href="mailto:iaragamesoficial@gmail.com">iaragamesoficial@gmail.com</a>
              </p>
              <a className="botao" href="#top">Voltar ao topo</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Cadastro;
