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

// ===== Checkboxes especiales =====
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

// ===== Estado de la última generación (para guardar) =====
let ultimaDatos = null;
let ultimoContenido = null;

// ===== Renderizado Markdown =====
function renderizarMarkdown(texto) {
  return texto
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/^---+$/gm, "<hr>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/((?:^\d+\. .+\n?)+)/gm, bloque => {
      const items = bloque.trim().split("\n").map(l => `<li>${l.replace(/^\d+\. /, "")}</li>`).join("");
      return `<ol>${items}</ol>`;
    })
    .replace(/((?:^- .+\n?)+)/gm, bloque => {
      const items = bloque.trim().split("\n").map(l => `<li>${l.replace(/^- /, "")}</li>`).join("");
      return `<ul>${items}</ul>`;
    })
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br>");
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

    ultimaDatos    = datos;
    ultimoContenido = data.contenido;

    const tituloInput = document.getElementById("titulo-clase").value.trim();
    const tituloAuto  = `${DISCIPLINA_LABELS[datos.disciplina] || datos.disciplina} · ${NIVEL_LABELS[datos.nivel] || datos.nivel} · ${datos.duracion}min`;
    const titulo = tituloInput || tituloAuto;

    document.getElementById("res-titulo").textContent = titulo;

    const badges = document.getElementById("res-badges");
    badges.innerHTML = `
      <span class="badge badge-${datos.disciplina}">${DISCIPLINA_LABELS[datos.disciplina] || datos.disciplina}</span>
      <span class="badge badge-nivel">${NIVEL_LABELS[datos.nivel] || datos.nivel}</span>
      <span class="badge">⏱ ${datos.duracion} min</span>
      ${datos.foco ? `<span class="badge">${datos.foco}</span>` : ""}
      ${datos.especial.length ? `<span class="badge" style="background:#fff3e0;color:var(--naranja)">${datos.especial.join(", ")}</span>` : ""}
    `;

    document.getElementById("sesion-texto").innerHTML = renderizarMarkdown(data.contenido);
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
document.getElementById("btn-guardar").addEventListener("click", async () => {
  if (!ultimoContenido) return;

  const tituloInput = document.getElementById("titulo-clase").value.trim();
  const titulo = tituloInput || document.getElementById("res-titulo").textContent;

  const payload = {
    ...ultimaDatos,
    titulo,
    contenido: ultimoContenido,
    especial:  ultimaDatos.especial,
  };

  const btn = document.getElementById("btn-guardar");
  btn.disabled = true;
  btn.textContent = "Guardando…";

  try {
    const resp = await fetch("/api/clases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (resp.ok) {
      const clase = await resp.json();
      btn.textContent = "✓ Guardada";
      setTimeout(() => {
        btn.textContent = "💾 Guardar";
        btn.disabled = false;
      }, 2000);
    } else {
      btn.textContent = "Error al guardar";
      btn.disabled = false;
    }
  } catch {
    btn.textContent = "Error al guardar";
    btn.disabled = false;
  }
});
