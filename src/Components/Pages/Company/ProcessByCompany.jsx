import { useState, useEffect } from 'react'
import NavBar from '../../Common/Nav/Nav.jsx'
import ApiClient from '../../../Util/ApiClient/ApiClient.jsx'
import { toast } from 'react-hot-toast'
import Process from '../../Common/Cards/GetCompanies/Process.jsx'
import './ProcessByCompany.css'

const ProcessByCompany = () => {
    const [companies, setCompanies] = useState([])
    const [selectedCompanyId, setSelectedCompanyId] = useState('')
    const [loadingCompanies, setLoadingCompanies] = useState(true)
    const [errorCompanies, setErrorCompanies] = useState(null)

    useEffect(() => {
        const fetchCompanies = async () => {
            setLoadingCompanies(true);
            setErrorCompanies(null);
            try {
                const response = await ApiClient.get('/companies')
                setCompanies(response.data);
                if (response.data.length > 0) {
                    setSelectedCompanyId(response.data[0].id);
                }
            } catch (error) {
                setErrorCompanies("No se pudieron cargar las compañías. Intenta de nuevo más tarde.")
                toast.error("Error al cargar compañías.");
            } finally {
                setLoadingCompanies(false);
            }
        };
        fetchCompanies();
    }, []);

    const handleCompanySelectChange = (e) => {
        setSelectedCompanyId(e.target.value);
    };

    return (
        <>
            <div className="app-container">
                <NavBar />
                <div className="content-container">
                    <div className="company-select-container">
                        <h2 className="company-select-title">Compañías: </h2>
                        {loadingCompanies ? (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status" aria-label="Cargando..."></div>
                                <span className="m-1">Cargando compañías...</span>
                            </div>
                        ) : errorCompanies ? (
                            <p className="text-danger text-center">{errorCompanies}</p>
                        ) : companies.length > 0 ? (
                            <select
                                className="company-select-dropdown"
                                onChange={handleCompanySelectChange}
                                value={selectedCompanyId}
                            >
                                <option value="">-- Seleccionar --</option>
                                {companies.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p className="text-gray-500 text-center">No hay compañías disponibles para seleccionar.</p>
                        )}
                    </div>
                    {selectedCompanyId && !loadingCompanies && !errorCompanies && (
                        <div className="mt-8">
                            <Process
                             companyId={selectedCompanyId} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProcessByCompany;