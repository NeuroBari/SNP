import { REGIONI } from "./data/regioni.js";
import { MAPPE, DERMATOMI, TERRITORI, NERVI_CUTANEI, CONFRONTI, territoriDelNervo } from "./data/sensibilita.js";
import { NOTE_RADICI } from "./data/lesioni-prossimali.js";
import { svgRegione, coloreTerritorio, coloreDermatoma } from "./mappa-sensitiva.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// Indirizzo: #regione=inferiore&modo=sovrapposizione&derm=L5&nervo=peroneo (oppure terr=<ramo>, confronto=<id>)
const stato = { regione: "superiore", modo: "dermatomi", derm: new Set(), terr: new Set(), nervo: null, confronto: null };

const nomeNervo = (id) => REGIONI.superiore.nervoPerId[id]?.nome || REGIONI.inferiore.nervoPerId[id]?.nome || NERVI_CUTANEI[id]?.nome || id;
const territoriRegione = (r) => [...new Set(MAPPE[r].viste.flatMap((v) => v.territori.map(([id]) => id)))];
const regioneDi = (idTerr) => Object.keys(MAPPE).find((r) => territoriRegione(r).includes(idTerr));

function leggiIndirizzo() {
  const p = new URLSearchParams(location.hash.slice(1));
  const vecchio = location.hash.slice(1);
  stato.derm = new Set((p.get("derm") || "").split(",").filter((r) => DERMATOMI[r]));
  stato.terr = new Set();
  stato.nervo = p.get("nervo");
  stato.confronto = p.get("confronto");
  if (stato.nervo) territoriDelNervo(stato.nervo).forEach((t) => stato.terr.add(t));
  const terr = (p.get("terr") || "").split(",").filter((t) => TERRITORI[t]);
  if (terr.length) { stato.terr = new Set(terr); stato.nervo = TERRITORI[terr[0]].nervo; }
  stato.regione =
    MAPPE[p.get("regione")] ? p.get("regione")
    : MAPPE[vecchio] ? vecchio
    : stato.terr.size ? regioneDi([...stato.terr][0])
    : stato.derm.size ? Object.keys(MAPPE).find((r) => MAPPE[r].radici.includes([...stato.derm][0]))
    : stato.regione;
  const modo = p.get("modo");
  stato.modo = ["dermatomi", "territori", "sovrapposizione"].includes(modo) ? modo
    : stato.terr.size && stato.derm.size ? "sovrapposizione" : stato.terr.size ? "territori" : "dermatomi";
}

function scriviIndirizzo() {
  const p = new URLSearchParams({ regione: stato.regione, modo: stato.modo });
  if (stato.derm.size) p.set("derm", [...stato.derm].join(","));
  if (stato.confronto) p.set("confronto", stato.confronto);
  else if (stato.nervo && territoriDelNervo(stato.nervo).every((t) => stato.terr.has(t)) && stato.terr.size === territoriDelNervo(stato.nervo).length) p.set("nervo", stato.nervo);
  else if (stato.terr.size) p.set("terr", [...stato.terr].join(","));
  history.replaceState(null, "", `#${p}`);
}

// --- Elenco di radici e nervi
function disegnaElenco() {
  const radici = MAPPE[stato.regione].radici;
  const gruppi = {};
  for (const t of territoriRegione(stato.regione)) (gruppi[TERRITORI[t].nervo] ||= []).push(t);
  $("#elenco").innerHTML = `
    <h4>Radici (dermatomi)</h4>
    <div class="radici">${radici
      .map((r) => `<button class="btn${stato.derm.has(r) ? " attivo" : ""}" data-radice="${r}"><span class="pallino" style="background:${coloreDermatoma(r)}"></span>${r}</button>`)
      .join("")}</div>
    <h4>Nervi cutanei</h4>
    ${Object.entries(gruppi)
      .map(([nervo, rami]) => {
        const tutti = rami.every((t) => stato.terr.has(t));
        const voce = `<button class="voce${tutti && stato.nervo === nervo ? " attivo" : ""}" data-nervo="${nervo}"><span class="pallino" style="background:${coloreTerritorio(rami[0])}"></span>${esc(nomeNervo(nervo))}</button>`;
        const sotto = rami.length > 1 || TERRITORI[rami[0]].nome !== nomeNervo(nervo)
          ? rami.map((t) => `<button class="voce ramo${stato.terr.has(t) && !tutti ? " attivo" : ""}" data-terr="${t}">${esc(TERRITORI[t].nome)}</button>`).join("")
          : "";
        return voce + sotto;
      })
      .join("")}`;
}

