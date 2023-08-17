
exports.up = function(knex) {
    return knex.schema.table('hotels', function(table) {
        table.decimal('latitude', 10, 6).nullable();
        table.decimal('longitude', 10, 6).nullable();
      });
};

exports.down = function(knex) {
    return knex.schema.table('hotels', function(table) {
        table.dropColumn('latitude');
        table.dropColumn('longitude');
      });
};
