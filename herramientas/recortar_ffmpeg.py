"""Utilidad simple para recortar clips de video o audio con FFmpeg."""

import argparse
import subprocess
from pathlib import Path


def recortar(entrada: str, salida: str, inicio: str, fin: str | None = None, duracion: str | None = None) -> None:
    Path(salida).parent.mkdir(parents=True, exist_ok=True)
    cmd = ["ffmpeg", "-y", "-ss", inicio, "-i", entrada]
    if fin:
        cmd += ["-to", fin]
    elif duracion:
        cmd += ["-t", duracion]
    cmd += ["-c", "copy", salida]
    subprocess.run(cmd, check=True)
    print(f"Recorte guardado en: {salida}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Recortar video/audio sin recodificar cuando sea posible")
    parser.add_argument("entrada", help="Archivo original")
    parser.add_argument("salida", help="Archivo recortado")
    parser.add_argument("--inicio", required=True, help="Inicio (ej. 00:00:10 o 10)")
    parser.add_argument("--fin", help="Fin absoluto (ej. 00:00:25)")
    parser.add_argument("--duracion", help="Duración desde inicio (ej. 15)")
    args = parser.parse_args()
    recortar(args.entrada, args.salida, args.inicio, args.fin, args.duracion)


if __name__ == "__main__":
    main()
