# Historial del proyecto EditorVideos (NED)

## 2026-11-18
- Inicialización del estudio en `/Users/mariomartinez/DevMario/Mario/EditorVideos` (macOS).
- Configuración de identidad de marca **NED** en `src/marca.ts`:
  - Magenta `#C4227D` (Pantone P 80-8 C), Amarillo `#FFE700` (Pantone P 1-8 C).
  - Fuentes: `Nunito` (texto general) y `Alto Sans` (títulos).
  - Formatos: vertical `1080×1920`, horizontal `1920×1080` y cuadrado `1080×1080` a 30 fps.
- Instalación de 13 skills oficiales de Remotion (`remotion-dev/skills`) en `.agents/skills/`.
- Auditoría e instalación de **Lemo-Opuscar** en `~/lemo-opuscar` (commit `00a7f9ec99c8686265a8ca4ed9a3fdaaf27ea6f4`) y skill copiada en `.agent/skills/lemo-opuscar/`.
- Creación de entorno Python `.venv` con `faster-whisper` y herramientas en `herramientas/`.
- Primer Reel de **NED × Zencillo** (`out/ned/ned-zencillo-reel.mp4`) con voz de ElevenLabs, música de fondo y subtítulos sincronizados.
- Reorganización a estructura multi-proyecto: `src/marcas/<proyecto>.ts`, `src/videos/<proyecto>/`, `public/<proyecto>/`, `guiones/<proyecto>/`, `out/<proyecto>/` y carpetas `<Folder>` en `src/Root.tsx`.

## 2026-11-23
- Creación del nuevo proyecto **NPS** dentro de **NED**:
  - Extracción de la base de diseño urbana de NED (`DecoracionUrbanaMemphis`, `PildoraNed`, `OvaloDestacado`, `TarjetaSticker`, `MarcoSticker` y `FONDO_RADIAL_NED`) en `src/videos/ned/componentes/DisenoNed.tsx`.
  - Composición `NedNpsReel` (`1080×1920`, 30 fps, 1158 frames / 38.60 s) en `src/videos/ned/02-nps/NpsReel.tsx`, registrada en `src/Root.tsx` bajo `<Folder name="NED">` con la misma línea visual de `NedZencilloReel`.
  - Integración de las capturas `imagen 1.png`, `imagen 2.png` e `imagen 3.png` de `public/ned/material/nps/`, narración personalizada en `public/ned/audio/nps/danielanps.mp3`, subtítulos por palabra transcritos en `public/ned/subtitulos/nps/nps.json` y música de fondo `Follow Me - The Soundlings.mp3`.
  - Libreto completo y textos de publicación en `guiones/ned/02-nps.md`.
