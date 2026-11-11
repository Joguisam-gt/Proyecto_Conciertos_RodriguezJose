# TICKETHUB | Premium Event Marketplace

Plataforma web para la venta y gestion de entradas a eventos y conciertos en Guatemala. Permite a los usuarios explorar eventos, agregar boletos al carrito y realizar compras; y al administrador gestionar categorias, eventos y visualizar ventas, todo sin necesidad de servidor ni base de datos gracias al uso de localStorage.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## Tecnologias utilizadas

Este proyecto fue desarrollado utilizando las siguientes tecnologias:

- **Lenguaje principal:** JavaScript (ES6+)
- **Estructura:** HTML5 con Web Components personalizados
- **Estilos:** CSS3 con variables personalizadas y diseño responsive
- **Almacenamiento:** localStorage (sin base de datos ni backend)
- **Iconos:** Google Material Symbols
- **Tipografia:** Google Fonts (Manrope, Inter)
- **Control de versiones:** Git y GitHub

---

# Como montar el proyecto

## Requisitos previos

Antes de ejecutar el proyecto, asegurate de tener instaladas las siguientes herramientas:

- [Git](https://git-scm.com/)
- Un servidor local que soporte rutas absolutas (recomendado: [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para VS Code o [http-server](https://www.npmjs.com/package/http-server))
- [Visual Studio Code](https://code.visualstudio.com/) u otro editor de codigo

> **Importante:** El proyecto usa rutas absolutas (`/HTML/`, `/CSS/`, `/JS/`). Debes servirlo desde un servidor local desde la raiz del proyecto. No funciona correctamente abriendo los archivos HTML directamente desde el sistema de archivos (`file://`).

## 1. Clonar el repositorio

```bash
git clone https://github.com/usuario/Proyecto_Conciertos_RodriguezJose.git
```

## 2. Entrar a la carpeta del proyecto

```bash
cd Proyecto_Conciertos_RodriguezJose
```

## 3. Iniciar un servidor local

**Opcion A: Con VS Code + Live Server**

1. Abre la carpeta en VS Code.
2. Haz clic derecho sobre `index.html`.
3. Selecciona **"Open with Live Server"**.

**Opcion B: Con http-server (Node.js)**

```bash
npm install -g http-server
http-server . -p 8080
```

El proyecto estara disponible en:

```
http://localhost:8080
```

## 4. Acceder al panel de administracion

Desde la pagina principal, haz clic en el icono de login (esquina superior derecha) o ve directamente a:

```
http://localhost:8080/HTML/login-page.html
```

Credenciales de administrador:

```
Email:    admin@mail.com
Contrasena: 123456
```

---

# Estructura del proyecto

```text
Proyecto_Conciertos_RodriguezJose/
├── HTML/                        # Paginas HTML del proyecto
│   ├── index.html              # Catalogo publico de eventos (landing page)
│   ├── login-page.html         # Pagina de login del administrador
│   ├── dashboard.html          # Panel principal del admin (estadisticas)
│   ├── eventos.html            # CRUD de eventos (admin)
│   ├── categorias.html         # CRUD de categorias (admin)
│   ├── ventas.html             # Historial de ventas (admin)
│   ├── descripcion.html        # Detalle de un evento (usuario)
│   └── carrito.html            # (Reservado para expansion futura)
├── CSS/                         # Hojas de estilo
│   ├── index.css               # Estilos del catalogo y carrito modal
│   ├── login-page.css          # Estilos de la pagina de login
│   ├── dashboard.css           # Estilos del panel admin
│   ├── eventos.css             # Estilos de gestion de eventos
│   ├── categorias.css          # Estilos de gestion de categorias
│   ├── ventas.css              # Estilos del ledger de ventas
│   ├── descripcion.css         # Estilos de la pagina de detalle
│   └── carrito.css             # Estilos del modal del carrito
├── JS/                          # Logica JavaScript
│   ├── auth-guard.js           # Proteccion de rutas admin + funcion logout
│   ├── login.js                # Web Components + logica de autenticacion
│   ├── animation.js            # Animaciones universales de entrada/salida
│   ├── script_index.js         # Catalogo, filtros y renderizado de eventos
│   ├── script_carrito.js       # Logica global del carrito y proceso de compra
│   ├── script_descripcion.js   # Pagina de detalle de evento individual
│   ├── script_dashboard.js     # Estadisticas del panel admin
│   ├── eventos.js              # CRUD de eventos en el admin
│   ├── categorias.js           # CRUD de categorias en el admin
│   └── script_ventas.js        # Historial y detalle de ventas en el admin
└── README.md                    # Documentacion principal
```

## Descripcion de carpetas importantes

| Carpeta | Descripcion |
|---|---|
| `HTML/` | Contiene todas las paginas del sistema separadas por rol (publico/admin). |
| `CSS/` | Hoja de estilos independiente por pagina para modularidad visual. |
| `JS/` | Logica JavaScript modular: cada archivo corresponde a una pagina o funcion global. |

---

# Documentacion del proyecto

## Descripcion general

TICKETHUB es una aplicacion web de venta de entradas a conciertos y eventos en Guatemala. Funciona completamente en el navegador usando localStorage como capa de persistencia, sin necesidad de servidor ni base de datos. El sistema tiene dos roles: el publico que puede explorar y comprar boletos, y el administrador que gestiona el catalogo completo desde un panel protegido por login.

## Objetivo general

Desarrollar una aplicacion web funcional para la gestion y venta de entradas a eventos, utilizando tecnologias del lado del cliente (HTML, CSS, JavaScript y localStorage) sin dependencia de servicios externos.

## Objetivos especificos

- Implementar un catalogo publico de eventos con busqueda y filtros multiples.
- Desarrollar un carrito de compras con proceso de checkout y generacion de boletas.
- Crear un panel de administracion protegido por autenticacion para gestionar categorias, eventos y ventas.
- Garantizar la persistencia de datos entre sesiones usando localStorage.
- Aplicar animaciones de transicion entre paginas para mejorar la experiencia de usuario.

## Funcionalidades

El sistema permite realizar las siguientes acciones:

**Area publica (usuario sin cuenta):**
- Explorar el catalogo de eventos disponibles con imagen, precio, fecha y ciudad.
- Filtrar eventos por nombre, categoria, ciudad, precio maximo y rango de fechas.
- Ver el detalle completo de un evento individual.
- Agregar eventos al carrito de compras.
- Completar la compra con datos personales y recibir una boleta con ID unico.

**Area de administracion (admin autenticado):**
- Iniciar y cerrar sesion de forma segura.
- Ver estadisticas en el dashboard: ventas totales, eventos activos, categorias activas y ultimas transacciones.
- Crear, editar y eliminar categorias de eventos.
- Crear, editar y eliminar eventos con imagen, descripcion, fecha, hora, precio y ciudad.
- Consultar el historial completo de ventas con detalle de cada transaccion.

## Usuarios del sistema

| Tipo de usuario | Permisos |
|---|---|
| Administrador | Accede al panel admin tras autenticarse. Puede gestionar categorias, eventos y visualizar todas las ventas. |
| Usuario publico | Puede explorar eventos, ver detalles, agregar al carrito y comprar boletos sin necesidad de cuenta. |

## Flujo principal

**Flujo del usuario publico:**
1. El usuario ingresa a la pagina principal (`index.html`).
2. Explora el catalogo y aplica filtros de busqueda.
3. Hace clic en "Details" para ver el detalle de un evento.
4. Agrega el evento al carrito.
5. Abre el carrito y completa el formulario de compra.
6. Recibe una confirmacion con el ID de la boleta.

**Flujo del administrador:**
1. El administrador accede a `/HTML/login-page.html`.
2. Ingresa sus credenciales (`admin@mail.com` / `123456`).
3. El sistema valida las credenciales y guarda la sesion en localStorage.
4. Es redirigido al dashboard con estadisticas en tiempo real.
5. Gestiona categorias y eventos desde las secciones correspondientes.
6. Cierra sesion con el boton "Cerrar Sesion" en el sidebar.

## Arquitectura

El proyecto usa una arquitectura de **Single Page Application parcial** del lado del cliente:

- **Sin backend:** Toda la logica corre en el navegador.
- **Persistencia:** localStorage actua como la "base de datos" del sistema.
- **Modularidad:** Cada pagina tiene su propio archivo JS y CSS.
- **Proteccion de rutas:** `auth-guard.js` verifica la sesion al cargar cada pagina admin.
- **Componentes reutilizables:** El carrito (`script_carrito.js`) expone funciones globales que son consumidas por `script_index.js` y `script_descripcion.js`.

## Modelo de datos (localStorage)

### Clave: `tickethub_local_cats` — Categorias

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | STRING | Timestamp como identificador unico (Date.now()). |
| `name` | STRING | Nombre de la categoria (ej: Concierto, Festival). |
| `description` | STRING | Descripcion breve de la categoria. |
| `icon` | STRING | Nombre del icono de Material Symbols. |
| `date` | STRING | Fecha de creacion en formato local. |

### Clave: `tickethub_local_events` — Eventos

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | STRING | Timestamp como identificador unico (Date.now()). |
| `code` | STRING | Codigo del evento ingresado por el admin (ej: EVT-001). |
| `name` | STRING | Nombre del evento. |
| `category` | STRING | Nombre de la categoria asignada. |
| `price` | STRING | Precio del boleto en dolares. |
| `city` | STRING | Ciudad y venue del evento. |
| `date` | STRING | Fecha del evento (formato YYYY-MM-DD). |
| `time` | STRING | Hora del evento (formato HH:MM). |
| `image` | STRING | URL de la imagen del evento. |
| `description` | STRING | Descripcion detallada del evento. |

### Clave: `tickethub_sales` — Ventas

| Campo | Tipo | Descripcion |
|---|---|---|
| `id` | STRING | ID de boleta con prefijo TK- (ej: TK-837291). |
| `fecha` | STRING | Fecha y hora de la compra en formato local. |
| `cliente` | STRING | Nombre completo del comprador. |
| `email` | STRING | Correo electronico del comprador. |
| `telefono` | STRING | Numero de telefono del comprador. |
| `direccion` | STRING | Direccion fisica del comprador. |
| `identificacion` | STRING | Numero de identificacion del comprador. |
| `monto` | STRING | Total de la compra con formato `$150.00`. |
| `status` | STRING | Estado de la venta (siempre "Confirmed"). |
| `tickets` | ARRAY | Lista de objetos de eventos comprados en esta boleta. |

### Clave: `tickethub_session` — Sesion de administrador

| Campo | Tipo | Descripcion |
|---|---|---|
| `role` | STRING | Rol del usuario autenticado (siempre "admin"). |
| `email` | STRING | Email del administrador. |
| `loginTime` | STRING | Timestamp ISO del momento del login. |

### Clave: `temp_cart` — Carrito temporal

Array de objetos de eventos agregados al carrito. Se limpia al completar la compra.

## Convenciones de codigo

Para mantener el proyecto organizado:

- Los nombres de variables y funciones se escriben en `camelCase`.
- Cada archivo JS documenta sus secciones con comentarios de bloque.
- Las funciones globales se exponen en `window` para comunicacion entre modulos.
- Todas las rutas de recursos usan rutas absolutas desde la raiz (`/CSS/`, `/JS/`, `/HTML/`).
- No se usa ninguna libreria externa ni framework de JavaScript.

## Convencion de commits

Utiliza mensajes claros y descriptivos:

```text
feat: agregar filtro de precio al catalogo de eventos
fix: corregir campo city en pagina de detalle del evento
docs: actualizar README con modelo de datos
style: mejorar responsive del sidebar en mobile
refactor: extraer logica de sesion a auth-guard.js
```

## Capturas de pantalla

### Catalogo principal

![Catalogo](docs/images/catalogo.png)

### Panel de administracion

![Dashboard](docs/images/dashboard.png)

> Guarda las capturas dentro de `docs/images/` y actualiza las rutas anteriores.

## Despliegue

El proyecto se puede desplegar en cualquier servicio de hosting estatico:

- **Recomendado:** [Vercel](https://vercel.com) o [Netlify](https://netlify.com) (arrastrar la carpeta del proyecto).
- **Alternativa:** GitHub Pages (configurar para servir desde la raiz).

> Nota: Al desplegarse en produccion, `localStorage` es por dominio. Cada visitante tiene su propio almacenamiento aislado.

## Problemas conocidos

- Las credenciales de administrador estan escritas directamente en el codigo (hardcoded). No es seguro para produccion real.
- El carrito se pierde si el usuario limpia los datos del sitio en el navegador.
- No hay soporte para multiples administradores ni gestion de roles avanzada.

## Mejoras futuras

- Implementar un backend real con base de datos para persistencia centralizada.
- Agregar autenticacion segura con JWT o OAuth.
- Permitir que los usuarios creen cuentas para ver el historial de sus compras.
- Agregar soporte para multiples idiomas (internacionalizacion).

## Como contribuir

1. Crea un fork del repositorio.
2. Crea una nueva rama:

```bash
git checkout -b feature/nombre-funcionalidad
```

3. Realiza los cambios.
4. Guarda los cambios:

```bash
git add .
git commit -m "feat: agregar nueva funcionalidad"
```

5. Envia la rama a GitHub:

```bash
git push origin feature/nombre-funcionalidad
```

6. Crea un Pull Request.

## Autor

- **Nombre:** Jose Guillermo Rodriguez Samcam
- **Curso:** Programacion Web / Desarrollo de Aplicaciones
- **GitHub:** https://github.com/Joguisam-gt

## Licencia

Este proyecto fue desarrollado con fines educativos.

---

## Lista de verificacion antes de entregar

- [x] El nombre y la descripcion del proyecto estan completos.
- [x] Las tecnologias utilizadas estan actualizadas.
- [x] Las instrucciones de instalacion funcionan.
- [x] No se requieren variables de entorno (proyecto 100% cliente).
- [x] La estructura corresponde al proyecto real.
- [x] Las funcionalidades estan descritas.
- [x] El modelo de datos de localStorage esta documentado.
- [x] El flujo de usuario y administrador estan descritos.
- [x] Las capturas de pantalla tienen su seccion (pendiente de imagenes).
- [x] No se incluyeron contrasenas ni datos privados sensibles en el repositorio.
- [ ] Los datos del autor estan completos (completar carné y seccion).
