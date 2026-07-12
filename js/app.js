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
    { id: "low", label: "Menos de Q120", min: 0, max: 119 },
    { id: "mid", label: "Q120 - Q160", min: 120, max: 160 },
    { id: "high", label: "Más de Q160", min: 161, max: null }
  ]
};

// Config por sección: de dónde saca los datos, cómo se llama el campo de
// agrupación (marca en perfumería, categoría en skincare) y textos de UI.
const SECCIONES = {
  perfumeria: {
    datos: PERFUMES,
    campoGrupo: "marca",
    etiquetaGrupo: "casa",
    labelSelectTodos: "Todas las casas",
    placeholderBusqueda: "Buscar por nombre, casa o nota de aroma (ej. nuez, vainilla)...",
    tituloGrid: "Fragancias Disponibles",
    subtituloGrid: "Haz clic en el botón de WhatsApp para pedir tu perfume favorito de inmediato."
  },
  skincare: {
    datos: SKINCARE,
    campoGrupo: "categoria",
    etiquetaGrupo: "tipo",
    labelSelectTodos: "Todos los tipos",
    placeholderBusqueda: "Buscar por nombre o tipo de producto (ej. sérum, limpiador)...",
    tituloGrid: "Skincare — Próximamente",
    subtituloGrid: "Estos productos son una muestra de estilo. Muy pronto tendremos el catálogo completo con fotos y disponibilidad real."
  }
};

let seccionActiva = "perfumeria";
let rangoActivo = "all";

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
  const { datos, campoGrupo, labelSelectTodos } = SECCIONES[seccionActiva];
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
    ? "px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide bg-gris-900 text-white transition-all"
    : "px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide bg-white border border-gris-300 text-gris-600 hover:border-gris-500 transition-all";
}

function getFilteredSorted() {
  const { datos, campoGrupo } = SECCIONES[seccionActiva];
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
      : [p.nombre, p.categoria, p.descripcion];
    return camposBusqueda.some(campo => normalizar(campo).includes(q));
  });

  // Orden alfabético por nombre: mucho más fácil de escanear que el
  // orden en que se fueron agregando los productos al catálogo.
  lista = [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  return lista;
}

function buildCardPerfume(p, index) {
  const card = document.createElement("div");
  card.className = "card-enter group relative bg-white rounded-xl border border-gris-200 overflow-hidden shadow-sm transition-all duration-300 hover:border-gris-400 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between";
  card.style.animationDelay = (index * 30) + "ms";

  const mensaje = `Hola Parfum Art, me interesa adquirir el perfume "${p.nombre}" con el precio de ${fmtQ(p.precio)}. ¿Tienen disponibilidad para coordinar la entrega?`;
  const url = whatsappLink(mensaje);

  card.innerHTML = `
    <div>
      <div class="absolute top-3 left-3 z-10 bg-gris-900/90 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white">
        ${p.marca}
      </div>
      <div class="h-56 sm:h-64 bg-gris-100 relative flex items-center justify-center p-5 overflow-hidden border-b border-gris-200">
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" width="300" height="300"
             class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
             onerror="handleImageError(this)">
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
        <span class="text-xs text-gris-500 uppercase block tracking-wider">Precio</span>
        <span class="text-xl sm:text-2xl font-serif font-bold text-gris-900">${fmtQ(p.precio)}</span>
      </div>
      <a href="${url}" target="_blank" rel="noopener" data-pedir-id="${p.id}"
         class="bg-[#25D366] hover:bg-[#1EBE57] text-white font-bold px-4 py-3 rounded-lg text-xs transition-all flex items-center gap-1.5 uppercase tracking-wide shrink-0 min-h-[44px]">
        <i class="fa-brands fa-whatsapp text-sm"></i> Pedir
      </a>
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
  card.className = "card-enter group relative bg-white rounded-xl border border-dashed border-gris-300 overflow-hidden shadow-sm transition-all duration-300 hover:border-gris-500 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between";
  card.style.animationDelay = (index * 30) + "ms";

  card.innerHTML = `
    <div>
      <div class="absolute top-3 left-3 z-10 bg-gris-900/90 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white">
        ${p.categoria}
      </div>
      <div class="absolute top-3 right-3 z-10 bg-white border border-gris-400 text-gris-700 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
        Muestra
      </div>
      <div class="h-56 sm:h-64 bg-gradient-to-br from-gris-200 to-gris-100 relative flex items-center justify-center p-5 overflow-hidden border-b border-gris-200">
        <i class="fa-solid ${p.icono} text-6xl sm:text-7xl text-gris-400"></i>
      </div>
      <div class="p-5 sm:p-6 space-y-3">
        <h4 class="font-serif text-lg sm:text-xl font-bold text-gris-900 leading-snug">
          ${p.nombre}
        </h4>
        <div class="space-y-1.5 text-sm text-gris-600 font-light">
          <p>${p.descripcion}</p>
          <p><strong class="font-semibold text-gris-800">Contenido:</strong> <span>${p.tamano}</span></p>
        </div>
      </div>
    </div>
    <div class="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-gris-200 flex items-center justify-between gap-3">
      <div>
        <span class="text-xs text-gris-500 uppercase block tracking-wider">Precio referencial</span>
        <span class="text-xl sm:text-2xl font-serif font-bold text-gris-900">${fmtQ(p.precio)}</span>
      </div>
      <button type="button" disabled title="Producto de muestra — próximamente disponible"
         class="bg-gris-100 text-gris-400 font-bold px-4 py-3 rounded-lg text-xs flex items-center gap-1.5 uppercase tracking-wide shrink-0 min-h-[44px] cursor-not-allowed">
        <i class="fa-solid fa-clock text-sm"></i> Próximamente
      </button>
    </div>
  `;
  return card;
}

function renderCatalogo() {
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

  const total = SECCIONES[seccionActiva].datos.length;
  const nombreItem = seccionActiva === "perfumeria" ? "fragancias" : "productos";
  resultsCount.textContent = lista.length === total
    ? `Mostrando los ${total} ${nombreItem} disponibles`
    : `Mostrando ${lista.length} de ${total} ${nombreItem}`;
}

function handleImageError(imageElement) {
  const parent = imageElement.parentElement;
  parent.className = "h-56 sm:h-64 bg-gris-100 relative flex items-center justify-center p-6 overflow-hidden border-b border-gris-200";
  parent.innerHTML = `
    <div class="text-center text-gris-400">
      <i class="fa-solid fa-droplet text-5xl mb-2 block"></i>
      <span class="text-xs uppercase tracking-wider">Parfum Art</span>
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

  const activo = "flex-1 py-3.5 px-4 rounded-lg text-sm sm:text-base font-bold uppercase tracking-wide transition-all bg-gris-900 text-white shadow-md";
  const inactivo = "flex-1 py-3.5 px-4 rounded-lg text-sm sm:text-base font-bold uppercase tracking-wide transition-all bg-transparent text-gris-500 hover:text-gris-900";
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
actualizarUISeccion();
populateGroupFilter();
renderPriceChips();
window.onload = renderCatalogo;
