const { Router } = require('express');
const UsersServices = require('./../services/users');
const validatorHandler = require('./../middleware/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('./../schemas/user');

const router = new Router();
const usersServices = new UsersServices();

router.get('/', (req, res) => {
  const users = usersServices.getCategories();
  res.json(users);
});

router.get('/filter', (req, res) => {
  res.send('i am filter');
});

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const users = await usersServices.getCategoryById(id);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const user = await usersServices.create(body);
    res.status(201).json({ message: 'Created', data: user });
  }
);

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await usersServices.update(body, id);
      res.json({ message: 'update', data: user });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const user = await usersServices.delete(id);
    res.json({ message: 'delete', data: user });
  }
);

module.exports = router;
