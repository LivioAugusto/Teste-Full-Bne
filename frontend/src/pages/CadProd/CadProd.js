import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import './styles.css';
import '../../global.css';

import api from '../../services/api'

import imgLogoBne from '../../assets/bne.png'
export default function CadProd() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [qtd, setQtd] = useState('');

    const history = useHistory();

    async function NewProd(e) {
        e.preventDefault();

        const data = {
            name,
            price,
            qtd,
        };
        await api.post('newproducts', data);
        alert(`Produto cadastrado com sucesso!!`);

        history.push('/listprod');
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>

                    <img src={imgLogoBne} alt="Logo" />


                </section>
                <form onSubmit={NewProd}>
                    <h1>Cadastro de novos Produtos</h1>
                    <input
                        placeholder="Nome do produto"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Digite o preço"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Quantidade a ser cadastrada"
                        value={qtd}
                        onChange={e => setQtd(e.target.value)}
                        required
                    />

                    <button className="button" type="submit">Enviar</button>

                </form>
            </div>
        </div>
    );
}
