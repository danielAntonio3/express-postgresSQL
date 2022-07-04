// ! Para usar esta librería hay que implementar in middleware especial
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class UsersServices {
  constructor() {}

  async getUsers() {
    return await models.User.findAll({
      include: ['customer'],
    });
  }

  async getUserById(id) {
    const users = await models.User.findByPk(id);
    if (!users) {
      throw boom.notFound('User not found');
    }
    return users;
  }

  async create(payload) {
    const user = await models.User.create(payload);
    return user;
  }

  async update(payload, id) {
    const user = await this.getUserById(id);
    const rta = user.update(payload);
    return rta;
  }

  async delete(id) {
    const user = await this.getUserById(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsersServices;
