document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Get the form data
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    // Create the login payload
    const loginData = {
        usuario: usuario,
        password: password
    };

    try {
        // Make a POST request to the backend login endpoint
        const response = await fetch('http://localhost:9000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful! Token:', data.token);

            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('tipoUsuario', data.tipoUsuario.nombre);

           // Redirect based on tipoUsuario
            if(data.tipoUsuario.nombre == "Administrador") {
                window.location.href = './create_project.html';
            } else {
                window.location.href = './index.html';
            }
        } else {
            showAlert('Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.', 'danger');
        }
    } catch (error) {
        console.error('Error during login:', error);
        showAlert('Ha ocurrido un error del servidor. Por favor, inténtelo de nuevo.', 'danger');
    }
});

function showAlert(message, type) {
    const alertPlaceholder = document.getElementById('error-alert');
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
    alertPlaceholder.innerHTML = alertHTML;
}
