// ============================================================
// APP.JS — Parfum Art
// Maneja: cambio de sección (Perfumería / Skincare), búsqueda,
// filtro por casa/categoría, chips de precio, orden alfabético
// y el render de las tarjetas de producto.
// ============================================================

// Quita tildes/diacríticos para que la búsqueda funcione sin importar si el
// usuario escribe "precieux" o "précieux", "limon" o "limón", etc.
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Rangos de precio por sección (los de skincare son más bajos que perfumería).
const RANGOS_PRECIO = {
  perfumeria: [
    { id: "all", label: "Todos los precios", min: 0, max: null },
    { id: "low", label: "Menos de Q400", min: 0, max: 399 },
    { id: "mid", label: "Q400 - Q500", min: 400, max: 500 },
    { id: "high", label: "Más de Q500", min: 501, max: null }
  ],
  skincare: [
    { id: "all", label: "Todos los precios", min: 0, max: null },
    { id: "low", label: "Menos de Q200", min: 0, max: 199 },
    { id: "mid", label: "Q200 - Q220", min: 200, max: 220 },
    { id: "high", label: "Más de Q220", min: 221, max: null }
  ]
};

// PERFUMES se llena de forma asíncrona (ver cargarPerfumes más abajo).
// Empieza vacío para que nada intente leerlo antes de tiempo.
let PERFUMES = [];

// Config por sección: de dónde saca los datos, cómo se llama el campo de
// agrupación (marca en ambas secciones) y textos de UI. "getDatos" es una
// función (no un arreglo fijo) porque PERFUMES se reemplaza después de la
// llamada a la API — así siempre lee el valor más reciente.
const SECCIONES = {
  perfumeria: {
    getDatos: () => PERFUMES,
    campoGrupo: "marca",
    etiquetaGrupo: "casa",
    labelSelectTodos: "Todas las casas",
    placeholderBusqueda: "Buscar por nombre, casa o nota de aroma (ej. nuez, vainilla)...",
    tituloGrid: "Fragancias Disponibles",
    subtituloGrid: "Haz clic en el botón de WhatsApp para pedir tu perfume favorito de inmediato."
  },
  skincare: {
    getDatos: () => SKINCARE,
    campoGrupo: "marca",
    etiquetaGrupo: "marca",
    labelSelectTodos: "Todas las marcas",
    placeholderBusqueda: "Buscar por nombre o marca (ej. sérum, SKIN1004, ETUDE)...",
    tituloGrid: "Skincare Coreano",
    subtituloGrid: "Una nueva línea de skincare coreano para el cuidado de tu piel."
  }
};

let seccionActiva = "perfumeria";
let rangoActivo = "all";

// ============================================================
// CARGA DE PERFUMES — API compartida (Google Sheet + Apps Script)
// ============================================================
// Rellena cualquier campo que falte con un valor por defecto seguro.
// Así, tanto si el producto viene de la API (formato nuevo, con oferta/
// agotado) como si viene del respaldo local (formato viejo, sin esos
// campos), el resto del código siempre puede confiar en que existen.
function normalizarProducto(p) {
  return {
    id: p.id,
    nombre: p.nombre,
    marca: p.marca,
    precio: p.precio,
    precioOriginal: p.precioOriginal ?? null,
    oferta: p.oferta === true,
    aroma: p.aroma || "",
    duracion: p.duracion || "",
    ml: p.ml || "",
    imagen: p.imagen,
    agotado: p.agotado === true
  };
}

async function cargarPerfumes() {
  if (CONFIG.urlProductosAPI) {
    try {
      const res = await fetch(CONFIG.urlProductosAPI);
      if (!res.ok) throw new Error("La API respondió con estado " + res.status);
      const datos = await res.json();
      if (!Array.isArray(datos) || datos.length === 0) throw new Error("La API devolvió una lista vacía");
      PERFUMES = datos.map(normalizarProducto);
      return;
    } catch (err) {
      console.warn("[Parfum Art] No se pudo cargar el catálogo en línea, usando respaldo local:", err);
      mostrarAvisoRespaldo();
    }
  }
  // Sin URL configurada todavía, o el fetch falló: usa la copia local
  // para que el sitio nunca se quede sin mostrar nada.
  PERFUMES = PERFUMES_RESPALDO.map(normalizarProducto);
}

