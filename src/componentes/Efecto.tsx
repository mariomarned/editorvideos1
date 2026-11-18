import React from "react";
import { AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame } from "remotion";

export interface EfectoProps {
  /** Ruta de audio relativa a `public/` (ej. "audio/whoosh.mp3") */
  audioSrc?: string;
  /** Volumen del efecto de sonido (0 a 1) */
  volumen?: number;
  /** Destello visual opcional al inicio del efecto */
  destello?: boolean;
  /** Duración del destello en frames */
  duracionDestelloFrames?: number;
}

export const Efecto: React.FC<EfectoProps> = ({
  audioSrc,
  volumen = 0.75,
  destello = false,
  duracionDestelloFrames = 8,
}) => {
  const frame = useCurrentFrame();

  const opacidadDestello = destello
    ? interpolate(frame, [0, duracionDestelloFrames], [0.45, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <>
      {audioSrc && <Audio src={staticFile(audioSrc)} volume={volumen} />}
      {destello && opacidadDestello > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: `rgba(255, 255, 255, ${opacidadDestello})`,
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
};
