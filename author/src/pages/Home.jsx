import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";
import { Navigate, useNavigate } from "react-router";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  return (
    <div className="min-h-full min-w-screen p-4">
      <div className="flex gap-2 items-center justify-end">
        <Button
          className={"font-bold p-4 cursor-pointer flex items-center"}
          onClick={() => {
            navigate("/post/new");
          }}
        >
          <Plus></Plus>
          New Post
        </Button>
      </div>
    </div>
  );
};

export default Home;
