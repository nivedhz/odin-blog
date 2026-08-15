import SignUp from "../pages/SignUp";

export const authRoutes = {
  path: "/auth",
  children: [
    {
      path: "sign-up",
      element: <SignUp />,
    },
  ],
};
