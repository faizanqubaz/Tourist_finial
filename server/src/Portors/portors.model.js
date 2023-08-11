const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    host: 'localhost',
    database: 'touistss',
    user: 'postgres',
    password: 'root'
  }
});

// Give the knex instance to objection.
Model.knex(knex);

 class Portor extends Model {
  static get tableName() {
    return 'portors';
  }
}

module.exports = {
    Portor
};