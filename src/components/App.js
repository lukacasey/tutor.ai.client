import Signup from "../components/Signup/Signup.js";
import Login from "../components/Login/Login.js";
import Tutor from "../components/tutor-ai/Tutor.js";
import Account from "../components/Account/Account.js";
import History from "../components/History/History.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.js";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!user ? <Signup /> : <Navigate to="/account" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/account" />}
        />

        <Route path="/tutor">
          <Route
            path=":subject"
            element={user ? <Tutor /> : <Navigate to="/" />}
          />
        </Route>

        <Route path="/history">
          <Route
            path=":subject"
            element={user ? <History /> : <Navigate to="/" />}
          />
        </Route>

        <Route
          path="/account"
          element={user ? <Account /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
