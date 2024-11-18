import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';

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

const Register = () => {
    const navigate = useNavigate();

    const [tipoUsuarios, setTipoUsuarios] = useState<TipoUsuario[]>([]);
    const [usuario, setUsuario] = useState<Usuario>({
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
    });
    const [formData, setFormData] = useState({ password: '', confirm_password: '' });

    useEffect(() => {
        document.title = 'Registro | iSkill';
        const fetchTipoUsuarios = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/tipo_usuario/list`);
                const data = await response.json();
                const filteredData = data.filter((tipo: TipoUsuario) => tipo.tipo_usuario_id !== 1);
                setTipoUsuarios(filteredData);
            } catch (e) {
                console.error(e);
            }
        }

        fetchTipoUsuarios();
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onTipoUsuarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUsuario({
            ...usuario,
            tipo_usuario_id: { tipo_usuario_id: parseInt(e.target.value), nombre: '', descripcion: '' }
        });
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las contraseñas no coinciden.'
            });
            return;
        }

        register();
    };

    const register = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/usuario/check_usuario/${usuario.usuario}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error verificando el nombre de usuario.'
                });
                return;
            } else {
                const data = await response.json();
                if (data === false) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El nombre de usuario ya existe. Por favor, elige otro.'
                    });
                    return;
                } else {
                    try {
                        usuario.fecha_registro = new Date();

                        const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/auth/register`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(usuario)
                        });

                        if (!response.ok) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Error al registrar usuario.'
                            });
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Usuario registrado',
                                text: 'Usuario registrado exitosamente.'
                            }).then(() => {
                                navigate('/');
                            });
                        }
                    } catch (e) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error al registrar usuario.'
                        });
                    }
                }
            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error verificando el nombre de usuario.'
            });
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className="bg-custom shadow overflow-hidden w-100" style={{ maxWidth: 1200 }}>
                <div className="row g-0">
                    <div className='col-lg p-3'>
                        <div className="logo-container" style={{ textAlign: 'center', marginBottom: 20 }}>
                            <img src="/images/logo.png" alt="iSkill Logo" className="logo" style={{ width: 100 }} />
                        </div>
                        <h3 className="fw-bold mt-3 mb-3 text-center">Registro de Usuario</h3>

                        <form id="registration-form" onSubmit={onSubmit}>
                            <div className='user-details'>
                                <div className="d-flex gap-3">
                                    <div className="flex-grow-1 mb-3">
                                        <label htmlFor="nombre" className="form-label fw-bold">Nombre</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                className="form-control"
                                                placeholder="Ingresa tu nombre"
                                                onChange={(e) => onChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-grow-1 mb-3">
                                        <label htmlFor="apellido" className="form-label fw-bold">Apellido</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="apellido"
                                                name="apellido"
                                                className="form-control"
                                                placeholder="Ingresa tu apellido"
                                                onChange={(e) => onChange(e)}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex gap-3">
                                    <div className="flex-grow-1 mb-3">
                                        <label htmlFor="email" className="form-label fw-bold">Correo Electrónico</label>
                                        <div className="input-group">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Ingresa tu correo electrónico"
                                                onChange={(e) => onChange(e)}
                                                required
                                            />
                                            <span className="input-group-text">
                                                <Icon icon="mdi:email" className="text-muted" />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-grow-1 mb-3">
                                        <label htmlFor="usuario" className="form-label fw-bold">Nombre de Usuario</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="usuario"
                                                name="usuario"
                                                className="form-control"
                                                placeholder="Ingresa un usuario"
                                                onChange={(e) => onChange(e)}
                                                required
                                            />
                                            <span className="input-group-text">
                                                <Icon icon="mdi:person" className="text-muted" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex gap-3">
                                    <div className="flex-grow-1 mb-3">
                                        <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Ingresa una contraseña"
                                                onChange={(e) => onChange(e)}
                                                required
                                            />
                                            <span className="input-group-text">
                                                <Icon icon="mdi:lock" className="text-muted" />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-grow-1 mb-3">
                                        <label htmlFor="confirm_password" className="form-label fw-bold">Confirmar Contraseña</label>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                id="confirm_password"
                                                name="confirm_password"
                                                className="form-control"
                                                placeholder="Confirma la contraseña"
                                                onChange={(e) => onChange(e)}
                                                required
                                            />
                                            <span className="input-group-text">
                                                <Icon icon="mdi:lock" className="text-muted" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-grow-1 mb-3">
                                    <label htmlFor="tipo-usuario" className="form-label fw-bold">Tipo de Usuario</label>
                                    <div className="input-group">
                                        <select
                                            name="tipo-usuario"
                                            className="form-control"
                                            value={usuario.tipo_usuario_id.tipo_usuario_id}
                                            onChange={(e) => { onTipoUsuarioChange(e) }}
                                            required
                                        >
                                            <option value="">Seleccionar tipo de Usuario...</option>
                                            {
                                                tipoUsuarios.map((tipo) => (
                                                    <option key={tipo.tipo_usuario_id} value={tipo.tipo_usuario_id}>
                                                        {tipo.nombre}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                {usuario.tipo_usuario_id.tipo_usuario_id == 3 && (
                                    <div className='user-details'>
                                        <div className="d-flex gap-3">
                                            <div className="flex-grow-1 mb-3">
                                                <label htmlFor="logros" className="form-label fw-bold">Logros</label>
                                                <div className="input-group">
                                                    <textarea
                                                        id="logros"
                                                        name="logros"
                                                        className="form-control"
                                                        placeholder="Ingresa tus logros"
                                                        onChange={(e) => onChange(e)}
                                                    />
                                                    <span className="input-group-text">
                                                        <Icon icon="mdi:account-success" className="text-muted" />
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex-grow-1 mb-3">
                                                <label htmlFor="objetivos_carrera" className="form-label fw-bold">Objetivos de Carrera</label>
                                                <div className="input-group">
                                                    <textarea
                                                        id="objetivos_carrera"
                                                        name="objetivos_carrera"
                                                        className="form-control"
                                                        placeholder="Ingresa tus objetivos de carrera"
                                                        onChange={(e) => onChange(e)}
                                                    />
                                                    <span className="input-group-text">
                                                        <Icon icon="mdi:target-arrow" className="text-muted" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary btn-custom mt-3 justify-content-center w-25">Regístrate</button>
                            </div>
                        </form>
                        <p className="mt-3 text-center">¿Ya tienes cuenta? <Link to={"/"} className="text-decoration-none forgot-password">Inicia Sesión</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;