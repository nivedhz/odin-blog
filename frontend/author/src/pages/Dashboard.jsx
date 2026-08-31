import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import PostCard from "@/components/PostCard";
import { useScroll } from "@/hooks/useScroll";
import LoadingSpinner from "@/components/LoadingSpinner";
import NoPost from "./NoPost";
import ErrorElement from "#components/ErrorElement";
import EmptyPostElement from "#components/EmptyPostElement";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);
  const { user, logout } = useAuth();
  const { postRef, draftRef, publishRef } = useScroll();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [permission, setPermission] = useState(true);

  useEffect(() => {
    if (data === null || loading || error) return;
    const animationFrame = requestAnimationFrame(() => {
      setLoaded(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [data, loading, error]);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/author/post`,
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
        if (response.status === 403) {
          setPermission(false);
          return;
        }
        const result = await response.json();
        setData(result);
        setError(null);
        setPermission(true);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [logout, user?.token, reload, navigate]);

  const handleDelete = async (postId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/author/post/${postId}`,
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
      if (response.status === 403) {
        setPermission(false);
        return;
      }
      const result = await response.json();
      setData(result.posts);
      setError(null);
      setPermission(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePublish = async (postId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/author/post/${postId}/publish`,
        {
          method: "PATCH",
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
      if (response.status === 403) {
        setPermission(false);
        return;
      }
      const result = await response.json();
      setData(result.posts);
      setError(null);
      setPermission(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleUnpublish = async (postId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/author/post/${postId}/unpublish`,
        {
          method: "PATCH",
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
      if (response.status === 403) {
        setPermission(false);
        return;
      }
      const result = await response.json();
      setData(result.posts);
      setError(null);
      setPermission(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Navigate to="/" replace />;
  }
  if (!permission) {
    return <NoPost />;
  }
  return (
    <>
      <title>Blogo | Dashboard</title>
      {loading ? (
        <LoadingSpinner loading={data === null || loading} />
      ) : error ? (
        <ErrorElement error={error} setReload={setReload} />
      ) : data.length === 0 ? (
        <EmptyPostElement loaded={loaded} />
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
                    handlePublish={handlePublish}
                    handleUnpublish={handleUnpublish}
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
              <div>
                {data.filter((item) => item.publishStatus).length === 0 ? (
                  <h1
                    className={cn(
                      "text-2xl font-semibold text-center text-muted-foreground/60 transition-all duration-500 ease-out delay-200",
                      {
                        "opacity-100 translate-y-0": loaded,
                        "opacity-0 translate-y-10": !loaded,
                      },
                    )}
                  >
                    No Publishes
                  </h1>
                ) : (
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
                            handlePublish={handlePublish}
                            handleUnpublish={handleUnpublish}
                            key={item.id}
                          />
                        );
                      })}
                  </div>
                )}
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
              <div>
                {data.filter((item) => !item.publishStatus).length === 0 ? (
                  <h1
                    className={cn(
                      "text-2xl font-semibold text-center text-muted-foreground/60 transition-all duration-500 ease-out delay-300",
                      {
                        "opacity-100 translate-y-0": loaded,
                        "opacity-0 translate-y-10": !loaded,
                      },
                    )}
                  >
                    No Drafts
                  </h1>
                ) : (
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
                            handlePublish={handlePublish}
                            handleUnpublish={handleUnpublish}
                            key={item.id}
                          />
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
