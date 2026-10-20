import { RIFLESSI, CATEGORIE, SCALA_NINDS } from "./data/riflessi.js";
import { REGIONI, regioneDelNervo } from "./data/regioni.js";
import { FONTI } from "./data/fonti.js";
import { coloreNervo } from "./colori.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const fonte = (k) => (FONTI[k]?.url ? `<a href="${FONTI[k].url}">${esc(FONTI[k].breve)}</a>` : esc(FONTI[k]?.breve || k));

const nomeNervo = (id) => regioneDelNervo(id)?.nervoPerId[id].nome || id;
const nomeMuscolo = (id) => {
  for (const r of Object.values(REGIONI)) if (r.muscoloPerId[id]) return r.muscoloPerId[id].nome;
  return id;
};

function scheda(r) {
  const nervi = r.nervi.length
    ? r.nervi.map((n) => `<a class="chip" href="anatomia.html#${n}"><span class="pallino" style="background:${coloreNervo(n)}"></span>${esc(nomeNervo(n))}</a>`).join("")
    : `<span class="piccolo">${esc(r.via || "")}</span>`;
  return `<article class="scheda riflesso" id="${r.id}" data-categoria="${r.categoria}">
    <span class="etichetta${r.categoria !== "osteotendineo" && r.categoria !== "superficiale" ? " patologico" : ""}">${esc(CATEGORIE[r.categoria].breve)} · ${esc(r.sede)}</span>
    <h3>${esc(r.nome)}</h3>
    <dl class="scheda-nervo">
      <dt>Livello</dt><dd>${esc(r.radici)}</dd>
      <dt>Nervi</dt><dd>${nervi}</dd>
      ${r.muscoli.length ? `<dt>Muscoli</dt><dd>${r.muscoli.map(nomeMuscolo).map(esc).join(", ")}</dd>` : ""}
      <dt>Tecnica</dt><dd>${esc(r.tecnica)}</dd>
      <dt>Risposta</dt><dd>${esc(r.risposta)}</dd>
      <dt>Significato</dt><dd>${esc(r.significato)}</dd>
    </dl>
    <p>${r.movimento ? `<a class="btn" href="movimenti.html#mov=${r.movimento}">Vedi il movimento nel 3D →</a>` : ""}</p>
    <p class="fonti-voce">Fonti: ${r.fonti.map(fonte).join("; ")}</p>
  </article>`;
}

function disegna(categoria) {
  const filtri = [["tutti", "Tutti"], ...Object.entries(CATEGORIE).map(([k, c]) => [k, c.breve])];
  $("#filtri").innerHTML = filtri.map(([k, n]) => `<a class="btn${k === categoria ? " attivo" : ""}" href="#${k}">${esc(n)}</a>`).join("");
  const gruppi = Object.entries(CATEGORIE).filter(([k]) => categoria === "tutti" || k === categoria);
  $("#elenco-riflessi").innerHTML = gruppi
    .map(([k, c]) => `<h2>${esc(c.nome)}</h2><p class="piccolo" style="margin-top:-6px">${esc(c.descrizione)}</p>
      <div class="griglia griglia-larga">${RIFLESSI.filter((r) => r.categoria === k).map(scheda).join("")}</div>`)
    .join("");
}

$("#scala-ninds").innerHTML = SCALA_NINDS.map((s) => `<tr><td><strong>${s.grado}</strong></td><td>${esc(s.descrizione)}</td></tr>`).join("");
$("#fonti-scala").innerHTML = ["hallett1993", "litvan1996", "campbell8"].map(fonte).join("; ");
$("#fonti-interpretazione").innerHTML = ["campbell8", "aids2023", "preston4", "eanpnsGbs2023", "schott2003", "jacobs1980"].map(fonte).join("; ");

// #id-riflesso apre la categoria e scorre alla scheda; #categoria filtra
function daFrammento() {
  const h = decodeURIComponent(location.hash.slice(1));
  const r = RIFLESSI.find((x) => x.id === h);
  disegna(r ? "tutti" : CATEGORIE[h] ? h : "tutti");
  if (r) document.getElementById(r.id)?.scrollIntoView({ block: "start" });
}
window.addEventListener("hashchange", daFrammento);
daFrammento();
