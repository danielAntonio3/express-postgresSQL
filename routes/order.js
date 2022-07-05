const { Router } = require('express');

const validatorHandler = require('./../middleware/validator.handler');
const OrderServices = require('./../services/order');

const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
} = require('./../schemas/order');

const router = new Router();
const orderServices = new OrderServices();

router.get('/', async (req, res) => {
  const order = await orderServices.getOrders();
  res.json({ data: order });
});

router.get('/filter', async (req, res) => {
  res.send('i am filter');
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await orderServices.getOrdersById(id);
      res.json({ data: order });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const order = await orderServices.create(body);
      res.status(201).json({ message: 'Created', data: order });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await orderServices.update(body, id);
      res.json({ message: 'update', data: order });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await orderServices.delete(id);
      res.json({ message: 'delete', data: order });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
