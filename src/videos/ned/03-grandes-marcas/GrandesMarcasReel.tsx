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
import { Efecto } from "../../../componentes/Efecto";
import { SegmentoSubtitulo, Subtitulos } from "../../../componentes/Subtitulos";
import { MARCA_NED as MARCA } from "../../../marcas/ned";
import {
  DecoracionUrbanaMemphis,
  FONDO_RADIAL_NED_MAGENTA,
  MarcoSticker,
  OvaloDestacado,
  PildoraNed,
  TarjetaSticker,
} from "../componentes/DisenoNed";
import subtitulosData from "../../../../public/ned/subtitulos/grandes-marcas/grandes-marcas.json";

const SEGMENTOS = subtitulosData as SegmentoSubtitulo[];

const DURACION_TOTAL_FRAMES = 1200;
const INICIO_VOZ_FRAMES = 30;

export type GrandesMarcasReelProps = {
  readonly tituloGancho: string;
  readonly llamadoAccion: string;
};

type EstiloAnimacionImagen =
  | "zoom"
  | "izquierda"
  | "derecha"
  | "rebote"
  | "arriba";

interface ConfigEscenaImagen {
  readonly id: string;
  readonly desde: number;
  readonly duracion: number;
  readonly lineaSuperior: string;
  readonly pildora: string;
  readonly subtitulo?: string;
  readonly rutaImagen: string;
  readonly animacion: EstiloAnimacionImagen;
  readonly audioSfx: string;
  readonly volumenSfx?: number;
  readonly maxHeightImagen?: number;
  readonly badgeExtra?: {
    readonly texto: string;
    readonly retrasoFrames: number;
  };
}

const ESCENAS_IMAGENES: readonly ConfigEscenaImagen[] = [
  {
    id: "imagen-1-puntos",
    desde: 224,
    duracion: 48,
    lineaSuperior: "Las grandes marcas crean",
    pildora: "planes de puntos",
    rutaImagen: "ned/material/grandes-marcas/imagen1.jpeg",
    animacion: "zoom",
    audioSfx: "audio/cc0/blip-plock-pop.mp3",
    volumenSfx: 0.5,
    maxHeightImagen: 680,
  },
  {
    id: "imagen-2-sorteos",
    desde: 272,
    duracion: 38,
    lineaSuperior: "También",
    pildora: "hacen sorteos",
    rutaImagen: "ned/material/grandes-marcas/imagen2.jpeg",
    animacion: "derecha",
    audioSfx: "audio/cc0/blip-plock-pop.mp3",
    volumenSfx: 0.5,
    maxHeightImagen: 680,
  },
  {
    id: "imagen-3-referidos",
    desde: 310,
    duracion: 54,
    lineaSuperior: "Dan incentivos",
    pildora: "por referidos",
    rutaImagen: "ned/material/grandes-marcas/imagen3.jpeg",
    animacion: "izquierda",
    audioSfx: "audio/cc0/blip-plock-pop.mp3",
    volumenSfx: 0.5,
    maxHeightImagen: 680,
  },
  {
    id: "imagen-4-cumpleanos",
    desde: 364,
    duracion: 130,
    lineaSuperior: "Felicitan y dan bonos",
    pildora: "en cumpleaños",
    rutaImagen: "ned/material/grandes-marcas/imagen4.jpg",
    animacion: "rebote",
    audioSfx: "audio/cc0/blip-plock-pop.mp3",
    volumenSfx: 0.5,
    maxHeightImagen: 620,
    badgeExtra: {
      texto: "¡Y muchas otras dinámicas!",
      retrasoFrames: 78,
    },
  },
  {
    id: "imagen-5-panel-dinamicas",
    desde: 494,
    duracion: 148,
    lineaSuperior: "En NED las creas",
    pildora: "en segundos",
    rutaImagen: "ned/material/grandes-marcas/Imagen5.png",
    animacion: "arriba",
    audioSfx: "audio/cc0/Deep_Whoosh_1.mp3",
    volumenSfx: 0.45,
    maxHeightImagen: 580,
    badgeExtra: {
      texto: "8 dinámicas activas y vienen más",
      retrasoFrames: 72,
    },
  },
  {
    id: "imagen-6-fiadas",
    desde: 734,
    duracion: 46,
    lineaSuperior: "Controla tus",
    pildora: "ventas fiadas",
    rutaImagen: "ned/material/grandes-marcas/Imagen6.png",
    animacion: "izquierda",
    audioSfx: "audio/cc0/blip-plock-pop.mp3",
    volumenSfx: 0.5,
    maxHeightImagen: 770,
  },
  {
    id: "imagen-7-citas",
    desde: 780,
    duracion: 39,
    lineaSuperior: "Organiza",
    pildora: "reserva de citas",
    rutaImagen: "ned/material/grandes-marcas/Imagen7.png",
    animacion: "derecha",
    audioSfx: "audio/cc0/blip-plock-pop.mp3",
    volumenSfx: 0.5,
    maxHeightImagen: 770,
  },
  {
    id: "imagen-8-nps",
    desde: 819,
    duracion: 28,
    lineaSuperior: "Mide la lealtad con",
    pildora: "NPS",
    rutaImagen: "ned/material/grandes-marcas/Imagen8.png",
    animacion: "rebote",
    audioSfx: "audio/cc0/blip-plock-pop.mp3",
    volumenSfx: 0.5,
    maxHeightImagen: 770,
  },
  {
    id: "imagen-9-catalogo",
    desde: 847,
    duracion: 51,
    lineaSuperior: "Muestra tus",
    pildora: "productos o servicios",
    rutaImagen: "ned/material/grandes-marcas/Imagen9.png",
    animacion: "zoom",
    audioSfx: "audio/cc0/blip-plock-pop.mp3",
    volumenSfx: 0.5,
    maxHeightImagen: 770,
  },
];

