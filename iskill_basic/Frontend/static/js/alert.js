export function showAlert(message, type) {
    const alertPlaceholder = document.getElementById('error-alert');

    // Create a new alert div
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="close-alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `;

    // Append the alert to the placeholder
    alertPlaceholder.appendChild(alertDiv);

    // Add event listener for the close button
    alertDiv.querySelector('.close-alert').addEventListener('click', () => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 150); // Remove alert after fade out
    });
}

