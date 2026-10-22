import { REGIONI } from "./data/regioni.js";
import { localizza } from "./data/localizza.js";
import { coloreNervo } from "./colori.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const BADGE = { compatibile: "conservato", parziale: "ridotto", "poco compatibile": "perso" };

let regione = REGIONI[location.hash.slice(1)] || REGIONI.superiore;
let mrc = {};
let aperto = null; // muscolo di cui mostrare la tecnica del test

const nomeMuscolo = (id) => regione.muscoloPerId[id].nome;
const elenco = (ids) => ids.map(nomeMuscolo).map(esc).join(", ");

function disegnaTabella() {
  const { MUSCOLI_CHIAVE, muscoloPerId, nervoPerId } = regione;
  $("#righe").innerHTML = MUSCOLI_CHIAVE.map((k) => {
    const m = muscoloPerId[k.id];
    const g = mrc[k.id] ?? 5;
    const nervi = m.nervi.map((n) => `<span class="pallino" style="background:${coloreNervo(n)}"></span>${esc(nervoPerId[n].nome.replace(/^Nn?\. /, ""))}`).join("<br>");
    return `<tr class="${g < 5 ? "debole" : ""}">
      <td>${esc(k.movimento)}</td>
      <td><a href="#" data-test="${k.id}">${esc(m.nome)}</a>${aperto === k.id ? `<div class="piccolo">${esc(m.test)}</div>` : ""}</td>
      <td class="piccolo">${nervi}${m.ramo ? `<div>${esc(m.ramo)}</div>` : ""}</td>
      <td>${k.radici.length > 2 ? `${k.radici[0]}–${k.radici.at(-1)}` : k.radici.join("–")}</td>
      <td><span class="mrc" role="group" aria-label="Grado MRC di ${esc(m.nome)}">${[0, 1, 2, 3, 4, 5]
        .map((v) => `<button class="${v === g ? `sel${g < 5 ? " deb" : ""}` : ""}" data-mrc="${k.id}" data-valore="${v}" aria-pressed="${v === g}">${v}</button>`)
        .join("")}</span></td>
    </tr>`;
  }).join("");
}

function disegnaRisultati() {
  const risultati = localizza(regione, mrc);
  const deboli = regione.MUSCOLI_CHIAVE.filter((k) => (mrc[k.id] ?? 5) < 5);
  if (!deboli.length) {
    $("#risultati").innerHTML = `<h3 style="margin-top:0">Sedi compatibili</h3><p class="piccolo">Tutti i muscoli sono normali. Imposta un grado MRC inferiore a 5 per i muscoli deboli, oppure scegli un esempio.</p>`;
    return;
  }
  $("#risultati").innerHTML = `<h3 style="margin-top:0">Sedi compatibili</h3>
    <p class="piccolo">Muscoli deboli: ${deboli.map((k) => `${esc(nomeMuscolo(k.id))} (${mrc[k.id]})`).join(", ")}</p>
    ${risultati.length ? risultati.map((r, i) => `
      <div class="esito">
        <div class="esito-titolo"><strong>${i + 1}. ${esc(r.nome)}</strong><span class="badge ${BADGE[r.classe]}">${r.classe}</span></div>
        <ul class="piccolo">
          <li>Spiega: ${elenco(r.spiegati)}</li>
          ${r.nonSpiegati.length ? `<li>Non spiega la debolezza di: ${elenco(r.nonSpiegati)}</li>` : ""}
          ${r.contraddizioni.length ? `<li>Dovrebbero essere deboli ma sono normali: ${elenco(r.contraddizioni)}</li>` : ""}
          ${r.attesiNormali.length ? `<li>Potrebbero essere coinvolti ma sono normali: ${elenco(r.attesiNormali)}</li>` : ""}
        </ul>
        <a class="piccolo" href="movimenti.html#nervo=${r.sorgente}&lesione=${r.sito}">Vedi la lesione nel 3D →</a>
      </div>`).join("") : `<p class="piccolo">Nessuna sede presente nei dati spiega questo quadro.</p>`}
    <div class="avviso" style="margin-top:12px">Completa con sensibilità, riflessi (<a href="riflessi.html">Riflessi</a>) ed elettrodiagnostica. Esercizio didattico: non sostituisce il ragionamento clinico.</div>`;
}

function disegna() {
  document.title = `Esame obiettivo · ${regione.nome} · SNP`;
  $("#titolo").textContent = `Esame obiettivo · ${regione.nome}`;
  $("#scelta-regione").innerHTML = Object.values(REGIONI)
    .map((r) => `<a class="btn${r === regione ? " attivo" : ""}" href="#${r.id}">${r.nome}</a>`)
    .join("");
  $("#esempi").innerHTML = regione.ESEMPI_ESAME.map((e, i) => `<button class="btn" data-esempio="${i}">${esc(e.nome)}</button>`).join("");
  disegnaTabella();
  disegnaRisultati();
}

document.addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-mrc]");
  if (b) {
    mrc[b.dataset.mrc] = Number(b.dataset.valore);
    disegnaTabella();
    return disegnaRisultati();
  }
  const t = ev.target.closest("[data-test]");
  if (t) {
    ev.preventDefault();
    aperto = aperto === t.dataset.test ? null : t.dataset.test;
    return disegnaTabella();
  }
  const e = ev.target.closest("[data-esempio]");
  if (e) {
    mrc = { ...regione.ESEMPI_ESAME[Number(e.dataset.esempio)].mrc };
    disegnaTabella();
    return disegnaRisultati();
  }
  if (ev.target.closest("#azzera")) {
    mrc = {};
    disegnaTabella();
    disegnaRisultati();
  }
});
window.addEventListener("hashchange", () => {
  regione = REGIONI[location.hash.slice(1)] || REGIONI.superiore;
  mrc = {};
  aperto = null;
  disegna();
});
disegna();
