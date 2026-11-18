import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MARCA } from "../marca";

export interface EtiquetaProps {
  titulo: string;
  subtitulo?: string;
  posicion?: "arriba-izquierda" | "abajo-izquierda" | "centro";
  colorAcento?: string;
}

export const Etiqueta: React.FC<EtiquetaProps> = ({
  titulo,
  subtitulo,
  posicion = "abajo-izquierda",
  colorAcento = MARCA.colores.primario,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrada = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 160 },
  });

  const salida = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacidad = Math.min(entrada, salida);

  const estilosPosicion: React.CSSProperties =
    posicion === "arriba-izquierda"
      ? { justifyContent: "flex-start", alignItems: "flex-start", padding: 72 }
      : posicion === "centro"
        ? { justifyContent: "center", alignItems: "center", padding: 72 }
        : { justifyContent: "flex-end", alignItems: "flex-start", padding: 72 };

  return (
    <AbsoluteFill style={{ ...estilosPosicion, pointerEvents: "none" }}>
      <div
        style={{
          opacity: opacidad,
          transform: `translateX(${(1 - entrada) * -36}px)`,
          display: "flex",
          alignItems: "center",
          gap: 16,
          backgroundColor: MARCA.colores.fondoTarjeta,
          border: `1px solid ${MARCA.colores.borde}`,
          borderRadius: 14,
          padding: "16px 24px",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div
          style={{
            width: 6,
            alignSelf: "stretch",
            borderRadius: 4,
            backgroundColor: colorAcento,
          }}
        />
        <div style={{ fontFamily: MARCA.tipografia.titulos }}>
          <div
            style={{
              color: MARCA.colores.texto,
              fontSize: 32,
              fontWeight: 700,
              lineHeight: 1.15,
            }}
          >
            {titulo}
          </div>
          {subtitulo && (
            <div
              style={{
                color: MARCA.colores.textoSecundario,
                fontSize: 22,
                fontWeight: 500,
                marginTop: 4,
              }}
            >
              {subtitulo}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