const ESTILO_ESCENA: React.CSSProperties = {
  paddingTop: MARCA.video.zonaSeguraVertical.arribaPx - 70,
  paddingBottom: MARCA.video.zonaSeguraVertical.abajoPx + 50,
  paddingLeft: 56,
  paddingRight: 56,
  justifyContent: "center",
  alignItems: "center",
};

const TituloSuperiorMagenta: React.FC<{
  lineaSuperior: string;
  pildora: string;
  subtitulo?: string;
  tamanoSuperior?: number;
  tamanoPildora?: number;
}> = ({
  lineaSuperior,
  pildora,
  subtitulo,
  tamanoSuperior = 48,
  tamanoPildora = 48,
}) => (
  <div
    style={{
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4,
    }}
  >
    <div
      style={{
        fontFamily: MARCA.tipografia.titulos,
        fontSize: tamanoSuperior,
        fontWeight: 900,
        color: MARCA.colores.texto,
        textTransform: "uppercase",
        lineHeight: 1.08,
        textShadow: "0 4px 0 rgba(20, 17, 29, 0.35)",
      }}
    >
      {lineaSuperior}
    </div>
    <PildoraNed texto={pildora} fontSize={tamanoPildora} variante="amarillo" />
    {subtitulo && (
      <div
        style={{
          fontFamily: MARCA.tipografia.titulos,
          fontSize: 32,
          fontWeight: 900,
          color: MARCA.colores.texto,
          textTransform: "uppercase",
          lineHeight: 1.15,
          marginTop: 4,
          textShadow: "0 3px 0 rgba(20, 17, 29, 0.3)",
        }}
      >
        {subtitulo}
      </div>
    )}
  </div>
);

