import { useState } from "react";
import { Link, Navigate } from "react-router";
import "../styles/Login.css";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const SERVER_URL = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (data.errors) {
        return setError(data.errors[0].msg);
      }
      login({ token: data.token, username: data.username });
      setError(null);
      return <Navigate to="/" replace />;
    } catch (err) {
      return setError(err.message);
    }
  }

  // If user exists then navigate to home
  if (user) return <Navigate to="/" replace={true} />;

  return (
    <div className="container">
      <form
        className="login__form-container"
        spellCheck="false"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            name="email"
            placeholder="name@email.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p className="login__error-element">{error}</p>}
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/auth/sign-up">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
