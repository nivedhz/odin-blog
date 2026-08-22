import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (response.status === 401) {
        logout();
        return <Navigate to="/auth/login" />;
      }

      const result = await response.json();
      setData(result);
    };
    fetchPosts();
  }, [user?.token, logout]);
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-full p-4">
      <div className="flex gap-2 items-center justify-end">
        <Button
          className={"font-bold p-4 cursor-pointer flex items-center"}
          onClick={() => {
            navigate("/post/new");
          }}
        >
          <Plus />
          New Post
        </Button>
      </div>
      <div className="">
        {data.map((item) => {
          return (
            <div className="" key={item.id}>
              <h1>{item.title}</h1>
              <p>{item.content}</p>
              <p>Author: {item.author.username}</p>
              <p>{new Date(item.createdAt).toLocaleString()}</p>
              <p>published: {item.publishStatus.toString()}</p>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
