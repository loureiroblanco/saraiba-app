function escaparHTML(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const BLOQUE_ICONOS = {
  "llegada": "🌿", "centrado": "🌿", "calentamiento": "🔥",
  "principal": "⚡", "calma": "🌊", "respiracion": "🌬️",
  "pranayama": "🌬️", "savasana": "✨", "relajacion": "✨", "cierre": "✨",
};

function iconoBloque(nombre) {
  const n = nombre.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  for (const [clave, icono] of Object.entries(BLOQUE_ICONOS)) {
    if (n.includes(clave)) return icono;
  }
  return "🧘";
}

function esBloqueRespiracion(nombre) {
  const n = nombre.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  return n.includes("respira") || n.includes("pranayama") || n.includes("prana");
}

function renderizarSesion(sesion) {
  const contenedor = document.getElementById("sesion-texto");
  if (!sesion || !sesion.bloques) {
    contenedor.innerHTML = `<p style="color:#c0392b">Formato de sesión no reconocido.</p>`;
    return;
  }

  let html = "";
  sesion.bloques.forEach(bloque => {
    const esResp = esBloqueRespiracion(bloque.nombre);
    const icono  = iconoBloque(bloque.nombre);

    html += `<div class="sesion-bloque${esResp ? " bloque-respiracion" : ""}">`;
    html += `<div class="sesion-bloque-header">
      <span style="font-size:1.3rem">${icono}</span>
      <span class="sesion-bloque-titulo">${escaparHTML(bloque.nombre)}</span>
      <span class="sesion-bloque-tiempo">⏱ ${bloque.duracion_min} min</span>
    </div>`;

    if (bloque.descripcion) {
      html += `<div class="sesion-bloque-desc">${escaparHTML(bloque.descripcion)}</div>`;
    }

    if (bloque.items && bloque.items.length > 0) {
      html += `<div class="posturas-grid">`;
      bloque.items.forEach(item => {
        const postura = buscarPostura(item.postura);
        const esPranayama = esResp || ["pranayama","nadi","kapalabhati","ujjayi","bhramari","viloma"]
          .some(p => item.postura.toLowerCase().includes(p));

        html += `<div class="postura-card${esPranayama ? " pranayama-card" : ""}">`;
        html += `<div class="postura-svg">${postura.svg}</div>`;
        html += `<div class="postura-nombre">${escaparHTML(item.postura)}</div>`;
        if (item.sanskrit) html += `<div class="postura-sanskrit">${escaparHTML(item.sanskrit)}</div>`;
        if (item.duracion) html += `<div class="postura-duracion">⏱ ${escaparHTML(item.duracion)}</div>`;
        if (item.cue)      html += `<div class="postura-cue">${escaparHTML(item.cue)}</div>`;
        if (item.variacion) html += `<div class="postura-variacion">↪ ${escaparHTML(item.variacion)}</div>`;
        html += `</div>`;
      });
      html += `</div>`;
    }
    html += `</div>`;
  });

  if (sesion.notas_profesor && sesion.notas_profesor.length > 0) {
    html += `<div class="notas-profesor">
      <div class="notas-profesor-titulo">📋 Notas del profesor</div>
      <ul>${sesion.notas_profesor.map(n => `<li>${escaparHTML(n)}</li>`).join("")}</ul>
    </div>`;
  }

  contenedor.innerHTML = html;
}

// Parsear contenido (puede ser JSON string o markdown legacy)
try {
  const sesion = typeof CONTENIDO === "string" ? JSON.parse(CONTENIDO) : CONTENIDO;
  renderizarSesion(sesion);
} catch {
  // Fallback: mostrar como texto plano si no es JSON válido
  document.getElementById("sesion-texto").innerHTML =
    `<pre style="white-space:pre-wrap;font-size:0.88rem">${escaparHTML(CONTENIDO)}</pre>`;
}

document.getElementById("btn-plantilla").addEventListener("click", async function() {
  const resp = await fetch(`/api/clases/${CLASE_ID}/plantilla`, { method: "POST" });
  const data = await resp.json();
  this.textContent = data.plantilla ? "⭐ Quitar de plantillas" : "☆ Marcar como plantilla";
});

document.getElementById("btn-borrar").addEventListener("click", async () => {
  if (!confirm(`¿Borrar la clase "${CLASE_TITULO}"? Esta acción no se puede deshacer.`)) return;
  const resp = await fetch(`/api/clases/${CLASE_ID}`, { method: "DELETE" });
  if (resp.ok) location.href = "/biblioteca";
});
