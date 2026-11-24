import React from "react";
import {
  AbsoluteFill,
  Img,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MARCA_NED as MARCA } from "../../../marcas/ned";

export const FONDO_RADIAL_NED =
  "radial-gradient(circle at 50% 42%, #FFFBE0 0%, #FFE700 68%, #F7DA00 100%)";

/**
 * Decoración SVG Corporate Memphis + vibra urbana + banda inferior oficial NED.
 */
export const DecoracionUrbanaMemphis: React.FC = () => {
  const frame = useCurrentFrame();
  const flotar1 = Math.sin(frame / 26) * 14;
  const flotar2 = Math.cos(frame / 32) * 16;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      {/* Blob Corporate Memphis magenta a la derecha */}
      <svg
        width="340"
        height="340"
        viewBox="0 0 200 200"
        style={{
          position: "absolute",
          top: 260 + flotar1,
          right: -130,
          opacity: 0.18,
        }}
      >
        <path
          d="M44.7,-64.2C58.8,-54.8,71.6,-42.9,78.1,-28.1C84.6,-13.3,84.8,4.4,78.7,20.2C72.6,36,60.2,49.9,45.5,60.4C30.8,70.9,13.9,78,-3.5,82.8C-20.9,87.6,-38.8,90.1,-53.3,81.4C-67.8,72.7,-78.9,52.8,-83.2,32.6C-87.5,12.4,-85,-8.1,-76.8,-25.9C-68.6,-43.7,-54.7,-58.8,-39.1,-67.6C-23.5,-76.4,-6.2,-78.9,8.7,-76.3C23.6,-73.7,30.6,-73.6,44.7,-64.2Z"
          transform="translate(100 100)"
          fill={MARCA.colores.primario}
        />
      </svg>

      {/* Zig-zag urbano negro arriba derecha */}
      <svg
        width="160"
        height="70"
        viewBox="0 0 160 70"
        style={{
          position: "absolute",
          top: 165,
          right: 60,
          transform: `translateY(${flotar2 * 0.5}px) rotate(-8deg)`,
          opacity: 0.75,
        }}
      >
        <polyline
          points="8,48 32,18 56,48 80,18 104,48 128,18 152,48"
          fill="none"
          stroke={MARCA.colores.textoOscuro}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Puntos / confeti geométrico urbano */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", inset: 0 }}
      >
        <circle
          cx="95"
          cy={540 + flotar2}
          r="14"
          fill="none"
          stroke={MARCA.colores.primario}
          strokeWidth="5"
        />
        <circle
          cx="975"
          cy={1180 + flotar1}
          r="16"
          fill={MARCA.colores.primario}
        />
        <rect
          x="74"
          y={1320 - flotar1}
          width="24"
          height="24"
          rx="4"
          fill="none"
          stroke={MARCA.colores.textoOscuro}
          strokeWidth="4.5"
          transform={`rotate(22 86 ${1332 - flotar1})`}
        />
      </svg>

      {/* Banda curva Magenta inferior fiel a la muestra NED con footerNED.png */}
      <svg
        width="1080"
        height="320"
        viewBox="0 0 1080 320"
        style={{ position: "absolute", bottom: 0, left: 0 }}
      >
        <path
          d="M0,70 Q540,-18 1080,60 L1080,320 L0,320 Z"
          fill={MARCA.colores.primario}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 28px",
        }}
      >
        <Img
          src={staticFile("ned/material/footerNED.png")}
          style={{
            width: "100%",
            maxHeight: 235,
            objectFit: "contain",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/** Rayitas de énfasis (burst lines) magenta como en la muestra NED */
export const RayitasEnfasis: React.FC<{ lado: "izq" | "der" }> = ({ lado }) => (
  <svg
    width="52"
    height="74"
    viewBox="0 0 52 74"
    style={{
      transform: lado === "izq" ? "scaleX(-1)" : undefined,
      flexShrink: 0,
    }}
  >
    <line
      x1="6"
      y1="20"
      x2="42"
      y2="10"
      stroke={MARCA.colores.primario}
      strokeWidth="7"
      strokeLinecap="round"
    />
    <line
      x1="8"
      y1="38"
      x2="48"
      y2="38"
      stroke={MARCA.colores.primario}
      strokeWidth="7"
      strokeLinecap="round"
    />
    <line
      x1="6"
      y1="56"
      x2="42"
      y2="66"
      stroke={MARCA.colores.primario}
      strokeWidth="7"
      strokeLinecap="round"
    />
  </svg>
);

/** Píldora Magenta inclinada con texto blanco y rayitas, estilo muestra NED */
export const PildoraNed: React.FC<{ texto: string; fontSize?: number }> = ({
  texto,
  fontSize = 60,
}) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 14,
      transform: "rotate(-2.2deg)",
      margin: "6px 0",
    }}
  >
    <RayitasEnfasis lado="izq" />
    <div
      style={{
        backgroundColor: MARCA.colores.primario,
        color: MARCA.colores.texto,
        fontFamily: MARCA.tipografia.titulos,
        fontSize,
        fontWeight: 900,
        padding: "14px 38px",
        borderRadius: 999,
        letterSpacing: "-0.01em",
        boxShadow: "0 10px 0 rgba(20, 17, 29, 0.16)",
        textTransform: "uppercase",
      }}
    >
      {texto}
    </div>
    <RayitasEnfasis lado="der" />
  </div>
);

