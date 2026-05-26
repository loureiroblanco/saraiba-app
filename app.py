import os
import json
from datetime import datetime
from flask import Flask, render_template, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "sqlite:///saraiba.db"
).replace("postgres://", "postgresql://")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
client = Anthropic()

# ───────────────────────── Modelos ─────────────────────────

class Clase(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    titulo      = db.Column(db.String(200), nullable=False)
    disciplina  = db.Column(db.String(50), nullable=False)   # yoga|pilates|funcional|trx|mixto
    nivel       = db.Column(db.String(30), nullable=False)   # principiante|medio|avanzado|mixto
    duracion    = db.Column(db.Integer, nullable=False)      # minutos: 60|70|90
    foco        = db.Column(db.String(100))                  # core, caderas, espalda...
    energia     = db.Column(db.String(30))                   # suave|activa|restaurativa
    especial    = db.Column(db.String(200))                  # embarazada, mayor, lesiones...
    contenido   = db.Column(db.Text, nullable=False)         # markdown generado por IA
    plantilla   = db.Column(db.Boolean, default=False)
    creada      = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id":         self.id,
            "titulo":     self.titulo,
            "disciplina": self.disciplina,
            "nivel":      self.nivel,
            "duracion":   self.duracion,
            "foco":       self.foco,
            "energia":    self.energia,
            "especial":   self.especial,
            "contenido":  self.contenido,
            "plantilla":  self.plantilla,
            "creada":     self.creada.strftime("%d/%m/%Y %H:%M"),
        }

# ───────────────────────── Prompts ─────────────────────────

DISCIPLINAS = {
    "yoga":       "Yoga",
    "pilates":    "Pilates suelo",
    "funcional":  "Entrenamiento funcional",
    "trx":        "TRX / suspensión",
    "mixto":      "Clase mixta (yoga + pilates)",
}

NIVELES = {
    "principiante": "principiante (sin experiencia previa, movimientos básicos y seguros)",
    "medio":        "nivel medio (cierta experiencia, puede abordar retos moderados)",
    "avanzado":     "avanzado (buena base, puede explorar posturas o ejercicios exigentes)",
    "mixto":        "grupo mixto (diseña con variaciones A/B para que cada persona elija su nivel)",
}

FOCOS = {
    "core":        "core y estabilización lumbo-pélvica",
    "caderas":     "apertura de caderas y movilidad",
    "espalda":     "salud de la columna y alivio de tensión dorsal",
    "hombros":     "hombros, cuello y zona cervical",
    "piernas":     "piernas, glúteos e isquiotibiales",
    "equilibrio":  "equilibrio y propiocepción",
    "respiracion": "respiración, pranayama y conexión cuerpo-mente",
    "general":     "cuerpo completo, sin foco específico",
}

ENERGIAS = {
    "suave":       "suave y restaurativa (baja intensidad, mucho trabajo de soltar y respirar)",
    "activa":      "activa y energizante (intensidad media-alta, ritmo fluido)",
    "terapeutica": "terapéutica (orientada a prevención y recuperación de lesiones comunes)",
}

ESPECIALES = {
    "embarazo":    "hay alumnas embarazadas — evitar decúbito prono, abdominales directos, inversiones y retención de aliento; proponer variaciones seguras en todo momento",
    "mayor":       "hay personas mayores — priorizar seguridad articular, apoyo en silla o pared, rangos de movimiento reducidos y mucho tiempo de adaptación",
    "lumbar":      "hay personas con problemas lumbares — evitar flexiones forzadas y extensiones extremas; activar core antes de cada ejercicio",
    "rodillas":    "hay personas con rodillas sensibles — evitar rodilla pasada del pie, ofrecer siempre apoyo en suelo",
    "ninguno":     "",
}

SYSTEM_PROMPT = """Eres un profesor experto en yoga, pilates, funcional y TRX. Diseñas clases con progresión corporal lógica.

PROGRESIÓN: supino → prono/cuadrupedia → sentado → arrodillado → de pie → equilibrio → pranayama → relajación.

BLOQUE RESPIRACIÓN: mínimo 10 minutos, con al menos 2 pranayamas nombrados (Nadi Shodhana, Kapalabhati, Ujjayi, Bhramari, Viloma).

RESPONDE SOLO CON JSON VÁLIDO, sin texto adicional, sin bloques ```json:
{"bloques":[{"nombre":"...","duracion_min":5,"descripcion":"...","items":[{"postura":"...","sanskrit":"...","duracion":"...","cue":"...","variacion":"..."}]}],"notas_profesor":["..."]}

En cada item: cue máximo 15 palabras, variacion máximo 10 palabras. Descripcion de bloque máximo 20 palabras.
Bloques obligatorios: Llegada/centrado, Calentamiento, Bloque principal, Vuelta a la calma, Respiración/pranayama (≥10min), Savasana."""


