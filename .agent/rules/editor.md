# Reglas del Editor de Video — NED

1. **Identidad visual centralizada:** Usa siempre los tokens de `src/marca.ts` (`#C4227D` Magenta, `#FFE700` Amarillo, `Nunito` para textos generales, `Alto Sans` solo para títulos). Nunca hardcodees colores fuera de `src/marca.ts`.
2. **Formatos y zonas seguras:**
   - **Vertical principal (`1080×1920`, 30 fps):** nada importante en el **12 % superior (`230 px`)** ni en el **20 % inferior (`384 px`)**.
   - **Horizontal (`1920×1080`) y cuadrado (`1080×1080`):** margen mínimo de `80 px`.
3. **Ritmo y duración de Reels:** 20–30 s (máximo 45 s), con gancho visual/verbal en el **primer segundo**.
4. **Diseño sonoro:**
   - Golpe o acento sonoro al inicio.
   - Primeros segundos solo voz; la música entra desde la segunda escena con volumen bajo (`0.08–0.18`) debajo de la voz.
   - Un efecto sutil por cada elemento gráfico que aparece.
   - Narración con la voz de ElevenLabs (también en videos de Lemo-Opuscar, nunca la voz por defecto de Lemo), salvo grabaciones reales con micrófono.
   - Música y efectos únicamente con licencia comercial, anotando origen y licencia en `REGISTRO.md`.
5. **Subtítulos:** palabra por palabra (bloques cortos de 2–3 palabras o frases breves) sincronizados con `scripts/tiempos.mjs` o `herramientas/transcribir.py`.
6. **Material e IA:** las tomas con IA son solo para detalles; el producto/app real se muestra con capturas o tomas reales.
7. **Aprobación y publicación:** nada se publica sin aprobación explícita del usuario.
8. **Secretos y macOS:** nunca escribas claves en archivos versionados (usa `.env`). En macOS no uses `--gl=angle` en Remotion.