function disegnaMappe() {
  document.querySelectorAll("#modi [data-modo]").forEach((b) => b.classList.toggle("attivo", b.dataset.modo === stato.modo));
  $("#mappe").innerHTML = svgRegione(stato.regione, { modo: stato.modo, derm: stato.derm, terr: stato.terr });
  const legenda = {
    dermatomi: "Colori: dermatomi. Pallini neri: punti sensitivi chiave ISNCSCI (passa sopra per la descrizione).",
    territori: "Colori: nervo di appartenenza; i confini bianchi separano i singoli rami cutanei. Passa sopra un'area per il nome.",
    sovrapposizione: `Campitura: territori dei nervi cutanei. Linee tratteggiate: confini dei dermatomi; <span class="tratteggio"></span>dermatomo selezionato.`,
  };
  $("#legenda").innerHTML = legenda[stato.modo];
}

// --- Pannello informazioni
function infoDermatoma(r) {
  const d = DERMATOMI[r];
  const regione = Object.values(REGIONI).find((x) => x.LIVELLI.some((g) => g.lesioni.some((l) => l.radice === r)));
  const gruppo = regione?.LIVELLI.find((g) => g.lesioni.some((l) => l.radice === r));
  return `<h3><span class="pallino" style="background:${d.colore}"></span>Dermatomo ${r}</h3>
    <dl class="scheda-nervo">
      <dt>Area</dt><dd>${esc(d.area)}</dd>
      <dt>Punto chiave</dt><dd>${esc(d.punto)} <span class="piccolo">(ISNCSCI)</span></dd>
      ${NOTE_RADICI[r] ? `<dt>Radicolopatia</dt><dd>${esc(NOTE_RADICI[r])}</dd>` : ""}
    </dl>
    ${gruppo ? `<p><a class="btn" href="movimenti.html#nervo=${gruppo.id}&lesione=radice-${r}">Simula la lesione della radice ${r} →</a></p>` : ""}`;
}

function infoNervo(nervo) {
  const rami = territoriRegione(stato.regione).filter((t) => TERRITORI[t].nervo === nervo);
  const scheda = REGIONI[stato.regione].nervoPerId[nervo];
  const origine = TERRITORI[rami[0]]?.origine;
  return `<h3><span class="pallino" style="background:${coloreTerritorio(rami[0])}"></span>${esc(nomeNervo(nervo))}</h3>
    ${origine ? `<p class="piccolo">${esc(origine)}</p>` : ""}
    <dl class="scheda-nervo">${rami
      .map((t) => `<dt${stato.terr.has(t) ? ' style="color:var(--accento)"' : ""}>${esc(TERRITORI[t].nome)}<br><span class="piccolo">${esc(TERRITORI[t].radici)}</span></dt><dd>${esc(TERRITORI[t].descrizione)}</dd>`)
      .join("")}</dl>
    ${scheda ? `<p><a class="btn" href="anatomia.html#${nervo}">Scheda del nervo →</a> <a class="btn" href="movimenti.html#nervo=${nervo}">Simula una lesione →</a></p>` : ""}`;
}

function disegnaInfo() {
  const confronto = stato.confronto && CONFRONTI[stato.regione].find((c) => c.id === stato.confronto);
  let html = "";
  if (confronto) {
    html += `<p class="piccolo" style="margin:0 0 4px">Confronto: <strong>${esc(confronto.titolo)}</strong> — tratteggio: ${esc(confronto.a)}; campitura: ${esc(confronto.b)}.</p>`;
  }
  for (const r of stato.derm) html += infoDermatoma(r);
  const nervi = [...new Set([...stato.terr].map((t) => TERRITORI[t].nervo))];
  for (const n of nervi) html += infoNervo(n);
  $("#info").innerHTML = html || `<h3>Come si usa</h3>
    <ul class="piccolo" style="padding-left:18px;margin:0">
      <li><strong>Dermatomi</strong>: area cutanea innervata da una radice; utile per riconoscere una radicolopatia.</li>
      <li><strong>Nervi cutanei</strong>: territorio di ciascun ramo; utile per distinguere una lesione di nervo e la sua sede (es. il ramo cutaneo palmare del mediano è risparmiato nel tunnel carpale).</li>
      <li><strong>Sovrapposizione</strong>: confronta un dermatomo e un territorio nervoso sulla stessa mappa.</li>
      <li>Nel simulatore <a href="movimenti.html">Movimenti 3D</a> ogni lesione mostra anche l'area sensitiva attesa.</li>
    </ul>`;
}

