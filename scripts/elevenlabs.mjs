import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

const API_BASE = "https://api.elevenlabs.io/v1";
const API_KEY = process.env.ELEVENLABS_API_KEY;
const DEFAULT_VOICE = process.env.ELEVENLABS_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb";
const DEFAULT_MODEL = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";

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

function requireApiKey() {
  if (!API_KEY || API_KEY === "tu_clave_aqui") {
    console.error(
      "Falta ELEVENLABS_API_KEY en .env. Copia .env.example a .env y pega tu clave."
    );
    process.exit(1);
  }
}

function ensureDirForFile(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

async function listarVoces() {
  requireApiKey();
  const res = await fetch(`${API_BASE}/voices`, {
    headers: { "xi-api-key": API_KEY },
  });
  if (!res.ok) {
    throw new Error(`Error al listar voces (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  for (const v of data.voices ?? []) {
    const idioma = v.labels?.language ?? "";
    const acento = v.labels?.accent ?? "";
    console.log(`${v.voice_id}  |  ${v.name} (${[idioma, acento].filter(Boolean).join(", ")})`);
  }
}

async function generarVoz(args) {
  requireApiKey();
  let texto = args.texto;
  if (!texto && args.archivo) {
    texto = fs.readFileSync(args.archivo, "utf8").trim();
  }
  if (!texto) {
    console.error('Uso: npm run voz -- --texto "Hola mundo" [--salida public/audio/voz.mp3] [--voz VOICE_ID]');
    process.exit(1);
  }

  const voiceId = args.voz || DEFAULT_VOICE;
  const salida = args.salida || "public/audio/voz.mp3";
  ensureDirForFile(salida);

  const res = await fetch(`${API_BASE}/text-to-speech/${voiceId}/with-timestamps`, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: texto,
      model_id: args.modelo || DEFAULT_MODEL,
      voice_settings: {
        stability: 0.45,
        similarity_boost: 0.78,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`Error al generar voz (${res.status}): ${await res.text()}`);
  }

  const data = await res.json();
  const audioBuffer = Buffer.from(data.audio_base64, "base64");
  fs.writeFileSync(salida, audioBuffer);

  const jsonPath = salida.replace(/\.[^.]+$/, ".tiempos.json");
  fs.writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        texto,
        alignment: data.alignment ?? data.normalized_alignment ?? null,
      },
      null,
      2
    )
  );

  console.log(`Voz guardada en: ${salida}`);
  console.log(`Tiempos guardados en: ${jsonPath}`);
}

async function generarEfecto(args, porDefectoMusica = false) {
  requireApiKey();
  const prompt = args.prompt;
  if (!prompt) {
    const cmd = porDefectoMusica ? "musica" : "efecto";
    console.error(`Uso: npm run ${cmd} -- --prompt "descripción del sonido" [--duracion 5] [--salida public/audio/${cmd}.mp3]`);
    process.exit(1);
  }

  const duracion = Number(args.duracion ?? (porDefectoMusica ? 15 : 3));
  const salida =
    args.salida ||
    (porDefectoMusica ? "public/audio/musica.mp3" : "public/audio/efecto.mp3");
  ensureDirForFile(salida);

  const res = await fetch(`${API_BASE}/sound-generation`, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: prompt,
      duration_seconds: duracion,
      prompt_influence: 0.35,
    }),
  });

  if (!res.ok) {
    throw new Error(`Error al generar audio (${res.status}): ${await res.text()}`);
  }

  const arrayBuf = await res.arrayBuffer();
  fs.writeFileSync(salida, Buffer.from(arrayBuf));
  console.log(`Audio guardado en: ${salida}`);
}

async function main() {
  const [subcomando, ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);

  switch (subcomando) {
    case "voces":
      await listarVoces();
      break;
    case "voz":
      await generarVoz(args);
      break;
    case "efecto":
      await generarEfecto(args, false);
      break;
    case "musica":
      await generarEfecto(args, true);
      break;
    default:
      console.error("Subcomandos disponibles: voces | voz | efecto | musica");
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
