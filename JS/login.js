/**
 * login.js
 * Maneja la logica de autenticacion de administrador usando Web Components
 * personalizados para los campos del formulario y localStorage para la sesion.
 */

// ============================================================
// SECCION 1: DEFINICION DE WEB COMPONENTS
// Se definen los elementos HTML personalizados que usa la pagina
// de login para renderizar el branding y los campos de entrada.
// ============================================================

/**
 * Componente de branding: renderiza el logo y nombre del sistema
 * al ser insertado en el DOM como <ticket-hub-branding>.
 */
class TicketHubBranding extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header class="branding">
                <div class="logo-box">
                    <span class="material-symbols-outlined logo-icon">confirmation_number</span>
                </div>
                <h1 class="brand-name">TICKETHUB</h1>
                <p class="brand-subtitle">Admin Console</p>
            </header>
        `;
    }
}

/**
 * Componente de campo de entrada: renderiza un input con icono y etiqueta
 * usando los atributos HTML pasados al elemento <ticket-hub-input>.
 * El input interno recibe el ID del elemento mas el sufijo "-internal"
 * para poder ser accedido desde el script de validacion.
 */
class TicketHubInput extends HTMLElement {
    connectedCallback() {
        const label = this.getAttribute('label') || '';
        const type = this.getAttribute('type') || 'text';
        const id = this.getAttribute('id') || '';
        const icon = this.getAttribute('icon') || '';
        const placeholder = this.getAttribute('placeholder') || '';

        this.innerHTML = `
            <div class="form-group">
                <label class="form-label">${label}</label>
                <div class="input-wrapper">
                    <span class="material-symbols-outlined input-icon">${icon}</span>
                    <input class="form-input" id="${id}-internal" placeholder="${placeholder}" type="${type}"/>
                </div>
            </div>
        `;
    }
}

// Registro de los Web Components en el navegador
customElements.define('ticket-hub-branding', TicketHubBranding);
customElements.define('ticket-hub-input', TicketHubInput);

// ============================================================
// SECCION 2: LOGICA DE AUTENTICACION
// Se ejecuta una vez que el DOM esta completamente cargado,
// garantizando que los Web Components ya hayan renderizado
// sus inputs internos antes de intentar accederlos.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // Inyectamos estilos base para que los Web Components respeten
    // el flujo de bloque del resto del formulario
    const componentStyles = document.createElement('style');
    componentStyles.textContent = `
        ticket-hub-branding,
        ticket-hub-input { display: block; width: 100%; }
    `;
    document.head.appendChild(componentStyles);

    // Referencia al formulario de login
    const loginForm = document.querySelector('.login-form');

    // --------------------------------------------------------
    // MANEJADOR DEL ENVIO DEL FORMULARIO
    // Valida las credenciales ingresadas contra los valores
    // definidos. Si son correctos, guarda la sesion en
    // localStorage y redirige al dashboard de administracion.
    // --------------------------------------------------------
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Los inputs son hijos del Web Component, se acceden por el ID interno
        const emailInput = document.getElementById('email-field-internal');
        const passwordInput = document.getElementById('password-field-internal');

        // Verificar que los Web Components hayan terminado de renderizar
        if (!emailInput || !passwordInput) {
            showToast("Error interno: campos de formulario no encontrados.", "error");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validacion de credenciales de administrador
        if (email === 'admin@mail.com' && password === '123456') {
            // Guardar sesion activa en localStorage para proteger las rutas admin
            localStorage.setItem('tickethub_session', JSON.stringify({
                role: 'admin',
                email: email,
                loginTime: new Date().toISOString()
            }));

            showToast("Acceso correcto. Redirigiendo al Dashboard...", "success");

            // Redireccion al dashboard tras mostrar el toast
            setTimeout(() => {
                window.location.href = '/HTML/dashboard.html';
            }, 1500);
        } else {
            showToast("Credenciales incorrectas. Intenta de nuevo.", "error");
        }
    });
});

// ============================================================
// SECCION 3: FUNCION DE NOTIFICACION (TOAST)
// Funcion global reutilizable que muestra un mensaje temporal
// en la pantalla para feedback de acciones del usuario.
// ============================================================

/**
 * Crea y muestra un mensaje emergente (Toast) en la pantalla.
 * Elimina cualquier toast anterior para evitar acumulacion visual.
 * @param {string} message - El texto a mostrar.
 * @param {string} type - El tipo de mensaje ('success' o 'error').
 */
function showToast(message, type) {
    // Eliminar toast anterior si existe
    const oldToast = document.querySelector('.toast-message');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast-message ${type === 'success' ? 'toast-success' : 'toast-error'}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    // Animacion de desvanecimiento y eliminacion del elemento tras 3 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
