const faker = require('faker');

// ! Para usar esta librería hay que implementar in middleware especial
const boom = require('@hapi/boom');

class ProductServices {
  constructor() {
    this.product = [];
    this.generate();
  }

  async generate() {
    for (let index = 0; index < 100; index++) {
      this.product.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async getProducts() {
    return this.product;
  }

  async getProductById(id) {
    // ! Esta linea es para observar como funcionan los middleware de errores
    // const hola = this.hola();
    const product = await this.product.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is block');
    }
    return product;
  }

  async create(payload) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...payload,
    };

    this.product.push(newProduct);
    return newProduct;
  }

  async update(payload, id) {
    const index = await this.product.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const productDB = this.product[index];
    this.product[index] = {
      ...productDB,
      ...payload,
    };
    return this.product[index];
  }

  async delete(id) {
    const index = await this.product.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.product.splice(index, 1);
    return id;
  }
}

module.exports = ProductServices;
