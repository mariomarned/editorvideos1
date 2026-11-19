/**
 * Configuración central de marca y diseño para NED.
 * Regla: nunca usar colores escritos a mano fuera de este archivo.
 */
export const MARCA_NED = {
  nombre: "NED",
  descripcion:
    "Marketplace social enfocado en Lealtad. App móvil para negocios y consumidores con versión web para negocios.",
  eslogan: "Más clientes · Más ventas · Más juntos",
  sitioWeb: "www.ned.mobi",
  handle: "@ned",
  logos: {
    icono: "ned/logos/LogoNEDico.png",
    principal: "ned/logos/logoned5.png",
    alterno: "ned/logos/logoned8.png",
  },

  colores: {
    primario: "#C4227D", // Magenta (Pantone P 80-8 C · sRGB 196, 34, 125)
    secundario: "#FFE700", // Amarillo (Pantone P 1-8 C · sRGB 255, 231, 0)
    acento: "#FFE700",
    fondo: "#0E0C14",
    fondoClaro: "#FFFFFF",
    fondoTarjeta: "rgba(14, 12, 20, 0.88)",
    texto: "#FFFFFF",
    textoOscuro: "#14111D",
    textoSecundario: "#CBD5E1",
    borde: "rgba(255, 255, 255, 0.16)",
  },

  tipografia: {
    /** Para textos en general */
    principal: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif",
    /** Sólo para títulos */
    titulos: "'Alto Sans', 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "JetBrains Mono, Menlo, monospace",
  },

  video: {
    fps: 30,
    vertical: { width: 1080, height: 1920 }, // Formato principal (Reels / Shorts / TikTok)
    horizontal: { width: 1920, height: 1080 }, // YouTube y web
    cuadrado: { width: 1080, height: 1080 }, // Feed cuadrado
    margenSeguroHorizontal: 80,
    /** En vertical: nada importante en el 12 % de arriba (230 px) ni en el 20 % de abajo (384 px) */
    zonaSeguraVertical: {
      arribaPx: 230,
      abajoPx: 384,
      lateralPx: 64,
    },
  },
} as const;
