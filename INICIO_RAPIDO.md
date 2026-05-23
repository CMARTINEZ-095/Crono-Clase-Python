# 🚀 INICIO RÁPIDO - Crono-Clase

## Para ver el proyecto funcionando en 3 pasos:

### 1️⃣ EJECUTAR EL BACKEND (procesar datos)
```powershell
python main.py
```
✅ Esto generará el archivo JSON con datos limpios

### 2️⃣ INICIAR EL SERVIDOR WEB
```powershell
python server.py
```
Verás un mensaje como:
```
==================================================
🚀 Servidor Crono-Clase iniciado
==================================================
📡 Accede a: http://localhost:8000
```

### 3️⃣ ABRIR EN EL NAVEGADOR
Ve a: **http://localhost:8000**

---

## 📊 Lo que verás:

✅ **6 Gráficas interactivas:**
- Calificaciones por Estudiante (barras)
- Promedio por Materia (dona)
- Promedio por Profesor (radar)
- Evolución Temporal (líneas)
- Distribución de Calificaciones (pie)
- Tasa de Asistencia (barras)

✅ **Filtros dinámicos:**
- Por Estudiante
- Por Materia
- Por Profesor

✅ **Estadísticas en tiempo real:**
- Total de estudiantes
- Total de materias
- Total de profesores
- Promedio general

✅ **Tabla completa de datos**

---

## 🎨 Características del Interfaz

- 📱 **Responsivo**: Funciona en móvil, tablet y desktop
- 🎯 **Interactivo**: Todos los gráficos son interactivos
- 🎨 **Diseño Moderno**: Gradientes y animaciones suaves
- 🔄 **Actualización en Tiempo Real**: Los filtros actualizan todo automáticamente

---

## 📝 Para agregar nuevos datos:

1. Edita el archivo: `Data/EstudiantesCronoClase.csv`
2. Ejecuta: `python main.py`
3. Recarga el navegador (F5)

---

## 💡 Datos de Ejemplo Incluidos:

- **5 Estudiantes**: Juan, María, Carlos, Ana, Pedro
- **5 Materias**: Matemáticas, Física, Química, Historia, Inglés
- **5 Profesores**: Dr. García, Ing. López, Dra. Martínez, Prof. Rodríguez, Prof. Thompson
- **30 Registros** con calificaciones y asistencia

---

## 🆘 Si hay problemas:

❌ **Error "ModuleNotFoundError: No module named 'pandas'"**
```powershell
pip install pandas
```

❌ **El JSON no se genera**
- Verifica que `Data/EstudiantesCronoClase.csv` existe
- Ejecuta nuevamente: `python main.py`

❌ **El navegador dice "Cannot GET /"**
- Asegúrate de ejecutar `python server.py`
- Ve a: http://localhost:8000

---

## 📚 Más información:

Lee el archivo `README.md` para documentación completa.

---

**¡Listo! Tu sistema Crono-Clase está funcionando! 🎉**
