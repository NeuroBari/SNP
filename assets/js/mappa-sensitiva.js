// Disegno SVG delle mappe sensitive (dermatomi e territori dei nervi cutanei).
// Vedi assets/js/data/sensibilita.js per il sistema di coordinate [y, v].
import { GEOMETRIE, MAPPE, DERMATOMI, TERRITORI, NERVI_CUTANEI } from "./data/sensibilita.js";
import { COLORI_NERVI } from "./colori.js";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const COLORE_LESO = "#c0392b";
let contatore = 0;

export const coloreTerritorio = (id) => {
  const n = TERRITORI[id]?.nervo;
  return COLORI_NERVI[n] || NERVI_CUTANEI[n]?.colore || "#888888";
};
export const coloreDermatoma = (id) => DERMATOMI[id]?.colore || "#888888";

// Interpolazione cubica monotona (Fritsch–Carlson) di x(y) sui punti [[y, x], ...]
function interpola(punti, y) {
  const n = punti.length;
  if (y <= punti[0][0]) return punti[0][1];
  if (y >= punti[n - 1][0]) return punti[n - 1][1];
  let i = 0;
  while (y > punti[i + 1][0]) i++;
  const [y0, x0] = punti[i], [y1, x1] = punti[i + 1];
  const h = y1 - y0, d = (x1 - x0) / h, t = (y - y0) / h;
  const pendenza = (j) => {
    const a = punti[Math.max(j - 1, 0)], b = punti[Math.min(j + 1, n - 1)];
    return (b[1] - a[1]) / (b[0] - a[0]);
  };
  let m0 = pendenza(i), m1 = pendenza(i + 1);
  if (d === 0) m0 = m1 = 0;
  else {
    const a = Math.max(m0 / d, 0), b = Math.max(m1 / d, 0), s = a * a + b * b;
    const k = s > 9 ? 3 / Math.sqrt(s) : 1;
    m0 = k * a * d; m1 = k * b * d;
  }
  const t2 = t * t, t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * x0 + (t3 - 2 * t2 + t) * h * m0 + (-2 * t3 + 3 * t2) * x1 + (t3 - t2) * h * m1;
}

const estremi = (parte) => [Math.min(parte.L[0][0], parte.R[0][0]), Math.max(parte.L.at(-1)[0], parte.R.at(-1)[0])];

function punto(geo, nomeParte, y, v, specchio) {
  const p = geo.parti[nomeParte];
  const l = interpola(p.L, y), r = interpola(p.R, y);
  const x = l + (r - l) * v;
  return [specchio ? geo.larghezza - x : x, y];
}

// Poligono [y, v] della zona (forma estesa o { v, y } su una parte intera)
function poligonoZona(geo, nomeParte, zona) {
  if (Array.isArray(zona)) return zona;
  const [ya, yb] = zona.y || estremi(geo.parti[nomeParte]);
  const [va, vb] = zona.v || [0, 1];
  return [[ya, va], [ya, vb], [yb, vb], [yb, va]];
}

// Converte il poligono in coordinate del disegno, suddividendo i lati per seguire i margini curvi
function percorso(geo, nomeParte, pts, specchio) {
  const out = [];
  for (let i = 0; i < pts.length; i++) {
    const [ya, va] = pts[i], [yb, vb] = pts[(i + 1) % pts.length];
    const passi = Math.max(1, Math.ceil(Math.abs(yb - ya) / 4));
    for (let k = 0; k < passi; k++) {
      const t = k / passi;
      out.push(punto(geo, nomeParte, ya + (yb - ya) * t, va + (vb - va) * t, specchio));
    }
  }
  return out;
}
const d = (pts) => "M" + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L") + "Z";

function sagoma(geo, nomeParte, specchio) {
  const [ya, yb] = estremi(geo.parti[nomeParte]);
  return d(percorso(geo, nomeParte, [[ya, 0], [yb, 0], [yb, 1], [ya, 1]], specchio));
}

// Baricentro (per le etichette) e area di un poligono
function baricentro(pts) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i], [x1, y1] = pts[(i + 1) % pts.length];
    const c = x0 * y1 - x1 * y0;
    a += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c;
  }
  if (Math.abs(a) < 1e-6) return { area: 0, x: pts[0][0], y: pts[0][1] };
  return { area: Math.abs(a / 2), x: cx / (3 * a), y: cy / (3 * a) };
}

