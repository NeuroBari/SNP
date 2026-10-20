import { Visualizzatore } from "./viewer3d.js";
import { MOVIMENTI, MUSCOLI, NERVI, muscoloPerId, nervoPerId, muscoliDelNervo, movimentiDelMuscolo, effettoLesione } from "./data/arto-superiore.js";
import { coloreNervo } from "./colori.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const ETICHETTE = { perso: "perso", ridotto: "ridotto", lieve: "lieve deficit", conservato: "conservato" };
const AMPIEZZA = { perso: 0.08, ridotto: 0.55, lieve: 0.85, conservato: 1 };
const COLORE_LESO = "#c0392b";
const VISTA_DISTRETTO = { Scapola: "scapola", Spalla: "generale", Gomito: "laterale", Avambraccio: "avambraccio", Polso: "mano", Dita: "mano", Pollice: "mano" };

const stato = { movimento: null, nervo: null, lesione: null, muscolo: null };

const viewer = new Visualizzatore($("#scena"), {
  onMuscoloClick: (id) => {
    stato.muscolo = id;
    aggiornaInfo();
  },
  onMuscoloHover: (id, ev) => {
    const t = $("#tooltip");
    if (!id) return (t.style.display = "none");
    const m = muscoloPerId[id];
    const r = $("#scena").getBoundingClientRect();
    t.textContent = `${m.nome} — ${m.nervi.map((n) => nervoPerId[n].nome).join(", ")}`;
    t.style.display = "block";
    t.style.left = `${ev.clientX - r.left + 12}px`;
    t.style.top = `${ev.clientY - r.top + 12}px`;
  },
});
viewer.aggiungiMuscoli(MUSCOLI);
window.viewer = viewer; // utile per il debug dalla console

const muscoliLesi = () => {
  if (!stato.nervo || !stato.lesione) return [];
  return nervoPerId[stato.nervo].lesioni.find((l) => l.id === stato.lesione)?.muscoli || [];
};
const chipNervo = (id) => `<span class="chip"><span class="pallino" style="background:${coloreNervo(id)}"></span>${esc(nervoPerId[id].nome)}</span>`;

// --- Colorazione del modello in base allo stato
function aggiornaColori() {
  const stati = {};
  const lesi = new Set(muscoliLesi());
  const base = { opacita: $("#tutti-muscoli").checked ? 0.28 : 0 };

  if (stato.nervo) {
    for (const m of muscoliDelNervo(stato.nervo)) {
      stati[m.id] = lesi.has(m.id) ? { colore: COLORE_LESO, opacita: 0.95 } : { colore: coloreNervo(stato.nervo), opacita: stato.lesione ? 0.5 : 0.95 };
    }
  }
  if (stato.movimento) {
    for (const { id, ruolo } of stato.movimento.muscoli) {
      const m = muscoloPerId[id];
      const colore = lesi.has(id) ? COLORE_LESO : coloreNervo(m.nervi[0]);
      stati[id] = { colore, opacita: ruolo === "principale" ? 0.97 : 0.7, emissivo: ruolo === "principale" ? 0x222222 : 0x000000 };
    }
  }
  if (stato.muscolo) {
    const m = muscoloPerId[stato.muscolo];
    stati[stato.muscolo] = { colore: stati[stato.muscolo]?.colore || coloreNervo(m.nervi[0]), opacita: 1, emissivo: 0x444444 };
  }
  viewer.coloraMuscoli(stati, { colore: 0xb35a50, opacita: base.opacita });
  viewer.ampiezza = stato.movimento && lesi.size ? AMPIEZZA[effettoLesione(stato.movimento, [...lesi])] : 1;
}

// --- Pannello sinistro: elenco movimenti
function disegnaMovimenti() {
  const gruppi = {};
  MOVIMENTI.forEach((m) => (gruppi[m.distretto] ||= []).push(m));
  const lesi = muscoliLesi();
  $("#tab-movimenti").innerHTML = Object.entries(gruppi)
    .map(
      ([g, lista]) =>
        `<div class="gruppo-mov"><h4>${esc(g)}</h4>${lista
          .map((m) => {
            const eff = lesi.length ? effettoLesione(m, lesi) : null;
            return `<button class="voce-mov${stato.movimento?.id === m.id ? " attivo" : ""}" data-mov="${m.id}">${esc(m.nome)}${
              eff && eff !== "conservato" ? `<span class="badge ${eff}">${ETICHETTE[eff]}</span>` : ""
            }</button>`;
          })
          .join("")}</div>`
    )
    .join("");
}

