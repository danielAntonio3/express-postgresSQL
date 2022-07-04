// ! Para usar esta librería hay que implementar in middleware especial
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class CustomerServices {
  constructor() {}

  async getCustomers() {
    return await models.Customer.findAll({
      include: ['user'],
    });
  }

  async getCustomerById(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  // Para crear aparte el customer
  /* async create(payload) {
    const customer = await models.Customer.create(payload);
    return customer;
  } */

  // Crear usuario y customer al mismo tiempo (Forma manual)
  /* async create(payload) {
    // Creamos el usuario
    const user = await models.User.create(payload.user);
    // Creamos el customer
    const customer = await models.Customer.create({
      ...payload,
      userId: user.id,
    });
    return customer;
  } */

  // Crear usuario y customer al mismo tiempo (Forma con sequelize)
  async create(payload) {
    const customer = await models.Customer.create(payload, {
      // nombre que se coloco en as
      include: ['user'],
    });
    return customer;
  }

  async update(payload, id) {
    const customer = await this.getCustomerById(id);
    const rta = await customer.update(payload);
    return rta;
  }

  async delete(id) {
    const customer = await this.getCustomerById(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerServices;
