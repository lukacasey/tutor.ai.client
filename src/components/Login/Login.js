import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import logo from "../../img/logo.PNG";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <>
      <nav className="nav">
        <img className="navlogo" alt="logo" src={logo} />
        <a className="login-btn" href="/">
          Back
        </a>
      </nav>
      <div className="login-wrapper">
        <div className="login-form-container">
          <h2>
            Log in to <b style={{ color: "#c678dd" }}>tutor.ai</b>
          </h2>
          <form onSubmit={handleSubmit}>
            <p>Email</p>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder=""
            />

            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder=""
            />

            <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
}
