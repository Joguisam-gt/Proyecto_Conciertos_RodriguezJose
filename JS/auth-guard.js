/**
 * auth-guard.js
 * Modulo de seguridad de rutas para el panel de administracion.
 * Se debe incluir en TODAS las paginas del area admin (dashboard,
 * eventos, categorias, ventas) como primer script para garantizar
 * que solo usuarios autenticados puedan acceder al contenido.
 *
 * Tambien expone la funcion global cerrarSesion() que se puede
 * invocar desde cualquier boton de logout en el sidebar.
 */

// ============================================================
// SECCION 1: PROTECCION DE RUTA
// Verifica la existencia de una sesion valida en localStorage
// antes de que el resto de la pagina se cargue. Si no hay
// sesion activa, redirige inmediatamente al login.
// ============================================================
(function verificarSesion() {
    const sesion = localStorage.getItem('tickethub_session');

    if (!sesion) {
        // No hay sesion: redirigir al login de inmediato
        window.location.replace('/HTML/login-page.html');
        return;
    }

    try {
        const datos = JSON.parse(sesion);
        // Verificar que la sesion pertenece a un administrador
        if (!datos || datos.role !== 'admin') {
            localStorage.removeItem('tickethub_session');
            window.location.replace('/HTML/login-page.html');
        }
    } catch (error) {
        // Sesion corrupta: limpiar y redirigir
        localStorage.removeItem('tickethub_session');
        window.location.replace('/HTML/login-page.html');
    }
})();

// ============================================================
// SECCION 2: FUNCION DE CIERRE DE SESION
// Elimina los datos de sesion del localStorage y redirige al
// usuario a la pagina de login. Se expone globalmente para
// poder ser llamada desde el boton de logout en el sidebar.
// ============================================================

/**
 * Cierra la sesion activa del administrador.
 * Limpia la clave de sesion de localStorage y redirige al login.
 */
function cerrarSesion() {
    localStorage.removeItem('tickethub_session');
    window.location.href = '/HTML/index.html';
}
