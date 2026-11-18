import React from "react";
import { Composition } from "remotion";
import { MARCA } from "./marca";
import { Escena3DEjemplo } from "./composiciones/Escena3DEjemplo";
import { ShortEjemplo } from "./composiciones/ShortEjemplo";
import { VideoEjemplo } from "./composiciones/VideoEjemplo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ShortEjemplo"
        component={ShortEjemplo}
        durationInFrames={180}
        fps={MARCA.video.fps}
        width={MARCA.video.vertical.width}
        height={MARCA.video.vertical.height}
      />
      <Composition
        id="VideoEjemplo"
        component={VideoEjemplo}
        durationInFrames={270}
        fps={MARCA.video.fps}
        width={MARCA.video.horizontal.width}
        height={MARCA.video.horizontal.height}
      />
      <Composition
        id="CuadradoEjemplo"
        component={VideoEjemplo}
        durationInFrames={270}
        fps={MARCA.video.fps}
        width={MARCA.video.cuadrado.width}
        height={MARCA.video.cuadrado.height}
      />
      <Composition
        id="Escena3DEjemplo"
        component={Escena3DEjemplo}
        durationInFrames={180}
        fps={MARCA.video.fps}
        width={MARCA.video.horizontal.width}
        height={MARCA.video.horizontal.height}
      />
    </>
  );
};