def construir_prompt(datos):
    disciplina = DISCIPLINAS.get(datos["disciplina"], datos["disciplina"])
    nivel      = NIVELES.get(datos["nivel"], datos["nivel"])
    foco       = FOCOS.get(datos["foco"], datos["foco"])
    energia    = ENERGIAS.get(datos["energia"], datos["energia"])
    duracion   = datos["duracion"]

    especiales = []
    for e in datos.get("especial", []):
        if e in ESPECIALES and ESPECIALES[e]:
            especiales.append(ESPECIALES[e])
    contexto_libre = datos.get("contexto", "").strip()

    prompt = f"""Genera una sesión de {disciplina}, {duracion} minutos, nivel {nivel}.
Foco: {foco}. Energía: {energia}."""

    if especiales:
        prompt += f"\nCondiciones especiales: {'; '.join(especiales)}."

    if contexto_libre:
        prompt += f"\nContexto adicional: {contexto_libre}."

    prompt += f"""

Recuerda:
- Progresión corporal lógica (supino → de pie → pranayama → savasana)
- Bloque de respiración MÍNIMO 10 minutos con al menos 2 pranayamas
- La suma de duracion_min de todos los bloques debe ser exactamente {duracion} minutos
- Devuelve SOLO JSON válido"""

    return prompt


# ───────────────────────── Rutas HTML ─────────────────────────

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/biblioteca")
def biblioteca():
    return render_template("biblioteca.html")

@app.route("/clase/<int:clase_id>")
def detalle_clase(clase_id):
    clase = db.get_or_404(Clase, clase_id)
    return render_template("detalle_clase.html", clase=clase)

# ───────────────────────── API ─────────────────────────

@app.route("/api/generar", methods=["POST"])
def generar():
    datos = request.get_json()
    if not datos:
        return jsonify({"error": "Datos inválidos"}), 400

    for campo in ["disciplina", "nivel", "duracion", "foco", "energia"]:
        if not datos.get(campo):
            return jsonify({"error": f"Falta el campo: {campo}"}), 400

    prompt = construir_prompt(datos)

    try:
        resp = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=8000,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}],
        )
        texto = resp.content[0].text.strip()

        # Extraer JSON aunque venga envuelto en ```json ... ```
        if "```" in texto:
            partes = texto.split("```")
            for parte in partes:
                if parte.startswith("json"):
                    texto = parte[4:].strip()
                    break
                elif parte.strip().startswith("{"):
                    texto = parte.strip()
                    break

        # Buscar el inicio del JSON si hay texto previo
        inicio = texto.find("{")
        if inicio > 0:
            texto = texto[inicio:]

        sesion = json.loads(texto)

    except json.JSONDecodeError as e:
        return jsonify({"error": f"La IA no devolvió JSON válido: {str(e)}", "raw": texto[:500]}), 500
    except Exception as e:
        return jsonify({"error": f"Error al generar la sesión: {str(e)}"}), 500

    return jsonify({"sesion": sesion})


@app.route("/api/clases", methods=["GET"])
def listar_clases():
    disciplina = request.args.get("disciplina")
    nivel      = request.args.get("nivel")
    solo_plantillas = request.args.get("plantillas") == "1"

    q = Clase.query
    if disciplina:
        q = q.filter_by(disciplina=disciplina)
    if nivel:
        q = q.filter_by(nivel=nivel)
    if solo_plantillas:
        q = q.filter_by(plantilla=True)

    clases = q.order_by(Clase.creada.desc()).all()
    return jsonify([c.to_dict() for c in clases])


@app.route("/api/clases", methods=["POST"])
def guardar_clase():
    datos = request.get_json()
    if not datos or not datos.get("contenido"):
        return jsonify({"error": "Contenido vacío"}), 400

    contenido = datos.get("contenido")
    if isinstance(contenido, dict):
        contenido = json.dumps(contenido, ensure_ascii=False)

    clase = Clase(
        titulo     = datos.get("titulo") or f"Clase {datos.get('disciplina','').title()} {datos.get('duracion','')}min",
        disciplina = datos.get("disciplina", "yoga"),
        nivel      = datos.get("nivel", "medio"),
        duracion   = int(datos.get("duracion", 60)),
        foco       = datos.get("foco", "general"),
        energia    = datos.get("energia", "activa"),
        especial   = ", ".join(datos.get("especial", [])) if isinstance(datos.get("especial"), list) else datos.get("especial", ""),
        contenido  = contenido,
        plantilla  = bool(datos.get("plantilla", False)),
    )
    db.session.add(clase)
    db.session.commit()
    return jsonify(clase.to_dict()), 201


@app.route("/api/clases/<int:clase_id>", methods=["DELETE"])
def borrar_clase(clase_id):
    clase = db.get_or_404(Clase, clase_id)
    db.session.delete(clase)
    db.session.commit()
    return jsonify({"ok": True})


@app.route("/api/clases/<int:clase_id>/plantilla", methods=["POST"])
def toggle_plantilla(clase_id):
    clase = db.get_or_404(Clase, clase_id)
    clase.plantilla = not clase.plantilla
    db.session.commit()
    return jsonify({"plantilla": clase.plantilla})


# ───────────────────────── Init ─────────────────────────

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True, port=5001)
