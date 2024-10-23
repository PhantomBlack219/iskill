// Function to load habilidades from the endpoint
const token = localStorage.getItem('jwtToken');
const usuario = JSON.parse(localStorage.getItem("usuario"));
const selectElement = document.getElementById("proyecto");

async function fetchHabilidades() {

    try {
        const response = await fetch('http://localhost:9000/api/habilidad/list', {
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

        displayHabilidades(vacantes);
    } catch (error) {
        console.error('Error fetching proyectos:', error);
    }
}

async function fetchProyectos() {
    try {
        const response = await fetch(`http://localhost:9000/api/proyecto/usuario_id/${usuario.usuario_id}`, {
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

        proyectos.forEach(project => {
            const option = document.createElement('option');
            option.value = project.proyecto_id; // Assuming the project object has an id field
            option.textContent = project.nombre; // Assuming the project object has a name field
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching proyectos:', error);
    }
}

async function fetchHabilidadVacantes(vacanteId) {

    try {
        const response = await fetch('http://localhost:9000/api/habilidad_vacante/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Ocurrió un error con la solicitud...');
        }
        const habilidadVacantes = await response.json();

        populateEditFormHabilidades(habilidadVacantes, vacanteId);
    } catch (error) {
        console.error('Error fetching proyectos:', error);
    }
}

async function fetchVacanteById(vacanteId) {
    try {
        const response = await fetch(`http://localhost:9000/api/vacante/${vacanteId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const vacante = await response.json();
            populateEditForm(vacante); // Call the function to populate form fields
        } else {
            alert('Error fetching detalles de Vacante.');
        }
    } catch (error) {
        console.error('Error fetching Vacante:', error);
    }
}

function displayHabilidades(habilidades) {
    const checkboxesContainer = document.getElementById('checkboxes');
    
    // Clear any existing checkboxes
    checkboxesContainer.innerHTML = '';

    // Create checkboxes for each habilidade
    habilidades.forEach(habilidad => {
        const div = document.createElement('div');
        div.className = 'form-check';

        const input = document.createElement('input');
        input.className = 'form-check-input';
        input.type = 'checkbox';
        input.id = habilidad.habilidad_id; // Assuming `id` is unique for each habilidade

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.htmlFor = habilidad.habilidad_id;
        label.textContent = habilidad.nombre_habilidad; // Assuming `name` holds the skill name

        div.appendChild(input);
        div.appendChild(label);
        checkboxesContainer.appendChild(div);
    });
}

// Function to create a Vacante
async function createVacante() {
    const isConfirmed = window.confirm('¿Estás seguro que deseas guardar la vacante?');

    if (!isConfirmed) {
        return;
    }

    // Gather form values
    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const puestosDisponibles = document.getElementById('puestos-disponibles').value;
    const fechaInicio = document.getElementById('startDate').value;
    const fechaFin = document.getElementById('endDate').value;
    const puntos = document.getElementById('puntos').value;
    const estado = "BUSCANDO";
    const proyectoId = document.getElementById('proyecto').value;
    const habilidadesSeleccionadas = Array.from(document.querySelectorAll('#checkboxes input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.id); // Get IDs of selected habilidades

    // Construct the Vacante object
    const vacante = {
        vacante_id: null,
        nombre,
        descripcion,
        puestos_disponibles: puestosDisponibles,
        puntos,
        estado,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        proyecto_id: {
            proyecto_id: proyectoId
        }
    };

    console.log(vacante);

    const vacateIdParam = getQueryParam('vacante_id');

    if(vacateIdParam){
        vacante.vacante_id = vacateIdParam;
        try {
            const response = await fetch('http://localhost:9000/api/vacante', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(vacante)
            });
    
            if (!response.ok) {
                throw new Error('Error al actualizar la vacante');
            }
    
            const vacanteCreada = await response.json();
    
            console.log('Vacante actualizada exitosamente:', vacanteCreada);
    
            const habilidadesVacantes = habilidadesSeleccionadas.map(habilidad => {
                return ({
                    habilidad: {
                        habilidad_id: Number(habilidad)
                    },
                    vacante: {
                        vacante_id: vacanteCreada.vacante_id
                    }
                })
            });
    
            console.log(habilidadesVacantes);
    
            const habilidadVacanteResponse = await fetch('http://localhost:9000/api/habilidad_vacante/createHabilidades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(habilidadesVacantes)
            });
    
            if (!habilidadVacanteResponse.ok) {
                throw new Error('Error al actualizar la habilidad vacante');
            }

            console.log('Creación de Habilidad_Vacante finalizada');

            window.location.href = './empleador_list_vacantes.html';
        } catch (error) {
            console.error('Error actualizando vacante:', error);
        }
    } else {
        try {
            const response = await fetch('http://localhost:9000/api/vacante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(vacante)
            });
    
            if (!response.ok) {
                throw new Error('Error al crear la vacante');
            }
    
            const vacanteCreada = await response.json();
    
            console.log('Vacante creada exitosamente:', vacanteCreada);
    
            const habilidadesVacantes = habilidadesSeleccionadas.map(habilidad => {
                return ({
                    habilidad: {
                        habilidad_id: Number(habilidad)
                    },
                    vacante: {
                        vacante_id: vacanteCreada.vacante_id
                    }
                })
            });
    
            console.log(habilidadesVacantes);
    
            const habilidadVacanteResponse = await fetch('http://localhost:9000/api/habilidad_vacante/createHabilidades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(habilidadesVacantes)
            });
    
            if (!habilidadVacanteResponse.ok) {
                throw new Error('Error al crear la habilidad vacante');
            }
            
            console.log('Creación de Habilidad_Vacante finalizada');

            window.location.href = './empleador_list_vacantes.html';
        } catch (error) {
            console.error('Error creating vacante:', error);
        }
    }

}

function confirmBack(){
    const isConfirmed = window.confirm('¿Estás seguro que deseas cancelar la creación de la vacante?');

    if(isConfirmed){
        window.location.href = './empleador_list_vacantes.html';
    }
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function populateEditForm(vacante) {
    document.getElementById('nombre').value = vacante.nombre;
    document.getElementById('descripcion').value = vacante.descripcion;
    //document.getElementById('estado').value = vacante.estado;
    document.getElementById('startDate').value = vacante.fecha_inicio;
    document.getElementById('endDate').value = vacante.fecha_fin;
    document.getElementById('puestos-disponibles').value = vacante.puestos_disponibles;
    document.getElementById('puntos').value = vacante.puntos;
    document.getElementById('proyecto').value = vacante.proyecto_id.proyecto_id;
}

function populateEditFormHabilidades(habilidadVacantes, vacanteId){
    for (let habilidadVacante of habilidadVacantes){
        if (habilidadVacante.vacante.vacante_id == vacanteId) {
            document.getElementById(habilidadVacante.habilidad.habilidad_id).checked = true;
        }
    }
}

// Call the function to load habilidades
document.addEventListener('DOMContentLoaded', async function() {
    fetchHabilidades();
    fetchProyectos();

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const tipoUsuario = localStorage.getItem("tipoUsuario").toString();

    const nombreUsuarioId = document.getElementById('nombre-usuario');
    const tipoUsuarioId = document.getElementById('tipo-usuario');

    nombreUsuarioId.textContent = `Hola, ${usuario.nombre}`;
    tipoUsuarioId.textContent = tipoUsuario;

    // Get vacanteId from params
    const vacanteId = getQueryParam('vacante_id');
    if (vacanteId) {
        await fetchVacanteById(vacanteId);
        await fetchHabilidadVacantes(vacanteId);
    }
})

// Add event listener for the "Guardar y Publicar" button
document.querySelector('.btn-details').addEventListener('click', createVacante);