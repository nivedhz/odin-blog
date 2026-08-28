import { useState } from "react";
import { Link, Navigate } from "react-router";
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
      const response = await fetch(`${SERVER_URL}/reader/auth/login`, {
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
    <>
      <title>Blogo | Login</title>
      <div className="bg-background dark flex justify-center items-center min-h-screen text-white">
        <Card className={"w-full max-w-sm"}>
          <CardHeader>
            <CardTitle>Login in to your account</CardTitle>
            <CardDescription>Enter your email below to login</CardDescription>
            <CardAction>
              <Link to="/auth/sign-up">
                <Button variant="link" className={"cursor-pointer"}>
                  Sign Up
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-4"
              spellCheck="false"
              onSubmit={handleSubmit}
            >
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
                <Button type="submit" className={"cursor-pointer"} size="lg">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
