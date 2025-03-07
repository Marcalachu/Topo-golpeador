let puntuacion = 0;
// Usaremos una función para acceder al elemento de puntuación para evitar problemas de reasignación
function getPuntuacionElement() {
    return document.getElementById('puntuacion');
}
const topoElement = document.getElementById('topo');
const respuestasElement = document.getElementById('respuestas');
const resultadoElement = document.getElementById('resultado');

// Cargar sonidos
const sonidoCorrecto = new Audio('sounds/correct-choice-43861.mp3');
const sonidoIncorrecto = new Audio('sounds/incorrect-293358.mp3');
// Usar el archivo local Squeaky Clean como música de fondo
const musicaFondo = new Audio('sounds/1-01. Squeaky Clean.mp3');
musicaFondo.loop = true;
musicaFondo.volume = 0.2; // Volumen adecuado
sonidoCorrecto.volume = 0.7;
sonidoIncorrecto.volume = 0.7;

// Función para cargar música personalizada
function cargarMusicaPersonalizada(evento) {
    const archivo = evento.target.files[0];
    if (archivo) {
        const urlArchivo = URL.createObjectURL(archivo);
        musicaFondo.pause();
        musicaFondo.src = urlArchivo;
        musicaFondo.loop = true;
        musicaFondo.volume = 0.3;
        musicaFondo.play().catch(e => console.log('Error al reproducir música personalizada:', e));

        // Actualizar estado del botón
        const botonMusica = document.getElementById('toggleMusica');
        botonMusica.textContent = '🔊 ' + (idiomaActual === 'es' ? 'Música' : 'Music');

        // Mostrar nombre del archivo
        const nombreMusica = document.getElementById('nombreMusica');
        nombreMusica.textContent = archivo.name;
        nombreMusica.style.display = 'block';
    }
}

// Precarga de sonidos para móviles
function habilitarAudio() {
    sonidoCorrecto.load();
    sonidoIncorrecto.load();
    musicaFondo.load();

    // Intentar reproducir y pausar inmediatamente para habilitar audio en móviles
    sonidoCorrecto.play().then(() => sonidoCorrecto.pause()).catch(e => console.log('Error al precargar audio:', e));
    sonidoIncorrecto.play().then(() => sonidoIncorrecto.pause()).catch(e => console.log('Error al precargar audio:', e));
    musicaFondo.play().then(() => musicaFondo.pause()).catch(e => console.log('Error al precargar audio:', e));
}

