
exports.up = function(knex) {
    return knex.schema
    .createTable('users', function (table) {
      table.increments('id');
      table.string('firstName');
      table.string('lastName');
      table.string('email');
      table.string('password');
      table.string('confromPassword');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('users');
};
