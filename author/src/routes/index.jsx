import { createBrowserRouter } from "react-router";
import App from "../App";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
