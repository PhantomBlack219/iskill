import React, { FormEvent, useState } from 'react';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateProyect = () => {
    const navigate = useNavigate();
    
    const token = localStorage.getItem('jwtToken');
    const usuario = localStorage.getItem('usuario');

    const usuarioJSON = usuario ? JSON.parse(usuario) : null;
    
    const [project, setProject] = useState({
        usuario_id: usuario ? { usuario_id: usuarioJSON.usuario_id } : '',
        nombre: '',
        descripcion: ''
    });

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
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/proyecto`, {
                        method: 'POST',
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
                            text: 'Ocurrió un error guardando el proyecto.'
                        })
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Proyecto guardado',
                            text: 'El proyecto se ha guardado correctamente.'
                        }).then(() => {
                            navigate('/employer/my-projects');
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error guardando el proyecto.'
                    })
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
                    <div className="content-section">
                        <div className="card custom-card project-form">
                            <div className="card-body">
                                <div className="card-top">
                                    <form id="project-form" onSubmit={(e) => saveProject(e)}>
                                        <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label fw-bold">Nombre del Proyecto</label>
                                            <input type="text" id="nombre" name="nombre" className="form-control" placeholder="Ingresa el nombre del proyecto"  required onChange={onChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label fw-bold">Descripción del Proyecto</label>
                                            <textarea id="descripcion" name="descripcion" className="form-control" rows={3} placeholder="Ingresa una descripción del proyecto"  required onChange={onChange} />
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