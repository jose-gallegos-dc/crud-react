import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                                    </path>
                                </svg>
                            </button>
                            <a href="#" className="flex ms-2 md:me-24">
                                <img src="https://linkers.charalink.mx/storage/logo.png" className="h-8 me-3" alt="Linkers Logo" />
                                <span
                                    className="self-center text-xl font-semibold sm:text-xl whitespace-nowrap">
                                    Test
                                </span>
                            </a>


                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button type="button"
                                        className="flex text-sm text-gray-800 items-center justify-center rounded-full focus:bg-cyan-600 focus:text-white w-10 h-10"
                                        aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                        <i className="fa-regular fa-user text-lg text-center"></i>
                                    </button>
                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow "
                                    id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 " role="none">
                                            nombre de usuario
                                        </p>
                                        <p className="text-sm font-medium text-gray-900 truncate " role="none">
                                            test@email.com
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="{{ route('home') }}"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                role="menuitem">Inicio</a>
                                        </li>
                                        <li>

                                            <form id="logout-form" action="#" method="POST"
                                                className="w-full">
                                                <button type="submit"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                    role="menuitem">
                                                    Cerrar sesion
                                                </button>
                                            </form>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav >

            <aside id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 "
                aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
                    <ul className="space-y-2 font-medium">
                        <li>
                            {/* <a href="{{ route('admin.index') }}"
                                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group {{ Route::is('admin.index') ? 'bg-gray-300' : '' }}">
                                <i
                                    className="fa-solid fa-house text-lg text-gray-500 transition duration-75  group-hover:text-gray-900"></i>
                                <span className="ms-3">Dashboard</span>
                            </a> */}
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group bg-gray-200"
                                        : "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                                }
                            >
                                <span className="ms-3">Dashboard</span>

                            </NavLink>

                            <NavLink
                                to="/users"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group bg-gray-200"
                                        : "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                                }
                            >
                                <span className="ms-3">Usuarios</span>

                            </NavLink>
                        </li>

                    </ul>
                </div>
            </aside>
        </>
    );
}

export default Navbar;
