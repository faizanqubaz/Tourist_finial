const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    host: 'localhost',
    database: 'tourist',
    user: 'postgres',
    password: 'root'
  }
});

// Give the knex instance to objection.
Model.knex(knex);

 class User extends Model {
  static get tableName() {
    return 'users';
  }
}

module.exports = User;