function mostrarAvisoRespaldo() {
  const aviso = document.getElementById("apiFallbackNotice");
  if (aviso) aviso.classList.remove("hidden");
}

// Referencias DOM
const grid = document.getElementById("catalogGrid");
const emptyState = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const groupSelect = document.getElementById("groupSelect");
const priceChipsContainer = document.getElementById("priceChips");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const gridTitle = document.getElementById("gridTitle");
const gridSubtitle = document.getElementById("gridSubtitle");
const tabPerfumeria = document.getElementById("tabPerfumeria");
const tabSkincare = document.getElementById("tabSkincare");
const skincareNotice = document.getElementById("skincareNotice");

function populateGroupFilter() {
  const { campoGrupo, labelSelectTodos } = SECCIONES[seccionActiva];
  const datos = SECCIONES[seccionActiva].getDatos();
  const grupos = [...new Set(datos.map(p => p[campoGrupo]))].sort((a, b) => a.localeCompare(b, "es"));
  groupSelect.innerHTML = "";
  const optAll = document.createElement("option");
  optAll.value = "all";
  optAll.textContent = labelSelectTodos;
  groupSelect.appendChild(optAll);
  grupos.forEach(grupo => {
    const opt = document.createElement("option");
    opt.value = grupo;
    opt.textContent = grupo;
    groupSelect.appendChild(opt);
  });
}

function renderPriceChips() {
  priceChipsContainer.innerHTML = "";
  RANGOS_PRECIO[seccionActiva].forEach(rango => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.textContent = rango.label;
    chip.dataset.rango = rango.id;
    chip.className = estiloChip(rango.id === rangoActivo);
    chip.addEventListener("click", () => {
      rangoActivo = rango.id;
      renderPriceChips();
      renderCatalogo();
    });
    priceChipsContainer.appendChild(chip);
  });
}

function estiloChip(activo) {
  return activo
    ? "px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide bg-gradient-to-br from-acento-500 to-acento-600 text-white shadow-sm shadow-acento-500/30 transition-all"
    : "px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide bg-white border border-gris-300 text-gris-600 hover:border-acento-400 hover:text-acento-600 transition-all";
}

function getFilteredSorted() {
  const { campoGrupo } = SECCIONES[seccionActiva];
  const datos = SECCIONES[seccionActiva].getDatos();
  const q = normalizar(searchInput.value.trim());
  const grupoSeleccionado = groupSelect.value;
  const rango = RANGOS_PRECIO[seccionActiva].find(r => r.id === rangoActivo);

  let lista = datos.filter(p => {
    if (grupoSeleccionado !== "all" && p[campoGrupo] !== grupoSeleccionado) return false;
    if (rango.max !== null && p.precio > rango.max) return false;
    if (p.precio < rango.min) return false;
    if (!q) return true;
    const camposBusqueda = seccionActiva === "perfumeria"
      ? [p.nombre, p.marca, p.aroma]
      : [p.nombre, p.marca, p.descripcion];
    return camposBusqueda.some(campo => normalizar(campo).includes(q));
  });

  // Orden: ofertas primero (para que resalten), luego lo normal, y los
  // productos sin stock siempre al final — sin importar el filtro activo.
  // Dentro de cada grupo, orden alfabético para que sea fácil de escanear.
  function prioridad(p) {
    if (p.agotado) return 2;
    if (p.oferta) return 0;
    return 1;
  }
  lista = [...lista].sort((a, b) => {
    const diff = prioridad(a) - prioridad(b);
    if (diff !== 0) return diff;
    return a.nombre.localeCompare(b.nombre, "es");
  });
  return lista;
}

