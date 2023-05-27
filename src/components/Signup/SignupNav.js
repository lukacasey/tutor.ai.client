import "../../styles/SignupNav.css";
import logo from "../../img/logo.PNG";

export default function SignupNav() {
  return (
    <>
      <nav className="nav">
        <img className="navlogo" alt="logo" src={logo} />
        <a
          className="login-btn"
          href="/login"
        >
          Log In
        </a>
      </nav>
    </>
  );
}
