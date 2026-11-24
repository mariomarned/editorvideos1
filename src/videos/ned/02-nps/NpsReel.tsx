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
  FONDO_RADIAL_NED,
  MarcoSticker,
  OvaloDestacado,
  PildoraNed,
  TarjetaSticker,
} from "../componentes/DisenoNed";
import subtitulosData from "../../../../public/ned/subtitulos/nps/nps.json";

const SEGMENTOS = subtitulosData as SegmentoSubtitulo[];

export type NpsReelProps = {
  readonly tituloGancho: string;
  readonly llamadoAccion: string;
};

const ESTILO_ESCENA: React.CSSProperties = {
  paddingTop: MARCA.video.zonaSeguraVertical.arribaPx - 60,
  paddingBottom: MARCA.video.zonaSeguraVertical.abajoPx + 50,
  paddingLeft: 56,
  paddingRight: 56,
  justifyContent: "center",
  alignItems: "center",
};

const TituloSuperiorNed: React.FC<{
  lineaSuperior: string;
  pildora: string;
  subtitulo?: string;
  tamanoSuperior?: number;
  tamanoPildora?: number;
}> = ({
  lineaSuperior,
  pildora,
  subtitulo,
  tamanoSuperior = 54,
  tamanoPildora = 52,
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
        color: MARCA.colores.textoOscuro,
        textTransform: "uppercase",
        lineHeight: 1.05,
      }}
    >
      {lineaSuperior}
    </div>
    <PildoraNed texto={pildora} fontSize={tamanoPildora} />
    {subtitulo && (
      <div
        style={{
          fontFamily: MARCA.tipografia.titulos,
          fontSize: 34,
          fontWeight: 900,
          color: MARCA.colores.textoOscuro,
          textTransform: "uppercase",
          lineHeight: 1.15,
          marginTop: 6,
        }}
      >
        {subtitulo}
      </div>
    )}
  </div>
);

/** Escena 1 (0 - 64): "NED ahora tiene una nueva función." */
const Escena1NuevaFuncion: React.FC<{ titulo: string }> = ({ titulo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 160 },
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
          gap: 22,
          width: "100%",
        }}
      >
        <Img
          src={staticFile(MARCA.logos.principal)}
          style={{
            width: 370,
            height: 370,
            objectFit: "contain",
            filter: "drop-shadow(0 16px 30px rgba(196, 34, 125, 0.25))",
          }}
        />
        <TituloSuperiorNed
          lineaSuperior={titulo}
          pildora="nueva función"
          tamanoSuperior={58}
          tamanoPildora={54}
        />
      </div>
    </AbsoluteFill>
  );
};