function buildCardPerfume(p, index) {
  const card = document.createElement("div");
  const agotado = p.agotado === true;
  const enOferta = p.oferta === true && !agotado;
  card.className = "card-enter group relative bg-white rounded-2xl border-2 overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between " +
    (agotado
      ? "border-gris-200"
      : enOferta
        ? "border-red-200 hover:border-red-400 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-1"
        : "border-gris-200 hover:border-acento-300 hover:shadow-xl hover:shadow-acento-500/10 hover:-translate-y-1");
  card.style.animationDelay = (index * 30) + "ms";

  const mensaje = `Hola Parfum Art, me interesa adquirir el perfume "${p.nombre}" con el precio de ${fmtQ(p.precio)}. ¿Tienen disponibilidad para coordinar la entrega?`;
  const url = whatsappLink(mensaje);

  // Bloque de precio: normal, en oferta (tachado + resaltado), o sin stock.
  let bloquePrecio;
  if (agotado) {
    bloquePrecio = `<span class="text-sm font-semibold text-gris-400 uppercase tracking-wide">Sin stock</span>`;
  } else if (p.oferta && p.precioOriginal) {
    bloquePrecio = `
      <span class="text-xs text-gris-400 line-through block">${fmtQ(p.precioOriginal)}</span>
      <span class="text-xl sm:text-2xl font-serif font-bold text-red-600">${fmtQ(p.precio)}</span>
    `;
  } else {
    bloquePrecio = `<span class="text-xl sm:text-2xl font-serif font-bold text-acento-600">${fmtQ(p.precio)}</span>`;
  }

  // Botón de pedido: deshabilitado y sin enlace si no hay stock.
  const botonPedir = agotado
    ? `<button type="button" disabled title="Sin stock por el momento"
         class="bg-gris-100 text-gris-400 font-bold px-4 py-3 rounded-lg text-xs flex items-center gap-1.5 uppercase tracking-wide shrink-0 min-h-[44px] cursor-not-allowed">
         <i class="fa-solid fa-ban text-sm"></i> Sin stock
       </button>`
    : `<a href="${url}" target="_blank" rel="noopener" data-pedir-id="${p.id}"
         class="bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold px-4 py-3 rounded-lg text-xs transition-all flex items-center gap-1.5 uppercase tracking-wide shrink-0 min-h-[44px] shadow-sm hover:shadow-md">
         <i class="fa-brands fa-whatsapp text-sm"></i> Pedir
       </a>`;

  card.innerHTML = `
    <div>
      <div class="absolute top-3 left-3 z-10 bg-gradient-to-br from-acento-500 to-acento-600 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white shadow-sm">
        ${p.marca}
      </div>
      ${p.oferta && !agotado ? `<div class="absolute top-3 right-3 z-10 bg-red-600 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white shadow-md shadow-red-600/40 animate-pulse">Oferta</div>` : ""}
      <div class="h-56 sm:h-64 bg-gris-50 relative flex items-center justify-center p-5 overflow-hidden border-b border-gris-200">
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" width="300" height="300"
             class="max-h-full max-w-full object-contain transition-transform duration-500 ${agotado ? "grayscale opacity-50" : "group-hover:scale-105"}"
             onerror="handleImageError(this)">
        ${agotado ? `<div class="absolute inset-0 flex items-center justify-center"><span class="bg-gris-900/85 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">Sin stock</span></div>` : ""}
      </div>
      <div class="p-5 sm:p-6 space-y-3">
        <h4 class="font-serif text-lg sm:text-xl font-bold text-gris-900 leading-snug">
          ${p.nombre}
        </h4>
        <div class="space-y-1.5 text-sm text-gris-600 font-light">
          <p><strong class="font-semibold text-gris-800">Aroma:</strong> <span>${p.aroma}</span></p>
          <p><strong class="font-semibold text-gris-800">Duración:</strong> <span>${p.duracion}</span></p>
          <p><strong class="font-semibold text-gris-800">Presentación:</strong> <span>${p.ml}</span></p>
        </div>
      </div>
    </div>
    <div class="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-gris-200 flex items-center justify-between gap-3">
      <div>
        <span class="text-xs text-gris-500 uppercase block tracking-wider">${agotado ? "Disponibilidad" : "Precio"}</span>
        ${bloquePrecio}
      </div>
      ${botonPedir}
    </div>
  `;

  const boton = card.querySelector(`[data-pedir-id="${p.id}"]`);
  if (boton) {
    boton.addEventListener("click", () => registrarClickPedido(p.nombre, p.marca, p.precio, "perfumeria"));
  }
  return card;
}

