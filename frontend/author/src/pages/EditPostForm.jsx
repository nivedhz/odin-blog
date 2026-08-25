import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate, Navigate, useParams } from "react-router";

const EditPostForm = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/posts/${postId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          },
        );
        if (response.status === 401) {
          logout();
          return;
        }
        const result = await response.json();
        setFormData({
          title: result.title,
          content: result.content,
        });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPost();
  }, [logout, postId, user?.token]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.content ||
      formData.title.trim() === "" ||
      formData.content.trim() === ""
    ) {
      setError("Please enter the required information");
      return;
    }

    const action = e.target.name;

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/posts/edit/${postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          publish: action === "publish",
        }),
      },
    );
    if (response.status === 401) {
      logout();
      return;
    }

    setError("");
    navigate(-1);
  };
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center">
      <Card className={"w-full max-w-xl"}>
        <CardHeader>
          <CardTitle>Edit the post</CardTitle>
          <CardDescription>
            Enter the details below to edit the post.
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              className={"cursor-pointer"}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Home
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type={"text"}
                  name="title"
                  placeholder="Eg: My new blog name"
                  value={formData.title}
                  onChange={handleChange}
                  required
                ></Input>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Eg: My new blog content"
                  value={formData.content}
                  onChange={handleChange}
                  className={"resize-none max-h-10 scrollbar-none"}
                  required
                ></Textarea>
              </div>
              {error && <p className="text-destructive">{error}</p>}
              <div className="flex gap-2 justify-end mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSubmit}
                  className={"cursor-pointer"}
                  name="draft"
                >
                  Save as Draft
                </Button>
                <Button
                  type="button"
                  name="publish"
                  onClick={handleSubmit}
                  className={"cursor-pointer"}
                >
                  Publish
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPostForm;
