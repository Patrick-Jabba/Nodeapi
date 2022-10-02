const ICrud = require('./../interfaces/interfaceCrud');
const Sequelize = require('sequelize');

class Postgres extends ICrud {
  constructor(connection, schema) {
    super()
    this._connection = connection;
    this._schema = schema;
  }
  async isConnected() {
    try {
      await this.connection.authenticate()
      return true;
    }
    catch (error) {
      console.log('fail!!', error)
      return false;
    }
  }

  static async defineModel(connection, schema) {
    const model = connection.define(
      schema.name, schema.schema, schema.options
    );
    await model.sync();
    return model;
  }

  async create(item) {
    const { dataValues } = await this._schema.create(item);

    return dataValues;
  }

  async update(id, item) {
    console.log('id', id)
    const result = await this._schema.update(item, { where: { id: id } })
    return result;
  }

  async delete(id) {
    const query = id ? { id } : {};
    return this._schema.destroy({ where: query });
  }

  read(item = {}) {
    return this._schema.findAll({ where: item, raw: true })

  }

  static async connect() {
    const connection = new Sequelize(
      'heroes',
      'postgres',
      'minhasenhasecreta',
      {
        host: 'localhost',
        dialect: 'postgres',
      }
    )
    return connection;
  }
}

module.exports = Postgres;