// --- Pannello sinistro: nervi e lesioni
function disegnaLesioni() {
  const sel = $("#sel-nervo");
  if (!sel.options.length) {
    sel.innerHTML = `<option value="">— scegli un nervo —</option>` + NERVI.map((n) => `<option value="${n.id}">${esc(n.nome)}</option>`).join("");
  }
  sel.value = stato.nervo || "";
  const n = stato.nervo && nervoPerId[stato.nervo];
  if (!n) {
    $("#siti-lesione").innerHTML = `<p class="piccolo">Scegli un nervo per vedere i muscoli che innerva e simulare una lesione.</p>`;
    $("#effetti-lesione").innerHTML = "";
    return;
  }
  const opzioni = [{ id: "", nome: "Nessuna lesione (mostra i muscoli innervati)" }, ...n.lesioni];
  $("#siti-lesione").innerHTML =
    `<div class="piccolo" style="margin-bottom:4px">Sede della lesione</div>` +
    opzioni
      .map((l) => `<label style="display:flex;gap:6px;align-items:flex-start;margin:4px 0;font-size:.9rem"><input type="radio" name="lesione" value="${l.id}"${(stato.lesione || "") === l.id ? " checked" : ""}>${esc(l.nome)}</label>`)
      .join("");

  const lesi = muscoliLesi();
  if (!stato.lesione) {
    $("#effetti-lesione").innerHTML = `<div class="piccolo">${muscoliDelNervo(n.id).length} muscoli innervati, evidenziati in ${chipNervo(n.id)}</div>`;
    return;
  }
  const lesione = n.lesioni.find((l) => l.id === stato.lesione);
  const ordine = { perso: 0, ridotto: 1, lieve: 2 };
  const colpiti = MOVIMENTI.map((m) => [m, effettoLesione(m, lesi)])
    .filter(([, e]) => e !== "conservato")
    .sort((a, b) => ordine[a[1]] - ordine[b[1]]);
  $("#effetti-lesione").innerHTML = `
    <p class="piccolo">${esc(lesione.note)}</p>
    <div class="piccolo" style="margin:8px 0 4px">Movimenti compromessi (clic per animare)</div>
    ${
      colpiti.length
        ? colpiti.map(([m, e]) => `<button class="voce-mov${stato.movimento?.id === m.id ? " attivo" : ""}" data-mov="${m.id}">${esc(m.nome)}<span class="badge ${e}">${ETICHETTE[e]}</span></button>`).join("")
        : `<p class="piccolo">Nessun deficit motorio: lesione puramente sensitiva.</p>`
    }`;
}

