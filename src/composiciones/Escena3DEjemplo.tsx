import React from "react";
import { ThreeCanvas } from "@remotion/three";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { MARCA } from "../marca";
import { Etiqueta } from "../componentes/Etiqueta";

const CuboAnimado: React.FC = () => {
  const frame = useCurrentFrame();
  const rotacion = (frame / 60) * Math.PI;

  return (
    <mesh rotation={[rotacion * 0.6, rotacion, 0]}>
      <boxGeometry args={[2.2, 2.2, 2.2]} />
      <meshStandardMaterial
        color={MARCA.colores.primario}
        roughness={0.25}
        metalness={0.65}
      />
    </mesh>
  );
};

export const Escena3DEjemplo: React.FC = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: MARCA.colores.fondo }}>
      <ThreeCanvas width={width} height={height}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 5]} intensity={1.5} />
        <pointLight
          position={[-4, -3, 3]}
          intensity={1.2}
          color={MARCA.colores.secundario}
        />
        <CuboAnimado />
      </ThreeCanvas>

      <Etiqueta
        titulo="Escena 3D (@remotion/three)"
        subtitulo="Renderizado determinista cuadro a cuadro"
        posicion="abajo-izquierda"
      />
    </AbsoluteFill>
  );
};