/** Escena 2 (64 - 188): "Lanzamos NPS, el indicador por excelencia de Lealtad" + Imagen 1 */
const Escena2LanzamientoImagen1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  const zoom = interpolate(frame, [0, 124], [0.97, 1.02], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={ESTILO_ESCENA}>
      <div
        style={{
          opacity: entrada,
          scale: `${zoom}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          width: "100%",
        }}
      >
        <TituloSuperiorNed
          lineaSuperior="Lanzamos"
          pildora="NPS"
          subtitulo="El indicador por excelencia de Lealtad"
          tamanoSuperior={54}
          tamanoPildora={58}
        />

        <MarcoSticker sombraColor={MARCA.colores.primario}>
          <Img
            src={staticFile("ned/material/nps/imagen 1.png")}
            style={{
              width: "100%",
              maxHeight: 680,
              display: "block",
              borderRadius: 16,
              objectFit: "contain",
            }}
          />
        </MarcoSticker>
      </div>
    </AbsoluteFill>
  );
};

/** Escena 3 (206 - 396): Compra -> Notificación */
const Escena3NotificacionCompra: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logoIn = spring({ frame, fps, config: { damping: 14, stiffness: 160 } });

  return (
    <AbsoluteFill style={ESTILO_ESCENA}>
      <div
        style={{
          opacity: logoIn,
          scale: `${0.88 + logoIn * 0.12}`,
          marginBottom: 18,
        }}
      >
        <Img
          src={staticFile(MARCA.logos.icono)}
          style={{
            width: 220,
            height: 220,
            objectFit: "contain",
            filter: "drop-shadow(6px 10px 0 rgba(20, 17, 29, 0.22))",
          }}
        />
      </div>

      <div style={{ marginBottom: 28 }}>
        <TituloSuperiorNed
          lineaSuperior="Cuando registras"
          pildora="una compra"
          tamanoSuperior={52}
          tamanoPildora={54}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 22,
          width: "100%",
        }}
      >
        <TarjetaSticker
          icono="🛒"
          titulo="Registras la compra"
          detalle="Manual en NED o desde tu POS"
          retrasoFrames={10}
          acento={MARCA.colores.primario}
        />
        <TarjetaSticker
          icono="🔔"
          titulo="Tu cliente recibe aviso"
          detalle="¿Qué tan probable es que nos recomiendes?"
          retrasoFrames={64}
          acento={MARCA.colores.textoOscuro}
        />
      </div>
    </AbsoluteFill>
  );
};

/** Escena 4 (438 - 590): "Ned se cuida de no ser invasivo, espera 60 días..." + Imagen 2 */
const Escena4FrecuenciaImagen2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 145 },
  });

  const zoom = interpolate(frame, [0, 152], [0.97, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={ESTILO_ESCENA}>
      <div
        style={{
          opacity: entrada,
          scale: `${zoom}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 26,
          width: "100%",
        }}
      >
        <TituloSuperiorNed
          lineaSuperior="Cero invasivo"
          pildora="cada 60 días"
          subtitulo="Para no cansar a tus clientes"
          tamanoSuperior={54}
          tamanoPildora={52}
        />

        <MarcoSticker sombraColor={MARCA.colores.textoOscuro}>
          <Img
            src={staticFile("ned/material/nps/imagen 2.png")}
            style={{
              width: "100%",
              maxHeight: 620,
              display: "block",
              borderRadius: 16,
              objectFit: "contain",
            }}
          />
        </MarcoSticker>
      </div>
    </AbsoluteFill>
  );
};

/** Escena 5 (590 - 858): "También puedes contactar directamente..." + Imagen 3 */
const Escena5RecuperarImagen3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 145 },
  });

  return (
    <AbsoluteFill style={ESTILO_ESCENA}>
      <div
        style={{
          opacity: entrada,
          scale: `${0.95 + entrada * 0.05}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          width: "100%",
        }}
      >
        <TituloSuperiorNed
          lineaSuperior="Contacto directo"
          pildora="recupéralos"
          subtitulo="Atiende una mala experiencia a tiempo"
          tamanoSuperior={52}
          tamanoPildora={52}
        />

        <MarcoSticker sombraColor={MARCA.colores.primario}>
          <Img
            src={staticFile("ned/material/nps/imagen 3.png")}
            style={{
              width: "100%",
              maxHeight: 460,
              display: "block",
              borderRadius: 16,
              objectFit: "contain",
            }}
          />
        </MarcoSticker>

        <TarjetaSticker
          icono="📈"
          titulo="Más probabilidades de recuperarlos"
          detalle="Las estadísticas respaldan responder rápido"
          retrasoFrames={152}
          acento={MARCA.colores.textoOscuro}
        />
      </div>
    </AbsoluteFill>
  );
};

/** Escena 6 (858 - 962): "Puedes desactivar la opción desde el perfil de tu negocio." */
const Escena6ConfiguracionPerfil: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  const progresoToggle = interpolate(frame, [26, 52], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={ESTILO_ESCENA}>
      <div
        style={{
          opacity: entrada,
          scale: `${0.92 + entrada * 0.08}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          width: "100%",
        }}
      >
        <TituloSuperiorNed
          lineaSuperior="Desde tu perfil"
          pildora="tú decides"
          subtitulo="Activa o desactiva cuando quieras"
          tamanoSuperior={54}
          tamanoPildora={54}
        />

        <MarcoSticker sombraColor={MARCA.colores.primario} padding="34px 32px">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
            }}
          >
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: MARCA.tipografia.titulos,
                  fontSize: 38,
                  fontWeight: 900,
                  color: MARCA.colores.textoOscuro,
                }}
              >
                Encuesta NPS
              </div>
              <div
                style={{
                  fontFamily: MARCA.tipografia.principal,
                  fontSize: 26,
                  fontWeight: 700,
                  color: MARCA.colores.primario,
                  marginTop: 4,
                }}
              >
                Perfil de tu negocio
              </div>
            </div>

            <div
              style={{
                width: 124,
                height: 66,
                borderRadius: 999,
                padding: 5,
                border: `3px solid ${MARCA.colores.textoOscuro}`,
                backgroundColor:
                  progresoToggle > 0.5
                    ? MARCA.colores.textoSecundario
                    : MARCA.colores.primario,
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  border: `2.5px solid ${MARCA.colores.textoOscuro}`,
                  backgroundColor: MARCA.colores.fondoClaro,
                  translate: `${(1 - progresoToggle) * 56}px 0px`,
                }}
              />
            </div>
          </div>
        </MarcoSticker>
      </div>
    </AbsoluteFill>
  );
};

