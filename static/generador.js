// ===== Selección de opciones (radio-style) =====
function initGrupo(id) {
  const grupo = document.getElementById(id);
  if (!grupo) return;
  grupo.querySelectorAll(".btn-opcion").forEach(btn => {
    btn.addEventListener("click", () => {
      grupo.querySelectorAll(".btn-opcion").forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
    });
  });
}
["g-disciplina", "g-nivel", "g-duracion", "g-foco", "g-energia"].forEach(initGrupo);

document.querySelectorAll(".check-opcion").forEach(label => {
  label.addEventListener("click", () => {
    const cb = label.querySelector("input");
    cb.checked = !cb.checked;
    label.classList.toggle("activo", cb.checked);
  });
});

function getValor(grupoId) {
  const btn = document.querySelector(`#${grupoId} .btn-opcion.activo`);
  return btn ? btn.dataset.val : "";
}

function getEspeciales() {
  return Array.from(document.querySelectorAll("#g-especial input:checked")).map(cb => cb.value);
}

function escaparHTML(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const DISCIPLINA_LABELS = {
  yoga: "🧘 Yoga", pilates: "🤸 Pilates", funcional: "💪 Funcional", trx: "🔗 TRX", mixto: "🌀 Mixto"
};
const NIVEL_LABELS = {
  principiante: "🌱 Principiante", medio: "🌿 Medio", avanzado: "🌳 Avanzado", mixto: "🎯 Mixto"
};

const BLOQUE_ICONOS = {
  "llegada":      "🌿",
  "centrado":     "🌿",
  "calentamiento":"🔥",
  "principal":    "⚡",
  "calma":        "🌊",
  "respiracion":  "🌬️",
  "pranayama":    "🌬️",
  "savasana":     "✨",
  "relajacion":   "✨",
  "cierre":       "✨",
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

// ===== Renderizar sesión estructurada con SVG =====
function renderizarSesion(sesion) {
  const contenedor = document.getElementById("sesion-texto");
  if (!sesion || !sesion.bloques) {
    contenedor.innerHTML = `<p style="color:var(--rojo)">Error: la sesión no tiene el formato esperado.</p>`;
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
        const esPranayama = esResp || item.postura.toLowerCase().includes("pranayama")
          || item.postura.toLowerCase().includes("nadi") || item.postura.toLowerCase().includes("kapalabhati")
          || item.postura.toLowerCase().includes("ujjayi") || item.postura.toLowerCase().includes("bhramari")
          || item.postura.toLowerCase().includes("viloma");

        html += `<div class="postura-card${esPranayama ? " pranayama-card" : ""}">`;
        html += `<div class="postura-svg">${postura.svg}</div>`;
        html += `<div class="postura-nombre">${escaparHTML(item.postura)}</div>`;
        if (item.sanskrit) {
          html += `<div class="postura-sanskrit">${escaparHTML(item.sanskrit)}</div>`;
        }
        if (item.duracion) {
          html += `<div class="postura-duracion">⏱ ${escaparHTML(item.duracion)}</div>`;
        }
        if (item.cue) {
          html += `<div class="postura-cue">${escaparHTML(item.cue)}</div>`;
        }
        if (item.variacion) {
          html += `<div class="postura-variacion">↪ ${escaparHTML(item.variacion)}</div>`;
        }
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

// ===== Estado =====
let ultimaDatos   = null;
let ultimaSesion  = null;

// ===== Generar =====
document.getElementById("btn-generar").addEventListener("click", async () => {
  const datos = {
    disciplina: getValor("g-disciplina"),
    nivel:      getValor("g-nivel"),
    duracion:   parseInt(getValor("g-duracion")),
    foco:       getValor("g-foco"),
    energia:    getValor("g-energia"),
    especial:   getEspeciales(),
    contexto:   document.getElementById("contexto").value.trim(),
  };

  document.getElementById("resultado").classList.add("oculto");
  document.getElementById("estado-error").classList.add("oculto");
  document.getElementById("estado-carga").classList.remove("oculto");
  document.getElementById("btn-generar").disabled = true;
  document.getElementById("estado-carga").scrollIntoView({ behavior: "smooth", block: "nearest" });

  try {
    const resp = await fetch("/api/generar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    const data = await resp.json();
    document.getElementById("estado-carga").classList.add("oculto");

    if (!resp.ok) {
      document.getElementById("texto-error").textContent = data.error || "Error desconocido";
      document.getElementById("estado-error").classList.remove("oculto");
      return;
    }

    ultimaDatos  = datos;
    ultimaSesion = data.sesion;

    const tituloInput = document.getElementById("titulo-clase").value.trim();
    const tituloAuto  = `${DISCIPLINA_LABELS[datos.disciplina] || datos.disciplina} · ${NIVEL_LABELS[datos.nivel] || datos.nivel} · ${datos.duracion}min`;
    const titulo = tituloInput || tituloAuto;

    document.getElementById("res-titulo").textContent = titulo;

    const duracionTotal = data.sesion.bloques.reduce((s, b) => s + (b.duracion_min || 0), 0);
    const badges = document.getElementById("res-badges");
    badges.innerHTML = `
      <span class="badge badge-${datos.disciplina}">${DISCIPLINA_LABELS[datos.disciplina] || datos.disciplina}</span>
      <span class="badge badge-nivel">${NIVEL_LABELS[datos.nivel] || datos.nivel}</span>
      <span class="badge">⏱ ${duracionTotal} min</span>
      ${datos.foco ? `<span class="badge">${datos.foco}</span>` : ""}
      ${datos.especial.length ? `<span class="badge" style="background:#fff3e0;color:var(--naranja)">${datos.especial.join(", ")}</span>` : ""}
    `;

    renderizarSesion(data.sesion);
    document.getElementById("resultado").classList.remove("oculto");
    document.getElementById("resultado").scrollIntoView({ behavior: "smooth", block: "start" });

  } catch (err) {
    document.getElementById("estado-carga").classList.add("oculto");
    document.getElementById("texto-error").textContent = "No se pudo conectar con el servidor.";
    document.getElementById("estado-error").classList.remove("oculto");
  } finally {
    document.getElementById("btn-generar").disabled = false;
  }
});

// ===== Guardar =====
document.getElementById("btn-guardar").addEventListener("click", async function() {
  if (!ultimaSesion) return;

  const tituloInput = document.getElementById("titulo-clase").value.trim();
  const titulo = tituloInput || document.getElementById("res-titulo").textContent;

  const payload = {
    ...ultimaDatos,
    titulo,
    contenido: ultimaSesion,
  };

  this.disabled = true;
  this.textContent = "Guardando…";

  try {
    const resp = await fetch("/api/clases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (resp.ok) {
      this.textContent = "✓ Guardada";
      setTimeout(() => {
        this.textContent = "💾 Guardar";
        this.disabled = false;
      }, 2000);
    } else {
      this.textContent = "Error al guardar";
      this.disabled = false;
    }
  } catch {
    this.textContent = "Error al guardar";
    this.disabled = false;
  }
});
