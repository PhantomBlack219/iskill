import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Swal from 'sweetalert2';

enum EstadoVacante {
    BUSCANDO,
    EN_PROCESO,
    FINALIZADO
}

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
    estado: EstadoVacante;
    fecha_inicio: Date;
    fecha_fin: Date;
}

type vacantCounts = Record<string, {postulaciones: number, seleccionados: number}>;

const ListVacancies = () => {
    const navigate = useNavigate();

    const [vacancies, setVacancies] = useState<Vacante[]>([]);
    const [vacantCounts, setvacantCounts] = useState<vacantCounts>({});
    const [reload, setReload] = useState(false);

    const token = localStorage.getItem('jwtToken');
    const decodedToken = token ? jwtDecode<JwtPayload>(token) : null;

    const usuario = localStorage.getItem('usuario');

    const usuarioJSON = usuario ? JSON.parse(usuario) : null;

    useEffect(() => {
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
                const fetchVacancies = async () => {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/vacante/usuario_id/${usuarioJSON.usuario_id}`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                        });

                        if (!response.ok) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ocurrió un error cargando las vacantes.'
                            })
                        } else {
                            const data = await response.json();
                            setVacancies(data);
                        }
                    } catch (e) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Error',
                            text: 'Ocurrió un error cargando las vacantes.'
                        })
                    }
                }
                fetchVacancies();
            }
        }
        fetchCountPostulacion();
    }, [navigate, reload, token]);

    const deleteVacante = async (id: number) => {
        try {
            Swal.fire({
                icon: 'warning',
                title: '¿Estás seguro que deseas eliminar la vacante?',
                text: 'No podrás revertir esta acción.',
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/vacante/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });

                    if (!response.ok) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error eliminando la vacante. Intenta de nuevo.',
                            confirmButtonColor: '#00667F'
                        })
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Vacante eliminada',
                            text: 'La vacante ha sido eliminada exitosamente.',
                            confirmButtonColor: '#00667F'
                        })
                        // Refresh projects
                        reloadVacantes();
                    }
                }
            });
        } catch (e) {
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'Ocurrió un error cargando las vacantes.',
                confirmButtonColor: '#00667F'
            })
        }
    }

    const editVacante = (vacant: Vacante) => {
        navigate(
            '/employer/create-vacant',
            {
                state: { vacant: vacant }
            }
        )
    }

    const fetchCountPostulacion = async () => {
        try {
            const counts: vacantCounts = {}

            await Promise.all(
                vacancies.map(async (vacante) => {
                    const postulacionesCountResponse = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/postulacion/count/vacante/${vacante.vacante_id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });

                    const postulacionesCountSeleccionadoResponse = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/postulacion/count/estado/SELECCIONADO/vacante/${vacante.vacante_id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    });

                    if(postulacionesCountResponse.ok && postulacionesCountSeleccionadoResponse.ok) {
                        const postulaciones: number = await postulacionesCountResponse.json();
                        const seleccionados: number = await postulacionesCountSeleccionadoResponse.json();

                        counts[vacante.vacante_id] = {postulaciones, seleccionados};
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error contando las postulaciones de vacantes.'
                        })
                    }
                })
            )
            console.log(counts);
            setvacantCounts(counts);
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error contando las postulaciones de vacantes.'
            })
        }
    }

    const reloadVacantes = () => {
        setReload(!reload);
    }

    return (
        <div className='wrapper'>
            <Navbar></Navbar>
            <Sidebar></Sidebar>

            <div className='content-wrapper'>
                <div className='main-content'>
                    <div className="gap-div">
                        <p className="bold-title">Mis Vacantes</p>
                        <div className="gap-div-2">
                            <Link to={"/employer/create-vacant"}>
                                <img src="/images/crear.png" alt="Icono Crear" className="create-icon" />
                            </Link>
                            <div><p className="bold-title">Crear Vacantes</p></div>
                        </div>
                    </div>

                    <div className='content-section'>
                        {
                            vacancies.map((vacante) => (
                                <div className="card custom-card" key={vacante.vacante_id}>
                                    <div className="card-body" data-id={vacante.vacante_id}>
                                        <div className="card-top">
                                            <div className="status-badge">
                                                {vacante.estado}
                                            </div>
                                            <div className="card-title-section">
                                                <p className="card-title">{vacante.nombre}</p>
                                                <p className="card-subtitle">{vacante.descripcion}</p>
                                            </div>
                                        </div>
                                        <div className="card-details">
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="date-info">
                                                <p style={{ paddingRight: '1rem' }}>Inicio de convocatoria:</p>
                                                <p className="bold-text">{vacante.fecha_inicio.toString()}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="date-info">
                                                <p style={{ paddingRight: '1rem' }}>Fin de convocatoria:</p>
                                                <p className="bold-text">{vacante.fecha_fin.toString()}</p>
                                            </div>
                                        </div>
                                        <div className="card-extra">
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <p style={{ paddingRight: '1rem' }}>Proyecto:</p>
                                                <p className="gray-text">{vacante.proyecto_id.nombre}</p>
                                            </div>
                                        </div>
                                        <div className="card-extra">
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <p style={{ paddingRight: '1rem' }}>Puestos Disponibles:</p>
                                                <p className="bold-text">{vacante.puestos_disponibles}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <p style={{ paddingRight: '1rem' }}>Aplicaciones: </p>
                                                <p className="bold-text">{vacantCounts[vacante.vacante_id]?.postulaciones ?? 'Cargando...'}</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <p style={{ paddingRight: '1rem' }}>Seleccionados: </p>
                                                <p className="bold-text">{vacantCounts[vacante.vacante_id]?.seleccionados ?? 'Cargando...'}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center' }} className="card-actions">
                                            <button className="btn btn-primary btn-custom" onClick={() => editVacante(vacante)}>Editar</button>
                                            <button className="btn btn-danger" onClick={() => deleteVacante(vacante.vacante_id)}>Eliminar</button>
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

export default ListVacancies;