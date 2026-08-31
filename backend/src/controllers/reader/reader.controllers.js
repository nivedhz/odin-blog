import { prisma } from "../../lib/prisma.js";

export const postsGetController = async (req, res, next) => {
  const { sort } = req.query;
  const orderBy =
    sort === "recent"
      ? { updatedAt: "desc" }
      : { comments: { _count: "desc" } };

  const posts = await prisma.post.findMany({
    where: {
      publishStatus: true,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
    orderBy,
    take: sort === "recent" ? undefined : 5,
  });
  if (!posts) {
    return res.status(404).json({
      success: false,
      message: "No posts found",
    });
  }
  res.status(200).json(posts);
};

export const postGetController = async (req, res, next) => {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.postId,
    },
    include: {
      author: {
        select: {
          username: true,
        },
      },
      comments: {
        include: {
          creator: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  res.json({
    success: true,
    post: post,
  });
};

export const commentPutController = async (req, res, next) => {
  await prisma.comment.create({
    data: {
      content: req.body.comment,
      postId: req.body.post,
      creatorId: req.user.id,
    },
  });
  const comments = await prisma.comment.findMany({
    where: {
      postId: req.body.post,
    },
    include: {
      creator: {
        select: {
          username: true,
        },
      },
    },
  });

  res.status(200).json({
    success: true,
    message: "Created comment successfully",
    comments,
  });
};

export const commentDeleteController = async (req, res, next) => {
  if (!req.params.commentId) {
    return res.status(404).json({
      success: false,
      message: "No comment id provided",
    });
  }

  await prisma.comment.delete({
    where: {
      id: req.params.commentId,
      creatorId: req.user.id,
    },
  });
  res.json({
    success: true,
    message: "Deleted the comment successfully",
  });
};
