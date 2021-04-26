const express = require('express');

const UserController = require('./controllers/UserController');
const ProductsController = require('./controllers/ProductsController');
const routes = express.Router();


//Listagem de usuarios
routes.get('/users', UserController.index);
//Criar usuarios
routes.post('/newusers', UserController.create);
//Deletar usuarios pelo Id
routes.delete('/users/:id', UserController.delete);
//Atualizar usuário
routes.put('/users/:id', UserController.update);


//Listagem de produtos cadastrados
routes.get('/products', ProductsController.index);
//Inserir novos produtos
routes.post('/newproducts', ProductsController.create);
//Deleta o produto pela id
routes.delete('/products/:id', ProductsController.delete);
//Atualizar produto
routes.put('/products/:id', ProductsController.update);



module.exports = routes;