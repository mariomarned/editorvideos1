"""Genera voz en español gratuita con edge-tts y tiempos por palabra para Remotion."""

import argparse
import asyncio
import json
import os
from pathlib import Path
import certifi
import edge_tts

# Asegurar certificados CA en macOS con Python.org
os.environ.setdefault("SSL_CERT_FILE", certifi.where())


async def listar_voces(idioma: str = "es-") -> None:
    voces = await edge_tts.list_voices()
    for v in voces:
        if v["Locale"].startswith(idioma):
            print(f"{v['ShortName']}  |  {v['Gender']}  |  {v['Locale']}")


async def generar_voz(
    texto: str,
    salida: str,
    voz: str = "es-CO-GonzaloNeural",
    velocidad: str = "+0%",
) -> None:
    ruta_audio = Path(salida)
    ruta_audio.parent.mkdir(parents=True, exist_ok=True)

    communicate = edge_tts.Communicate(texto, voz, rate=velocidad, boundary="WordBoundary")
    palabras = []

    with open(ruta_audio, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                inicio_seg = chunk["offset"] / 10_000_000
                duracion_seg = chunk["duration"] / 10_000_000
                palabras.append(
                    {
                        "palabra": chunk["text"],
                        "inicioSeg": round(inicio_seg, 3),
                        "finSeg": round(inicio_seg + duracion_seg, 3),
                    }
                )

    ruta_tiempos = ruta_audio.with_suffix(".tiempos.json")
    ruta_tiempos.write_text(
        json.dumps(
            {
                "texto": texto,
                "voz": voz,
                "palabras": palabras,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"Voz guardada en: {ruta_audio}")
    print(f"Tiempos guardados en: {ruta_tiempos} ({len(palabras)} palabras)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Generar voz gratuita con edge-tts")
    parser.add_argument("--listar", action="store_true", help="Listar voces disponibles en español")
    parser.add_argument("--texto", help="Texto a narrar")
    parser.add_argument("--archivo", help="Archivo .txt/.md con el texto a narrar")
    parser.add_argument("--salida", default="public/audio/voz.mp3", help="Ruta del MP3 de salida")
    parser.add_argument("--voz", default="es-CO-GonzaloNeural", help="Nombre corto de la voz")
    parser.add_argument("--velocidad", default="+0%", help="Ajuste de velocidad (ej. +10%, -5%)")
    args = parser.parse_args()

    if args.listar:
        asyncio.run(listar_voces())
        return

    texto = args.texto
    if not texto and args.archivo:
        texto = Path(args.archivo).read_text(encoding="utf-8").strip()

    if not texto:
        parser.error('Debes pasar --texto "...", --archivo ruta.txt o --listar')

    asyncio.run(generar_voz(texto, args.salida, args.voz, args.velocidad))


if __name__ == "__main__":
    main()