/** Óvalo amarillo con borde fino negro y texto magenta subrayado, estilo "SIMPLE Y GRATIS" */
export const OvaloDestacado: React.FC<{ texto: string; fontSize?: number }> = ({
  texto,
  fontSize = 52,
}) => (
  <div
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#FFF35C",
      border: `3px solid ${MARCA.colores.textoOscuro}`,
      borderRadius: "50% / 44%",
      padding: "22px 58px 20px",
      transform: "rotate(-2.5deg)",
      boxShadow: "6px 8px 0 rgba(20, 17, 29, 0.85)",
    }}
  >
    <span
      style={{
        fontFamily: MARCA.tipografia.titulos,
        fontSize,
        fontWeight: 900,
        color: MARCA.colores.primario,
        letterSpacing: "0.01em",
      }}
    >
      {texto}
    </span>
    <div
      style={{
        width: "88%",
        height: 8,
        borderRadius: 999,
        backgroundColor: MARCA.colores.primario,
        marginTop: 6,
      }}
    />
  </div>
);

/** Tarjeta sticker blanca con borde oscuro y sombra dura desplazada */
export const TarjetaSticker: React.FC<{
  titulo: string;
  detalle: string;
  icono: string;
  retrasoFrames: number;
  acento?: string;
}> = ({
  titulo,
  detalle,
  icono,
  retrasoFrames,
  acento = MARCA.colores.primario,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progreso = spring({
    frame: Math.max(0, frame - retrasoFrames),
    fps,
    config: { damping: 14, stiffness: 180 },
  });

  return (
    <div
      style={{
        opacity: progreso,
        transform: `translateY(${(1 - progreso) * 28}px) scale(${0.94 + progreso * 0.06})`,
        display: "flex",
        alignItems: "center",
        gap: 22,
        backgroundColor: MARCA.colores.fondoClaro,
        border: `3px solid ${MARCA.colores.textoOscuro}`,
        borderRadius: 24,
        padding: "20px 28px",
        width: "100%",
        boxShadow: `8px 8px 0 ${acento}`,
      }}
    >
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: 18,
          backgroundColor: acento,
          border: `2.5px solid ${MARCA.colores.textoOscuro}`,
          color:
            acento === MARCA.colores.secundario
              ? MARCA.colores.textoOscuro
              : MARCA.colores.texto,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 34,
          flexShrink: 0,
          fontWeight: 900,
        }}
      >
        {icono}
      </div>
      <div style={{ textAlign: "left" }}>
        <div
          style={{
            fontFamily: MARCA.tipografia.titulos,
            fontSize: 36,
            fontWeight: 900,
            color: MARCA.colores.textoOscuro,
            lineHeight: 1.12,
          }}
        >
          {titulo}
        </div>
        <div
          style={{
            fontFamily: MARCA.tipografia.principal,
            fontSize: 25,
            fontWeight: 700,
            color: "#3F3A4D",
            marginTop: 4,
          }}
        >
          {detalle}
        </div>
      </div>
    </div>
  );
};

/** Marco sticker blanco con borde oscuro y sombra dura para capturas o bloques */
export const MarcoSticker: React.FC<{
  children: React.ReactNode;
  sombraColor?: string;
  padding?: string | number;
}> = ({ children, sombraColor = MARCA.colores.primario, padding = 16 }) => (
  <div
    style={{
      width: "100%",
      backgroundColor: MARCA.colores.fondoClaro,
      border: `3.5px solid ${MARCA.colores.textoOscuro}`,
      borderRadius: 30,
      padding,
      boxShadow: `10px 10px 0 ${sombraColor}`,
      overflow: "hidden",
    }}
  >
    {children}
  </div>
);
