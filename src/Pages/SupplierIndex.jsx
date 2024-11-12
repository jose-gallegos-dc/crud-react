import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar } from '../Includes';
import { useEffect, useState } from 'react';
import { api } from '../Services';

function SupplierIndex() {
    const navigate = useNavigate();
    const [suppliers, setsuppliers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const suppliersGet = async () => {
        try {
            const { data } = await api.get('proveedores?numeroPagina=1&registrosPorPagina=10');

            setsuppliers(data.data);

            setLoading(false);
        } catch (err) {
            const { success, message } = err.response.data;
            setError(message);
        }
    };

    const supplierDelete = async (supplierId) => {
        try {
            if (window.confirm('¿Estás segur@ de eliminar este proveedor?')) {
                const { data } = await api.delete(`proveedores/${supplierId}`);

                if (data.success) {
                    suppliersGet();
                }
            }
        } catch (err) {
            const { success, message } = err.response.data;
            setError(message);
        }
    };

    useEffect(() => {
        suppliersGet();
    }, []);

    return (
        <>
            <Navbar />

            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">

                    <div className='flex justify-between mb-4'>
                        <h2 className="text-xl font-semibold">Proveedores</h2>
                        <button
                            onClick={() => navigate('/suppliers/create')}
                            className="p-2 bg-emerald-600 text-white rounded"
                        >
                            Nuevo proveedor
                        </button>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}
                    {loading ? (
                        <p>Cargando datos...</p>
                    ) : (
                        <div className="flex items-center justify-center w-full">
                            <table className="max-w-4xl text-sm text-left text-gray-500 rtl:text-right">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            proveedor ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Nombre
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Celular
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ciudad
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suppliers.map((supplier) => (
                                        <tr key={supplier.proveedorID} className="border-b odd:bg-white even:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {supplier.proveedorID}
                                            </th>
                                            <td className="px-6 py-4">
                                                {supplier.nombreProveedor}
                                            </td>
                                            <td className="px-6 py-4">
                                                {supplier.celular}
                                            </td>
                                            <td className="px-6 py-4">
                                                {supplier.municipio}
                                            </td>
                                            {/* <td className="px-6 py-4">
                                                {supplier.is_active ? 'Activo' : 'No activo'}
                                            </td> */}
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => navigate(`/suppliers/${supplier.proveedorID}/edit`)}
                                                    className="p-2 bg-indigo-600 text-white rounded"
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    onClick={() => supplierDelete(supplier.proveedorID)}
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

export default SupplierIndex;