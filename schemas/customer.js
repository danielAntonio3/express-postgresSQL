const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().string();
const lastName = Joi.string();
const phone = Joi.string().min(10).max(10);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
