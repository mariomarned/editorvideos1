import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MARCA } from "../marca";

export interface CierreProps {
  llamadoAccion?: string;
  mostrarHandle?: boolean;
}

export const Cierre: React.FC<CierreProps> = ({
  llamadoAccion = "Suscríbete y comparte",
  mostrarHandle = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progreso = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: MARCA.colores.fondo,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: MARCA.tipografia.titulos,
      }}
    >
      <div
        style={{
          opacity: progreso,
          transform: `scale(${0.9 + progreso * 0.1})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          textAlign: "center",
          padding: 48,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 24,
            background: `linear-gradient(135deg, ${MARCA.colores.primario}, ${MARCA.colores.secundario})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            fontWeight: 800,
            color: MARCA.colores.texto,
            boxShadow: "0 20px 50px rgba(99, 102, 241, 0.35)",
          }}
        >
          {MARCA.nombre.slice(0, 2).toUpperCase()}
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: MARCA.colores.texto,
            letterSpacing: "-0.02em",
          }}
        >
          {MARCA.nombre}
        </div>

        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            color: MARCA.colores.acento,
          }}
        >
          {llamadoAccion}
        </div>

        {mostrarHandle && (
          <div
            style={{
              marginTop: 8,
              padding: "10px 24px",
              borderRadius: 999,
              border: `1px solid ${MARCA.colores.borde}`,
              backgroundColor: MARCA.colores.fondoTarjeta,
              color: MARCA.colores.textoSecundario,
              fontSize: 24,
            }}
          >
            {MARCA.handle} · {MARCA.sitioWeb}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
