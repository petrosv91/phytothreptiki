const express = require('express');
const router = express.Router();

const Element = require('../models/element');
const Product = require('../models/product');
const Recipe = require('../models/recipe');

router.post('/', async (req, res) => {
  try {
    if (req.body.service === 'getRecipes') {
      const allPosts = await Recipe.find();
      res.json({ success: true, data: allPosts });
      return;
    }
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
      const newPost = new Product({ ...req.body.data });
      const savedPost = await newPost.save();
      res.json({ success: true });
    }
    if (req.body.service === 'deleteRecipe') {
      const deletedPost = await Recipe.deleteOne({ _id: req.body.id });
      res.json({ success: true });
    }
    if (req.body.service === 'deleteElement') {
      const deletedPost = await Element.deleteOne({ _id: req.body.id });
      res.json({ success: true });
    }
    if (req.body.service === 'deleteProduct') {
      const deletedPost = await Product.deleteOne({ _id: req.body.id });
      res.json({ success: true });
    }
  } catch (err) {
    res.json({ success: false, message: err });
  }
});

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

module.exports = router;
