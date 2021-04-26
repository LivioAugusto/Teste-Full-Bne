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

export default function ListUser() {
    const [users, setUsers] = useState([]);
    const [UpdateModal, setUpdateModal] = useState(false);
    const [selectuser, setSelectUser] = useState(null);

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [whatsapp, setWhatsapp] = useState();


    async function getUser() {
        const response = await api.get('users');
        setUsers(response.data);
    }

    async function UpdateUser(id) {

        const data = {
            name,
            email,
            whatsapp
        };

        try {
            await api.put(`users/${id}`, data);

            alert('Usuário atualizado com sucesso');

            setUpdateModal(false);

            await getUser();

        } catch (err) {
            alert('Erro ao atualizar os dados de Usuário!! Tente novamente.');

            console.log(err);
        }
    }


    useEffect(() => {
        getUser();
    }, []);

    async function DeleteUser(id) {
        try {
            await api.delete(`users/${id}`);

            setUsers(users.filter(user => user.id !== id))
        } catch (err) {
            alert('Erro ao deletar o Usuário em questão!! Tente novamente.')
        }
    }

    return (
        <div className="container-prod">
            <header>
                <img src={LogoImg} alt="Logo" />

                <Link className="button" to="/" style={{ backgroundColor: '#fff', color: '#31a3dd' }}>HOME</Link>
                <Link className="button" to="/caduser">Novo Usuário</Link>

            </header>
            <h1>Usuários cadastrados:</h1>

            <ul>
                {
                    users.map(user => (
                        <li key={user.id}>

                            <div className="Bot">
                                <button type="button" onClick={() => DeleteUser(user.id)}>
                                    <FiTrash2 size={25} color="#a8a8b3" />
                                </button>
                                <button
                                    type="button"
                                    onChangeCapture={() => UpdateUser(user.id)}
                                    onClick={() => {

                                        setName(user.name)
                                        setEmail(user.email)
                                        setWhatsapp(user.whatsapp)

                                        setSelectUser(user)
                                        setUpdateModal(true)

                                    }
                                    }
                                >
                                    <AiOutlineReload size={25} color="#a8a8b3" />
                                </button>
                            </div>
                            <strong>NOME DO USUÁRIO:</strong>
                            <p>{user.name}</p>

                            <strong>EMAIL:</strong>
                            <p>{user.email}</p>

                            <strong>WHATSAPP:</strong>
                            <p>{user.whatsapp}</p>

                        </li>
                    ))
                }
            </ul>

            {
                selectuser && UpdateModal && (
                    <Modal isOpen={UpdateModal} onRequestClose={() => { }} style={customStyles}>

                        <button type="button" onClick={() => setUpdateModal(false)} style={{ float: 'right', border: 0 }}>
                            <AiFillCloseSquare size={25} color="#a8a8b3" />
                        </button>

                        <h1>Atualização de dados</h1>

                        <h2>Nome do Usuário</h2>
                        <input
                            placeholder="Nome do Usuário"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />

                        <h2>Email:</h2>
                        <input
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />

                        <h2>Whatsapp</h2>
                        <input
                            placeholder="Whatsapp"
                            value={whatsapp}
                            onChange={e => setWhatsapp(e.target.value)}
                            required
                        />

                        <button className="button" onClick={() => UpdateUser(selectuser.id)}>Atualizar</button>
                    </Modal>
                )
            }
        </div>
    )
}