const preguntas = {
    es: [
        // NIVEL FÁCIL (índices 0-14)
        {
            pregunta: "¿Cuál es la capital de Francia?",
            respuestas: ["Berlín", "Madrid", "París", "Lisboa", "Bruselas", "Roma"],
            correcta: 2
        },
        {
            pregunta: "¿Cuánto es 2 + 2?",
            respuestas: ["3", "4", "5", "6", "7", "8"],
            correcta: 1
        },
        {
            pregunta: "¿Cuál es el océano más grande?",
            respuestas: ["Atlántico", "Índico", "Pacífico", "Ártico", "Antártico", "Mediterráneo"],
            correcta: 2
        },
        {
            pregunta: "¿Qué planeta es conocido como el planeta rojo?",
            respuestas: ["Tierra", "Marte", "Júpiter", "Saturno", "Venus", "Mercurio"],
            correcta: 1
        },
        {
            pregunta: "¿Cuál es el continente más grande?",
            respuestas: ["África", "Asia", "América", "Europa", "Oceanía", "Antártida"],
            correcta: 1
        },
        {
            pregunta: "¿Cuál es el río más largo del mundo?",
            respuestas: ["Amazonas", "Nilo", "Yangtsé", "Misisipi", "Danubio", "Volga"],
            correcta: 0
        },
        {
            pregunta: "¿Cuál es el animal terrestre más grande?",
            respuestas: ["Jirafa", "Elefante africano", "Rinoceronte", "Hipopótamo", "Oso polar", "Ballena azul"],
            correcta: 1
        },
        {
            pregunta: "¿Cuántos días tiene una semana?",
            respuestas: ["5", "6", "7", "8", "9", "10"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el color del cielo en un día despejado?",
            respuestas: ["Verde", "Azul", "Rojo", "Amarillo", "Naranja", "Morado"],
            correcta: 1
        },
        {
            pregunta: "¿Cuántos lados tiene un triángulo?",
            respuestas: ["2", "3", "4", "5", "6", "7"],
            correcta: 1
        },
        {
            pregunta: "¿De qué color es el sol?",
            respuestas: ["Rojo", "Verde", "Azul", "Amarillo", "Naranja", "Blanco"],
            correcta: 3
        },
        {
            pregunta: "¿Cuál es el primer mes del año?",
            respuestas: ["Febrero", "Marzo", "Enero", "Abril", "Mayo", "Junio"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el idioma más hablado en España?",
            respuestas: ["Portugués", "Francés", "Español", "Inglés", "Alemán", "Italiano"],
            correcta: 2
        },
        {
            pregunta: "¿Cuántas estaciones hay en un año?",
            respuestas: ["2", "3", "4", "5", "6", "7"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el sabor del limón?",
            respuestas: ["Dulce", "Amargo", "Ácido", "Salado", "Picante", "Umami"],
            correcta: 2
        },
        
        // NIVEL MEDIO (índices 15-29)
        {
            pregunta: "¿En qué año comenzó la Segunda Guerra Mundial?",
            respuestas: ["1935", "1939", "1941", "1945", "1950", "1914"],
            correcta: 1
        },
        {
            pregunta: "¿Cuál es el elemento químico más abundante en el universo?",
            respuestas: ["Oxígeno", "Carbono", "Helio", "Hidrógeno", "Nitrógeno", "Hierro"],
            correcta: 3
        },
        {
            pregunta: "¿Cuál es la montaña más alta del mundo?",
            respuestas: ["K2", "Monte Everest", "Aconcagua", "Kilimanjaro", "Mont Blanc", "Denali"],
            correcta: 1
        },
        {
            pregunta: "¿Quién pintó la Mona Lisa?",
            respuestas: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Miguel Ángel", "Salvador Dalí", "Claude Monet"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el hueso más largo del cuerpo humano?",
            respuestas: ["Húmero", "Fémur", "Tibia", "Columna vertebral", "Radio", "Cúbito"],
            correcta: 1
        },
        {
            pregunta: "¿Qué país tiene forma de bota?",
            respuestas: ["España", "Francia", "Portugal", "Italia", "Grecia", "Turquía"],
            correcta: 3
        },
        {
            pregunta: "¿Qué instrumento musical tiene 88 teclas?",
            respuestas: ["Acordeón", "Órgano", "Piano", "Sintetizador", "Guitarra", "Violín"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es la velocidad de la luz aproximadamente?",
            respuestas: ["300.000 km/h", "3.000 km/s", "300.000 km/s", "3.000.000 km/s", "30.000 km/s", "3.000.000 km/h"],
            correcta: 2
        },
        {
            pregunta: "¿Qué órgano del cuerpo humano consume más energía?",
            respuestas: ["Hígado", "Corazón", "Cerebro", "Pulmones", "Riñones", "Intestinos"],
            correcta: 2
        },
        {
            pregunta: "¿Qué gas necesitan las plantas para realizar la fotosíntesis?",
            respuestas: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Hidrógeno", "Helio", "Argón"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el punto de ebullición del agua a nivel del mar?",
            respuestas: ["80°C", "90°C", "100°C", "110°C", "120°C", "200°C"],
            correcta: 2
        },
        {
            pregunta: "¿Quién escribió 'Don Quijote de la Mancha'?",
            respuestas: ["Federico García Lorca", "Miguel de Cervantes", "Gabriel García Márquez", "Pablo Neruda", "Jorge Luis Borges", "Mario Vargas Llosa"],
            correcta: 1
        },
        {
            pregunta: "¿En qué año se fundó la Organización de las Naciones Unidas?",
            respuestas: ["1935", "1940", "1945", "1950", "1955", "1960"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el valor de pi redondeado a dos decimales?",
            respuestas: ["3,12", "3,14", "3,16", "3,18", "3,20", "3,22"],
            correcta: 1
        },
        {
            pregunta: "¿Cuántos huesos tiene el cuerpo humano adulto?",
            respuestas: ["106", "186", "206", "226", "306", "356"],
            correcta: 2
        },
        
        // NIVEL DIFÍCIL (índices 30-44)
        {
            pregunta: "¿Cuál es el país más poblado del mundo?",
            respuestas: ["India", "China", "Estados Unidos", "Indonesia", "Brasil", "Rusia"],
            correcta: 1
        },
        {
            pregunta: "¿Cuántos lados tiene un hexágono?",
            respuestas: ["4", "5", "6", "7", "8", "9"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es la capital de Japón?",
            respuestas: ["Seúl", "Pekín", "Tokio", "Bangkok", "Manila", "Shanghái"],
            correcta: 2
        },
        {
            pregunta: "¿En qué año llegó el hombre a la Luna?",
            respuestas: ["1965", "1969", "1972", "1975", "1981", "1985"],
            correcta: 1
        },
        {
            pregunta: "¿Cuál es el deporte más popular del mundo?",
            respuestas: ["Baloncesto", "Fútbol", "Tenis", "Cricket", "Golf", "Natación"],
            correcta: 1
        },
        {
            pregunta: "¿Cuál es el metal más valioso?",
            respuestas: ["Oro", "Plata", "Platino", "Rodio", "Paladio", "Titanio"],
            correcta: 3
        },
        {
            pregunta: "¿Quién formuló la teoría de la relatividad?",
            respuestas: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Stephen Hawking", "Marie Curie", "Galileo Galilei"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el elemento químico con número atómico 1?",
            respuestas: ["Helio", "Litio", "Hidrógeno", "Oxígeno", "Carbono", "Nitrógeno"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es la partícula subatómica con carga positiva?",
            respuestas: ["Electrón", "Protón", "Neutrón", "Quark", "Fotón", "Bosón"],
            correcta: 1
        },
        {
            pregunta: "¿Qué científico formuló las leyes del movimiento planetario?",
            respuestas: ["Galileo Galilei", "Isaac Newton", "Johannes Kepler", "Nicolás Copérnico", "Tycho Brahe", "Carl Sagan"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es el número primo más pequeño?",
            respuestas: ["0", "1", "2", "3", "4", "5"],
            correcta: 2
        },
        {
            pregunta: "¿Qué civilización construyó Machu Picchu?",
            respuestas: ["Maya", "Azteca", "Inca", "Olmeca", "Tolteca", "Mochica"],
            correcta: 2
        },
        {
            pregunta: "¿Qué científico descubrió la penicilina?",
            respuestas: ["Marie Curie", "Louis Pasteur", "Alexander Fleming", "Joseph Lister", "Edward Jenner", "Robert Koch"],
            correcta: 2
        },
        {
            pregunta: "¿En qué año cayó el Muro de Berlín?",
            respuestas: ["1985", "1987", "1989", "1991", "1993", "1995"],
            correcta: 2
        },
        {
            pregunta: "¿Cuál es la galaxia más cercana a la Vía Láctea?",
            respuestas: ["Galaxia del Triángulo", "Galaxia del Sombrero", "Galaxia de Andrómeda", "Galaxia del Remolino", "Galaxia del Cigarro", "Galaxia del Ojo Negro"],
            correcta: 2
        }
    ],
    en: [
        // EASY LEVEL (indices 0-14)
        {
            pregunta: "What is the capital of France?",
            respuestas: ["Berlin", "Madrid", "Paris", "Lisbon", "Brussels", "Rome"],
            correcta: 2
        },
        {
            pregunta: "How much is 2 + 2?",
            respuestas: ["3", "4", "5", "6", "7", "8"],
            correcta: 1
        },
        {
            pregunta: "Which is the largest ocean?",
            respuestas: ["Atlantic", "Indian", "Pacific", "Arctic", "Antarctic", "Mediterranean"],
            correcta: 2
        },
        {
            pregunta: "Which planet is known as the red planet?",
            respuestas: ["Earth", "Mars", "Jupiter", "Saturn", "Venus", "Mercury"],
            correcta: 1
        },
        {
            pregunta: "Which is the largest continent?",
            respuestas: ["Africa", "Asia", "America", "Europe", "Oceania", "Antarctica"],
            correcta: 1
        },
        {
            pregunta: "Which is the longest river in the world?",
            respuestas: ["Amazon", "Nile", "Yangtze", "Mississippi", "Danube", "Volga"],
            correcta: 0
        },
        {
            pregunta: "Which is the largest land animal?",
            respuestas: ["Giraffe", "African Elephant", "Rhinoceros", "Hippopotamus", "Polar Bear", "Blue Whale"],
            correcta: 1
        },
        {
            pregunta: "How many days are in a week?",
            respuestas: ["5", "6", "7", "8", "9", "10"],
            correcta: 2
        },
        {
            pregunta: "What color is the sky on a clear day?",
            respuestas: ["Green", "Blue", "Red", "Yellow", "Orange", "Purple"],
            correcta: 1
        },
        {
            pregunta: "How many sides does a triangle have?",
            respuestas: ["2", "3", "4", "5", "6", "7"],
            correcta: 1
        },
        {
            pregunta: "What color is the sun?",
            respuestas: ["Red", "Green", "Blue", "Yellow", "Orange", "White"],
            correcta: 3
        },
        {
            pregunta: "What is the first month of the year?",
            respuestas: ["February", "March", "January", "April", "May", "June"],
            correcta: 2
        },
        {
            pregunta: "What is the most spoken language in the United States?",
            respuestas: ["Spanish", "French", "English", "Chinese", "German", "Italian"],
            correcta: 2
        },
        {
            pregunta: "How many seasons are in a year?",
            respuestas: ["2", "3", "4", "5", "6", "7"],
            correcta: 2
        },
        {
            pregunta: "What is the taste of lemon?",
            respuestas: ["Sweet", "Bitter", "Sour", "Salty", "Spicy", "Umami"],
            correcta: 2
        },
        
        // MEDIUM LEVEL (indices 15-29)
        {
            pregunta: "In which year did World War II begin?",
            respuestas: ["1935", "1939", "1941", "1945", "1950", "1914"],
            correcta: 1
        },
        {
            pregunta: "What is the most abundant chemical element in the universe?",
            respuestas: ["Oxygen", "Carbon", "Helium", "Hydrogen", "Nitrogen", "Iron"],
            correcta: 3
        },
        {
            pregunta: "What is the highest mountain in the world?",
            respuestas: ["K2", "Mount Everest", "Aconcagua", "Kilimanjaro", "Mont Blanc", "Denali"],
            correcta: 1
        },
        {
            pregunta: "Who painted the Mona Lisa?",
            respuestas: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo", "Salvador Dalí", "Claude Monet"],
            correcta: 2
        },
        {
            pregunta: "What is the longest bone in the human body?",
            respuestas: ["Humerus", "Femur", "Tibia", "Spine", "Radius", "Ulna"],
            correcta: 1
        },
        {
            pregunta: "Which country is shaped like a boot?",
            respuestas: ["Spain", "France", "Portugal", "Italy", "Greece", "Turkey"],
            correcta: 3
        },
        {
            pregunta: "Which musical instrument has 88 keys?",
            respuestas: ["Accordion", "Organ", "Piano", "Synthesizer", "Guitar", "Violin"],
            correcta: 2
        },
        {
            pregunta: "What is the approximate speed of light?",
            respuestas: ["300,000 km/h", "3,000 km/s", "300,000 km/s", "3,000,000 km/s", "30,000 km/s", "3,000,000 km/h"],
            correcta: 2
        },
        {
            pregunta: "Which organ in the human body uses the most energy?",
            respuestas: ["Liver", "Heart", "Brain", "Lungs", "Kidneys", "Intestines"],
            correcta: 2
        },
        {
            pregunta: "Which gas do plants need for photosynthesis?",
            respuestas: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen", "Helium", "Argon"],
            correcta: 2
        },
        {
            pregunta: "What is the boiling point of water at sea level?",
            respuestas: ["80°C", "90°C", "100°C", "110°C", "120°C", "200°C"],
            correcta: 2
        },
        {
            pregunta: "Who wrote 'Romeo and Juliet'?",
            respuestas: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
            correcta: 1
        },
        {
            pregunta: "In which year was the United Nations founded?",
            respuestas: ["1935", "1940", "1945", "1950", "1955", "1960"],
            correcta: 2
        },
        {
            pregunta: "What is the value of pi rounded to two decimal places?",
            respuestas: ["3.12", "3.14", "3.16", "3.18", "3.20", "3.22"],
            correcta: 1
        },
        {
            pregunta: "How many bones are in the adult human body?",
            respuestas: ["106", "186", "206", "226", "306", "356"],
            correcta: 2
        },
        
        // HARD LEVEL (indices 30-44)
        {
            pregunta: "What is the most populous country in the world?",
            respuestas: ["India", "China", "United States", "Indonesia", "Brazil", "Russia"],
            correcta: 1
        },
        {
            pregunta: "How many sides does a hexagon have?",
            respuestas: ["4", "5", "6", "7", "8", "9"],
            correcta: 2
        },
        {
            pregunta: "What is the capital of Japan?",
            respuestas: ["Seoul", "Beijing", "Tokyo", "Bangkok", "Manila", "Shanghai"],
            correcta: 2
        },
        {
            pregunta: "In which year did man land on the Moon?",
            respuestas: ["1965", "1969", "1972", "1975", "1981", "1985"],
            correcta: 1
        },
        {
            pregunta: "What is the most popular sport in the world?",
            respuestas: ["Basketball", "Football/Soccer", "Tennis", "Cricket", "Golf", "Swimming"],
            correcta: 1
        },
        {
            pregunta: "What is the most valuable metal?",
            respuestas: ["Gold", "Silver", "Platinum", "Rhodium", "Palladium", "Titanium"],
            correcta: 3
        },
        {
            pregunta: "Who formulated the theory of relativity?",
            respuestas: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Stephen Hawking", "Marie Curie", "Galileo Galilei"],
            correcta: 2
        },
        {
            pregunta: "What is the chemical element with atomic number 1?",
            respuestas: ["Helium", "Lithium", "Hydrogen", "Oxygen", "Carbon", "Nitrogen"],
            correcta: 2
        },
        {
            pregunta: "What is the subatomic particle with a positive charge?",
            respuestas: ["Electron", "Proton", "Neutron", "Quark", "Photon", "Boson"],
            correcta: 1
        },
        {
            pregunta: "Which scientist formulated the laws of planetary motion?",
            respuestas: ["Galileo Galilei", "Isaac Newton", "Johannes Kepler", "Nicholas Copernicus", "Tycho Brahe", "Carl Sagan"],
            correcta: 2
        },
        {
            pregunta: "What is the smallest prime number?",
            respuestas: ["0", "1", "2", "3", "4", "5"],
            correcta: 2
        },
        {
            pregunta: "Which civilization built Machu Picchu?",
            respuestas: ["Maya", "Aztec", "Inca", "Olmec", "Toltec", "Moche"],
            correcta: 2
        },
        {
            pregunta: "Which scientist discovered penicillin?",
            respuestas: ["Marie Curie", "Louis Pasteur", "Alexander Fleming", "Joseph Lister", "Edward Jenner", "Robert Koch"],
            correcta: 2
        },
        {
            pregunta: "In which year did the Berlin Wall fall?",
            respuestas: ["1985", "1987", "1989", "1991", "1993", "1995"],
            correcta: 2
        },
        {
            pregunta: "What is the closest galaxy to the Milky Way?",
            respuestas: ["Triangulum Galaxy", "Sombrero Galaxy", "Andromeda Galaxy", "Whirlpool Galaxy", "Cigar Galaxy", "Black Eye Galaxy"],
            correcta: 2
        }
    ]
};

function aparecerTopo() {
    // Calcula el tamaño actual del área de juego
    const gameAreaWidth = document.getElementById('gameArea').offsetWidth;
    const gameAreaHeight = document.getElementById('gameArea').offsetHeight;

    // Asegurarse de que el área de juego es visible
    const gameArea = document.getElementById('gameArea');
    gameArea.style.display = 'block';

    // Ajusta el tamaño del topo en dispositivos pequeños
    const topoSize = Math.min(90, gameAreaWidth / 4);
    topoElement.style.width = topoSize + 'px';
    topoElement.style.height = topoSize + 'px';

    // Asegurarse que el topo sea visible en dispositivos muy pequeños
    if (gameAreaWidth < 200) {
        topoElement.style.width = (gameAreaWidth / 3) + 'px';
        topoElement.style.height = (gameAreaWidth / 3) + 'px';
    }

    // Ajusta los límites para la posición del topo
    const maxX = gameAreaWidth - topoSize;
    const maxY = gameAreaHeight - topoSize;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    // Efecto de aparición
    topoElement.style.transform = 'scale(0)';
    topoElement.style.left = x + 'px';
    topoElement.style.top = y + 'px';
    topoElement.style.display = 'block';

    // Comprobar si la imagen de fondo está cargada
    const imagen = new Image();
    imagen.src = 'images/topo.png';
    imagen.onload = function() {
        console.log("Imagen del topo cargada correctamente");
    };
    imagen.onerror = function() {
        console.error("Error al cargar la imagen del topo");
        // Intentar una solución alternativa - usar un emoji como respaldo
        topoElement.textContent = "🦔";
        topoElement.style.fontSize = "40px";
        topoElement.style.textAlign = "center";
        topoElement.style.lineHeight = topoSize + "px";
        topoElement.style.backgroundColor = "#4a7c59";
        topoElement.style.borderRadius = "50%";
    };

    setTimeout(() => {
        topoElement.style.transform = 'scale(1)';
    }, 50);
}

// Variables globales para el idioma actual y dificultad
let idiomaActual = 'es';
let dificultadActual = 'facil'; // Por defecto es fácil

// Registro de preguntas mostradas para evitar repeticiones
let historialPreguntas = {
    facil: {},
    medio: {},
    dificil: {}
};

// Función para filtrar preguntas por dificultad
function filtrarPreguntasPorDificultad() {
    const todasPreguntas = preguntas[idiomaActual];

    // Asignar rangos de dificultad para el nuevo conjunto ampliado de preguntas
    if (dificultadActual === 'facil') {
        return todasPreguntas.slice(0, 15); // Primeras 15 preguntas (más fáciles)
    } else if (dificultadActual === 'medio') {
        return todasPreguntas.slice(15, 30); // 15 preguntas de dificultad media
    } else {
        return todasPreguntas.slice(30, 45); // Últimas 15 preguntas (más difíciles)
    }
}

// Función para seleccionar una pregunta evitando repeticiones de manera más efectiva
function seleccionarPregunta() {
    const preguntasFiltradas = filtrarPreguntasPorDificultad();

    // Si no hay historial para este idioma y dificultad, inicializarlo
    if (!historialPreguntas[dificultadActual][idiomaActual]) {
        historialPreguntas[dificultadActual][idiomaActual] = {};
    }

    const historialActual = historialPreguntas[dificultadActual][idiomaActual];

    // Primero, intentar encontrar preguntas que no se han mostrado nunca
    const preguntasNoMostradas = preguntasFiltradas.filter(p => 
        historialActual[p.pregunta] === undefined);
    
    // Si hay preguntas que nunca se han mostrado, elegir una al azar
    if (preguntasNoMostradas.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * preguntasNoMostradas.length);
        const preguntaSeleccionada = preguntasNoMostradas[indiceAleatorio];
        
        // Registrar que esta pregunta se ha mostrado
        historialActual[preguntaSeleccionada.pregunta] = 1;
        return preguntaSeleccionada;
    }
    
    // Si todas las preguntas ya se han mostrado al menos una vez,
    // verificar si todas tienen el mismo número de apariciones
    const frecuencias = Object.values(historialActual);
    const todasIguales = frecuencias.every(f => f === frecuencias[0]);
    const todasLasPreguntas = Object.keys(historialActual).length === preguntasFiltradas.length;
    
    // Si todas se han mostrado el mismo número de veces, podemos resetear el historial
    if (todasLasPreguntas && todasIguales && frecuencias[0] >= 2) {
        console.log(`Reseteando historial para ${idiomaActual} dificultad ${dificultadActual} - todas mostradas ${frecuencias[0]} veces`);
        historialPreguntas[dificultadActual][idiomaActual] = {};
        
        // Elegir una pregunta al azar después del reset
        const indiceAleatorio = Math.floor(Math.random() * preguntasFiltradas.length);
        const preguntaSeleccionada = preguntasFiltradas[indiceAleatorio];
        
        // Registrar que esta pregunta se ha mostrado
        historialActual[preguntaSeleccionada.pregunta] = 1;
        return preguntaSeleccionada;
    }
    
    // Encontrar la frecuencia mínima de aparición
    const frecuenciaMinima = Math.min(...Object.values(historialActual));
    
    // Seleccionar preguntas que tienen la frecuencia mínima
    const preguntasMenosVistas = preguntasFiltradas.filter(p => 
        (historialActual[p.pregunta] || 0) === frecuenciaMinima);
    
    // Elegir una pregunta al azar entre las menos vistas
    const indiceAleatorio = Math.floor(Math.random() * preguntasMenosVistas.length);
    const preguntaSeleccionada = preguntasMenosVistas[indiceAleatorio];
    
    // Registrar que esta pregunta se ha mostrado una vez más
    historialActual[preguntaSeleccionada.pregunta] = 
        (historialActual[preguntaSeleccionada.pregunta] || 0) + 1;
    
    return preguntaSeleccionada;
}

function mostrarRespuestas() {
    // Obtener pregunta evitando repeticiones
    const pregunta = seleccionarPregunta();
    respuestasElement.innerHTML = `<h3 style="color:#4a7c59; text-align:center; margin-top:0;">${pregunta.pregunta}</h3>`;

    const opcionesContainer = document.createElement('div');
    opcionesContainer.style.display = 'flex';
    opcionesContainer.style.flexWrap = 'wrap';
    opcionesContainer.style.justifyContent = 'center';

    pregunta.respuestas.forEach((respuesta, index) => {
        const div = document.createElement('div');
        div.className = 'respuesta';
        div.style.width = 'calc(50% - 20px)';
        div.textContent = respuesta;
        div.onclick = function() {
            verificarRespuesta(index, pregunta.correcta);
        };
        opcionesContainer.appendChild(div);
    });

    respuestasElement.appendChild(opcionesContainer);

    topoElement.style.display = 'none';
    respuestasElement.classList.remove('hidden');
    
    // Asegurar que el diálogo de respuestas aparezca sobre TODOS los elementos
    respuestasElement.style.position = 'fixed';
    respuestasElement.style.left = '50%';
    respuestasElement.style.top = '50%';
    respuestasElement.style.transform = 'translate(-50%, -50%)';
    respuestasElement.style.zIndex = '1000'; // Aumentamos considerablemente el z-index
    respuestasElement.style.maxHeight = '80vh'; // Limitar altura máxima
    respuestasElement.style.overflowY = 'auto'; // Permitir scroll si es necesario
    respuestasElement.style.maxWidth = '90vw'; // Limitar ancho máximo
    
    // Agregar fondo semi-transparente para resaltar
    const overlay = document.createElement('div');
    overlay.id = 'respuestas-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '999';
    document.body.appendChild(overlay);
    
    // Efecto de aparición
    respuestasElement.style.opacity = '0';
    setTimeout(() => {
        respuestasElement.style.transition = 'opacity 0.3s';
        respuestasElement.style.opacity = '1';
    }, 50);
}

function verificarRespuesta(seleccionada, correcta) {
    respuestasElement.classList.add('hidden');
    resultadoElement.classList.remove('hidden');
    
    // Eliminar el overlay si existe
    const overlay = document.getElementById('respuestas-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }

    if (seleccionada === correcta) {
        // Incrementar puntuación y actualizarla en la interfaz
        if (modoEquipo) {
            equipos[equipoActual].puntuacion++;
            actualizarPuntuacionesEquipos();
        } else {
            puntuacion++;
            document.getElementById('puntuacion').textContent = puntuacion;
        }

        resultadoElement.textContent = idiomaActual === 'es' ? "¡Correcto! 🎉" : "Correct! 🎉";
        resultadoElement.className = "correcto";

        // Reproducir sonido de correcto
        sonidoCorrecto.currentTime = 0; // Reiniciar sonido
        sonidoCorrecto.play().catch(e => console.log('Error al reproducir sonido correcto:', e));
    } else {
        resultadoElement.textContent = idiomaActual === 'es' ? "¡Incorrecto! 😞" : "Incorrect! 😞";
        resultadoElement.className = "incorrecto";

        // Reproducir sonido de incorrecto
        sonidoIncorrecto.currentTime = 0; // Reiniciar sonido
        sonidoIncorrecto.play().catch(e => console.log('Error al reproducir sonido incorrecto:', e));
    }

    setTimeout(() => {
        resultadoElement.classList.add('hidden');

        // En modo equipo, cambiamos de turno después de cada respuesta
        if (modoEquipo) {
            cambiarTurnoEquipo();
        }

        // Verificar si estamos en modo contrareloj y el tiempo no se ha acabado
        if (modoContrareloj && tiempoRestante > 0) {
            setTimeout(aparecerTopo, 500);
        } else if (!modoContrareloj) {
            // En otros modos, simplemente mostrar el topo
            setTimeout(aparecerTopo, 500);
        }
    }, 1500);
}

// Iniciar juego y habilitar audio
setTimeout(aparecerTopo, 1000);

// Habilitar audio con interacción del usuario (requerido por navegadores modernos)
document.addEventListener('click', function iniciarAudio() {
    habilitarAudio();

    // Cargar correctamente la música antes de intentar reproducirla
    musicaFondo.load();

    // Intentar reproducir la música después de un breve retraso
    setTimeout(() => {
        try {
            // Usar un manejador de promesa más robusto
            const promesa = musicaFondo.play();
            if (promesa !== undefined) {
                promesa
                    .then(() => {
                        console.log('Música iniciada correctamente');
                        botonMusica.textContent = '🔊 ' + (idiomaActual === 'es' ? 'Música' : 'Music');
                    })
                    .catch(e => {
                        console.log('Error al iniciar la música automáticamente:', e);
                        // No intentamos reiniciar automáticamente para evitar bucles
                    });
            }
        } catch (error) {
            console.log('Error al intentar reproducir la música:', error);
        }
    }, 1500);

    // Remover este listener después de la primera interacción
    document.removeEventListener('click', iniciarAudio);
}, { once: true });

// También permitir inicio de audio con tap o touch
document.addEventListener('touchstart', function iniciarAudioTouch() {
    habilitarAudio();
    // Iniciar música con un breve retraso
    setTimeout(() => {
        musicaFondo.play().catch(e => console.log('Error al reproducir música:', e));
    }, 1000);
    document.removeEventListener('touchstart', iniciarAudioTouch);
}, { once: true });

// Control de música
const botonMusica = document.getElementById('toggleMusica');
botonMusica.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar que se propague al documento
    e.preventDefault(); // Prevenir comportamiento predeterminado

    // Evitar que cualquier otro sonido se reproduzca al hacer clic en este botón
    sonidoIncorrecto.pause();
    sonidoIncorrecto.currentTime = 0;
    sonidoCorrecto.pause();
    sonidoCorrecto.currentTime = 0;

    if (musicaFondo.paused) {
        const promesa = musicaFondo.play();
        if (promesa !== undefined) {
            promesa.then(() => {
                console.log('Música activada correctamente');
                botonMusica.textContent = '🔊 ' + (idiomaActual === 'es' ? 'Música' : 'Music');
            }).catch(e => {
                console.log('Error al reproducir música:', e);
            });
        }
    } else {
        musicaFondo.pause();
        botonMusica.textContent = '🔇 ' + (idiomaActual === 'es' ? 'Música' : 'Music');
    }
});

// Control de música personalizada
const inputMusica = document.getElementById('subirMusica');
inputMusica.addEventListener('change', cargarMusicaPersonalizada);

// Botón para iniciar música manualmente
const botonIniciarMusica = document.getElementById('iniciarMusica');
botonIniciarMusica.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar que se propague al documento
    e.preventDefault(); // Prevenir comportamiento predeterminado

    // Evitar que cualquier otro sonido se reproduzca
    sonidoIncorrecto.pause();
    sonidoIncorrecto.currentTime = 0;
    sonidoCorrecto.pause();
    sonidoCorrecto.currentTime = 0;

    // Detener cualquier reproducción actual y cargar de nuevo
    musicaFondo.pause();
    musicaFondo.load();

    // Reiniciar la música
    musicaFondo.currentTime = 0;
    musicaFondo.volume = 0.3; // Volumen adecuado

    try {
        const promesa = musicaFondo.play();
        if (promesa !== undefined) {
            promesa.then(() => {
                console.log('Música iniciada correctamente desde botón');
                botonMusica.textContent = '🔊 ' + (idiomaActual === 'es' ? 'Música' : 'Music');
            }).catch(e => {
                console.log('Error al reproducir música desde botón:', e);

                // Mostrar un mensaje visual en lugar de reproducir un sonido de error
                const resultadoTemp = document.getElementById('resultado');
                resultadoTemp.textContent = idiomaActual === 'es' ? 
                    "Haz clic en cualquier parte para activar el audio" : 
                    "Click anywhere to enable audio";
                resultadoTemp.className = "correcto";
                resultadoTemp.classList.remove('hidden');

                setTimeout(() => {
                    resultadoTemp.classList.add('hidden');
                }, 2000);
            });
        }
    } catch (error) {
        console.log('Error al intentar reproducir música manualmente:', error);
    }
});

// Cambio de idioma y dificultad
const botonES = document.getElementById('es-btn');
const botonEN = document.getElementById('en-btn');

// Configuración de botones de dificultad
const botonFacil = document.getElementById('facil-btn');
const botonMedio = document.getElementById('medio-btn');
const botonDificil = document.getElementById('dificil-btn');

botonES.addEventListener('click', () => {
    idiomaActual = 'es';
    botonES.classList.add('boton-activo');
    botonEN.classList.remove('boton-activo');
    actualizarIdiomaUI();
    // Notificar al usuario del cambio de idioma
    mostrarMensajeFlotante('¡Idioma Español!', '#4a7c59');
});

botonEN.addEventListener('click', () => {
    idiomaActual = 'en';
    botonEN.classList.add('boton-activo');
    botonES.classList.remove('boton-activo');
    actualizarIdiomaUI();
    // Notificar al usuario del cambio de idioma
    mostrarMensajeFlotante('English Language!', '#4a7c59');
});

// Manejadores para los botones de dificultad
botonFacil.addEventListener('click', () => {
    dificultadActual = 'facil';
    actualizarBotonesDificultad();
    // Notificar al usuario del cambio de dificultad con un mensaje visual
    mostrarMensajeFlotante(idiomaActual === 'es' ? '¡Dificultad Fácil!' : 'Easy Mode!', '#4CAF50');
});

botonMedio.addEventListener('click', () => {
    dificultadActual = 'medio';
    actualizarBotonesDificultad();
    // Notificar al usuario del cambio de dificultad con un mensaje visual
    mostrarMensajeFlotante(idiomaActual === 'es' ? '¡Dificultad Media!' : 'Medium Mode!', '#FF9800');
});

botonDificil.addEventListener('click', () => {
    dificultadActual = 'dificil';
    actualizarBotonesDificultad();
    // Notificar al usuario del cambio de dificultad con un mensaje visual
    mostrarMensajeFlotante(idiomaActual === 'es' ? '¡Dificultad Difícil!' : 'Hard Mode!', '#F44336');
});

// Función para mostrar mensajes flotantes
function mostrarMensajeFlotante(texto, color) {
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-flotante');
    mensaje.textContent = texto;
    mensaje.style.backgroundColor = color;

    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.classList.add('mostrar');
    }, 50);

    setTimeout(() => {
        mensaje.classList.remove('mostrar');
        setTimeout(() => {
            document.body.removeChild(mensaje);
        }, 500);
    }, 1500);
}

// Función para actualizar estilo de botones de dificultad
function actualizarBotonesDificultad() {
    // Quitar clase activa de todos los botones
    botonFacil.classList.remove('boton-activo');
    botonMedio.classList.remove('boton-activo');
    botonDificil.classList.remove('boton-activo');

    // Añadir clase activa al botón seleccionado
    if (dificultadActual === 'facil') {
        botonFacil.classList.add('boton-activo');
    } else if (dificultadActual === 'medio') {
        botonMedio.classList.add('boton-activo');
    } else {
        botonDificil.classList.add('boton-activo');
    }
}

function actualizarIdiomaUI() {
    // Actualizar textos de la interfaz
    const titulo = document.querySelector('h1');
    const instrucciones = document.querySelector('.instrucciones p');
    const puntuacionLabel = document.querySelector('h2');

    // Obtener el elemento de puntuación actual
    let puntuacionElement = document.getElementById('puntuacion');

    // Actualizar textos según el idioma
    if (idiomaActual === 'es') {
        titulo.textContent = '🎮 ¡Golpea al Topo! 🎮';
        instrucciones.textContent = '¡Haz clic en el topo y responde correctamente a las preguntas para ganar puntos!';
        puntuacionLabel.innerHTML = '🏆 Puntuación: <span id="puntuacion">' + puntuacion + '</span> 🏆';
        botonMusica.textContent = musicaFondo.paused ? '🔇 Música' : '🔊 Música';
        document.getElementById('musicaPersonalizadaLabel').textContent = 'Subir tu música:';

        // Actualizar textos de dificultad
        document.getElementById('dificultad-label').textContent = 'Dificultad:';
        document.getElementById('facil-btn').textContent = 'Fácil';
        document.getElementById('medio-btn').textContent = 'Medio';
        document.getElementById('dificil-btn').textContent = 'Difícil';

        // Actualizar mensajes de respuesta
        if (!resultadoElement.classList.contains('hidden')) {
            resultadoElement.textContent = resultadoElement.className.includes('correcto') ? '¡Correcto!' : '¡Incorrecto!';
        }
    } else {
        titulo.textContent = '🎮 Whack-a-Mole! 🎮';
        instrucciones.textContent = 'Click on the mole and answer the questions correctly to earn points!';
        puntuacionLabel.innerHTML = '🏆 Score: <span id="puntuacion">' + puntuacion + '</span> 🏆';
        botonMusica.textContent = musicaFondo.paused ? '🔇 Music' : '🔊 Music';
        document.getElementById('musicaPersonalizadaLabel').textContent = 'Upload your music:';

        // Actualizar textos de dificultad
        document.getElementById('dificultad-label').textContent = 'Difficulty:';
        document.getElementById('facil-btn').textContent = 'Easy';
        document.getElementById('medio-btn').textContent = 'Medium';
        document.getElementById('dificil-btn').textContent = 'Hard';

        // Actualizar mensajes de respuesta
        if (!resultadoElement.classList.contains('hidden')) {
            resultadoElement.textContent = resultadoElement.className.includes('correcto') ? 'Correct!' : 'Incorrect!';

// Funciones para el modo contrareloj
function toggleModoContrareloj() {
    modoContrareloj = true;
    modoSolo = false;
    modoEquipo = false;

    const modoContrarelojBtn = document.getElementById('modoContrareloj-btn');
    const modoEquipoBtn = document.getElementById('modoEquipo-btn');
    const modoSoloBtn = document.getElementById('modoSolo-btn');
    const seccionEquipos = document.getElementById('seccionEquipos');
    const puntuacionIndividual = document.getElementById('puntuacionIndividual');
    const configuracionContrareloj = document.getElementById('configuracionContrareloj');

    // Actualizar botones de modo de juego
    modoContrarelojBtn.classList.add('boton-activo');
    modoEquipoBtn.classList.remove('boton-activo');
    modoSoloBtn.classList.remove('boton-activo');
    
    // Mostrar/ocultar secciones
    seccionEquipos.classList.add('hidden');
    puntuacionIndividual.classList.remove('hidden');
    configuracionContrareloj.classList.remove('hidden');

    // Crear elementos de tiempo si no existen
    crearElementosTiempo();

    // Mostrar efecto visual de cambio de modo
    mostrarEfectoCambioModo(idiomaActual === 'es' ? '¡Modo Contrareloj!' : 'Timer Mode!');

    // Reiniciar puntuación individual
    puntuacion = 0;
    document.getElementById('puntuacion').textContent = puntuacion;
}

function crearElementosTiempo() {
    // Verificar si ya existe el contenedor del timer
    let timerContainer = document.getElementById('timer-container');
    if (!timerContainer) {
        timerContainer = document.createElement('div');
        timerContainer.id = 'timer-container';
        
        // Crear barra de tiempo
        const timerBarContainer = document.createElement('div');
        timerBarContainer.className = 'timer-bar-container';
        
        timerBarElement = document.createElement('div');
        timerBarElement.className = 'timer-bar';
        timerBarContainer.appendChild(timerBarElement);
        
        // Crear texto de tiempo
        const timerTexto = document.createElement('div');
        timerTexto.id = 'timer-texto';
        timerTexto.className = 'timer-texto';
        timerTexto.textContent = formatearTiempo(tiempoSeleccionado);
        
        // Añadir elementos al contenedor
        timerContainer.appendChild(timerBarContainer);
        timerContainer.appendChild(timerTexto);
        
        // Insertar después del área de juego
        const gameArea = document.getElementById('gameArea');
        if (gameArea && gameArea.parentNode) {
            gameArea.parentNode.insertBefore(timerContainer, gameArea.nextSibling);
        }
    }
    
    // Configurar selectores de tiempo
    const opcionesTiempo = document.querySelectorAll('.opcion-tiempo');
    opcionesTiempo.forEach(opcion => {
        opcion.addEventListener('click', () => {
            // Remover clase activa de todas las opciones
            opcionesTiempo.forEach(op => op.classList.remove('boton-activo'));
            
            // Añadir clase activa a la opción seleccionada
            opcion.classList.add('boton-activo');
            
            // Actualizar tiempo seleccionado
            tiempoSeleccionado = parseInt(opcion.dataset.tiempo);
            
            // Actualizar texto de tiempo
            document.getElementById('timer-texto').textContent = formatearTiempo(tiempoSeleccionado);
        });
    });
    
    // Añadir botón para iniciar el juego
    let botonIniciar = document.getElementById('iniciar-contrareloj');
    if (!botonIniciar) {
        botonIniciar = document.createElement('button');
        botonIniciar.id = 'iniciar-contrareloj';
        botonIniciar.className = 'boton-control';
        botonIniciar.textContent = idiomaActual === 'es' ? '▶️ Iniciar Juego' : '▶️ Start Game';
        botonIniciar.style.margin = '10px auto';
        botonIniciar.style.display = 'block';
        
        botonIniciar.addEventListener('click', iniciarJuegoContrareloj);
        
        if (timerContainer) {
            timerContainer.appendChild(botonIniciar);
        }
    }
}

function iniciarJuegoContrareloj() {
    // Ocultar configuración de contrareloj y botón de inicio
    document.getElementById('configuracionContrareloj').classList.add('hidden');
    document.getElementById('iniciar-contrareloj').style.display = 'none';
    
    // Reiniciar puntuación
    puntuacion = 0;
    document.getElementById('puntuacion').textContent = puntuacion;
    
    // Inicializar tiempo
    tiempoRestante = tiempoSeleccionado;
    document.getElementById('timer-texto').textContent = formatearTiempo(tiempoRestante);
    
    // Reiniciar barra de tiempo
    timerBarElement.style.width = '100%';
    timerBarElement.classList.remove('timer-warning', 'timer-danger');
    
    // Iniciar topo
    aparecerTopo();
    
    // Iniciar cuenta regresiva
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    timerInterval = setInterval(() => {
        tiempoRestante--;
        document.getElementById('timer-texto').textContent = formatearTiempo(tiempoRestante);
        
        // Actualizar barra de progreso
        const porcentaje = (tiempoRestante / tiempoSeleccionado) * 100;
        timerBarElement.style.width = porcentaje + '%';
        
        // Cambiar color según el tiempo restante
        if (porcentaje <= 30 && porcentaje > 10) {
            timerBarElement.classList.add('timer-warning');
            timerBarElement.classList.remove('timer-danger');
        } else if (porcentaje <= 10) {
            timerBarElement.classList.add('timer-danger');
            timerBarElement.classList.remove('timer-warning');
        }
        
        // Si se acaba el tiempo
        if (tiempoRestante <= 0) {
            clearInterval(timerInterval);
            finalizarJuegoContrareloj();
        }
    }, 1000);
}

function finalizarJuegoContrareloj() {
    // Ocultar topo
    topoElement.style.display = 'none';
    
    // Mostrar mensaje de finalización
    const mensajeFinal = document.createElement('div');
    mensajeFinal.className = 'mensaje-final';
    
    let titulo = document.createElement('h2');
    titulo.textContent = idiomaActual === 'es' ? '¡Tiempo Terminado!' : 'Time\'s Up!';
    
    let mensajePuntos = document.createElement('p');
    mensajePuntos.textContent = idiomaActual === 'es' 
        ? `Tu puntuación final: ${puntuacion} ${puntuacion === 1 ? 'punto' : 'puntos'}` 
        : `Your final score: ${puntuacion} ${puntuacion === 1 ? 'point' : 'points'}`;
    
    const botonReintentar = document.createElement('button');
    botonReintentar.textContent = idiomaActual === 'es' ? 'Jugar de nuevo' : 'Play again';
    botonReintentar.onclick = () => {
        document.body.removeChild(mensajeFinal);
        iniciarJuegoContrareloj();
    };
    
    mensajeFinal.appendChild(titulo);
    mensajeFinal.appendChild(mensajePuntos);
    mensajeFinal.appendChild(botonReintentar);
    
    document.body.appendChild(mensajeFinal);
    
    // Efecto de confeti si la puntuación es buena
    if (puntuacion > 5) {
        // Aquí se podría añadir un efecto de confeti o algo similar
        mostrarMensajeFlotante(idiomaActual === 'es' ? '¡Felicidades!' : 'Congratulations!', '#4CAF50');
    }
}

function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segsRestantes = segundos % 60;
    return `${minutos}:${segsRestantes < 10 ? '0' : ''}${segsRestantes}`;
}

// Modificar la función toggleModoSolo para manejar el modo contrareloj
function toggleModoSolo() {
    modoSolo = true;
    modoEquipo = false;
    modoContrareloj = false;

    const modoEquipoBtn = document.getElementById('modoEquipo-btn');
    const modoSoloBtn = document.getElementById('modoSolo-btn');
    const modoContrarelojBtn = document.getElementById('modoContrareloj-btn');
    const seccionEquipos = document.getElementById('seccionEquipos');
    const puntuacionIndividual = document.getElementById('puntuacionIndividual');
    const configuracionContrareloj = document.getElementById('configuracionContrareloj');
    const timerContainer = document.getElementById('timer-container');

    modoSoloBtn.classList.add('boton-activo');
    modoEquipoBtn.classList.remove('boton-activo');
    if (modoContrarelojBtn) modoContrarelojBtn.classList.remove('boton-activo');
    
    seccionEquipos.classList.add('hidden');
    puntuacionIndividual.classList.remove('hidden');
    if (configuracionContrareloj) configuracionContrareloj.classList.add('hidden');
    if (timerContainer) timerContainer.style.display = 'none';

    // Detener temporizador si está activo
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Mostrar efecto visual de cambio de modo
    mostrarEfectoCambioModo(idiomaActual === 'es' ? '¡Modo Individual!' : 'Solo Mode!');

    // Reiniciar puntuación individual
    puntuacion = 0;
    document.getElementById('puntuacion').textContent = puntuacion;
    
    // Asegurar que el topo aparezca
    setTimeout(aparecerTopo, 300);
}

        }
    }

    // Asegurarnos de que el elemento de puntuación tenga el valor correcto
    puntuacionElement = document.getElementById('puntuacion');
    if (puntuacionElement) {
        puntuacionElement.textContent = puntuacion;
    }
}


// --- Variables para modos de juego ---
let modoEquipo = false;
let modoSolo = true; // Por defecto está en modo solo
let modoContrareloj = false;

// Variables para el modo contrareloj
let tiempoSeleccionado = 120; // Por defecto 120 segundos
let tiempoRestante = 0;
let timerInterval = null;
let timerBarElement = null;
let equipos = [
    { nombre: 'Equipo 1', puntuacion: 0, color: '#1e88e5' },
    { nombre: 'Equipo 2', puntuacion: 0, color: '#e53935' }
];
let equipoActual = 0;

function actualizarPuntuacionesEquipos() {
    const tablaEquipos = document.getElementById('tablaEquipos');
    if (tablaEquipos) {
        equipos.forEach((equipo, index) => {
            const fila = tablaEquipos.rows[index + 1];
            if (fila) {
                fila.cells[1].textContent = equipo.puntuacion;

                // Resaltar el equipo actual
                if (index === equipoActual) {
                    fila.classList.add('equipo-activo');
                } else {
                    fila.classList.remove('equipo-activo');
                }
            }
        });
    }

    // Actualizar el indicador de turno
    actualizarIndicadorEquipoActual();
}

function actualizarIndicadorEquipoActual() {
    const indicadorEquipo = document.getElementById('indicadorEquipoActual');
    if (!indicadorEquipo) {
        // Crear el indicador si no existe
        const seccionEquipos = document.getElementById('seccionEquipos');
        const nuevoIndicador = document.createElement('div');
        nuevoIndicador.id = 'indicadorEquipoActual';
        nuevoIndicador.classList.add('indicador-equipo');

        if (seccionEquipos) {
            seccionEquipos.insertBefore(nuevoIndicador, seccionEquipos.firstChild);
        }
    }

    const indicador = document.getElementById('indicadorEquipoActual');
    if (indicador) {
        indicador.textContent = idiomaActual === 'es' 
            ? `🎮 Turno de: ${equipos[equipoActual].nombre} 🎮` 
            : `🎮 ${equipos[equipoActual].nombre}'s turn 🎮`;

        indicador.style.color = equipos[equipoActual].color;
        indicador.style.backgroundColor = `${equipos[equipoActual].color}22`;
        indicador.style.borderColor = equipos[equipoActual].color;
    }
}

function cambiarTurnoEquipo() {
    equipoActual = (equipoActual + 1) % equipos.length;
    actualizarPuntuacionesEquipos();

    // Mostrar un mensaje indicando el cambio de turno
    const mensajeCambio = document.createElement('div');
    mensajeCambio.classList.add('mensaje-cambio-turno');
    mensajeCambio.textContent = idiomaActual === 'es' 
        ? `¡Turno de ${equipos[equipoActual].nombre}!` 
        : `${equipos[equipoActual].nombre}'s turn!`;
    mensajeCambio.style.color = equipos[equipoActual].color;

    document.body.appendChild(mensajeCambio);

    // Animación de aparición y desaparición
    setTimeout(() => {
        mensajeCambio.classList.add('mostrar');
    }, 50);

    setTimeout(() => {
        mensajeCambio.classList.remove('mostrar');
        setTimeout(() => {
            document.body.removeChild(mensajeCambio);
        }, 500);
    }, 1500);
}

function toggleModoEquipo() {
    modoEquipo = !modoEquipo;
    modoSolo = !modoEquipo;

    const modoEquipoBtn = document.getElementById('modoEquipo-btn');
    const modoSoloBtn = document.getElementById('modoSolo-btn');
    const seccionEquipos = document.getElementById('seccionEquipos');
    const puntuacionIndividual = document.getElementById('puntuacionIndividual');
    const gameArea = document.getElementById('gameArea');
    const instrucciones = document.querySelector('.instrucciones');
    const contenedorPrincipal = document.querySelector('body');

    // Asegurar que el área de juego sea siempre visible
    if (gameArea) {
        gameArea.style.display = 'block';
    }

    // Actualizar botones de modo de juego
    if (modoEquipo) {
        modoEquipoBtn.classList.add('boton-activo');
        modoSoloBtn.classList.remove('boton-activo');
        seccionEquipos.classList.remove('hidden');
        puntuacionIndividual.classList.add('hidden');

        // Reorganizar elementos para evitar superposición
        // Limpiar cualquier posicionamiento anterior
        seccionEquipos.style.position = 'relative';
        seccionEquipos.style.top = 'auto';
        seccionEquipos.style.left = 'auto';
        seccionEquipos.style.transform = 'none';
        
        // Asegurar que la sección de equipos aparezca después del área de juego
        if (gameArea && seccionEquipos) {
            // Insertar después del gameArea
            if (gameArea.nextSibling) {
                contenedorPrincipal.insertBefore(seccionEquipos, gameArea.nextSibling);
            } else {
                contenedorPrincipal.appendChild(seccionEquipos);
            }
        }

        // Mostrar efecto visual de cambio de modo
        mostrarEfectoCambioModo(idiomaActual === 'es' ? '¡Modo Equipos!' : 'Team Mode!');

        // Inicializar tabla de equipos si no existe
        if (!document.getElementById('tablaEquipos')) {
            crearTablaEquipos();
        }

        // Reiniciar puntuaciones de equipos
        equipos.forEach(equipo => equipo.puntuacion = 0);
        equipoActual = 0;
        actualizarPuntuacionesEquipos();
        
        // Forzar actualización de la visualización
        setTimeout(() => {
            if (gameArea) gameArea.style.display = 'block';
            aparecerTopo();
        }, 300);
    } else {
        toggleModoSolo();
    }
}

function toggleModoSolo() {
    modoSolo = true;
    modoEquipo = false;

    const modoEquipoBtn = document.getElementById('modoEquipo-btn');
    const modoSoloBtn= document.getElementById('modoSolo-btn');
    const seccionEquipos = document.getElementById('seccionEquipos');
    const puntuacionIndividual = document.getElementById('puntuacionIndividual');

    modoSoloBtn.classList.add('boton-activo');
    modoEquipoBtn.classList.remove('boton-activo');
    seccionEquipos.classList.add('hidden');
    puntuacionIndividual.classList.remove('hidden');

    // Mostrar efecto visual de cambio de modo
    mostrarEfectoCambioModo(idiomaActual === 'es' ? '¡Modo Individual!' : 'Solo Mode!');

    // Reiniciar puntuación individual
    puntuacion = 0;
    document.getElementById('puntuacion').textContent = puntuacion;
}

function mostrarEfectoCambioModo(texto) {
    const efectoModo = document.createElement('div');
    efectoModo.classList.add('efecto-cambio-modo');
    efectoModo.textContent = texto;
    document.body.appendChild(efectoModo);

    setTimeout(() => {
        efectoModo.classList.add('mostrar');
    }, 50);

    setTimeout(() => {
        efectoModo.classList.remove('mostrar');
        setTimeout(() => {
            document.body.removeChild(efectoModo);
        }, 500);
    }, 2000);
}

function crearTablaEquipos() {
    const seccionEquipos = document.getElementById('seccionEquipos');
    if (!seccionEquipos) return;

    // Asegurar que la sección de equipos esté visible
    seccionEquipos.classList.remove('hidden');
    seccionEquipos.style.display = 'block';

    // Limpiar contenido anterior
    seccionEquipos.innerHTML = '';

    // Crear el indicador de equipo actual
    const indicadorEquipo = document.createElement('div');
    indicadorEquipo.id = 'indicadorEquipoActual';
    indicadorEquipo.classList.add('indicador-equipo');
    seccionEquipos.appendChild(indicadorEquipo);

    // Crear tabla
    const tabla = document.createElement('table');
    tabla.id = 'tablaEquipos';
    tabla.classList.add('tabla-equipos');

    // Crear encabezado
    const encabezado = document.createElement('tr');
    const thEquipo = document.createElement('th');
    thEquipo.textContent = idiomaActual === 'es' ? 'Equipo' : 'Team';
    const thPuntos = document.createElement('th');
    thPuntos.textContent = idiomaActual === 'es' ? 'Puntos' : 'Points';
    encabezado.appendChild(thEquipo);
    encabezado.appendChild(thPuntos);
    tabla.appendChild(encabezado);

    // Crear filas para cada equipo
    equipos.forEach((equipo, index) => {
        const fila = document.createElement('tr');
        if (index === equipoActual) {
            fila.classList.add('equipo-activo');
        }

        const tdNombre = document.createElement('td');
        tdNombre.textContent = equipo.nombre;
        tdNombre.style.color = equipo.color;
        tdNombre.style.fontWeight = 'bold';

        const tdPuntos = document.createElement('td');
        tdPuntos.textContent = equipo.puntuacion;

        fila.appendChild(tdNombre);
        fila.appendChild(tdPuntos);
        tabla.appendChild(fila);
    });

    seccionEquipos.appendChild(tabla);

    // Agregar controles para equipos
    const divControlesEquipo = document.createElement('div');
    divControlesEquipo.classList.add('controles-equipo');

    // Botón para cambiar de turno
    const botonCambiarTurno = document.createElement('button');
    botonCambiarTurno.textContent = idiomaActual === 'es' ? '⏭️ Siguiente Turno' : '⏭️ Next Turn';
    botonCambiarTurno.classList.add('boton-control');
    botonCambiarTurno.onclick = cambiarTurnoEquipo;

    // Botón para editar nombres
    const botonEditar = document.createElement('button');
    botonEditar.textContent = idiomaActual === 'es' ? '✏️ Editar Nombres' : '✏️ Edit Names';
    botonEditar.classList.add('boton-control');
    botonEditar.onclick = editarNombresEquipos;

    // Botón para agregar equipo
    const botonAgregarEquipo = document.createElement('button');
    botonAgregarEquipo.textContent = idiomaActual === 'es' ? '➕ Agregar Equipo' : '➕ Add Team';
    botonAgregarEquipo.classList.add('boton-control');
    botonAgregarEquipo.onclick = agregarEquipo;

    // Botón para eliminar equipo
    const botonEliminarEquipo = document.createElement('button');
    botonEliminarEquipo.textContent = idiomaActual === 'es' ? '➖ Eliminar Equipo' : '➖ Remove Team';
    botonEliminarEquipo.classList.add('boton-control');
    botonEliminarEquipo.onclick = eliminarEquipo;

    divControlesEquipo.appendChild(botonCambiarTurno);
    divControlesEquipo.appendChild(botonEditar);
    divControlesEquipo.appendChild(botonAgregarEquipo);

    // Solo mostrar el botón de eliminar si hay más de 2 equipos
    if (equipos.length > 2) {
        divControlesEquipo.appendChild(botonEliminarEquipo);
    }

    seccionEquipos.appendChild(divControlesEquipo);

    // Actualizar el indicador de equipo
    actualizarIndicadorEquipoActual();
    
    // Asegurar que el área de juego siga visible
    const gameArea = document.getElementById('gameArea');
    if (gameArea) {
        gameArea.style.display = 'block';
        // Forzar repintado
        setTimeout(() => {
            aparecerTopo();
        }, 100);
    }
}

function editarNombresEquipos() {
    // Crear un modal para editar nombres en lugar de usar prompt
    const modal = document.createElement('div');
    modal.classList.add('modal-equipos');

    const modalContenido = document.createElement('div');
    modalContenido.classList.add('modal-contenido');

    const titulo = document.createElement('h3');
    titulo.textContent = idiomaActual === 'es' ? 'Editar Nombres de Equipos' : 'Edit Team Names';

    const formulario = document.createElement('div');
    formulario.classList.add('formulario-equipos');

    // Crear campos para cada equipo
    equipos.forEach((equipo, index) => {
        const divEquipo = document.createElement('div');
        divEquipo.classList.add('campo-equipo');

        const label = document.createElement('label');
        label.textContent = `${idiomaActual === 'es' ? 'Equipo' : 'Team'} ${index + 1}:`;
        label.htmlFor = `equipo-nombre-${index}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.id = `equipo-nombre-${index}`;
        input.value = equipo.nombre;
        input.maxLength = 20;

        // Selector de color
        const colorLabel = document.createElement('label');
        colorLabel.textContent = idiomaActual === 'es' ? 'Color:' : 'Color:';
        colorLabel.htmlFor = `equipo-color-${index}`;

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.id = `equipo-color-${index}`;
        colorInput.value = equipo.color;

        divEquipo.appendChild(label);
        divEquipo.appendChild(input);
        divEquipo.appendChild(colorLabel);
        divEquipo.appendChild(colorInput);

        formulario.appendChild(divEquipo);
    });

    // Botones
    const divBotones = document.createElement('div');
    divBotones.classList.add('modal-botones');

    const botonGuardar = document.createElement('button');
    botonGuardar.textContent = idiomaActual === 'es' ? 'Guardar' : 'Save';
    botonGuardar.classList.add('boton-control');
    botonGuardar.onclick = () => {
        // Guardar los cambios
        equipos.forEach((equipo, index) => {
            const nuevoNombre = document.getElementById(`equipo-nombre-${index}`).value;
            const nuevoColor = document.getElementById(`equipo-color-${index}`).value;

            if (nuevoNombre && nuevoNombre.trim() !== '') {
                equipos[index].nombre = nuevoNombre.trim();
            }

            equipos[index].color = nuevoColor;
        });

        // Cerrar modal y actualizar tabla
        document.body.removeChild(modal);
        crearTablaEquipos();
    };

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = idiomaActual === 'es' ? 'Cancelar' : 'Cancel';
    botonCancelar.classList.add('boton-control');
    botonCancelar.onclick = () => {
        document.body.removeChild(modal);
    };

    divBotones.appendChild(botonGuardar);
    divBotones.appendChild(botonCancelar);

    // Ensamblar modal
    modalContenido.appendChild(titulo);
    modalContenido.appendChild(formulario);
    modalContenido.appendChild(divBotones);
    modal.appendChild(modalContenido);

    // Añadir modal al body
    document.body.appendChild(modal);
}

function agregarEquipo() {
    // Colores predefinidos para nuevos equipos
    const coloresPredefinidos = [
        '#4caf50', // Verde
        '#9c27b0', // Púrpura
        '#ff9800', // Naranja
        '#2196f3', // Azul
        '#ff5722', // Naranja oscuro
        '#673ab7', // Púrpura oscuro
        '#3f51b5', // Índigo
        '#009688', // Verde azulado
        '#8bc34a'  // Verde lima
    ];

    // Elegir un color aleatorio que no esté en uso
    let colorNuevo;
    do {
        colorNuevo = coloresPredefinidos[Math.floor(Math.random() * coloresPredefinidos.length)];
    } while (equipos.some(equipo => equipo.color === colorNuevo));

    // Crear nuevo equipo
    const nuevoEquipo = {
        nombre: idiomaActual === 'es' ? `Equipo ${equipos.length + 1}` : `Team ${equipos.length + 1}`,
        puntuacion: 0,
        color: colorNuevo
    };

    equipos.push(nuevoEquipo);

    // Actualizar tabla de equipos
    crearTablaEquipos();

    // Mostrar mensaje
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-cambio-turno');
    mensaje.textContent = idiomaActual === 'es' 
        ? `¡${nuevoEquipo.nombre} añadido!` 
        : `${nuevoEquipo.nombre} added!`;
    mensaje.style.color = nuevoEquipo.color;

    document.body.appendChild(mensaje);

    setTimeout(() => {
        mensaje.classList.add('mostrar');
    }, 50);

    setTimeout(() => {
        mensaje.classList.remove('mostrar');
        setTimeout(() => {
            document.body.removeChild(mensaje);
        }, 500);
    }, 1500);
}

function eliminarEquipo() {
    // Solo permitir eliminar si hay más de 2 equipos
    if (equipos.length <= 2) {
        return;
    }

    // Modal para elegir qué equipo eliminar
    const modal = document.createElement('div');
    modal.classList.add('modal-equipos');

    const modalContenido = document.createElement('div');
    modalContenido.classList.add('modal-contenido');

    const titulo = document.createElement('h3');
    titulo.textContent = idiomaActual === 'es' ? 'Eliminar Equipo' : 'Remove Team';

    const mensaje = document.createElement('p');
    mensaje.textContent = idiomaActual === 'es' 
        ? 'Selecciona el equipo que deseas eliminar:' 
        : 'Select the team you want to remove:';

    const listaEquipos = document.createElement('div');
    listaEquipos.classList.add('lista-equipos-eliminar');

    // Crear opciones para cada equipo
    equipos.forEach((equipo, index) => {
        const opcion = document.createElement('div');
        opcion.classList.add('opcion-equipo');
        opcion.textContent = equipo.nombre;
        opcion.style.color = equipo.color;
        opcion.style.borderColor = equipo.color;

        opcion.onclick = () => {
            // Eliminar equipo
            equipos.splice(index, 1);

            // Ajustar el índice del equipo actual si es necesario
            if (equipoActual >= equipos.length) {
                equipoActual = 0;
            }

            // Actualizar tabla
            document.body.removeChild(modal);
            crearTablaEquipos();

            // Mostrar mensaje
            const mensajeEliminado = document.createElement('div');
            mensajeEliminado.classList.add('mensaje-cambio-turno');
            mensajeEliminado.textContent = idiomaActual === 'es' 
                ? `¡${equipo.nombre} eliminado!` 
                : `${equipo.nombre} removed!`;
            mensajeEliminado.style.color = equipo.color;

            document.body.appendChild(mensajeEliminado);

            setTimeout(() => {
                mensajeEliminado.classList.add('mostrar');
            }, 50);

            setTimeout(() => {
                mensajeEliminado.classList.remove('mostrar');
                setTimeout(() => {
                    document.body.removeChild(mensajeEliminado);
                }, 500);
            }, 1500);
        };

        listaEquipos.appendChild(opcion);
    });

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = idiomaActual === 'es' ? 'Cancelar' : 'Cancel';
    botonCancelar.classList.add('boton-control');
    botonCancelar.onclick = () => {
        document.body.removeChild(modal);
    };

    // Ensamblar modal
    modalContenido.appendChild(titulo);
    modalContenido.appendChild(mensaje);
    modalContenido.appendChild(listaEquipos);
    modalContenido.appendChild(botonCancelar);
    modal.appendChild(modalContenido);

    // Añadir modal al body
    document.body.appendChild(modal);
}

// Actualizar la función verificarRespuesta para manejar turnos en equipos
function verificarRespuestaOriginal(seleccionada, correcta) {
    // Guardamos la función original para modificarla
}

// Asignar eventos para los botones de modo de juego
const modoEquipoBtn = document.getElementById('modoEquipo-btn');
modoEquipoBtn.addEventListener('click', toggleModoEquipo);

const modoSoloBtn = document.getElementById('modoSolo-btn');
if (modoSoloBtn) {
    modoSoloBtn.addEventListener('click', toggleModoSolo);
}

// Añadir evento para el botón de modo contrareloj
const modoContrarelojBtn = document.getElementById('modoContrareloj-btn');
if (modoContrarelojBtn) {
    modoContrarelojBtn.addEventListener('click', toggleModoContrareloj);
}