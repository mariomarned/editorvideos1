import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MARCA } from "../marca";

export interface PalabraTiempo {
  palabra: string;
  inicioFrame: number;
  finFrame: number;
}

export interface SegmentoSubtitulo {
  texto: string;
  inicioFrame: number;
  finFrame: number;
  palabras?: PalabraTiempo[];
}

export interface SubtitulosProps {
  segmentos: SegmentoSubtitulo[];
  /** Posición vertical desde abajo en píxeles */
  margenInferior?: number;
  /** Tamaño de fuente */
  tamanoFuente?: number;
  /** Resaltar palabra activa con el color primario de marca */
  resaltarPalabraActiva?: boolean;
}

export const Subtitulos: React.FC<SubtitulosProps> = ({
  segmentos,
  margenInferior = 110,
  tamanoFuente = 48,
  resaltarPalabraActiva = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const segmentoActual = segmentos.find(
    (s) => frame >= s.inicioFrame && frame <= s.finFrame
  );

  if (!segmentoActual) {
    return null;
  }

  const entrada = spring({
    frame: frame - segmentoActual.inicioFrame,
    fps,
    config: { damping: 16, stiffness: 220, mass: 0.6 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: margenInferior,
        paddingLeft: 64,
        paddingRight: 64,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          transform: `translateY(${(1 - entrada) * 18}px) scale(${0.94 + entrada * 0.06})`,
          opacity: entrada,
          backgroundColor: "rgba(11, 15, 25, 0.78)",
          backdropFilter: "blur(8px)",
          borderRadius: 16,
          padding: "14px 28px",
          border: `1px solid ${MARCA.colores.borde}`,
          maxWidth: "85%",
          textAlign: "center",
          fontFamily: MARCA.tipografia.principal,
          fontSize: tamanoFuente,
          fontWeight: 800,
          lineHeight: 1.25,
          color: MARCA.colores.texto,
          textShadow: "0 2px 10px rgba(0,0,0,0.6)",
        }}
      >
        {resaltarPalabraActiva && segmentoActual.palabras?.length ? (
          <span>
            {segmentoActual.palabras.map((p, idx) => {
              const activa = frame >= p.inicioFrame && frame <= p.finFrame;
              return (
                <span
                  key={`${p.palabra}-${idx}`}
                  style={{
                    color: activa
                      ? MARCA.colores.acento
                      : MARCA.colores.texto,
                    transition: "color 60ms linear",
                  }}
                >
                  {p.palabra}
                  {idx < segmentoActual.palabras!.length - 1 ? " " : ""}
                </span>
              );
            })}
          </span>
        ) : (
          segmentoActual.texto
        )}
      </div>
    </AbsoluteFill>
  );
};
