"""Busca y descarga efectos de sonido con licencia CC0 desde Openverse."""

import argparse
import json
import ssl
import urllib.parse
import urllib.request
from pathlib import Path
import certifi

SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())


def buscar_y_descargar(query: str, carpeta: str = "public/audio/cc0", limite: int = 3) -> None:
    params = urllib.parse.urlencode(
        {
            "q": query,
            "license": "cc0",
            "page_size": limite,
        }
    )
    url = f"https://api.openverse.org/v1/audio/?{params}"
    req = urllib.request.Request(url, headers={"User-Agent": "EditorVideos/1.0"})

    with urllib.request.urlopen(req, timeout=20, context=SSL_CONTEXT) as resp:
        data = json.loads(resp.read().decode("utf-8"))

    resultados = data.get("results", [])
    if not resultados:
        print(f"No se encontraron audios CC0 para: {query}")
        return

    destino = Path(carpeta)
    destino.mkdir(parents=True, exist_ok=True)

    for idx, item in enumerate(resultados, start=1):
        audio_url = item.get("url")
        if not audio_url:
            continue
        titulo = (item.get("title") or f"{query}_{idx}").strip().replace(" ", "_")
        limpio = "".join(c for c in titulo if c.isalnum() or c in ("_", "-"))[:50]
        ext = Path(urllib.parse.urlparse(audio_url).path).suffix or ".mp3"
        archivo = destino / f"{limpio}{ext}"

        print(f"Descargando: {item.get('title')} -> {archivo}")
        dl_req = urllib.request.Request(audio_url, headers={"User-Agent": "EditorVideos/1.0"})
        with urllib.request.urlopen(dl_req, timeout=30, context=SSL_CONTEXT) as dl_resp:
            archivo.write_bytes(dl_resp.read())


def main() -> None:
    parser = argparse.ArgumentParser(description="Descargar sonidos CC0 de Openverse")
    parser.add_argument("query", help="Término de búsqueda (ej. whoosh, pop, click)")
    parser.add_argument("--carpeta", default="public/audio/cc0", help="Carpeta destino")
    parser.add_argument("--limite", type=int, default=3, help="Cantidad máxima a descargar")
    args = parser.parse_args()
    buscar_y_descargar(args.query, args.carpeta, args.limite)


if __name__ == "__main__":
    main()
