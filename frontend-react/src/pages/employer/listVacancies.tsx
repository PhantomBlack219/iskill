import React from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { Link } from 'react-router-dom';

const ListVacancies = () => {
    return (
        <div className='wrapper'>
            <Navbar></Navbar>
            <Sidebar></Sidebar>

            <div className='content-wrapper'>
                <div className='main-content'>
                    <div className="gap-div">
                        <p className="bold-title">Mis Vacantes</p>
                        <div className="gap-div-2">
                            <Link to={"#"}>
                                <img src="/images/crear.png" alt="Icono Crear" className="create-icon" />
                            </Link>
                            <div><p className="bold-title">Crear Vacantes</p></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ListVacancies;