"""Extrae un clip vertical 9:16 (1080x1920) desde un video horizontal 16:9."""

import argparse
import subprocess
from pathlib import Path


def extraer_short(
    entrada: str,
    salida: str,
    inicio: str | None = None,
    duracion: str | None = None,
) -> None:
    Path(salida).parent.mkdir(parents=True, exist_ok=True)
    cmd = ["ffmpeg", "-y"]
    if inicio:
        cmd += ["-ss", inicio]
    cmd += ["-i", entrada]
    if duracion:
        cmd += ["-t", duracion]

    # Recorte centrado 9:16 y escalado a 1080x1920
    cmd += [
        "-vf",
        "crop=ih*9/16:ih:(iw-ih*9/16)/2:0,scale=1080:1920",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-c:a",
        "aac",
        salida,
    ]
    subprocess.run(cmd, check=True)
    print(f"Short guardado en: {salida}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Extraer Short vertical 9:16 con FFmpeg")
    parser.add_argument("entrada", help="Video horizontal de entrada")
    parser.add_argument("--salida", default="out/short.mp4", help="Ruta de salida")
    parser.add_argument("--inicio", help="Tiempo inicial (ej. 00:00:15 o 15)")
    parser.add_argument("--duracion", help="Duración en segundos (ej. 30)")
    args = parser.parse_args()
    extraer_short(args.entrada, args.salida, args.inicio, args.duracion)


if __name__ == "__main__":
    main()
