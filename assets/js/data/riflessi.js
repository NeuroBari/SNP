// Riflessi osteotendinei, superficiali e patologici.
//
// STATO: bozza da revisionare. Livelli radicolari secondo Aids to the Examination
// of the PNS (2023) e DeJong's The Neurologic Examination (2019); le fonti differiscono
// leggermente, il livello principale è indicato per primo.
//
// Campi: `nervi` e `muscoli` usano gli id dei dati delle regioni (servono per la
// simulazione delle lesioni e per i collegamenti al 3D); `via` descrive l'arco
// riflesso a parole quando i nervi non hanno una scheda; `movimento` è l'id del
// movimento da mostrare nel modello 3D. `falsoNegativo`: segno patologico che non è
// evocabile se i muscoli della risposta sono paralizzati (es. Babinski e lesione del peroneo).

export const CATEGORIE = {
  osteotendineo: { nome: "Riflessi osteotendinei", descrizione: "Riflessi miotatici (di stiramento) monosinaptici: lo stiramento rapido del muscolo attiva i fusi neuromuscolari, le fibre afferenti Ia e, a livello del midollo, i motoneuroni α dello stesso muscolo." },
  superficiale: { nome: "Riflessi superficiali (cutanei)", descrizione: "Riflessi polisinaptici evocati da uno stimolo cutaneo. A differenza degli osteotendinei, si riducono o scompaiono nelle lesioni del primo motoneurone." },
  patologico: { nome: "Riflessi patologici e segni di liberazione", descrizione: "Risposte assenti nell'adulto sano (o presenti in modo simmetrico e lieve), che indicano in genere una lesione delle vie corticospinali." },
};

