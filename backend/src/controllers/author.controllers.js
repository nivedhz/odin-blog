import { prisma } from "../lib/prisma.js";

export const postsGetController = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
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

  if (req.user.id !== post.authorId) {
    return res.status(403).json({
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

export const postPublishPatchController = async (req, res, next) => {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.postId,
    },
  });
  if (post.authorId !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "Cannot make publish other user's post",
    });
  }
  await prisma.post.update({
    where: {
      id: post.id,
    },
    data: {
      publishStatus: true,
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

  res.status(200).json({
    success: true,
    message: "Successfully published the post",
    posts: userPosts.posts,
  });
};
export const postUnpublishPatchController = async (req, res, next) => {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.postId,
    },
  });
  if (post.authorId !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "Cannot make publish other user's post",
    });
  }
  await prisma.post.update({
    where: {
      id: post.id,
    },
    data: {
      publishStatus: false,
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

  res.status(200).json({
    success: true,
    message: "Successfully published the post",
    posts: userPosts.posts,
  });
};
export const postGetContrller = async (req, res, next) => {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.postId,
    },
  });
  if (post.authorId !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "Not authorized",
    });
  }

  res.status(200).json(post);
};
export const postEditPostController = async (req, res, next) => {
  await prisma.post.update({
    where: {
      id: req.params.postId,
      authorId: req.user.id,
    },
    data: {
      title: req.body.title,
      content: req.body.content,
      publishStatus: req.body.publish,
      updatedAt: new Date(),
    },
  });

  res.status(200).json({
    success: true,
    message: "Successfully edited the post",
  });
};
