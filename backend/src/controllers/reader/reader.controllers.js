import { prisma } from "../../lib/prisma.js";

export const postGetController = async (req, res, next) => {
  const posts = await prisma.post.findMany();
  res.status(200).json(posts);
};