// --- Confronti
function tabellaConfronto(c, conPulsante = true) {
  return `<div class="confronto" id="confronto-${c.id}">
    <h4 style="margin:0 0 6px">${esc(c.titolo)}</h4>
    <div class="tabella-scorri"><table>
      <thead><tr><th></th><th><span class="legenda-sens" style="display:inline"><span class="tratteggio"></span></span>${esc(c.a)}</th><th><span class="pallino" style="background:${coloreTerritorio(c.territori[0])}"></span>${esc(c.b)}</th></tr></thead>
      <tbody>${c.righe.map(([k, a, b]) => `<tr><td>${esc(k)}</td><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join("")}</tbody>
    </table></div>
    ${conPulsante ? `<p style="margin-top:8px"><button class="btn${stato.confronto === c.id ? " attivo" : ""}" data-confronto="${c.id}">Mostra sulle mappe</button></p>` : ""}
  </div>`;
}
const disegnaConfronti = () => ($("#confronti").innerHTML = CONFRONTI[stato.regione].map((c) => tabellaConfronto(c)).join(""));

function aggiorna({ indirizzo = true } = {}) {
  const r = REGIONI[stato.regione];
  document.title = `Sensibilità · ${r.nome} · SNP`;
  $("#titolo").textContent = `Sensibilità · ${r.nome}`;
  $("#scelta-regione").innerHTML = Object.values(REGIONI)
    .map((x) => `<a class="btn${x.id === stato.regione ? " attivo" : ""}" href="#regione=${x.id}">${x.nome}</a>`)
    .join("");
  disegnaElenco();
  disegnaMappe();
  disegnaInfo();
  disegnaConfronti();
  if (indirizzo) scriviIndirizzo();
}

// --- Selezione
function scegliRadice(r) {
  stato.confronto = null;
  stato.derm = stato.derm.has(r) && stato.derm.size === 1 ? new Set() : new Set([r]);
  if (stato.modo === "territori") stato.modo = stato.terr.size ? "sovrapposizione" : "dermatomi";
  if (stato.modo === "dermatomi") { stato.terr = new Set(); stato.nervo = null; }
}
function scegliTerritori(lista, nervo) {
  stato.confronto = null;
  const uguale = lista.length === stato.terr.size && lista.every((t) => stato.terr.has(t));
  stato.terr = uguale ? new Set() : new Set(lista);
  stato.nervo = uguale ? null : nervo;
  if (stato.modo === "dermatomi") stato.modo = stato.derm.size ? "sovrapposizione" : "territori";
  if (stato.modo === "territori") stato.derm = new Set();
}

document.addEventListener("click", (ev) => {
  const el = ev.target.closest("[data-radice],[data-nervo],[data-terr],[data-derm],[data-modo],[data-confronto],#azzera");
  if (!el) return;
  if (el.id === "azzera") {
    stato.derm = new Set(); stato.terr = new Set(); stato.nervo = null; stato.confronto = null;
  } else if (el.dataset.modo) {
    stato.modo = el.dataset.modo;
    if (stato.modo === "dermatomi") { stato.terr = new Set(); stato.nervo = null; stato.confronto = null; }
    if (stato.modo === "territori") { stato.derm = new Set(); stato.confronto = null; }
  } else if (el.dataset.confronto) {
    const c = CONFRONTI[stato.regione].find((x) => x.id === el.dataset.confronto);
    Object.assign(stato, { confronto: c.id, modo: "sovrapposizione", derm: new Set([c.dermatoma]), terr: new Set(c.territori), nervo: null });
    aggiorna();
    $("#sezione-mappe").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  } else if (el.dataset.radice || el.dataset.derm) {
    scegliRadice(el.dataset.radice || el.dataset.derm);
  } else if (el.dataset.nervo) {
    scegliTerritori(territoriRegione(stato.regione).filter((t) => TERRITORI[t].nervo === el.dataset.nervo), el.dataset.nervo);
  } else if (el.dataset.terr) {
    scegliTerritori([el.dataset.terr], TERRITORI[el.dataset.terr].nervo);
  }
  aggiorna();
});

window.addEventListener("hashchange", () => {
  const atteso = location.hash;
  leggiIndirizzo();
  aggiorna({ indirizzo: false });
  if (location.hash !== atteso) scriviIndirizzo();
});
leggiIndirizzo();
aggiorna();
