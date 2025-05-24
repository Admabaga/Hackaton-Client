
import React, { useState, useEffect } from 'react'
import ApiClient from '../../../../Util/ApiClient/ApiClient.jsx'
import { toast } from 'react-hot-toast'
import NavBar from '../../Nav/Nav.jsx'
import { useParams } from 'react-router-dom'
import './Document.css'

const Document = () => {
    const { actionId } = useParams()
    const [documents, setDocuments] = useState([])
    const [loadingDocuments, setLoadingDocuments] = useState(false)
    const [errorDocuments, setErrorDocuments] = useState(null)

    useEffect(() => {
        const fetchDocuments = async () => {
            if (!actionId) {
                setDocuments([]);
                return;
            }

            setLoadingDocuments(true);
            setErrorDocuments(null);
            try {
                const response = await ApiClient.get(`/actions/${actionId}/documents`)
                setDocuments(response.data);
                console.log(`Documentos para la acción ${actionId}:`, response.data)
            } catch (error) {
                console.error("Error al cargar documentos:", error);
                setErrorDocuments("No se pudieron cargar los documentos. Intenta de nuevo más tarde.")
                toast.error(error.message)
            } finally {
                setLoadingDocuments(false)
            }
        };

        fetchDocuments();
    }, [actionId])

    return (
        <>
            <div className="app-container">
                <NavBar />
                <div className="content-container">
                    <div className="documents-container">
                        <h4 className="documents-title">Documentos de la Novedad: </h4>
                        {loadingDocuments ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status" aria-label="Cargando..."></div>
                                <span className="m-1">Cargando documentos...</span>
                            </div>
                        ) : errorDocuments ? (
                            <p className="text-danger text-center">{errorDocuments}</p>
                        ) : documents.length > 0 ? (
                            <table className="documents-table">
                                <thead>
                                    <tr>
                                        <th>ID </th>
                                        <th>Documento</th>
                                        <th>Resumen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.map((document) => (
                                        <tr key={document.id}>
                                            <td>{document.id}</td>
                                            <td>{document.file_url}</td>
                                            <td>{document.summary}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500 text-center">No hay documentos disponibles para esta novedad.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Document;