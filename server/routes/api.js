const express = require('express');
const router = express.Router();

const Code = require('../models/code');
const Element = require('../models/element');
const Product = require('../models/product');
const Recipe = require('../models/recipe');

const {
  setMaxCode,
  setRecipe,
  setElement,
  setProduct,
} = require('../services/setServices');

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
        const obj = setMaxCode(req.body.data);
        return res.json(obj);
      }
      case 'setRecipe': {
        const obj = await setRecipe(req.body.data);
        return res.json(obj);
      }
      case 'setElement': {
        const obj = setElement(req.body.data);
        return res.json(obj);
      }
      case 'setProduct': {
        const obj = setProduct(req.body.data);
        return res.json(obj);
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
