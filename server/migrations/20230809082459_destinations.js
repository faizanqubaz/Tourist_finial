
exports.up = function(knex) {
    return knex.schema
    .createTable('destinations', function (table) {
      table.increments('id');
      table.string('name');
      table.string('imageUrl');
      table.string('description');
      table.integer('rating');
      table.string('address');
      table.string('city');
    })
};

exports.down = function(knex) {
  
};
