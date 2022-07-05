const joi = require('joi');

const id = joi.string();
const name = joi.string().min(3).max(15);
const price = joi.number().integer().min(10);
const description = joi.string().min(10).max(100);
const image = joi.string().uri();
const isBlock = joi.boolean();
const categoryId = joi.number().integer();

const limit = joi.number().integer();
const offset = joi.number().integer();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  isBlock: isBlock.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = joi.object({
  name,
  price,
  description,
  image,
  isBlock,
  categoryId,
});

const getProductSchema = joi.object({
  id: id.required(),
});

const queryProductSchema = joi.object({
  limit,
  offset,
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
};
