# 📚 Crono-Clase - Sistema de Visualización de Datos Académicos

## Descripción
Sistema completo de gestión y visualización de datos académicos que incluye información de estudiantes, materias, profesores, calificaciones y asistencia. Presenta múltiples gráficas interactivas para análisis visual de datos.

## 📁 Estructura del Proyecto

```
Crono-Clase/
├── main.py                          # Script principal de procesamiento
├── Backend/
│   ├── __init__.py
│   ├── lectura_new.py              # Lectura de CSV
│   ├── limpieza_new.py             # Limpieza de datos
│   ├── analisis_new.py             # Análisis de datos
│   └── exportar_new.py             # Exportación a JSON y CSV
├── Frontend/
│   ├── index.html                  # Página principal
│   ├── app.js                      # Lógica de gráficas y filtros
│   ├── style.css                   # Estilos CSS
│   └── estudiantes_limpio.json     # Datos procesados (generado automáticamente)
├── Data/
│   └── EstudiantesCronoClase.csv   # Datos de entrada
├── Output/
│   └── estudiantes_limpio.csv      # CSV procesado (generado automáticamente)
└── README.md                        # Este archivo
```

## 🚀 Instalación y Ejecución

### 1. Requisitos Previos
- Python 3.8+
- pip (gestor de paquetes Python)

### 2. Configuración del Entorno
Se ha creado un virtual environment. Activarlo:

**Windows (PowerShell):**
```powershell
.\.venv\Scripts\Activate
```

**Windows (CMD):**
```cmd
.venv\Scripts\activate.bat
```

**Linux/Mac:**
```bash
source .venv/bin/activate
```

### 3. Instalar Dependencias
```bash
pip install pandas
```

### 4. Ejecutar el Script Principal
```bash
python main.py
```

Este comando:
- Lee el archivo CSV de datos
- Limpia y normaliza los datos
- Realiza análisis estadístico
- Exporta a CSV y JSON

### 5. Ver la Interfaz Web
1. Abre el archivo `Frontend/index.html` en tu navegador web
2. O sirve los archivos con un servidor local:

**Con Python 3:**
```bash
cd Frontend
python -m http.server 8000
```

Luego accede a: `http://localhost:8000`

## 📊 Características

### Gráficas Incluidas
1. **Calificaciones por Estudiante** - Gráfica de barras
2. **Promedio por Materia** - Gráfica tipo dona
3. **Promedio por Profesor** - Gráfica de radar
4. **Evolución Temporal** - Gráfica de líneas
5. **Distribución de Calificaciones** - Gráfica tipo pastel
6. **Tasa de Asistencia** - Gráfica de barras

### Filtros Interactivos
- Filtrar por Estudiante
- Filtrar por Materia
- Filtrar por Profesor
- Reiniciar filtros

### Estadísticas Generales
- Total de estudiantes
- Total de materias
- Total de profesores
- Promedio general de calificaciones

### Tabla de Datos
- Vista completa de todos los datos
- Indicador visual de asistencia (✅/❌)
- Valores de calificación destacados

## 📝 Formato de Datos

El archivo CSV debe tener las siguientes columnas:
- `estudiante`: Nombre del estudiante
- `materia`: Nombre de la materia
- `profesor`: Nombre del profesor
- `fecha`: Fecha del registro (formato YYYY-MM-DD)
- `calificacion`: Calificación numérica (0-100)
- `asistencia`: "Presente" o "Ausente"

## 🔧 Personalización

### Agregar Más Datos
1. Edita o reemplaza el archivo `Data/EstudiantesCronoClase.csv`
2. Ejecuta `python main.py` nuevamente
3. Recarga la página web en el navegador

### Cambiar Colores
Edita el array `colors` en `Frontend/app.js`:
```javascript
const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    // Agrega más colores aquí
];
```

### Modificar Estilos
Todos los estilos están en `Frontend/style.css`. Modifica variables CSS o clases según necesites.

## 📦 Dependencias

- **pandas**: Procesamiento y análisis de datos CSV
- **Chart.js**: (Cliente) Librería para gráficas interactivas

## 🤝 Contribuciones

Este es un proyecto educativo. Siéntete libre de modificar y mejorar el código.

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

## 👤 Autor

Creado como sistema de gestión académica para Crono-Clase.

---

**Última actualización**: Mayo 2026
