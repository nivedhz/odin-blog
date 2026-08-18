import { Link, Navigate } from "react-router";
import "../styles/SignUp.css";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const SignUp = () => {
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function checkFormResponse(formData) {
    if (!formData.username.trim()) {
      setError("Please enter a valid username");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Please enter a valid email");
      return false;
    }
    if (formData.username.length < 3) {
      setError("Username should be more than 3 characters");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Please enter a password");
      return false;
    }
    if (formData.password.trim().length < 8) {
      setError("Password must be atleast 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("The passwords don't match");
      return false;
    }
    setError(null);
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (checkFormResponse(formData)) {
      try {
        const response = await fetch("http://localhost:3000/auth/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
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
    } else {
      return;
    }
  }

  // If user exists then navigate to home
  if (user) return <Navigate to="/" replace />;

  return (
    <div className="container">
      <form
        className="sign-up__form-container"
        spellCheck="false"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">
          Username
          <input
            id="username"
            type="text"
            name="username"
            placeholder="name"
            autoComplete="name"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
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
        <label htmlFor="confirm-password">
          Confirm Password
          <input
            id="confirm-password"
            type="password"
            name="confirmPassword"
            placeholder="********"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        {error && <p className="sign-up__error-element">{error}</p>}
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
