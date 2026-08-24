import { createBrowserRouter } from "react-router";
import { homeRoutes } from "./home.routes";
import { authRoutes } from "./auth.routes";
import { postRoutes } from "./post.routes";

const router = createBrowserRouter([homeRoutes, authRoutes, postRoutes]);
export default router;
