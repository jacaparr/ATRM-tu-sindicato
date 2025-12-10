#!/usr/bin/env python3
"""Automatic news updater for ATRM."""

from __future__ import annotations

import html
import json
import re
from datetime import datetime
from email.utils import parsedate_to_datetime
from pathlib import Path
from typing import Iterable, List, Tuple
from urllib.error import URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_PATH = BASE_DIR / "data" / "atrm_sindicato_data.json"
MAX_TOTAL_NEWS = 10
MAX_NEW_ITEMS = 4
RSS_SOURCES: List[Tuple[str, str]] = [
    (
        "Google News - Sindicatos",
        "https://news.google.com/rss/search?q=sindicato+laboral&hl=es-419&gl=ES&ceid=ES:es",
    ),
    (
        "Google News - Sindicatos Murcia",
        "https://news.google.com/rss/search?q=sindicato+Murcia&hl=es-419&gl=ES&ceid=ES:es",
    ),
]
KEYWORDS = (
    "sindicat",
    "trabajador",
    "trabajadores",
    "huelga",
    "laboral",
    "convenio",
)
TAG_RE = re.compile(r"<[^>]+>")


def clean_text(raw: str | None) -> str:
    if not raw:
        return ""
    return TAG_RE.sub("", html.unescape(raw)).strip()


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip().lower()


def format_date(dt_obj: datetime) -> str:
    months = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
    ]
    return f"{dt_obj.day} de {months[dt_obj.month - 1]} de {dt_obj.year}"


def parse_pub_date(value: str | None) -> datetime:
    if not value:
        return datetime.utcnow()
    try:
        parsed = parsedate_to_datetime(value)
        if parsed.tzinfo:
            return parsed.astimezone(tz=None).replace(tzinfo=None)
        return parsed
    except (TypeError, ValueError):
        return datetime.utcnow()


def detect_source(item: ET.Element) -> str:
    source = item.find("source")
    if source is not None and source.text:
        return source.text.strip()
    link = item.findtext("link", default="")
    hostname = urlparse(link).hostname or "" 
    return hostname.replace("www.", "") or "Fuente desconocida"


def item_matches(text: str) -> bool:
    lowered = text.lower()
    return any(keyword in lowered for keyword in KEYWORDS)


def fetch_feed(url: str) -> Iterable[ET.Element]:
    request = Request(url, headers={"User-Agent": "ATRM-noticias-bot/1.0"})
    with urlopen(request, timeout=15) as response:
        content = response.read()
    tree = ET.fromstring(content)
    return tree.findall("channel/item")


def build_entry(item: ET.Element) -> dict:
    title = item.findtext("title", default="Noticia sin titulo").strip()
    description = clean_text(item.findtext("description"))
    pub_date = format_date(parse_pub_date(item.findtext("pubDate")))
    source = detect_source(item)
    link = item.findtext("link", default="").strip()
    contenido = description or "Noticia relacionada con actividades sindicales."
    if link:
        contenido = f"{contenido} (Enlace: {link})".strip()
    return {
        "fecha": pub_date,
        "titulo": title,
        "contenido": contenido,
        "fuente": source,
    }


def load_data() -> dict:
    with DATA_PATH.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def save_data(data: dict) -> None:
    with DATA_PATH.open("w", encoding="utf-8") as handle:
        json.dump(data, handle, ensure_ascii=False, indent=2)


def main() -> None:
    if not DATA_PATH.exists():
        raise SystemExit(f"No se encontro {DATA_PATH}")

    data = load_data()
    existing_titles = {normalize(item["titulo"]) for item in data.get("noticias", [])}
    new_entries: List[dict] = []

    for source_name, rss_url in RSS_SOURCES:
        try:
            items = fetch_feed(rss_url)
        except (URLError, ET.ParseError) as err:
            print(f"[WARN] No se pudo leer {source_name}: {err}")
            continue

        for item in items:
            title = item.findtext("title", default="")
            if not title:
                continue
            if normalize(title) in existing_titles:
                continue
            summary = item.findtext("description", default="")
            text_blob = f"{title} {summary}"
            if not item_matches(text_blob):
                continue
            entry = build_entry(item)
            new_entries.append(entry)
            existing_titles.add(normalize(title))
            if len(new_entries) >= MAX_NEW_ITEMS:
                break
        if len(new_entries) >= MAX_NEW_ITEMS:
            break

    if not new_entries:
        print("Sin novedades relevantes. Nada que actualizar.")
        return

    data.setdefault("noticias", [])
    data["noticias"] = new_entries + data["noticias"]
    data["noticias"] = data["noticias"][:MAX_TOTAL_NEWS]
    save_data(data)
    print(f"Anadidas {len(new_entries)} noticias automaticas.")


if __name__ == "__main__":
    main()
