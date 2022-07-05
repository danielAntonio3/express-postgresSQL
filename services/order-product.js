// !  Para usar esta librería hay que implementar in middleware especial
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderProductServices {
  constructor() {}

  async getOrderProducts() {
    return await models.OrderProduct.findAll();
  }

  async getOrderProductById(id) {
    // ! Esta linea es para observar como funcionan los middleware de errores
    // const hola = this.hola();
    const orderProduct = await models.OrderProduct.findByPk(id);
    if (!orderProduct) {
      throw boom.notFound('Order-Product not found');
    }
    // if (product.isBlock) {
    //   throw boom.conflict('Product is block');
    // }
    return orderProduct;
  }

  async create(payload) {
    const orderProduct = await models.OrderProduct.create(payload);
    return orderProduct;
  }

  async update(payload, id) {
    const orderProduct = await this.getOrderProductById(id);
    const rta = await orderProduct.update(payload);
    return rta;
  }

  async delete(id) {
    const orderProduct = await this.getOrderProductById(id);
    await orderProduct.destroy();
    return { id };
  }
}

module.exports = OrderProductServices;
