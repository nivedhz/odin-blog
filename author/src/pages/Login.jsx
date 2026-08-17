import { useState } from "react";
import { Link } from "react-router";
import "../styles/Login.css";

const Login = () => {
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
      const response = await fetch("http://localhost:3000/auth/login", {
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
      console.log(data);
      if (data.errors) {
        return setError(data.errors[0].msg);
      }
      return setError(null);
    } catch (err) {
      return setError(err.message);
    }
  }
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
