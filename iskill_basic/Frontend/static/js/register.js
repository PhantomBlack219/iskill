async function fetchTipoUsuario() {
    try {
        const response = await fetch('http://localhost:9000/api/tipo_usuario/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error haciendo fetch de Tipos de Usuario');
        }
        const data = await response.json();
        const tipoUsuarioSelect = document.getElementById('tipo-usuario');

        // Skip tipo "Administrador"
        data.forEach(tipoUsuario => {
            if(tipoUsuario.nombre != "Administrador") {
                const option = document.createElement('option');
                option.value = tipoUsuario.tipo_usuario_id;
                option.text = tipoUsuario.nombre;
                tipoUsuarioSelect.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los tipos de usuario.');
    }
}

document.getElementById('registration-form').addEventListener('submit', async function registerUser(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Collect form data
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    const logros = document.getElementById('logros').value;
    const objetivos_carrera = document.getElementById('objetivos').value;
    const tipo_usuario_id = document.getElementById('tipo-usuario').value;

    const loginData = {
        usuario_id: 0,
        tipo_usuario_id: {
            tipo_usuario_id: tipo_usuario_id
        },
        nombre: nombre,
        apellido: apellido,
        email: email,
        usuario: usuario,
        password: password,
        fecha_registro: new Date().toISOString().slice(0, 19),
        logros: logros ? logros : "",
        objetivos_carrera: objetivos_carrera ? objetivos_carrera : ""
    };

    try {
        const response = await fetch('http://localhost:9000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const result = await response.json();
            alert('¡Usuario registrado con éxito!');
            window.location.href = './login.html';
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al registrar el usuario.');
    }
});

document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const usuario = document.getElementById('usuario').value;

    checkUsernameAvailability(usuario)
        .then(isAvailable => {
            if (!isAvailable) {
                alert('El nombre de usuario ya existe. Por favor elige otro.');
            } else {
                this.submit();
            }
        })
        .catch(error => {
            console.error('Error checking username:', error);
        });
});


function toggleEmployeeFields() {
    const userType = document.getElementById('tipo-usuario').value;
    const employeeFields = document.getElementById('employee-fields');
    employeeFields.style.display = userType === '3' ? 'block' : 'none';
}

function checkUsernameAvailability(usuario) {
    return fetch(`http://localhost:9000/api/usuario/check_usuario/${usuario}`, {
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error checking username availability');
            }
            return response.json();
        });
}

document.addEventListener('DOMContentLoaded', fetchTipoUsuario);