function buildCardSkincare(p, index) {
  const card = document.createElement("div");
  card.className = "card-enter group relative bg-white rounded-2xl border border-gris-200 overflow-hidden shadow-sm transition-all duration-300 hover:border-acento-300 hover:shadow-xl hover:shadow-acento-500/10 hover:-translate-y-1 flex flex-col justify-between";
  card.style.animationDelay = (index * 30) + "ms";

  const mensaje = `Hola Parfum Art, me interesa adquirir el producto de skincare "${p.nombre}" (${p.marca}) con el precio de ${fmtQ(p.precio)}. ¿Tienen disponibilidad para coordinar la entrega?`;
  const url = whatsappLink(mensaje);
  const filaContenido = p.tamano ? `<p><strong class="font-semibold text-gris-800">Contenido:</strong> <span>${p.tamano}</span></p>` : "";

  card.innerHTML = `
    <div>
      <div class="absolute top-3 left-3 z-10 bg-gradient-to-br from-acento-500 to-acento-600 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white shadow-sm">
        ${p.marca}
      </div>
      <div class="h-56 sm:h-64 bg-gradient-to-br from-gris-100 to-gris-50 relative flex flex-col items-center justify-center p-5 overflow-hidden border-b border-gris-200 gap-2">
        <i class="fa-solid ${p.icono} text-6xl sm:text-7xl text-acento-300"></i>
        <span class="text-[10px] uppercase tracking-widest text-gris-400 font-semibold">Foto próximamente</span>
      </div>
      <div class="p-5 sm:p-6 space-y-3">
        <h4 class="font-serif text-lg sm:text-xl font-bold text-gris-900 leading-snug">
          ${p.nombre}
        </h4>
        <div class="space-y-1.5 text-sm text-gris-600 font-light">
          <p>${p.descripcion}</p>
          ${filaContenido}
        </div>
      </div>
    </div>
    <div class="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-gris-200 flex items-center justify-between gap-3">
      <div>
        <span class="text-xs text-gris-500 uppercase block tracking-wider">Precio</span>
        <span class="text-xl sm:text-2xl font-serif font-bold text-acento-600">${fmtQ(p.precio)}</span>
      </div>
      <a href="${url}" target="_blank" rel="noopener" data-pedir-skincare="${p.id}"
         class="bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold px-4 py-3 rounded-lg text-xs transition-all flex items-center gap-1.5 uppercase tracking-wide shrink-0 min-h-[44px] shadow-sm hover:shadow-md">
        <i class="fa-brands fa-whatsapp text-sm"></i> Pedir
      </a>
    </div>
  `;

  const boton = card.querySelector(`[data-pedir-skincare="${p.id}"]`);
  if (boton) {
    boton.addEventListener("click", () => registrarClickPedido(p.nombre, p.marca, p.precio, "skincare"));
  }
  return card;
}

