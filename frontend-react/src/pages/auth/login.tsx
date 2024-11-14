import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        usuario: '',
        password: ''
    });

    const { usuario, password } = user;

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
        if(password.length < 3){
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

                if(!response.ok){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Usuario o contraseña incorrectos.'
                    })
                } else {
                    const data = await response.json();
                    localStorage.setItem('jwtToken', data.token);
                    localStorage.setItem('usuario', JSON.stringify(data.usuario));

                    navigate("/create-project");
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
            <div className="container bg-custom shadow overflow-hidden" style={{ maxWidth: 1200 }}>
                <div className="row g-0">
                    <div className="col-lg-5 p-5">
                        <div className="text-center mb-4">
                            <img src="/images/logo.png" alt="ISkill logo" className="img-fluid" style={{ width: 100 }} />
                            <h2 className="fw-bold mt-3">Inicia Sesión</h2>
                        </div>
                        <div id="error-alert" />
                        <form id="login-form" onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="usuario" className="form-label fw-bold">Usuario</label>
                                <input type="text" id="usuario" name="usuario" className="form-control" value={usuario} placeholder="Ingresa tu usuario" onChange={(e) => onChange(e)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
                                <input type="password" id="password" name="password" className="form-control" value={password} placeholder="Ingresa tu contraseña" onChange={(e) => onChange(e)} required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-custom w-100 py-2">Ingresar</button>
                        </form>
                        <p className="mt-3 text-center"><Link to={"#"} className="text-decoration-none forgot-password">¿Olvidaste tu contraseña?</Link></p>
                        <p className="mt-3 text-center">¿No tienes cuenta? <a href="register.html" className="text-decoration-none forgot-password">Regístrate</a></p>
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