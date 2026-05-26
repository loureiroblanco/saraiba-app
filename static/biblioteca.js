let filtroDisciplina = "";
let filtroNivel      = "";
let soloPlantillas   = false;

const DISCIPLINA_LABELS = {
  yoga: "🧘 Yoga", pilates: "🤸 Pilates", funcional: "💪 Funcional", trx: "🔗 TRX", mixto: "🌀 Mixto"
};
const NIVEL_LABELS = {
  principiante: "🌱 Principiante", medio: "🌿 Medio", avanzado: "🌳 Avanzado", mixto: "🎯 Mixto"
};

function escaparHTML(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function initFiltro(grupoId, cb) {
  const grupo = document.getElementById(grupoId);
  if (!grupo) return;
  grupo.querySelectorAll(".btn-opcion").forEach(btn => {
    btn.addEventListener("click", () => {
      grupo.querySelectorAll(".btn-opcion").forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
      cb(btn.dataset.val);
    });
  });
}

initFiltro("filtro-disciplina", v => { filtroDisciplina = v; cargar(); });
initFiltro("filtro-nivel",      v => { filtroNivel = v;      cargar(); });

document.getElementById("solo-plantillas").addEventListener("change", e => {
  soloPlantillas = e.target.checked;
  cargar();
});

async function cargar() {
  const params = new URLSearchParams();
  if (filtroDisciplina) params.set("disciplina", filtroDisciplina);
  if (filtroNivel)      params.set("nivel", filtroNivel);
  if (soloPlantillas)   params.set("plantillas", "1");

  const resp   = await fetch(`/api/clases?${params}`);
  const clases = await resp.json();
  renderizar(clases);
}

function renderizar(clases) {
  const lista = document.getElementById("lista-clases");
  if (clases.length === 0) {
    lista.innerHTML = `<div class="vacio-msg">No hay clases guardadas con estos filtros.<br><a href="/" style="color:var(--verde)">Generar una nueva →</a></div>`;
    return;
  }
  lista.innerHTML = clases.map(c => `
    <a class="clase-card ${c.plantilla ? "plantilla-card" : ""}" href="/clase/${c.id}">
      <div>
        <span class="clase-card-estrella ${c.plantilla ? "activo" : ""}"
              onclick="togglePlantilla(event, ${c.id}, this)">
          ${c.plantilla ? "⭐" : "☆"}
        </span>
      </div>
      <div class="clase-card-titulo">${escaparHTML(c.titulo)}</div>
      <div class="clase-card-meta">
        <span class="badge badge-${c.disciplina}">${DISCIPLINA_LABELS[c.disciplina] || c.disciplina}</span>
        <span class="badge badge-nivel">${NIVEL_LABELS[c.nivel] || c.nivel}</span>
        <span class="badge">⏱ ${c.duracion} min</span>
        ${c.foco ? `<span class="badge">${escaparHTML(c.foco)}</span>` : ""}
      </div>
      <div class="clase-card-fecha">📅 ${c.creada}</div>
    </a>
  `).join("");
}

async function togglePlantilla(e, id, el) {
  e.preventDefault();
  e.stopPropagation();
  const resp = await fetch(`/api/clases/${id}/plantilla`, { method: "POST" });
  const data = await resp.json();
  el.textContent = data.plantilla ? "⭐" : "☆";
  el.classList.toggle("activo", data.plantilla);
  el.closest(".clase-card").classList.toggle("plantilla-card", data.plantilla);
}

cargar();
