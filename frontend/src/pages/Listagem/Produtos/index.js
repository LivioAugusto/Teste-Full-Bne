import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';

import { FiTrash2 } from 'react-icons/fi'
import { AiOutlineReload, AiFillCloseSquare } from 'react-icons/ai'

import { Link } from 'react-router-dom'

import LogoImg from '../../../assets/bne.png'

import api from '../../../services/api'

import './styles.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '0'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        zIndex: 99999,
    },
};

export default function ListProducts() {

    const [products, setProducts] = useState([]);
    const [UpdateModal, setUpdateModal] = useState(false);
    const [selectprod, setSelectProd] = useState(null);

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [qtd, setQtd] = useState();


    async function getProd() {
        const response = await api.get('products');
        setProducts(response.data);
    }

    async function UpdateProd(id) {

        const data = {
            name,
            price,
            qtd
        };

        try {
            await api.put(`products/${id}`, data);

            alert('Produto atualizado com sucesso');

            setUpdateModal(false);

            await getProd();

        } catch (err) {
            alert('Erro ao atualizar o produto em questão!! Tente novamente.');

            console.log(err);
        }
    }

    useEffect(() => {
        getProd();
    }, []);

    async function DeleteProd(id) {
        try {
            await api.delete(`products/${id}`);

            setProducts(products.filter(product => product.id !== id))
        } catch (err) {
            alert('Erro ao deletar o produto em questão!! Tente novamente.')
        }
    }

    return (
        <div className="container-prod">
            <header>
                <img src={LogoImg} alt="Logo" />


                <Link className="button" to="/" style={{ backgroundColor: '#fff', color: '#31a3dd' }}>HOME</Link>
                <Link className="button" to="/cadprod">Novo Produto</Link>

            </header>
            <h1>Produtos cadastrados:</h1>

            <ul>
                {
                    products.map(product => (
                        <li key={product.id}>

                            <div className="Bot">
                                <button type="button" onClick={() => DeleteProd(product.id)}>
                                    <FiTrash2 size={25} color="#a8a8b3" />
                                </button>
                                <button
                                    type="button"
                                    onChangeCapture={() => UpdateProd(product.id)}
                                    onClick={() => {

                                        setName(product.name)
                                        setPrice(product.price)
                                        setQtd(product.qtd)

                                        setSelectProd(product)
                                        setUpdateModal(true)

                                    }
                                    }>
                                    <AiOutlineReload size={25} color="#a8a8b3" />
                                </button>

                            </div>
                            <strong>NOME DO PRODUTO:</strong>
                            <p>{product.name}</p>

                            <strong>PREÇO:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</p>

                            <strong>QUANTIDADE:</strong>
                            <p>{product.qtd}</p>

                        </li>
                    ))
                }
            </ul>

            {
                selectprod && UpdateModal && (
                    <Modal isOpen={UpdateModal} onRequestClose={() => { }} style={customStyles}>

                        <button type="button" onClick={() => setUpdateModal(false)} style={{ float: 'right', border: 0 }}>
                            <AiFillCloseSquare size={25} color="#a8a8b3" />
                        </button>

                        <h1>Atualização de produtos</h1>

                        <h2>Nome do produto</h2>
                        <input
                            placeholder="Nome do produto"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />

                        <h2>Preço:</h2>
                        <input
                            placeholder="Preço do produto"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                        />

                        <h2>Quantidate</h2>
                        <input
                            placeholder="Quantidade"
                            value={qtd}
                            onChange={e => setQtd(e.target.value)}
                            required
                        />

                        <button className="button" onClick={() => UpdateProd(selectprod.id)}>Atualizar</button>
                    </Modal>
                )
            }

        </div>
    )
}