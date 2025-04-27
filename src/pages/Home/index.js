import React from 'react';
import { useLocation } from 'react-router';
import './home.css';
import { useEffect, useState } from 'react';
import firebase from '../../Firebase';

const Home = () => {
    const location = useLocation();
    const userId = location.state?.userId;

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                const firestore = firebase.firestore().collection('users');
                const user = await firestore.doc(userId).get();

                console.log(userId);
                console.log(user.data());

                setUserData(user.data());
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <>
            <div className="container">
                <header>
                    <h1>Bem-vindo!</h1>
                </header>
                {userData ? (
                    <table className="table-container">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Data de Nascimento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{userData.name}</td>
                                <td>{userData.lastName}</td>
                                <td>{userData.birthDate}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>Carregando dados do usuário...</p>
                )}
            </div>
        </>
    );
};

export default Home;
