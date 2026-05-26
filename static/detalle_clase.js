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

document.getElementById("sesion-texto").innerHTML = renderizarMarkdown(CONTENIDO);

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
