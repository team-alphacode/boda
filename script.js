// Obtenemos los elementos
const pantallaCarga = document.getElementById('pantalla-carga');
const textoCarga = document.getElementById('texto-carga');
const sello = document.getElementById('sello-interactivo');
const pantallaSobre = document.getElementById('pantalla-sobre');
const pantallaVideo = document.getElementById('pantalla-video');
const videoInvitacion = document.getElementById('video-invitacion');
const pantallaLanding = document.getElementById('pantalla-landing'); 

// Variables de seguridad (Validación Dual)
let videoListo = false;
let secuenciaTextosLista = false;

// 1. ESCUCHAR AL VIDEO: Avisa cuando está 100% descargado en la memoria del celular
videoInvitacion.addEventListener('canplaythrough', () => {
    videoListo = true;
    revisarCargaCompleta(); // Verifica si ya puede mostrar el sobre
});

// 2. FUNCIÓN PARA CAMBIAR TEXTOS SUAVEMENTE
function cambiarTextoCarga(nuevoTexto, retrasoMiliseudos) {
    setTimeout(() => {
        textoCarga.classList.add('texto-oculto'); // Apaga el texto actual
        setTimeout(() => {
            textoCarga.innerHTML = nuevoTexto; // Inyecta el nuevo texto
            textoCarga.classList.remove('texto-oculto'); // Enciende el nuevo texto
        }, 500); // Tarda medio segundo en desvanecerse
    }, retrasoMiliseudos);
}

// 3. ARRANCAR SECUENCIA AL ABRIR LA PÁGINA
window.addEventListener('load', () => {
    
    // Programamos la línea de tiempo de los textos
    cambiarTextoCarga("Buscando tu información...", 1500);
    cambiarTextoCarga("Buscando tu invitación...", 4000);
    cambiarTextoCarga("Invitación encontrada...<br>Disfruta la experiencia y esperamos tenerte con nosotros ese día.", 7000);
    
    // Marcamos la secuencia como terminada a los 11 segundos
    setTimeout(() => {
        secuenciaTextosLista = true;
        revisarCargaCompleta(); // Verifica si el video también ya está listo
    }, 11000); 
});

// 4. EL REVISOR DE VALIDACIÓN DUAL
function revisarCargaCompleta() {
    // Solo si el video descargó Y pasaron los 11 segundos de textos, se abre el sobre
    if (videoListo && secuenciaTextosLista) {
        pantallaCarga.style.opacity = '0';
        setTimeout(() => {
            pantallaCarga.classList.add('oculto');
        }, 800);
    }
}

// 5. ANIMACIÓN DEL SELLO AL HACER CLIC
sello.addEventListener('click', () => {
    sello.classList.add('girar-animacion');
    sello.style.pointerEvents = 'none';

    setTimeout(() => {
        pantallaVideo.classList.remove('oculto');
        videoInvitacion.play();
        pantallaSobre.classList.add('desvanecer-suave');
        
        setTimeout(() => {
            pantallaSobre.classList.add('oculto');
        }, 800);
    }, 3000); 
});

// Transición del video a la Landing Web
videoInvitacion.addEventListener('ended', () => {
    pantallaVideo.classList.add('oculto');
    pantallaLanding.classList.remove('oculto');
    pantallaLanding.classList.add('aparecer-suave');
});
// --- MOTOR PARALLAX DE ALTA PRECISIÓN ---

window.addEventListener('scroll', () => {
    const capas = document.querySelectorAll('.capa-parallax');
    
    capas.forEach(capa => {
        const velocidad = capa.getAttribute('data-speed');
        const seccion = capa.closest('.escena-parallax');
        
        // Calculamos la distancia exacta de la sección respecto a la vista actual de la pantalla
        const rect = seccion.getBoundingClientRect();
        
        // Al multiplicar por rect.top, el movimiento es relativo a su propia sección
        capa.style.transform = `translateY(${rect.top * velocidad}px)`;
    });
});

// --- LÓGICA DEL CONTADOR DE LA BODA ---

// 1. Definimos la fecha exacta de la boda: 19 de Diciembre de 2026 a las 05:00 PM
const fechaBoda = new Date('December 19, 2026 17:00:00').getTime();

// 2. Creamos un intervalo que se ejecuta cada segundo (1000 milisegundos)
const temporizador = setInterval(() => {
    
    // Obtenemos la fecha y hora de este mismo instante
    const ahora = new Date().getTime();
    
    // Calculamos la diferencia matemática entre el futuro y el presente
    const diferencia = fechaBoda - ahora;
    
    // Fórmulas matemáticas estándar para convertir milisegundos a días, horas, minutos y segundos
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
    
    // 3. Imprimimos los resultados en el HTML
    // Usamos padStart(2, '0') para que si el número es "9", se vea elegante como "09"
    document.getElementById('dias').innerText = String(dias).padStart(2, '0');
    document.getElementById('horas').innerText = String(horas).padStart(2, '0');
    document.getElementById('minutos').innerText = String(minutos).padStart(2, '0');
    document.getElementById('segundos').innerText = String(segundos).padStart(2, '0');
    
    // Si la fecha ya pasó, detenemos el contador
    if (diferencia < 0) {
        clearInterval(temporizador);
        document.getElementById('dias').innerText = "00";
        document.getElementById('horas').innerText = "00";
        document.getElementById('minutos').innerText = "00";
        document.getElementById('segundos').innerText = "00";
    }
}, 1000);