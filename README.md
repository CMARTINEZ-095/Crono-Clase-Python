# 📚 Crono-Clase - Sistema de Visualización de Datos Académicos

## Descripción
Sistema de visualización académica con análisis de calificaciones, asistencia, profesores y rendimiento estudiantil. La interfaz web muestra gráficas interactivas basadas en los datos procesados.

## 📁 Estructura del Proyecto

```text
Crono-Clase-Python/
├── main.py                          # Procesamiento principal y exportación
├── server.py                        # Servidor local para servir la interfaz
├── Backend/
│   ├── __init__.py
│   ├── analisis.py                   # Análisis de datos
│   ├── exportar.py                   # Exportación de resultados
│   ├── lectura.py                    # Lectura de archivos CSV
│   └── limpieza.py                   # Limpieza y normalización
├── Data/
│   └── EstudiantesCronoClase.csv     # Datos de entrada
├── Frontend/
│   ├── index.html                    # Página principal
│   ├── app.js                        # Gráficas, filtros y tabla
│   ├── style.css                     # Estilos y responsive
│   ├── estudiantes_limpio.json       # Datos procesados para la web
│   └── estudiantes_limpio.csv        # Export CSV de respaldo
├── Output/
│   └── estudiantes_limpio.csv        # Salida generada por el procesamiento
└── README.md                         # Este archivo
```

## 🚀 Instalación y Ejecución

### 1. Requisitos Previos
- Python 3.8+
- Pip para instalar dependencias

### 2. Configuración del Entorno
Se recomienda usar un entorno virtual. En Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate
```

### 3. Instalar Dependencias
```powershell
pip install pandas
```

### 4. Procesar los datos
```powershell
python main.py
```

Este paso:
- lee el CSV desde `Data/`
- limpia y normaliza las calificaciones
- genera los archivos de salida en `Frontend/` y `Output/`

### 5. Abrir la interfaz web
```powershell
python server.py
```

El servidor sirve la carpeta `Frontend` en `http://localhost:8000`.

## 📊 Características de la Interfaz

### Gráficas incluidas
1. **Mejores Estudiantes** - ranking horizontal de rendimiento promedio.
2. **Promedio por Materia** - distribución por materia.
3. **Promedio por Profesor** - visualización combinada con la gráfica de notas definitivas.
4. **Notas Definitivas** - promedio consolidado por estudiante en una gráfica separada.
5. **Evolución Temporal** - tendencia de calificaciones por fecha.
6. **Distribución de Calificaciones** - rangos de rendimiento.
7. **Tasa de Asistencia** - porcentaje de asistencia por estudiante.

### Filtros interactivos
- Filtrar por estudiante
- Filtrar por materia
- Filtrar por profesor
- Reiniciar filtros

### Estadísticas generales
- Total de estudiantes
- Total de materias
- Total de profesores
- Promedio general de calificaciones

### Tabla de datos
- Vista completa de registros filtrados
- Indicador visual de asistencia ✅ / ❌
- Calificaciones resaltadas en la tabla

## 📝 Formato de datos esperado

El CSV de entrada debe contener estas columnas:
- `estudiante`
- `materia`
- `profesor`
- `fecha` (YYYY-MM-DD)
- `calificacion`
- `asistencia`

## 🔧 Personalización

### Agregar o actualizar datos
1. Edita `Data/EstudiantesCronoClase.csv`
2. Ejecuta `python main.py`
3. Reinicia el servidor con `python server.py`

### Cambiar colores
Edita el arreglo `colors` en `Frontend/app.js`.

### Modificar estilos
Los estilos están en `Frontend/style.css`.

## 📦 Dependencias

- **pandas**: procesamiento y análisis de datos
- **Chart.js**: visualización de gráficas en el navegador

## 💡 Uso rápido

1. `python main.py`
2. `python server.py`
3. Abrir `http://localhost:8000`

## 🤝 Contribuciones

Proyecto educativo para análisis académico y visualización de datos.

## 📄 Licencia

Uso educativo y abierto para fines académicos.

---

**Última actualización**: Mayo 2026
