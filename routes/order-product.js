const { Router } = require('express');

const validatorHandler = require('./../middleware/validator.handler');
const OrderProductServices = require('./../services/order-product');

const {
  createOrderProductSchema,
  updateOrderProductSchema,
  getOrderProductSchema,
} = require('./../schemas/order-product');

const router = new Router();
const orderProductServices = new OrderProductServices();

router.get('/', async (req, res) => {
  const order = await orderProductServices.getOrderProducts();
  res.json({ data: order });
});

router.get('/filter', async (req, res) => {
  res.send('i am filter');
});

router.get(
  '/:id',
  validatorHandler(getOrderProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await orderProductServices.getOrderProductById(id);
      res.json({ data: order });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const order = await orderProductServices.create(body);
      res.status(201).json({ message: 'Created', data: order });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getOrderProductSchema, 'params'),
  validatorHandler(updateOrderProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await orderProductServices.update(body, id);
      res.json({ message: 'update', data: order });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getOrderProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await orderProductServices.delete(id);
      res.json({ message: 'delete', data: order });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
