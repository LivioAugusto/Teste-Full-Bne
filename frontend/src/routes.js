import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import CadUser from './pages/CadUser/CadUser';
import CadProd from './pages/CadProd/CadProd'
import Principal from './pages/Principal'
import ListProducts from './pages/Listagem/Produtos'
import ListUser from './pages/Listagem/Usuarios'


//BrowserRouter precisa prioritariamente estar envolvendo tudo
//Switch usado pra que execute rota por vez pra n dar problema
//Exact seria para que ele so execute se for aquela rota especifica pois sem ele so vai executar sempre a primeira rota com a /

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Principal} />
                <Route path="/caduser" component={CadUser} />
                <Route path="/cadprod" component={CadProd} />
                <Route path="/listuser" component={ListUser} />
                <Route path="/listprod" component={ListProducts} />
            </Switch>
        </BrowserRouter>
    )
}


