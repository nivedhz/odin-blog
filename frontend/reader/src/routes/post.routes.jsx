import App from "@/App.jsx";
import Post from "@/pages/Post.jsx";

export const postRoutes = {
  path: "/post",
  children: [
    {
      path: ":postId",
      element: <App />,
      children: [
        {
          index: true,
          element: <Post />,
        },
      ],
    },
  ],
};
