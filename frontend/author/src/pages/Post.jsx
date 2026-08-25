import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router";
import { cn } from "../lib/utils.js";
import { useAuth } from "@/hooks/useAuth";
import { ButtonGroup } from "@/components/ui/button-group.jsx";
import LoadingSpinner from "@/components/LoadingSpinner.jsx";

const Post = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (data === null || loading || error) return;
    const animationFrame = requestAnimationFrame(() => {
      setLoaded(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [data, loading, error]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/posts/${postId}`,
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
          return;
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [logout, postId, user?.token]);

  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (loading) {
    return (
      <div className="min-h-180 flex justify-center items-center dark bg-background">
        <LoadingSpinner loading={loading} />
      </div>
    );
  }
  return (
    <div className="min-h-180 px-25 py-10">
      <div
        className={cn(
          "flex justify-between items-center transition-all duration-500 ease-out",
          {
            "opacity-100 translate-y-0": loaded,
            "opacity-0 translate-y-10": !loaded,
          },
        )}
      >
        <h1 className="text-4xl font-bold max-w-full text-wrap wrap-anywhere">
          {data?.title}
        </h1>
        <ButtonGroup>
          <Button
            className={"cursor-pointer"}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <ArrowLeft />
            Go to Dashboard
          </Button>
          <Button className={"px-5 cursor-pointer"}>
            <Edit />
            Edit
          </Button>
        </ButtonGroup>
      </div>
      <div
        className={cn(
          "px-4 py-4 max-w-full text-wrap wrap-anywhere transition-all duration-500 ease-out delay-50",
          {
            "opacity-100 translate-y-0": loaded,
            "opacity-0 translate-y-10": !loaded,
          },
        )}
      >
        {data?.content}
      </div>
    </div>
  );
};

export default Post;
