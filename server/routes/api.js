const express = require('express');
const router = express.Router();

const Element = require('../models/element');
const Product = require('../models/product');
const Recipe = require('../models/recipe');
const Code = require('../models/code');

router.post('/', async (req, res) => {
  try {
    switch (req.body.service) {
      // ----------- Get Services -------------
      case 'getMaxCode': {
        const allPosts = await Code.find();
        return res.json({ success: true, data: allPosts });
      }
      case 'getRecipes': {
        const allPosts = await Recipe.find();
        return res.json({ success: true, data: allPosts });
      }
      case 'getElements': {
        const allPosts = await Element.find();
        return res.json({ success: true, data: allPosts });
      }
      case 'getProducts': {
        const allPosts = await Product.find();
        return res.json({ success: true, data: allPosts });
      }
      // ----------- Set Services ------------
      case 'setMaxCode': {
        const newCode = Number(req.body.data.code) + 1;
        await Code.updateOne({ _id: req.body.data.codeId }, { $set: { code: newCode } });
        return res.json({ success: true });
      }
      case 'setRecipe': {
        const exists = await Recipe.findById(req.body.data.id);
        if (exists) {
          await Recipe.updateOne({ _id: req.body.data.id }, { $set: { ...req.body.data } });
          return res.json({ success: true, exists: true });
        }
        const newPost = new Recipe({ ...req.body.data });
        await newPost.save();
        return res.json({ success: true });
      }
      case 'setElement': {
        const exists = await Element.findById(req.body.data.id);
        if (exists) {
          await Element.updateOne({ _id: req.body.data.id }, { $set: { ...req.body.data } });
          return res.json({ success: true });
        }
        const newPost = new Element({ ...req.body.data });
        await newPost.save();
        return res.json({ success: true });
      }
      case 'setProduct': {
        const exists = await Product.findById(req.body.data.id);
        if (exists) {
          await Product.updateOne({ _id: req.body.data.id }, { $set: { ...req.body.data } });
          return res.json({ success: true });
        }
        const newPost = new Product({ ...req.body.data });
        await newPost.save();
        return res.json({ success: true });
      }
      // ---------- Delete Services ------------
      case 'deleteRecipe': {
        await Recipe.deleteOne({ _id: req.body.id });
        return res.json({ success: true });
      }
      case 'deleteElement': {
        await Element.deleteOne({ _id: req.body.id });
        return res.json({ success: true });
      }
      case 'deleteProduct': {
        await Product.deleteOne({ _id: req.body.id });
        return res.json({ success: true });
      }
      default: {
        res.json({ success: false, message: 'Service doesnt exists' });
      }
    }
  } catch (err) {
    res.json({ success: false, message: err });
  }
});

module.exports = router;
