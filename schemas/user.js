const joi = require('joi');

const id = joi.string();
const name = joi.string();
const email = joi.string();
const password = joi.string();
const role = joi.string();

const createUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = joi.object({
  name,
  email,
  password,
  role,
});

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
