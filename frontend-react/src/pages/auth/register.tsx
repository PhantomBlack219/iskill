import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';

const Register = () => {
    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className="bg-custom shadow overflow-hidden w-100" style={{ maxWidth: 1200 }}>
                <div className="row g-0">
                    <div className='col-lg p-3'>
                        <div className="logo-container" style={{ textAlign: 'center', marginBottom: 20 }}>
                            <img src="/images/logo.png" alt="iSkill Logo" className="logo" style={{ width: 100 }} />
                        </div>
                        <h3 className="fw-bold mt-3 mb-3 text-center">Registro de Usuario</h3>

                        <form id="registration-form">
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
                                                required
                                            />
                                            <span className="input-group-text">
                                                <Icon icon="mdi:lock" className="text-muted" />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-grow-1 mb-3">
                                        <label htmlFor="confirm-password" className="form-label fw-bold">Confirmar Contraseña</label>
                                        <div className="input-group">
                                            <input
                                                type="password"
                                                id="confirm-password"
                                                name="confirm-password"
                                                className="form-control"
                                                placeholder="Confirma la contraseña"
                                                required
                                            />
                                            <span className="input-group-text">
                                                <Icon icon="mdi:lock" className="text-muted" />
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-grow-1 mb-3">
                                    <label htmlFor="usuario" className="form-label fw-bold">Tipo de Usuario</label>
                                    <div className="input-group">
                                        <select id="tipo-usuario" name="tipo-usuario" required>
                                            <option disabled selected>Seleccione una opción</option>
                                        </select>
                                    </div>
                                </div>


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
                                                />
                                                <span className="input-group-text">
                                                    <Icon icon="mdi:account-success" className="text-muted" />
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex-grow-1 mb-3">
                                            <label htmlFor="objetivos" className="form-label fw-bold">Objetivos de Carrera</label>
                                            <div className="input-group">
                                                <textarea
                                                    id="objetivos"
                                                    name="objetivos"
                                                    className="form-control"
                                                    placeholder="Ingresa tus objetivos de carrera"
                                                />
                                                <span className="input-group-text">
                                                    <Icon icon="mdi:target-arrow" className="text-muted" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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