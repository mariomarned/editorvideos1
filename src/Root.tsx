import React from "react";
import { Composition, Folder } from "remotion";
import { MARCA_NED } from "./marcas/ned";
import { Escena3DEjemplo } from "./composiciones/Escena3DEjemplo";
import { ShortEjemplo } from "./composiciones/ShortEjemplo";
import { VideoEjemplo } from "./composiciones/VideoEjemplo";
import { NedZencilloReel } from "./videos/ned/01-ned-zencillo/NedZencilloReel";
import { NpsReel } from "./videos/ned/02-nps/NpsReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="NED">
        <Composition
          id="NedZencilloReel"
          component={NedZencilloReel}
          durationInFrames={1535}
          fps={MARCA_NED.video.fps}
          width={MARCA_NED.video.vertical.width}
          height={MARCA_NED.video.vertical.height}
        />
        <Composition
          id="NedNpsReel"
          component={NpsReel}
          durationInFrames={1158}
          fps={MARCA_NED.video.fps}
          width={MARCA_NED.video.vertical.width}
          height={MARCA_NED.video.vertical.height}
          defaultProps={{
            tituloGancho: "NED tiene",
            llamadoAccion: "NED ES GRATUITA",
          }}
        />
      </Folder>

      <Folder name="Plantillas">
        <Composition
          id="ShortEjemplo"
          component={ShortEjemplo}
          durationInFrames={180}
          fps={MARCA_NED.video.fps}
          width={MARCA_NED.video.vertical.width}
          height={MARCA_NED.video.vertical.height}
        />
        <Composition
          id="VideoEjemplo"
          component={VideoEjemplo}
          durationInFrames={270}
          fps={MARCA_NED.video.fps}
          width={MARCA_NED.video.horizontal.width}
          height={MARCA_NED.video.horizontal.height}
        />
        <Composition
          id="CuadradoEjemplo"
          component={VideoEjemplo}
          durationInFrames={270}
          fps={MARCA_NED.video.fps}
          width={MARCA_NED.video.cuadrado.width}
          height={MARCA_NED.video.cuadrado.height}
        />
        <Composition
          id="Escena3DEjemplo"
          component={Escena3DEjemplo}
          durationInFrames={180}
          fps={MARCA_NED.video.fps}
          width={MARCA_NED.video.horizontal.width}
          height={MARCA_NED.video.horizontal.height}
        />
      </Folder>
    </>
  );
};
