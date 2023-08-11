
exports.up = function(knex) {
    return knex.schema
    .createTable('rooms', function (table) {
      table.increments('id');
      table.string('name');
      table.string('attachbath');
      table.string('numberofwashrooms');
      table.string('selectedoption');
      table.string('availability');
      table.integer('price');
      table.string('imageUrl');
      table.integer('hotel_id').unsigned()
      table.foreign('hotel_id').references('hotels.id');
      table.integer('guest_id').unsigned()
      table.foreign('guest_id').references('guests.id');
    })
};

exports.down = function(knex) {
  
};
