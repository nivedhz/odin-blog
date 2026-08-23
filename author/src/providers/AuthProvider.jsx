import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center dark bg-background">
        <LoadingSpinner loading={loading} />
      </div>
    );
  }

  return (
    <AuthContext value={{ user, loading, login, logout, setLoading }}>
      {children}
    </AuthContext>
  );
}
