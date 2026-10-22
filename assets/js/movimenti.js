import { Visualizzatore } from "./viewer3d.js";
import { REGIONI, regioneDelNervo, effettoLesione } from "./data/regioni.js";
import { coloreNervo } from "./colori.js";
import { RIFLESSI, riflessoColpito, segnoNonEvocabile } from "./data/riflessi.js";
import { radiciDi } from "./data/lesioni-prossimali.js";
import { areaSensitiva } from "./data/sensibilita.js";
import { svgArea } from "./mappa-sensitiva.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const ETICHETTE = { perso: "perso", ridotto: "ridotto", lieve: "lieve deficit", conservato: "conservato" };
const AMPIEZZA = { perso: 0.08, ridotto: 0.55, lieve: 0.85, conservato: 1 };
const COLORE_LESO = "#c0392b";
const COLORE_LIEVE = "#e08e0b";

// Regione scelta dal link: movimenti.html#regione=inferiore, #nervo=peroneo&lesione=testa-fibula,
// #nervo=tronchi-brachiali&lesione=tronco-superiore, #att=erb oppure #mov=ank-df
const parametri = new URLSearchParams(location.hash.slice(1));
const regione =
  REGIONI[parametri.get("regione")] ||
  regioneDelNervo(parametri.get("nervo")) ||
  Object.values(REGIONI).find((r) => r.MOVIMENTI.some((m) => m.id === parametri.get("mov"))) ||
  Object.values(REGIONI).find((r) => r.ATTEGGIAMENTI.some((a) => a.id === parametri.get("att"))) ||
  REGIONI.superiore;
const { MOVIMENTI, MUSCOLI, NERVI, LIVELLI, ATTEGGIAMENTI, muscoloPerId, nervoPerId, sorgentePerId, muscoliDelNervo, movimentiDelMuscolo, VISTE_DISTRETTO } = regione;
document.title = `Movimenti 3D · ${regione.nome} · SNP`;
// Modello: realistico (Z-Anatomy) dove disponibile, altrimenti schematico; #modello=schematico per forzarlo
const modello = regione.modelloRealistico && parametri.get("modello") !== "schematico" ? "realistico" : "schematico";
const ISTRUZIONI = "Trascina per ruotare, rotella per zoom, clic su un muscolo per i dettagli.";
const CREDITI = `Modello anatomico: <a href="https://www.z-anatomy.com/" target="_blank" rel="noopener">Z-Anatomy</a>
  (<a href="https://creativecommons.org/licenses/by-sa/4.0/deed.it" target="_blank" rel="noopener">CC BY-SA 4.0</a>),
  derivato da BodyParts3D © DBCLS (CC BY-SA 2.1 JP); modificato. <a href="fonti.html#modelli-3d">Dettagli</a>`;
document.getElementById("legenda").innerHTML =
  modello === "realistico"
    ? `${regione.modello} · <span id="stato-caricamento">caricamento del modello…</span><br><span class="piccolo">${CREDITI}</span>`
    : `${regione.modello} · modello schematico. ${ISTRUZIONI}`;
document.getElementById("scelta-modello").innerHTML = regione.modelloRealistico
  ? ["realistico", "schematico"]
      .map((m) => `<a class="btn${m === modello ? " attivo" : ""}" href="#regione=${regione.id}&modello=${m}">${m === "realistico" ? "Realistico" : "Schematico"}</a>`)
      .join("")
  : "";
document.getElementById("controllo-nervi").hidden = modello !== "realistico";
document.getElementById("scelta-regione").innerHTML = Object.values(REGIONI)
  .map((r) => `<a class="btn${r === regione ? " attivo" : ""}" href="#regione=${r.id}">${r.nome}</a>`)
  .join("");
window.addEventListener("hashchange", () => location.reload());

// `nervo` può essere un nervo o un gruppo di lesioni prossimali (radici, tronchi, corde, plesso)
const stato = { movimento: null, nervo: null, lesione: null, muscolo: null, atteggiamento: null };

