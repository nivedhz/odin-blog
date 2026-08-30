import { Button } from "../components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { cn } from "../lib/utils.js";
import moment from "moment";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { Input } from "#components/ui/input";
import EmptyComment from "#components/EmptyComment";
import Comment from "#components/Comment";

const Post = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [comment, setComment] = useState("");
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
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/reader/post/${postId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user?.token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const result = await response.json();
        setData(result.post);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId, user?.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/reader/post/comment`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment,
            post: data?.id,
          }),
        },
      );
      if (response.status === 401) {
        logout();
        return navigate("/auth/login");
      }
      const result = await response.json();
      setData((prev) => ({
        ...prev,
        comments: result.comments,
      }));
      setComment("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      setLoading(true);
      const reponse = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/reader/post/comment/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user?.token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (reponse.status === 401) {
        return navigate("/auth/login");
      }

      setData((prev) => ({
        ...prev,
        comments: prev.comments.filter((item) => item.id !== commentId),
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
        <h1 className="lg:text-4xl font-bold max-w-full text-wrap wrap-anywhere md:text-2xl sm:text-xl">
          {data?.title}
        </h1>
        <Button
          className={"cursor-pointer"}
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowLeft />
          Go to Home
        </Button>
      </div>
      <div
        className={cn(
          " max-w-full text-wrap wrap-anywhere transition-all duration-500 ease-out flex flex-col gap-4",
          {
            "opacity-100 translate-y-0": loaded,
            "opacity-0 translate-y-10": !loaded,
          },
        )}
      >
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <span className="text-muted-foreground text-sm">
              Author:&nbsp;
              {data?.author.username},
            </span>
            <span className="text-muted-foreground text-sm">
              Created: &nbsp;
              {moment(data?.createdAt)
                .fromNow()
                .split(" ")
                .map((item, index) =>
                  index === 0
                    ? item[0].toUpperCase() + item.slice(1, item.length)
                    : item,
                )
                .join(" ")}
              ,
            </span>
            <span className="text-muted-foreground text-sm">
              Last updated: &nbsp;
              {moment(data?.updatedAt)
                .fromNow()
                .split(" ")
                .map((item, index) =>
                  index === 0
                    ? item[0].toUpperCase() + item.slice(1, item.length)
                    : item,
                )
                .join(" ")}
            </span>
          </div>
        </div>
      </div>
      <div
        className={cn(
          "px-4 delay-50 transition-all ease-out duration-500 py-4",
          {
            "opacity-100 translate-y-0": loaded,
            "opacity-0 translate-y-10": !loaded,
          },
        )}
      >
        {data?.content}
      </div>
      <div className="px-16 py-16">
        <div
          className={cn(
            "bg-primary-foreground px-4 py-4 rounded-2xl flex flex-col gap-4 delay-100 transition-all ease-out duration-500",
            {
              "opacity-100 translate-y-0": loaded,
              "opacity-0 translate-y-10": !loaded,
            },
          )}
        >
          <h1 className="text-xl font-bold">Comments</h1>
          <div className="">
            <form className="flex gap-4" onSubmit={handleSubmit}>
              <Input
                name="comment"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="Add a comment"
                required
              />
              <div className="">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn("cursor-pointer", {
                    "cursor-not-allowed": !comment.trim(),
                  })}
                  type={comment.trim() ? "submit" : "button"}
                >
                  <Send
                    className={cn("", {
                      "text-muted-foreground": !comment.trim(),
                    })}
                  />
                </Button>
              </div>
            </form>
            <div className="">
              {data?.comments.length === 0 ? (
                <EmptyComment />
              ) : (
                <div className="py-4 flex flex-col gap-3">
                  {data?.comments.map((item) => {
                    return <Comment item={item} handleDelete={handleDelete} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
