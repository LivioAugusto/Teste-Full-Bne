
exports.up = function (knex) {
    return knex.schema.createTable('produtos', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('price').notNullable();
        table.string('qtd').notNullable();
    });
}

exports.down = function (knex) {
    return knex.schema.dropTable('produtos');
};