// --- Pannello destro: informazioni
function aggiornaInfo() {
  let html = "";
  const lesi = muscoliLesi();
  const mv = stato.movimento;
  if (mv) {
    const eff = lesi.length ? effettoLesione(mv, lesi) : null;
    html += `<span class="etichetta">${esc(mv.distretto)}</span><h3 style="margin-top:0">${esc(mv.nome)}</h3>
      ${eff ? `<p>Con la lesione selezionata: <span class="badge ${eff}">${ETICHETTE[eff]}</span></p>` : ""}
      ${mv.nota ? `<p class="piccolo">${esc(mv.nota)}</p>` : ""}
      <table><thead><tr><th>Muscolo</th><th>Nervo · radici</th></tr></thead><tbody>
      ${mv.muscoli
        .map(({ id, ruolo }) => {
          const m = muscoloPerId[id];
          return `<tr style="${lesi.includes(id) ? "color:var(--perso)" : ""}"><td><a href="#" data-muscolo="${id}">${esc(m.nome)}</a>${ruolo === "accessorio" ? ' <span class="piccolo">(accessorio)</span>' : ""}</td>
            <td>${m.nervi.map(chipNervo).join("")}<div class="piccolo">${m.ramo ? `${esc(m.ramo)} · ` : ""}${esc(m.radici)}</div></td></tr>`;
        })
        .join("")}</tbody></table>`;
  } else {
    html += `<h3 style="margin-top:0">Come si usa</h3>
      <ul class="piccolo" style="padding-left:18px">
        <li>Scegli un <strong>movimento</strong>: il modello lo esegue e colora i muscoli principali con il colore del nervo che li innerva (in trasparenza gli accessori).</li>
        <li>In <strong>Nervi e lesioni</strong> scegli un nervo e una sede: i muscoli denervati diventano rossi, i movimenti compromessi vengono elencati e animati con escursione ridotta.</li>
        <li>Clicca un muscolo nel modello per la scheda.</li>
      </ul>
      <div class="piccolo">${NERVI.map((n) => chipNervo(n.id)).join("")}</div>`;
  }
  if (stato.muscolo) {
    const m = muscoloPerId[stato.muscolo];
    const altri = movimentiDelMuscolo(m.id);
    html += `<div class="info-muscolo"><h4>${esc(m.nome)}</h4>
      <div>${m.nervi.map(chipNervo).join("")} <span class="piccolo">${esc(m.radici)}</span></div>
      <p><strong>Azione:</strong> ${esc(m.azione)}</p>
      <p><strong>Test:</strong> ${esc(m.test)}</p>
      ${m.nota ? `<p class="piccolo">${esc(m.nota)}</p>` : ""}
      ${altri.length ? `<div class="piccolo">Partecipa a: ${altri.map((x) => `<a href="#" data-mov="${x.id}">${esc(x.nome)}</a>`).join(", ")}</div>` : ""}
      <p class="piccolo"><a href="anatomia.html#${m.nervi[0]}">Scheda del nervo →</a></p></div>`;
  }
  $("#info").innerHTML = html;
}

function aggiornaTutto() {
  disegnaMovimenti();
  disegnaLesioni();
  aggiornaInfo();
  aggiornaColori();
}

function scegliMovimento(id) {
  const mv = MOVIMENTI.find((m) => m.id === id) || null;
  stato.movimento = stato.movimento?.id === id ? null : mv;
  viewer.impostaMovimento(stato.movimento);
  const vista = VISTA_DISTRETTO[stato.movimento?.distretto];
  if (vista && vista !== stato.vista) viewer.vista((stato.vista = vista));
  aggiornaTutto();
}

function mostraTab(nome) {
  document.querySelectorAll("[data-tab]").forEach((b) => b.classList.toggle("attivo", b.dataset.tab === nome));
  $("#tab-movimenti").hidden = nome !== "movimenti";
  $("#tab-lesioni").hidden = nome !== "lesioni";
}

// --- Eventi
document.addEventListener("click", (ev) => {
  const mov = ev.target.closest("[data-mov]");
  if (mov) {
    ev.preventDefault();
    return scegliMovimento(mov.dataset.mov);
  }
  const mu = ev.target.closest("[data-muscolo]");
  if (mu) {
    ev.preventDefault();
    stato.muscolo = mu.dataset.muscolo;
    aggiornaInfo();
    return aggiornaColori();
  }
  const tab = ev.target.closest("[data-tab]");
  if (tab) return mostraTab(tab.dataset.tab);
  const vista = ev.target.closest("[data-vista]");
  if (vista) return viewer.vista(vista.dataset.vista);
});
$("#sel-nervo").addEventListener("change", (ev) => {
  stato.nervo = ev.target.value || null;
  stato.lesione = null;
  aggiornaTutto();
});
$("#siti-lesione").addEventListener("change", (ev) => {
  if (ev.target.name !== "lesione") return;
  stato.lesione = ev.target.value || null;
  aggiornaTutto();
});
$("#pausa").addEventListener("click", (ev) => {
  viewer.inPausa = !viewer.inPausa;
  ev.target.textContent = viewer.inPausa ? "Riprendi" : "Pausa";
});
$("#velocita").addEventListener("input", (ev) => (viewer.velocita = Number(ev.target.value)));
$("#tutti-muscoli").addEventListener("change", aggiornaColori);

// Link diretti: movimenti.html#nervo=radiale oppure #mov=el-flex
const parametri = new URLSearchParams(location.hash.slice(1));
if (nervoPerId[parametri.get("nervo")]) {
  stato.nervo = parametri.get("nervo");
  mostraTab("lesioni");
}
aggiornaTutto();
if (parametri.get("mov")) scegliMovimento(parametri.get("mov"));
