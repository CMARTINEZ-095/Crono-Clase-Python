import pandas as pd

def leer_csv(ruta):
    try:
        df = pd.read_csv(ruta)
        print("✓ Archivo cargado correctamente")
        print(df.head())
        return df
    except Exception as e:
        print("✗ Error leyendo archivo:", e)
        return None
        return None