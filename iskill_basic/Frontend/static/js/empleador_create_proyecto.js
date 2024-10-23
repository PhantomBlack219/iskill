const token = localStorage.getItem('jwtToken');
const usuario = JSON.parse(localStorage.getItem("usuario"));

async function fetchProyectoById(proyectoId) {
    try {
        const response = await fetch(`http://localhost:9000/api/proyecto/${proyectoId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const proyecto = await response.json();
            populateEditForm(proyecto); // Call the function to populate form fields
        } else {
            alert('Error fetching detalles de Proyecto.');
        }
    } catch (error) {
        console.error('Error fetching Proyecto:', error);
    }
}

async function createProyecto() {
    const isConfirmed = window.confirm('¿Estás seguro que deseas guardar el proyecto?');

    if (!isConfirmed) {
        return;
    }

    // Gather form values
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;

    // Construct the Proyecto object
    const proyecto = {
        proyecto_id: null,
        nombre,
        descripcion,
        usuario_id: {
            usuario_id: usuario.usuario_id
        }
    };

    console.log(proyecto);

    const proyectoIdParam = getQueryParam('proyecto_id');

    if(proyectoIdParam){
        proyecto.proyecto_id = proyectoIdParam;
        try {
            const response = await fetch('http://localhost:9000/api/proyecto', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(proyecto)
            });
    
            if (!response.ok) {
                throw new Error('Error al actualizar el proyecto');
            }
    
            const proyectoCreado = await response.json();
    
            console.log('Proyecto actualizado exitosamente:', proyectoCreado);

            window.location.href = './empleador_list_proyecto.html';
    
        } catch (error) {
            console.error('Error actualizando proyecto:', error);
        }
    } else {
        proyecto.proyecto_id = proyectoIdParam;
        try {
            const response = await fetch('http://localhost:9000/api/proyecto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(proyecto)
            });
    
            if (!response.ok) {
                throw new Error('Error al crear el proyecto');
            }
    
            const proyectoCreado = await response.json();
    
            console.log('Proyecto creado exitosamente:', proyectoCreado);

            window.location.href = './empleador_list_proyecto.html';
    
        } catch (error) {
            console.error('Error creating proyecto:', error);
        }
    }

}

function populateEditForm(proyecto) {
    document.getElementById('nombre').value = proyecto.nombre;
    document.getElementById('descripcion').value = proyecto.descripcion;
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function confirmBack(){
    const isConfirmed = window.confirm('¿Estás seguro que deseas cancelar el creación del proyecto?');

    if(isConfirmed){
        window.location.href = './empleador_list_proyecto.html';
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const tipoUsuario = localStorage.getItem("tipoUsuario").toString();

    const nombreUsuarioId = document.getElementById('nombre-usuario');
    const tipoUsuarioId = document.getElementById('tipo-usuario');

    nombreUsuarioId.textContent = `Hola, ${usuario.nombre}`;
    tipoUsuarioId.textContent = tipoUsuario;

    // Get proyectoId from params
    const proyectoId = getQueryParam('proyecto_id');
    if (proyectoId) {
        await fetchProyectoById(proyectoId);
    }
})

// Add event listener for the "Guardar y Publicar" button
document.querySelector('.btn-details').addEventListener('click', createProyecto);