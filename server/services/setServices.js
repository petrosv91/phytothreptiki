const Code = require('../models/code');
const Recipe = require('../models/recipe');
const Element = require('../models/element');
const Product = require('../models/product');

async function setMaxCode(data) {
  const newCode = Number(data.code) + 1;
  await Code.updateOne({ _id: data.codeId }, { $set: { code: newCode } });
  return res.json({ success: true });
}

async function setRecipe(data) {
  const exists = await Recipe.findById(data.id);
  if (exists) {
    await Recipe.updateOne({ _id: data.id }, { $set: { ...data } });
    return { success: true, exists: true };
  }
  const newPost = new Recipe({ ...data });
  await newPost.save();
  return { success: true };
}

async function setElement(data) {
  const exists = await Element.findById(data.id);
  if (exists) {
    await Element.updateOne({ _id: data.id }, { $set: { ...data } });
    return { success: true };
  }
  const newPost = new Element({ ...data });
  await newPost.save();
  return { success: true };
}

async function setProduct(data) {
  const exists = await Product.findById(data.id);
  if (exists) {
    await Product.updateOne({ _id: data.id }, { $set: { ...data } });
    return { success: true };
  }
  const newPost = new Product({ ...data });
  await newPost.save();
  return { success: true };
}

module.exports = { setMaxCode, setRecipe, setElement, setProduct };
