import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Icon } from '@iconify/react';

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        usuario: '',
        password: ''
    });

    const { usuario, password } = user;
    useEffect(() => {
        document.title = 'iSkill';
    }, []);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login();
    }

    const login = async () => {
        if (password.length < 3) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La contraseña debe tener al menos 3 caracteres.',
                confirmButtonColor: '#00667F'
            });
        } else {
            try {
                const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Usuario o contraseña incorrectos.'
                    })
                } else {
                    const data = await response.json();
                    localStorage.setItem('jwtToken', data.token);
                    localStorage.setItem('usuario', JSON.stringify(data.usuario));

                    if(data.usuario.tipo_usuario_id.tipo_usuario_id === 1){
                        navigate("/admin/all-projects");
                    } else if(data.usuario.tipo_usuario_id.tipo_usuario_id === 4){
                        navigate("/employer/my-projects");
                    } else if(data.usuario.tipo_usuario_id.tipo_usuario_id === 5){
                        navigate("/employee/my-projects");
                    }
                }
            } catch (e) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Error',
                    text: 'Error al iniciar sesión.'
                })
            }
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-custom shadow overflow-hidden" style={{ maxWidth: 1200 }}>
                <div className="row g-0">
                    <div className="col-lg-5 p-5">
                        <div className="text-center mb-4">
                            <img src="/images/logo.png" alt="iSkill logo" className="img-fluid" style={{ width: 100 }} />
                            <h2 className="fw-bold mt-3">Inicia Sesión</h2>
                        </div>
                        <form id="login-form" onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="usuario" className="form-label fw-bold">Usuario</label>
                                <div className='input-group'>
                                    <input type="text" id="usuario" name="usuario" className="form-control" value={usuario} placeholder="Ingresa tu usuario" onChange={(e) => onChange(e)} required />
                                    <span className='input-group-text'>
                                        <Icon icon="mdi:account" className="text-muted" />
                                    </span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
                                <div className='input-group'>
                                    <input type="password" id="password" name="password" className="form-control" value={password} placeholder="Ingresa tu contraseña" onChange={(e) => onChange(e)} required />
                                    <span className='input-group-text'>
                                        <Icon icon="mdi:lock" className="text-muted" />
                                    </span>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-custom w-100 py-2">Ingresar</button>
                        </form>
                        <p className="mt-3 text-center"><Link to={"#"} className="text-decoration-none forgot-password">¿Olvidaste tu contraseña?</Link></p>
                        <p className="mt-3 text-center">¿No tienes cuenta? <Link to={"/register"} className="text-decoration-none forgot-password">Regístrate</Link></p>
                    </div>
                    <div className="col-lg-7">
                        <img src="/images/bienvenida.jpg" alt="Welcome back" className="img-fluid h-100 w-100" style={{ objectFit: 'cover' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;