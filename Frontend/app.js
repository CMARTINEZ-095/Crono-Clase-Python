// Variables globales
let datosGlobales = [];
let datosFiltrados = [];
let charts = {};

// Colores para las gráficas
const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384'
];

// Cargar datos al inicio
document.addEventListener('DOMContentLoaded', async () => {
    try {

        // IMPORTANTE:
        // el archivo json debe llamarse estudiantes_limpio.json

        const response = await fetch('estudiantes_limpio.json');
        datosGlobales = await response.json();

        datosFiltrados = [...datosGlobales];

        inicializarFiltros();
        actualizarEstadisticas();
        crearGraficas();
        actualizarTabla();

        document.getElementById('filterEstudiante')
            .addEventListener('change', aplicarFiltros);

        document.getElementById('filterMateria')
            .addEventListener('change', aplicarFiltros);

        document.getElementById('filterProfesor')
            .addEventListener('change', aplicarFiltros);

        document.getElementById('btnReset')
            .addEventListener('click', reiniciarFiltros);

    } catch (error) {
        console.error(error);

        document.body.innerHTML = `
            <p style="color:red;padding:20px;">
                Error cargando JSON
            </p>
        `;
    }
});

// =====================================
// FILTROS
// =====================================

function inicializarFiltros() {

    const estudiantes = new Set(datosGlobales.map(d => d.estudiante));
    const materias = new Set(datosGlobales.map(d => d.materia));
    const profesores = new Set(datosGlobales.map(d => d.profesor));

    llenarSelect('filterEstudiante', estudiantes);
    llenarSelect('filterMateria', materias);
    llenarSelect('filterProfesor', profesores);
}

function llenarSelect(id, datos) {

    const select = document.getElementById(id);

    Array.from(datos)
        .sort()
        .forEach(valor => {

            const option = document.createElement('option');

            option.value = valor;
            option.textContent = valor;

            select.appendChild(option);
        });
}

function aplicarFiltros() {

    const estudiante =
        document.getElementById('filterEstudiante').value;

    const materia =
        document.getElementById('filterMateria').value;

    const profesor =
        document.getElementById('filterProfesor').value;

    datosFiltrados = datosGlobales.filter(d => {

        return (!estudiante || d.estudiante === estudiante)
            && (!materia || d.materia === materia)
            && (!profesor || d.profesor === profesor);
    });

    actualizarEstadisticas();
    crearGraficas();
    actualizarTabla();
}

function reiniciarFiltros() {

    document.getElementById('filterEstudiante').value = '';
    document.getElementById('filterMateria').value = '';
    document.getElementById('filterProfesor').value = '';

    datosFiltrados = [...datosGlobales];

    actualizarEstadisticas();
    crearGraficas();
    actualizarTabla();
}

// =====================================
// ESTADISTICAS
// =====================================

function actualizarEstadisticas() {

    const estudiantes =
        new Set(datosFiltrados.map(d => d.estudiante)).size;

    const materias =
        new Set(datosFiltrados.map(d => d.materia)).size;

    const profesores =
        new Set(datosFiltrados.map(d => d.profesor)).size;

    const promedio =
        (
            datosFiltrados.reduce(
                (sum, d) => sum + d.calificacion,
                0
            ) / datosFiltrados.length
        ).toFixed(1);

    document.getElementById('statEstudiantes').textContent = estudiantes;
    document.getElementById('statMaterias').textContent = materias;
    document.getElementById('statProfesores').textContent = profesores;

    // CAMBIO IMPORTANTE
    document.getElementById('statPromedio').textContent = promedio;
}

// =====================================
// GRAFICAS
// =====================================

function crearGraficas() {

    crearGraficaEstudiantes();
    crearGraficaMaterias();
    crearGraficaProfesores();
    crearGraficaEvolucion();
    crearGraficaDistribucion();
    crearGraficaAsistencia();
}

// =====================================

function crearGraficaEstudiantes() {

    const ctx =
        document.getElementById('chartEstudiantes')
        .getContext('2d');

    const grupos = agruparPor('estudiante');

    const labels = Object.keys(grupos).sort();

    const calificaciones = labels.map(est => {

        return (
            grupos[est].reduce(
                (sum, d) => sum + d.calificacion,
                0
            ) / grupos[est].length
        ).toFixed(1);
    });

    if (charts.chartEstudiantes) {
        charts.chartEstudiantes.destroy();
    }

    charts.chartEstudiantes = new Chart(ctx, {

        type: 'bar',

        data: {
            labels,
            datasets: [{
                label: 'Promedio',
                data: calificaciones,
                backgroundColor: colors[0]
            }]
        },

        options: {
            responsive: true,

            scales: {
                y: {
                    beginAtZero: true,

                    // CAMBIO IMPORTANTE
                    max: 5
                }
            }
        }
    });
}

// =====================================

