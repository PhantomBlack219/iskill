function loadData() {
    let request = sendRequest('api/usuario/list', 'GET');
    let table = document.getElementById('usuario-table');
    table.innerHTML = "";
    request.onload = function() {
        let data = request.response;

        // Verifica que los datos se hayan cargado correctamente
        if (!data || data.length === 0) {
            table.innerHTML = `
                <tr>
                    <td colspan="6">No se encontraron registros.</td>
                </tr>
            `;
            return;
        }

        // Recorre los datos y crea las filas de la tabla
        data.forEach((element) => {
            table.innerHTML += `
                <tr>
                    <th>${element.usuario_id}</th>
                    <td>${element.nombre}</td>
                    <td>${element.apellido}</td>
                    <td>${element.usuario}</td>
                    <td>${element.email}</td>
                    <td>${element.fecha_registro}</td>
                    <td>${element.tipo_usuario_id.nombre}</td>
                    
                    <td>

                        <button type="button" class="btn btn-danger" onclick='deleteUsuario(${element.usuario_id})'>
                            <i class="fas fa-trash-alt"></i> Eliminar
                        </buttonudsu>
                        <button type="button" class="btn btn-info" onclick='window.location = "edit_admin.html?idusuario=${element.usuario_id}"'>
                            <i class="fas fa-edit"></i> Editar
                        </button>
                    </td>
                </tr>
            `;
        });
    };

    request.onerror = function() {
        table.innerHTML = `
            <tr>
                <td colspan="6">Error al recuperar los datos.</td>
            </tr>
        `;
    };
}



// Función para editar un usuario
function editUser(usuarioId) {
    // Redirige a la página de edición con el ID del usuario
    window.location = `register.html?idusuario=${usuarioId}`;
}

function saveUsuario() {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let usuario = document.getElementById('usuario').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let tipoUsuarioId = document.getElementById('tipo-usuario').value;

       // Generar la fecha actual
       // Asignar la fecha al campo oculto
   
       // Crear el objeto de datos para enviar
       let data = {
           'nombre': nombre,
           'apellido': apellido,
           'usuario': usuario,
           'email': email,
           'password': password,
           'tipo_usuario_id': {
                'tipo_usuario_id': Number(tipoUsuarioId)
           },
           'fecha_registro': new Date().toISOString().slice(0, 19) // Incluir la fecha en los datos enviados 
       };
    // Envío de los datos (POST para creación)
    let request = sendRequest('api/usuario', 'POST', data);
    
    request.onload = function() {
        alert('Usuario creado exitosamente.');
        window.location = 'admin.html';
    };
    
    request.onerror = function() {
        alert('Error al guardar el usuario.');
    };
}



function loadUsuario(idusuario) {
    let request = sendRequest('api/usuario/'+idusuario, 'GET', ''); 

    //let id = document.getElementById('id');
    let nombre = document.getElementById('nombre');
    let apellido = document.getElementById('apellido');
    let usuario = document.getElementById('usuario');
    let email = document.getElementById('email');
    let tipoUsuarioId = document.getElementById('tipo-usuario');

    request.onload = function() {
        let data = request.response;
        // Se actualiza el valor de las variables según el JSON
        console.log(data);
        //id.value = data.id;
        nombre.value = data.nombre;
        apellido.value = data.apellido;
        usuario.value = data.usuario;
        email.value = data.email;
        tipoUsuarioId.value = data.tipo_usuario_id.nombre;
    };

    request.onerror = function() {
        alert("Error al recuperar los datos.");
    };
}




function deleteUsuario(usuarioId) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        let request = sendRequest(`api/usuario/${usuarioId}`, 'DELETE');
        request.onload = function() {
            if (request.status === 200) {
                loadData(); // Recargar los datos después de eliminar
            } else {
                alert('Error al eliminar el usuario.');
            }
        };
        request.onerror = function() {
            alert('Error de conexión.');
        };
    }
}