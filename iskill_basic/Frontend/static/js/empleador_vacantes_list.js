// Function to fetch project data
async function fetchProjects() {
    const token = localStorage.getItem('jwtToken');

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
        const projects = await response.json();

        const usuarioId = localStorage.getItem('usuarioId');

        const usuarioProjects = projects.filter(project => project.usuario_id.usuario_id == usuarioId);
        displayProjects(usuarioProjects);
    } catch (error) {
        console.error('Error fetching proyectos:', error);
    }
}

// Function which displays projects on a card list
function displayProjects(projects) {
    const mainContent = document.querySelector('.main-content');

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card custom-card';
        card.innerHTML = `
            <div class="card-body" data-id="${project.id}">
                <div class="card-top">
                    <div class="card-title-section">
                        <p class="card-title">${project.nombre}</p>
                        <p class="card-subtitle">${project.descripcion}</p>
                    </div>
                    <div class="status-badge">${project.status}</div>
                </div>
                <div class="card-details">
                    <div class="date-info">
                        <p>Inicio de convocatoria</p>
                        <p class="bold-text">${project.fecha_inicio}</p>
                    </div>
                    <div class="date-info">
                        <p>Fin de convocatoria</p>
                        <p class="bold-text">${project.endDate}</p>
                    </div>
                </div>
                <div class="card-extra">
                    <div>
                        <p>Departamento/Área de interés</p>
                        <p class="gray-text">${project.department}</p>
                    </div>
                </div>
                <div class="card-extra">
                    <div>
                        <p>Aplicaciones</p>
                        <p class="bold-text">${project.applicationsCount}</p>
                    </div>
                    <div>
                        <p>Seleccionados</p>
                        <p class="bold-text">${project.selectedCount}</p>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-delete action-btn" onclick="deleteProject(${project.id})">Eliminar</button>
                    <button class="btn btn-edit action-btn" onclick="editProject(${project.id})">Editar</button>
                    <button class="btn btn-details action-btn" onclick="showDetails(${project.id})">Detalles</button>
                </div>
            </div>
        `;
        mainContent.appendChild(card);
    });
}

// Call fetchProjects on page load
document.addEventListener('DOMContentLoaded', fetchProjects);