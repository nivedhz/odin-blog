import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setLoaded(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/posts`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.status === 401) {
          logout();
          return <Navigate to="/auth/login" replace />;
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [logout, user?.token]);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="dark px-25 py-10">
      <div className="">
        <div
          className={cn(
            "flex justify-between items-center transition-all duration-500 ease-out",
            {
              "opacity-100 translate-y-0": loaded,
              "opacity-0 translate-y-10": !loaded,
            },
          )}
        >
          <h1 className="text-2xl font-semibold">All posts</h1>
          <Button
            onClick={() => {
              navigate("/post/new");
            }}
            className={"cursor-pointer"}
            title="New Post"
          >
            <Plus />
            New post
          </Button>
        </div>
        <div
          className={cn(
            "p-5 grid grid-cols-2 gap-4 transition-all duration-500 ease-out delay-100",
            {
              "opacity-100 translate-y-0": loaded,
              "opacity-0 translate-y-10": !loaded,
            },
          )}
        >
          {data.map((item) => {
            return (
              <Card
                className="flex flex-col min-w-lg overflow-hidden"
                key={item.id}
              >
                <CardHeader className="px-4 py-2 flex overflow-hidden max-w-xl text-wrap">
                  <CardTitle className="font-bold text-xl wrap-anywhere max-h-8">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <hr />
                <CardDescription className="px-4 max-h-32 overflow-hidden wrap-anywhere max-w-xl text-wrap">
                  {item.content}
                </CardDescription>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
