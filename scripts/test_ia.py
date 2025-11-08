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


def _normalize(s: str) -> str:
    import unicodedata
    s = s.lower()
    s = unicodedata.normalize('NFD', s)
    s = ''.join(ch for ch in s if unicodedata.category(ch) != 'Mn')
    out = []
    for ch in s:
        out.append(ch if (ch.isalnum() or ch.isspace()) else ' ')
    return ' '.join(''.join(out).split())


def rank_casos(base, pregunta: str, topn: int = 3):
    consulta = _normalize(pregunta)
    partes = set([p for p in consulta.split() if len(p) > 2])
    ranking = []
    for caso_id, caso in base['casos'].items():
        score = 0.0
        for kw in caso.get('keywords', []):
            nkw = _normalize(kw)
            if not nkw:
                continue
            if nkw in consulta:
                score += min(len(nkw), 20) / 4.0
            else:
                sub = [p for p in nkw.split() if len(p) > 3]
                match_sub = sum(1 for p in sub if p in partes)
                if match_sub:
                    score += match_sub * 0.75
        if score > 0:
            ranking.append((caso_id, caso, round(score, 2)))
    ranking.sort(key=lambda t: t[2], reverse=True)
    return ranking[:topn]


def generar_respuesta(base, pregunta: str):
    ranking = rank_casos(base, pregunta) if base else []
    if not ranking:
        return {
            'tema_id': 'consulta_general',
            'titulo': 'Consulta general',
            'respuesta': '🤖 No tengo un tema específico que coincida. Puedo ayudarte con permisos, vacaciones, nómina, despidos, PRL, subrogaciones y más. Llama ATRM: 968 626 511.',
            'score': 0,
            'documentos': [],
            'casos_reales': [],
            'comparativa_sectorial': None,
        }
    caso_id, caso, score = ranking[0]
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

    # Sugerencias top-3 si hay más candidatos
    if len(ranking) > 1:
        sugerencias = [f"{base['casos'][cid]['titulo']} ({sc})" for cid, _, sc in ranking[1:]]
        if score < 6:
            partes.append("")
            partes.append("🔎 También podrían interesarte: " + ' · '.join(sugerencias))
        else:
            partes.append("")
            partes.append("💡 Temas relacionados: " + ' · '.join(sugerencias))

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
