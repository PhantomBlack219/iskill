import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { useParams } from 'react-router-dom';
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
    const { vacanteId } = useParams(); 
    const token = localStorage.getItem('jwtToken');
    const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);


    const fetchPostulaciones = async () => {
        try {
            console.log("Fetching postulaciones para la vacante con ID:", vacanteId);
            const response = await fetch('http://localhost:9000/api/postulacion/list', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Postulaciones obtenidas:", data);

                // Filtrar las postulaciones por el ID de la vacante
                const postulacionesVacante = data.filter((postulacion: Postulacion) => postulacion.vacante_id.vacante_id === Number(vacanteId));
                console.log("Postulaciones filtradas para la vacante:", postulacionesVacante);

                setPostulaciones(postulacionesVacante);
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

    const updatePostulacionEstado = async (postulacion: Postulacion, nuevoEstado: string) => {
        try {
      
            postulacion.estado = nuevoEstado;
            console.log(postulacion);
            const response = await fetch(`http://localhost:9000/api/postulacion`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(postulacion), 
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Estado actualizado',
                    text: `La postulación ha sido marcada como ${nuevoEstado}.`,
                });
                fetchPostulaciones(); // Recargar las postulaciones después de la actualización
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar estado',
                    text: 'Ocurrió un error al actualizar el estado de la postulación.',
                });
            }
        } catch (error) {
            console.log("Error al actualizar estado:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al actualizar el estado de la postulación.',
            });
        }
    };

    useEffect(() => {
        document.title = 'Postulaciones de la Vacante | iSkill';
        console.log("Componente cargado, obteniendo postulaciones...");
        if (vacanteId) {
            fetchPostulaciones();
        }
    }, [vacanteId]);

    const handleEstadoChange = (postulacion: Postulacion, nuevoEstado: string) => {
        updatePostulacionEstado(postulacion, nuevoEstado);
    };

    return (
        <div className='wrapper'>
            <Navbar />
            <Sidebar />

            <div className='content-wrapper'>
                <div className="main-content">
                    <div className="gap-div justify-content-center">
                        <p className="bold-title">Postulaciones de la Vacante</p>
                    </div>

                    <div className="content-section">
                        <div className="card custom-card project-form">
                            <div className="card-body">
                                <div className="vacantes-list mt-3">
                                    {postulaciones.length === 0 ? (
                                        <p>No hay postulaciones para esta vacante.</p>
                                    ) : (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Usuario postulado</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Fecha de registro</th>
                                                    <th scope="col">Fecha de Postulación</th>
                                                    <th scope="col">Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {postulaciones.map((postulacion) => (
                                                    <tr key={postulacion.postulacion_id}>
                                                        <td>{`${postulacion.usuario_id.nombre} ${postulacion.usuario_id.apellido}`}</td>
                                                        <td>{postulacion.usuario_id.email}</td>
                                                        <td>{new Date(postulacion.usuario_id.fecha_registro).toLocaleDateString()}</td>
                                                        <td>{new Date(postulacion.fecha_postulacion).toLocaleDateString()}</td>
                                                        <td>
                                                            <select
                                                                className="form-select"
                                                                value={postulacion.estado}
                                                                onChange={(e) => handleEstadoChange(postulacion, e.target.value)}
                                                            >
                                                                <option value="APLICADO">Aplicado</option>
                                                                <option value="SELECCIONADO">Aceptado</option>
                                                                <option value="RECHAZADO">Rechazado</option>
                                                            </select>
                                                        </td>
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
