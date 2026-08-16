import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../lib/prisma.js";
import "dotenv/config";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:
    process.env.JWT_SECRET ||
    "21117fbcc99b3e7639e0c9ef7d3b78587b0f3b53ce4a8f058057838570233b48",
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
        select: {
          id: true,
        },
      });
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }),
);

export { passport };
