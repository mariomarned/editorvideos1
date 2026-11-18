import fs from "node:fs";
import path from "node:path";

/**
 * Convierte tiempos de caracteres de ElevenLabs o palabras de faster-whisper
 * al formato SegmentoSubtitulo[] que consume <Subtitulos /> en Remotion.
 *
 * Uso:
 *   node scripts/tiempos.mjs --entrada public/audio/voz.tiempos.json --salida public/subtitulos/voz.json --fps 30 --maxPalabras 6
 */
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token.startsWith("--")) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

function palabrasDesdeElevenLabs(alignment) {
  const {
    characters = [],
    character_start_times_seconds = [],
    character_end_times_seconds = [],
  } = alignment;

  const palabras = [];
  let actual = "";
  let inicio = null;
  let fin = 0;

  for (let i = 0; i < characters.length; i++) {
    const ch = characters[i];
    const t0 = character_start_times_seconds[i] ?? 0;
    const t1 = character_end_times_seconds[i] ?? t0;

    if (/\s/.test(ch)) {
      if (actual.length > 0) {
        palabras.push({ palabra: actual, inicioSeg: inicio, finSeg: fin });
        actual = "";
        inicio = null;
      }
    } else {
      if (inicio === null) inicio = t0;
      actual += ch;
      fin = t1;
    }
  }

  if (actual.length > 0) {
    palabras.push({ palabra: actual, inicioSeg: inicio ?? 0, finSeg: fin });
  }

  return palabras;
}

function agruparEnSegmentos(palabras, fps, maxPalabras) {
  const segmentos = [];
  for (let i = 0; i < palabras.length; i += maxPalabras) {
    const grupo = palabras.slice(i, i + maxPalabras);
    const inicioFrame = Math.round(grupo[0].inicioSeg * fps);
    const finFrame = Math.max(
      inicioFrame + 1,
      Math.round(grupo[grupo.length - 1].finSeg * fps)
    );
    segmentos.push({
      texto: grupo.map((g) => g.palabra).join(" "),
      inicioFrame,
      finFrame,
      palabras: grupo.map((g) => ({
        palabra: g.palabra,
        inicioFrame: Math.round(g.inicioSeg * fps),
        finFrame: Math.max(
          Math.round(g.inicioSeg * fps) + 1,
          Math.round(g.finSeg * fps)
        ),
      })),
    });
  }
  return segmentos;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const entrada = args.entrada;
  if (!entrada) {
    console.error(
      "Uso: node scripts/tiempos.mjs --entrada archivo.tiempos.json [--salida public/subtitulos/salida.json] [--fps 30] [--maxPalabras 6]"
    );
    process.exit(1);
  }

  const fps = Number(args.fps ?? 30);
  const maxPalabras = Number(args.maxPalabras ?? 6);
  const raw = JSON.parse(fs.readFileSync(entrada, "utf8"));

  let palabras = [];
  if (raw.alignment) {
    palabras = palabrasDesdeElevenLabs(raw.alignment);
  } else if (Array.isArray(raw.palabras)) {
    palabras = raw.palabras.map((p) => ({
      palabra: p.palabra ?? p.word,
      inicioSeg: p.inicioSeg ?? p.start,
      finSeg: p.finSeg ?? p.end,
    }));
  } else {
    console.error("Formato de entrada no reconocido (se esperaba alignment o palabras).");
    process.exit(1);
  }

  const segmentos = agruparEnSegmentos(palabras, fps, maxPalabras);
  const salida =
    args.salida ||
    path.join("public/subtitulos", `${path.basename(entrada, ".json")}.segmentos.json`);

  fs.mkdirSync(path.dirname(salida), { recursive: true });
  fs.writeFileSync(salida, JSON.stringify(segmentos, null, 2));
  console.log(`Generados ${segmentos.length} segmentos en: ${salida}`);
}

main();
