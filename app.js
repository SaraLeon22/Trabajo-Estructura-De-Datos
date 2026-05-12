// ======================
// ELEMENTOS HTML
// ======================

const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let cubeColors = {};

const captureBtn = document.getElementById("captureBtn");
const resultDiv = document.getElementById("result");

// ======================
// CARGAR JSON
// ======================

fetch("colors.json")

    .then(response => response.json())

    .then(data => {

        cubeColors = data;

        console.log("JSON cargado:", cubeColors);

    })

    .catch(error => {

        console.log("Error cargando JSON:", error);

    });


// ======================
// ACTIVAR CÁMARA
// ======================

navigator.mediaDevices.getUserMedia({
    video: true
})
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        console.log("Error con cámara:", error);
    });


// ======================
// DISTANCIA ENTRE COLORES
// ======================

function colorDistance(c1, c2) {

    return Math.sqrt(
        (c1[0] - c2[0]) ** 2 +
        (c1[1] - c2[1]) ** 2 +
        (c1[2] - c2[2]) ** 2
    );

}


// ======================
// ENCONTRAR COLOR MÁS CERCANO
// ======================

function detectColor(rgb) {

    let minDistance = Infinity;
    let detectedLetter = "?";

    for (let letter in cubeColors) {

        let distance = colorDistance(rgb, cubeColors[letter]);

        if (distance < minDistance) {

            minDistance = distance;
            detectedLetter = letter;

        }
    }

    return detectedLetter;
}


// ======================
// LEER COLOR PROMEDIO
// ======================

function getAverageColor(x, y, size) {

    const imageData = ctx.getImageData(x, y, size, size);

    const data = imageData.data;

    let r = 0;
    let g = 0;
    let b = 0;

    let totalPixels = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {

        r += data[i];
        g += data[i + 1];
        b += data[i + 2];

    }

    r = Math.floor(r / totalPixels);
    g = Math.floor(g / totalPixels);
    b = Math.floor(b / totalPixels);

    return [r, g, b];

}


// ======================
// CAPTURAR CARA DEL CUBO
// ======================

if (Object.keys(cubeColors).length === 0) {

    alert("JSON aún no cargado");

    return;
}

captureBtn.addEventListener("click", () => {

    // Ajustar canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Tomar foto
    ctx.drawImage(video, 0, 0);

    // ======================
    // CONFIGURACIÓN CUADRÍCULA
    // ======================

    const startX = 150;
    const startY = 100;

    const cellSize = 50;

    let detectedColors = [];

    // ======================
    // RECORRER 3x3
    // ======================

    for (let row = 0; row < 3; row++) {

        for (let col = 0; col < 3; col++) {

            let x = startX + (col * cellSize);
            let y = startY + (row * cellSize);

            // Leer color promedio
            let avgColor = getAverageColor(x, y, cellSize);

            // Detectar letra
            let detected = detectColor(avgColor);

            detectedColors.push(detected);

            // Dibujar cuadrícula visual
            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;

            ctx.strokeRect(x, y, cellSize, cellSize);

            // Mostrar letra encima
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";

            ctx.fillText(detected, x + 15, y + 30);

        }
    }

    // ======================
    // MOSTRAR RESULTADO
    // ======================

    resultDiv.innerHTML = `
        <h2>Colores Detectados</h2>
        <p>${detectedColors.join(" ")}</p>
    `;

});

