const express = require('express');
const router = express.Router();

const Element = require('../models/element');
const Product = require('../models/product');
const Recipe = require('../models/recipe');

router.post('/', async (req, res) => {
  try {
    if (req.body.service === 'getElements') {
      const allPosts = await Element.find();
      res.json({ success: true, data: allPosts });
      return;
    }
    if (req.body.service === 'getProducts') {
      const allPosts = await Product.find();
      res.json({ success: true, data: allPosts });
      return;
    }
    if (req.body.service === 'getRecipes') {
      const allPosts = await Recipe.find();
      res.json({ success: true, data: allPosts });
      return;
    }
    if (req.body.service === 'setRecipe') {
      const newPost = new Recipe({ ...req.body.data });
      const savedPost = await newPost.save();
      res.json({ success: true });
    }
    if (req.body.service === 'setElement') {
      const newPost = new Element({ ...req.body.data });
      const savedPost = await newPost.save();
      res.json({ success: true });
    }
    if (req.body.service === 'setProduct') {
      const newPost = new Element({ ...req.body.data });
      const savedPost = await newPost.save();
      res.json({ success: true });
    }
  } catch (err) {
    res.json({ success: false, message: err });
  }
});

// router.post('/', async (req, res) => {
//   try {
//     const newPost = new Post({
//       name: req.body.name,
//       label: req.body.label,
//       formula: req.body.formula,
//     });
//     const savedPost = await newPost.save();
//     res.json({ sucess: true });
//   } catch (err) {
//     res.json({ message: err });
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
    res.json({ success: true, data: deletedPost });
  } catch (err) {
    res.json({ success: false, message: err });
  }
});

module.exports = router;
