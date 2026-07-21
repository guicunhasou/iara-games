import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Logo from '../assets/logo.svg';
import { auth } from '../services/firebase';
import './cadastro.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [popup, setPopup] = useState({ mensagem: '', tipo: '' });

  const mostrarPopup = (mensagem, tipo) => {
    setPopup({ mensagem, tipo });
    window.setTimeout(() => setPopup({ mensagem: '', tipo: '' }), 3000);
  };

  const handleLogin = async (evento) => {
    evento.preventDefault();
    setCarregando(true);

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      mostrarPopup('Login realizado com sucesso!', 'sucesso');
      setEmail('');
      setSenha('');
    } catch (error) {
      const credenciaisInvalidas = [
        'auth/invalid-credential',
        'auth/user-not-found',
        'auth/wrong-password',
      ].includes(error.code);

      mostrarPopup(
        credenciaisInvalidas ? 'E-mail ou senha incorretos.' : 'Não foi possível realizar o login.',
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
          <Link className="perfil" to="/" aria-label="Entrar na conta">
            <i className="fa-solid fa-circle-user" aria-hidden="true"></i>
          </Link>
        </nav>
      </header>

      <main id="conteudo-principal">
        <div className="container">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label className="visually-hidden" htmlFor="email-login">E-mail</label>
              <input
                id="email-login"
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
              <label className="visually-hidden" htmlFor="senha-login">Senha</label>
              <input
                id="senha-login"
                name="senha"
                type={mostrarSenha ? 'text' : 'password'}
                className="form-control"
                placeholder="Senha"
                autoComplete="current-password"
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

            <button type="submit" className="botao" disabled={carregando}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {popup.mensagem && (
            <div
              className={`popup ${popup.tipo}`}
              role={popup.tipo === 'erro' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {popup.mensagem}
            </div>
          )}

          <p className="cadastro-link">
            Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
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

export default Login;
