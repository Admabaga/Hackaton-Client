import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css';

export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="navbar-vertical-container">
            <nav className="navbar navbar-dark navbar-vertical">
                <div className="container-fluid flex-column align-items-start">
                    <div className="d-flex w-100 align-items-center justify-content-between d-lg-none mobile-header">
                        <button
                            className="navbar-toggler"
                            type="button"
                            onClick={toggleMobileMenu}
                            aria-expanded={mobileMenuOpen}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="d-none d-lg-flex flex-column align-items-center w-100 desktop-header">
                        <a className="navbar-brand mb-4" >HACKATON PROJECT</a>
                    </div>
                    <div className={`mobile-menu ${mobileMenuOpen ? 'show' : ''} d-lg-none w-100`}>
                        <ul className="navbar-nav flex-column w-100">
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                    to="/"
                                    end
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <i className="bi bi-house-door-fill me-2"></i> Inicio
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                    to="/companies"
                                    end
                                >
                                    <i className="bi bi-buildings me-2"></i> Compañias
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <div
                                    className={location.pathname.startsWith('/actions')
                                        ? "nav-link active pe-none"
                                        : "nav-link pe-none"
                                    }
                                    style={{ cursor: 'default' }}
                                >
                                    <i className={`bi bi-megaphone-fill text-warning me-2 ${location.pathname.startsWith('/actions') ? "text-primary" : ""}`}></i>
                                    Novedades
                                </div>
                            </li>
                            <li className="nav-item">
                                <div
                                    className={location.pathname.startsWith('/documents')
                                        ? "nav-link active pe-none"
                                        : "nav-link pe-none"
                                    }
                                    style={{ cursor: 'default' }}
                                >
                                    <i className={`bi bi-file-earmark-text-fill me-2 ${location.pathname.startsWith('/documents') ? "text-primary" : ""}`}></i>
                                    Documentos
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="d-none d-lg-flex flex-column w-100 desktop-menu">
                        <ul className="navbar-nav flex-column w-100">
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                    to="/"
                                    end
                                >
                                    <i className="bi bi-house-door-fill me-2"></i> Inicio
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "nav-link active" : "nav-link"
                                    }
                                    to="/companies"
                                    end
                                >
                                    <i className="bi bi-buildings me-2"></i> Compañias
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <div
                                    className={location.pathname.startsWith('/actions')
                                        ? "nav-link active pe-none"
                                        : "nav-link pe-none"
                                    }
                                    style={{ cursor: 'default' }}
                                >
                                    <i className={`bi bi-megaphone-fill text-warning me-2 ${location.pathname.startsWith('/actions') ? "text-primary" : ""}`}></i>
                                    Novedades
                                </div>
                            </li>
                            <li className="nav-item">
                                <div
                                    className={location.pathname.startsWith('/documents')
                                        ? "nav-link active pe-none"
                                        : "nav-link pe-none"
                                    }
                                    style={{ cursor: 'default' }}
                                >
                                    <i className={`bi bi-file-earmark-text-fill me-2 ${location.pathname.startsWith('/documents') ? "text-primary" : ""}`}></i>
                                    Documentos
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}