/**
 * animation.js
 * Modulo de animaciones de entrada y salida de pagina para TICKETHUB.
 * Se aplica de forma universal a cualquier pagina que lo incluya.
 *
 * Funcionalidades:
 *  1. Animacion de entrada por desvanecimiento y desplazamiento vertical
 *     usando IntersectionObserver para activar cada elemento al hacerse visible.
 *  2. Animacion de salida al hacer clic en enlaces internos, aplicando
 *     un efecto de fundido antes de navegar a la nueva pagina.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // SECCION 1: ESTILOS DE ANIMACION
    // Se inyectan los estilos CSS de animacion directamente en el <head>
    // para garantizar que esten disponibles antes de que el observer
    // comience a aplicar las clases de estado.
    // ============================================================

    const style = document.createElement('style');
    style.textContent = `
        /* Estado inicial: elemento invisible, desenfocado y desplazado hacia abajo */
        .prism-universal-animate {
            opacity: 0 !important;
            filter: blur(12px) !important;
            transform: translateY(20px) !important;
            transition:
                opacity 0.6s ease,
                filter 0.6s ease,
                transform 0.7s cubic-bezier(0.23, 1, 0.32, 1) !important;
        }

        /* Estado visible: el elemento se revela completamente */
        .prism-universal-animate.reveal-active {
            opacity: 1 !important;
            filter: blur(0) !important;
            transform: translateY(0) !important;
        }

        /* Efecto de salida al cambiar de pagina */
        body.page-exit {
            opacity: 0;
            filter: blur(10px);
            transform: scale(0.98);
            transition: all 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    // ============================================================
    // SECCION 2: ANIMACION DE ENTRADA CON INTERSECTION OBSERVER
    // Selecciona los elementos candidatos a animar y los observa.
    // Cuando un elemento entra en el viewport, se le agrega la
    // clase 'reveal-active' que activa la transicion CSS.
    // Cada elemento tiene un retraso incremental para efecto cascada.
    // ============================================================

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // El elemento es visible: activar la animacion de revelado
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.05 });

    // Seleccionar todos los elementos de contenido relevantes de la pagina
    const elements = document.querySelectorAll(
        'section, .stat-card, .welcome-section, .form-container, .table-container, table tr, .sidebar, .login-card, .filter-bar, .live-chip'
    );

    // Aplicar clase inicial y retraso escalonado a cada elemento
    elements.forEach((el, i) => {
        el.classList.add('prism-universal-animate');
        // Incremento de 40ms por elemento para efecto cascada visual
        el.style.transitionDelay = `${i * 0.04}s`;
        observer.observe(el);
    });

    // ============================================================
    // SECCION 3: ANIMACION DE SALIDA AL NAVEGAR
    // Intercepta los clics en enlaces internos para aplicar el efecto
    // de salida antes de que el navegador cambie de pagina.
    // Solo se aplica a rutas internas (no externas ni anclas #).
    // ============================================================

    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const destination = link.getAttribute('href');

            // Solo interceptar enlaces internos validos
            if (destination && destination !== '#' && !destination.startsWith('http')) {
                e.preventDefault();

                // Aplicar clase de salida al body para disparar la transicion CSS
                document.body.classList.add('page-exit');

                // Esperar a que la animacion termine antes de navegar
                setTimeout(() => {
                    window.location.href = destination;
                }, 400);
            }
        });
    });
});
