import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../Services';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            setError('');
            const response = await api.post('auth/login', {
                email,
                password,
            });
            // console.log(response.data.token);

            if (response.data.estatus) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            }
        } catch (err) {
            const { estatus, mensaje, errores } = err.response.data;
            setError(mensaje);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded mb-4"
                    required
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded"
                >
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}

export default Login;
