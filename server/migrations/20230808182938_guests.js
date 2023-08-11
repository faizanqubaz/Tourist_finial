
exports.up = function(knex) {
    return knex.schema
    .createTable('guests', function (table) {
      table.increments('id');
      table.string('name');
      table.string('imageUrl');
      table.string('description');
      table.integer('number_of_rooms');
      table.string('cnic');
      table.string('country');
      table.string('number_of_persons');
      table.string('checkIn_date');
      table.string('checkOut_date');
      table.integer('hotel_id').unsigned()
      table.foreign('hotel_id').references('hotels.id');
    })
};

exports.down = function(knex) {
  
};
