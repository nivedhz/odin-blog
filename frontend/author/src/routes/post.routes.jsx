import PostForm from "@/pages/PostForm";

export const postRoutes = {
  path: "/post",
  children: [
    {
      path: "new",
      element: <PostForm />,
    },
  ],
};
