const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const produtos = await connection('produtos').select('*');

        return response.json(
            produtos
        );
    },

    async create(request, response) {

        const { name, price, qtd } = request.body;

        await connection('produtos').insert({
            name,
            price,
            qtd
        })

        return response.status(204).send();
    },

    async delete(request, response) {

        const { id } = request.params

        const produtos = await connection('produtos').where('id', id).delete()

        return response.status(204).send();
    },



    async update(request, response) {

        const { id } = request.params;
        const { name, price, qtd } = request.body;

        const produtos = await connection('produtos').where('id', id).update(
            {
                name: name,
                price: price,
                qtd: qtd
            }
        )

        return response.status(200).send();
    }

}