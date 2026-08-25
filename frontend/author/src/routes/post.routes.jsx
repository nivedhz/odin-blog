import App from "@/App";
import EditPostForm from "@/pages/EditPostForm";
import Post from "@/pages/Post";
import PostForm from "@/pages/PostForm";

export const postRoutes = {
  path: "/post",
  children: [
    {
      path: "new",
      element: <PostForm />,
    },
    {
      path: "edit/:postId",
      element: <EditPostForm />,
    },
    {
      element: <App />,
      children: [
        {
          path: ":postId",
          element: <Post />,
        },
      ],
    },
  ],
};
