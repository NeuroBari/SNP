// Lesioni prossimali: radici, tronchi e corde del plesso brachiale; radici e plesso lombosacrale.
//
// I muscoli colpiti non sono elencati a mano ma ricavati dai dati di ogni muscolo
// (radici e nervo), con queste regole:
//  - radice: è colpito ogni muscolo che riceve fibre da quella radice; il deficit è di
//    solito parziale perché i muscoli hanno innervazione plurisegmentaria (`parziale`);
//  - tronco, corda, plesso: è colpito ("grave") un muscolo se almeno metà delle sue radici
//    (per corde e tronchi superiore e inferiore: più di metà) passa per la struttura lesa, "lieve" se ne passa una quota
//    minore (i nervi in `interi` originano tutti dalla struttura e sono sempre colpiti); si considerano solo
//    i nervi che originano a valle della struttura (`soloNervi`, `esclusi`).
//
// STATO: bozza da revisionare. Le note cliniche seguono Aids (2023), Preston & Shapiro (2020)
// e Stewart (2010).

const ORDINE = [...Array.from({ length: 8 }, (_, i) => `C${i + 1}`), ...Array.from({ length: 12 }, (_, i) => `T${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `L${i + 1}`), ...Array.from({ length: 5 }, (_, i) => `S${i + 1}`)];

// Radici principali di un muscolo (la parte tra parentesi indica contributi variabili e viene ignorata)
export function radiciDi(testo) {
  const principale = String(testo).split("(")[0];
  const radici = new Set();
  for (const [, a, b] of principale.matchAll(/\b([CTLS]\d)(?:\s*[–-]\s*([CTLS]\d))?\b/g)) {
    if (!b) radici.add(a);
    else for (let i = ORDINE.indexOf(a); i <= ORDINE.indexOf(b) && i >= 0; i++) radici.add(ORDINE[i]);
  }
  return [...radici];
}

function muscoliColpiti(muscoli, { radici, soglia = 0.5, soloNervi, esclusi = [], interi = [] }) {
  const grave = [], lieve = [];
  for (const m of muscoli) {
    if (soloNervi && !m.nervi.some((n) => soloNervi.includes(n))) continue;
    if (m.nervi.every((n) => esclusi.includes(n))) continue;
    if (m.nervi.some((n) => interi.includes(n))) { grave.push(m.id); continue; } // nervo che origina tutto dalla struttura lesa
    const r = radiciDi(m.radici);
    if (!r.length) continue;
    const k = r.filter((x) => radici.includes(x)).length;
    if (!k) continue;
    (k / r.length >= soglia ? grave : lieve).push(m.id);
  }
  return { muscoli: grave, lievi: lieve };
}

const NOTE_RADICI = {
  C5: "Debolezza di abduzione ed extrarotazione della spalla e di flessione del gomito; riflesso bicipitale ridotto; ipoestesia della faccia laterale del braccio. I romboidi (n. dorsale scapolare) sono coinvolti: li distingue da una lesione del tronco superiore.",
  C6: "Debolezza di flessione del gomito (bicipite, brachioradiale) ed estensione del polso; riflessi bicipitale e brachioradiale ridotti; parestesie a pollice e indice e sulla faccia laterale dell'avambraccio.",
  C7: "La radicolopatia cervicale più frequente: debolezza di tricipite, estensori di polso e dita, flessore radiale del carpo e pronatore rotondo; riflesso tricipitale ridotto; parestesie al dito medio.",
  C8: "Debolezza dei flessori lunghi delle dita, degli estensori di pollice e indice e dei muscoli intrinseci della mano, compresi quelli del mediano (a differenza della lesione ulnare); parestesie a mignolo e anulare e sulla faccia mediale dell'avambraccio distale. Potenziali sensitivi conservati (lesione pregangliare).",
  T1: "Debolezza dei muscoli intrinseci della mano (abduttore breve del pollice, interossei); ipoestesia della faccia mediale dell'avambraccio prossimale; possibile sindrome di Horner (fibre simpatiche di T1).",
  L2: "Debolezza di flessione e adduzione dell'anca; ipoestesia della faccia anteriore della coscia prossimale.",
  L3: "Debolezza di adduzione dell'anca e di estensione del ginocchio; riflesso rotuleo ridotto; ipoestesia della faccia anteromediale della coscia fino al ginocchio.",
  L4: "Debolezza di estensione del ginocchio e di dorsiflessione della caviglia; riflesso rotuleo ridotto; ipoestesia della faccia mediale della gamba.",
  L5: "Piede cadente con debolezza anche di inversione (tibiale posteriore) e di abduzione dell'anca (medio gluteo); estensore lungo dell'alluce molto sensibile; ipoestesia della faccia laterale della gamba e del dorso del piede. Riflessi spesso normali (talora ridotto quello degli ischiocrurali mediali).",
  S1: "Debolezza di flessione plantare (difficoltà a camminare sulle punte) e di estensione dell'anca; riflesso achilleo ridotto; ipoestesia del margine laterale e della pianta del piede.",
};

function radice(r, regione) {
  return { id: `radice-${r}`, nome: `Radice ${r}`, radice: r, parziale: true, nervi: regione === "superiore" ? ["plesso"] : [], note: NOTE_RADICI[r], regola: { radici: [r], soglia: 0.01 } };
}

const DEFINIZIONI = {
  superiore: [
    {
      id: "radici-cervicali", nome: "Radici cervicali (C5–T1)",
      lesioni: ["C5", "C6", "C7", "C8", "T1"].map((r) => radice(r, "superiore")),
    },
    {
      id: "tronchi-brachiali", nome: "Tronchi del plesso brachiale",
      lesioni: [
        { id: "tronco-superiore", nome: "Tronco superiore (C5–C6)", nervi: ["plesso", "soprascapolare", "ascellare", "muscolocutaneo"],
          regola: { radici: ["C5", "C6"], soglia: 0.51, esclusi: ["dorsale-scapolare", "toracico-lungo", "accessorio"] },
          note: "Paralisi di Erb (trazione al parto, cadute sulla spalla, amiotrofia nevralgica): braccio addotto e intraruotato, gomito esteso, avambraccio pronato. Romboidi e serrato anteriore sono risparmiati perché i loro nervi originano dalle radici. Potenziale sensitivo del n. cutaneo laterale dell'avambraccio ridotto (lesione postgangliare)." },
        { id: "tronco-medio", nome: "Tronco medio (C7)", nervi: ["plesso"],
          regola: { radici: ["C7"], esclusi: ["toracico-lungo", "accessorio"] },
          note: "Raramente leso da solo. Il quadro motorio ricorda una radicolopatia C7, ma i potenziali sensitivi (es. dal dito medio) sono ridotti perché la lesione è postgangliare." },
        { id: "tronco-inferiore", nome: "Tronco inferiore (C8–T1)", nervi: ["plesso", "ulnare"],
          regola: { radici: ["C8", "T1"], soglia: 0.51, esclusi: ["accessorio"] },
          note: "Paralisi di Klumpke, sindrome dello stretto toracico neurogena vera, tumore dell'apice polmonare (Pancoast, spesso con sindrome di Horner). Sono deboli i muscoli intrinseci della mano sia del mediano sia dell'ulnare; potenziali sensitivi dell'ulnare e del cutaneo mediale dell'avambraccio ridotti." },
      ],
    },
    {
      id: "corde-brachiali", nome: "Corde del plesso brachiale",
      lesioni: [
        { id: "corda-laterale", nome: "Corda laterale", nervi: ["plesso", "muscolocutaneo", "mediano"],
          regola: { radici: ["C5", "C6", "C7"], soglia: 0.51, soloNervi: ["muscolocutaneo", "mediano", "pettorali"], interi: ["muscolocutaneo"] },
          note: "Colpisce il muscolocutaneo e la componente C6–C7 del mediano (pronatore rotondo, flessore radiale del carpo), risparmiando i muscoli del mediano nella mano. Potenziale sensitivo del cutaneo laterale dell'avambraccio ridotto. Cause: traumi e fratture-lussazioni di spalla, chirurgia, radioterapia." },
        { id: "corda-posteriore", nome: "Corda posteriore", nervi: ["plesso", "ascellare", "radiale", "toracodorsale", "sottoscapolari"],
          regola: { radici: ["C5", "C6", "C7", "C8", "T1"], soloNervi: ["ascellare", "radiale", "toracodorsale", "sottoscapolari"] },
          note: "Ascellare, radiale (compreso il tricipite), sottoscapolari e toracodorsale: deficit di abduzione della spalla e di estensione di gomito, polso e dita. Il coinvolgimento di deltoide e grande dorsale distingue dalla lesione del radiale in ascella." },
        { id: "corda-mediale", nome: "Corda mediale", nervi: ["plesso", "ulnare", "mediano"],
          regola: { radici: ["C8", "T1"], soglia: 0.51, soloNervi: ["ulnare", "mediano", "pettorali"], interi: ["ulnare"] },
          note: "Ulnare e componente C8–T1 del mediano: debolezza di tutti i muscoli intrinseci della mano. L'ipoestesia della faccia mediale dell'avambraccio (n. cutaneo mediale dell'avambraccio) la distingue da una lesione ulnare." },
      ],
    },
  ],
  inferiore: [
    {
      id: "radici-lombosacrali", nome: "Radici lombosacrali (L2–S1)",
      lesioni: ["L2", "L3", "L4", "L5", "S1"].map((r) => radice(r, "inferiore")),
    },
    {
      id: "plesso-lombosacrale", nome: "Plesso lombosacrale",
      lesioni: [
        { id: "plesso-lombare", nome: "Plesso lombare (L1–L4)", nervi: ["femorale", "otturatore", "cutaneo-femorale-laterale"],
          regola: { radici: ["L1", "L2", "L3", "L4"], soloNervi: ["femorale", "otturatore", "cutaneo-femorale-laterale"] },
          note: "Cause: ematoma o ascesso dello psoas, tumori retroperitoneali, radiculoplessopatia lombosacrale diabetica. Sono colpiti femorale, otturatore e cutaneo femorale laterale: a differenza della lesione isolata del femorale, sono deboli anche gli adduttori." },
        { id: "tronco-lombosacrale", nome: "Tronco lombosacrale (L4–L5)", nervi: [],
          regola: { radici: ["L4", "L5"], esclusi: ["femorale", "otturatore", "cutaneo-femorale-laterale"] },
          note: "Compressione sul margine della pelvi (parto, tumori pelvici): piede cadente con debolezza di inversione e abduzione dell'anca, come in una radicolopatia L5, ma con potenziale sensitivo del peroneo superficiale ridotto e muscoli paraspinali normali all'EMG." },
        { id: "plesso-sacrale", nome: "Plesso sacrale (L4–S3)", nervi: ["sciatico", "peroneo", "tibiale", "gluteo-superiore", "surale"],
          regola: { radici: ["L4", "L5", "S1", "S2", "S3"], soloNervi: ["gluteo-superiore", "gluteo-inferiore", "sciatico", "peroneo", "tibiale"] },
          note: "Tumori pelvici, fratture del bacino, radioterapia: deficit di glutei, ischiocrurali e muscoli di gamba e piede; riflesso achilleo ridotto. Il coinvolgimento dei glutei (nervi gluteo superiore e inferiore) la distingue da una lesione dello sciatico." },
      ],
    },
  ],
};

// Gruppi di lesioni prossimali per una regione, con i muscoli calcolati
export function lesioniProssimali(idRegione, muscoli) {
  return (DEFINIZIONI[idRegione] || []).map((g) => ({
    ...g,
    gruppo: true,
    lesioni: g.lesioni.map(({ regola, ...l }) => ({ ...l, ...muscoliColpiti(muscoli, regola) })),
  }));
}