const LogoCircularSticker: React.FC<{ size?: number }> = ({ size = 320 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: MARCA.colores.fondoClaro,
      border: `4px solid ${MARCA.colores.textoOscuro}`,
      boxShadow: `10px 10px 0 ${MARCA.colores.secundario}`,
      padding: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Img
      src={staticFile(MARCA.logos.principal)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  </div>
);

/** Escena 1A (0 - 114): "¿Tienes un negocio? NED es para ti." */
const Escena1NegocioGancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 170 },
  });

  return (
    <AbsoluteFill style={ESTILO_ESCENA}>
      <div
        style={{
          opacity: entrada,
          scale: `${0.88 + entrada * 0.12}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 28,
          width: "100%",
        }}
      >
        <LogoCircularSticker size={340} />
        <TituloSuperiorMagenta
          lineaSuperior="¿Tienes un negocio?"
          pildora="NED es para ti"
          tamanoSuperior={54}
          tamanoPildora={54}
        />
      </div>
    </AbsoluteFill>
  );
};

/** Escena 1B (114 - 224): "Si las grandes marcas lo hacen, tú también puedes con NED." */
const Escena1BGrandesMarcas: React.FC<{ tituloGancho: string }> = ({
  tituloGancho,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 165 },
  });
  const selloIn = spring({
    frame: Math.max(0, frame - 26),
    fps,
    config: { damping: 12, stiffness: 185 },
  });

  return (
    <AbsoluteFill style={ESTILO_ESCENA}>
      <div
        style={{
          opacity: entrada,
          scale: `${0.9 + entrada * 0.1}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 28,
          width: "100%",
        }}
      >
        <TituloSuperiorMagenta
          lineaSuperior={`Si las ${tituloGancho} lo hacen`}
          pildora="tú también puedes"
          tamanoSuperior={52}
          tamanoPildora={50}
        />

        <div
          style={{
            opacity: selloIn,
            transform: `scale(${0.86 + selloIn * 0.14})`,
            width: "100%",
          }}
        >
          <TarjetaSticker
            icono="⚡"
            titulo="Con el respaldo de NED"
            detalle="Estrategias reales de fidelización para tu negocio"
            retrasoFrames={20}
            acento={MARCA.colores.secundario}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Escena genérica con animación de entrada específica para cada una de las 9 imágenes */
const EscenaImagenAnimada: React.FC<{ config: ConfigEscenaImagen }> = ({
  config,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tituloIn = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 210 },
  });

  const imgIn = spring({
    frame: Math.max(0, frame - 2),
    fps,
    config:
      config.animacion === "rebote"
        ? { damping: 10, stiffness: 240, mass: 0.7 }
        : { damping: 15, stiffness: 220, mass: 0.8 },
  });

  const kenBurns = interpolate(frame, [0, config.duracion], [1, 1.035], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  let transformImagen = `scale(${kenBurns})`;
  if (config.animacion === "zoom") {
    transformImagen = `scale(${(0.76 + imgIn * 0.24) * kenBurns})`;
  } else if (config.animacion === "izquierda") {
    transformImagen = `translateX(${(1 - imgIn) * -180}px) rotate(${(1 - imgIn) * -3}deg) scale(${kenBurns})`;
  } else if (config.animacion === "derecha") {
    transformImagen = `translateX(${(1 - imgIn) * 180}px) rotate(${(1 - imgIn) * 3}deg) scale(${kenBurns})`;
  } else if (config.animacion === "rebote") {
    transformImagen = `scale(${(0.7 + imgIn * 0.3) * kenBurns}) rotate(${(1 - imgIn) * -2}deg)`;
  } else if (config.animacion === "arriba") {
    transformImagen = `translateY(${(1 - imgIn) * 140}px) scale(${(0.9 + imgIn * 0.1) * kenBurns})`;
  }

  return (
    <AbsoluteFill style={ESTILO_ESCENA}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          width: "100%",
        }}
      >
        <div
          style={{
            opacity: tituloIn,
            transform: `translateY(${(1 - tituloIn) * -20}px)`,
          }}
        >
          <TituloSuperiorMagenta
            lineaSuperior={config.lineaSuperior}
            pildora={config.pildora}
            subtitulo={config.subtitulo}
            tamanoSuperior={44}
            tamanoPildora={46}
          />
        </div>

        <div
          style={{
            opacity: imgIn,
            transform: transformImagen,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <MarcoSticker
            sombraColor={MARCA.colores.secundario}
            padding={14}
            width="fit-content"
          >
            <Img
              src={staticFile(config.rutaImagen)}
              style={{
                width: "auto",
                maxWidth: "100%",
                maxHeight: config.maxHeightImagen ?? 680,
                display: "block",
                borderRadius: 16,
                objectFit: "contain",
              }}
            />
          </MarcoSticker>
        </div>

        {config.badgeExtra && (
          <BadgeFlotante
            texto={config.badgeExtra.texto}
            retrasoFrames={config.badgeExtra.retrasoFrames}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};

const BadgeFlotante: React.FC<{ texto: string; retrasoFrames: number }> = ({
  texto,
  retrasoFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progreso = spring({
    frame: Math.max(0, frame - retrasoFrames),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  if (frame < retrasoFrames) {
    return null;
  }

  return (
    <div
      style={{
        opacity: progreso,
        transform: `translateY(${(1 - progreso) * 24}px) scale(${0.9 + progreso * 0.1})`,
        backgroundColor: MARCA.colores.secundario,
        color: MARCA.colores.textoOscuro,
        border: `3px solid ${MARCA.colores.textoOscuro}`,
        borderRadius: 999,
        padding: "14px 34px",
        fontFamily: MARCA.tipografia.titulos,
        fontSize: 32,
        fontWeight: 900,
        textTransform: "uppercase",
        boxShadow: `6px 6px 0 ${MARCA.colores.textoOscuro}`,
      }}
    >
      {texto}
    </div>
  );
};

/** Escena 7 (642 - 734): "Además de otras herramientas pensadas para tu negocio..." */
const EscenaHerramientasPuente: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 170 },
  });

  return (
    <AbsoluteFill style={ESTILO_ESCENA}>
      <div
        style={{
          opacity: entrada,
          scale: `${0.9 + entrada * 0.1}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 26,
          width: "100%",
        }}
      >
        <Img
          src={staticFile(MARCA.logos.icono)}
          style={{
            width: 240,
            height: 240,
            objectFit: "contain",
            filter: "drop-shadow(8px 10px 0 rgba(20, 17, 29, 0.35))",
          }}
        />
        <TituloSuperiorMagenta
          lineaSuperior="Además, herramientas"
          pildora="para tu negocio"
          subtitulo="Todo en una sola app"
          tamanoSuperior={50}
          tamanoPildora={50}
        />
      </div>
    </AbsoluteFill>
  );
};

/** Escena 12 (898 - 1008): "Puedes tener todo listo en segundos y ¡sin costo!" */
const EscenaListoSinCosto: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 170 },
  });
  const selloIn = spring({
    frame: Math.max(0, frame - 42),
    fps,
    config: { damping: 10, stiffness: 210 },
  });

  return (
    <AbsoluteFill style={ESTILO_ESCENA}>
      <div
        style={{
          opacity: entrada,
          scale: `${0.9 + entrada * 0.1}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 30,
          width: "100%",
        }}
      >
        <TituloSuperiorMagenta
          lineaSuperior="Ten todo listo"
          pildora="en segundos"
          tamanoSuperior={54}
          tamanoPildora={54}
        />

        <div
          style={{
            opacity: selloIn,
            transform: `scale(${0.75 + selloIn * 0.25})`,
          }}
        >
          <OvaloDestacado texto="¡SIN COSTO!" fontSize={58} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Escena 13 (1008 - 1200): "No esperes más, descarga la app y disfruta el poder de la Lealtad." */
const EscenaCierreDescarga: React.FC<{ llamadoAccion: string }> = ({
  llamadoAccion,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  const selloIn = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 10, stiffness: 195 },
  });

  return (
    <AbsoluteFill style={ESTILO_ESCENA}>
      <div
        style={{
          opacity: entrada,
          scale: `${0.9 + entrada * 0.1}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 24,
          width: "100%",
        }}
      >
        <MarcoSticker
          sombraColor={MARCA.colores.secundario}
          padding="32px 56px"
          width="fit-content"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <Img
              src={staticFile(MARCA.logos.principal)}
              style={{
                width: 320,
                height: 290,
                objectFit: "contain",
              }}
            />
            <div
              style={{
                fontFamily: MARCA.tipografia.titulos,
                fontSize: 40,
                fontWeight: 900,
                color: MARCA.colores.textoOscuro,
                textTransform: "uppercase",
                lineHeight: 1.12,
              }}
            >
              El poder de la Lealtad
            </div>
          </div>
        </MarcoSticker>

        <div style={{ scale: `${selloIn}`, opacity: selloIn }}>
          <OvaloDestacado texto={llamadoAccion} fontSize={46} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const GrandesMarcasReel: React.FC<GrandesMarcasReelProps> = ({
  tituloGancho,
  llamadoAccion,
}) => {
  return (
    <AbsoluteFill style={{ background: FONDO_RADIAL_NED_MAGENTA }}>
      <DecoracionUrbanaMemphis variante="magenta" />

      {/* Pista principal de narración (inicia en el frame 30 / 1.00 s) */}
      <Sequence from={INICIO_VOZ_FRAMES}>
        <Audio
          src={staticFile(
            "ned/audio/grandes-marcas/ElevenLabs_2026-11-24T15_50_13_Mrchepe_pvc_s50_sim75_v4.mp3"
          )}
          volume={1}
        />
      </Sequence>

      {/* Música de fondo con fade-in y fade-out */}
      <Sequence from={0} durationInFrames={DURACION_TOTAL_FRAMES}>
        <Audio
          src={staticFile(
            "ned/audio/musicafondo/Follow Me - The Soundlings.mp3"
          )}
          volume={(f) =>
            interpolate(
              f,
              [0, 25, DURACION_TOTAL_FRAMES - 60, DURACION_TOTAL_FRAMES],
              [0, 0.11, 0.11, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            )
          }
        />
      </Sequence>

      {/* Efectos de sonido en transiciones principales */}
      <Sequence from={0} durationInFrames={30}>
        <Efecto audioSrc="audio/cc0/Deep_Whoosh_1.mp3" volumen={0.5} destello />
      </Sequence>
      <Sequence from={114} durationInFrames={25}>
        <Efecto audioSrc="audio/cc0/blip-plock-pop.mp3" volumen={0.45} />
      </Sequence>
      <Sequence from={642} durationInFrames={30}>
        <Efecto audioSrc="audio/cc0/Deep_Whoosh_1.mp3" volumen={0.45} />
      </Sequence>
      <Sequence from={898} durationInFrames={30}>
        <Efecto audioSrc="audio/cc0/Deep_Whoosh_1.mp3" volumen={0.45} />
      </Sequence>
      <Sequence from={1008} durationInFrames={30}>
        <Efecto audioSrc="audio/cc0/Deep_Whoosh_1.mp3" volumen={0.5} destello />
      </Sequence>

      {/* Efecto de sonido individual para cada una de las 9 imágenes */}
      {ESCENAS_IMAGENES.map((item) => (
        <Sequence
          key={`sfx-${item.id}`}
          from={item.desde}
          durationInFrames={28}
        >
          <Efecto
            audioSrc={item.audioSfx}
            volumen={item.volumenSfx ?? 0.5}
          />
        </Sequence>
      ))}

      {/* Escenas de apertura */}
      <Sequence from={0} durationInFrames={114}>
        <Escena1NegocioGancho />
      </Sequence>
      <Sequence from={114} durationInFrames={110}>
        <Escena1BGrandesMarcas tituloGancho={tituloGancho} />
      </Sequence>

      {/* Escenas de las 9 imágenes con animación de entrada */}
      {ESCENAS_IMAGENES.map((item) => (
        <Sequence key={item.id} from={item.desde} durationInFrames={item.duracion}>
          <EscenaImagenAnimada config={item} />
        </Sequence>
      ))}

      {/* Puente de herramientas y cierre */}
      <Sequence from={642} durationInFrames={92}>
        <EscenaHerramientasPuente />
      </Sequence>
      <Sequence from={898} durationInFrames={110}>
        <EscenaListoSinCosto />
      </Sequence>
      <Sequence from={1008} durationInFrames={192}>
        <EscenaCierreDescarga llamadoAccion={llamadoAccion} />
      </Sequence>

      {/* Subtítulos en zona segura inferior sincronizados con la voz */}
      <Sequence from={INICIO_VOZ_FRAMES}>
        <Subtitulos
          segmentos={SEGMENTOS}
          margenInferior={MARCA.video.zonaSeguraVertical.abajoPx - 25}
          tamanoFuente={48}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
