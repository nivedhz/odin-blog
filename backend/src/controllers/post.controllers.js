import { prisma } from "../lib/prisma.js";

export const postsGetController = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      posts: {
        include: {
          author: {
            select: { username: true },
          },
        },
      },
    },
  });
  res.status(200).json(user.posts);
};

export const newPostPostController = async (req, res, next) => {
  await prisma.post.create({
    data: {
      title: req.body.title,
      content: req.body.content,
      publishStatus: req.body.publish,
      authorId: req.user.id,
    },
  });
  res.status(201).json({
    success: true,
    message: "Successfully created the post",
  });
};
