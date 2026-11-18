"""Transcribe audio o video con faster-whisper y genera tiempos por palabra."""

import argparse
import json
from pathlib import Path
from faster_whisper import WhisperModel


def transcribir(
    entrada: str,
    salida: str | None = None,
    modelo: str = "base",
    idioma: str = "es",
) -> Path:
    model = WhisperModel(modelo, device="cpu", compute_type="int8")
    segments, info = model.transcribe(
        entrada,
        language=idioma if idioma != "auto" else None,
        word_timestamps=True,
    )

    palabras = []
    texto_completo = []
    for seg in segments:
        texto_completo.append(seg.text.strip())
        if seg.words:
            for w in seg.words:
                palabras.append(
                    {
                        "palabra": w.word.strip(),
                        "inicioSeg": round(w.start, 3),
                        "finSeg": round(w.end, 3),
                    }
                )

    ruta_salida = (
        Path(salida)
        if salida
        else Path("public/subtitulos") / f"{Path(entrada).stem}.palabras.json"
    )
    ruta_salida.parent.mkdir(parents=True, exist_ok=True)
    ruta_salida.write_text(
        json.dumps(
            {
                "idioma": info.language,
                "texto": " ".join(texto_completo),
                "palabras": palabras,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"Transcripción guardada en: {ruta_salida} ({len(palabras)} palabras)")
    return ruta_salida


def main() -> None:
    parser = argparse.ArgumentParser(description="Transcribir audio/video con faster-whisper")
    parser.add_argument("entrada", help="Ruta al archivo de audio o video")
    parser.add_argument("--salida", help="Ruta del JSON de salida")
    parser.add_argument("--modelo", default="base", help="Modelo Whisper (tiny, base, small, medium)")
    parser.add_argument("--idioma", default="es", help="Código de idioma (ej. es, en, auto)")
    args = parser.parse_args()
    transcribir(args.entrada, args.salida, args.modelo, args.idioma)


if __name__ == "__main__":
    main()
