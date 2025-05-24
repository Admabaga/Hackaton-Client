import React, { useState, useEffect } from 'react'
import ApiClient from '../../../../Util/ApiClient/ApiClient.jsx'
import { toast } from 'react-hot-toast'
import NavBar from '../../Nav/Nav.jsx'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Action.css'

const Action = () => {
    const navigate = useNavigate()
    const { processId } = useParams()
    const [actions, setActions] = useState([])
    const [loadingActions, setLoadingActions] = useState(false)
    const [errorActions, setErrorActions] = useState(null)

    useEffect(() => {
        const fetchActions = async () => {
            if (!processId) {
                setActions([])
                return
            }
            setLoadingActions(true)
            setErrorActions(null)
            try {
                const response = await ApiClient.get(`/processes/${processId}/actions`)
                setActions(response.data);
                console.log(`Acciones para el proceso ${processId}:`, response.data)
            } catch (error) {
                setErrorActions("No se pudieron cargar las novedades. Intenta de nuevo más tarde.")
                toast.error(error.message)
            } finally {
                setLoadingActions(false)
            }
        };

        fetchActions();
    }, [processId])

    const handleProcessClick = (actionId) => {
        navigate(`/documents/${actionId}`)
    };

    return (
        <>
            <div className="app-container">
                <NavBar />
                <div className="content-container">
                    <div className="actions-container">
                        <h4 className="actions-title">Novedades del Proceso: </h4>
                        {loadingActions ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status" aria-label="Cargando..."></div>
                                <span className="m-1">Cargando novedades...</span>
                            </div>
                        ) : errorActions ? (
                            <p className="text-danger text-center">{errorActions}</p>
                        ) : actions.length > 0 ? (
                            <table className="actions-table">
                                <thead>
                                    <tr>
                                        <th>ID </th>
                                        <th>Tipo</th>
                                        <th>Descripción</th>
                                        <th>Fecha</th>
                                        <th>Importancia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {actions.map((action) => (
                                        <tr key={action.id}
                                            onClick={() => handleProcessClick(action.id)}
                                            style={{ cursor: 'pointer' }} >
                                            <td>{action.id}</td>
                                            <td>{action.type}</td>
                                            <td>{action.description}</td>
                                            <td>{action.date}</td>
                                            <td>{action.urgency}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500 text-center">No hay novedades disponibles para esta proceso.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Action