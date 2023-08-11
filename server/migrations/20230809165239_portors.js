
exports.up = function(knex) {
    return knex.schema
    .createTable('portors', function (table) {
      table.increments('id');
      table.string('name');
      table.string('phoneNumber');
      table.string('dob');
      table.string('selectedoption');
      table.string('description');
      table.string('city');
      table.integer('price');
      table.string('imageUrl');
      table.string('address');
      table.integer('destination_id').unsigned()
      table.foreign('destination_id').references('destinations.id');
    })
};

exports.down = function(knex) {
  
};
