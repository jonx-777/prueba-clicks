document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');

    // Colores para los corazones (ya no neón)
    const heartColors = [
        '#e74c3c', // Rojo
        '#FF69B4', // Rosa
        '#9B59B6', // Púrpura
        '#3498DB', // Azul
        '#2ECC71', // Verde
        '#F1C40F'  // Amarillo
    ];

    // --- Función para crear un corazón (para ambos efectos) ---
    // specificColor se usará para el corazón de clic
    function createHeart(x, y, animationName, duration, delay, finalScale, finalRotate, isClickHeart = false, specificColor = null) {
        const heart = document.createElement('span');
        heart.className = 'heart-particle';
        heart.innerHTML = '&#x2764;'; // Carácter Unicode de corazón (♥)

        // Asigna un color: específico si es un corazón de clic, sino aleatorio de la lista
        heart.style.color = specificColor || heartColors[Math.floor(Math.random() * heartColors.length)];

        // Posiciona el corazón inicialmente
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        // Define las propiedades de transformación finales para la animación
        // Si es un corazón de clic, no hay desplazamiento ni rotación final
        if (isClickHeart) {
            heart.style.setProperty('--x', `${x}px`); // Se queda en la misma X
            heart.style.setProperty('--y', `${y}px`); // Se queda en la misma Y
            heart.style.setProperty('--scale', finalScale); // Solo se escala
            heart.style.setProperty('--rotate', '0deg'); // No rota
        } else {
            // Para la lluvia de corazones, mantiene la rotación y el movimiento
            const randomXOffset = (Math.random() - 0.5) * 0; // No hay dispersión horizontal para la lluvia
            const randomYOffset = (Math.random() - 0.5) * 0; // No hay dispersión vertical inicial para la lluvia
            
            heart.style.setProperty('--x', `${x + randomXOffset}px`);
            heart.style.setProperty('--y', `${y + randomYOffset}px`);
            heart.style.setProperty('--scale', finalScale);
            heart.style.setProperty('--rotate', `${finalRotate}deg`);
        }
        
        heart.style.animation = `${animationName} ${duration}s ease-out forwards ${delay}s`;
        
        heartContainer.appendChild(heart);

        // Elimina el corazón del DOM al finalizar su animación
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // --- Efecto de lluvia de corazones ---
    const minFallDuration = 8; // Segundos
    const maxFallDuration = 15; // Segundos
    const heartsPerSecond = 2; // Cuántos corazones aparecen por segundo

    function startHeartRain() {
        setInterval(() => {
            const startX = Math.random() * window.innerWidth; // Posición horizontal aleatoria
            const startY = -50; // Siempre empieza un poco por encima de la pantalla

            const fallDuration = minFallDuration + Math.random() * (maxFallDuration - minFallDuration);
            const scale = 0.5 + Math.random() * 0.5; // Tamaño entre 0.5 y 1.0
            const rotate = Math.random() * 360; // Rotación inicial

            createHeart(
                startX,
                startY,
                'heart-fall', // Nombre de la animación CSS
                fallDuration,
                0, // Sin retraso inicial para la lluvia
                scale, // Escala final
                rotate, // Rotación final
                false // No es un corazón de clic
            );
        }, 1000 / heartsPerSecond); // Intervalo de tiempo para crear nuevos corazones
    }

    // --- Efecto de destello al hacer clic (un solo corazón que se desvanece en el lugar) ---
    document.addEventListener('click', (event) => {
        const clickX = event.clientX;
        const clickY = event.clientY;

        const sparkleDuration = 1; // Duración de la animación del destello
        const sparkleDelay = 0; // Sin retraso
        const sparkleScale = 1; // Tamaño base para el destello (se escalará en CSS)
        const sparkleRotate = 0; // No rota

        // Creamos un solo corazón al hacer clic, con un color rojo fijo
        createHeart(
            clickX,
            clickY,
            'single-sparkle-heart', // Nueva animación CSS
            sparkleDuration,
            sparkleDelay,
            sparkleScale, // Se usará la escala definida en la animación CSS
            sparkleRotate,
            true, // ¡Es un corazón de clic!
            '#FF00FF' // Color rosa intenso para el destello
        );
    });

    // Iniciar la lluvia de corazones cuando la página cargue
    startHeartRain();
});