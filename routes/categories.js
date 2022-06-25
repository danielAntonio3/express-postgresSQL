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
  res.json(category);
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
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const category = await categoryServices.create(body);
    res.status(201).json({ message: 'Created', data: category });
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
  async (req, res) => {
    const { id } = req.params;
    const category = await categoryServices.delete(id);
    res.json({ message: 'delete', data: category });
  }
);

module.exports = router;
