/**
 * seed-data.js
 * Inicializa los datos por defecto en localStorage si no existen.
 * Se ejecuta en index.html (landing page) para garantizar que el
 * catalogo y el panel admin siempre tengan eventos y categorias
 * de muestra disponibles desde el primer acceso.
 *
 * Los datos NUNCA sobreescriben entradas creadas por el admin.
 * Solo se insertan si las claves de localStorage estan vacias.
 */

(function seedDefaultData() {

    // ============================================================
    // CATEGORIAS POR DEFECTO
    // ============================================================
    const DEFAULT_CATEGORIES = [
        { id: 'cat-001', name: 'Concierto', description: 'Eventos musicales en vivo con artistas nacionales e internacionales.', icon: 'music_note', date: '01/11/2026' },
        { id: 'cat-002', name: 'Festival', description: 'Festivales multigenero con multiples escenarios y artistas.', icon: 'festival', date: '01/11/2026' },
        { id: 'cat-003', name: 'Electronica', description: 'Noches de musica electronica, techno y house con DJs reconocidos.', icon: 'graphic_eq', date: '01/11/2026' },
        { id: 'cat-004', name: 'Rock', description: 'Conciertos de rock, metal y alternativo para todos los gustos.', icon: 'album', date: '01/11/2026' },
    ];

    // ============================================================
    // EVENTOS POR DEFECTO
    // ============================================================
    const DEFAULT_EVENTS = [
        {
            id: 'evt-001',
            code: 'TKH-001',
            name: 'Noche Electrica 2026',
            category: 'Electronica',
            price: '85',
            city: 'Guatemala City - Cementos Progreso',
            date: '2026-12-05',
            time: '21:00',
            image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&q=80',
            description: 'La noche de musica electronica mas grande del ano regresa. DJs internacionales, produccion de luces de clase mundial y un ambiente inigualable en el Estadio Cementos Progreso. Vive una experiencia sensorial completa con los mejores sets de techno y house.'
        },
        {
            id: 'evt-002',
            code: 'TKH-002',
            name: 'Festival Cayala Sounds',
            category: 'Festival',
            price: '120',
            city: 'Guatemala City - Cayala',
            date: '2026-12-13',
            time: '14:00',
            image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80',
            description: 'Tres escenarios, doce artistas y un fin de semana de musica sin parar en el corazon de Cayala. Disfruta de propuestas musicales de pop, indie y electronica mientras exploras la mejor gastronomia local. El festival del ano que no puedes perderte.'
        },
        {
            id: 'evt-003',
            code: 'TKH-003',
            name: 'Rock en el Mateo',
            category: 'Rock',
            price: '65',
            city: 'Guatemala City - Estadio Mateo Flores',
            date: '2026-12-20',
            time: '19:00',
            image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80',
            description: 'Las bandas de rock mas importantes de Centroamerica se reunen en el Estadio Mateo Flores para una noche epica. Desde hard rock clasico hasta metal alternativo, esta es la cita obligada para todo fanatic del rock en Guatemala.'
        },
        {
            id: 'evt-004',
            code: 'TKH-004',
            name: 'Latin Vibes Live',
            category: 'Concierto',
            price: '95',
            city: 'Guatemala City - Mundo E',
            date: '2027-01-10',
            time: '20:00',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
            description: 'Los ritmos latinos mas calientes del momento reunidos en un mismo escenario. Salsa, cumbia, reggaeton y pop latino con artistas de talla internacional. Una noche para bailar sin parar en el exclusivo venue Mundo E.'
        },
        {
            id: 'evt-005',
            code: 'TKH-005',
            name: 'Acoustic Sessions Vol. 3',
            category: 'Concierto',
            price: '45',
            city: 'Guatemala City - Cayala',
            date: '2027-01-17',
            time: '18:00',
            image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
            description: 'Una velada intima con los mejores artistas acusticos de Guatemala. Sin electricidad, solo talento puro. Disfruta de interpretaciones unicas en un ambiente relajado en el corazon de Cayala. Cupo limitado para una experiencia premium.'
        },
        {
            id: 'evt-006',
            code: 'TKH-006',
            name: 'Underground Techno Night',
            category: 'Electronica',
            price: '55',
            city: 'Guatemala City - Cementos Progreso',
            date: '2027-01-24',
            time: '23:00',
            image: 'https://images.unsplash.com/photo-1571266028243-d220c6a30b6d?w=600&q=80',
            description: 'La escena techno underground de Guatemala toma el control. DJs locales e internacionales en sets de alta energia que duran hasta el amanecer. Para los verdaderos amantes de la musica electronica pura y sin filtros.'
        },
    ];

    // Insertar categorias solo si no existen previamente
    const existingCats = localStorage.getItem('tickethub_local_cats');
    if (!existingCats || JSON.parse(existingCats).length === 0) {
        localStorage.setItem('tickethub_local_cats', JSON.stringify(DEFAULT_CATEGORIES));
    }

    // Insertar eventos solo si no existen previamente
    const existingEvents = localStorage.getItem('tickethub_local_events');
    if (!existingEvents || JSON.parse(existingEvents).length === 0) {
        localStorage.setItem('tickethub_local_events', JSON.stringify(DEFAULT_EVENTS));
    }

})();
