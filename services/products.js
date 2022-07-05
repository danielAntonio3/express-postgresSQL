// !  Para usar esta librería hay que implementar in middleware especial
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ProductServices {
  constructor() {}

  async getProducts(query) {
    const options = { include: ['category'] };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    return await models.Product.findAll(options);
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
    return await models.Product.create(payload);
  }

  async update(payload, id) {
    const product = await this.getProductById(id);
    return await product.update(payload);
  }

  async delete(id) {
    const product = await this.getProductById(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductServices;
