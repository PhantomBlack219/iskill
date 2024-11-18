import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import AdminSidebar from '../../components/adminSidebar';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Swal from 'sweetalert2';

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

const ListUsersAdmin = () => {
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [reload, setReload] = useState(false);

    const token = localStorage.getItem('jwtToken');
    const decodedToken = token ? jwtDecode<JwtPayload>(token) : null;
    
    const usuario = localStorage.getItem('usuario');

    const usuarioJSON = usuario ? JSON.parse(usuario) : null;

    useEffect(() => {
        document.title = 'Usuarios | iSkill | Admin';
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
            } else if(usuarioJSON.tipo_usuario_id.tipo_usuario_id !== 1){
                Swal.fire({
                    icon: 'warning',
                    title: 'Acceso denegado',
                    text: 'No tienes permiso para acceder a esta página.',
                    confirmButtonColor: '#00667F',
                }).then(() => {
                    if(usuarioJSON.tipo_usuario_id.tipo_usuario_id === 2){
                        navigate("/employer/my-projects");
                    } else if(usuarioJSON.tipo_usuario_id.tipo_usuario_id === 3){
                        navigate("/employee/my-projects");
                    }
                });
            } else {
                const fetchUsers = async () => {
                    try {
                        const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/usuario/list`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                        });
    
                        if (!response.ok) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ocurrió un error cargando los usuarios.'
                            })
                        } else {
                            const data = await response.json();
                            setUsuarios(data);
                        }
                    } catch (e) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Error',
                            text: 'Ocurrió un error cargando los usuarios.'
                        })
                    }
                }
                fetchUsers();
            }
        }
    }, [reload]);

    const deleteUsuario = async (id: number) => {
        try {
            Swal.fire({
                icon: 'warning',
                title: '¿Estás seguro que deseas eliminar el usuario?',
                text: 'No podrás revertir esta acción.',
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/api/usuario/${id}`, {
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
                            title: 'Usuario eliminado',
                            text: 'El usuario ha sido eliminado exitosamente.',
                            confirmButtonColor: '#00667F'
                        })
                        // Refresh projects
                        reloadUsuarios();
                    }
                }
            });
        } catch (e) {
            Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'Ocurrió un error cargando los usuarios.',
                confirmButtonColor: '#00667F'
            })
        }
    };

    const editUsuario = (user: Usuario) => {
        navigate(
            '/admin/create-user',
            {
                state: { usuario: user }
            }
        )
    }

    const reloadUsuarios = () => {
        setReload(!reload);
    }

    return (
        <div className='wrapper'>
            <Navbar></Navbar>
            <AdminSidebar></AdminSidebar>

            <div className='content-wrapper'>
                <div className='main-content'>
                    <div className="gap-div">
                        <p className="bold-title">Administración de Usuarios</p>
                        <div className="gap-div-2">
                            <Link to={"/employer/create-vacant"}>
                                <img src="/images/crear.png" alt="Icono Crear" className="create-icon" />
                            </Link>
                            <div><p className="bold-title">Crear Usuario</p></div>
                        </div>
                    </div>

                    <div className='content-section'>
                        <table className="table table-hover mt-4">
                            <thead className='table-light'>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Fecha de registro</th>
                                    <th scope="col">Tipo de Usuario</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="usuario-table">
                                {
                                    usuarios.map((usuario) => {
                                        return (
                                            <tr key={usuario.usuario_id}>
                                                <td>{usuario.usuario_id}</td>
                                                <td>{usuario.nombre}</td>
                                                <td>{usuario.apellido}</td>
                                                <td>{usuario.usuario}</td>
                                                <td>{usuario.email}</td>
                                                <td>{new Date(usuario.fecha_registro).toLocaleDateString()}</td>
                                                <td>{usuario.tipo_usuario_id.nombre}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-custom btn-sm" onClick={() => {editUsuario(usuario)}}>Editar</button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => deleteUsuario(usuario.usuario_id)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default ListUsersAdmin;

function setReload(arg0: boolean) {
    throw new Error('Function not implemented.');
}
