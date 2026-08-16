import { Link } from "react-router";
import "../styles/SignUp.css";
import { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, email, password, confirmPassword);
  }

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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link href="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
