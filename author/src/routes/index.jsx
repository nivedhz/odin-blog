import { createBrowserRouter } from "react-router";
import { homeRoutes } from "./home.routes";
import { authRoutes } from "./auth.routes";

const router = createBrowserRouter([homeRoutes, authRoutes]);
export default router;
