// !  Para usar esta librería hay que implementar in middleware especial
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ProductServices {
  constructor() {}

  async getProducts() {
    return await models.Product.findAll({ include: ['category'] });
  }

  async getProductById(id) {
    // ! Esta linea es para observar como funcionan los middleware de errores
    // const hola = this.hola();
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    // if (product.isBlock) {
    //   throw boom.conflict('Product is block');
    // }
    return product;
  }

  async create(payload) {
    const product = await models.Product.create(payload);
    return product;
  }

  async update(payload, id) {
    const product = await this.getProductById(id);
    const rta = await product.update(payload);
    return rta;
  }

  async delete(id) {
    const product = await this.getProductById(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductServices;
