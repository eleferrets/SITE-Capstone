const express = require("express");
const Post = require("../models/post");
const Comment = require("../models/photoComments");
const Like = require("../models/pLikes");
const security = require("../middleware/security");
const router = express.Router();

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { user } = res.locals;
    const post = await Post.createPost({
      user,
      post: req.body,
    });
    return res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
});

router.get("/listPosts", async (req, res, next) => {
  try {
    const posts = await Post.listAllPosts();
    return res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
});

router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    // List all posts for user
    const { user } = res.locals;
    const postsByMe = await Post.listPhotoPostsForUser({ user });
    return res.status(200).json({ postsByMe });
  } catch (err) {
    next(err);
  }
});
router.get("/search", async (req, res, next) => {
  try {
    //uses search?q= -str- - you enter the string
    const { q } = req.query;
    const searches = await Post.searchByTitle(q);
    return res.status(200).json({ searches });
  } catch (err) {
    next(err);
  }
});

// fetch single post
router.get("/:postsId", async (req, res, next) => {
  try {
    const postsId = req.params.postsId;
    const posting = await Post.fetchPhotoPostById(postsId);
    // console.log("pID", postsId, "p", posts)
    res.status(200).json({ posting });
  } catch (err) {
    next(err);
  }
});
// delete single post
router.delete("/:postsId", async (req, res, next) => {
  try {
    const postsId = req.params.postsId;
    const posting = await Post.deletePhotoPostById(postsId);
    // console.log("pID", postsId, "p", posts)
    res.status(200).json({ posting });
  } catch (err) {
    next(err);
  }
});

// Get the comments for the photo post
router.get(
  "/:postsId/comments",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const comments = await Comment.fetchCommentForPostByUser({
        postsId: req.params.postsId,
      });

      return res.status(201).json({ comments });
    } catch (err) {
      next(err);
    }
  }
);
// Create a new comment
router.post(
  "/:postsId/comments",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const comment = await Comment.postComment({
        comment_description: req.body.comment,
        user,
        post_id: req.params.postsId,
      });
      return res.status(201).json({ comment });
    } catch (err) {
      next(err);
    }
  }
);

// Get the likes for a post
router.get(
  "/:postsId/likes",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const likes = await Comment.fetchCommentForPostByUser({
        postsId: req.params.postsId,
      });
      return res.status(201).json({ likes });
    } catch (err) {
      next(err);
    }
  }
);

// Create the likes for a post
router.post(
  "/:postsId/likes",
  security.requireAuthenticatedUser,
  async (req, res, next) => {
    try {
      const { user } = res.locals;
      const like = await Comment.postComment({
        comment_description: req.body.comment,
        user,
        post_id: req.params.postsId,
      });
      return res.status(201).json({ like });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
