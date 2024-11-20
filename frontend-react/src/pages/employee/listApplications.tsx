import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebarEmployee';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

interface Vacante {
    vacante_id: number;
    nombre: string;
    descripcion: string;
    puntos: number;
}

interface Usuario {
    usuario_id: number;
    nombre: string;
    apellido: string;
    email: string;
    usuario: string;
    logros: string;
    objetivos_carrera: string;
    fecha_registro: Date;
}

interface Postulacion {
    postulacion_id: number;
    usuario_id: Usuario;
    vacante_id: Vacante;
    estado: string;
    fecha_postulacion: Date;
}

const UserApplications = () => {
    const token = localStorage.getItem('jwtToken');
    const usuario = localStorage.getItem('usuario');
    const usuarioJSON = usuario ? JSON.parse(usuario) : null;

    const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);

    const fetchPostulaciones = async () => {
        try {
            console.log("Fetching todas las postulaciones...");
            const response = await fetch('http://localhost:9000/api/postulacion/list', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Postulaciones obtenidas:", data);

                
                const postulacionesUsuario = data.filter((postulacion: Postulacion) => postulacion.usuario_id.usuario_id === usuarioJSON?.usuario_id);
                console.log("Postulaciones filtradas para el usuario:", postulacionesUsuario);
                
                setPostulaciones(postulacionesUsuario);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al obtener las postulaciones',
                    text: 'Ocurrió un error al obtener las postulaciones. Inténtalo de nuevo.',
                });
            }
        } catch (error) {
            console.log("Error al obtener postulaciones:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al obtener las postulaciones. Inténtalo de nuevo.',
            });
        }
    };

    useEffect(() => {
        document.title = 'Mis Postulaciones | iSkill';
        console.log("Componente cargado, obteniendo postulaciones...");
        fetchPostulaciones();
    }, []);

    console.log("Postulaciones actuales en el estado:", postulaciones);

    return (
        <div className='wrapper'>
            <Navbar />
            <Sidebar />

            <div className='content-wrapper'>
                <div className="main-content">
                    <div className="gap-div justify-content-center">
                        <p className="bold-title">Mis Postulaciones</p>
                    </div>

                    <div className="content-section">
                        <div className="card custom-card project-form">
                            <div className="card-body">
                                <div className="vacantes-list mt-3">
                                    {postulaciones.length === 0 ? (
                                        <p>No tienes postulaciones realizadas.</p>
                                    ) : (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Vacante</th>
                                                    <th scope="col">Estado</th>
                                                    <th scope="col">Fecha de Postulación</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {postulaciones.map((postulacion) => (
                                                    <tr key={postulacion.postulacion_id}>
                                                        <td>{postulacion.vacante_id.nombre}</td>
                                                        <td>{postulacion.estado}</td>
                                                        <td>{new Date(postulacion.fecha_postulacion).toLocaleDateString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserApplications;
