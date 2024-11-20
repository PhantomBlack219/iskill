import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => location.pathname === path;

    const logout = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Cerrando Sesión',
            text: 'Estás a punto de cerrar sesión. ¿Deseas continuar?',
            confirmButtonColor: '#dc3545',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Cerrar Sesión',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('usuario');
                navigate('/');
            }
        });
    };

    return (
        <div className="sidebar">
            <img src="/images/logo.png" alt="Logo" className="sidebar-logo" />
            {/* Línea decorada */}
            <div className="decorative-line"></div>
            <ul className="nav flex-column">
                <li className={`nav-item ${isActive("/employee/all-vacancies") ? "active" : ""}`}>
                    <Link className="nav-link" to={"/employee/all-vacancies"}>
                        <img
                            src="/images/misProyectos.png"
                            alt="Icono Desafíos"
                            className="nav-icon"
                            width={30}
                            height={30}
                        /> Vacantes Disponibles
                    </Link>
                </li>
                <li className={`nav-item ${isActive("/employee/my-applications") ? "active" : ""}`}>
                    <Link className="nav-link" to={"/employee/my-applications"}>
                        <img
                            src="/images/misProyectos.png"
                            alt="Icono Desafíos"
                            className="nav-icon"
                            width={30}
                            height={30}
                        /> Mis postulaciones
                    </Link>
                </li>
                <li className={`nav-item ${isActive("/employer/my-vacancies") ? "active" : ""}`}>
                    <Link className="nav-link" to={"/employer/my-vacancies"}>
                        <img
                            src="/images/misProyectos.png"
                            alt="Icono Desafíos"
                            className="nav-icon"
                            width={30}
                            height={30}
                        /> Proyectos
                    </Link>
                </li>
                <li className={`nav-item ${isActive("#") ? "active" : ""}`}>
                    <Link className="nav-link" to={"#"}>
                        <img
                            src="/images/configuracion.png"
                            alt="Icono Configuración"
                            className="nav-icon"
                            width={30}
                            height={30}
                        /> Configuración
                    </Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <p>iSkill, the Talent Bridge</p>
                <p>© 2024 All Rights Reserved</p>
                <button className="btn btn-danger" onClick={() => logout()}>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
