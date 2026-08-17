import { passport } from "../config/passport.js";

export const ensureAuth = passport.authenticate("jwt", { session: false });
