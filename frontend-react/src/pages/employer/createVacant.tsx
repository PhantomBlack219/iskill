import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EnumType } from 'typescript';

interface TipoUsuario {
    tipo_usuario_id: number;
    nombre: string;
    descripcion: string;
}

interface Usuario {
    usuario_id: number;
    tipo_usuario_id: TipoUsuario;
    nombre: string;
    apellido: string;
    email: string;
    usuario: string;
    password: string;
    fecha_registro: Date;
    logros: string;
    objetivos_carrera: string;
}

interface Proyecto {
    proyecto_id: number;
    usuario_id: Usuario;
    nombre: string;
    descripcion: string;
}

interface Vacante {
    vacante_id: number;
    proyecto_id: Proyecto;
    nombre: string;
    descripcion: string;
    puestos_disponibles: number;
    puntos: number;
    estado: EnumType;
    fecha_inicio: Date;
    fecha_fin: Date;
}

const CreateVacant = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [reload, setReload] = useState(false);

    const token = localStorage.getItem('jwtToken');
    const usuario = localStorage.getItem('usuario');

    const usuarioJSON = usuario ? JSON.parse(usuario) : null;


    return (
        <div className='wrapper'>
            <Navbar></Navbar>
            <Sidebar></Sidebar>

            <div className='content-wrapper'>
                <div className="main-content">
                    <div className="gap-div justify-content-center">
                        <p className="bold-title">Creación y Edición de Vacantes</p>
                    </div>

                    <div className="content-section">
                        <div className="card custom-card project-form">
                            <div className="card-body">
                                <div className="card-top">
                                    <form id="project-form" onSubmit={(e) => {}}>
                                        <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label fw-bold">Nombre del Proyecto</label>
                                            <input type="text" id="nombre" name="nombre" className="form-control" placeholder="Ingresa el nombre del proyecto" required  />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label fw-bold">Descripción del Proyecto</label>
                                            <textarea id="descripcion" name="descripcion" className="form-control" rows={3} placeholder="Ingresa una descripción del proyecto" required  />
                                        </div>

                                        <div className="d-flex justify-content-center gap-3 mt-4">
                                            <button className="btn btn-primary btn-custom" type='submit'>Guardar</button>
                                            <Link to={"/employer/my-projects"} type="button" className="btn btn-danger">Cancelar</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateVacant;