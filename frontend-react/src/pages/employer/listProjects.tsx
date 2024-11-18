import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jwtDecode, JwtPayload } from 'jwt-decode';

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
    const decodedToken = token ? jwtDecode<JwtPayload>(token) : null;
    
    const usuario = localStorage.getItem('usuario');

    const usuarioJSON = usuario ? JSON.parse(usuario) : null;

    useEffect(() => {
        document.title = 'Mis Proyectos | iSkill';
        if (decodedToken !== null) {
            let currentDate = new Date();
            if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Sesión expirada',
                    text: 'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.',
                    confirmButtonColor: '#00667F',
                }).then(() => {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('usuario');
                    navigate('/');
                });
            } else {
                const fetchProjects = async () => {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/proyecto/usuario_id/${usuarioJSON.usuario_id}`, {
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
            }
        }
    }, [navigate, reload, token]);

    const deleteProject = async (id: number) => {
        try {
            Swal.fire({
                icon: 'warning',
                title: '¿Estás seguro que deseas eliminar el proyecto?',
                text: 'No podrás revertir esta acción.',
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
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
                            text: 'Ocurrió un error eliminando el proyecto. Intenta de nuevo.',
                            confirmButtonColor: '#00667F'
                        })
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Proyecto eliminado',
                            text: 'El proyecto ha sido eliminado exitosamente.',
                            confirmButtonColor: '#00667F'
                        })
                        // Refresh projects
                        reloadProyectos();
                    }
                }
            });
        } catch (e) {
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'Ocurrió un error cargando los proyectos.',
                confirmButtonColor: '#00667F'
            })
        }
    }

    const editProject = (project: Proyecto) => {
        navigate(
            '/employer/create-project',
            {
                state: { project: project }
            }
        )
    }

    // Reloads projects when required
    const reloadProyectos = () => {
        setReload(!reload);
    }

    return (
        <div className='wrapper'>
            <Navbar></Navbar>
            <Sidebar></Sidebar>

            <div className='content-wrapper'>
                <div className="main-content">
                    <div className="gap-div">
                        <p className="bold-title">Mis Proyectos</p>
                        <div style={{ display: 'flex', justifyContent: 'center' }} className="gap-div-2">
                            <Link to={"/employer/create-project"}>
                                <img src="/images/crear.png" alt="Icono Crear" className="create-icon" />
                            </Link>
                            <div><p className="bold-title">Crear Proyecto</p></div>
                        </div>
                    </div>

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
                                            <button className="btn btn-primary btn-custom" onClick={() => editProject(project)}>Editar</button>
                                            <button className="btn btn-danger" onClick={() => deleteProject(project.proyecto_id)}>Eliminar</button>
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