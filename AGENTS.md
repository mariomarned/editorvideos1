# Guía del proyecto EditorVideos — NED

Este repositorio es el estudio de edición de video programático de **NED** (Marketplace social enfocado en Lealtad: app móvil para negocios y consumidores con versión web para negocios) en **macOS**.

## Stack e integraciones
- **Remotion (TypeScript + React + `@remotion/three`)** para composiciones 2D y 3D.
- **ElevenLabs** (`scripts/elevenlabs.mjs` y `scripts/tiempos.mjs`) para voz, música y efectos con tiempos por palabra.
- **Python + FFmpeg** (`.venv/bin/python`, `herramientas/`) para transcripción con `faster-whisper`, detección de silencios, extracción de shorts 9:16 y descarga de sonidos CC0 en Openverse.
- **Lemo-Opuscar** (`~/lemo-opuscar`, commit `00a7f9ec99c8686265a8ca4ed9a3fdaaf27ea6f4`, skill en `.agent/skills/lemo-opuscar/`) para videos animados estilo dibujo/pizarra/acuarela/plano técnico.
- **Skills de Remotion** instaladas en `.agents/skills/` (`remotion-best-practices`, `remotion-captions`, `remotion-render`, etc.).

## Identidad de marca (siempre desde `src/marca.ts`)
- **Colores:** Magenta `#C4227D` (primario) y Amarillo `#FFE700` (acento/secundario) sobre fondo oscuro `#0E0C14` o blanco `#FFFFFF`.
- **Fuentes:** `Nunito` para textos generales y `Alto Sans` solo para títulos.
- **Logos:** en `public/logos/` (claro y oscuro).

## Comandos principales
- Previsualizar en estudio: `npm run dev`
- Verificar tipos TypeScript: `npm run typecheck`
- Renderizar video: `npx remotion render ShortEjemplo out/short-ejemplo.mp4`
- ElevenLabs:
  - `npm run voces`
  - `npm run voz -- --texto "Tu guion aquí" --salida public/audio/voz.mp3`
  - `npm run tiempos -- --entrada public/audio/voz.tiempos.json --salida public/subtitulos/voz.json`
  - `npm run musica -- --prompt "Upbeat modern tech background" --duracion 15 --salida public/audio/musica.mp3`
  - `npm run efecto -- --prompt "Clean UI whoosh" --duracion 2 --salida public/audio/whoosh.mp3`
- Herramientas Python:
  - `npm run transcribir -- <archivo>`
  - `npm run cortes -- <video>`
  - `npm run shorts -- <video> --inicio 00:00:10 --duracion 30`
  - `npm run sonido -- "whoosh"`
  - `.venv/bin/python herramientas/recortar_ffmpeg.py <entrada> <salida> --inicio 00:00:05 --duracion 10`

## Flujo de trabajo
- Consulta `datos/catalogo-material.json` para ubicar tomas antes de revisar carpetas completas.
- Guarda cada libreto en `guiones/` con la idea, voz, tomas usadas y textos de publicación.
- Registra el origen y licencia de cada música o efecto en `REGISTRO.md`.
- Al terminar hitos importantes, actualiza `docs/HISTORIAL.md` con la fecha.
