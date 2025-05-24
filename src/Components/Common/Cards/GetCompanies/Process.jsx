import React, { useState, useEffect } from 'react'
import ApiClient from '../../../../Util/ApiClient/ApiClient.jsx'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import './Process.css';

const Process = ({ companyId }) => {
    const navigate = useNavigate()
    const [processes, setProcesses] = useState([])
    const [loadingProcesses, setLoadingProcesses] = useState(false)
    const [errorProcesses, setErrorProcesses] = useState(null)

    useEffect(() => {
        const fetchProcesses = async () => {
            if (!companyId) {
                setProcesses([]);
                return;
            }
            setLoadingProcesses(true)
            setErrorProcesses(null)
            try {
                const response = await ApiClient.get(`/companies/${companyId}/processes`)
                setProcesses(response.data);
                console.log(`Procesos para la compañía ${companyId}:`, response.data);
            } catch (error) {
                console.error("Error al cargar procesos:", error)
                setErrorProcesses("No se pudieron cargar los procesos. Intenta de nuevo más tarde.")
                toast.error("Error al cargar procesos.")
            } finally {
                setLoadingProcesses(false)
            }
        };
        fetchProcesses();
    }, [companyId]);

    const handleProcessClick = (processId) => {
        navigate(`/actions/${processId}`)
    };

    return (
        <div className="processes-container"> 
            <h3 className="processes-title">Procesos de la Compañía:</h3>
            {loadingProcesses ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status" aria-label="Cargando..."></div>
                    <span className="m-1">Cargando procesos...</span>
                </div>
            ) : errorProcesses ? (
                <p className="text-danger text-center">{errorProcesses}</p>
            ) : processes.length > 0 ? (
                <table className="processes-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Corte</th>
                            <th>Fecha actualizado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {processes.map((process) => (
                            <tr
                                key={process.id}
                                onClick={() => handleProcessClick(process.id)}
                                style={{ cursor: 'pointer' }} 
                            >
                                <td>{process.id}</td>
                                <td>{process.code}</td>
                                <td>{process.court}</td>
                                <td>{process.updated_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500 text-center">No hay procesos disponibles para esta compañía.</p>
            )}
        </div>
    );
};

export default Process;