import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <img src="/images/logo.png" alt="Logo" className="sidebar-logo" />
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link" to={"#"}>
                        <img src="/images/dashboard.png" alt="Icono Dashboard" className="nav-icon" width={30} height={30} /> Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/employer/my-projects"}>
                        <img src="/images/misProyectos.png" alt="Icono Desafíos" className="nav-icon" width={30} height={30} /> Mis Proyectos
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"/employer/my-vacancies"}>
                        <img src="/images/misProyectos.png" alt="Icono Desafíos" className="nav-icon" width={30} height={30} /> Mis Vacantes
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={"#"}>
                        <img src="/images/configuracion.png" alt="Icono Configuración" className="nav-icon" width={30} height={30} /> Configuración
                    </Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <p>iSkill, the Talent Bridge</p>
                <p>© 2024 All Rights Reserved</p>
            </div>
        </div>


    );
}

export default Sidebar;