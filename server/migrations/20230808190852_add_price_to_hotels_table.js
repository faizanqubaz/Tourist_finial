
exports.up = function(knex) {
    return knex.schema.table('hotels', function(table) {
        table.string('price');
      });
};

exports.down = function(knex) {
  
};
