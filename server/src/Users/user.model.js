const { Model } = require('objection');

export class User extends Model {
  static get tableName() {
    return 'users';
  }
}

module.exports = User;