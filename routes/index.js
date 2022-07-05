const { Router } = require('express');
const product = require('./products');
const users = require('./users');
const category = require('./categories');
const customer = require('./customer');
const order = require('./order');
const orderProduct = require('./order-product');

function routerApi(app) {
  const router = new Router();

  app.use('/api/v1', router);

  // Router
  router.use('/products', product);
  router.use('/users', users);
  router.use('/categories', category);
  router.use('/customers', customer);
  router.use('/orders', order);
  router.use('/order-product', orderProduct);
}

module.exports = routerApi;
