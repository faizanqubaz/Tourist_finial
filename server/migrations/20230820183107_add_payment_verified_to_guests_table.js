
exports.up = function(knex) {
    return knex.schema.table('guests', function (table) {
        table.boolean('payment_verified').defaultTo(false);; // Adding the email column
      })
};

exports.down = function(knex) {
    return knex.schema.table('guests', function (table) {
        table.dropColumn('payment_verified'); // Removing the email column
      });
};
