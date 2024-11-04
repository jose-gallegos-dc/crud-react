import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Includes';
import { useEffect, useState } from 'react';
import { api } from '../Services';

function UserUpdate() {
    const { userId } = useParams();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [paternal_surname, setPaternalSurname] = useState('');
    const [maternal_surname, setMaternalSurname] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const getUser = async () => {
        try {
            const { data } = await api.get(`perfiles-usuario/${userId}`);

            const userData = data.data;

            setEmail(userData.email);
            setName(userData.profile.name);
            setPaternalSurname(userData.profile.paternal_surname);
            setMaternalSurname(userData.profile.maternal_surname ? userData.profile.maternal_surname : '');
            setBirthdate(userData.profile.birthdate ? userData.profile.birthdate : '');

            setSuccess(data.message);
            setError(null);
        } catch (err) {
            const { success, message } = err.response.data;

            setError(message);
            setSuccess(null);
        }
    };


    const updateUser = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.put(`perfiles-usuario/${userId}`, {
                email,
                name,
                paternal_surname,
                maternal_surname,
                birthdate
            });

            setSuccess(data.message);
            setError(null);
        } catch (err) {
            const { success, message } = err.response.data;

            setError(message);
            setSuccess(null);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Navbar />

            <div className="flex flex-col items-center justify-center h-screen">
                <form onSubmit={updateUser} className="bg-white p-6 rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center">Usuario {userId}</h2>
                    {success && <p className="text-teal-500 font-semibold">{success}</p>}
                    {error && <p className="text-red-500 font-semibold">{error}</p>}

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Correo</label>
                        <input
                            type="email"
                            placeholder="user@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">*Nombre</label>
                        <input
                            type="text"
                            placeholder="John"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">*Apellido paterno</label>
                        <input
                            type="text"
                            placeholder="Doe"
                            value={paternal_surname}
                            onChange={(e) => setPaternalSurname(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Apellido materno</label>
                        <input
                            type="text"
                            placeholder="Smith"
                            value={maternal_surname}
                            onChange={(e) => setMaternalSurname(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Fecha de nacimiento</label>
                        <input
                            type="date"
                            placeholder="Correo electrónico"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 bg-indigo-600 text-white rounded"
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </>
    );
}

export default UserUpdate;