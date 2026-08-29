import { Link, Navigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
        const SERVER_URL = import.meta.env.VITE_SERVER_URL;
        const response = await fetch(`${SERVER_URL}/reader/auth/sign-up`, {
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
        if (data.errors.length > 0 || !data.success) {
          return setError(data.errors ? data.errors[0].msg : data.message);
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
    <>
      <title>Blogo | Sign Up</title>
      <div className="bg-background dark flex justify-center items-center min-h-screen text-white">
        <Card className={"w-full max-w-sm"}>
          <CardHeader>
            <CardTitle>Sign up for an account</CardTitle>
            <CardDescription>
              Enter you details below to sign up
            </CardDescription>
            <CardAction>
              <Link to="/auth/login">
                <Button variant="link" className={"cursor-pointer"}>
                  Login
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
              spellCheck="false"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="name"
                  autoComplete="name"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@email.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="text-red-500 font-light">{error}</p>}
              <div className="flex gap-2 justify-end">
                <Link to="/">
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    className={"cursor-pointer"}
                  >
                    Go back
                  </Button>
                </Link>
                <Button type="submit" size="lg" className={"cursor-pointer"}>
                  Sign Up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignUp;
