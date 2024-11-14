import React from 'react';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const CreateProyect = () => {

    const onClick = () => {
        window.location.href = '/empleador_list_proyecto.html';
    }
    return (
        <div className='wrapper'>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <div className='content-wrapper'>
                <div className="main-content">
                    <div className="content-section">
                        <div className="card custom-card project-form">
                            <div className="card-body">
                                <div className="card-top">
                                    <div className="mb-3">
                                        <p>Nombre del Proyecto</p>
                                        <input type="text" className="form-control full-width" id="nombre" placeholder="Nombre del Proyecto" />
                                        <p>Descripción del Proyecto</p>
                                        <textarea className="form-control full-width" id="descripcion" rows={3} placeholder="Descripción del Proyecto" defaultValue={""} />
                                    </div>
                                </div>
                                <div className="gap-div">
                                    <button className="btn btn-delete action-btn" onClick={onClick}>Cancelar</button>
                                    <button className="btn btn-details action-btn">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CreateProyect;