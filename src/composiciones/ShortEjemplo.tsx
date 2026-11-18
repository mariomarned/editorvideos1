import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { MARCA } from "../marca";
import { Cierre } from "../componentes/Cierre";
import { Etiqueta } from "../componentes/Etiqueta";
import { SegmentoSubtitulo, Subtitulos } from "../componentes/Subtitulos";

const SEGMENTOS_SHORT: SegmentoSubtitulo[] = [
  {
    texto: "Formato vertical 9:16 para Shorts y Reels",
    inicioFrame: 10,
    finFrame: 110,
  },
];

export const ShortEjemplo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 30%, #312E81 0%, ${MARCA.colores.fondo} 70%)`,
      }}
    >
      <Sequence from={0} durationInFrames={120}>
        <Etiqueta
          titulo="Short Vertical"
          subtitulo="1080 × 1920 · 30 fps"
          posicion="centro"
        />
        <Subtitulos
          segmentos={SEGMENTOS_SHORT}
          margenInferior={MARCA.video.zonaSeguraVertical.abajoPx + 24}
          tamanoFuente={52}
        />
      </Sequence>

      <Sequence from={120} durationInFrames={60}>
        <Cierre llamadoAccion={MARCA.handle} mostrarHandle={false} />
      </Sequence>
    </AbsoluteFill>
  );
};
