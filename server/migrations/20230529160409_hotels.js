
exports.up = function(knex) {
    return knex.schema
    .createTable('hotels', function (table) {
      table.increments('id');
      table.string('name');
      table.string('imageUrl');
      table.string('description');
      table.integer('rating');
      table.string('location');
    })
};

exports.down = function(knex) {
  
};
