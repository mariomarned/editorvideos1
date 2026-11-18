import React from "react";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface TomaProps {
  /** Ruta relativa dentro de `public/` (ej. "material/clip1.mp4" o "material/foto.jpg") */
  src: string;
  /** Tipo de medio. Si no se indica, se infiere por la extensión. */
  tipo?: "video" | "imagen";
  /** Segundo inicial del clip de video original (en segundos) */
  inicioEnSegundos?: number;
  /** Volumen del video (0 a 1). Por defecto 1. */
  volumen?: number;
  /** Zoom sutil (Ken Burns) de 1.0 a `zoomFinal` */
  zoomFinal?: number;
  /** Duración del fade in/out en frames */
  transicionFrames?: number;
  /** Oscurecimiento superpuesto (0 a 1) para mejorar legibilidad de textos */
  oscurecer?: number;
}

const EXTENSIONES_IMAGEN = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];

export const Toma: React.FC<TomaProps> = ({
  src,
  tipo,
  inicioEnSegundos = 0,
  volumen = 1,
  zoomFinal = 1.05,
  transicionFrames = 10,
  oscurecer = 0.25,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const esImagen =
    tipo === "imagen" ||
    (tipo !== "video" &&
      EXTENSIONES_IMAGEN.some((ext) => src.toLowerCase().endsWith(ext)));

  const fadeIn =
    transicionFrames > 0
      ? interpolate(frame, [0, transicionFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;

  const fadeOut =
    transicionFrames > 0
      ? interpolate(
          frame,
          [durationInFrames - transicionFrames, durationInFrames],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        )
      : 1;

  const opacidad = Math.min(fadeIn, fadeOut);
  const escala = interpolate(frame, [0, durationInFrames], [1, zoomFinal], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const mediaUrl = staticFile(src);

  return (
    <AbsoluteFill style={{ opacity: opacidad, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${escala})`,
          transformOrigin: "center center",
        }}
      >
        {esImagen ? (
          <Img
            src={mediaUrl}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <OffthreadVideo
            src={mediaUrl}
            startFrom={Math.round(inicioEnSegundos * fps)}
            volume={volumen}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </AbsoluteFill>

      {oscurecer > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: `rgba(0, 0, 0, ${oscurecer})`,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
