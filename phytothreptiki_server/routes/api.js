const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.post('/', async (req, res) => {
  try {
    const newPost = new Post({
      name: req.body.name,
      label: req.body.label,
      formula: req.body.formula,
    });
    const savedPost = await newPost.save();
    res.json({ sucess: true });
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.json({ sucess: true, data: allPosts });
  } catch (err) {
    res.json({ message: err });
  }
});

// router.get('/:postId', async (req, res) => {
//   try {
//     const specificPost = await Post.findById(req.params.postId);
//     res.json(specificPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// router.patch('/:postId', async (req, res) => {
//   try {
//     const updatedPost = await Post.updateOne(
//       { _id: req.params.postId },
//       { $set: { title: req.body.title } }
//     );
//     res.json(updatedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

router.delete('/:postId', async (req, res) => {
  try {
    const deletedPost = await Post.deleteOne({ _id: req.params.postId });
    res.json({ sucess: true, data: deletedPost });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