// Descrizione breve di una struttura del modello (muscolo o nervo)
function descrivi(info) {
  if (info.tipo === "nervo") return nervoPerId[info.id] ? `${nervoPerId[info.id].nome} — ${info.nome}` : `${regione.PLESSO.nome} — ${info.nome}`;
  const m = muscoloPerId[info.id];
  return m ? `${m.nome} — ${m.nervi.map((n) => nervoPerId[n].nome).join(", ")}` : `${info.nome} (senza scheda)`;
}

const viewer = new Visualizzatore($("#scena"), {
  regione: regione.id,
  modello,
  urlModello: regione.modelloRealistico,
  onCaricamento: (f) => {
    const el = $("#stato-caricamento");
    if (el && f != null) el.textContent = `caricamento del modello… ${Math.round(f * 100)}%`;
  },
  onMuscoloClick: (info) => {
    if (info.tipo === "nervo" && nervoPerId[info.id]) {
      stato.nervo = info.id;
      stato.lesione = null;
      mostraTab("lesioni");
      return aggiornaTutto();
    }
    if (!muscoloPerId[info.id]) return;
    stato.muscolo = info.id;
    aggiornaInfo();
    aggiornaColori();
  },
  onMuscoloHover: (info, ev) => {
    const t = $("#tooltip");
    if (!info) return (t.style.display = "none");
    const r = $("#scena").getBoundingClientRect();
    t.textContent = descrivi(info);
    t.style.display = "block";
    t.style.left = `${ev.clientX - r.left + 12}px`;
    t.style.top = `${ev.clientY - r.top + 12}px`;
  },
});
viewer.aggiungiMuscoli(MUSCOLI);
window.viewer = viewer; // utile per il debug dalla console
viewer.pronto
  .then(() => {
    const el = $("#stato-caricamento");
    if (el) el.textContent = ISTRUZIONI;
  })
  .catch((err) => {
    const el = $("#stato-caricamento");
    if (el) el.textContent = `errore nel caricamento del modello (${err.message}). Prova il modello schematico.`;
  });

const lesioneCorrente = () => (stato.nervo && stato.lesione && sorgentePerId[stato.nervo]?.lesioni.find((l) => l.id === stato.lesione)) || null;
const muscoliLesi = () => lesioneCorrente()?.muscoli || [];
const muscoliLievi = () => lesioneCorrente()?.lievi || [];
const opzioniEffetto = () => ({ lievi: muscoliLievi(), parziale: !!lesioneCorrente()?.parziale });
const chipNervo = (id) => `<span class="chip"><span class="pallino" style="background:${coloreNervo(id)}"></span>${esc(nervoPerId[id].nome)}</span>`;

