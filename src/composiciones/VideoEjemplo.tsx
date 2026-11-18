import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { MARCA } from "../marca";
import { Cierre } from "../componentes/Cierre";
import { Efecto } from "../componentes/Efecto";
import { Etiqueta } from "../componentes/Etiqueta";
import { SegmentoSubtitulo, Subtitulos } from "../componentes/Subtitulos";

const SEGMENTOS_EJEMPLO: SegmentoSubtitulo[] = [
  {
    texto: "Bienvenido a tu estudio de video en Remotion",
    inicioFrame: 15,
    finFrame: 95,
    palabras: [
      { palabra: "Bienvenido", inicioFrame: 15, finFrame: 30 },
      { palabra: "a", inicioFrame: 30, finFrame: 36 },
      { palabra: "tu", inicioFrame: 36, finFrame: 44 },
      { palabra: "estudio", inicioFrame: 44, finFrame: 60 },
      { palabra: "de", inicioFrame: 60, finFrame: 66 },
      { palabra: "video", inicioFrame: 66, finFrame: 80 },
      { palabra: "en", inicioFrame: 80, finFrame: 85 },
      { palabra: "Remotion", inicioFrame: 85, finFrame: 95 },
    ],
  },
  {
    texto: "Edita con código, voz IA y subtítulos automáticos",
    inicioFrame: 100,
    finFrame: 185,
    palabras: [
      { palabra: "Edita", inicioFrame: 100, finFrame: 112 },
      { palabra: "con", inicioFrame: 112, finFrame: 120 },
      { palabra: "código,", inicioFrame: 120, finFrame: 136 },
      { palabra: "voz", inicioFrame: 136, finFrame: 148 },
      { palabra: "IA", inicioFrame: 148, finFrame: 158 },
      { palabra: "y", inicioFrame: 158, finFrame: 162 },
      { palabra: "subtítulos", inicioFrame: 162, finFrame: 175 },
      { palabra: "automáticos", inicioFrame: 175, finFrame: 185 },
    ],
  },
];

export const VideoEjemplo: React.FC = () => {
  const frame = useCurrentFrame();
  const gradienteDesplazado = interpolate(frame, [0, 240], [0, 45]);

  return (
    <AbsoluteFill style={{ backgroundColor: MARCA.colores.fondo }}>
      {/* Fondo de ejemplo (reemplázalo por <Toma src="material/tu-clip.mp4" /> cuando tengas crudos) */}
      <Sequence from={0} durationInFrames={195}>
        <AbsoluteFill
          style={{
            background: `linear-gradient(${120 + gradienteDesplazado}deg, #0B0F19 0%, #1E1B4B 55%, #312E81 100%)`,
          }}
        />
        <Efecto destello duracionDestelloFrames={10} />
        <Sequence from={10} durationInFrames={160}>
          <Etiqueta
            titulo={MARCA.nombre}
            subtitulo="Plantilla base lista para producir"
            posicion="arriba-izquierda"
          />
        </Sequence>
        <Subtitulos segmentos={SEGMENTOS_EJEMPLO} />
      </Sequence>

      <Sequence from={195} durationInFrames={75}>
        <Cierre llamadoAccion="Personaliza tu marca en src/marca.ts" />
      </Sequence>
    </AbsoluteFill>
  );
};
