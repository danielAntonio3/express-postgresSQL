// !  Para usar esta librería hay que implementar in middleware especial
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderServices {
  constructor() {}

  async getOrders() {
    return await models.Order.findAll();
  }

  async getOrdersById(id) {
    // ! Esta linea es para observar como funcionan los middleware de errores
    // const hola = this.hola();
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!order) {
      throw boom.notFound('Order not found');
    }
    // if (product.isBlock) {
    //   throw boom.conflict('Product is block');
    // }
    return order;
  }

  async create(payload) {
    const order = await models.Order.create(payload);
    return order;
  }

  async update(payload, id) {
    const order = await this.getOrdersById(id);
    const rta = await order.update(payload);
    return rta;
  }

  async delete(id) {
    const order = await this.getOrdersById(id);
    await order.destroy();
    return { id };
  }
}

module.exports = OrderServices;
