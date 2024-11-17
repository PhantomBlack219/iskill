import React, { FormEvent, useState } from 'react';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateProyect = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const token = localStorage.getItem('jwtToken');
    const usuario = localStorage.getItem('usuario');

    const usuarioJSON = usuario ? JSON.parse(usuario) : null;
    
    const [project, setProject] = useState(location.state?.project || {
        proyecto_id: '',
        usuario_id: usuario ? { usuario_id: usuarioJSON.usuario_id } : '',
        nombre: '',
        descripcion: ''
    });

    const { proyecto_id, usuario_id, nombre, descripcion } = project;

    const onChange = (e: any) => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    }

    const saveProject = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Estas seguro
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas guardar el proyecto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00667F',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                if(usuario_id === ''){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo obtener el usuario para crear el proyecto.',
                        confirmButtonColor: '#00667F'
                    });
                } else {
                    const requestMethod = proyecto_id === '' ? 'POST' : 'PUT';
                    try {
                        const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/proyecto`, {
                            method: requestMethod,
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(project)
                        });
            
                        if (!response.ok) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ocurrió un error guardando el proyecto.',
                                confirmButtonColor: '#00667F'
                            })
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Proyecto guardado',
                                text: 'El proyecto se ha guardado correctamente.',
                                confirmButtonColor: '#00667F'
                            }).then(() => {
                                navigate('/employer/my-projects');
                            });
                        }
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error guardando el proyecto.',
                            confirmButtonColor: '#00667F'
                        })
                    }
                }
            }
        });
    }
    
    return (
        <div className='wrapper'>
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <div className='content-wrapper'>
                <div className="main-content">
                    <div className="gap-div justify-content-center">
                        <p className="bold-title">Creación y Edición de Proyectos</p>
                    </div>
                    <div className="content-section">
                        <div className="card custom-card project-form">
                            <div className="card-body">
                                <div className="card-top">
                                    <form id="project-form" onSubmit={(e) => saveProject(e)}>
                                        <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label fw-bold">Nombre del Proyecto</label>
                                            <input type="text" id="nombre" name="nombre" className="form-control" placeholder="Ingresa el nombre del proyecto" value={nombre} required onChange={onChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label fw-bold">Descripción del Proyecto</label>
                                            <textarea id="descripcion" name="descripcion" className="form-control" rows={3} placeholder="Ingresa una descripción del proyecto" value={descripcion} required onChange={onChange} />
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

export default CreateProyect;