// Pezzi di zona di uno strato ("dermatomi" o "territori"), ordinati per parte (le dita sopra il palmo)
function pezzi(vista, strato) {
  const geo = GEOMETRIE[vista.geometria];
  return vista[strato]
    .map(([id, parte, zona], i) => ({ id, parte, ordine: vista.parti.indexOf(parte) * 1000 + i, pts: percorso(geo, parte, poligonoZona(geo, parte, zona), vista.specchio) }))
    .sort((a, b) => a.ordine - b.ordine);
}

/**
 * SVG di una vista.
 *  modo: "dermatomi" | "territori" | "sovrapposizione" | "lesione"
 *  derm, terr: insiemi di id selezionati (evidenziati; gli altri sbiaditi)
 *  mini: versione piccola senza etichette né punti chiave
 */
export function svgVista(vista, { modo = "territori", derm = new Set(), terr = new Set(), mini = false, titolo = true } = {}) {
  const geo = GEOMETRIE[vista.geometria];
  const uid = `ms${++contatore}`;
  const sagome = Object.fromEntries(vista.parti.map((p) => [p, sagoma(geo, p, vista.specchio)]));
  const zona = (p, strato, fill, opacita, extra = "") => {
    const nome = strato === "derm" ? `Dermatomo ${p.id}` : TERRITORI[p.id].nome;
    return `<path class="zona" d="${d(p.pts)}" data-${strato}="${p.id}" fill="${fill}" fill-opacity="${opacita}" ${extra}><title>${esc(nome)}</title></path>`;
  };
  let defs = "";
  let disegna; // pezzi di una parte -> SVG

  if (modo === "dermatomi") {
    const sel = derm.size > 0;
    const lista = pezzi(vista, "dermatomi");
    disegna = (parte) => lista.filter((p) => p.parte === parte).map((p) => zona(p, "derm", coloreDermatoma(p.id), sel && !derm.has(p.id) ? 0.15 : 0.8)).join("");
  } else if (modo === "territori") {
    const sel = terr.size > 0;
    const lista = pezzi(vista, "territori");
    disegna = (parte) => lista.filter((p) => p.parte === parte).map((p) => zona(p, "terr", coloreTerritorio(p.id), sel && !terr.has(p.id) ? 0.15 : 0.78)).join("");
  } else if (modo === "sovrapposizione") {
    const sel = terr.size > 0 || derm.size > 0;
    const lt = pezzi(vista, "territori"), ld = pezzi(vista, "dermatomi");
    // dermatomi selezionati con tratteggio, gli altri solo come contorno
    for (const id of derm) {
      defs += `<pattern id="${uid}-${id}" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)"><rect width="3.2" height="7" fill="${coloreDermatoma(id)}"/></pattern>`;
    }
    disegna = (parte) =>
      lt.filter((p) => p.parte === parte).map((p) => zona(p, "terr", coloreTerritorio(p.id), terr.has(p.id) ? 0.75 : sel ? 0.1 : 0.4)).join("") +
      ld.filter((p) => p.parte === parte).map((p) =>
        derm.has(p.id)
          ? zona(p, "derm", `url(#${uid}-${p.id})`, 0.95, `stroke="${coloreDermatoma(p.id)}" stroke-width="1.6"`)
          : `<path class="bordo-derm" d="${d(p.pts)}" data-derm="${p.id}"><title>Dermatomo ${p.id}</title></path>`
      ).join("");
  } else {
    // lesione: area colpita in rosso, il resto con i soli confini
    const strato = derm.size ? "dermatomi" : "territori";
    const sel = derm.size ? derm : terr;
    const lista = pezzi(vista, strato);
    disegna = (parte) => lista.filter((p) => p.parte === parte)
      .map((p) => (sel.has(p.id) ? zona(p, strato === "dermatomi" ? "derm" : "terr", COLORE_LESO, 0.62) : `<path class="bordo-zona" d="${d(p.pts)}"/>`))
      .join("");
  }
  // Ogni parte copre quelle disegnate prima (dita sopra il palmo), con le sue zone
  const corpo = vista.parti
    .map((p) => `<path class="pelle${(vista.bordo || []).includes(p) ? " bordata" : ""}" d="${sagome[p]}"/>${disegna(p)}`)
    .join("");

  // Etichette dei dermatomi sul pezzo più grande di ciascuno
  let etichette = "";
  if (!mini && (modo === "dermatomi" || modo === "sovrapposizione")) {
    const migliori = {};
    for (const p of pezzi(vista, "dermatomi")) {
      const b = baricentro(p.pts);
      if (!migliori[p.id] || b.area > migliori[p.id].area) migliori[p.id] = b;
    }
    etichette = Object.entries(migliori)
      .filter(([, b]) => b.area > 250)
      .map(([id, b]) => `<text class="etichetta-derm" x="${b.x.toFixed(1)}" y="${(b.y + 4).toFixed(1)}">${id}</text>`)
      .join("");
  }
  const punti = !mini && modo !== "territori" && modo !== "lesione"
    ? (vista.punti || [])
        .map(([id, parte, y, v]) => {
          const [x, yy] = punto(geo, parte, y, v, vista.specchio);
          return `<circle class="punto-chiave" cx="${x.toFixed(1)}" cy="${yy.toFixed(1)}" r="3.4"><title>Punto chiave ${id}: ${esc(DERMATOMI[id].punto)}</title></circle>`;
        })
        .join("")
    : "";
  const note = mini ? "" : (vista.note || []).map(([t, x, y, anc]) => `<text class="nota-mappa" x="${x}" y="${y}" text-anchor="${anc}">${esc(t)}</text>`).join("");

  // Nelle mappe piccole si inquadra l'area evidenziata (es. la sola mano)
  let box = [0, 0, geo.larghezza, geo.altezza];
  if (mini && (derm.size || terr.size)) {
    const sel = [...pezzi(vista, "dermatomi").filter((p) => derm.has(p.id)), ...pezzi(vista, "territori").filter((p) => terr.has(p.id))].flatMap((p) => p.pts);
    if (sel.length) {
      const xs = sel.map((q) => q[0]), ys = sel.map((q) => q[1]);
      let [x0, x1, y0, y1] = [Math.min(...xs) - 25, Math.max(...xs) + 25, Math.min(...ys) - 30, Math.max(...ys) + 30];
      if (y1 - y0 < 220) { const c = (y0 + y1) / 2; y0 = c - 110; y1 = c + 110; }
      if (x1 - x0 < 150) { const c = (x0 + x1) / 2; x0 = c - 75; x1 = c + 75; }
      y0 = Math.max(0, y0); y1 = Math.min(geo.altezza, y1);
      box = [x0, y0, x1 - x0, y1 - y0].map((n) => Math.round(n));
    }
  }
  const larghezza = Math.round(mini ? Math.min(130, box[2] * Math.min(0.6, 230 / box[3])) : geo.larghezza * (vista.scala || 1));
  return `<figure class="vista-sens${mini ? " mini" : ""}" style="flex-basis:${larghezza}px;max-width:${larghezza}px">
    <svg viewBox="${box.join(" ")}" role="img" aria-label="${esc(vista.nome)}">
      <defs>${defs}</defs>
      <g class="contorno">${Object.values(sagome).map((s) => `<path d="${s}"/>`).join("")}</g>
      <g>${corpo}</g>${etichette}${punti}${note}
    </svg>${titolo ? `<figcaption>${esc(vista.nome)}</figcaption>` : ""}</figure>`;
}

// Tutte le viste di una regione
export function svgRegione(idRegione, opzioni = {}) {
  return MAPPE[idRegione].viste.map((v) => svgVista(v, opzioni)).join("");
}

// Mappa compatta per le schede (Anatomia, simulatore): solo le viste in cui l'area compare
export function svgArea(idRegione, { territori = [], dermatomi = [] }, { modo = "lesione" } = {}) {
  const terr = new Set(territori), derm = new Set(dermatomi);
  const viste = MAPPE[idRegione].viste.filter((v) =>
    derm.size ? v.dermatomi.some(([id]) => derm.has(id)) : v.territori.some(([id]) => terr.has(id))
  );
  return viste.map((v) => svgVista(v, { modo, terr, derm, mini: true })).join("");
}
