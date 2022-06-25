const faker = require('faker');

// ! Para usar esta librería hay que implementar in middleware especial
const boom = require('@hapi/boom');

class CategoryServices {
  constructor() {
    this.category = [];
    this.generate();
  }

  generate() {
    for (let index = 0; index < 100; index++) {
      this.category.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  async getCategories() {
    return this.category;
  }

  async getCategoryById(id) {
    const category = await this.category.find((item) => item.id === id);
    if (!category) {
      throw boom.notFound('Product not found');
    }
    return category;
  }

  async create(payload) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...payload,
    };

    this.category.push(newCategory);
    return newCategory;
  }

  async update(payload, id) {
    const index = await this.category.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.category[index] = payload;
    return this.category[index];
  }

  async delete(id) {
    const index = await this.category.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.category.splice(index, 1);
    return id;
  }
}

module.exports = CategoryServices;
