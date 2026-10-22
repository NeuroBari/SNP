// Localizzazione didattica di una lesione a partire dalla forza dei muscoli chiave (scala MRC).
//
// Per ogni sede di lesione presente nei dati (nervi, tronchi, corde, plesso, radici) si
// confrontano i muscoli chiave deboli e quelli normali con i muscoli che quella lesione
// dovrebbe colpire:
//  - "contraddizioni": muscoli che dovrebbero essere deboli ma sono normali;
//  - "non spiegati": muscoli deboli che la lesione non giustifica;
//  - "attesi normali": muscoli che la lesione può coinvolgere solo in parte, trovati normali
//    (non escludono la sede ma la rendono meno probabile: servono a ordinare i risultati).
// Per le radici si usano i miotomi prevalenti di MUSCOLI_CHIAVE: un muscolo normale
// contraddice la radice solo se quella è la sua unica radice prevalente.

const ORDINE_CLASSE = { compatibile: 0, parziale: 1, "poco compatibile": 2 };

function candidati(regione) {
  const lista = [];
  for (const n of regione.NERVI) {
    for (const l of n.lesioni) lista.push({ sorgente: n.id, sito: l.id, nome: `${n.nome} — ${l.nome}`, grave: new Set(l.muscoli), lievi: new Set() });
  }
  for (const g of regione.LIVELLI) {
    for (const l of g.lesioni) {
      lista.push({
        sorgente: g.id, sito: l.id, radice: l.radice || null,
        nome: l.radice ? `Radice ${l.radice}` : `${l.nome}`,
        grave: new Set(l.muscoli), lievi: new Set(l.lievi || []),
      });
    }
  }
  return lista;
}

export function localizza(regione, mrc, { massimo = 6 } = {}) {
  const chiave = regione.MUSCOLI_CHIAVE;
  const deboli = chiave.filter((k) => (mrc[k.id] ?? 5) < 5).map((k) => k.id);
  const normali = chiave.filter((k) => (mrc[k.id] ?? 5) === 5).map((k) => k.id);
  if (!deboli.length) return [];
  const risultati = [];
  for (const c of candidati(regione)) {
    let attesi, obbligati;
    if (c.radice) {
      attesi = new Set(chiave.filter((k) => k.radici.includes(c.radice)).map((k) => k.id));
      obbligati = new Set(chiave.filter((k) => k.radici.length === 1 && k.radici[0] === c.radice).map((k) => k.id));
    } else {
      attesi = new Set(chiave.filter((k) => c.grave.has(k.id) || c.lievi.has(k.id)).map((k) => k.id));
      obbligati = new Set(chiave.filter((k) => c.grave.has(k.id)).map((k) => k.id));
    }
    const spiegati = deboli.filter((id) => attesi.has(id));
    if (!spiegati.length) continue;
    const nonSpiegati = deboli.filter((id) => !attesi.has(id));
    const contraddizioni = normali.filter((id) => obbligati.has(id));
    const attesiNormali = normali.filter((id) => attesi.has(id) && !obbligati.has(id));
    const classe = contraddizioni.length ? "poco compatibile" : nonSpiegati.length ? "parziale" : "compatibile";
    risultati.push({ ...c, classe, spiegati, nonSpiegati, contraddizioni, attesiNormali, specificita: attesi.size });
  }
  risultati.sort(
    (a, b) =>
      ORDINE_CLASSE[a.classe] - ORDINE_CLASSE[b.classe] ||
      a.nonSpiegati.length - b.nonSpiegati.length ||
      a.contraddizioni.length - b.contraddizioni.length ||
      a.attesiNormali.length - b.attesiNormali.length ||
      b.spiegati.length - a.spiegati.length ||
      a.specificita - b.specificita
  );
  return risultati.slice(0, massimo);
}