export const RIFLESSI = [
  // --- Osteotendinei, arto superiore
  {
    id: "bicipitale", nome: "Riflesso bicipitale", categoria: "osteotendineo", sede: "Arto superiore",
    radici: "C5, C6", nervi: ["muscolocutaneo"], muscoli: ["bicipite"], movimento: "el-flex",
    tecnica: "Avambraccio semiflesso e semipronato appoggiato sul braccio dell'esaminatore; il pollice dell'esaminatore preme sul tendine del bicipite alla piega del gomito e il martelletto percuote il pollice.",
    risposta: "Contrazione del bicipite e flessione del gomito.",
    significato: "Ridotto nella radicolopatia C5–C6 e nelle lesioni del muscolocutaneo o del tronco superiore del plesso.",
    fonti: ["aids2023", "campbell8"],
  },
  {
    id: "brachioradiale", nome: "Riflesso brachioradiale (stiloradiale)", categoria: "osteotendineo", sede: "Arto superiore",
    radici: "C5, C6", nervi: ["radiale"], muscoli: ["brachioradiale"], movimento: "el-flex",
    tecnica: "Avambraccio in semipronazione appoggiato sulla coscia o sostenuto; si percuote il margine laterale del radio 3–5 cm sopra lo stiloide.",
    risposta: "Contrazione del brachioradiale e flessione del gomito.",
    significato: "Ridotto nella radicolopatia C5–C6 e nelle lesioni del radiale prossimali al gomito (es. solco spirale); conservato nella lesione del n. interosseo posteriore. 'Inversione' del riflesso: vedi riflessi patologici.",
    fonti: ["aids2023", "campbell8"],
  },
  {
    id: "tricipitale", nome: "Riflesso tricipitale", categoria: "osteotendineo", sede: "Arto superiore",
    radici: "C7 (C6–C8)", nervi: ["radiale"], muscoli: ["tricipite"], movimento: "el-ext",
    tecnica: "Braccio abdotto e sostenuto dall'esaminatore con il gomito flesso a 90° e l'avambraccio pendente; si percuote il tendine del tricipite subito sopra l'olecrano.",
    risposta: "Contrazione del tricipite ed estensione del gomito.",
    significato: "Ridotto nella radicolopatia C7 (la più frequente radicolopatia cervicale). Conservato nella lesione del radiale al solco spirale, perché i rami per il tricipite originano più in alto.",
    fonti: ["aids2023", "campbell8"],
  },
  {
    id: "flessori-dita", nome: "Riflesso dei flessori delle dita", categoria: "osteotendineo", sede: "Arto superiore",
    radici: "C8 (C7–T1)", nervi: ["mediano", "ulnare"], muscoli: ["fds", "fdp-mediano", "fdp-ulnare"], movimento: "fi-flex-pip",
    tecnica: "Mano del paziente supina con le dita lievemente flesse; l'esaminatore appoggia le proprie dita sulle falangi del paziente e le percuote.",
    risposta: "Flessione delle dita e della falange distale del pollice.",
    significato: "Spesso poco evocabile nel soggetto sano; un riflesso vivace e asimmetrico ha significato analogo al segno di Hoffmann.",
    fonti: ["aids2023", "campbell8"],
  },
  // --- Osteotendinei, arto inferiore
  {
    id: "adduttori", nome: "Riflesso degli adduttori", categoria: "osteotendineo", sede: "Arto inferiore",
    radici: "L2, L3, L4", nervi: ["otturatore"], muscoli: ["adduttore-lungo", "adduttore-breve", "adduttore-grande"], movimento: "hip-add",
    tecnica: "Paziente supino con l'arto lievemente abdotto; si percuote il condilo femorale mediale o il tendine dell'adduttore grande.",
    risposta: "Adduzione della coscia.",
    significato: "Utile per distinguere la lesione del femorale (adduttori e loro riflesso conservati) dalla radicolopatia L3–L4 o dalla plessopatia (riflesso ridotto). La diffusione controlaterale (riflesso degli adduttori crociato) è patologica nell'adulto.",
    fonti: ["campbell8"],
  },
  {
    id: "rotuleo", nome: "Riflesso rotuleo (patellare)", categoria: "osteotendineo", sede: "Arto inferiore",
    radici: "L3, L4 (L2–L4)", nervi: ["femorale"], muscoli: ["quadricipite"], movimento: "knee-ext",
    tecnica: "Paziente seduto con le gambe pendenti o supino con il ginocchio sostenuto in lieve flessione; si percuote il tendine rotuleo.",
    risposta: "Contrazione del quadricipite ed estensione del ginocchio.",
    significato: "Ridotto nelle lesioni del femorale, nella radicolopatia L3–L4 e nella radiculoplessopatia lombosacrale diabetica.",
    fonti: ["aids2023", "campbell8"],
  },
  {
    id: "ischiocrurali-mediali", nome: "Riflesso degli ischiocrurali mediali", categoria: "osteotendineo", sede: "Arto inferiore",
    radici: "L5 (L5–S1)", nervi: ["sciatico"], muscoli: ["semitendinoso", "semimembranoso"], movimento: "knee-flex",
    tecnica: "Paziente supino con il ginocchio semiflesso e l'anca extraruotata; l'esaminatore pone il dito sul tendine del semitendinoso nel cavo popliteo mediale e lo percuote.",
    risposta: "Contrazione degli ischiocrurali mediali e lieve flessione del ginocchio.",
    significato: "Uno dei pochi riflessi che esplorano L5. Affidabilità limitata: rilevante soprattutto l'asimmetria.",
    fonti: ["campbell8"],
  },
  {
    id: "achilleo", nome: "Riflesso achilleo", categoria: "osteotendineo", sede: "Arto inferiore",
    radici: "S1 (S1–S2)", nervi: ["tibiale"], muscoli: ["gastrocnemio", "soleo"], movimento: "ank-pf",
    tecnica: "Piede in lieve dorsiflessione passiva (paziente supino con l'arto extraruotato, o in ginocchio su una sedia); si percuote il tendine d'Achille.",
    risposta: "Flessione plantare del piede.",
    significato: "Il primo riflesso a ridursi nelle polineuropatie lunghezza-dipendenti; ridotto nella radicolopatia S1 e nelle lesioni sciatiche o del tibiale, conservato nella lesione isolata del peroneo. Fisiologicamente ridotto negli anziani.",
    fonti: ["aids2023", "campbell8"],
  },
  // --- Superficiali
  {
    id: "addominali", nome: "Riflessi addominali superficiali", categoria: "superficiale", sede: "Tronco",
    radici: "T7–T9 (superiori), T9–T11 (medi), T11–T12 (inferiori)", nervi: [], muscoli: [], movimento: null,
    via: "Nervi intercostali e toracoaddominali (T7–T12)",
    tecnica: "Paziente supino e rilassato; si striscia la cute dell'addome dall'esterno verso la linea mediana nei tre quadranti, su ciascun lato.",
    risposta: "Contrazione della parete addominale con deviazione dell'ombelico verso lo stimolo.",
    significato: "Assenti o asimmetrici nelle lesioni del primo motoneurone (es. sclerosi multipla). Possono mancare per obesità, gravidanze, interventi addominali o età avanzata: conta soprattutto l'asimmetria.",
    fonti: ["campbell8"],
  },
  {
    id: "cremasterico", nome: "Riflesso cremasterico", categoria: "superficiale", sede: "Tronco",
    radici: "L1, L2", nervi: [], muscoli: [], movimento: null,
    via: "Afferenza dal n. ileoinguinale / ramo femorale del genitofemorale; efferenza dal ramo genitale del n. genitofemorale",
    tecnica: "Si striscia la cute della faccia mediale della coscia dall'alto verso il basso.",
    risposta: "Contrazione del cremastere con risalita del testicolo omolaterale.",
    significato: "Ridotto nelle lesioni L1–L2 e del primo motoneurone. Spesso assente negli anziani.",
    fonti: ["campbell8"],
  },
  {
    id: "plantare", nome: "Riflesso cutaneo plantare", categoria: "superficiale", sede: "Arto inferiore",
    radici: "L5, S1 (S2)", nervi: ["tibiale"], muscoli: ["fdl", "fhl", "fdb"], movimento: "toe-flex",
    tecnica: "Si striscia con una punta smussa il margine laterale della pianta dal tallone verso la base del V dito e poi medialmente lungo le teste metatarsali.",
    risposta: "Normale: flessione plantare delle dita (risposta in flessione). Patologica: estensione dell'alluce (segno di Babinski).",
    significato: "Può essere assente (risposta indifferente) senza significato patologico. Vedi segno di Babinski.",
    fonti: ["campbell8"],
  },
  {
    id: "anale", nome: "Riflesso anale superficiale", categoria: "superficiale", sede: "Perineo",
    radici: "S2, S3, S4", nervi: [], muscoli: [], movimento: null,
    via: "N. pudendo",
    tecnica: "Si striscia la cute perianale.",
    risposta: "Contrazione dello sfintere anale esterno.",
    significato: "Assente nelle lesioni del cono midollare, della cauda equina e delle radici sacrali: da cercare nel sospetto di sindrome della cauda equina.",
    fonti: ["campbell8"],
  },
  {
    id: "bulbocavernoso", nome: "Riflesso bulbocavernoso", categoria: "superficiale", sede: "Perineo",
    radici: "S2, S3, S4", nervi: [], muscoli: [], movimento: null,
    via: "N. pudendo",
    tecnica: "Compressione del glande o del clitoride (o trazione su un catetere vescicale), palpando la contrazione perianale.",
    risposta: "Contrazione del bulbocavernoso e dello sfintere anale esterno.",
    significato: "Come il riflesso anale: valuta l'integrità dell'arco sacrale S2–S4. Il suo ritorno segna la fine dello shock spinale.",
    fonti: ["campbell8"],
  },
  // --- Patologici
  {
    id: "babinski", falsoNegativo: true, nome: "Segno di Babinski", categoria: "patologico", sede: "Arto inferiore",
    radici: "L5, S1 (arco del riflesso plantare)", nervi: ["tibiale", "peroneo"], muscoli: ["ehl"], movimento: "toe-ext-alluce",
    tecnica: "Come per il riflesso cutaneo plantare.",
    risposta: "Estensione dorsale lenta dell'alluce (contrazione dell'estensore lungo dell'alluce), talora con apertura a ventaglio delle altre dita.",
    significato: "Indica una lesione delle vie corticospinali. Fisiologico nei primi 1–2 anni di vita. Falsi negativi: non è evocabile se l'estensore lungo dell'alluce è paralizzato (radicolopatia L5, lesione del peroneo profondo) o se l'arco afferente è interrotto (neuropatia grave).",
    fonti: ["campbell8"],
  },
  {
    id: "equivalenti-babinski", falsoNegativo: true, nome: "Equivalenti del Babinski (Chaddock, Oppenheim, Gordon)", categoria: "patologico", sede: "Arto inferiore",
    radici: "L5, S1", nervi: ["peroneo"], muscoli: ["ehl"], movimento: "toe-ext-alluce",
    tecnica: "Chaddock: stimolo strisciato sotto il malleolo laterale verso il dorso del piede. Oppenheim: pressione decisa lungo la cresta tibiale dall'alto verso il basso. Gordon: compressione del polpaccio.",
    risposta: "Estensione dell'alluce, come nel segno di Babinski.",
    significato: "Stesso significato del Babinski; utili quando la stimolazione plantare provoca un ritiro difficile da interpretare.",
    fonti: ["campbell8"],
  },
  {
    id: "hoffmann", falsoNegativo: true, nome: "Segno di Hoffmann", categoria: "patologico", sede: "Arto superiore",
    radici: "C8 (arco del riflesso dei flessori delle dita)", nervi: ["mediano"], muscoli: ["fpl", "fdp-mediano"], movimento: "th-ip-flex",
    tecnica: "Mano rilassata con il polso lievemente esteso; l'esaminatore sostiene il dito medio e flette di scatto la falange distale ('pizzicando' l'unghia verso il basso).",
    risposta: "Flessione della falange distale del pollice e dell'indice (adduzione del pollice).",
    significato: "Indica iperreflessia dei flessori delle dita. Può essere presente in modo simmetrico in soggetti sani: è significativo se asimmetrico o associato ad altri segni di primo motoneurone (es. mielopatia cervicale).",
    fonti: ["campbell8"],
  },
  {
    id: "tromner", falsoNegativo: true, nome: "Segno di Trömner", categoria: "patologico", sede: "Arto superiore",
    radici: "C8", nervi: ["mediano"], muscoli: ["fpl", "fdp-mediano"], movimento: "th-ip-flex",
    tecnica: "Si percuote dal lato palmare il polpastrello del dito medio, tenuto lievemente flesso.",
    risposta: "Flessione del pollice e dell'indice, come nel segno di Hoffmann.",
    significato: "Stesso significato del segno di Hoffmann.",
    fonti: ["campbell8"],
  },
  {
    id: "inversione-stiloradiale", nome: "Inversione del riflesso stiloradiale", categoria: "patologico", sede: "Arto superiore",
    radici: "Lesione a livello C5–C6", nervi: ["radiale"], muscoli: ["brachioradiale"], movimento: "fi-flex-pip",
    tecnica: "Come per il riflesso brachioradiale.",
    risposta: "Assenza della flessione del gomito con flessione delle dita.",
    significato: "Indica una lesione a livello C5–C6 (tipicamente mielopatia cervicale spondilosica): l'arco segmentale C5–C6 è interrotto, mentre i segmenti sottostanti sono iperreflessici. Combina segni di secondo e di primo motoneurone.",
    fonti: ["campbell8"],
  },
  {
    id: "clono", falsoNegativo: true, nome: "Clono (achilleo e rotuleo)", categoria: "patologico", sede: "Arto inferiore",
    radici: "S1 (achilleo), L3–L4 (rotuleo)", nervi: ["tibiale"], muscoli: ["gastrocnemio", "soleo"], movimento: "ank-pf",
    tecnica: "Achilleo: con il ginocchio flesso, dorsiflessione brusca del piede mantenuta con pressione costante. Rotuleo: spinta brusca della rotula verso il basso a ginocchio esteso.",
    risposta: "Contrazioni ritmiche ripetute del muscolo stirato.",
    significato: "Un clono sostenuto è segno di lesione del primo motoneurone (grado 4 della scala NINDS). Pochi battiti esauribili e simmetrici possono essere normali in soggetti ansiosi o con riflessi vivaci.",
    fonti: ["campbell8", "hallett1993"],
  },
  {
    id: "adduttori-crociato", nome: "Riflesso degli adduttori crociato", categoria: "patologico", sede: "Arto inferiore",
    radici: "L2–L4", nervi: ["otturatore"], muscoli: ["adduttore-lungo", "adduttore-breve", "adduttore-grande"], movimento: "hip-add",
    tecnica: "Percussione del condilo femorale mediale o del tendine rotuleo.",
    risposta: "Contrazione degli adduttori della coscia controlaterale.",
    significato: "Diffusione del riflesso: indica iperreflessia da lesione del primo motoneurone.",
    fonti: ["campbell8"],
  },
];

// Scala NINDS dei riflessi osteotendinei (Hallett, Neurology 1993)
export const SCALA_NINDS = [
  { grado: "0", descrizione: "Riflesso assente." },
  { grado: "1", descrizione: "Riflesso ridotto, inferiore al normale; comprende una risposta appena accennata o evocabile solo con manovre di facilitazione." },
  { grado: "2", descrizione: "Riflesso nella metà inferiore dei valori normali." },
  { grado: "3", descrizione: "Riflesso nella metà superiore dei valori normali." },
  { grado: "4", descrizione: "Riflesso aumentato, superiore al normale; include il clono, se presente (da annotare a parte)." },
];

// Effetto di una lesione nervosa su un riflesso: ridotto/assente se l'arco riflesso
// passa per muscoli denervati dalla lesione.
export function riflessoColpito(riflesso, muscoliLesi) {
  return riflesso.categoria !== "patologico" && riflesso.muscoli.some((m) => muscoliLesi.includes(m));
}

// Segno patologico che una lesione periferica rende non evocabile (falso negativo)
export function segnoNonEvocabile(riflesso, muscoliLesi) {
  return !!riflesso.falsoNegativo && riflesso.muscoli.some((m) => muscoliLesi.includes(m));
}
