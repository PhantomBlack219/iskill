import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { Link, useNavigate } from 'react-router-dom';
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

    const [vacancies, setVacancies] = useState<Vacante[]>([]);
    const [reload, setReload] = useState(false);

    const token = localStorage.getItem('jwtToken');


    return ( 
        <div className='wrapper'>
            <Navbar></Navbar>
            <Sidebar></Sidebar>

            <div className='content-wrapper'>
                <div className="main-content">
                    <div className="gap-div">
                        <p className="bold-title">Mis Vacantes</p>
                        <div style={{ display: 'flex', justifyContent: 'center' }} className="gap-div-2">
                            <Link to={"/employer/create-project"}>
                                <img src="/images/crear.png" alt="Icono Crear" className="create-icon" />
                            </Link>
                            <div><p className="bold-title">Crear Vacante</p></div>
                        </div>
                    </div>

                    <div className="content-section">
                        {
                            vacancies.map((vacant) => (
                                <div className="card custom-card" key={vacant.vacante_id}>
                                    <div className="card-body">
                                        <div className="card-top">
                                            <div className="card-title-section">
                                                <p className="card-title">{vacant.nombre}</p>
                                                <p className="card-subtitle">{vacant.descripcion}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }} className="card-actions">
                                            <button className="btn btn-primary btn-custom" >Editar</button>
                                            <button className="btn btn-danger" >Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CreateVacant;