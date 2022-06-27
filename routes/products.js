const { Router } = require('express');
const ProductServices = require('./../services/products');
const validatorHandler = require('./../middleware/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/product');

const router = new Router();
const productServices = new ProductServices();

router.get('/', async (req, res) => {
  const products = await productServices.getProducts();
  res.json({ data: products });
});

router.get('/filter', async (req, res) => {
  res.send('i am filter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productServices.getProductById(id);
      res.json({ data: product });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const product = await productServices.create(body);
    res.status(201).json({ message: 'Created', data: product });
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await productServices.update(body, id);
      res.json({ message: 'update', data: product });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await productServices.delete(id);
      res.json({ message: 'delete', data: product });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
