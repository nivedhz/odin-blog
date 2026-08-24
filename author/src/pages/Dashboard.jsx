import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import PostCard from "@/components/PostCard";
import { useScroll } from "@/hooks/useScroll";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { user, logout } = useAuth();
  const { postRef, draftRef, publishRef } = useScroll();
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

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/posts/delete/${postId}`,
        {
          method: "DELETE",
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
      setData(result.posts);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <title>Blogo | Dashboard</title>
      <div className="dark px-25 py-10">
        <div className="flex flex-col gap-5">
          <div
            className={cn(
              "flex justify-between items-center transition-all duration-500 ease-out",
              {
                "opacity-100 translate-y-0": loaded,
                "opacity-0 translate-y-10": !loaded,
              },
            )}
          >
            <h1 className="text-2xl font-semibold" id="posts" ref={postRef}>
              All posts
            </h1>
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
              "p-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 transition-all duration-500 ease-out delay-100",
              {
                "opacity-100 translate-y-0": loaded,
                "opacity-0 translate-y-10": !loaded,
              },
            )}
          >
            {data.map((item) => {
              return (
                <PostCard
                  item={item}
                  handleDelete={handleDelete}
                  key={item.id}
                />
              );
            })}
          </div>
          <div className="">
            <div
              className={cn(
                "flex justify-between items-center transition-all duration-500 ease-out delay-150",
                {
                  "opacity-100 translate-y-0": loaded,
                  "opacity-0 translate-y-10": !loaded,
                },
              )}
            >
              <h1
                className="text-2xl font-semibold"
                id="publishes"
                ref={publishRef}
              >
                Publishes
              </h1>
            </div>
            <div
              className={cn(
                "p-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 transition-all duration-500 ease-out delay-200",
                {
                  "opacity-100 translate-y-0": loaded,
                  "opacity-0 translate-y-10": !loaded,
                },
              )}
            >
              {data
                .filter((item) => item.publishStatus)
                .map((item) => {
                  return (
                    <PostCard
                      item={item}
                      handleDelete={handleDelete}
                      key={item.id}
                    />
                  );
                })}
            </div>
          </div>
          <div className="">
            <div
              className={cn(
                "flex justify-between items-center transition-all duration-500 ease-out delay-250",
                {
                  "opacity-100 translate-y-0": loaded,
                  "opacity-0 translate-y-10": !loaded,
                },
              )}
            >
              <h1 className="text-2xl font-semibold" id="drafts" ref={draftRef}>
                Drafts
              </h1>
            </div>
            <div
              className={cn(
                "p-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 transition-all duration-500 ease-out delay-300",
                {
                  "opacity-100 translate-y-0": loaded,
                  "opacity-0 translate-y-10": !loaded,
                },
              )}
            >
              {data
                .filter((item) => !item.publishStatus)
                .map((item) => {
                  return (
                    <PostCard
                      item={item}
                      handleDelete={handleDelete}
                      key={item.id}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
