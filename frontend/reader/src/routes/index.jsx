import { createBrowserRouter } from "react-router";
import { authRoutes } from "./auth.routes";
import { homeRoutes } from "./home.routes.jsx";
import { postRoutes } from "./post.routes.jsx";

const router = createBrowserRouter([authRoutes, homeRoutes, postRoutes]);
export default router;
