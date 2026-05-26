const inputImagen = document.getElementById("inputImagen");
const resultado = document.getElementById("resultado");

let coloresJSON = {};
let estadoCuboGlobal = {};

// ==========================
// CARGAR JSON DE COLORES
// ==========================

async function cargarColores() {

    const respuesta = await fetch("colores.json");
    coloresJSON = await respuesta.json();

    console.log("Colores cargados:");
    console.log(coloresJSON);
}

cargarColores();


// ==========================
// SUBIR IMAGEN
// ==========================

inputImagen.addEventListener("change", cargarImagenes);

function cargarImagenes(event) {

    const archivos = event.target.files;

    const contenedor =
        document.getElementById("contenedor");

    contenedor.innerHTML = "";

    // =========================
    // NOMBRES DE LAS CARAS
    // =========================

    const nombresCaras = [
        "U",
        "D",
        "F",
        "B",
        "L",
        "R"
    ];

    for (let i = 0; i < archivos.length; i++) {

        const archivo = archivos[i];

        const img = new Image();

        img.onload = function () {

            const bloque =
                document.createElement("div");

            bloque.classList.add("bloqueCara");

            const titulo =
                document.createElement("h2");

            titulo.textContent =
                `Cara ${i + 1}`;

            const canvas =
                document.createElement("canvas");

            const ctx =
                canvas.getContext("2d");

            canvas.width = 300;
            canvas.height = 300;

            ctx.drawImage(img, 0, 0, 300, 300);

            // =========================
            // DETECTAR COLORES
            // =========================

            const colores =
                detectarColores(canvas, ctx);

            // =========================
            // GUARDAR CARA
            // =========================

            estadoCuboGlobal[
                nombresCaras[i]
            ] = colores;

            console.log(estadoCuboGlobal);

            const texto =
                document.createElement("p");

            texto.textContent =
                colores.join(" - ");

            bloque.appendChild(titulo);
            bloque.appendChild(canvas);
            bloque.appendChild(texto);

            contenedor.appendChild(bloque);
        };

        img.src = URL.createObjectURL(archivo);
    }
}

// ==========================
// DETECTAR COLORES
// ==========================

function detectarColores(canvas, ctx) {

    const filas = 3;
    const columnas = 3;

    const ancho = canvas.width / columnas;
    const alto = canvas.height / filas;

    const coloresDetectados = [];

    for (let y = 0; y < filas; y++) {

        for (let x = 0; x < columnas; x++) {

            const pixelX = Math.floor(x * ancho + ancho / 2);
            const pixelY = Math.floor(y * alto + alto / 2);

            const data = ctx.getImageData(pixelX, pixelY, 1, 1).data;

            const r = data[0];
            const g = data[1];
            const b = data[2];

            const color = detectarColor([r, g, b]);

            coloresDetectados.push(color);

            // cuadrícula
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;

            ctx.strokeRect(
                x * ancho,
                y * alto,
                ancho,
                alto
            );

            // texto
            ctx.fillStyle = "black";
            ctx.font = "16px Arial";

            ctx.fillText(
                color,
                x * ancho + 10,
                y * alto + 30
            );
        }
    }

    return coloresDetectados;
}


// ==========================
// COMPARAR DISTANCIA
// ==========================

function distanciaColor(c1, c2) {

    return Math.sqrt(
        (c1[0] - c2[0]) ** 2 +
        (c1[1] - c2[1]) ** 2 +
        (c1[2] - c2[2]) ** 2
    );
}


// ==========================
// ENCONTRAR COLOR MÁS CERCANO
// ==========================

function detectarColor(rgb) {

    let mejorColor = "";
    let menorDistancia = Infinity;

    for (let categoria in coloresJSON) {

        const grupo = coloresJSON[categoria];

        for (let nombre in grupo) {

            const colorJSON = grupo[nombre]
                .split(",")
                .map(valor => Number(valor.trim()));

            const distancia = distanciaColor(rgb, colorJSON);

            if (distancia < menorDistancia) {

                menorDistancia = distancia;
                mejorColor = nombre;
            }
        }
    }

    return mejorColor;
}

