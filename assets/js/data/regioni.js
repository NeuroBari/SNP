// Raccoglie le regioni anatomiche e fornisce indici e logica comuni.
import * as superiore from "./arto-superiore.js";
import * as inferiore from "./arto-inferiore.js";
import { lesioniProssimali } from "./lesioni-prossimali.js";

function crea(id, nome, modello, nervoIniziale, dati, modelloRealistico = null) {
  const { NERVI, MUSCOLI, MOVIMENTI, PLESSO, VISTE_DISTRETTO, ATTEGGIAMENTI = [], MUSCOLI_CHIAVE = [], ESEMPI_ESAME = [] } = dati;
  // Gruppi di lesioni prossimali (radici, tronchi, corde, plesso): si usano come "nervi" con le loro sedi di lesione
  const LIVELLI = lesioniProssimali(id, MUSCOLI);
  const nervoPerId = Object.fromEntries(NERVI.map((n) => [n.id, n]));
  return {
    id, nome, modello, nervoIniziale, modelloRealistico, NERVI, MUSCOLI, MOVIMENTI, PLESSO, VISTE_DISTRETTO,
    ATTEGGIAMENTI, MUSCOLI_CHIAVE, ESEMPI_ESAME, LIVELLI,
    muscoloPerId: Object.fromEntries(MUSCOLI.map((m) => [m.id, m])),
    nervoPerId,
    sorgentePerId: { ...nervoPerId, ...Object.fromEntries(LIVELLI.map((g) => [g.id, g])) },
    muscoliDelNervo: (idNervo) => MUSCOLI.filter((m) => m.nervi.includes(idNervo)),
    movimentiDelMuscolo: (idMuscolo) => MOVIMENTI.filter((mv) => mv.muscoli.some((x) => x.id === idMuscolo)),
  };
}

export const REGIONI = {
  // I modelli realistici derivano da Z-Anatomy (CC BY-SA 4.0): vedi assets/models/LICENZA.md
  superiore: crea("superiore", "Arto superiore", "Arto superiore destro", "radiale", superiore, "assets/models/arto-superiore.glb"),
  inferiore: crea("inferiore", "Arto inferiore", "Arto inferiore destro", "peroneo", inferiore, "assets/models/arto-inferiore.glb"),
};

// Trova la regione che contiene un nervo o un gruppo di lesioni prossimali (gli id sono unici tra le regioni)
export const regioneDelNervo = (idNervo) => Object.values(REGIONI).find((r) => r.sorgentePerId[idNervo]) || null;

// Effetto di una lesione su un movimento:
//   "perso"        -> tutti i muscoli principali colpiti
//   "ridotto"      -> almeno un muscolo principale colpito
//   "lieve"        -> solo muscoli accessori colpiti, o principali colpiti in modo lieve
//   "conservato"   -> nessun muscolo colpito
// `lesione` può avere `lievi` (muscoli colpiti parzialmente) e `parziale` (es. radice:
// il deficit non è mai completo per l'innervazione plurisegmentaria).
export function effettoLesione(movimento, muscoliColpiti, { lievi = [], parziale = false } = {}) {
  const colpiti = new Set(muscoliColpiti);
  const lieviSet = new Set(lievi);
  const principali = movimento.muscoli.filter((m) => m.ruolo === "principale");
  const nP = principali.filter((m) => colpiti.has(m.id)).length;
  if (principali.length && nP === principali.length) return parziale ? "ridotto" : "perso";
  if (nP > 0) return "ridotto";
  if (movimento.muscoli.some((m) => colpiti.has(m.id) || lieviSet.has(m.id))) return "lieve";
  return "conservato";
}
