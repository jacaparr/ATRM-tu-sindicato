#!/usr/bin/env python3
"""Extrae articulos del convenio de interiores desde el PDF y genera JSON."""

from __future__ import annotations

import argparse
import json
import re
import unicodedata
from collections import Counter
from pathlib import Path
from typing import List, Tuple

import pdfplumber

ROOT = Path(__file__).resolve().parents[1]
PDF_PATH = ROOT / "assets" / "convenio_interiores.pdf"
OUTPUT_PATH = ROOT / "data" / "convenio_interiores_articulos.json"
ARTICLE_REGEX = re.compile(r"(art[ií]culo)\s+(\d+)[\.:\-]?\s*(.+)", re.IGNORECASE)


def normalize_spaces(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def strip_accents(text: str) -> str:
    return "".join(
        ch for ch in unicodedata.normalize("NFD", text)
        if unicodedata.category(ch) != "Mn"
    )


def guess_keywords(text: str, limit: int = 8) -> List[str]:
    base = strip_accents(text.lower())
    tokens = re.findall(r"[a-z0-9áéíóúñü]+", base)
    stopwords = {
        "del", "las", "los", "una", "unos", "unas", "para", "con", "por", "que",
        "este", "esta", "estas", "estos", "sobre", "de", "la", "el", "y", "en", "al"
    }
    filtered = [tok for tok in tokens if len(tok) >= 4 and tok not in stopwords]
    if not filtered:
        return []
    counts = Counter(filtered)
    return [word for word, _ in counts.most_common(limit)]


def extract_text() -> str:
    if not PDF_PATH.exists():
        raise FileNotFoundError(f"No se encontro el PDF en {PDF_PATH}")
    chunks: List[str] = []
    with pdfplumber.open(PDF_PATH) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            if text:
                chunks.append(text)
    return "\n".join(chunks)


def split_articles(raw_text: str) -> List[Tuple[str, str, str]]:
    matches = list(ARTICLE_REGEX.finditer(raw_text))
    articles: List[Tuple[str, str, str]] = []
    for index, match in enumerate(matches):
        start = match.end()
        end = matches[index + 1].start() if index + 1 < len(matches) else len(raw_text)
        body = raw_text[start:end].strip()
        numero = match.group(2)
        titulo = normalize_spaces(match.group(3)) or f"Articulo {numero}"
        referencia = f"Art. {numero}"
        contenido = normalize_spaces(body)
        articles.append((titulo, contenido, referencia))
    return articles


def build_payload(articles: List[Tuple[str, str, str]]) -> dict:
    data = []
    for titulo, texto, referencia in articles:
        if not texto:
            continue
        data.append({
            "titulo": titulo,
            "texto": texto,
            "referencia": referencia,
            "keywords": guess_keywords(f"{titulo} {texto}")
        })
    return {"articulos": data}


def main() -> None:
    parser = argparse.ArgumentParser(description="Genera JSON de articulos desde el PDF del convenio de interiores")
    parser.add_argument("--pdf", type=Path, default=PDF_PATH, help="Ruta al PDF (default: assets/convenio_interiores.pdf)")
    parser.add_argument("--out", type=Path, default=OUTPUT_PATH, help="Ruta del JSON de salida (default: data/convenio_interiores_articulos.json)")
    args = parser.parse_args()

    global PDF_PATH, OUTPUT_PATH
    PDF_PATH = args.pdf
    OUTPUT_PATH = args.out

    print(f"Leyendo PDF: {PDF_PATH}")
    raw_text = extract_text()
    articles = split_articles(raw_text)
    if not articles:
        raise SystemExit("No se detectaron articulos en el PDF. Verifica el archivo.")
    payload = build_payload(articles)
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Se generaron {len(payload['articulos'])} articulos en {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
