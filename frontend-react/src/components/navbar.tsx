import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const usuario = localStorage.getItem('usuario');
    const usuarioJSON = usuario ? JSON.parse(usuario) : null;

    return (
        <div className="horizontal-navbar">
        
            <div className="nav-icons">
                
            </div>
            <div className="right-content">
                <div className="user-info">
                    <p id="nombre-usuario" style={{ margin: 0 }}>Hola, {usuarioJSON.nombre || ''}</p>
                    <p id="tipo-usuario" style={{ margin: 0 }}><strong>{usuarioJSON.tipo_usuario_id.nombre || ''}</strong></p>
                </div>
                <img src="/images/perfil.png" alt="Perfil" className="profile-img" />
            </div>
        </div>

    );
}

export default Navbar;