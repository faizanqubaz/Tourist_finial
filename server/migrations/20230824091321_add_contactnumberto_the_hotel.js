
exports.up = function(knex) {
    return knex.schema.table('hotels', function (table) {
        table.string('whatsapp_number'); // Adding the email column
      })
};

exports.down = function(knex) {
    return knex.schema.table('hotels', function (table) {
        table.string('whatsapp_number');// Removing the email column
      });
};
