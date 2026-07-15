// ============================================================
// Catálogo de Skincare — Parfum Art
// Línea de skincare coreano. Productos reales confirmados por la marca.
// Las fotos oficiales están pendientes de agregar: mientras tanto se
// muestra un ícono de referencia, pero el pedido por WhatsApp ya
// funciona con normalidad porque los productos y precios son reales.
// Para agregar la foto real de un producto, solo reemplaza su campo
// "imagen" (ej. "images/skincare/1.jpg") una vez tengas el archivo.
// ============================================================
const SKINCARE = [
  {
    id: 1,
    nombre: "Centella Light Cleansing Oil",
    marca: "SKIN1004",
    precio: 220,
    descripcion: "Aceite limpiador facial con extracto de centella asiática. Disuelve maquillaje e impurezas sin resecar la piel.",
    tamano: "200 ml",
    icono: "fa-droplet",
    imagen: null
  },
  {
    id: 2,
    nombre: "Ampoule Foam",
    marca: "SKIN1004",
    precio: 195,
    descripcion: "Limpiador en espuma enriquecido con ampolleta de centella, para una limpieza suave y calmante.",
    tamano: "125 ml",
    icono: "fa-pump-soap",
    imagen: null
  },
  {
    id: 3,
    nombre: "Poremizing Clear Toner",
    marca: "SKIN1004",
    precio: 215,
    descripcion: "Tónico clarificante que minimiza la apariencia de los poros y equilibra la piel.",
    tamano: "210 ml",
    icono: "fa-flask",
    imagen: null
  },
  {
    id: 4,
    nombre: "Poremizing Light Gel Cream",
    marca: "SKIN1004",
    precio: 215,
    descripcion: "Crema en gel ligera que hidrata sin obstruir los poros, ideal para piel mixta a grasa.",
    tamano: "75 ml",
    icono: "fa-spa",
    imagen: null
  },
  {
    id: 5,
    nombre: "Niacinamide 10% Boosting Shot",
    marca: "SKIN1004",
    precio: 215,
    descripcion: "Sérum concentrado con 10% de niacinamida para unificar el tono y controlar el brillo.",
    tamano: "30 ml",
    icono: "fa-syringe",
    imagen: null
  },
  {
    id: 6,
    nombre: "Hyalu-Cica Sun Serum",
    marca: "SKIN1004",
    precio: 295,
    descripcion: "Protector solar en sérum con ácido hialurónico y centella. Hidrata mientras protege del sol.",
    tamano: "100 ml",
    icono: "fa-sun",
    imagen: null
  },
  {
    id: 7,
    nombre: "Soon Jung Relief Toner",
    marca: "ETUDE",
    precio: 185,
    descripcion: "Tónico calmante de la línea Soon Jung, formulado para pieles sensibles.",
    tamano: "200 ml",
    icono: "fa-flask",
    imagen: null
  },
  {
    id: 8,
    nombre: "Soonjung 2x Barrier Cream",
    marca: "ETUDE",
    precio: 200,
    descripcion: "Crema que refuerza la barrera cutánea y calma el enrojecimiento.",
    tamano: "60 ml",
    icono: "fa-shield-halved",
    imagen: null
  },
  {
    id: 9,
    nombre: "Sunprise Mild Airy Finish Sun Milk",
    marca: "ETUDE",
    precio: 205,
    descripcion: "Protector solar de acabado ligero y natural, no deja rastro blanco.",
    tamano: null,
    icono: "fa-sun",
    imagen: null
  },
  {
    id: 10,
    nombre: "Líquido Ácido Salicílico 2%",
    marca: "COS DE BAHA",
    precio: 200,
    descripcion: "Exfoliante químico para piel con tendencia acneica y poros obstruidos.",
    tamano: null,
    icono: "fa-vial",
    imagen: null
  },
  {
    id: 11,
    nombre: "Suero Ácido Azelaico 10%",
    marca: "COS DE BAHA",
    precio: 200,
    descripcion: "Sérum que ayuda a unificar el tono de la piel y calmar imperfecciones.",
    tamano: null,
    icono: "fa-vial",
    imagen: null
  },
  {
    id: 12,
    nombre: "Suero de Retinol 2.5%",
    marca: "COS DE BAHA",
    precio: 215,
    descripcion: "Sérum de retinol para tratamiento anti-edad y renovación celular nocturna.",
    tamano: null,
    icono: "fa-moon",
    imagen: null
  }
];