// --- Colorazione del modello in base allo stato
function aggiornaColori() {
  const stati = {};
  const lesi = new Set(muscoliLesi());
  const lievi = new Set(muscoliLievi());
  const base = { opacita: $("#tutti-muscoli").checked ? 0.28 : 0 };

  for (const id of lievi) stati[id] = { colore: COLORE_LIEVE, opacita: 0.85 };
  for (const id of lesi) stati[id] = { colore: COLORE_LESO, opacita: 0.95 };
  if (nervoPerId[stato.nervo]) {
    for (const m of muscoliDelNervo(stato.nervo)) {
      stati[m.id] = lesi.has(m.id) ? { colore: COLORE_LESO, opacita: 0.95 } : { colore: coloreNervo(stato.nervo), opacita: stato.lesione ? 0.5 : 0.95 };
    }
  }
  if (stato.movimento) {
    for (const { id, ruolo } of stato.movimento.muscoli) {
      const m = muscoloPerId[id];
      const colore = lesi.has(id) ? COLORE_LESO : lievi.has(id) ? COLORE_LIEVE : coloreNervo(m.nervi[0]);
      stati[id] = { colore, opacita: ruolo === "principale" ? 0.97 : 0.7, emissivo: ruolo === "principale" ? 0x222222 : 0x000000 };
    }
  }
  if (stato.muscolo) {
    const m = muscoloPerId[stato.muscolo];
    stati[stato.muscolo] = { colore: stati[stato.muscolo]?.colore || coloreNervo(m.nervi[0]), opacita: 1, emissivo: 0x444444 };
  }
  viewer.coloraMuscoli(stati, { colore: 0xb35a50, opacita: base.opacita });

  // Nervi (solo modello realistico): evidenzia il nervo scelto e quelli dei muscoli del movimento
  const statiNervi = {};
  if (stato.movimento) for (const { id } of stato.movimento.muscoli) for (const n of muscoloPerId[id].nervi) statiNervi[n] = { colore: coloreNervo(n) };
  if (nervoPerId[stato.nervo]) statiNervi[stato.nervo] = { colore: stato.lesione ? COLORE_LESO : coloreNervo(stato.nervo) };
  for (const n of lesioneCorrente()?.nervi || []) statiNervi[n] = { colore: COLORE_LESO };
  const opacitaAltri = $("#mostra-nervi").checked ? (Object.keys(statiNervi).length ? 0.3 : 1) : 0;
  viewer.coloraNervi(statiNervi, { opacita: opacitaAltri });
  viewer.ampiezza = stato.movimento && (lesi.size || lievi.size) ? AMPIEZZA[effettoLesione(stato.movimento, [...lesi], opzioniEffetto())] : 1;
}

