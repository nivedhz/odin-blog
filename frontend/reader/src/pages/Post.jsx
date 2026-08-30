import { Button } from "../components/ui/button";
import { ArrowLeft, EllipsisVertical, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { cn } from "../lib/utils.js";
import moment from "moment";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useAuth } from "../hooks/useAuth.jsx";
import { Input } from "#components/ui/input";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "#components/ui/empty";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { Avatar, AvatarFallback } from "#components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "#components/ui/alert-dialog";

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
              />
              <div className="">
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer"
                  type="submit"
                >
                  <Send />
                </Button>
              </div>
            </form>
            <div className="">
              {data?.comments.length === 0 ? (
                <Empty className={"gap-2"}>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <MessageCircle />
                    </EmptyMedia>
                  </EmptyHeader>
                  <EmptyTitle>No comments yet</EmptyTitle>
                  <EmptyDescription>
                    Be the first one to leave a comment
                  </EmptyDescription>
                </Empty>
              ) : (
                <div className="py-4 flex flex-col gap-3">
                  {data?.comments.map((item) => {
                    return (
                      <Card
                        key={item.id}
                        className={"flex flex-row items-center gap-0 px-4"}
                      >
                        <Avatar>
                          <AvatarFallback>
                            {item.creator.username[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-full flex justify-between items-center px-4">
                          <div className="flex flex-col">
                            <CardHeader
                              className={
                                "flex justify-between items-center min-w-full"
                              }
                            >
                              <CardTitle
                                className={
                                  "text-sm flex gap-1 items-center w-full min-w-xl"
                                }
                              >
                                <span>{item.creator.username}</span>

                                {item.creator.username === user?.username ? (
                                  <span>(you)</span>
                                ) : null}
                                <span className="text-muted-foreground">
                                  &bull;
                                </span>
                                <span className="text-muted-foreground">
                                  {moment(item.createdAt).fromNow()}
                                </span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent
                              className={"text-muted-foreground w-full"}
                            >
                              {item.content}
                            </CardContent>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button variant="ghost" size="icon">
                                  <EllipsisVertical />
                                </Button>
                              }
                            />
                            <DropdownMenuContent>
                              <DropdownMenuGroup>
                                <DropdownMenuLabel>Comment</DropdownMenuLabel>
                                <DropdownMenuItem>Report</DropdownMenuItem>
                                {item.creator.username === user?.username && (
                                  <div className="">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <AlertDialog>
                                      <AlertDialogTrigger
                                        render={
                                          <Button
                                            variant="destructive"
                                            className="min-w-full justify-start"
                                          >
                                            Delete
                                          </Button>
                                        }
                                      />
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Are you sure to delete?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>
                                            Cancel
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            variant="destructive"
                                            onClick={() => {
                                              handleDelete(item.id);
                                            }}
                                          >
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </div>
                                )}
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </Card>
                    );
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
