const faker = require('faker');

// ! Para usar esta librería hay que implementar in middleware especial
const boom = require('@hapi/boom');

class UsersServices {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    for (let index = 0; index < 100; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  async getCategories() {
    return this.users;
  }

  async getCategoryById(id) {
    const users = await this.users.find((item) => item.id === id);
    if (!users) {
      throw boom.notFound('Product not found');
    }
    return users;
  }

  async create(payload) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...payload,
    };

    this.users.push(newUser);
    return newUser;
  }
  async update(payload, id) {
    const index = await this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.users[index] = payload;
    return this.users[index];
  }

  async delete(id) {
    const index = await this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    this.users.splice(index, 1);
    return id;
  }
}

module.exports = UsersServices;