// --- Pannello sinistro: elenco movimenti
function disegnaMovimenti() {
  const gruppi = {};
  MOVIMENTI.forEach((m) => (gruppi[m.distretto] ||= []).push(m));
  const lesi = muscoliLesi();
  const conLesione = !!lesioneCorrente();
  $("#tab-movimenti").innerHTML = Object.entries(gruppi)
    .map(
      ([g, lista]) =>
        `<div class="gruppo-mov"><h4>${esc(g)}</h4>${lista
          .map((m) => {
            const eff = conLesione ? effettoLesione(m, lesi, opzioniEffetto()) : null;
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
    sel.innerHTML =
      `<option value="">— scegli un nervo, una radice o il plesso —</option>` +
      `<optgroup label="Nervi periferici">${NERVI.map((n) => `<option value="${n.id}">${esc(n.nome)}</option>`).join("")}</optgroup>` +
      `<optgroup label="Radici e plesso">${LIVELLI.map((g) => `<option value="${g.id}">${esc(g.nome)}</option>`).join("")}</optgroup>`;
  }
  sel.value = stato.nervo || "";
  const n = stato.nervo && sorgentePerId[stato.nervo];
  if (!n) {
    $("#siti-lesione").innerHTML = `<p class="piccolo">Scegli un nervo per vedere i muscoli che innerva e simulare una lesione, oppure una radice, un tronco, una corda o il plesso per confrontare i livelli di lesione.</p>`;
    $("#effetti-lesione").innerHTML = "";
    return;
  }
  const opzioni = n.gruppo ? n.lesioni : [{ id: "", nome: "Nessuna lesione (mostra i muscoli innervati)" }, ...n.lesioni];
  $("#siti-lesione").innerHTML =
    `<div class="piccolo" style="margin-bottom:4px">${n.gruppo ? "Livello della lesione" : "Sede della lesione"}</div>` +
    opzioni
      .map((l) => `<label style="display:flex;gap:6px;align-items:flex-start;margin:4px 0;font-size:.9rem"><input type="radio" name="lesione" value="${l.id}"${(stato.lesione || "") === l.id ? " checked" : ""}>${esc(l.nome)}</label>`)
      .join("");

  const lesione = lesioneCorrente();
  if (!lesione) {
    $("#effetti-lesione").innerHTML = n.gruppo ? "" : `<div class="piccolo">${muscoliDelNervo(n.id).length} muscoli innervati, evidenziati in ${chipNervo(n.id)}</div>`;
    return;
  }
  const lesi = lesione.muscoli;
  const ordine = { perso: 0, ridotto: 1, lieve: 2 };
  const colpiti = MOVIMENTI.map((m) => [m, effettoLesione(m, lesi, opzioniEffetto())])
    .filter(([, e]) => e !== "conservato")
    .sort((a, b) => ordine[a[1]] - ordine[b[1]]);
  const legenda = n.gruppo
    ? `<div class="piccolo" style="margin:6px 0"><span class="pallino" style="background:${COLORE_LESO}"></span>muscoli colpiti
        ${lesione.lievi?.length ? `<span class="pallino" style="background:${COLORE_LIEVE};margin-left:8px"></span>coinvolti in parte` : ""}</div>
       ${lesione.parziale ? `<p class="piccolo"><strong>Lesione radicolare:</strong> il deficit è di solito parziale, perché ogni muscolo riceve fibre da più radici; nessun movimento risulta del tutto perso.</p>` : ""}`
    : "";
  $("#effetti-lesione").innerHTML = `
    <p class="piccolo">${esc(lesione.note)}</p>
    ${legenda}
    <div class="piccolo" style="margin:8px 0 4px">Movimenti compromessi (clic per animare)</div>
    ${
      colpiti.length
        ? colpiti.map(([m, e]) => `<button class="voce-mov${stato.movimento?.id === m.id ? " attivo" : ""}" data-mov="${m.id}">${esc(m.nome)}<span class="badge ${e}">${ETICHETTE[e]}</span></button>`).join("")
        : `<p class="piccolo">Nessun deficit motorio: lesione puramente sensitiva.</p>`
    }
    ${riflessiLesione(lesione)}
    ${sensibilitaLesione(lesione)}`;
}

// Area di ipoestesia attesa (territori cutanei per nervi e corde, dermatomi per radici e tronchi)
function sensibilitaLesione(lesione) {
  const area = areaSensitiva(stato.nervo, lesione.id, lesione);
  const titolo = `<div class="piccolo" style="margin:12px 0 4px">Sensibilità${area.dermatomi.length ? ` (dermatom${area.dermatomi.length > 1 ? "i" : "o"} ${area.dermatomi.join(", ")})` : ""}</div>`;
  if (!area.territori.length && !area.dermatomi.length) return `${titolo}<p class="piccolo">${esc(area.nota)}</p>`;
  const p = new URLSearchParams({ regione: regione.id });
  if (area.dermatomi.length) p.set("derm", area.dermatomi.join(","));
  else p.set("terr", area.territori.join(","));
  return `${titolo}<div class="mappe-mini">${svgArea(regione.id, area)}</div>
    ${area.nota ? `<p class="piccolo">${esc(area.nota)}</p>` : ""}
    <a class="piccolo" href="sensibilita.html#${p}">Apri nella pagina Sensibilità →</a>`;
}

// Riflessi il cui arco passa per i muscoli denervati (per le radici: riflessi del livello leso);
// i riflessi patologici che dipendono da quei muscoli (es. Babinski con estensore dell'alluce
// paralizzato) non sono evocabili.
function riflessoDellaLesione(r, lesione) {
  if (lesione.radice) return ["osteotendineo", "superficiale"].includes(r.categoria) && radiciDi(r.radici).includes(lesione.radice);
  return riflessoColpito(r, lesione.muscoli);
}
function riflessiLesione(lesione) {
  const lesi = lesione.muscoli;
  const voci = RIFLESSI.filter((r) => muscoloPerId[r.muscoli[0]] || (lesione.radice && !r.muscoli.length)).flatMap((r) => {
    if (riflessoDellaLesione(r, lesione)) return [`<a class="voce-mov" href="riflessi.html#${r.id}">${esc(r.nome)}<span class="badge perso">ridotto/assente</span></a>`];
    if (!lesione.parziale && segnoNonEvocabile(r, lesi)) return [`<a class="voce-mov" href="riflessi.html#${r.id}">${esc(r.nome)}<span class="badge lieve">non evocabile</span></a>`];
    return [];
  });
  return voci.length ? `<div class="piccolo" style="margin:12px 0 4px">Riflessi</div>${voci.join("")}` : "";
}

// Riflessi che si osservano con questo movimento (risposta riflessa o arco condiviso)
function riflessiMovimento(mv, lesione) {
  const lista = RIFLESSI.filter((r) => r.movimento === mv.id);
  if (!lista.length) return "";
  return `<h4 style="margin:14px 0 4px">Riflessi correlati</h4><ul class="piccolo" style="padding-left:18px;margin:0">${lista
    .map((r) => {
      const livello = r.categoria === "patologico" ? "patologico" : r.categoria === "liberazione" ? "segno di liberazione frontale" : r.radici;
      const leso = lesione && riflessoDellaLesione(r, lesione) ? ' — <strong style="color:var(--perso)">ridotto/assente con questa lesione</strong>' : "";
      return `<li><a href="riflessi.html#${r.id}">${esc(r.nome)}</a> (${esc(livello)})${leso}</li>`;
    })
    .join("")}</ul>`;
}

// --- Pannello destro: informazioni
function aggiornaInfo() {
  let html = "";
  const lesi = muscoliLesi();
  const lievi = muscoliLievi();
  const lesione = lesioneCorrente();
  const mv = stato.movimento;
  const att = stato.atteggiamento && ATTEGGIAMENTI.find((a) => a.id === stato.atteggiamento);
  if (att) {
    html += `<span class="etichetta">Atteggiamento</span><h3 style="margin-top:0">${esc(att.nome)}</h3>
      <p>${esc(att.descrizione)}</p>
      ${att.nota ? `<p class="piccolo">${esc(att.nota)}</p>` : ""}
      <p class="piccolo">Lesione simulata: <strong>${esc(sorgentePerId[att.lesione.sorgente].nome)}</strong> — ${esc(lesione?.nome || "")}. I muscoli colpiti sono in rosso; i movimenti compromessi sono nella scheda <a href="#" data-tab="lesioni">Nervi e lesioni</a>.</p>`;
  } else if (mv) {
    const eff = lesione ? effettoLesione(mv, lesi, opzioniEffetto()) : null;
    html += `<span class="etichetta">${esc(mv.distretto)}</span><h3 style="margin-top:0">${esc(mv.nome)}</h3>
      ${eff ? `<p>Con la lesione selezionata: <span class="badge ${eff}">${ETICHETTE[eff]}</span></p>` : ""}
      ${mv.nota ? `<p class="piccolo">${esc(mv.nota)}</p>` : ""}
      <table><thead><tr><th>Muscolo</th><th>Nervo · radici</th></tr></thead><tbody>
      ${mv.muscoli
        .map(({ id, ruolo }) => {
          const m = muscoloPerId[id];
          return `<tr style="${lesi.includes(id) ? "color:var(--perso)" : lievi.includes(id) ? "color:var(--ridotto)" : ""}"><td><a href="#" data-muscolo="${id}">${esc(m.nome)}</a>${ruolo === "accessorio" ? ' <span class="piccolo">(accessorio)</span>' : ""}</td>
            <td>${m.nervi.map(chipNervo).join("")}<div class="piccolo">${m.ramo ? `${esc(m.ramo)} · ` : ""}${esc(m.radici)}</div></td></tr>`;
        })
        .join("")}</tbody></table>
      ${riflessiMovimento(mv, lesione)}`;
  } else {
    html += `<h3 style="margin-top:0">Come si usa</h3>
      <ul class="piccolo" style="padding-left:18px">
        <li>Scegli un <strong>movimento</strong>: il modello lo esegue e colora i muscoli principali con il colore del nervo che li innerva (in trasparenza gli accessori).</li>
        <li>In <strong>Nervi e lesioni</strong> scegli un nervo e una sede: i muscoli denervati diventano rossi, i movimenti compromessi vengono elencati e animati con escursione ridotta.</li>
        <li>Nella stessa scheda puoi scegliere una <strong>radice</strong>, un <strong>tronco</strong>, una <strong>corda</strong> o il <strong>plesso</strong> per confrontare i livelli di lesione.</li>
        <li>In <strong>Atteggiamenti</strong> il modello assume la posizione tipica di una lesione (es. mano ad artiglio, polso cadente).</li>
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

// --- Pannello sinistro: atteggiamenti tipici
function disegnaAtteggiamenti() {
  $("#tab-atteggiamenti").innerHTML = ATTEGGIAMENTI.length
    ? `<p class="piccolo" style="margin-top:0">Posizione caratteristica di una lesione: il modello la assume e colora i muscoli colpiti.</p>` +
      ATTEGGIAMENTI.map((a) => `<button class="voce-mov${stato.atteggiamento === a.id ? " attivo" : ""}" data-att="${a.id}">${esc(a.nome)}</button>`).join("")
    : `<p class="piccolo">Nessun atteggiamento disponibile per questa regione.</p>`;
}

function scegliAtteggiamento(id) {
  const att = ATTEGGIAMENTI.find((a) => a.id === id);
  if (!att || stato.atteggiamento === id) {
    stato.atteggiamento = null;
    viewer.impostaMovimento(null);
    return aggiornaTutto();
  }
  stato.atteggiamento = id;
  stato.movimento = null;
  stato.nervo = att.lesione.sorgente;
  stato.lesione = att.lesione.sito;
  viewer.impostaMovimento({ id: att.id, muscoli: [], da: att.posa, a: att.posa });
  viewer.vista((stato.vista = att.vista));
  aggiornaTutto();
}

function aggiornaTutto() {
  disegnaMovimenti();
  disegnaLesioni();
  disegnaAtteggiamenti();
  aggiornaInfo();
  aggiornaColori();
}

function scegliMovimento(id) {
  const mv = MOVIMENTI.find((m) => m.id === id) || null;
  stato.movimento = stato.movimento?.id === id ? null : mv;
  stato.atteggiamento = null;
  viewer.impostaMovimento(stato.movimento);
  const vista = stato.movimento && (stato.movimento.vista || VISTE_DISTRETTO[stato.movimento.distretto]);
  if (vista && vista !== stato.vista) viewer.vista((stato.vista = vista));
  aggiornaTutto();
}

function mostraTab(nome) {
  document.querySelectorAll("[data-tab]").forEach((b) => b.classList.toggle("attivo", b.dataset.tab === nome));
  $("#tab-movimenti").hidden = nome !== "movimenti";
  $("#tab-lesioni").hidden = nome !== "lesioni";
  $("#tab-atteggiamenti").hidden = nome !== "atteggiamenti";
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
  const att = ev.target.closest("[data-att]");
  if (att) {
    ev.preventDefault();
    return scegliAtteggiamento(att.dataset.att);
  }
  const tab = ev.target.closest("[data-tab]");
  if (tab) {
    ev.preventDefault();
    return mostraTab(tab.dataset.tab);
  }
  const vista = ev.target.closest("[data-vista]");
  if (vista) return viewer.vista(vista.dataset.vista);
});
$("#sel-nervo").addEventListener("change", (ev) => {
  stato.nervo = ev.target.value || null;
  stato.lesione = null;
  if (stato.atteggiamento) {
    stato.atteggiamento = null;
    viewer.impostaMovimento(null);
  }
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
$("#mostra-nervi").addEventListener("change", aggiornaColori);

if (sorgentePerId[parametri.get("nervo")]) {
  stato.nervo = parametri.get("nervo");
  if (sorgentePerId[stato.nervo].lesioni.some((l) => l.id === parametri.get("lesione"))) stato.lesione = parametri.get("lesione");
  mostraTab("lesioni");
}
aggiornaTutto();
if (parametri.get("mov")) scegliMovimento(parametri.get("mov"));
if (parametri.get("att")) {
  mostraTab("atteggiamenti");
  scegliAtteggiamento(parametri.get("att"));
}
document.querySelectorAll("[data-regione]").forEach((el) => (el.hidden = el.dataset.regione !== regione.id));
