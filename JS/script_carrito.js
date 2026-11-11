/**
 * script_carrito.js
 * Modulo global del carrito de compras de TICKETHUB.
 * Gestiona el estado del carrito usando localStorage (clave: 'temp_cart'),
 * expone funciones globales para agregar/quitar items, actualiza el badge
 * del icono en el header y controla el modal de checkout con el proceso
 * de compra que genera una venta en 'tickethub_sales'.
 *
 * Este archivo debe cargarse ANTES de script_index.js y script_descripcion.js
 * para que las funciones globales esten disponibles cuando se necesiten.
 */

// ============================================================
// SECCION 1: INICIALIZACION DEL ESTADO DEL CARRITO
// Se carga el carrito desde localStorage al iniciar la pagina,
// permitiendo persistencia entre recargas.
// ============================================================

/** Estado en memoria del carrito, sincronizado con localStorage */
window.cartStorage = JSON.parse(localStorage.getItem('temp_cart')) || [];

// ============================================================
// SECCION 2: FUNCIONES DE UI DEL CARRITO
// Funciones que actualizan los elementos visuales del carrito
// (badge del icono y listado de items en el modal).
// ============================================================

/**
 * Actualiza el badge numerico sobre el icono del carrito en el header.
 * Oculta el badge si el carrito esta vacio.
 */
window.actualizarContadorCarrito = () => {
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = window.cartStorage.length;
        badge.style.display = window.cartStorage.length > 0 ? 'flex' : 'none';
    }
};

/**
 * Renderiza la lista de items dentro del modal del carrito.
 * Calcula y muestra el total acumulado de precios.
 */
