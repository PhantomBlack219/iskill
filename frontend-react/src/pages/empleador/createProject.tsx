import React from 'react';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import { Link } from 'react-router-dom';

const CreateProyect = () => {
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
                                    <form id="project-form">
                                        <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label fw-bold">Nombre del Proyecto</label>
                                            <input type="text" id="nombre" name="nombre" className="form-control" placeholder="Ingresa el nombre del proyecto"  required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label fw-bold">Descripción del Proyecto</label>
                                            <textarea id="descripcion" name="descripcion" className="form-control" rows={3} placeholder="Ingresa una descripción del proyecto"  required />
                                        </div>
                                    </form>
                                </div>
                                <div className="gap-div">
                                    <Link to={"/employer/my-projects"} type="button" className="btn btn-delete action-btn">Cancelar</Link>
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