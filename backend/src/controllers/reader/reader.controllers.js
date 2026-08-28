import { prisma } from "../../lib/prisma.js";

export const postGetController = async (req, res, next) => {
  const posts = await prisma.post.findMany();
  if (!posts) {
    return res.status(404).json({
      success: false,
      message: "No posts found",
    });
  }
  res.status(200).json(posts);
};
