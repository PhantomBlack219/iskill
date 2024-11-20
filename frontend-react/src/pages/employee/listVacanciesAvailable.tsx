import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar from '../../components/sidebarEmployee';
import Navbar from '../../components/navbar';

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
    habilididadesUsuario: any[];
    enabled: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
    username: string;
    authorities: { authority: string }[];
    accountNonLocked: boolean;
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
    habilidadesVacantes: any[];
}

interface Postulacion {
    postulacion_id: number;
    usuario_id: Usuario;
    vacante_id: Vacante;
    estado: string;
    fecha_postulacion: Date;
}

const ListVacancies = () => {
    const navigate = useNavigate();
    const [vacancies, setVacancies] = useState<Vacante[]>([]);
    const [postulacionesUsuario, setPostulacionesUsuario] = useState<Postulacion[]>([]);
    const token = localStorage.getItem('jwtToken');
    const usuario = localStorage.getItem('usuario');
    const usuarioJSON = usuario ? JSON.parse(usuario) : null;

    useEffect(() => {
        if (token) {
            const fetchVacancies = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/vacante/list`, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const data = await response.json();
                    setVacancies(data);
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudieron cargar las vacantes.'
                    });
                }
            };

            const fetchPostulaciones = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/postulacion/list`, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const data = await response.json();
                    const postulaciones = data.filter((postulacion: Postulacion) => postulacion.usuario_id.usuario_id === usuarioJSON?.usuario_id);
                    setPostulacionesUsuario(postulaciones);
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudieron cargar las postulaciones.'
                    });
                }
            };

            fetchVacancies();
            fetchPostulaciones();
        }
    }, [token, usuarioJSON]);

    const postularse = async (vacante: Vacante) => {
        const alreadyApplied = postulacionesUsuario.some(postulacion => postulacion.vacante_id.vacante_id === vacante.vacante_id);

        if (alreadyApplied) {
            Swal.fire({
                icon: 'info',
                title: 'Ya te has postulado',
                text: 'Ya te has postulado para esta vacante.'
            });
            return;
        }

        if (vacante.puestos_disponibles > 0) {
            try {
                const postulacion: Postulacion = {
                    postulacion_id: 0,
                    usuario_id: usuarioJSON, 
                    vacante_id: vacante, 
                    estado: 'APLICADO', 
                    fecha_postulacion: new Date() 
                };

                
                const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/postulacion`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postulacion),
                });

                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al realizar la postulación.'
                    });
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Postulación exitosa',
                        text: 'Te has postulado con éxito a esta vacante.'
                    });
                    // Actualizar postulaciones 
                    setPostulacionesUsuario([...postulacionesUsuario, postulacion]);
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al procesar la postulación.'
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Sin puestos disponibles',
                text: 'Lo sentimos, no hay puestos disponibles para esta vacante.'
            });
        }
    };

    return (
        <div className='wrapper'>
            <Navbar />
            <Sidebar />
            <div className='content-wrapper'>
                <div className='main-content'>
                    <div className="gap-div justify-content-center">
                        <p className="bold-title">Vacantes disponibles</p>
                    </div>

                    <div className='content-section'>
                        {vacancies.map((vacante) => (
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
                                        <div className="date-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <p style={{ paddingRight: '1rem' }}>Inicio de convocatoria:</p>
                                            <p className="bold-text">{vacante.fecha_inicio.toString()}</p>
                                        </div>
                                        <div className="date-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <p style={{ paddingRight: '1rem' }}>Fin de convocatoria:</p>
                                            <p className="bold-text">{vacante.fecha_fin.toString()}</p>
                                        </div>
                                    </div>
                                    <div className="card-extra">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <p style={{ paddingRight: '1rem' }}>Proyecto:</p>
                                            <p className="gray-text">{vacante.proyecto_id.nombre}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <p style={{ paddingRight: '1rem' }}>Creado por:</p>
                                            <p className="gray-text">{vacante.proyecto_id.usuario_id.nombre}</p>
                                        </div>
                                    </div>
                                    <div className="card-extra">
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <p style={{ paddingRight: '1rem' }}>Puestos Disponibles:</p>
                                            <p className="bold-text">{vacante.puestos_disponibles}</p>
                                        </div>
                                    </div>
                                    <div className="card-actions" style={{ display: 'flex', justifyContent: 'center' }}>
                                        <button className="btn btn-primary btn-custom" onClick={() => postularse(vacante)}>Postularse</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListVacancies;