/** Escena 7 (962 - 1170): "Recuerda NED es gratuita, queremos que disfrutes el poder de la Lealtad." */
const Escena7CierreGratuita: React.FC<{ llamadoAccion: string }> = ({
  llamadoAccion,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrada = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });

  const selloIn = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 10, stiffness: 190 },
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
        <MarcoSticker sombraColor={MARCA.colores.primario} padding="36px 40px">
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
                width: 340,
                height: 290,
                objectFit: "contain",
              }}
            />
            <div
              style={{
                fontFamily: MARCA.tipografia.titulos,
                fontSize: 42,
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
          <OvaloDestacado texto={llamadoAccion} fontSize={48} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const NpsReel: React.FC<NpsReelProps> = ({
  tituloGancho,
  llamadoAccion,
}) => {
  return (
    <AbsoluteFill style={{ background: FONDO_RADIAL_NED }}>
      <DecoracionUrbanaMemphis />

      {/* Pista principal de narración */}
      <Audio src={staticFile("ned/audio/nps/danielanps.mp3")} volume={1} />

      {/* Música de fondo desde la escena 2 con fade-in y fade-out */}
      <Sequence from={64} durationInFrames={1094}>
        <Audio
          src={staticFile(
            "ned/audio/musicafondo/Follow Me - The Soundlings.mp3"
          )}
          volume={(f) =>
            interpolate(f, [0, 30, 1034, 1094], [0, 0.11, 0.11, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      {/* Efectos de sonido CC0 en transiciones clave */}
      <Sequence from={0} durationInFrames={30}>
        <Efecto audioSrc="audio/cc0/Deep_Whoosh_1.mp3" volumen={0.5} destello />
      </Sequence>
      <Sequence from={64} durationInFrames={25}>
        <Efecto audioSrc="audio/cc0/blip-plock-pop.mp3" volumen={0.45} />
      </Sequence>
      <Sequence from={206} durationInFrames={30}>
        <Efecto audioSrc="audio/cc0/Deep_Whoosh_1.mp3" volumen={0.4} />
      </Sequence>
      <Sequence from={396} durationInFrames={25}>
        <Efecto audioSrc="audio/cc0/blip-plock-pop.mp3" volumen={0.45} />
      </Sequence>
      <Sequence from={558} durationInFrames={30}>
        <Efecto audioSrc="audio/cc0/Deep_Whoosh_1.mp3" volumen={0.4} />
      </Sequence>
      <Sequence from={848} durationInFrames={25}>
        <Efecto audioSrc="audio/cc0/blip-plock-pop.mp3" volumen={0.45} />
      </Sequence>
      <Sequence from={948} durationInFrames={30}>
        <Efecto audioSrc="audio/cc0/Deep_Whoosh_1.mp3" volumen={0.45} destello />
      </Sequence>

      {/* Escenas sincronizadas con la narración */}
      <Sequence from={0} durationInFrames={64}>
        <Escena1NuevaFuncion titulo={tituloGancho} />
      </Sequence>
      <Sequence from={64} durationInFrames={142}>
        <Escena2LanzamientoImagen1 />
      </Sequence>
      <Sequence from={206} durationInFrames={190}>
        <Escena3NotificacionCompra />
      </Sequence>
      <Sequence from={396} durationInFrames={162}>
        <Escena4FrecuenciaImagen2 />
      </Sequence>
      <Sequence from={558} durationInFrames={290}>
        <Escena5RecuperarImagen3 />
      </Sequence>
      <Sequence from={848} durationInFrames={100}>
        <Escena6ConfiguracionPerfil />
      </Sequence>
      <Sequence from={948} durationInFrames={210}>
        <Escena7CierreGratuita llamadoAccion={llamadoAccion} />
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
