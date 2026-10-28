import { SEZIONI, PATOLOGIE, AGGIORNAMENTO_REGOLATORIO, LINK_REGOLATORI } from "./data/patologie.js";
import { FONTI } from "./data/fonti.js";

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const schedeDi = (idSezione) => PATOLOGIE.filter((p) => p.sezione === idSezione);
const lista = (arr) => `<ul>${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
const fonte = (k) => {
  const f = FONTI[k];
  if (!f) return esc(k);
  return f.url ? `<a href="${f.url}" target="_blank" rel="noopener">${esc(f.breve)}</a>` : esc(f.breve);
};

// --- Indice laterale
function disegnaIndice(attivo) {
  $("#indice").innerHTML =
    `<button data-vai="" class="${attivo ? "" : "attivo"}">Panoramica</button>` +
    SEZIONI.map((s) => {
      const schede = schedeDi(s.id);
      return `<h4>${esc(s.nome)}</h4>` +
        (schede.length
          ? schede.map((p) => `<button data-vai="${p.id}" class="${p.id === attivo ? "attivo" : ""}">${esc(p.nome)}</button>`).join("")
          : `<p class="piccolo" style="margin:0 0 0 8px">In preparazione</p>`);
    }).join("");
}

// --- Panoramica per sezioni
function disegnaPanoramica(idSezione) {
  $("#contenuto").innerHTML = `
    <div class="avviso" style="margin-top:0">
      La struttura della sezione segue il fascicolo di <em>Continuum</em> "Peripheral Nerve and Motor Neuron Disorders" (ottobre 2026),
      i cui contenuti sono rielaborati e integrati con le linee guida europee (EAN/PNS) e con lo stato regolatorio dei farmaci (EMA, AIFA).
    </div>
    ${SEZIONI.map((s) => {
      const schede = schedeDi(s.id);
      return `<section class="scheda sezione-pat" id="sez-${s.id}" style="margin-top:16px">
        <h2 style="margin-top:0">${esc(s.nome)} ${s.stato ? `<span class="etichetta prossimamente">In preparazione</span>` : ""}</h2>
        <p>${esc(s.descrizione)}</p>
        ${schede.length ? `<div class="griglia" style="margin-top:12px">${schede
          .map((p) => `<a class="scheda scheda-pat" href="#${p.id}"><h3>${esc(p.nome)}</h3><p>${esc(p.breve)}</p></a>`)
          .join("")}</div>` : ""}
        ${s.id === "focali" ? `<p style="margin-top:10px"><a class="btn" href="anatomia.html">Siti di lesione in Anatomia</a> <a class="btn" href="movimenti.html">Simulatore di lesioni</a> <a class="btn" href="sensibilita.html">Mappe sensitive</a></p>` : ""}
      </section>`;
    }).join("")}`;
  if (idSezione) document.getElementById(`sez-${idSezione}`)?.scrollIntoView({ block: "start" });
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
  const sezione = SEZIONI.find((s) => s.id === p.sezione);
  const blocco = (titolo, contenuto) => (contenuto && contenuto.length ? `<h3>${titolo}</h3>${Array.isArray(contenuto) ? lista(contenuto) : `<p>${esc(contenuto)}</p>`}` : "");
  $("#contenuto").innerHTML = `<article class="scheda scheda-patologia">
    <p class="piccolo" style="margin:0"><a href="#${sezione.id}">${esc(sezione.nome)}</a></p>
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
}

function mostra(id) {
  const p = PATOLOGIE.find((x) => x.id === id);
  const sezione = SEZIONI.find((s) => s.id === id);
  // Una sezione con una sola scheda apre direttamente la scheda
  const unica = sezione && schedeDi(sezione.id).length === 1 ? schedeDi(sezione.id)[0] : null;
  const scheda = p || unica;
  disegnaIndice(scheda?.id || "");
  if (scheda) {
    document.title = `${scheda.nome} · Patologia · SNP`;
    disegnaScheda(scheda);
    window.scrollTo({ top: 0 });
  } else {
    document.title = "Patologia · SNP";
    disegnaPanoramica(sezione?.id);
  }
}

document.addEventListener("click", (ev) => {
  const el = ev.target.closest("[data-vai]");
  if (!el) return;
  location.hash = el.dataset.vai;
  if (!el.dataset.vai) mostra("");
});
window.addEventListener("hashchange", () => mostra(location.hash.slice(1)));
mostra(location.hash.slice(1));
