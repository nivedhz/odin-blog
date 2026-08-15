import { Link } from "react-router";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar__container">
      <Link href="/" className="navbar__heading">
        Blogo
      </Link>
      <div className="navbar__link-container">
        <Link className="navbar__login-btn" to="/auth/login">
          Login
        </Link>
        <Link className="navbar__signup-btn" to="/auth/sign-up">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
