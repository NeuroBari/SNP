import { LIVELLI, INTRO, PATOLOGIE, AGGIORNAMENTO_REGOLATORIO, LINK_REGOLATORI } from "./data/patologie.js";
import { FONTI } from "./data/fonti.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const schedaPerId = Object.fromEntries(PATOLOGIE.map((p) => [p.id, p]));
const lista = (arr) => `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
const fonte = (k) => {
  const f = FONTI[k];
  if (!f) return esc(k);
  return f.url ? `<a href="${f.url}" target="_blank" rel="noopener">${esc(f.breve)}</a>` : esc(f.breve);
};

// Schede di una sottosezione (dirette o raggruppate)
const schedeDi = (sotto) => [...(sotto.schede || []), ...(sotto.gruppi || []).flatMap((g) => g.schede)];

// Percorso di una scheda: livello, sottosezione ed eventuale gruppo
function percorso(idScheda) {
  for (const liv of LIVELLI) {
    for (const sotto of liv.sottosezioni) {
      if (sotto.schede?.includes(idScheda)) return { liv, sotto };
      const gruppo = sotto.gruppi?.find((g) => g.schede.includes(idScheda));
      if (gruppo) return { liv, sotto, gruppo };
    }
  }
  return null;
}

// --- Indice laterale (vista scheda)
function disegnaIndice(attivo) {
  const voce = (id) => `<button data-vai="${id}" class="ramo-pat${id === attivo ? " attivo" : ""}">${esc(schedaPerId[id].nome)}</button>`;
  $("#indice").innerHTML =
    `<button data-vai="">Panoramica</button>` +
    `<button data-vai="${INTRO}" class="${attivo === INTRO ? "attivo" : ""}">${esc(schedaPerId[INTRO].nome)}</button>` +
    LIVELLI.map((liv) => `<h4><span class="pallino" style="background:${liv.colore}"></span>${esc(liv.nome)}</h4>` +
      liv.sottosezioni.map((sotto) => {
        if (sotto.stato) return `<p class="voce-prossima">${esc(sotto.nome)} <span>· in preparazione</span></p>`;
        if (sotto.schede?.length === 1 && schedaPerId[sotto.schede[0]].nome === sotto.nome) return voce(sotto.schede[0]).replace("ramo-pat", "");
        return `<p class="titolo-sotto">${esc(sotto.nome)}</p>` +
          (sotto.schede || []).map(voce).join("") +
          (sotto.gruppi || []).map((g) => `<p class="titolo-gruppo">${esc(g.nome)}</p>${g.schede.map(voce).join("")}`).join("");
      }).join("")
    ).join("");
}

// --- Panoramica: introduzione e quattro livelli
function disegnaPanoramica(ancora) {
  const link = (id) => `<a href="#${id}">${esc(schedaPerId[id].nome)}</a>`;
  const conteggio = (n) => `<span class="pr-pat ok">${n === 1 ? "scheda" : `${n} schede`}</span>`;
  $("#contenuto").innerHTML = `
    <div class="avviso" style="margin-top:0">
      La struttura delle neuropatie segue il fascicolo di <em>Continuum</em> "Peripheral Nerve and Motor Neuron Disorders" (ottobre 2026),
      i cui contenuti sono rielaborati e integrati con le linee guida europee (EAN/PNS) e con lo stato regolatorio dei farmaci (EMA, AIFA).
    </div>
    <div class="scheda approccio-pat">
      <div>
        <h3>Approccio al paziente neuromuscolare</h3>
        <p>Dove è la lesione? Distribuzione del deficit, riflessi, sensibilità, faticabilità, CK ed ENG/EMG orientano verso motoneurone, radice-plesso-nervo, placca o muscolo.
          <a href="#${INTRO}">${esc(schedaPerId[INTRO].nome)} →</a></p>
      </div>
      <div class="catena-pat" aria-label="Unità motoria">${LIVELLI.map((l) => `<a href="#${l.id}" style="border-color:${l.colore}">${esc(l.nome)}</a>`).join("<span>→</span>")}</div>
    </div>
    <div class="livelli-pat">${LIVELLI.map((liv) => `
      <section class="livello-pat" id="${liv.id}">
        <header style="background:${liv.colore}"><h2>${esc(liv.nome)}</h2><p>${esc(liv.descrizione)}</p></header>
        ${liv.sottosezioni.map((sotto) => {
          const n = schedeDi(sotto).length;
          const corpo = sotto.gruppi
            ? `<ul>${sotto.gruppi.map((g) => `<li><strong>${esc(g.nome)}:</strong> ${g.schede.map(link).join(", ")}</li>`).join("")}</ul>`
            : `<p>${esc(sotto.descrizione)}</p>${n && !(n === 1 && schedaPerId[sotto.schede[0]].nome === sotto.nome) ? `<ul>${sotto.schede.map((id) => `<li>${link(id)}</li>`).join("")}</ul>` : ""}`;
          const titolo = n === 1 && !sotto.gruppi ? `<a href="#${sotto.schede[0]}">${esc(sotto.nome)}</a>` : esc(sotto.nome);
          return `<div class="sotto-pat" id="${sotto.id}">
            <h4>${titolo} ${sotto.stato ? `<span class="pr-pat">in preparazione</span>` : conteggio(n)}</h4>
            ${corpo}
            ${sotto.collegamenti?.length ? `<p class="collegamenti-pat">${sotto.collegamenti.map(([h, t]) => `<a href="${h}">${esc(t)}</a>`).join(" · ")}</p>` : ""}
          </div>`;
        }).join("")}
      </section>`).join("")}
    </div>`;
  if (ancora) document.getElementById(ancora)?.scrollIntoView({ block: "start" });
  else window.scrollTo({ top: 0 });
}

// --- Tabella dei farmaci
function tabellaFarmaci(farmaci) {
  if (!farmaci?.length) return "";
  return `<h3>Farmaci: stato regolatorio</h3>
    <div class="tabella-scorri"><table class="tabella-farmaci">
      <thead><tr><th>Farmaco</th><th>Uso</th><th>Unione europea (EMA)</th><th>Italia (AIFA)</th></tr></thead>
      <tbody>${farmaci
        .map((f) => `<tr><td><strong>${esc(f.nome)}</strong></td><td>${esc(f.uso)}</td><td>${esc(f.ema)}</td>
          <td class="${/verific/i.test(f.aifa) ? "da-verificare" : ""}">${esc(f.aifa)}</td></tr>`)
        .join("")}</tbody>
    </table></div>
    <p class="piccolo">Stato aggiornato a ${AGGIORNAMENTO_REGOLATORIO} su fonti secondarie (comunicati delle aziende, documenti AIFA indicizzati): i siti di EMA e AIFA non erano consultabili direttamente.
      Prima dell'uso clinico controllare la scheda tecnica e l'EPAR su <a href="${LINK_REGOLATORI.ema}" target="_blank" rel="noopener">EMA</a>
      e le condizioni di rimborsabilità sulla <a href="${LINK_REGOLATORI.aifa}" target="_blank" rel="noopener">banca dati AIFA</a>.</p>`;
}

// --- Scheda della patologia
function disegnaScheda(p) {
  const pos = percorso(p.id);
  const briciole = pos
    ? `<a href="#${pos.liv.id}">${esc(pos.liv.nome)}</a>${pos.sotto.nome === p.nome ? "" : ` › <a href="#${pos.sotto.id}">${esc(pos.sotto.nome)}</a>`}${pos.gruppo ? ` › ${esc(pos.gruppo.nome)}` : ""}`
    : `<a href="#">Introduzione</a>`;
  const blocco = (titolo, contenuto) => (contenuto && contenuto.length ? `<h3>${titolo}</h3>${Array.isArray(contenuto) ? lista(contenuto) : `<p>${esc(contenuto)}</p>`}` : "");
  $("#contenuto").innerHTML = `<article class="scheda scheda-patologia"${pos ? ` style="border-top:4px solid ${pos.liv.colore}"` : ""}>
    <p class="piccolo" style="margin:0">${briciole}</p>
    <h2 style="margin-top:4px">${esc(p.nome)}</h2>
    <p class="sintesi-pat">${esc(p.sintesi)}</p>
    ${blocco("Epidemiologia e fattori di rischio", p.epidemiologia)}
    ${blocco("Clinica", p.clinica)}
    ${p.allarme?.length ? `<div class="box-allarme"><strong>Segni d'allarme</strong>${lista(p.allarme)}</div>` : ""}
    ${blocco("Diagnosi", p.diagnosi)}
    ${blocco("Terapia", p.terapia)}
    ${tabellaFarmaci(p.farmaci)}
    ${blocco("Prognosi", p.prognosi)}
    ${p.perle?.length ? `<h3>Punti chiave</h3>${lista(p.perle)}` : ""}
    ${p.collegamenti?.length ? `<h3>Collegamenti nel sito</h3><p>${p.collegamenti.map(([h, t]) => `<a class="btn" href="${h}">${esc(t)}</a>`).join(" ")}</p>` : ""}
    <p class="fonti-voce">Fonti: ${p.fonti.map(fonte).join("; ")}. Articolo di riferimento: ${esc(FONTI[p.continuum]?.completa || "")}</p>
  </article>`;
  window.scrollTo({ top: 0 });
}

// L'indirizzo può indicare una scheda (#cidp), un livello (#nervo) o una sottosezione (#polineuropatie)
function mostra(id) {
  const scheda = schedaPerId[id];
  $("#layout-pat").classList.toggle("panoramica", !scheda);
  if (scheda) {
    document.title = `${scheda.nome} · Patologia · SNP`;
    disegnaIndice(id);
    disegnaScheda(scheda);
  } else {
    document.title = "Patologia · SNP";
    disegnaPanoramica(id);
  }
}

document.addEventListener("click", (ev) => {
  const el = ev.target.closest("[data-vai]");
  if (!el) return;
  if (location.hash.slice(1) === el.dataset.vai) mostra(el.dataset.vai);
  else location.hash = el.dataset.vai;
});
window.addEventListener("hashchange", () => mostra(location.hash.slice(1)));
mostra(location.hash.slice(1));
