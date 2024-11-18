import React, { FormEvent, useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface Habilidad {
    habilidad_id: number;
    nombre_habilidad: string;
}

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

const CreateVacant = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const token = localStorage.getItem('jwtToken');
    const usuario = localStorage.getItem('usuario');

    const usuarioJSON = usuario ? JSON.parse(usuario) : null;

    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [habilidades, setHabilidades] = useState<Habilidad[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const [vacante, setVacante] = useState<Vacante>(location.state?.vacant || {
        vacante_id: 0,
        proyecto_id: {
            proyecto_id: 0,
            usuario_id: {
                usuario_id: 0,
                tipo_usuario_id: {
                    tipo_usuario_id: 0,
                    nombre: '',
                    descripcion: ''
                },
                nombre: '',
                apellido: '',
                email: '',
                usuario: '',
                password: '',
                fecha_registro: new Date(),
                logros: '',
                objetivos_carrera: ''
            },
            nombre: '',
            descripcion: ''
        },
        nombre: '',
        descripcion: '',
        puestos_disponibles: 0,
        puntos: 0,
        estado: EstadoVacante.BUSCANDO,
        fecha_inicio: new Date(),
        fecha_fin: new Date()
    });

    const onProyectoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setVacante({
            ...vacante,
            proyecto_id: {
                proyecto_id: parseInt(e.target.value),
                usuario_id: {
                    usuario_id: 0,
                    tipo_usuario_id: {
                        tipo_usuario_id: 0,
                        nombre: '',
                        descripcion: ''
                    },
                    nombre: '',
                    apellido: '',
                    email: '',
                    usuario: '',
                    password: '',
                    fecha_registro: new Date(),
                    logros: '',
                    objetivos_carrera: ''
                },
                nombre: '',
                descripcion: ''
            }
        });
    };

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const habilidadId = parseInt(value);

        // if (checked) {
        //     setSelectedHabilidades([...selectedHabilidades, habilidades.find(habilidad => habilidad.habilidad_id === habilidadId)!]);
        // } else {
        //     setSelectedHabilidades(selectedHabilidades.filter(habilidad => habilidad.habilidad_id !== habilidadId));
        // }
        if (checked) {
            // Add habilidad_id to selectedHabilidades if it's checked
            setSelectedIds((prevSelected) => [...prevSelected, habilidadId]);
        } else {
            // Remove habilidad_id from selectedHabilidades if it's unchecked
            setSelectedIds((prevSelected) =>
                prevSelected.filter((id) => id !== habilidadId)
            );
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setVacante({
            ...vacante,
            [e.target.name]: e.target.value
        });
    };

    const saveVacant = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas guardar la vacante?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00667F',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (vacante.proyecto_id.proyecto_id === 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Debes seleccionar un proyecto para la vacante.',
                        confirmButtonColor: '#00667F'
                    });
                } else {
                    const requestMethod = vacante.vacante_id === 0 ? 'POST' : 'PUT';
                    try {
                        const response = await fetch('http://localhost:9000/api/vacante', {
                            method: requestMethod,
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(vacante)
                        });

                        if (response.ok) {
                            const data = await response.json();

                            const json = JSON.stringify(selectedIds.map(habilidad => ({
                                habilidad: { habilidad_id: habilidad },
                                vacante: { vacante_id: data.vacante_id }
                            })));

                            const habilidadesResponse = await fetch('http://localhost:9000/api/habilidad_vacante/createHabilidades', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                },
                                body: json
                            });

                            if (habilidadesResponse.ok) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Vacante guardada',
                                    text: 'La vacante se ha guardado correctamente.',
                                    confirmButtonColor: '#00667F'
                                }).then(() => {
                                    navigate('/employer/my-vacancies');
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Ocurrió un error al guardar las habilidades. Edita tu vacante con las habilidades.',
                                    confirmButtonColor: '#00667F'
                                }).then(() => {
                                    navigate('/employer/my-vacancies');
                                });
                            }
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ocurrió un error al guardar la vacante. Inténtalo de nuevo.',
                                confirmButtonColor: '#00667F'
                            });
                        }
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Ocurrió un error al guardar la vacante. Inténtalo de nuevo.',
                            confirmButtonColor: '#00667F'
                        });
                    }
                }
            }
        });
    }

    useEffect(() => {
        document.title = 'Crear Vacante | iSkill';
        const fetchProyectos = async () => {
            const response = await fetch(`http://localhost:9000/api/proyecto/usuario_id/${usuarioJSON.usuario_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProyectos(data);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al obtener los proyectos',
                    text: 'Ocurrió un error al obtener los proyectos. Inténtalo de nuevo.'
                });
            }
        };

        const fetchHabilidades = async () => {
            const response = await fetch('http://localhost:9000/api/habilidad/list', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setHabilidades(data);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al obtener las habilidades',
                    text: 'Ocurrió un error al obtener las habilidades. Inténtalo de nuevo.'
                });
            }
        }

        if(location.state?.vacant) {
            const fetchHabilidadesVacante = async () => {
                const response = await fetch(`http://localhost:9000/api/habilidad_vacante/vacante/${location.state.vacant.vacante_id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const selectedIds = data.map((hv: any) => hv.habilidad.habilidad_id);
                    setSelectedIds(selectedIds);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al obtener las habilidades',
                        text: 'Ocurrió un error al obtener las habilidades. Inténtalo de nuevo.'
                    });
                }
            };

            fetchHabilidadesVacante();
        }

        fetchProyectos();
        fetchHabilidades();
    }, []);

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
                                    <form id="project-form" onSubmit={(e) => { saveVacant(e) }}>
                                        <div className="flex-grow-1 mb-3">
                                            <label htmlFor="tipo-usuario" className="form-label fw-bold">Selecciona el Proyecto para la vacante</label>
                                            <div className="input-group">
                                                <select
                                                    name="tipo-usuario"
                                                    className="form-control"
                                                    value={vacante.proyecto_id.proyecto_id}
                                                    onChange={(e) => { onProyectoChange(e) }}
                                                    required
                                                >
                                                    <option value="">Seleccionar proyecto...</option>
                                                    {
                                                        proyectos.map((proyecto) => (
                                                            <option key={proyecto.proyecto_id} value={proyecto.proyecto_id}>
                                                                {proyecto.nombre}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label fw-bold">Nombre de la Vacante</label>
                                            <input type="text" id="nombre" name="nombre" className="form-control" value={vacante.nombre} onChange={(e) => onChange(e)} placeholder="Ingresa el nombre de la vacante..." required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label fw-bold">Descripción de la Vacante</label>
                                            <textarea id="descripcion" name="descripcion" className="form-control" rows={3} value={vacante.descripcion} onChange={(e) => onChange(e)} placeholder="Ingresa una descripción para la vacante..." required />
                                        </div>

                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="puestos_disponibles" className="form-label fw-bold">Puestos Disponibles</label>
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        id="puestos_disponibles"
                                                        name="puestos_disponibles"
                                                        className="form-control"
                                                        placeholder="Ingresa los puestos..."
                                                        value={vacante.puestos_disponibles}
                                                        onChange={(e) => onChange(e)}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="puntos" className="form-label fw-bold">Puntos a Otorgar</label>
                                                <div className="input-group">
                                                    <input
                                                        type="number"
                                                        id="puntos"
                                                        name="puntos"
                                                        className="form-control"
                                                        placeholder="Ingresa los puntos..."
                                                        value={vacante.puntos}
                                                        onChange={(e) => onChange(e)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row g-3 mb-3">
                                            <div className="col-md-6">
                                                <label htmlFor="fecha_inicio" className="form-label fw-bold">Fecha de Inicio</label>
                                                <div className="input-group">
                                                    <input
                                                        type="date"
                                                        id="fecha_inicio"
                                                        name="fecha_inicio"
                                                        className="form-control"
                                                        value={vacante.fecha_inicio.toLocaleString().split('T')[0]}
                                                        onChange={(e) => onChange(e)}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="usuario" className="form-label fw-bold">Fecha de Finalización</label>
                                                <div className="input-group">
                                                    <input
                                                        type="date"
                                                        id="fecha_fin"
                                                        name="fecha_fin"
                                                        className="form-control"
                                                        value={vacante.fecha_fin.toLocaleString().split('T')[0]}
                                                        onChange={(e) => onChange(e)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Habilitades Requeridas</label>
                                            {habilidades.map((habilidad) => (
                                                <div key={habilidad.habilidad_id} className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={habilidad.habilidad_id}
                                                        id={`habilidad-${habilidad.habilidad_id}`}
                                                        checked={selectedIds.includes(habilidad.habilidad_id)}
                                                        onChange={(e) => onCheckboxChange(e)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`habilidad-${habilidad.habilidad_id}`}>
                                                        {habilidad.nombre_habilidad}
                                                    </label>
                                                </div>
                                            ))}
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