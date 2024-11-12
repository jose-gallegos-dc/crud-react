import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../Includes';
import { useEffect, useState } from 'react';
import { api } from '../Services';

function SupplierUpdate() {
    const { supplierId } = useParams();
    const [nombreProveedor, setNombreProveedor] = useState('');
    const [razonSocial, setRazonSocial] = useState('');
    const [estado, setEstado] = useState(''); // Para almacenar el nombre del estado
    const [estadoID, setEstadoID] = useState(''); // Para almacenar el ID del estado seleccionado
    const [municipio, setMunicipio] = useState('');
    const [celular, setCelular] = useState('');
    const [estados, setEstados] = useState([]); // Lista de estados
    const [ciudades, setCiudades] = useState([]); // Lista de ciudades/municipios
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const supplierGet = async () => {
        try {
            const { data } = await api.get(`proveedores/${supplierId}`);
            const supplierData = data.data;

            setNombreProveedor(supplierData.nombreProveedor);
            setRazonSocial(supplierData.razonSocial);

            // Aquí encuentra el estadoID que corresponde al nombre del estado.
            const estadoSeleccionado = estados.find(est => est.nombre === supplierData.estado);
            setEstado(supplierData.estado);
            setEstadoID(estadoSeleccionado ? estadoSeleccionado.estadoID : ''); // Establecemos el estadoID

            setMunicipio(supplierData.municipio);
            setCelular(supplierData.celular);

            setSuccess(data.mensaje);
            setError(null);
        } catch (err) {
            const { estatus, mensaje } = err.response.data;
            setError(mensaje);
            setSuccess(null);
        }
    };

    const supplierUpdate = async (e) => {
        e.preventDefault();

        try {
            const { data } = await api.put(`proveedores/${supplierId}`, {
                nombreProveedor,
                razonSocial,
                estado,
                municipio,
                celular
            });

            setSuccess(data.mensaje);
            setError(null);
        } catch (err) {
            const { estatus, mensaje } = err.response.data;
            setError(mensaje);
            setSuccess(null);
        }
    };

    const estadosGet = async () => {
        try {
            const { data } = await api.get('estados');
            setEstados(data.data);

        } catch (err) {
            const { estatus, mensaje } = err.response.data;
            setError(mensaje);
            setSuccess(null);
        }
    };

    const ciudadesGet = async (estadoID) => {
        try {
            const { data } = await api.get(`ciudades/${estadoID}`);
            setCiudades(data.data);

        } catch (err) {
            const { estatus, mensaje } = err.response.data;
            setError(mensaje);
            setSuccess(null);
        }
    };

    // Ejecuta la carga inicial de estados
    useEffect(() => {
        estadosGet();
    }, []);

    // Ejecuta la carga de ciudades cada vez que `estadoID` cambie
    useEffect(() => {
        if (estadoID) {
            ciudadesGet(estadoID);
        }
    }, [estadoID]);

    // Ejecuta la carga del proveedor al montar el componente
    useEffect(() => {
        if (estados.length > 0) {
            supplierGet();
        }
    }, [estados]);

    return (
        <>
            <Navbar />

            <div className="flex flex-col items-center justify-center h-screen">
                <form onSubmit={supplierUpdate} className="bg-white p-6 rounded shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center">Proveedor {supplierId}</h2>
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
                        <select
                            value={estado}
                            onChange={(e) => {
                                const selectedEstado = estados.find(est => est.nombre === e.target.value);
                                setEstado(selectedEstado.nombre);
                                setEstadoID(selectedEstado.estadoID); // Almacena el ID del estado
                            }}
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                            required>
                            <option value="">Seleccione un estado</option>
                            {estados.map((estado) => (
                                <option key={estado.estadoID} value={estado.nombre}>
                                    {estado.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900">*Municipio</label>
                        <select
                            value={municipio}
                            onChange={(e) => setMunicipio(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded mb-4"
                            required>
                            <option value="">Seleccione un municipio</option>
                            {ciudades.map((ciudad) => (
                                <option key={ciudad.ciudadID} value={ciudad.nombre}>
                                    {ciudad.nombre}
                                </option>
                            ))}
                        </select>
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
                        Actualizar
                    </button>
                </form>
            </div>
        </>
    );
}

export default SupplierUpdate;
