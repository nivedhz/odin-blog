import { Link } from "react-router";
import "../styles/Navbar.css";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="navbar__container">
      <Link to="/" className="navbar__heading">
        Blogo
      </Link>
      {user ? (
        <div className="navbar__name-container">
          <p>@{user.username}</p>
          <button
            className="navbar__logout-btn"
            onClick={logout}
            title="Logout"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="navbar__link-container">
          <Link className="navbar__login-btn" to="/auth/login" title="Login">
            Login
          </Link>
          <Link
            className="navbar__signup-btn"
            to="/auth/sign-up"
            title="Sign Up"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
