// ============================================================
// CONFIGURACIÓN DE LA MARCA — PARFUM ART
// Todo lo que cambia seguido (contacto, redes, mensajes) vive aquí,
// para no tener que buscar en medio del código cuando algo cambie.
// ============================================================
const CONFIG = {
  nombreMarca: "Parfum Art",

  // Número de WhatsApp en formato internacional sin signos (52 = Guatemala + número).
  whatsappNumero: "50241235208",
  whatsappMensajeGeneral: "Hola Parfum Art, me gustaría más información sobre sus productos.",
  whatsappMensajeAsesora: "Hola Parfum Art, me interesa conocer la disponibilidad de productos.",

  redes: {
    instagram: "https://www.instagram.com/parfumartgt?igsh=dnh2NG03aW44ejhr",
    tiktok: "https://www.tiktok.com/@parfum.artgt?_r=1&_t=ZS-97wlcbRbOyt",
    facebook: "https://www.facebook.com/share/17zLxiZtcX/"
  },

  // ============================================================
  // REGISTRO DE CLICKS EN "PEDIR" → Google Sheet (Apps Script)
  // ============================================================
  // Esta es una hoja de cálculo NUEVA, separada por completo de la de
  // Anita Perfumería. Mientras esta URL esté vacía, el catálogo funciona
  // igual de bien: simplemente no se registra nada, no rompe ni bloquea
  // ningún botón. Instrucciones para crearla están en el mensaje del chat.
  urlRegistroClicks: ""
};

function fmtQ(n) {
  return "Q" + n.toLocaleString("es-GT");
}

function whatsappLink(mensaje) {
  return `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(mensaje)}`;
}

function registrarClickPedido(nombre, marca, precio, seccion) {
  if (!CONFIG.urlRegistroClicks) return; // Aún no configurado: no hace nada.
  const datos = JSON.stringify({ nombre, marca, precio, seccion });
  try {
    if (navigator.sendBeacon) {
      // sendBeacon está hecho justo para esto: mandar datos justo antes de
      // que el navegador abra otra pestaña, sin bloquear ni depender de
      // que la página siga abierta.
      const blob = new Blob([datos], { type: "text/plain;charset=UTF-8" });
      navigator.sendBeacon(CONFIG.urlRegistroClicks, blob);
    } else {
      fetch(CONFIG.urlRegistroClicks, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: datos
      });
    }
  } catch (e) {
    // Si falla el registro, no debe afectar la experiencia de compra.
  }
}
