const Joi = require('joi');
const { createUserSchema, updateUserSchema } = require('./user');

const id = Joi.number().integer();
const name = Joi.string();
const lastName = Joi.string();
const phone = Joi.string().min(10).max(10);
// const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  // userId: userId.required(),
  user: createUserSchema,
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  // userId,
  user: updateUserSchema,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
