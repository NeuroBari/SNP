import { NERVI, PLESSO, muscoliDelNervo, nervoPerId } from "./data/arto-superiore.js";
import { MUSCOLI } from "./data/arto-superiore.js";
import { FONTI } from "./data/fonti.js";
import { coloreNervo } from "./colori.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

// --- Elenco dei nervi
function disegnaElenco(attivo) {
  const gruppi = {};
  NERVI.forEach((n) => (gruppi[n.gruppo] ||= []).push(n));
  $("#elenco-nervi").innerHTML = Object.entries(gruppi)
    .map(
      ([g, lista]) =>
        `<h4>${esc(g)}</h4>` +
        lista
          .map((n) => `<button data-nervo="${n.id}" class="${n.id === attivo ? "attivo" : ""}"><span class="pallino" style="background:${coloreNervo(n.id)}"></span>${esc(n.nome)}</button>`)
          .join("")
    )
    .join("");
}

// --- Schema del plesso (SVG)
function disegnaPlesso() {
  const nodi = Object.fromEntries(PLESSO.nodi.map((n) => [n.id, n]));
  const archi = PLESSO.archi
    .map(([a, b]) => {
      const p = nodi[a], q = nodi[b];
      const mx = (p.x + q.x) / 2;
      const colore = nervoPerId[b] ? coloreNervo(b) : null;
      return `<path class="arco" d="M${p.x},${p.y} C${mx},${p.y} ${mx},${q.y} ${q.x},${q.y}"${colore ? ` style="stroke:${colore};opacity:.85"` : ""}/>`;
    })
    .join("");
  const etichetta = (n) => {
    if (n.tipo === "radice") return `<text x="${n.x - 12}" y="${n.y + 4}" text-anchor="end" font-weight="600">${n.id}</text>`;
    if (n.tipo === "divisione") return `<text x="${n.x}" y="${n.y - 7}" text-anchor="middle" font-size="10">${n.id[1]}</text>`;
    if (n.tipo === "terminale") return `<text x="${n.x + 10}" y="${n.y + 4}" font-weight="600">${esc(n.etichetta)}</text>`;
    if (n.tipo === "collaterale") return `<text x="${n.x + 8}" y="${n.y + 4}" font-style="italic">${esc(n.etichetta)}</text>`;
    return `<text x="${n.x}" y="${n.y - 10}" text-anchor="middle">${esc(n.etichetta)}</text>`;
  };
  const nodiSvg = PLESSO.nodi
    .map((n) => {
      const cliccabile = !!nervoPerId[n.id];
      const r = n.tipo === "divisione" ? 3.5 : 6;
      const fill = cliccabile ? coloreNervo(n.id) : "var(--testo-2)";
      return `<g class="nodo${cliccabile ? " cliccabile" : ""}"${cliccabile ? ` data-nervo="${n.id}" tabindex="0" role="button"` : ""}>
        <circle cx="${n.x}" cy="${n.y}" r="${r}" fill="${fill}"/>${etichetta(n)}</g>`;
    })
    .join("");
  const colonne = [[50, "Radici"], [190, "Tronchi"], [300, "Divisioni"], [430, "Corde"], [630, "Nervi terminali"]]
    .map(([x, t]) => `<text class="titolo-colonna" x="${x}" y="395" text-anchor="middle">${t}</text>`)
    .join("");
  $("#plesso").innerHTML = `<svg viewBox="0 0 760 405" role="img" aria-label="Schema del plesso brachiale">${archi}${nodiSvg}${colonne}</svg>`;
}

// --- Scheda del nervo
function disegnaScheda(id) {
  const n = nervoPerId[id];
  if (!n) return;
  const muscoli = muscoliDelNervo(id);
  const lista = (arr) => `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
  const nomeMuscolo = (mid) => MUSCOLI.find((m) => m.id === mid)?.nome || mid;
  $("#scheda-nervo").innerHTML = `
    <h2 style="margin-top:0"><span class="pallino" style="background:${coloreNervo(id)};width:14px;height:14px"></span>${esc(n.nome)}</h2>
    <dl class="scheda-nervo">
      <dt>Origine</dt><dd>${esc(n.origine)}</dd>
      <dt>Decorso</dt><dd>${esc(n.decorso)}</dd>
      <dt>Rami</dt><dd>${lista(n.rami)}</dd>
      <dt>Territorio sensitivo</dt><dd>${esc(n.sensitivo)}</dd>
    </dl>
    <h3>Muscoli innervati</h3>
    <div class="tabella-scorri"><table>
      <thead><tr><th>Muscolo</th><th>Radici</th><th>Azione</th><th>Test clinico</th></tr></thead>
      <tbody>${muscoli
        .map(
          (m) => `<tr><td><strong>${esc(m.nome)}</strong>${m.ramo ? `<br><span class="piccolo">ramo: ${esc(m.ramo)}</span>` : ""}${m.nota ? `<br><span class="piccolo">${esc(m.nota)}</span>` : ""}</td>
          <td>${esc(m.radici)}</td><td>${esc(m.azione)}</td><td>${esc(m.test)}</td></tr>`
        )
        .join("")}</tbody>
    </table></div>
    <h3>Siti di lesione</h3>
    ${n.lesioni
      .map(
        (l) => `<div class="lesione"><strong>${esc(l.nome)}</strong>
        <span class="piccolo">${l.muscoli.length ? "Muscoli colpiti: " + l.muscoli.map(nomeMuscolo).map(esc).join(", ") : "Nessun deficit motorio"}</span>
        <div>${esc(l.note)}</div></div>`
      )
      .join("")}
    ${n.perle.length ? `<h3>Punti chiave</h3>${lista(n.perle)}` : ""}
    <p><a class="btn" href="movimenti.html#nervo=${id}">Apri nel modello 3D →</a></p>
    <p class="fonti-voce">Fonti: ${n.fonti.map((f) => esc(FONTI[f]?.breve || f)).join("; ")}</p>`;
}

// --- Tabella di tutti i muscoli
function disegnaTabella(filtro = "") {
  const f = filtro.trim().toLowerCase();
  const righe = MUSCOLI.filter((m) => {
    if (!f) return true;
    const nervi = m.nervi.map((id) => nervoPerId[id].nome).join(" ");
    return [m.nome, nervi, m.radici, m.azione].join(" ").toLowerCase().includes(f);
  });
  $("#tabella-muscoli").innerHTML = righe
    .map(
      (m) => `<tr><td><strong>${esc(m.nome)}</strong></td>
      <td>${m.nervi.map((id) => `<span class="chip"><span class="pallino" style="background:${coloreNervo(id)}"></span>${esc(nervoPerId[id].nome)}</span>`).join("")}${m.ramo ? `<br><span class="piccolo">${esc(m.ramo)}</span>` : ""}</td>
      <td>${esc(m.radici)}</td><td>${esc(m.azione)}</td><td>${esc(m.test)}</td></tr>`
    )
    .join("");
}

function seleziona(id) {
  if (!nervoPerId[id]) id = "radiale";
  disegnaElenco(id);
  disegnaScheda(id);
  if (location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`);
}

document.addEventListener("click", (ev) => {
  const el = ev.target.closest("[data-nervo]");
  if (!el) return;
  seleziona(el.dataset.nervo);
  if (el.closest("#plesso")) $("#scheda-nervo").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter" && ev.target.matches?.("#plesso [data-nervo]")) ev.target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
});
$("#cerca-muscolo").addEventListener("input", (ev) => disegnaTabella(ev.target.value));

disegnaPlesso();
disegnaTabella();
seleziona(location.hash.slice(1));
