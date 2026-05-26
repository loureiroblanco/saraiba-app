/**
 * posturas.js — Biblioteca de siluetas SVG para yoga, pilates, funcional y TRX.
 * Cada postura tiene: id, nombre_es, nombre_sans (yoga), tipo_posicion, svg.
 *
 * tipo_posicion define el orden de progresión lógica:
 *   1-supino, 2-prono, 3-cuadrupedia, 4-sentado, 5-arrodillado,
 *   6-de_pie, 7-equilibrio, 8-inversion, 9-pranayama, 10-relajacion
 */

const POSTURAS = {

  // ── SUPINO (tumbado boca arriba) ──────────────────────────
  savasana: {
    nombre_es: "Savasana", nombre_sans: "Śavāsana",
    tipo: 10,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="40" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="25" y1="40" x2="105" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="45" y1="40" x2="55" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="55" y1="58" x2="65" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="65" y1="40" x2="75" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="75" y1="58" x2="85" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="40" x2="30" y2="55" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="70" y1="40" x2="80" y2="55" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  rodillas_al_pecho: {
    nombre_es: "Rodillas al pecho", nombre_sans: "Apānāsana",
    tipo: 1,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="42" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path d="M27 42 Q40 42 45 38 Q50 30 60 30 Q70 30 75 38 Q80 46 75 54 Q65 62 55 58 Q45 54 40 50 Q32 48 27 42Z" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="27" y1="42" x2="42" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="42" y1="52" x2="55" y2="30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  puente: {
    nombre_es: "Puente", nombre_sans: "Setu Bandha",
    tipo: 1,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="62" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="25" y1="62" x2="45" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M45 62 Q50 62 55 50 Q60 38 70 30 Q80 28 90 35" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="90" y1="35" x2="95" y2="55" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="95" y1="55" x2="100" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="75" y1="58" x2="75" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="45" y1="62" x2="32" y2="70" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  torsion_supina: {
    nombre_es: "Torsión supina", nombre_sans: "Supta Matsyendrāsana",
    tipo: 1,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="40" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="25" y1="40" x2="70" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M60 40 Q65 40 70 50 Q75 60 85 62" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="70" y1="40" x2="90" y2="28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="35" y1="40" x2="22" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="55" y1="40" x2="68" y2="22" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // ── PRONO (boca abajo) ────────────────────────────────────
  cobra: {
    nombre_es: "Cobra", nombre_sans: "Bhujaṅgāsana",
    tipo: 2,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="95" cy="22" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path d="M88 26 Q75 35 60 40 Q45 45 30 46 Q15 46 10 46" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="10" y1="46" x2="10" y2="60" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="30" y1="46" x2="30" y2="60" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="88" y1="28" x2="75" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="100" y1="28" x2="110" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  perro_boca_abajo: {
    nombre_es: "Perro boca abajo", nombre_sans: "Adho Mukha Śvānāsana",
    tipo: 3,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="18" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="25" x2="60" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="42" x2="25" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="25" y1="65" x2="18" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="25" y1="65" x2="32" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="42" x2="95" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="95" y1="65" x2="88" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="95" y1="65" x2="102" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // ── CUADRUPEDIA ───────────────────────────────────────────
  gato_vaca: {
    nombre_es: "Gato-Vaca", nombre_sans: "Marjaryāsana-Bitilāsana",
    tipo: 3,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="30" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path d="M93 34 Q75 40 60 35 Q45 30 27 38" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="27" y1="38" x2="20" y2="55" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="55" x2="14" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="42" x2="40" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="58" x2="34" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="75" y1="38" x2="75" y2="55" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="75" y1="55" x2="69" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  perro_tres_patas: {
    nombre_es: "Perro tres patas", nombre_sans: "Eka Pāda Adho Mukha",
    tipo: 3,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="18" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="25" x2="60" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="42" x2="25" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="25" y1="65" x2="18" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="25" y1="65" x2="32" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="42" x2="90" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="90" y1="58" x2="85" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="42" x2="95" y2="15" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // ── SENTADO ───────────────────────────────────────────────
  sukhasana: {
    nombre_es: "Postura fácil", nombre_sans: "Sukhāsana",
    tipo: 4,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="14" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="21" x2="60" y2="45" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M60 45 Q45 50 30 60 Q25 65 18 65" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path d="M60 45 Q75 50 90 60 Q95 65 102 65" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="30" x2="35" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="35" y1="38" x2="28" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="30" x2="85" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="85" y1="38" x2="92" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  janu_sirsasana: {
    nombre_es: "Cabeza a la rodilla", nombre_sans: "Jānu Śīrṣāsana",
    tipo: 4,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="25" cy="45" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path d="M30 49 Q50 62 80 62 Q95 62 105 62" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path d="M35 48 Q55 38 80 38 Q90 38 95 48 Q95 58 80 62" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="45" y1="44" x2="45" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="45" y1="62" x2="30" y2="70" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  marichyasana: {
    nombre_es: "Torsión sentada", nombre_sans: "Marichyāsana",
    tipo: 4,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="28" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path d="M34 34 Q42 45 50 52" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="50" y1="52" x2="90" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="50" y1="52" x2="65" y2="30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="30" y1="34" x2="18" y2="48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="36" y1="34" x2="55" y2="28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  baddha_konasana: {
    nombre_es: "Mariposa", nombre_sans: "Baddha Koṇāsana",
    tipo: 4,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="16" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="23" x2="60" y2="48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M60 48 Q45 55 25 50 Q15 45 20 38 Q30 30 60 48" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path d="M60 48 Q75 55 95 50 Q105 45 100 38 Q90 30 60 48" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="32" x2="38" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="32" x2="82" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // ── ARRODILLADO ───────────────────────────────────────────
  media_luna_arrodillada: {
    nombre_es: "Media luna arrodillada", nombre_sans: "Añjaneyāsana",
    tipo: 5,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="12" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="19" x2="60" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="28" x2="40" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="38" x2="30" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="28" x2="80" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="80" y1="38" x2="90" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="42" x2="45" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="45" y1="58" x2="30" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="42" x2="80" y2="62" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // ── DE PIE ────────────────────────────────────────────────
  montanya: {
    nombre_es: "Montaña", nombre_sans: "Tādāsana",
    tipo: 6,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="10" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="17" x2="60" y2="48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="28" x2="35" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="35" y1="38" x2="28" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="28" x2="85" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="85" y1="38" x2="92" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="48" x2="48" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="48" y1="65" x2="44" y2="76" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="48" x2="72" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="72" y1="65" x2="76" y2="76" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  guerrero_1: {
    nombre_es: "Guerrero I", nombre_sans: "Vīrabhadrāsana I",
    tipo: 6,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="10" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="17" x2="60" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="26" x2="38" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="26" x2="82" y2="18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="42" x2="42" y2="60" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="42" y1="60" x2="35" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="42" x2="78" y2="55" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="78" y1="55" x2="88" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  guerrero_2: {
    nombre_es: "Guerrero II", nombre_sans: "Vīrabhadrāsana II",
    tipo: 6,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="14" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="21" x2="60" y2="46" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="30" x2="20" y2="34" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="30" x2="100" y2="34" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="46" x2="35" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="35" y1="65" x2="22" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="46" x2="80" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="80" y1="58" x2="90" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  triangulo: {
    nombre_es: "Triángulo", nombre_sans: "Trikoṇāsana",
    tipo: 6,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="38" cy="20" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path d="M42 26 Q50 38 50 52" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="50" y1="52" x2="20" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="50" y1="52" x2="95" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="42" y1="30" x2="18" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="18" y1="38" x2="20" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="44" y1="32" x2="72" y2="20" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  perro_boca_arriba: {
    nombre_es: "Perro boca arriba", nombre_sans: "Ūrdhva Mukha Śvānāsana",
    tipo: 2,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="18" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path d="M93 22 Q75 32 55 36 Q35 40 15 40" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="93" y1="26" x2="80" y2="45" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="107" y1="24" x2="112" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="38" x2="40" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="70" y1="34" x2="70" y2="54" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // ── EQUILIBRIO ────────────────────────────────────────────
  arbol: {
    nombre_es: "Árbol", nombre_sans: "Vṛkṣāsana",
    tipo: 7,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="9" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="16" x2="60" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="26" x2="32" y2="14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="26" x2="88" y2="14" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="52" x2="60" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="52" x2="42" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="42" y1="68" x2="38" y2="76" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  guerrero_3: {
    nombre_es: "Guerrero III", nombre_sans: "Vīrabhadrāsana III",
    tipo: 7,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="40" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="25" y1="40" x2="62" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="62" y1="40" x2="105" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="62" y1="40" x2="62" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="45" y1="40" x2="30" y2="28" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="45" y1="40" x2="30" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // ── INVERSIONES ───────────────────────────────────────────
  perro_invertido: {
    nombre_es: "Piernas en la pared", nombre_sans: "Viparīta Karaṇī",
    tipo: 8,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="65" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="25" y1="65" x2="55" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="55" y1="65" x2="60" y2="45" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="45" x2="75" y2="10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="45" x2="85" y2="15" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="35" y1="65" x2="30" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="50" y1="65" x2="48" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="108" y="5" width="4" height="72" rx="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },

  // ── PRANAYAMA ─────────────────────────────────────────────
  pranayama_sentado: {
    nombre_es: "Pranayama", nombre_sans: "Prāṇāyāma",
    tipo: 9,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="14" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="21" x2="60" y2="48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M60 48 Q45 52 28 60 Q22 64 18 68" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <path d="M60 48 Q75 52 92 60 Q98 64 102 68" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="30" x2="38" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="38" y1="40" x2="32" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="30" x2="82" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="82" y1="40" x2="88" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Ondas de respiración -->
      <path d="M40 8 Q45 4 50 8 Q55 12 60 8 Q65 4 70 8 Q75 12 80 8" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    </svg>`
  },

  // ── PILATES / FUNCIONAL ───────────────────────────────────
  cien: {
    nombre_es: "Los cien", nombre_sans: "The Hundred",
    tipo: 1,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="45" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="25" y1="45" x2="70" y2="45" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="70" y1="45" x2="85" y2="30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="70" y1="45" x2="95" y2="35" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="35" y1="45" x2="22" y2="30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="50" y1="45" x2="38" y2="30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="70" y1="45" x2="82" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="82" y1="58" x2="90" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  plancha: {
    nombre_es: "Plancha", nombre_sans: "Phalakāsana",
    tipo: 3,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="30" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="93" y1="34" x2="20" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="20" y1="42" x2="12" y2="56" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="40" x2="40" y2="56" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="105" y1="36" x2="110" y2="52" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  sentadilla: {
    nombre_es: "Sentadilla", nombre_sans: "Squat",
    tipo: 5,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="12" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="19" x2="60" y2="40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="28" x2="30" y2="35" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="28" x2="90" y2="35" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="40" x2="40" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="40" y1="58" x2="30" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="40" x2="80" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="80" y1="58" x2="90" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  zancada: {
    nombre_es: "Zancada", nombre_sans: "Lunge",
    tipo: 5,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="55" cy="12" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="55" y1="19" x2="55" y2="42" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="55" y1="28" x2="30" y2="36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="55" y1="28" x2="80" y2="36" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="55" y1="42" x2="35" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="35" y1="58" x2="20" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="55" y1="42" x2="80" y2="50" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="80" y1="50" x2="90" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="90" y1="65" x2="95" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  trx_remo: {
    nombre_es: "TRX Remo", nombre_sans: "TRX Row",
    tipo: 6,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <line x1="60" y1="2" x2="60" y2="20" stroke="currentColor" stroke-width="2" stroke-dasharray="3,2"/>
      <line x1="60" y1="20" x2="48" y2="30" stroke="currentColor" stroke-width="2"/>
      <line x1="60" y1="20" x2="72" y2="30" stroke="currentColor" stroke-width="2"/>
      <ellipse cx="35" cy="35" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="42" y1="35" x2="48" y2="30" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="42" y1="35" x2="80" y2="45" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="80" y1="45" x2="100" y2="60" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="55" y1="38" x2="55" y2="58" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="55" y1="58" x2="45" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="55" y1="58" x2="65" y2="72" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },

  // Postura genérica para cuando no hay coincidencia
  generica: {
    nombre_es: "Postura", nombre_sans: "",
    tipo: 6,
    svg: `<svg viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="60" cy="10" rx="7" ry="7" fill="none" stroke="currentColor" stroke-width="2.5"/>
      <line x1="60" y1="17" x2="60" y2="45" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="28" x2="38" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="28" x2="82" y2="38" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="45" x2="48" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="60" y1="45" x2="72" y2="65" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
};

/**
 * Busca la postura más parecida al nombre dado.
 * Usa coincidencia de palabras clave en español y sánscrito.
 */
function buscarPostura(nombre) {
  const n = nombre.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  const ALIAS = {
    "savasana": "savasana", "savana": "savasana", "relajacion final": "savasana",
    "shavasana": "savasana", "descanso final": "savasana",
    "puente": "puente", "setu bandha": "puente",
    "cobra": "cobra", "bhujangasana": "cobra",
    "perro boca abajo": "perro_boca_abajo", "adho mukha": "perro_boca_abajo",
    "perro boca arriba": "perro_boca_arriba", "urdhva mukha": "perro_boca_arriba",
    "gato": "gato_vaca", "vaca": "gato_vaca", "cat cow": "gato_vaca", "gato vaca": "gato_vaca",
    "plancha": "plancha", "phalakasana": "plancha",
    "montaña": "montanya", "tadasana": "montanya",
    "guerrero 1": "guerrero_1", "guerrero i": "guerrero_1", "virabhadrasana i": "guerrero_1",
    "guerrero 2": "guerrero_2", "guerrero ii": "guerrero_2", "virabhadrasana ii": "guerrero_2",
    "guerrero 3": "guerrero_3", "guerrero iii": "guerrero_3",
    "triangulo": "triangulo", "trikonasana": "triangulo",
    "arbol": "arbol", "vrksasana": "arbol",
    "mariposa": "baddha_konasana", "baddha konasana": "baddha_konasana",
    "torsion sentada": "marichyasana", "marichyasana": "marichyasana",
    "torsion supina": "torsion_supina", "torsion tumbada": "torsion_supina",
    "rodillas al pecho": "rodillas_al_pecho", "apanasana": "rodillas_al_pecho",
    "cabeza rodilla": "janu_sirsasana", "janu sirsasana": "janu_sirsasana",
    "anjali": "media_luna_arrodillada", "anjaneyasana": "media_luna_arrodillada",
    "zancada baja": "media_luna_arrodillada", "zancada": "zancada",
    "sentadilla": "sentadilla", "squat": "sentadilla",
    "cien": "cien", "hundred": "cien", "the hundred": "cien",
    "pranayama": "pranayama_sentado", "respiracion": "pranayama_sentado",
    "nadi shodhana": "pranayama_sentado", "kapalabhati": "pranayama_sentado",
    "ujjayi": "pranayama_sentado", "bhramari": "pranayama_sentado",
    "piernas pared": "perro_invertido", "viparita karani": "perro_invertido",
    "perro tres patas": "perro_tres_patas",
    "trx": "trx_remo", "remo": "trx_remo",
    "sukhasana": "sukhasana", "postura facil": "sukhasana", "meditacion": "sukhasana",
  };

  for (const [clave, id] of Object.entries(ALIAS)) {
    if (n.includes(clave)) return POSTURAS[id];
  }
  return POSTURAS.generica;
}
