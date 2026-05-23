def analizar_datos(df):
    print("\n📊 Análisis de Datos:")
    print(f"Cantidad de registros: {df.shape[0]}")
    print(f"Cantidad de columnas: {df.shape[1]}")
    print("\nTipos de datos:")
    print(df.dtypes)
    print("\nEstadísticas:")
    print(df.describe())
    
    return {
        "filas": df.shape[0],
        "columnas": df.shape[1]
    }