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

export const postDeleteController = async (req, res, next) => {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.postId,
    },
  });
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      posts: {
        include: {
          author: {
            select: { username: true },
          },
        },
      },
    },
  });

  if (user.id !== post.authorId) {
    return res.status(401).json({
      success: false,
      message: "Cannot delete other user's posts",
    });
  }
  await prisma.post.delete({
    where: {
      id: req.params.postId,
      authorId: req.user.id,
    },
  });
  const userPosts = await prisma.user.findUnique({
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

  res.json({
    success: true,
    message: "Successfully deleted the post",
    posts: userPosts.posts,
  });
};
