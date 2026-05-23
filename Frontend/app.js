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
        // Cargar JSON generado por el backend
        const response = await fetch('estudiantes_limpio.json');
        datosGlobales = await response.json();
        datosFiltrados = [...datosGlobales];

        // Inicializar la aplicación
        inicializarFiltros();
        actualizarEstadisticas();
        crearGraficas();
        actualizarTabla();

        // Event listeners para filtros
        document.getElementById('filterEstudiante').addEventListener('change', aplicarFiltros);
        document.getElementById('filterMateria').addEventListener('change', aplicarFiltros);
        document.getElementById('filterProfesor').addEventListener('change', aplicarFiltros);
        document.getElementById('btnReset').addEventListener('click', reiniciarFiltros);

    } catch (error) {
        console.error('Error cargando datos:', error);
        document.body.innerHTML = '<p style="color: red; padding: 20px;">Error cargando datos. Asegúrate que el archivo JSON existe.</p>';
    }
});

// FUNCIONES DE FILTRO
function inicializarFiltros() {
    const estudiantes = new Set(datosGlobales.map(d => d.estudiante));
    const materias = new Set(datosGlobales.map(d => d.materia));
    const profesores = new Set(datosGlobales.map(d => d.profesor));

    const selectEstudiante = document.getElementById('filterEstudiante');
    const selectMateria = document.getElementById('filterMateria');
    const selectProfesor = document.getElementById('filterProfesor');

    // Llenar selectores
    Array.from(estudiantes).sort().forEach(est => {
        const option = document.createElement('option');
        option.value = est;
        option.textContent = est;
        selectEstudiante.appendChild(option);
    });

    Array.from(materias).sort().forEach(mat => {
        const option = document.createElement('option');
        option.value = mat;
        option.textContent = mat;
        selectMateria.appendChild(option);
    });

    Array.from(profesores).sort().forEach(prof => {
        const option = document.createElement('option');
        option.value = prof;
        option.textContent = prof;
        selectProfesor.appendChild(option);
    });
}

function aplicarFiltros() {
    const estudiante = document.getElementById('filterEstudiante').value;
    const materia = document.getElementById('filterMateria').value;
    const profesor = document.getElementById('filterProfesor').value;

    datosFiltrados = datosGlobales.filter(d => {
        return (!estudiante || d.estudiante === estudiante) &&
               (!materia || d.materia === materia) &&
               (!profesor || d.profesor === profesor);
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

// FUNCIONES DE ESTADÍSTICAS
function actualizarEstadisticas() {
    const estudiantes = new Set(datosFiltrados.map(d => d.estudiante)).size;
    const materias = new Set(datosFiltrados.map(d => d.materia)).size;
    const profesores = new Set(datosFiltrados.map(d => d.profesor)).size;
    const promedio = (datosFiltrados.reduce((sum, d) => sum + d.calificacion, 0) / datosFiltrados.length).toFixed(1);

    document.getElementById('statEstudiantes').textContent = estudiantes;
    document.getElementById('statMaterias').textContent = materias;
    document.getElementById('statProfesores').textContent = profesores;
    document.getElementById('statPromedio').textContent = promedio + '%';
}

// FUNCIONES DE GRÁFICAS
function crearGraficas() {
    crearGraficaEstudiantes();
    crearGraficaMaterias();
    crearGraficaProfesores();
    crearGraficaEvolucion();
    crearGraficaDistribucion();
    crearGraficaAsistencia();
}

function crearGraficaEstudiantes() {
    const ctx = document.getElementById('chartEstudiantes').getContext('2d');
    
    // Agrupar por estudiante
    const grupos = agruparPor('estudiante');
    const labels = Object.keys(grupos).sort();
    const calificaciones = labels.map(est => {
        const promedio = grupos[est].reduce((sum, d) => sum + d.calificacion, 0) / grupos[est].length;
        return promedio;
    });

    if (charts.chartEstudiantes) {
        charts.chartEstudiantes.destroy();
    }

    charts.chartEstudiantes = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Calificación Promedio',
                data: calificaciones,
                backgroundColor: colors[0],
                borderColor: colors[0],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: { display: true, text: 'Calificación' }
                }
            }
        }
    });
}

