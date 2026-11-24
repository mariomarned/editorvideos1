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

## 2026-11-24
- Creación e implementación completa del proyecto **Grandes Marcas** (`03-grandes-marcas`) dentro de **NED**:
  - Soporte de variante magenta con footer amarillo (`FONDO_RADIAL_NED_MAGENTA`, `DecoracionUrbanaMemphis` y `PildoraNed` con `variante`, y `public/ned/material/footerNED-amarillo.png`) en `src/videos/ned/componentes/DisenoNed.tsx`.
  - Composición `NedGrandesMarcasReel` (`1080×1920`, 30 fps, `1200` frames / `40.00 s`) en `src/videos/ned/03-grandes-marcas/GrandesMarcasReel.tsx`, sincronizada con la voz de ElevenLabs (`ElevenLabs_2026-11-24T15_50_13_Mrchepe_pvc_s50_sim75_v4.mp3`), música de fondo `Follow Me - The Soundlings.mp3`, subtítulos por palabra en `public/ned/subtitulos/grandes-marcas/grandes-marcas.json` y animación de entrada + efecto de sonido individual para las 9 imágenes (`imagen1.jpeg`..`Imagen9.png`).
  - Libreto completo y textos de publicación en `guiones/ned/03-grandes-marcas.md`.
