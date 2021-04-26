import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css';

import bne from '../../assets/bne.png'
import bneMaior from '../../assets/logo.png'

export default function Principal() {
    return (
        <div className="container">
            <section className="form">
                <img src={bne} alt="Imagem menor" />

                <form>
                    <h1>Selecione o desejado...</h1>
                    <Link className="button" to="/caduser">Usuário</Link>
                    <Link className="CadProd" to="/cadprod">Produto</Link>
                </form>
            </section>

            <img src={bneMaior} alt="Imagem maior" className="BneMaior" />
        </div>
    );
}