function crearGraficaMaterias() {
    const ctx = document.getElementById('chartMaterias').getContext('2d');
    
    const grupos = agruparPor('materia');
    const labels = Object.keys(grupos).sort();
    const promedios = labels.map(mat => {
        return (grupos[mat].reduce((sum, d) => sum + d.calificacion, 0) / grupos[mat].length).toFixed(1);
    });

    if (charts.chartMaterias) {
        charts.chartMaterias.destroy();
    }

    charts.chartMaterias = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: promedios,
                backgroundColor: colors.slice(0, labels.length),
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function crearGraficaProfesores() {
    const ctx = document.getElementById('chartProfesores').getContext('2d');
    
    const grupos = agruparPor('profesor');
    const labels = Object.keys(grupos).sort();
    const promedios = labels.map(prof => {
        return (grupos[prof].reduce((sum, d) => sum + d.calificacion, 0) / grupos[prof].length).toFixed(1);
    });

    if (charts.chartProfesores) {
        charts.chartProfesores.destroy();
    }

    charts.chartProfesores = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Promedio de Calificaciones',
                data: promedios,
                borderColor: colors[4],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderWidth: 2,
                pointBackgroundColor: colors[4],
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function crearGraficaEvolucion() {
    const ctx = document.getElementById('chartEvolucion').getContext('2d');
    
    // Agrupar por fecha y calcular promedio
    const datosOrdenados = datosFiltrados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    const grupos = agruparPor('fecha');
    const fechas = Object.keys(grupos).sort();
    const promedios = fechas.map(fecha => {
        return (grupos[fecha].reduce((sum, d) => sum + d.calificacion, 0) / grupos[fecha].length).toFixed(1);
    });

    if (charts.chartEvolucion) {
        charts.chartEvolucion.destroy();
    }

    charts.chartEvolucion = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fechas,
            datasets: [{
                label: 'Promedio de Calificaciones',
                data: promedios,
                borderColor: colors[1],
                backgroundColor: 'rgba(54, 162, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: colors[1]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function crearGraficaDistribucion() {
    const ctx = document.getElementById('chartDistribucion').getContext('2d');
    
    // Crear rangos de calificaciones
    const rangos = {
        '90-100': 0,
        '80-89': 0,
        '70-79': 0,
        '0-69': 0
    };

    datosFiltrados.forEach(d => {
        if (d.calificacion >= 90) rangos['90-100']++;
        else if (d.calificacion >= 80) rangos['80-89']++;
        else if (d.calificacion >= 70) rangos['70-79']++;
        else rangos['0-69']++;
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
                backgroundColor: ['#4BC0C0', '#36A2EB', '#FFCE56', '#FF6384'],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function crearGraficaAsistencia() {
    const ctx = document.getElementById('chartAsistencia').getContext('2d');
    
    const grupos = agruparPor('estudiante');
    const labels = Object.keys(grupos).sort();
    const tasaAsistencia = labels.map(est => {
        const presente = grupos[est].filter(d => d.asistencia === 'Presente').length;
        return ((presente / grupos[est].length) * 100).toFixed(0);
    });

    if (charts.chartAsistencia) {
        charts.chartAsistencia.destroy();
    }

    charts.chartAsistencia = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '% Asistencia',
                data: tasaAsistencia,
                backgroundColor: '#4BC0C0',
                borderColor: '#4BC0C0',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// FUNCIONES AUXILIARES
function agruparPor(clave) {
    return datosFiltrados.reduce((acc, item) => {
        if (!acc[item[clave]]) {
            acc[item[clave]] = [];
        }
        acc[item[clave]].push(item);
        return acc;
    }, {});
}

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
