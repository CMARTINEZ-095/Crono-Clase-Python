#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from Backend.lectura import leer_csv
from Backend.limpieza import limpiar_datos
from Backend.analisis import analizar_datos
from Backend.exportar import exportar_csv

# Ruta archivo de datos
ruta = "Data/EstudiantesCronoClase.csv"

print("=" * 50)
print("PROCESAMIENTO DE DATOS - CRONO-CLASE")
print("=" * 50)

# Leer CSV
df = leer_csv(ruta)

if df is not None:
    # Limpiar datos
    df = limpiar_datos(df)
    
    # Analizar
    resultado = analizar_datos(df)
    
    # Exportar
    exportar_csv(df, "Output/estudiantes_limpio.csv")
    
    print("\n✓ Proceso completado exitosamente")
else:
    print("\n✗ No se pudo cargar el archivo")