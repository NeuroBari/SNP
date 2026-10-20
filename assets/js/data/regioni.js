// Raccoglie le regioni anatomiche e fornisce indici e logica comuni.
import * as superiore from "./arto-superiore.js";
import * as inferiore from "./arto-inferiore.js";

function crea(id, nome, modello, nervoIniziale, dati, modelloRealistico = null) {
  const { NERVI, MUSCOLI, MOVIMENTI, PLESSO, VISTE_DISTRETTO } = dati;
  return {
    id, nome, modello, nervoIniziale, modelloRealistico, NERVI, MUSCOLI, MOVIMENTI, PLESSO, VISTE_DISTRETTO,
    muscoloPerId: Object.fromEntries(MUSCOLI.map((m) => [m.id, m])),
    nervoPerId: Object.fromEntries(NERVI.map((n) => [n.id, n])),
    muscoliDelNervo: (idNervo) => MUSCOLI.filter((m) => m.nervi.includes(idNervo)),
    movimentiDelMuscolo: (idMuscolo) => MOVIMENTI.filter((mv) => mv.muscoli.some((x) => x.id === idMuscolo)),
  };
}

export const REGIONI = {
  // I modelli realistici derivano da Z-Anatomy (CC BY-SA 4.0): vedi assets/models/LICENZA.md
  superiore: crea("superiore", "Arto superiore", "Arto superiore destro", "radiale", superiore, "assets/models/arto-superiore.glb"),
  inferiore: crea("inferiore", "Arto inferiore", "Arto inferiore destro", "peroneo", inferiore, "assets/models/arto-inferiore.glb"),
};

// Trova la regione che contiene un nervo (gli id dei nervi sono unici tra le regioni)
export const regioneDelNervo = (idNervo) => Object.values(REGIONI).find((r) => r.nervoPerId[idNervo]) || null;

// Effetto di una lesione su un movimento:
//   "perso"        -> tutti i muscoli principali colpiti
//   "ridotto"      -> almeno un muscolo principale colpito
//   "lieve"        -> solo muscoli accessori colpiti
//   "conservato"   -> nessun muscolo colpito
export function effettoLesione(movimento, muscoliColpiti) {
  const colpiti = new Set(muscoliColpiti);
  const principali = movimento.muscoli.filter((m) => m.ruolo === "principale");
  const nP = principali.filter((m) => colpiti.has(m.id)).length;
  if (principali.length && nP === principali.length) return "perso";
  if (nP > 0) return "ridotto";
  if (movimento.muscoli.some((m) => colpiti.has(m.id))) return "lieve";
  return "conservato";
}
