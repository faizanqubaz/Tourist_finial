
exports.up = function(knex) {
    return knex.schema.table('hotels', function (table) {
        table.string('email').nullable();; // Adding the email column
      });
};

exports.down = function(knex) {
    return knex.schema.table('hotels', function (table) {
        table.dropColumn('email'); // Removing the email column
      });
};
