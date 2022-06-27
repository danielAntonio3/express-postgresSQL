// ! Para usar esta librería hay que implementar in middleware especial
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CategoryServices {
  constructor() {}

  async getCategories() {
    return await models.Category.findAll();
  }

  async getCategoryById(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async create(payload) {
    const category = await models.Category.create(payload);
    return category;
  }

  async update(payload, id) {
    const category = await this.getCategoryById(id);
    const rta = await category.update(payload);
    return rta;
  }

  async delete(id) {
    const category = await this.getCategoryById(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoryServices;
