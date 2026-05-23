import pandas as pd
import json
import os

def exportar_csv(df, ruta_salida):
    print(f"🚀 Generando archivos de salida...")
    
    # 1. Guardar CSV en output/
    carpeta = os.path.dirname(ruta_salida)
    if carpeta and not os.path.exists(carpeta):
        os.makedirs(carpeta, exist_ok=True)
    df.to_csv(ruta_salida, index=False, encoding='utf-8')
    print(f"✔ Archivo CSV guardado en: {ruta_salida}")
    
    # 2. Guardar JSON en Frontend/
    ruta_json_frontend = os.path.join('Frontend', 'estudiantes_limpio.json')
    datos_dict = df.to_dict(orient='records')
    
    with open(ruta_json_frontend, 'w', encoding='utf-8') as f:
        json.dump(datos_dict, f, ensure_ascii=False, indent=4)
        
    print(f"✔ Archivo JSON guardado en: {ruta_json_frontend}")