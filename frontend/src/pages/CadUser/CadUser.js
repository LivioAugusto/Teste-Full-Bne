import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

import './styles.css';
import '../../global.css';

import api from '../../services/api'

import imgLogoBne from '../../assets/bne.png'


export default function CadUsers() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const history = useHistory();

    async function NewUser(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
        };
        await api.post('newusers', data);
        alert(`Usuário cadastrado com sucesso!!`);

        history.push('/listuser');

    }
    return (
        <div className="register-container">
            <div className="content">
                <section>

                    <img src={imgLogoBne} alt="Logo" />


                </section>
                <form onSubmit={NewUser}>
                    <h1>Cadastro de usuários</h1>
                    <input
                        placeholder="Digite seu Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Digite seu Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        required
                    />

                    <button className="button" type="submit">Enviar</button>

                </form>
            </div>
        </div>
    );
}