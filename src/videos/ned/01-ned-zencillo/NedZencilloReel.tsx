import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MARCA_NED as MARCA } from "../../../marcas/ned";
import { Efecto } from "../../../componentes/Efecto";
import { SegmentoSubtitulo, Subtitulos } from "../../../componentes/Subtitulos";
import subtitulosData from "../../../../public/ned/subtitulos/zencillo/ned-zencillo.json";

const SEGMENTOS = subtitulosData as SegmentoSubtitulo[];

/**
 * Decoración SVG Corporate Memphis + vibra urbana (blobs, zigzags, rayitas de énfasis y stickers).
 */
const DecoracionUrbanaMemphis: React.FC = () => {
  const frame = useCurrentFrame();
  const flotar1 = Math.sin(frame / 26) * 14;
  const flotar2 = Math.cos(frame / 32) * 16;
  const rotar = interpolate(frame, [0, 1320], [0, 25]);

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
const RayitasEnfasis: React.FC<{ lado: "izq" | "der" }> = ({ lado }) => (
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
const PildoraNed: React.FC<{ texto: string; fontSize?: number }> = ({
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
const OvaloDestacado: React.FC<{ texto: string; fontSize?: number }> = ({
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

const TarjetaSticker: React.FC<{
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
      <div>
        <div
          style={{
            fontFamily: MARCA.tipografia.titulos,
            fontSize: 38,
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
            fontSize: 26,
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

const Escena1Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 14, stiffness: 160 } });

  return (
    <AbsoluteFill
      style={{
        paddingTop: MARCA.video.zonaSeguraVertical.arribaPx - 30,
        paddingBottom: MARCA.video.zonaSeguraVertical.abajoPx + 40,
        paddingLeft: 56,
        paddingRight: 56,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          opacity: entrada,
          transform: `scale(${0.9 + entrada * 0.1})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <Img
          src={staticFile("ned/logos/logoned5.png")}
          style={{
            width: 390,
            height: 390,
            objectFit: "contain",
            filter: "drop-shadow(0 16px 30px rgba(196, 34, 125, 0.25))",
          }}
        />
        <div
          style={{
            fontFamily: MARCA.tipografia.titulos,
            fontSize: 64,
            fontWeight: 900,
            color: MARCA.colores.textoOscuro,
            lineHeight: 1.08,
            textTransform: "uppercase",
          }}
        >
          Fidelizar clientes
        </div>
        <PildoraNed texto="ya no es solo" fontSize={56} />
        <div
          style={{
            fontFamily: MARCA.tipografia.titulos,
            fontSize: 60,
            fontWeight: 900,
            color: MARCA.colores.textoOscuro,
            lineHeight: 1.08,
            textTransform: "uppercase",
          }}
        >
          de grandes marcas
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Escena2Lealtad: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entradaTitulo = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const entradaMano = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 15, stiffness: 120 },
  });
  const flotar = Math.sin(frame / 18) * 8;

  return (
    <AbsoluteFill
      style={{
        paddingTop: MARCA.video.zonaSeguraVertical.arribaPx - 60,
        paddingBottom: MARCA.video.zonaSeguraVertical.abajoPx + 20,
        paddingLeft: 48,
        paddingRight: 48,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          opacity: entradaTitulo,
          transform: `translateY(${(1 - entradaTitulo) * 20}px)`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontFamily: MARCA.tipografia.titulos,
            fontSize: 54,
            fontWeight: 900,
            color: MARCA.colores.textoOscuro,
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          Dinámicas que
        </div>
        <PildoraNed texto="hacen volver" fontSize={54} />
      </div>

      <div
        style={{
          opacity: entradaMano,
          transform: `translateY(${(1 - entradaMano) * 90 + flotar}px) scale(${0.94 + entradaMano * 0.06})`,
          flex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Img
          src={staticFile("ned/material/manocelned.png")}
          style={{
            height: 980,
            maxWidth: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 24px 36px rgba(20, 17, 29, 0.25))",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

const Escena3Digitaliza: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({ frame, fps, config: { damping: 14, stiffness: 160 } });
  const selloGratis = spring({
    frame: Math.max(0, frame - 305),
    fps,
    config: { damping: 10, stiffness: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        paddingTop: MARCA.video.zonaSeguraVertical.arribaPx - 70,
        paddingBottom: MARCA.video.zonaSeguraVertical.abajoPx + 50,
        paddingLeft: 56,
        paddingRight: 56,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Logo superior NEDico bien visible */}
      <div
        style={{
          opacity: logoIn,
          transform: `scale(${0.85 + logoIn * 0.15})`,
          marginBottom: 16,
        }}
      >
        <Img
          src={staticFile("ned/logos/LogoNEDico.png")}
          style={{
            width: 240,
            height: 240,
            objectFit: "contain",
            filter: "drop-shadow(6px 10px 0 rgba(20, 17, 29, 0.22))",
          }}
        />
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: 26,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: MARCA.tipografia.titulos,
            fontSize: 54,
            fontWeight: 900,
            color: MARCA.colores.textoOscuro,
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          Digitaliza
        </div>
        <PildoraNed texto="tu negocio" fontSize={52} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          width: "100%",
        }}
      >
        <TarjetaSticker
          icono="🛍"
          titulo="Catálogo digital"
          detalle="Publica tus productos y servicios"
          retrasoFrames={25}
          acento={MARCA.colores.primario}
        />
        <TarjetaSticker
          icono="📝"
          titulo="Ventas fiadas"
          detalle="Control claro y ordenado"
          retrasoFrames={105}
          acento={MARCA.colores.textoOscuro}
        />
        <TarjetaSticker
          icono="📅"
          titulo="Reservas de citas"
          detalle="Agenda fácil desde la app"
          retrasoFrames={155}
          acento={MARCA.colores.primario}
        />
      </div>

      <div
        style={{
          marginTop: 28,
          transform: `scale(${selloGratis})`,
          opacity: selloGratis,
        }}
      >
        <OvaloDestacado texto="SIMPLE Y GRATIS" fontSize={48} />
      </div>
    </AbsoluteFill>
  );
};

const Escena4Zencillo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoIn = spring({
    frame: Math.max(0, frame - 90),
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  return (
    <AbsoluteFill
      style={{
        paddingTop: MARCA.video.zonaSeguraVertical.arribaPx - 60,
        paddingBottom: MARCA.video.zonaSeguraVertical.abajoPx + 50,
        paddingLeft: 56,
        paddingRight: 56,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Tarjeta blanca amplia para el logo Zencillo */}
      <div
        style={{
          opacity: logoIn,
          transform: `scale(${0.9 + logoIn * 0.1})`,
          backgroundColor: MARCA.colores.fondoClaro,
          border: `3.5px solid ${MARCA.colores.textoOscuro}`,
          borderRadius: 32,
          padding: "32px 44px",
          width: "100%",
          height: 410,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 24,
          boxShadow: `10px 10px 0 ${MARCA.colores.primario}`,
        }}
      >
        <Img
          src={staticFile("ned/logos/Logotipo_Zencillo.png")}
          style={{
            width: 390,
            height: 340,
            objectFit: "contain",
          }}
        />
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: 26,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: MARCA.tipografia.titulos,
            fontSize: 52,
            fontWeight: 900,
            color: MARCA.colores.textoOscuro,
            textTransform: "uppercase",
            lineHeight: 1.05,
          }}
        >
          Tu operación
        </div>
        <PildoraNed texto="conectada" fontSize={52} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          width: "100%",
        }}
      >
        {[
          { t: "Vender", d: "Desde tu móvil", r: 285 },
          { t: "Cobrar", d: "Rápido y seguro", r: 315 },
          { t: "Facturar", d: "Al instante", r: 345 },
          { t: "Conectar", d: "Todo tu negocio", r: 375 },
        ].map((item, idx) => (
          <div
            key={item.t}
            style={{
              opacity: spring({
                frame: Math.max(0, frame - item.r),
                fps,
                config: { damping: 14, stiffness: 180 },
              }),
              backgroundColor: MARCA.colores.fondoClaro,
              border: `3px solid ${MARCA.colores.textoOscuro}`,
              borderRadius: 22,
              padding: "22px 18px",
              textAlign: "center",
              boxShadow: `6px 6px 0 ${
                idx % 2 === 0
                  ? MARCA.colores.primario
                  : MARCA.colores.textoOscuro
              }`,
            }}
          >
            <div
              style={{
                fontFamily: MARCA.tipografia.titulos,
                fontSize: 40,
                fontWeight: 900,
                color: MARCA.colores.textoOscuro,
              }}
            >
              {item.t}
            </div>
            <div
              style={{
                fontFamily: MARCA.tipografia.principal,
                fontSize: 24,
                fontWeight: 700,
                color: "#3F3A4D",
                marginTop: 4,
              }}
            >
              {item.d}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Escena5Cierre: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({ frame, fps, config: { damping: 14, stiffness: 130 } });

  return (
    <AbsoluteFill
      style={{
        paddingTop: MARCA.video.zonaSeguraVertical.arribaPx - 60,
        paddingBottom: MARCA.video.zonaSeguraVertical.abajoPx + 30,
        paddingLeft: 56,
        paddingRight: 56,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        style={{
          opacity: entrada,
          transform: `scale(${0.9 + entrada * 0.1})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: MARCA.colores.fondoClaro,
            border: `4px solid ${MARCA.colores.textoOscuro}`,
            borderRadius: 36,
            padding: "28px 36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            width: "100%",
            boxShadow: `12px 12px 0 ${MARCA.colores.primario}`,
          }}
        >
          <Img
            src={staticFile("ned/logos/Logotipo_Zencillo.png")}
            style={{
              width: 460,
              height: 360,
              objectFit: "contain",
              transform: "scale(1.24)",
            }}
          />
          <div
            style={{
              fontFamily: MARCA.tipografia.titulos,
              fontSize: 56,
              fontWeight: 900,
              color: MARCA.colores.primario,
              lineHeight: 0.9,
            }}
          >
            ×
          </div>
          <Img
            src={staticFile("ned/logos/logoned5.png")}
            style={{
              width: 310,
              height: 310,
              objectFit: "contain",
              transform: "scale(1.12)",
            }}
          />
        </div>

        <OvaloDestacado texto="MÁS CLIENTES · MÁS VENTAS" fontSize={36} />
      </div>
    </AbsoluteFill>
  );
};

export const NedZencilloReel: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 42%, #FFFBE0 0%, #FFE700 68%, #F7DA00 100%)",
      }}
    >
      <DecoracionUrbanaMemphis />

      {/* Pista principal de narración */}
      <Audio src={staticFile("ned/audio/zencillo/ned-zencillo-voz.mp3")} volume={1} />

      {/* Música de fondo instrumental desde la segunda escena con fade-in y fade-out */}
      <Sequence from={148} durationInFrames={1387}>
        <Audio
          src={staticFile("ned/audio/musicafondo/Follow Me - The Soundlings.mp3")}
          volume={(f) =>
            interpolate(f, [0, 35, 1337, 1387], [0, 0.11, 0.11, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      {/* Efectos de sonido CC0 en transiciones clave */}
      <Sequence from={0} durationInFrames={35}>
        <Efecto audioSrc="audio/cc0/Deep_Whoosh_1.mp3" volumen={0.55} destello />
      </Sequence>
      <Sequence from={148} durationInFrames={25}>
        <Efecto audioSrc="audio/cc0/blip-plock-pop.mp3" volumen={0.45} />
      </Sequence>
      <Sequence from={473} durationInFrames={25}>
        <Efecto audioSrc="audio/cc0/Deep_Whoosh_1.mp3" volumen={0.4} />
      </Sequence>
      <Sequence from={778} durationInFrames={25}>
        <Efecto audioSrc="audio/cc0/blip-plock-pop.mp3" volumen={0.55} />
      </Sequence>
      <Sequence from={799} durationInFrames={30}>
        <Efecto audioSrc="audio/cc0/Deep_Whoosh_1.mp3" volumen={0.45} />
      </Sequence>
      <Sequence from={1357} durationInFrames={30}>
        <Efecto audioSrc="audio/cc0/Deep_Whoosh_1.mp3" volumen={0.45} destello />
      </Sequence>

      {/* Escenas sincronizadas con la voz */}
      <Sequence from={0} durationInFrames={148}>
        <Escena1Gancho />
      </Sequence>
      <Sequence from={148} durationInFrames={325}>
        <Escena2Lealtad />
      </Sequence>
      <Sequence from={473} durationInFrames={326}>
        <Escena3Digitaliza />
      </Sequence>
      <Sequence from={799} durationInFrames={558}>
        <Escena4Zencillo />
      </Sequence>
      <Sequence from={1357} durationInFrames={178}>
        <Escena5Cierre />
      </Sequence>

      {/* Subtítulos en zona segura inferior */}
      <Subtitulos
        segmentos={SEGMENTOS}
        margenInferior={MARCA.video.zonaSeguraVertical.abajoPx - 25}
        tamanoFuente={50}
      />
    </AbsoluteFill>
  );
};
