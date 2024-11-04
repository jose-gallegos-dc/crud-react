import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar } from '../Includes';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <Navbar />

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
                    <button
                        onClick={handleLogout}
                        className="p-2 bg-red-500 text-white rounded"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
