const { Router } = require('express');
const CategoryServices = require('./../services/categories');
const validatorHandler = require('./../middleware/validator.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('./../schemas/category');

const router = new Router();
const categoryServices = new CategoryServices();

router.get('/', async (req, res) => {
  const category = await categoryServices.getCategories();
  res.json({ data: category });
});

router.get('/filter', async (req, res) => {
  res.send('i am filter');
});

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await categoryServices.getCategoryById(id);
      res.json({ data: category });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const category = await categoryServices.create(body);
      res.status(201).json({ message: 'Created', data: category });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await categoryServices.update(body, id);
      res.json({ message: 'update', data: category });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await categoryServices.delete(id);
      res.json({ message: 'delete', data: category });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