const resolverBtn =
    document.getElementById("ResolverCubo");

resolverBtn.addEventListener(
    "click",
    PasosCubo
);

// ==========================
// RESOLVER CUBO
// ==========================
function PasosCubo() {

    // ==========================
    // ESTADO ACTUAL
    // ==========================

    let estadoCubo =
        JSON.parse(
            JSON.stringify(estadoCuboGlobal)
        );

    // ==========================
    // ESTADO META
    // ==========================

    const estadoFinal = {

        U: Array(9).fill(
            estadoCubo.U[4]
        ),

        D: Array(9).fill(
            estadoCubo.D[4]
        ),

        F: Array(9).fill(
            estadoCubo.F[4]
        ),

        B: Array(9).fill(
            estadoCubo.B[4]
        ),

        L: Array(9).fill(
            estadoCubo.L[4]
        ),

        R: Array(9).fill(
            estadoCubo.R[4]
        )
    };

    // ==========================
    // MOVIMIENTOS
    // ==========================

    const movimientos = [
        "R1",
        "L1",
        "U1",
        "D1"
    ];

    // ==========================
    // COMPARAR ESTADOS
    // ==========================

    function esMeta(estado) {

        return JSON.stringify(estado)
            === JSON.stringify(estadoFinal);
    }

    // ==========================
    // MOVER
    // ==========================

    function mover(estado, movimiento) {

        let nuevo =
            JSON.parse(JSON.stringify(estado));

        // ======================
        // R1
        // ======================

        if (movimiento === "R1") {

            let temp = [...nuevo.U];

            nuevo.U[0] = nuevo.L[0];
            nuevo.U[1] = nuevo.L[1];
            nuevo.U[2] = nuevo.L[2];

            nuevo.L[0] = nuevo.D[0];
            nuevo.L[1] = nuevo.D[1];
            nuevo.L[2] = nuevo.D[2];

            nuevo.D[0] = nuevo.R[0];
            nuevo.D[1] = nuevo.R[1];
            nuevo.D[2] = nuevo.R[2];

            nuevo.R[0] = temp[0];
            nuevo.R[1] = temp[1];
            nuevo.R[2] = temp[2];
        }

        // ======================
        // L1
        // ======================

        if (movimiento === "L1") {

            let temp = [...nuevo.U];

            nuevo.U[6] = nuevo.R[6];
            nuevo.U[7] = nuevo.R[7];
            nuevo.U[8] = nuevo.R[8];

            nuevo.R[6] = nuevo.D[6];
            nuevo.R[7] = nuevo.D[7];
            nuevo.R[8] = nuevo.D[8];

            nuevo.D[6] = nuevo.L[6];
            nuevo.D[7] = nuevo.L[7];
            nuevo.D[8] = nuevo.L[8];

            nuevo.L[6] = temp[6];
            nuevo.L[7] = temp[7];
            nuevo.L[8] = temp[8];
        }

        // ======================
        // U1
        // ======================

        if (movimiento === "U1") {

            let temp = [...nuevo.F];

            nuevo.F[0] = nuevo.L[0];
            nuevo.F[1] = nuevo.L[1];
            nuevo.F[2] = nuevo.L[2];

            nuevo.L[0] = nuevo.B[0];
            nuevo.L[1] = nuevo.B[1];
            nuevo.L[2] = nuevo.B[2];

            nuevo.B[0] = nuevo.R[0];
            nuevo.B[1] = nuevo.R[1];
            nuevo.B[2] = nuevo.R[2];

            nuevo.R[0] = temp[0];
            nuevo.R[1] = temp[1];
            nuevo.R[2] = temp[2];
        }

        // ======================
        // D1
        // ======================

        if (movimiento === "D1") {

            let temp = [...nuevo.F];

            nuevo.F[6] = nuevo.R[6];
            nuevo.F[7] = nuevo.R[7];
            nuevo.F[8] = nuevo.R[8];

            nuevo.R[6] = nuevo.B[6];
            nuevo.R[7] = nuevo.B[7];
            nuevo.R[8] = nuevo.B[8];

            nuevo.B[6] = nuevo.L[6];
            nuevo.B[7] = nuevo.L[7];
            nuevo.B[8] = nuevo.L[8];

            nuevo.L[6] = temp[6];
            nuevo.L[7] = temp[7];
            nuevo.L[8] = temp[8];
        }

        return nuevo;
    }

    function caraOrdenada(estado) {

        for (let cara in estado) {

            const centro = estado[cara][4];

            let iguales = true;

            for (let color of estado[cara]) {
                if (color !== centro) {
                    iguales = false;
                    break;
                }
            }

            if (iguales) {
                return cara; // 👈 AHORA devuelve cuál cara
            }
        }

        return null;
    }

    // ==========================
    // BFS
    // ==========================

    function bfs(estadoInicial) {

        let cola = [];

        let visitados = new Set();

        cola.push({
            estado: estadoInicial,
            pasos: []
        });

        visitados.add(
            JSON.stringify(estadoInicial)
        );

        while (cola.length > 0) {

            const actual = cola.shift();

            // ==========================
            // REVISAR SI YA ESTA "ORDENADO"
            // ==========================

            const cara = caraOrdenada(actual.estado);

            if (cara) {

                console.log("Cara resuelta:", cara);

                return actual.pasos;
            }

            // ==========================
            // PROBAR MOVIMIENTOS
            // ==========================

            for (let mov of movimientos) {

                const nuevoEstado =
                    mover(actual.estado, mov);

                const clave =
                    JSON.stringify(nuevoEstado);

                if (!visitados.has(clave)) {

                    visitados.add(clave);

                    cola.push({

                        estado: nuevoEstado,

                        pasos: [
                            ...actual.pasos,
                            mov
                        ]
                    });
                }
            }

            // ==========================
            // LIMITE PARA NO MORIR
            // ==========================

            if (actual.pasos.length > 4) {

                continue;
            }
        }

        return [
            "R1",
            "U1",
            "L1"
        ];
    }

    // ==========================
    // RESOLVER
    // ==========================

    const solucion =bfs(estadoCubo);

    console.log(solucion);

    animarPasos(solucion);

    const contenedor = document.getElementById("PasosCubo");

    contenedor.innerHTML = "";

    if (!solucion) {
        contenedor.textContent = "No se encontró solución";
        return;
    }

    const titulo = document.createElement("h3");
    titulo.textContent = "🧠 Pasos para resolver el cubo:";

    const lista = document.createElement("ul");

    solucion.forEach(paso => {
        const li = document.createElement("li");
        li.textContent = paso;
        lista.appendChild(li);
    });

    contenedor.appendChild(titulo);
    contenedor.appendChild(lista);
}

function animarPasos(solucion) {

    const contenedor = document.getElementById("PasosCubo");
    contenedor.innerHTML = "";

    if (!solucion || solucion.length === 0) {
        contenedor.textContent = "No hay pasos para mostrar";
        return;
    }

    const titulo = document.createElement("h3");
    titulo.textContent = "🧠 Resolviendo paso a paso:";
    contenedor.appendChild(titulo);

    const lista = document.createElement("ul");
    contenedor.appendChild(lista);

    let i = 0;

    const intervalo = setInterval(() => {

        if (i >= solucion.length) {
            clearInterval(intervalo);
            return;
        }

        const paso = solucion[i];

        const li = document.createElement("li");
        li.textContent = paso;

        lista.appendChild(li);

        i++;

    }, 700); // ⏱ velocidad (700ms por paso)
}