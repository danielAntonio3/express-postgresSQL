const { Router } = require('express');
const validatorHandler = require('./../middleware/validator.handler');
const CustomerServices = require('../services/customers');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require('./../schemas/customer');

const router = new Router();
const customerServices = new CustomerServices();

router.get('/', async (req, res) => {
  const customer = await customerServices.getCategories();
  res.json({ data: customer });
});

router.get('/filter', async (req, res) => {
  res.send('i am filter');
});

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await customerServices.getCategoryById(id);
      res.json({ data: customer });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const customer = await customerServices.create(body);
    res.status(201).json({ message: 'Created', data: customer });
  }
);

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const customer = await customerServices.update(body, id);
      res.json({ message: 'update', data: customer });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await customerServices.delete(id);
      res.json({ message: 'delete', data: customer });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
