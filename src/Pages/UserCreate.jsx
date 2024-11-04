import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar } from '../Includes';
import { useEffect, useState } from 'react';
import { api } from '../Services';

function UserCreate() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('inicio-sesion', {
                email,
                password,
            });

            if (response.data.success) {
                localStorage.setItem('token', response.data.data.token);
                navigate('/dashboard');
            }
        } catch (err) {
            const { success, message } = err.response.data;
            setError(message);
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex flex-col items-center justify-center h-screen">
                <div>En construcción</div>
            </div>
        </>
    );
}

export default UserCreate;