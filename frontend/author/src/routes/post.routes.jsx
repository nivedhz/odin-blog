import App from "@/App";
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
