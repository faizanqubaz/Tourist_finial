
exports.up = function(knex) {
    return knex.schema.table('guests', function (table) {
        table.string('email'); // Adding the email column
      })
};

exports.down = function(knex) {
    return knex.schema.table('guests', function (table) {
        table.dropColumn('email'); // Removing the email column
      });
    
};
