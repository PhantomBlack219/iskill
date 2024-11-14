const token = localStorage.getItem('jwtToken');

async function fetchProyectos() {

    try {
        const response = await fetch('http://localhost:9000/api/proyecto/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Ocurrió un error con la solicitud...');
        }
        const proyectos = await response.json();

        displayProjectos(proyectos);
    } catch (error) {
        console.error('Error fetching proyectos:', error);
    }
}

function displayProjectos(proyectos) {
    const mainContent = document.querySelector('.main-content');

    proyectos.forEach(async proyecto => {
        const card = document.createElement('div');

        card.className = 'card custom-card';
        card.innerHTML = `
            <div class="card-body" data-id="${proyecto.proyecto_id}">
                <div class="card-top">
                    <div class="card-title-section">
                        <p class="card-title">${proyecto.nombre}</p>
                        <p class="card-subtitle">${proyecto.descripcion}</p>
                    </div>
                </div>
                <div style="display: flex; justify-content: center;" class="card-actions">
                    <button class="btn btn-delete action-btn" onclick="deleteProyecto(${proyecto.proyecto_id})">Eliminar</button>
                    <button class="btn btn-edit action-btn" onclick="editProyecto(${proyecto.proyecto_id})">Editar</button>
                </div>
            </div>
        `;
        mainContent.appendChild(card);
    });
}

async function deleteProyecto(proyectoId) {
    // Ask for confirmation
    const isConfirmed = window.confirm('¿Estás seguro que deseas eliminar el proyecto?');

    if (isConfirmed) {
        try {
            const response = await fetch(`http://localhost:9000/api/proyecto/${Number(proyectoId)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Remove the deleted card from the DOM
                const vacanteCard = document.querySelector(`[data-id="${proyectoId}"]`);
                vacanteCard.remove();
                alert('El proyecto fue eliminada correctamente.');
            } else {
                const errorData = await response.json();
                alert(`Ocurrió un error eliminando el Proyecto: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error eliminando Proyecto.');
        }
    }
}

function editProyecto(proyectoId){
    window.location.href = `empleador_create_proyecto.html?proyecto_id=${proyectoId}`;
}

// Call fetchProjects on page load
document.addEventListener('DOMContentLoaded', function(){
    fetchProyectos();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const tipoUsuario = localStorage.getItem("tipoUsuario").toString();

    const nombreUsuarioId = document.getElementById('nombre-usuario');
    const tipoUsuarioId = document.getElementById('tipo-usuario');

    nombreUsuarioId.textContent = `Hola, ${usuario.nombre}`;
    tipoUsuarioId.textContent = tipoUsuario;
});