function renderCatalogo() {
  const catalogLoading = document.getElementById("catalogLoading");
  if (catalogLoading) catalogLoading.classList.add("hidden");

  const lista = getFilteredSorted();
  grid.innerHTML = "";

  if (lista.length === 0) {
    grid.classList.add("hidden");
    emptyState.classList.remove("hidden");
    emptyState.classList.add("flex");
  } else {
    grid.classList.remove("hidden");
    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");
    lista.forEach((p, i) => {
      const card = seccionActiva === "perfumeria" ? buildCardPerfume(p, i) : buildCardSkincare(p, i);
      grid.appendChild(card);
    });
  }

  const total = SECCIONES[seccionActiva].getDatos().length;
  const nombreItem = seccionActiva === "perfumeria" ? "fragancias" : "productos";
  resultsCount.textContent = lista.length === total
    ? `Mostrando los ${total} ${nombreItem} disponibles`
    : `Mostrando ${lista.length} de ${total} ${nombreItem}`;
}

function handleImageError(imageElement) {
  const parent = imageElement.parentElement;
  parent.className = "h-56 sm:h-64 bg-gris-50 relative flex items-center justify-center p-6 overflow-hidden border-b border-gris-200";
  parent.innerHTML = `
    <div class="text-center text-acento-400">
      <i class="fa-solid fa-droplet text-5xl mb-2 block"></i>
      <span class="text-xs uppercase tracking-wider text-gris-500">Parfum Art</span>
    </div>
  `;
}
window.handleImageError = handleImageError;

function actualizarUISeccion() {
  const cfg = SECCIONES[seccionActiva];
  searchInput.placeholder = cfg.placeholderBusqueda;
  gridTitle.textContent = cfg.tituloGrid;
  gridSubtitle.textContent = cfg.subtituloGrid;
  skincareNotice.classList.toggle("hidden", seccionActiva !== "skincare");

  const activo = "flex-1 py-3.5 px-4 rounded-xl text-sm sm:text-base font-bold uppercase tracking-wide transition-all bg-gradient-to-br from-acento-500 to-acento-600 text-white shadow-md shadow-acento-500/30";
  const inactivo = "flex-1 py-3.5 px-4 rounded-xl text-sm sm:text-base font-bold uppercase tracking-wide transition-all bg-transparent text-gris-500 hover:text-gris-900";
  tabPerfumeria.className = seccionActiva === "perfumeria" ? activo : inactivo;
  tabSkincare.className = seccionActiva === "skincare" ? activo : inactivo;
}

function cambiarSeccion(nuevaSeccion) {
  if (seccionActiva === nuevaSeccion) return;
  seccionActiva = nuevaSeccion;
  rangoActivo = "all";
  searchInput.value = "";
  actualizarUISeccion();
  populateGroupFilter();
  renderPriceChips();
  renderCatalogo();
  // Al cambiar de sección, sube el scroll hasta el inicio del catálogo
  // para que la persona no tenga que desplazarse manualmente.
  document.getElementById("catalogo").scrollIntoView({ behavior: "smooth", block: "start" });
}

// ============================================================
// CARRUSEL DE DESTACADOS
// Selección fija de IDs representativos de distintas casas, para
// mostrar variedad. Se puede cambiar esta lista en cualquier momento.
// ============================================================
const IDS_DESTACADOS = [65, 32, 9, 23, 25, 47];

