import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Edit, EllipsisVertical, Eye, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";

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
              "p-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 transition-all duration-500 ease-out delay-100",
              {
                "opacity-100 translate-y-0": loaded,
                "opacity-0 translate-y-10": !loaded,
              },
            )}
          >
            {data.map((item) => {
              return (
                <Card className="flex flex-col  overflow-hidden" key={item.id}>
                  <CardHeader className="px-4 py-1  overflow-hidden max-w-xl text-wrap flex flex-col">
                    <div className="flex justify-between items-center w-full">
                      <CardTitle className="font-bold text-xl wrap-anywhere max-h-8">
                        {item.title}
                      </CardTitle>
                      <CardAction>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <Button
                                variant="ghost"
                                className={"cursor-pointer"}
                              >
                                <EllipsisVertical />
                              </Button>
                            }
                          />
                          <DropdownMenuContent>
                            <DropdownMenuGroup>
                              <DropdownMenuItem className={"cursor-pointer"}>
                                <Eye />
                                View post
                              </DropdownMenuItem>
                              <DropdownMenuItem className={"cursor-pointer"}>
                                <Edit />
                                Edit
                              </DropdownMenuItem>
                              <AlertDialog>
                                <AlertDialogTrigger
                                  render={
                                    <Button
                                      variant="destructive"
                                      className={
                                        "cursor-pointer w-full justify-start"
                                      }
                                    >
                                      <Trash />
                                      Delete
                                    </Button>
                                  }
                                ></AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you sure you want to delete?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      You will lose this post forever
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel
                                      className={"cursor-pointer"}
                                    >
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      variant="destructive"
                                      className={"cursor-pointer"}
                                      onClick={() => {
                                        handleDelete(item.id);
                                      }}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardAction>
                    </div>
                    <CardDescription className={"flex gap-2"}>
                      {item.publishStatus ? <p>Published</p> : <p>Draft</p>}
                      <p>
                        {new Date(item.createdAt).toDateString() +
                          " at " +
                          new Date(item.createdAt)
                            .toLocaleTimeString()
                            .split(":")
                            .slice(0, 2)
                            .join(":") +
                          " " +
                          new Date(item.createdAt)
                            .toLocaleTimeString()
                            .split(" ")[1]}
                      </p>
                    </CardDescription>
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
    </>
  );
};

export default Dashboard;
