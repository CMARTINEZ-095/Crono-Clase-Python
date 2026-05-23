#!/usr/bin/env python3
"""
Servidor Web Simple para Crono-Clase
Ejecuta: python server.py
Accede a: http://localhost:8000
"""

import os
import sys
from pathlib import Path

# Verificar que estamos en el directorio correcto
if not os.path.exists('Frontend'):
    print("❌ Error: No se encuentra la carpeta 'Frontend'")
    print("Por favor, ejecuta este script desde la carpeta raíz del proyecto")
    sys.exit(1)

# Cambiar al directorio Frontend
os.chdir('Frontend')

# Python 3.7+
try:
    from http.server import HTTPServer, SimpleHTTPRequestHandler
    
    class CORSHandler(SimpleHTTPRequestHandler):
        def end_headers(self):
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            super().end_headers()
        
        def do_OPTIONS(self):
            self.send_response(200)
            self.end_headers()
    
    PORT = 8000
    SERVER_ADDRESS = ('', PORT)
    httpd = HTTPServer(SERVER_ADDRESS, CORSHandler)
    
    print("=" * 60)
    print("🚀 Servidor Crono-Clase iniciado")
    print("=" * 60)
    print(f"📡 Accede a: http://localhost:{PORT}")
    print(f"📁 Sirviendo desde: {os.path.abspath('.')}")
    print("\n✅ Presiona Ctrl+C para detener el servidor")
    print("=" * 60 + "\n")
    
    httpd.serve_forever()
    
except KeyboardInterrupt:
    print("\n\n🛑 Servidor detenido")
    sys.exit(0)
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
