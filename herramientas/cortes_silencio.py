"""Detecta silencios con FFmpeg y exporta un video sin pausas muertas."""

import argparse
import json
import re
import subprocess
from pathlib import Path


def detectar_silencios(entrada: str, umbral_db: float, duracion_min: float) -> tuple[list[tuple[float, float]], float]:
    cmd = [
        "ffmpeg",
        "-i",
        entrada,
        "-af",
        f"silencedetect=noise={umbral_db}dB:d={duracion_min}",
        "-f",
        "null",
        "-",
    ]
    res = subprocess.run(cmd, capture_output=True, text=True, check=False)
    stderr = res.stderr

    dur_match = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.\d+)", stderr)
    duracion_total = 0.0
    if dur_match:
        h, m, s = map(float, dur_match.groups())
        duracion_total = h * 3600 + m * 60 + s

    starts = [float(x) for x in re.findall(r"silence_start:\s*([0-9.]+)", stderr)]
    ends = [float(x) for x in re.findall(r"silence_end:\s*([0-9.]+)", stderr)]
    silencios = list(zip(starts, ends))
    return silencios, duracion_total


def calcular_segmentos_activos(
    silencios: list[tuple[float, float]], duracion_total: float, margen: float = 0.12
) -> list[tuple[float, float]]:
    if not silencios:
        return [(0.0, duracion_total)] if duracion_total > 0 else []

    activos = []
    cursor = 0.0
    for s_ini, s_fin in silencios:
        fin_activo = min(duracion_total, s_ini + margen)
        if fin_activo - cursor > 0.15:
            activos.append((round(cursor, 3), round(fin_activo, 3)))
        cursor = max(cursor, s_fin - margen)

    if duracion_total - cursor > 0.15:
        activos.append((round(cursor, 3), round(duracion_total, 3)))
    return activos


def exportar_cortes(entrada: str, salida: str, segmentos: list[tuple[float, float]]) -> None:
    if not segmentos:
        raise ValueError("No se encontraron segmentos activos para exportar.")

    filtro_v = []
    filtro_a = []
    etiquetas = []
    for idx, (ini, fin) in enumerate(segmentos):
        filtro_v.append(f"[0:v]trim=start={ini}:end={fin},setpts=PTS-STARTPTS[v{idx}]")
        filtro_a.append(f"[0:a]atrim=start={ini}:end={fin},asetpts=PTS-STARTPTS[a{idx}]")
        etiquetas.append(f"[v{idx}][a{idx}]")

    n = len(segmentos)
    complejo = ";".join(filtro_v + filtro_a) + f";{''.join(etiquetas)}concat=n={n}:v=1:a=1[outv][outa]"

    Path(salida).parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            entrada,
            "-filter_complex",
            complejo,
            "-map",
            "[outv]",
            "-map",
            "[outa]",
            "-c:v",
            "libx264",
            "-preset",
            "fast",
            "-c:a",
            "aac",
            salida,
        ],
        check=True,
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Eliminar silencios automáticamente con FFmpeg")
    parser.add_argument("entrada", help="Video de entrada")
    parser.add_argument("--salida", help="Video de salida sin silencios")
    parser.add_argument("--umbral", type=float, default=-35.0, help="Umbral en dB (default: -35)")
    parser.add_argument("--min-silencio", type=float, default=0.6, help="Duración mínima de silencio en seg")
    parser.add_argument("--solo-json", action="store_true", help="Solo guardar JSON con los segmentos")
    args = parser.parse_args()

    silencios, total = detectar_silencios(args.entrada, args.umbral, args.min_silencio)
    segmentos = calcular_segmentos_activos(silencios, total)
    print(f"Detectados {len(silencios)} silencios -> {len(segmentos)} segmentos activos.")

    if args.solo_json:
        out_json = Path(args.salida or f"{Path(args.entrada).stem}.cortes.json")
        out_json.write_text(json.dumps(segmentos, indent=2), encoding="utf-8")
        print(f"Segmentos guardados en: {out_json}")
        return

    salida = args.salida or str(Path(args.entrada).with_name(f"{Path(args.entrada).stem}_sin_silencios.mp4"))
    exportar_cortes(args.entrada, salida, segmentos)
    print(f"Video exportado en: {salida}")


if __name__ == "__main__":
    main()
