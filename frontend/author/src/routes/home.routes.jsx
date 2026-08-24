import Dashboard from "@/pages/Dashboard";
import App from "../App";
import Home from "../pages/Home";

export const homeRoutes = {
  path: "/",
  element: <App />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
  ],
};