function buildCarousel() {
  const track = document.getElementById("carouselTrack");
  const dotsContainer = document.getElementById("carouselDots");
  if (!track || !dotsContainer) return;

  const destacados = IDS_DESTACADOS
    .map(id => PERFUMES.find(p => p.id === id))
    .filter(p => p && !p.agotado);
  if (destacados.length === 0) return;

  destacados.forEach((p, i) => {
    const mensaje = `Hola Parfum Art, me interesa adquirir el perfume "${p.nombre}" con el precio de ${fmtQ(p.precio)}. ¿Tienen disponibilidad para coordinar la entrega?`;
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    slide.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="w-full h-full object-cover" loading="${i === 0 ? "eager" : "lazy"}">
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
        <span class="text-acento-300 text-xs uppercase tracking-widest font-semibold">${p.marca}</span>
        <h4 class="font-serif text-2xl sm:text-4xl font-bold text-white mt-1 leading-tight">${p.nombre}</h4>
        <p class="text-gris-300 text-sm mt-1.5 max-w-md hidden sm:block font-light">${p.aroma}</p>
        <div class="flex items-center gap-3 mt-4 sm:mt-5">
          ${p.oferta && p.precioOriginal ? `<span class="text-sm text-gris-400 line-through">${fmtQ(p.precioOriginal)}</span>` : ""}
          <span class="text-xl sm:text-2xl font-serif font-bold ${p.oferta && p.precioOriginal ? "text-red-500" : "text-white"}">${fmtQ(p.precio)}</span>
          ${p.oferta && !p.agotado ? `<span class="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full animate-pulse">Oferta</span>` : ""}
          <a href="${whatsappLink(mensaje)}" target="_blank" rel="noopener" data-carousel-pedir="${p.id}"
             class="bg-white text-gris-900 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-gris-100 transition-all min-h-[40px] flex items-center">
            Pedir
          </a>
        </div>
      </div>
    `;
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Ir a la imagen ${i + 1}`);
    dot.addEventListener("click", () => irASlide(i));
    dotsContainer.appendChild(dot);
  });

  destacados.forEach(p => {
    const boton = track.querySelector(`[data-carousel-pedir="${p.id}"]`);
    if (boton) boton.addEventListener("click", () => registrarClickPedido(p.nombre, p.marca, p.precio, "carrusel"));
  });

  const dots = () => Array.from(dotsContainer.querySelectorAll(".carousel-dot"));

  function irASlide(index) {
    const clamped = (index + destacados.length) % destacados.length;
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  }

  function actualizarDotActivo() {
    const index = Math.round(track.scrollLeft / track.clientWidth);
    dots().forEach((d, i) => d.classList.toggle("active", i === index));
    return index;
  }

  let indiceActual = 0;
  let autoplayTimer = null;

  function iniciarAutoplay() {
    detenerAutoplay();
    autoplayTimer = setInterval(() => {
      indiceActual = (indiceActual + 1) % destacados.length;
      irASlide(indiceActual);
    }, 5000);
  }
  function detenerAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }
  function pausarYReanudar() {
    detenerAutoplay();
    setTimeout(iniciarAutoplay, 8000);
  }

  track.addEventListener("scroll", () => {
    indiceActual = actualizarDotActivo();
  }, { passive: true });

  ["touchstart", "mousedown"].forEach(evt => {
    track.addEventListener(evt, pausarYReanudar, { passive: true });
  });

  document.getElementById("carouselPrev").addEventListener("click", () => {
    indiceActual = (indiceActual - 1 + destacados.length) % destacados.length;
    irASlide(indiceActual);
    pausarYReanudar();
  });
  document.getElementById("carouselNext").addEventListener("click", () => {
    indiceActual = (indiceActual + 1) % destacados.length;
    irASlide(indiceActual);
    pausarYReanudar();
  });

  iniciarAutoplay();
}

// Eventos
searchInput.addEventListener("input", renderCatalogo);
groupSelect.addEventListener("change", renderCatalogo);
clearSearchBtn.addEventListener("click", () => {
  searchInput.value = "";
  groupSelect.value = "all";
  rangoActivo = "all";
  renderPriceChips();
  renderCatalogo();
  searchInput.focus();
});
tabPerfumeria.addEventListener("click", () => cambiarSeccion("perfumeria"));
tabSkincare.addEventListener("click", () => cambiarSeccion("skincare"));

// Inicialización
async function iniciarApp() {
  await cargarPerfumes();
  actualizarUISeccion();
  populateGroupFilter();
  renderPriceChips();
  buildCarousel();
  renderCatalogo();
}
iniciarApp();
