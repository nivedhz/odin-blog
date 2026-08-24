import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Newspaper, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import PostCard from "@/components/PostCard";
import { useScroll } from "@/hooks/useScroll";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { postRef, draftRef, publishRef } = useScroll();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (data === null || loading) return;
    const animationFrame = requestAnimationFrame(() => {
      setLoaded(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [data, loading]);
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
          return;
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [logout, user?.token]);

  const handleDelete = async (postId) => {
    try {
      setLoading(true);
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
        return;
      }
      const result = await response.json();
      setData(result.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <title>Blogo | Dashboard</title>
      {data === null || loading ? (
        <div className="min-h-180 flex justify-center items-center dark bg-background">
          <LoadingSpinner loading={data === null || loading} />
        </div>
      ) : data.length === 0 ? (
        <Empty className={"py-50"}>
          <EmptyHeader>
            <EmptyMedia
              variant="icon"
              className={cn("transition-all duration-500 ease-out", {
                "opacity-100 translate-y-0": loaded,
                "opacity-0 translate-y-10": !loaded,
              })}
            >
              <Newspaper />
            </EmptyMedia>
            <EmptyTitle
              className={cn("transition-all duration-500 ease-out delay-50", {
                "opacity-100 translate-y-0": loaded,
                "opacity-0 translate-y-10": !loaded,
              })}
            >
              No Posts Yet
            </EmptyTitle>
            <EmptyDescription
              className={cn("transition-all duration-500 ease-out delay-100", {
                "opacity-100 translate-y-0": loaded,
                "opacity-0 translate-y-10": !loaded,
              })}
            >
              You haven&apos;t created any posts yet. Get started by creating
              your first post.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button
              className={cn(
                "transition-all duration-500 ease-out delay-150 cursor-pointer",
                {
                  "opacity-100 translate-y-0": loaded,
                  "opacity-0 translate-y-10": !loaded,
                },
              )}
              onClick={() => {
                navigate("/post/new");
              }}
            >
              Create Post
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
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
                <h1
                  className="text-2xl font-semibold"
                  id="drafts"
                  ref={draftRef}
                >
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
      )}
    </>
  );
};

export default Dashboard;
