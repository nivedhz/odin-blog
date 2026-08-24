import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

export const authRoutes = {
  path: "/auth",
  children: [
    {
      path: "sign-up",
      element: <SignUp />,
    },
    {
      path: "login",
      element: <Login />,
    },
  ],
};
