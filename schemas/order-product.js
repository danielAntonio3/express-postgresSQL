const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();

const createOrderProductSchema = Joi.object({
  amount: amount.required(),
  orderId: orderId.required(),
  productId: productId.required(),
});

const updateOrderProductSchema = Joi.object({
  amount,
  orderId,
  productId,
});

const getOrderProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createOrderProductSchema,
  updateOrderProductSchema,
  getOrderProductSchema,
};
