// Function to fetch project data
const token = localStorage.getItem('jwtToken');

async function fetchVacantes() {

    try {
        const response = await fetch('http://localhost:9000/api/vacante/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Ocurrió un error con la solicitud...');
        }
        const vacantes = await response.json();

        displayProjects(vacantes);
    } catch (error) {
        console.error('Error fetching proyectos:', error);
    }
}

// Function which displays vacantes on a card list
function displayProjects(vacantes) {
    const mainContent = document.querySelector('.main-content');

    vacantes.forEach(async vacante => {
        const card = document.createElement('div');
        const postulacionCountAplicado = await fetchCountByVacanteId(vacante.vacante_id);
        const postulacionCountCountSeleccionado = await fetchCountByEstadoAndPostulacionId('SELECCIONADO', vacante.vacante_id);

        card.className = 'card custom-card';
        card.innerHTML = `
            <div class="card-body" data-id="${vacante.vacante_id}">
                <div class="card-top">
                    <div class="card-title-section">
                        <p class="card-title">${vacante.nombre}</p>
                        <p class="card-subtitle">${vacante.descripcion}</p>
                    </div>
                    <div class="status-badge">${vacante.estado}</div>
                </div>
                <div class="card-details">
                    <div class="date-info">
                        <p>Inicio de convocatoria</p>
                        <p class="bold-text">${vacante.fecha_inicio}</p>
                    </div>
                    <div class="date-info">
                        <p>Fin de convocatoria</p>
                        <p class="bold-text">${vacante.fecha_fin}</p>
                    </div>
                </div>
                <div class="card-extra">
                    <div>
                        <p>Proyecto</p>
                        <p class="gray-text">${vacante.proyecto_id.nombre}</p>
                    </div>
                </div>
                <div class="card-extra">
                    <div>
                        <p>Puestos Disponibles</p>
                        <p class="bold-text">${vacante.puestos_disponibles}</p>
                    </div>
                    <div>
                        <p>Aplicaciones</p>
                        <p class="bold-text">${postulacionCountAplicado}</p>
                    </div>
                    <div>
                        <p>Seleccionados</p>
                        <p class="bold-text">${postulacionCountCountSeleccionado}</p>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-delete action-btn" onclick="deleteProject(${vacante.vacante_id})">Eliminar</button>
                    <button class="btn btn-edit action-btn" onclick="editProject(${vacante.vacante_id})">Editar</button>
                    <button class="btn btn-details action-btn" onclick="showDetails(${vacante.vacante_id})">Detalles</button>
                </div>
            </div>
        `;
        mainContent.appendChild(card);
    });
}

async function fetchCountByEstadoAndPostulacionId(estado, id) {

    try {
        const response = await fetch(`http://localhost:9000/api/postulacion/count/estado/${estado}/vacante/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Ocurrió un error con la solicitud...');
        }
        const count = await response.json(); // Assuming the response is just the count
        return count;
    } catch (error) {
        console.error('Error fetching count:', error);
        return 0; // Return 0 or handle the error as needed
    }
}

async function fetchCountByVacanteId(id) {

    try {
        const response = await fetch(`http://localhost:9000/api/postulacion/count/vacante/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Ocurrió un error con la solicitud...');
        }
        const count = await response.json(); // Assuming the response is just the count
        return count;
    } catch (error) {
        console.error('Error fetching count:', error);
        return 0; // Return 0 or handle the error as needed
    }
}

async function deleteProject(vacanteId) {
    // Ask for confirmation
    const isConfirmed = window.confirm('¿Estás seguro que deseas eliminar la Vacante?');

    if (isConfirmed) {
        try {
            const response = await fetch(`http://localhost:9000/api/vacante/${Number(vacanteId)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                // Remove the deleted card from the DOM
                const vacanteCard = document.querySelector(`[data-id="${vacanteId}"]`);
                vacanteCard.remove();
                alert('La vacante fue eliminada correctamente.');
            } else {
                const errorData = await response.json();
                alert(`Ocurrió un error eliminando la Vacante: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error eliminando Vacante.');
        }
    }
}

// Call fetchProjects on page load
document.addEventListener('DOMContentLoaded', function(){
    fetchVacantes();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const tipoUsuario = localStorage.getItem("tipoUsuario").toString();

    const nombreUsuarioId = document.getElementById('nombre-usuario');
    const tipoUsuarioId = document.getElementById('tipo-usuario');

    nombreUsuarioId.textContent = `Hola, ${usuario.nombre}`;
    tipoUsuarioId.textContent = tipoUsuario;
});