function crearGraficaMaterias() {

    const ctx =
        document.getElementById('chartMaterias')
        .getContext('2d');

    const grupos = agruparPor('materia');

    const labels = Object.keys(grupos).sort();

    const promedios = labels.map(mat => {

        return (
            grupos[mat].reduce(
                (sum, d) => sum + d.calificacion,
                0
            ) / grupos[mat].length
        ).toFixed(1);
    });

    if (charts.chartMaterias) {
        charts.chartMaterias.destroy();
    }

    charts.chartMaterias = new Chart(ctx, {

        type: 'doughnut',

        data: {
            labels,
            datasets: [{
                data: promedios,
                backgroundColor: colors
            }]
        }
    });
}

// =====================================

function crearGraficaProfesores() {

    const ctx =
        document.getElementById('chartProfesores')
        .getContext('2d');

    const grupos = agruparPor('profesor');

    const labels = Object.keys(grupos).sort();

    const promedios = labels.map(prof => {

        return (
            grupos[prof].reduce(
                (sum, d) => sum + d.calificacion,
                0
            ) / grupos[prof].length
        ).toFixed(1);
    });

    if (charts.chartProfesores) {
        charts.chartProfesores.destroy();
    }

    charts.chartProfesores = new Chart(ctx, {

        type: 'radar',

        data: {
            labels,
            datasets: [{
                label: 'Promedio',
                data: promedios,
                borderColor: colors[4],
                backgroundColor: 'rgba(153,102,255,0.2)'
            }]
        },

        options: {
            scales: {
                r: {
                    beginAtZero: true,

                    // CAMBIO IMPORTANTE
                    max: 5
                }
            }
        }
    });
}

// =====================================

function crearGraficaEvolucion() {

    const ctx =
        document.getElementById('chartEvolucion')
        .getContext('2d');

    const grupos = agruparPor('fecha');

    const fechas = Object.keys(grupos).sort();

    const promedios = fechas.map(fecha => {

        return (
            grupos[fecha].reduce(
                (sum, d) => sum + d.calificacion,
                0
            ) / grupos[fecha].length
        ).toFixed(1);
    });

    if (charts.chartEvolucion) {
        charts.chartEvolucion.destroy();
    }

    charts.chartEvolucion = new Chart(ctx, {

        type: 'line',

        data: {
            labels: fechas,
            datasets: [{
                label: 'Promedio',
                data: promedios,
                borderColor: colors[1],
                backgroundColor: 'rgba(54,162,235,0.1)',
                fill: true
            }]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true,

                    // CAMBIO IMPORTANTE
                    max: 5
                }
            }
        }
    });
}

// =====================================

function crearGraficaDistribucion() {

    const ctx =
        document.getElementById('chartDistribucion')
        .getContext('2d');

    // NUEVOS RANGOS 0-5

    const rangos = {
        '4.5-5.0': 0,
        '4.0-4.4': 0,
        '3.0-3.9': 0,
        '0.0-2.9': 0
    };

    datosFiltrados.forEach(d => {

        if (d.calificacion >= 4.5)
            rangos['4.5-5.0']++;

        else if (d.calificacion >= 4.0)
            rangos['4.0-4.4']++;

        else if (d.calificacion >= 3.0)
            rangos['3.0-3.9']++;

        else
            rangos['0.0-2.9']++;
    });

    if (charts.chartDistribucion) {
        charts.chartDistribucion.destroy();
    }

    charts.chartDistribucion = new Chart(ctx, {

        type: 'pie',

        data: {
            labels: Object.keys(rangos),

            datasets: [{
                data: Object.values(rangos),

                backgroundColor: [
                    '#4BC0C0',
                    '#36A2EB',
                    '#FFCE56',
                    '#FF6384'
                ]
            }]
        }
    });
}

// =====================================

function crearGraficaAsistencia() {

    const ctx =
        document.getElementById('chartAsistencia')
        .getContext('2d');

    const grupos = agruparPor('estudiante');

    const labels = Object.keys(grupos).sort();

    const tasaAsistencia = labels.map(est => {

        const presentes =
            grupos[est].filter(
                d => d.asistencia === 'Presente'
            ).length;

        return (
            (presentes / grupos[est].length) * 100
        ).toFixed(0);
    });

    if (charts.chartAsistencia) {
        charts.chartAsistencia.destroy();
    }

    charts.chartAsistencia = new Chart(ctx, {

        type: 'bar',

        data: {
            labels,
            datasets: [{
                label: '% Asistencia',
                data: tasaAsistencia,
                backgroundColor: '#4BC0C0'
            }]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// =====================================
// AUXILIARES
// =====================================

function agruparPor(clave) {

    return datosFiltrados.reduce((acc, item) => {

        if (!acc[item[clave]]) {
            acc[item[clave]] = [];
        }

        acc[item[clave]].push(item);

        return acc;

    }, {});
}

// =====================================
// TABLA
// =====================================

function actualizarTabla() {

    const tbody = document.getElementById('tableBody');

    tbody.innerHTML = '';

    datosFiltrados.forEach(row => {

        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${row.estudiante}</td>
            <td>${row.materia}</td>
            <td>${row.profesor}</td>
            <td>${row.fecha}</td>
            <td><strong>${row.calificacion}</strong></td>
            <td>${row.asistencia === 'Presente' ? '✅' : '❌'}</td>
        `;

        tbody.appendChild(tr);
    });
}