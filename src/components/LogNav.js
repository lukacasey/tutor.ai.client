import logo from "../img/logo.PNG";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";

export default function LogNav() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <>
      <nav className="nav">
        <div>
          <a href="/account">
            <img className="navlogo" alt="logo" src={logo} />
          </a>
        </div>
        <div className="nav-account-container">
          <a href="/account">
            {/* {user && <div className="email">{user.email}</div>} */}
            <button href="/account" className="account-icon">
              &Sigma;
            </button>
          </a>
          <div>
            <button onClick={handleClick} className="login-btn" href="/">
              Log Out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
