
exports.up = function (knex) {
    return knex.schema.createTable('usuarios', function (table) {
        table.increments()
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.int('whatsapp').notNullable();
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('usuarios');
};
