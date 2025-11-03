import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo.svg";
import "./cadastro.css"; 
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState({ mensagem: "", tipo: "" });

  const mostrarPopup = (mensagem, tipo) => {
    setPopup({ mensagem, tipo });
    setTimeout(() => setPopup({ mensagem: "", tipo: "" }), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      mostrarPopup("Login realizado com sucesso!", "sucesso");
      setEmail("");
      setSenha("");
    } catch (error) {
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        mostrarPopup("Email ou senha incorretos.", "erro");
      } else {
        mostrarPopup("Erro ao realizar login.", "erro");
      }
    }
  };

  return (
    <div>
    <header>
            <nav>
            <Link className="logo" to="/"><img src={Logo} alt="Logo" /></Link>
            <ul className="menu">
                <li className="inativo"><Link to="#">Loja</Link></li>
                <li className="inativo"><Link to="#">Biblioteca</Link></li>
                <li className="inativo"><Link to="#">Fórum</Link></li>
                <li className="inativo"><Link to="#">Suporte</Link></li>
            </ul>
            <Link className="perfil" to="/login"><i className="fa-solid fa-circle-user"></i></Link>
            </nav>
          </header>

      <main>
        <div className="container">
          <h2>LOGIN</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>

         <button type="submit" className="botao">Entrar</button>
          </form>

          {popup.mensagem && (
            <div className={`popup ${popup.tipo}`}>
              {popup.mensagem}
            </div>
          )}

        <p className="cadastro-link">
        Ainda não tem conta? <Link to="/">Cadastre-se</Link>
        </p>

        </div>
      </main>
            <footer>
        <div className="decoracao"></div>
        <div className="footer d-flex flex-column gap-3">
          <ul className="icones d-flex list-unstyled justify-content-end gap-3">
            <li><a href="https://www.facebook.com" target="_blank"><i className="fa-brands fa-facebook icon"></i></a></li>
            <li><a href="https://x.com" target="_blank"><i className="fa-brands fa-x-twitter icon"></i></a></li>
            <li><a href="https://www.youtube.com.br" target="_blank"><i className="fa-brands fa-youtube icon"></i></a></li>
          </ul>

          <div className="linha"></div>

          <ul className="links list-unstyled d-flex justify-content-around text-center mb-3">
            <li><a href="#">Trabalhe conosco</a></li>
            <li><a href="#">Sobre nós</a></li>
            <li><a href="#">Parceiros</a></li>
            <li><a href="#">Termos de uso</a></li>
            <li><a href="#">Política de privacidade</a></li>
          </ul>

          <div className="linha"></div>

          <div className="informacoes row d-flex justify-content-between">
            <p className="legal">
              © 2025, Iara Games. Todos os direitos reservados. Iara Games e o logotipo da Iara Games são marcas comerciais ou registradas da Iara Games no Brasil e em outros países.
            </p>
            <div className="contato-botao col-md-4 text-end d-flex flex-column justify-content-between align-items-center">
              <p className="contato">
                Entre em contato: <a href="#">iaragamesoficial@gmail.com</a>
              </p>
          <a className="botao text-uppercase text-decoration-none text-center" href="#top">
            Voltar ao topo
          </a>

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
