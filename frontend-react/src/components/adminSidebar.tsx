import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminSidebar = () => {
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
    }

    return (
        <div className="sidebar">
            <img src="/images/logo.png" alt="Logo" className="sidebar-logo" />
            <ul className="nav flex-column">
                <li className={`nav-item ${isActive("#") ? "active" : ""}`}>
                    <Link className="nav-link" to={"#"}>
                        <img
                            src="/images/dashboard.png"
                            alt="Icono Dashboard"
                            className="nav-icon"
                            width={30}
                            height={30}
                        /> Dashboard
                    </Link>
                </li>
                <li className={`nav-item ${isActive("/admin/all-projects") ? "active" : ""}`}>
                    <Link className="nav-link" to={"/admin/all-projects"}>
                        <img
                            src="/images/misProyectos.png"
                            alt="Icono Desafíos"
                            className="nav-icon"
                            width={30}
                            height={30}
                        /> Todos los Proyectos
                    </Link>
                </li>
                <li className={`nav-item ${isActive("/admin/all-vacancies") ? "active" : ""}`}>
                    <Link className="nav-link" to={"/admin/all-vacancies"}>
                        <img
                            src="/images/misProyectos.png"
                            alt="Icono Desafíos"
                            className="nav-icon"
                            width={30}
                            height={30}
                        /> Todas las Vacantes
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

export default AdminSidebar;
