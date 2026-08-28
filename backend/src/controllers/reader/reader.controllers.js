import { prisma } from "../../lib/prisma.js";

export const postGetController = async (req, res, next) => {
  const posts = await prisma.post.findMany();
  if (!posts) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
  res.status(200).json(posts);
};
