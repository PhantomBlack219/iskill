import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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

const ListProjects = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState<Proyecto[]>([]);
    const [reload, setReload] = useState(false);

    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        if (token === null) {
            navigate('/');
        } else {
            const fetchProjects = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/proyecto/list`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });

                    if (!response.ok) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error cargando los proyectos.'
                        })
                    } else {
                        const data = await response.json();
                        setProjects(data);
                    }
                } catch (e) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Error',
                        text: 'Ocurrió un error cargando los proyectos.'
                    })
                }
            }
            fetchProjects();
            console.log(projects);
        }
    }, []);

    const deleteProject = async (id: number) => {
        try {
            Swal.fire({
                icon: 'warning',
                title: '¿Estás seguro que deseas eliminar el proyecto?',
                text: 'No podrás revertir esta acción.',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if(result.isConfirmed){
                    const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/proyecto/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });
        
                    if (!response.ok) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error eliminando el proyecto. Intenta de nuevo.'
                        })
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Proyecto eliminado',
                            text: 'El proyecto ha sido eliminado exitosamente.'
                        })
                        reloadProyectos();
                    }
                }
            });
        } catch (e) {
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'Ocurrió un error cargando los proyectos.'
            })
        }
    }

    const reloadProyectos = () => {
        setReload(!reload);
    }

    return (
        <div className='wrapper'>
            <Navbar></Navbar>
            <Sidebar></Sidebar>

            <div className='content-wrapper'>
                <div className="main-content">
                    <div className="content-section">
                        {
                            projects.map((project) => (
                                <div className="card custom-card" key={project.proyecto_id}>
                                    <div className="card-body">
                                        <div className="card-top">
                                            <div className="card-title-section">
                                                <p className="card-title">{project.nombre}</p>
                                                <p className="card-subtitle">{project.descripcion}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }} className="card-actions">
                                            <button className="btn btn-delete action-btn" onClick={() => deleteProject(project.proyecto_id)}>Eliminar</button>
                                            <button className="btn btn-edit action-btn">Editar</button>
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

export default ListProjects;