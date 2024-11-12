import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar } from '../Includes';
import { useEffect, useState } from 'react';
import { api } from '../Services';

function SupplierCreate() {
    const [nombreProveedor, setNombreProveedor] = useState('');
    const [razonSocial, setRazonSocial] = useState('');
    const [estado, setEstado] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [celular, setCelular] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const supplierStore = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.post('proveedores', {
                nombreProveedor,
                razonSocial,
                estado,
                municipio,
                celular
            });

            setSuccess(data.message);
            setError(null);
        } catch (err) {
            const { success, message } = err.response.data;

            setError(message);
            setSuccess(null);
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex flex-col items-center justify-center h-screen">
                <form onSubmit={supplierStore} className="bg-white p-6 rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center">Nuevo proveedor</h2>
                    {success && <p className="text-teal-500 font-semibold">{success}</p>}
                    {error && <p className="text-red-500 font-semibold">{error}</p>}

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">*Nombre</label>
                        <input
                            type="text"
                            placeholder="Proveedor 1"
                            value={nombreProveedor}
                            onChange={(e) => setNombreProveedor(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">*Razón social</label>
                        <input
                            type="text"
                            placeholder="Proveedor SA de CV"
                            value={razonSocial}
                            onChange={(e) => setRazonSocial(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">*Estado</label>
                        <input
                            type="text"
                            placeholder="Chiapas"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">*Municipio</label>
                        <input
                            type="text"
                            placeholder="Tuxtla gutiérrez"
                            value={municipio}
                            onChange={(e) => setMunicipio(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">*Teléfono celular</label>
                        <input
                            type="text"
                            placeholder="961123456789"
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)}
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

export default SupplierCreate;