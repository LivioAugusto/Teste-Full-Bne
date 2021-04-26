const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const usuarios = await connection('usuarios').select('*');

        return response.json(
            usuarios
        );
    },

    async create(request, response) {
        const { name, email, whatsapp } = request.body;

        await connection('usuarios').insert({
            name,
            email,
            whatsapp
        })

        return response.json({

        })
    },

    async delete(request, response) {

        const { id } = request.params

        const usuarios = await connection('usuarios').where('id', id).delete()

        return response.status(204).send();
    },

    async update(request, response) {

        const { id } = request.params;
        const { name, email, whatsapp } = request.body;

        const usuarios = await connection('usuarios').where('id', id).update(
            {
                name: name,
                email: email,
                whatsapp: whatsapp
            }
        )

        return response.status(200).send();
    }
}