import { createBrowserRouter } from "react-router";
import { authRoutes } from "./auth.routes";
import { homeRoutes } from "./home.routes.jsx";

const router = createBrowserRouter([authRoutes, homeRoutes]);
export default router;