window.renderCartItems = () => {
    const list = document.getElementById('modal-cart-items');
    const totalPriceElement = document.getElementById('total-price');
    if (!list) return;

    list.innerHTML = '';
    let total = 0;

    if (window.cartStorage.length === 0) {
        // Mensaje cuando el carrito no tiene items
        list.innerHTML = '<p style="text-align:center; opacity:0.5; padding:20px;">Your cart is empty</p>';
    } else {
        // Renderizar cada item con su nombre, precio y boton de eliminar
        window.cartStorage.forEach((item, index) => {
            total += parseFloat(item.price) || 0;
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div class="item-info">
                    <p class="item-name">${item.name}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
                <button onclick="window.quitarDelCarrito(${index})" class="remove-btn" style="background:none; border:none; color:#ff4d4d; cursor:pointer;">
                    <span class="material-symbols-outlined">delete</span>
                </button>`;
            list.appendChild(itemDiv);
        });
    }

    // Actualizar el total mostrado en el resumen
    if (totalPriceElement) totalPriceElement.innerText = total.toFixed(2);
};

// ============================================================
// SECCION 3: FUNCIONES CRUD DEL CARRITO
// Funciones globales para agregar y quitar items del carrito.
// Se exponen en window para ser accesibles desde otros scripts
// y desde atributos onclick en el HTML.
// ============================================================

/**
 * Agrega un evento al carrito buscandolo por su ID en localStorage.
 * Persiste el carrito actualizado y refresca el contador del header.
 * @param {string} id - ID del evento a agregar (clave: tickethub_local_events).
 */
window.agregarAlCarrito = (id) => {
    const events = JSON.parse(localStorage.getItem('tickethub_local_events')) || [];
    const event = events.find(e => e.id == id);
    if (event) {
        window.cartStorage.push({...event});
        localStorage.setItem('temp_cart', JSON.stringify(window.cartStorage));
        window.actualizarContadorCarrito();
        // Mostrar confirmacion visual si la funcion global de toast esta disponible
        if (window.showToast) window.showToast(event.name);
    }
};

/**
 * Elimina un item del carrito por su posicion en el array.
 * Persiste el carrito actualizado y refresca el modal y el contador.
 * @param {number} index - Indice del item a eliminar en cartStorage.
 */
window.quitarDelCarrito = (index) => {
    window.cartStorage.splice(index, 1);
    localStorage.setItem('temp_cart', JSON.stringify(window.cartStorage));
    window.actualizarContadorCarrito();
    window.renderCartItems();
};

// ============================================================
// SECCION 4: PROCESO DE COMPRA (CHECKOUT)
// Maneja el envio del formulario de checkout, genera una venta
// con ID unico y la persiste en localStorage bajo 'tickethub_sales'.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');

    // --- MANEJADOR DEL FORMULARIO DE COMPRA ---
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // No procesar si el carrito esta vacio
            if (window.cartStorage.length === 0) return;

            // Generar ID unico de boleta con prefijo TK-
            const boletaId = "TK-" + Math.floor(100000 + Math.random() * 900000);
            const total = document.getElementById('total-price').innerText;

            // Leer ventas existentes y agregar la nueva venta
            const ventasExistentes = JSON.parse(localStorage.getItem('tickethub_sales')) || [];
            const nuevaVenta = {
                id: boletaId,
                fecha: new Date().toLocaleString(),
                cliente: document.getElementById('cust-name').value,
                email: document.getElementById('cust-email').value,
                telefono: document.getElementById('cust-phone').value,
                direccion: document.getElementById('cust-address').value,
                identificacion: document.getElementById('cust-id').value,
                monto: `$${total}`,
                status: "Confirmed",
                tickets: [...window.cartStorage]
            };

            ventasExistentes.push(nuevaVenta);
            localStorage.setItem('tickethub_sales', JSON.stringify(ventasExistentes));

            // Cerrar el modal del carrito
            const cartModal = document.getElementById('cart-modal');
            if (cartModal) cartModal.classList.remove('show');

            // Mostrar pantalla de confirmacion de compra
            showSuccessModal(boletaId);
        });
    }

    // --------------------------------------------------------
    // MODAL DE COMPRA EXITOSA
    // Muestra una confirmacion visual con el ID de la boleta.
    // Se cierra manualmente o de forma automatica tras 5 segundos.
    // --------------------------------------------------------
    function showSuccessModal(id) {
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.innerHTML = `
            <div class="success-card">
                <span class="material-symbols-outlined success-icon">verified</span>
                <h2 style="color:white; margin-bottom:10px;">Purchase Confirmed!</h2>
                <p style="color:#888;">Thank you for choosing Tokethub.</p>
                <div class="boleta-tag">
                    <span style="font-size:0.7rem; color:#666; display:block; margin-bottom:5px;">OFFICIAL RECEIPT</span>
                    <span class="boleta-number">${id}</span>
                </div>
                <button class="btn-primary" id="finish-btn" style="width:100%;">Close & Clear Cart</button>
                <div class="auto-close-bar"></div>
            </div>`;

        document.body.appendChild(overlay);

        // Funcion compartida de cierre: vacia el carrito y elimina el overlay
        const cleanAndExit = () => {
            window.cartStorage = [];
            localStorage.setItem('temp_cart', JSON.stringify([]));
            window.actualizarContadorCarrito();
            overlay.remove();
            if (checkoutForm) checkoutForm.reset();
        };

        document.getElementById('finish-btn').onclick = cleanAndExit;
        // Cierre automatico tras 5 segundos para no bloquear al usuario
        setTimeout(cleanAndExit, 5000);
    }

    // --------------------------------------------------------
    // HANDLERS DE APERTURA Y CIERRE DEL MODAL DEL CARRITO
    // Escuchan los botones del header para mostrar/ocultar el modal.
    // --------------------------------------------------------
    document.getElementById('cart-icon-btn')?.addEventListener('click', () => {
        document.getElementById('cart-modal').classList.add('show');
        window.renderCartItems();
    });

    document.getElementById('close-modal-btn')?.addEventListener('click', () => {
        document.getElementById('cart-modal').classList.remove('show');
    });

    // Boton "Continuar comprando" dentro del modal de checkout
    document.getElementById('continue-shopping')?.addEventListener('click', () => {
        document.getElementById('cart-modal').classList.remove('show');
    });
});
