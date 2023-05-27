import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

import robot from "../../img/ai-robot.png";
import "../../styles/SignupMain.css";

export default function SignupMain() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <div className="SignupMainContainer">
      <div className="robot-img-container">
        <img className="robot-img" alt="ai-robot" src={robot} />
      </div>

      <div className="signup-form-container">
        <h2>
          Unlock the Power of <b>AI</b> for{" "}
          <b style={{ color: "#c678dd" }}>Deep Learning</b> and{" "}
          <b>Personalized Studying</b>
        </h2>

        <form className="create-form" onSubmit={handleSubmit}>
          {/* <p>Name</p>
          <input type="text" placeholder="" /> */}

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

          <button disabled={isLoading}>Create Account</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
