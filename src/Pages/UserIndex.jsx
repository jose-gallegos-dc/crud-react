import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar } from '../Includes';
import { useEffect, useState } from 'react';
import { api } from '../Services';

function UserIndex() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        try {
            const { data } = await api.get('perfiles-usuario');

            setUsers(data.data);

            setLoading(false);
        } catch (err) {
            const { success, message } = err.response.data;
            setError(message);
        }
    };

    const deleteUser = async (userId) => {
        try {
            if (window.confirm('¿Estás segur@ de eliminar este registro?')) {
                const { data } = await api.delete(`perfiles-usuario/${userId}`);

                if (data.success) {
                    getUsers();
                }
            }
        } catch (err) {
            const { success, message } = err.response.data;
            setError(message);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Navbar />

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">

                    <div className='flex justify-between mb-4'>
                        <h2 className="text-xl font-semibold">Usuarios</h2>
                        <button
                            onClick={() => navigate('/users/create')}
                            className="p-2 bg-emerald-600 text-white rounded"
                        >
                            Nuevo usuario
                        </button>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                    {loading ? (
                        <p>Cargando usuarios...</p>
                    ) : (
                        <div className="flex items-center justify-center w-full">
                            <table className="w-2/3 text-sm text-left text-gray-500 rtl:text-right">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            User id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Estatus
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.user_id} className="border-b odd:bg-white even:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {user.user_id}
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.is_active ? 'Activo' : 'No activo'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => navigate(`/users/${user.user_id}/edit`)}
                                                    className="p-2 bg-indigo-600 text-white rounded"
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    onClick={() => deleteUser(user.user_id)}
                                                    className="ms-4 p-2 bg-rose-600 text-white rounded"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserIndex;