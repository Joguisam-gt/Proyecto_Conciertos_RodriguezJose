/**
 * script_descripcion.js
 * Pagina de detalle de un evento individual.
 * Lee el ID del evento desde el parametro de URL (?id=...), busca
 * ese evento en localStorage (clave: 'tickethub_local_events') y
 * rellena dinamicamente todos los campos de la pagina con sus datos.
 * Si el evento no existe o no hay ID en la URL, redirige al index.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // SECCION 1: LECTURA DEL ID DESDE LA URL
    // Se extrae el parametro 'id' de la query string para identificar
    // cual evento debe mostrarse en esta pagina de detalle.
    // ============================================================

    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    // Si no hay ID en la URL, no hay evento que mostrar: redirigir al catalogo
    if (!eventId) {
        window.location.href = '/index.html';
        return;
    }

    // ============================================================
    // SECCION 2: BUSQUEDA DEL EVENTO EN LOCALSTORAGE
    // Se carga el array de eventos guardados por el admin y se busca
    // el evento que coincida con el ID extraido de la URL.
    // ============================================================

    const events = JSON.parse(localStorage.getItem('tickethub_local_events')) || [];
    const event = events.find(e => e.id == eventId);

    // Si el ID no corresponde a ningun evento registrado, mostrar error
    if (!event) {
        console.error("Evento no encontrado en LocalStorage para el id:", eventId);
        document.body.innerHTML = `<h2 style="color:white; text-align:center; margin-top:100px;">Evento no encontrado</h2>`;
        return;
    }

    // ============================================================
    // SECCION 3: INYECCION DE DATOS EN LA PAGINA
    // Con el objeto del evento disponible, se actualizan todos los
    // elementos del DOM con la informacion correspondiente.
    // ============================================================

    // Actualizar el titulo de la pestana del navegador
    document.title = `TICKETHUB | ${event.name}`;

    // Imagen de portada del evento (con fallback si no hay URL)
    const banner = document.getElementById('event-banner');
    if (banner) {
        banner.src = event.image || 'https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=No+Image';
    }

    // Campos de texto del hero y la seccion de informacion
    document.getElementById('event-title').innerText = event.name;
    document.getElementById('event-category').innerText = event.category || 'General';
    document.getElementById('event-description').innerText = event.description || 'No hay una descripcion detallada para este evento.';
    document.getElementById('event-price').innerText = `$${event.price}`;

    // Fecha del evento (si fue definida al crearlo)
    if (event.date) document.getElementById('event-date').innerText = event.date;

    // La ubicacion se guarda como 'city' en el formulario de eventos del admin
    if (event.city) document.getElementById('event-location').innerText = event.city;

    // ============================================================
    // SECCION 4: LOGICA DEL BOTON "AGREGAR AL CARRITO"
    // Se conecta el boton de esta pagina con la funcion global
    // agregarAlCarrito() que esta definida en script_carrito.js.
    // ============================================================

    const btnAdd = document.getElementById('btn-add-detail');
    if (btnAdd) {
        btnAdd.onclick = () => {
            if (window.agregarAlCarrito) {
                window.agregarAlCarrito(event.id);
                // Mostrar el modal del carrito automaticamente tras agregar
                const cartModal = document.getElementById('cart-modal');
                if (cartModal) {
                    cartModal.classList.add('show');
                    if (window.renderCartItems) window.renderCartItems();
                }
            } else {
                // Toast de error si script_carrito no esta disponible
                const t = document.createElement('div');
                t.textContent = 'Error: recarga la pagina para usar el carrito.';
                t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#2d1b1b;color:#ffb4ab;padding:12px 20px;border-radius:10px;font-size:0.85rem;z-index:99999;border:1px solid #ffb4ab;box-shadow:0 8px 24px rgba(0,0,0,0.4);';
                document.body.appendChild(t);
                setTimeout(() => t.remove(), 3500);
            }
        };
    }
});
