import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="horizontal-navbar">
            <input type="text" placeholder="Buscar..." className="search-bar" />
            <div className="nav-icons">
                <Link to={"#"}><img src="/images/notificaciones.png" alt="Notificaciones" className="top-nav-icon" width={30} height={30} /></Link>
                <Link to={"#"}><img src="/images/mensajes.png" alt="Mensajes" className="top-nav-icon" width={30} height={30} /></Link>
            </div>
            <div className="right-content">
                <div className="user-info">
                    <p id="nombre-usuario">Hola, Nombre</p>
                    <p id="tipo-usuario" />
                </div>
                <img src="/images/perfil.png" alt="Perfil" className="profile-img" />
            </div>
        </div>

    );
}

export default Navbar;