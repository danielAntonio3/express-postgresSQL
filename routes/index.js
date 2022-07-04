const { Router } = require('express');
const product = require('./products');
const users = require('./users');
const category = require('./categories');
const customer = require('./customer');

function routerApi(app) {
  const router = new Router();

  app.use('/api/v1', router);

  // Router
  router.use('/products', product);
  router.use('/users', users);
  router.use('/categories', category);
  router.use('/customer', customer);
}

module.exports = routerApi;
