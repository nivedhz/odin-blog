import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";

const Home = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
};

export default Home;
