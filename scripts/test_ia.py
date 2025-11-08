#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Test harness para la IA sindical basada en data/casos.json
- Modo CLI: python scripts/test_ia.py "mi madre está ingresada"
- Modo servidor: python scripts/test_ia.py --serve 8787
"""
import json
import sys
import argparse
from http.server import BaseHTTPRequestHandler, HTTPServer

CASOS_PATH = r"c:\\Users\\jach1\\Documents\\ATRM-tu-sindicato\\data\\casos.json"


def cargar_base():
    with open(CASOS_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
    assert 'casos' in data, 'casos.json no contiene la clave "casos"'
    return data


def encontrar_caso(base, pregunta: str):
    pregunta_lower = pregunta.lower()
    # Scoring por nº de keywords encontradas, y desempate por longitud de keyword
    mejor = None
    mejor_puntuacion = 0
    for caso_id, caso in base['casos'].items():
        score = 0
        for kw in caso.get('keywords', []):
            if kw.lower() in pregunta_lower:
                score += max(1, min(len(kw), 20) // 4)  # ponderar un poco por longitud
        if score > mejor_puntuacion:
            mejor = (caso_id, caso)
            mejor_puntuacion = score
    return mejor, mejor_puntuacion


def generar_respuesta(base, pregunta: str):
    (caso_id, caso), score = encontrar_caso(base, pregunta) if base else (None, None)
    if not caso:
        return {
            'tema_id': 'consulta_general',
            'titulo': 'Consulta general',
            'respuesta': '🤖 No tengo un tema específico que coincida. Puedo ayudarte con permisos, vacaciones, nómina, despidos, PRL, subrogaciones y más. Llama ATRM: 968 626 511.',
            'score': 0,
            'documentos': [],
            'casos_reales': [],
            'comparativa_sectorial': None,
        }
    partes = []
    partes.append(f"📋 {caso.get('titulo','')}")
    detalle = caso.get('detalle')
    if detalle:
        partes.append("")
        partes.append(detalle)
    if caso.get('casos_reales'):
        partes.append("")
        partes.append('💼 Ejemplos reales:')
        for c in caso['casos_reales'][:3]:
            partes.append(f"• {c}")
    if caso.get('comparativa_sectorial'):
        partes.append("")
        partes.append(f"🗺️ Comparativa: {caso['comparativa_sectorial']}")
    # Jurisprudencia si aplica
    juris = [j for j in base.get('jurisprudencia', []) if j.get('tema') == caso_id]
    if juris:
        j0 = juris[0]
        partes.append("")
        partes.append(f"⚖️ Precedente: {j0.get('resumen','')} ({j0.get('referencia','')})")
    if caso.get('documentos'):
        partes.append("")
        partes.append('📄 Documentos: ' + ', '.join(caso['documentos']))
    if caso.get('contacto'):
        partes.append("")
        partes.append(f"📞 Gestionar: {caso['contacto']}")

    return {
        'tema_id': caso_id,
        'titulo': caso.get('titulo'),
        'respuesta': "\n".join(partes),
        'score': score,
        'documentos': caso.get('documentos', []),
        'casos_reales': caso.get('casos_reales', []),
        'comparativa_sectorial': caso.get('comparativa_sectorial'),
    }


class Handler(BaseHTTPRequestHandler):
    base = None

    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_POST(self):
        if self.path != '/ask':
            self._set_headers(404)
            self.wfile.write(b'{"error":"Not found"}')
            return
        content_length = int(self.headers.get('Content-Length', '0'))
        body = self.rfile.read(content_length).decode('utf-8')
        try:
            payload = json.loads(body or '{}')
            pregunta = payload.get('pregunta', '').strip()
        except Exception:
            self._set_headers(400)
            self.wfile.write(b'{"error":"JSON invalido"}')
            return
        if not pregunta:
            self._set_headers(400)
            self.wfile.write(b'{"error":"pregunta requerida"}')
            return
        if not Handler.base:
            Handler.base = cargar_base()
        out = generar_respuesta(Handler.base, pregunta)
        self._set_headers(200)
        self.wfile.write(json.dumps(out, ensure_ascii=False).encode('utf-8'))


def main():
    parser = argparse.ArgumentParser(description='Test IA sindical (CLI/HTTP)')
    parser.add_argument('consulta', nargs='*', help='Texto de la consulta')
    parser.add_argument('--serve', type=int, nargs='?', const=8787, help='Levanta servidor HTTP en el puerto (por defecto 8787)')
    args = parser.parse_args()

    if args.serve:
        Handler.base = cargar_base()
        httpd = HTTPServer(('0.0.0.0', args.serve), Handler)
        print(f"🚀 Servidor de prueba escuchando en http://localhost:{args.serve}  (POST /ask {{pregunta}})")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nApagando servidor...")
        finally:
            httpd.server_close()
        return

    consulta = " ".join(args.consulta).strip()
    if not consulta:
        print("Uso CLI: python scripts/test_ia.py \"mi madre ingresada en hospital\"")
        print("O servidor: python scripts/test_ia.py --serve 8787")
        sys.exit(0)

    base = cargar_base()
    out = generar_respuesta(base, consulta)
    print(json.dumps(out, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
