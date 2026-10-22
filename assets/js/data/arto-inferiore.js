// Arto inferiore: nervi, muscoli e movimenti.
//
// STATO: bozza da revisionare. I valori radicolari seguono principalmente
// Aids to the Examination of the PNS (2023); esiste una variabilità
// interindividuale e tra fonti, segnalata nei campi `nota`.
//
// Convenzioni per il modello 3D (arto inferiore destro, posizione anatomica):
//   x+ = mediale, x- = laterale, z+ = anteriore, z- = posteriore, y+ = craniale.
// Segmenti: "bacino" (fisso), "coscia", "gamba", "piede" (il piede si estende lungo z+).
// Per il formato di `forma` vedi arto-superiore.js.

export const NERVI = [
  {
    id: "cutaneo-femorale-laterale",
    nome: "N. cutaneo femorale laterale",
    gruppo: "Plesso lombare",
    origine: "Radici L2, L3.",
    decorso: "Emerge dal margine laterale dello psoas, attraversa l'iliaco e passa sotto (o attraverso) il legamento inguinale circa 1 cm medialmente alla spina iliaca anterosuperiore, per raggiungere la coscia.",
    rami: ["Ramo anteriore", "Ramo posteriore"],
    sensitivo: "Faccia anterolaterale della coscia.",
    lesioni: [
      {
        id: "inguinale",
        nome: "Legamento inguinale (SIAS)",
        muscoli: [],
        note: "Meralgia parestetica: parestesie e disestesie anterolaterali di coscia. Fattori favorenti: obesità, gravidanza, cinture strette, decubito prono prolungato, prelievo di cresta iliaca.",
      },
    ],
    perle: [
      "Nessun deficit motorio né riflesso alterato: se presenti, pensare a radicolopatia L2–L3 o lesione del femorale.",
    ],
    fonti: ["aids2023", "stewart4"],
  },
  {
    id: "femorale",
    nome: "N. femorale",
    gruppo: "Plesso lombare",
    origine: "Divisioni posteriori di L2, L3, L4.",
    decorso:
      "Si forma nello spessore dello psoas, decorre nel solco tra psoas e iliaco (innervando l'iliaco), passa sotto il legamento inguinale lateralmente all'arteria femorale e nel triangolo femorale si divide in rami anteriori (sartorio, cute anteriore della coscia) e posteriori (quadricipite, n. safeno).",
    rami: [
      "Nella pelvi: iliaco (lo psoas riceve rami diretti dal plesso lombare)",
      "Triangolo femorale: pettineo, sartorio, quadricipite",
      "Rami cutanei anteriori della coscia",
      "N. safeno: canale degli adduttori, faccia mediale di gamba e piede",
    ],
    sensitivo: "Faccia anteriore e anteromediale della coscia; faccia mediale della gamba e del piede (n. safeno).",
    lesioni: [
      {
        id: "pelvi",
        nome: "Pelvi / retroperitoneo",
        muscoli: ["ileopsoas", "pettineo", "sartorio", "quadricipite"],
        note: "Cause: ematoma retroperitoneale (anticoagulanti), chirurgia addominale e pelvica (divaricatori), ascesso dello psoas. Coinvolge anche la flessione dell'anca.",
      },
      {
        id: "inguinale",
        nome: "Legamento inguinale",
        muscoli: ["sartorio", "quadricipite"],
        note: "Cause: cateterismo femorale, artroplastica d'anca, posizione litotomica prolungata. Flessione dell'anca risparmiata (iliopsoas innervato a monte).",
      },
      {
        id: "safeno",
        nome: "N. safeno (canale degli adduttori, ginocchio)",
        muscoli: [],
        note: "Lesione solo sensitiva sulla faccia mediale di gamba e piede (es. chirurgia del ginocchio, safenectomia).",
      },
    ],
    perle: [
      "Riflesso rotuleo (L3–L4) ridotto o assente.",
      "Adduttori (n. otturatore, L2–L4) normali nella lesione del femorale, deboli nella radicolopatia L3–L4 o nella plessopatia.",
      "Pensare alla radiculoplessopatia lombosacrale diabetica (amiotrofia diabetica) in caso di dolore e ipostenia di coscia.",
    ],
    fonti: ["aids2023", "gray42", "stewart4", "preston4"],
  },
  {
    id: "otturatore",
    nome: "N. otturatore",
    gruppo: "Plesso lombare",
    origine: "Divisioni anteriori di L2, L3, L4.",
    decorso: "Emerge dal margine mediale dello psoas, decorre sulla parete laterale della pelvi e attraversa il canale otturatorio, dividendosi in ramo anteriore e posteriore.",
    rami: [
      "Ramo anteriore: adduttore lungo, adduttore breve, gracile (± pettineo); ramo cutaneo",
      "Ramo posteriore: otturatore esterno, adduttore grande (parte adduttoria)",
    ],
    sensitivo: "Piccola area della faccia mediale della coscia.",
    lesioni: [
      {
        id: "pelvi",
        nome: "Pelvi / canale otturatorio",
        muscoli: ["adduttore-lungo", "adduttore-breve", "adduttore-grande", "gracile"],
        note: "Cause: chirurgia pelvica, parto, fratture di bacino, ernia otturatoria (segno di Howship-Romberg). Andatura con arto abdotto. L'adduttore grande è solo in parte compromesso (doppia innervazione).",
      },
    ],
    perle: ["Lesione isolata rara: gli adduttori deboli orientano più spesso verso radice L3–L4 o plesso."],
    fonti: ["aids2023", "gray42", "stewart4"],
  },
  {
    id: "gluteo-superiore",
    nome: "N. gluteo superiore",
    gruppo: "Plesso sacrale",
    origine: "Radici L4, L5, S1.",
    decorso: "Esce dalla pelvi attraverso il grande forame ischiatico sopra il piriforme e decorre tra medio e piccolo gluteo fino al tensore della fascia lata.",
    rami: ["Medio gluteo", "Piccolo gluteo", "Tensore della fascia lata"],
    sensitivo: "Nessuno.",
    lesioni: [
      {
        id: "gluteo",
        nome: "Regione glutea",
        muscoli: ["gluteo-medio", "gluteo-piccolo", "tfl"],
        note: "Cause: iniezione intramuscolare mal posizionata, artroplastica d'anca (via laterale). Segno di Trendelenburg e andatura anserina.",
      },
    ],
    perle: ["Abduttori dell'anca deboli in un 'piede cadente' = lesione radicolare L5 o del plesso, non del peroneo."],
    fonti: ["aids2023", "stewart4"],
  },
  {
    id: "gluteo-inferiore",
    nome: "N. gluteo inferiore",
    gruppo: "Plesso sacrale",
    origine: "Radici L5, S1, S2.",
    decorso: "Esce dalla pelvi attraverso il grande forame ischiatico sotto il piriforme e si distribuisce al grande gluteo.",
    rami: ["Grande gluteo"],
    sensitivo: "Nessuno.",
    lesioni: [
      {
        id: "gluteo",
        nome: "Regione glutea",
        muscoli: ["grande-gluteo"],
        note: "Rara isolata. Difficoltà ad alzarsi dalla sedia, salire le scale, correre.",
      },
    ],
    perle: ["Grande gluteo coinvolto con deficit nel territorio sciatico = lesione prossimale al forame ischiatico (plesso o radici)."],
    fonti: ["aids2023", "stewart4"],
  },
  {
    id: "sciatico",
    nome: "N. sciatico (ischiatico)",
    gruppo: "Plesso sacrale",
    origine: "Tronco lombosacrale (L4, L5) e radici S1, S2, S3.",
    decorso:
      "Esce dalla pelvi attraverso il grande forame ischiatico, di solito sotto il piriforme, scende tra grande trocantere e tuberosità ischiatica, profondamente al capo lungo del bicipite. Contiene due divisioni in una guaina comune (tibiale, mediale; peroneale, laterale) che si separano di solito all'apice del cavo popliteo.",
    rami: [
      "Divisione tibiale: semitendinoso, semimembranoso, capo lungo del bicipite femorale, adduttore grande (parte ischiocondilare)",
      "Divisione peroneale: capo breve del bicipite femorale",
      "Rami terminali: n. tibiale e n. peroneo comune",
    ],
    sensitivo: "Attraverso i rami terminali: gamba (eccetto la faccia mediale) e piede (eccetto il margine mediale).",
    lesioni: [
      {
        id: "gluteo",
        nome: "Regione glutea / anca",
        muscoli: [
          "semitendinoso", "semimembranoso", "bicipite-femorale-lungo", "bicipite-femorale-breve",
          "tibiale-anteriore", "edl", "ehl", "peroneo-terzo", "peroneo-lungo", "peroneo-breve", "edb",
          "gastrocnemio", "soleo", "plantare", "popliteo", "tibiale-posteriore", "fdl", "fhl",
          "abduttore-alluce", "fdb", "fhb", "abduttore-v-dito", "fdm-piede", "quadrato-plantare", "adduttore-alluce", "interossei-piede",
        ],
        note: "Cause: artroplastica e fratture-lussazioni d'anca, iniezioni intramuscolari, compressione prolungata. La divisione peroneale è più vulnerabile: la lesione può simulare una paralisi del peroneo. Glutei risparmiati (nervi separati).",
      },
    ],
    perle: [
      "Il capo breve del bicipite femorale è l'unico muscolo della divisione peroneale sopra il ginocchio: all'EMG distingue lesione sciatica da lesione del peroneo alla testa della fibula.",
      "Riflesso achilleo (S1) ridotto nelle lesioni sciatiche, normale nel peroneo isolato.",
    ],
    fonti: ["aids2023", "gray42", "stewart4", "preston4"],
  },
  {
    id: "peroneo",
    nome: "N. peroneo comune (fibulare)",
    gruppo: "Plesso sacrale",
    origine: "Divisione peroneale dello sciatico (L4, L5, S1, S2).",
    decorso:
      "Dall'apice del cavo popliteo segue il tendine del bicipite femorale, circonda superficialmente il collo della fibula (sede di vulnerabilità) e si divide nel n. peroneo superficiale (loggia laterale) e nel n. peroneo profondo (loggia anteriore e dorso del piede).",
    rami: [
      "N. cutaneo surale laterale e ramo comunicante per il surale",
      "Peroneo profondo: tibiale anteriore, estensore lungo delle dita, estensore lungo dell'alluce, peroneo terzo, estensore breve delle dita; cute del primo spazio interdigitale",
      "Peroneo superficiale: peroneo lungo e breve; cute della faccia laterale della gamba e del dorso del piede",
    ],
    sensitivo: "Faccia laterale della gamba e dorso del piede (superficiale); primo spazio interdigitale dorsale (profondo).",
    lesioni: [
      {
        id: "testa-fibula",
        nome: "Testa/collo della fibula",
        muscoli: ["tibiale-anteriore", "edl", "ehl", "edb", "peroneo-terzo", "peroneo-lungo", "peroneo-breve"],
        note: "La mononeuropatia più frequente dell'arto inferiore (gambe accavallate, calo ponderale, accovacciamento prolungato, gessi, allettamento). Piede cadente con deficit di eversione; inversione (tibiale posteriore) e riflesso achilleo conservati.",
      },
      {
        id: "profondo",
        nome: "N. peroneo profondo",
        muscoli: ["tibiale-anteriore", "edl", "ehl", "edb", "peroneo-terzo"],
        note: "Piede cadente con eversione conservata; deficit sensitivo limitato al primo spazio interdigitale.",
      },
      {
        id: "superficiale",
        nome: "N. peroneo superficiale",
        muscoli: ["peroneo-lungo", "peroneo-breve"],
        note: "Deficit di eversione e disturbi sensitivi sul dorso del piede (risparmiato il primo spazio). Possibile intrappolamento dove il nervo perfora la fascia crurale.",
      },
      {
        id: "tarsale-anteriore",
        nome: "Tunnel tarsale anteriore",
        muscoli: ["edb"],
        note: "Ramo terminale del peroneo profondo sotto il retinacolo degli estensori: ipotrofia dell'EDB e disturbi del primo spazio.",
      },
    ],
    perle: [
      "Piede cadente: testare inversione (tibiale posteriore, n. tibiale, L5) e abduzione d'anca (gluteo medio, L5). Se deboli, pensare a radicolopatia L5.",
      "La lesione è spesso a prevalenza del peroneo profondo.",
    ],
    fonti: ["aids2023", "gray42", "stewart4", "preston4"],
  },
  {
    id: "tibiale",
    nome: "N. tibiale",
    gruppo: "Plesso sacrale",
    origine: "Divisione tibiale dello sciatico (L4–S3).",
    decorso:
      "Attraversa il cavo popliteo sulla linea mediana, passa sotto l'arcata del soleo nella loggia posteriore profonda e, dietro il malleolo mediale, entra nel tunnel tarsale (sotto il retinacolo dei flessori), dove si divide in nn. plantare mediale e laterale e rami calcaneari.",
    rami: [
      "Gamba: gastrocnemio, soleo, plantare, popliteo, tibiale posteriore, flessore lungo delle dita, flessore lungo dell'alluce",
      "N. cutaneo surale mediale (contribuisce al surale)",
      "Rami calcaneari mediali: cute del tallone",
      "N. plantare mediale: abduttore dell'alluce, flessore breve delle dita, flessore breve dell'alluce; cute della pianta mediale",
      "N. plantare laterale: abduttore del V dito, interossei, adduttore dell'alluce; cute della pianta laterale",
    ],
    sensitivo: "Pianta del piede (nn. plantari) e tallone (rami calcaneari).",
    lesioni: [
      {
        id: "popliteo",
        nome: "Cavo popliteo",
        muscoli: ["gastrocnemio", "soleo", "plantare", "popliteo", "tibiale-posteriore", "fdl", "fhl", "abduttore-alluce", "fdb", "fhb", "abduttore-v-dito", "fdm-piede", "quadrato-plantare", "adduttore-alluce", "interossei-piede"],
        note: "Rara (traumi, cisti di Baker, tumori). Deficit di flessione plantare e inversione, riflesso achilleo ridotto.",
      },
      {
        id: "tunnel-tarsale",
        nome: "Tunnel tarsale",
        muscoli: ["abduttore-alluce", "fdb", "fhb", "abduttore-v-dito", "fdm-piede", "quadrato-plantare", "adduttore-alluce", "interossei-piede"],
        note: "Dolore urente plantare. Diagnosi spesso sovrastimata; la valutazione ENG dei nervi plantari è difficile (risposte sensitive spesso assenti anche negli anziani sani).",
      },
    ],
    perle: ["Il tibiale posteriore (inversione) è il muscolo chiave per distinguere radicolopatia L5 da lesione del peroneo."],
    fonti: ["aids2023", "gray42", "stewart4", "preston4"],
  },
  {
    id: "surale",
    nome: "N. surale",
    gruppo: "Plesso sacrale",
    origine: "N. cutaneo surale mediale (tibiale) e ramo comunicante del peroneo (S1, S2).",
    decorso: "Scende sulla linea mediana del polpaccio accanto alla vena piccola safena e passa dietro il malleolo laterale.",
    rami: ["Rami cutanei laterali del calcagno", "N. cutaneo dorsale laterale del piede"],
    sensitivo: "Faccia posterolaterale del terzo distale della gamba e margine laterale del piede.",
    lesioni: [
      {
        id: "caviglia",
        nome: "Polpaccio / caviglia",
        muscoli: [],
        note: "Lesione solo sensitiva: biopsia di nervo, compressione da calzature, cisti di Baker, chirurgia della caviglia.",
      },
    ],
    perle: ["È il nervo sensitivo più studiato all'ENG dell'arto inferiore e il più usato per la biopsia di nervo."],
    fonti: ["aids2023", "preston4"],
  },
];

export const MUSCOLI = [
  // --- Anca
  { id: "ileopsoas", nome: "Ileopsoas", nervi: ["femorale"], radici: "L1, L2, L3", azione: "Flessione dell'anca.", test: "Paziente seduto o supino: flettere l'anca contro resistenza.", nota: "L'iliaco è innervato dal femorale, lo psoas da rami diretti del plesso lombare.",
    forma: [{ seg: "bacino", p1: [1.3, 1.6, 0.15], p2: [0.3, -0.6, 0.35], r: 0.2 }] },
  { id: "pettineo", nome: "Pettineo", nervi: ["femorale"], radici: "L2, L3", azione: "Adduzione e flessione dell'anca.", test: "Non testabile isolatamente in modo affidabile.", nota: "Talora riceve un contributo dall'otturatore.",
    forma: [{ seg: "coscia", p1: [0.55, -0.1, 0.3], p2: [0.3, -0.9, 0.15], r: 0.11 }] },
  { id: "sartorio", nome: "Sartorio", nervi: ["femorale"], radici: "L2, L3", azione: "Flessione, abduzione ed extrarotazione dell'anca; flessione del ginocchio.", test: "Posizione 'a gamba incrociata' (tallone sulla tibia controlaterale) contro resistenza.",
    forma: [{ seg: "coscia", p1: [-0.35, 0.2, 0.45], p2: [0.45, -4.0, -0.05], r: 0.1 }] },
  { id: "quadricipite", nome: "Quadricipite femorale", nervi: ["femorale"], radici: "L2, L3, L4", azione: "Estensione del ginocchio (il retto femorale flette anche l'anca).", test: "Estensione del ginocchio contro resistenza a ginocchio semiflesso. Riflesso rotuleo (L3–L4).",
    forma: [
      { seg: "coscia", da: 0.05, a: 0.85, off: [0, 0.45], r: 0.22 },
      { seg: "coscia", da: 0.2, a: 0.92, off: [-0.4, 0.15], r: 0.23 },
      { seg: "coscia", da: 0.55, a: 0.96, off: [0.35, 0.28], r: 0.21 },
    ] },
  { id: "adduttore-lungo", nome: "Adduttore lungo", nervi: ["otturatore"], radici: "L2, L3, L4", azione: "Adduzione dell'anca.", test: "Supino, arto esteso: addurre contro resistenza; palpare il tendine all'inguine.",
    forma: [{ seg: "coscia", p1: [0.65, -0.1, 0.25], p2: [0.25, -2.1, 0.05], r: 0.15 }] },
  { id: "adduttore-breve", nome: "Adduttore breve", nervi: ["otturatore"], radici: "L2, L3, L4", azione: "Adduzione dell'anca.", test: "Insieme agli altri adduttori.",
    forma: [{ seg: "coscia", p1: [0.6, -0.2, 0.05], p2: [0.25, -1.4, 0.0], r: 0.12 }] },
  { id: "adduttore-grande", nome: "Adduttore grande", nervi: ["otturatore", "sciatico"], radici: "L2, L3, L4", azione: "Adduzione dell'anca; la parte ischiocondilare estende l'anca.", test: "Insieme agli altri adduttori.", nota: "Doppia innervazione: otturatore (parte adduttoria) e divisione tibiale dello sciatico (parte ischiocondilare, L4).",
    forma: [{ seg: "coscia", p1: [0.6, -0.3, -0.25], p2: [0.3, -3.7, -0.1], r: 0.19 }] },
  { id: "gracile", nome: "Gracile", nervi: ["otturatore"], radici: "L2, L3", azione: "Adduzione dell'anca e flessione del ginocchio.", test: "Insieme agli adduttori.",
    forma: [{ seg: "coscia", p1: [0.7, -0.1, 0.0], p2: [0.45, -4.1, -0.1], r: 0.08 }] },
  { id: "gluteo-medio", nome: "Medio gluteo", nervi: ["gluteo-superiore"], radici: "L4, L5, S1", azione: "Abduzione e intrarotazione dell'anca; stabilizza il bacino in appoggio monopodalico.", test: "Decubito laterale: abdurre l'arto esteso contro resistenza. Segno di Trendelenburg.",
    forma: [{ seg: "bacino", p1: [-0.4, 1.15, -0.35], p2: [-0.55, 0.05, -0.05], r: 0.24 }] },
  { id: "gluteo-piccolo", nome: "Piccolo gluteo", nervi: ["gluteo-superiore"], radici: "L4, L5, S1", azione: "Abduzione e intrarotazione dell'anca.", test: "Insieme al medio gluteo.",
    forma: [{ seg: "bacino", p1: [-0.3, 0.9, -0.05], p2: [-0.45, 0.05, 0.1], r: 0.15 }] },
  { id: "tfl", nome: "Tensore della fascia lata", nervi: ["gluteo-superiore"], radici: "L4, L5, S1", azione: "Abduzione, flessione e intrarotazione dell'anca.", test: "Supino: abdurre e intraruotare l'arto flesso a 30° contro resistenza.", nota: "Non rappresentato come muscolo separato nel modello realistico (Z-Anatomy).",
    forma: [{ seg: "coscia", p1: [-0.45, 0.3, 0.35], p2: [-0.52, -1.0, 0.1], r: 0.12 }] },
  { id: "grande-gluteo", nome: "Grande gluteo", nervi: ["gluteo-inferiore"], radici: "L5, S1, S2", azione: "Estensione ed extrarotazione dell'anca.", test: "Prono, ginocchio flesso: sollevare la coscia dal lettino contro resistenza.",
    forma: [{ seg: "bacino", p1: [1.2, 0.7, -0.9], p2: [-0.4, -0.9, -0.55], r: 0.36 }] },
  // --- Loggia posteriore della coscia (sciatico)
  { id: "semitendinoso", nome: "Semitendinoso", nervi: ["sciatico"], ramo: "divisione tibiale", radici: "L5, S1, S2", azione: "Flessione del ginocchio, estensione dell'anca.", test: "Prono: flettere il ginocchio contro resistenza; palpare il tendine mediale.",
    forma: [{ seg: "coscia", da: 0.05, a: 0.85, off: [0.2, -0.38], r: 0.13 }] },
  { id: "semimembranoso", nome: "Semimembranoso", nervi: ["sciatico"], ramo: "divisione tibiale", radici: "L5, S1, S2", azione: "Flessione del ginocchio, estensione dell'anca.", test: "Insieme al semitendinoso.",
    forma: [{ seg: "coscia", da: 0.15, a: 0.9, off: [0.3, -0.25], r: 0.15 }] },
  { id: "bicipite-femorale-lungo", nome: "Bicipite femorale (capo lungo)", nervi: ["sciatico"], ramo: "divisione tibiale", radici: "L5, S1, S2", azione: "Flessione del ginocchio, estensione dell'anca.", test: "Prono: flettere il ginocchio contro resistenza; palpare il tendine laterale.",
    forma: [{ seg: "coscia", da: 0.05, a: 0.85, off: [-0.25, -0.36], r: 0.17 }] },
  { id: "bicipite-femorale-breve", nome: "Bicipite femorale (capo breve)", nervi: ["sciatico"], ramo: "divisione peroneale", radici: "L5, S1, S2", azione: "Flessione del ginocchio.", test: "Insieme al capo lungo. Muscolo chiave all'EMG nel piede cadente.",
    forma: [{ seg: "coscia", da: 0.5, a: 0.93, off: [-0.38, -0.15], r: 0.12 }] },
  // --- Gamba, loggia anteriore e laterale (peroneo)
  { id: "tibiale-anteriore", nome: "Tibiale anteriore", nervi: ["peroneo"], ramo: "peroneo profondo", radici: "L4, L5", azione: "Dorsiflessione e inversione del piede.", test: "Dorsiflettere il piede contro resistenza; camminare sui talloni.",
    forma: [{ seg: "gamba", da: 0.05, a: 0.7, off: [-0.12, 0.3], r: 0.15 }] },
  { id: "edl", nome: "Estensore lungo delle dita", nervi: ["peroneo"], ramo: "peroneo profondo", radici: "L5, S1", azione: "Estensione delle dita (II–V) e dorsiflessione del piede.", test: "Estendere le dita contro resistenza.",
    forma: [{ seg: "gamba", da: 0.1, a: 0.8, off: [-0.28, 0.2], r: 0.1 }] },
  { id: "ehl", nome: "Estensore lungo dell'alluce", nervi: ["peroneo"], ramo: "peroneo profondo", radici: "L5, S1", azione: "Estensione dell'alluce.", test: "Estendere l'alluce contro resistenza (muscolo sensibile per L5).",
    forma: [{ seg: "gamba", da: 0.45, a: 0.88, off: [-0.15, 0.25], r: 0.07 }] },
  { id: "edb", nome: "Estensore breve delle dita", nervi: ["peroneo"], ramo: "peroneo profondo", radici: "L5, S1", azione: "Estensione delle dita.", test: "Palpare il ventre sul dorso laterale del piede durante l'estensione delle dita.",
    forma: [{ seg: "piede", p1: [-0.32, -0.05, 0.35], p2: [-0.05, -0.05, 1.3], r: 0.09 }] },
  { id: "peroneo-terzo", nome: "Peroneo terzo", nervi: ["peroneo"], ramo: "peroneo profondo", radici: "L5, S1", azione: "Dorsiflessione ed eversione del piede.", test: "Non testabile isolatamente in modo affidabile.", nota: "Incostante.",
    forma: [] },
  { id: "peroneo-lungo", nome: "Peroneo lungo", nervi: ["peroneo"], ramo: "peroneo superficiale", radici: "L5, S1", azione: "Eversione e flessione plantare del piede.", test: "Evertere il piede contro resistenza.",
    forma: [{ seg: "gamba", da: 0.05, a: 0.6, off: [-0.38, -0.02], r: 0.11 }] },
  { id: "peroneo-breve", nome: "Peroneo breve", nervi: ["peroneo"], ramo: "peroneo superficiale", radici: "L5, S1", azione: "Eversione del piede.", test: "Insieme al peroneo lungo.",
    forma: [{ seg: "gamba", da: 0.5, a: 0.85, off: [-0.36, -0.08], r: 0.09 }] },
  // --- Gamba, loggia posteriore (tibiale)
  { id: "gastrocnemio", nome: "Gastrocnemio", nervi: ["tibiale"], radici: "S1, S2", azione: "Flessione plantare del piede; flessione del ginocchio.", test: "Camminare sulle punte; sollevamenti ripetuti sulla punta in appoggio monopodalico. Riflesso achilleo (S1).",
    forma: [{ seg: "gamba", da: 0.0, a: 0.5, off: [-0.18, -0.38], r: 0.2 }, { seg: "gamba", da: 0.0, a: 0.5, off: [0.18, -0.38], r: 0.2 }] },
  { id: "soleo", nome: "Soleo", nervi: ["tibiale"], radici: "S1, S2", azione: "Flessione plantare del piede.", test: "Flessione plantare a ginocchio flesso (esclude il gastrocnemio).",
    forma: [{ seg: "gamba", da: 0.25, a: 0.8, off: [0, -0.28], r: 0.22 }] },
  { id: "plantare", nome: "Plantare", nervi: ["tibiale"], radici: "S1, S2", azione: "Debole flessore plantare e del ginocchio.", test: "Non testabile isolatamente.", nota: "Incostante.",
    forma: [] },
  { id: "popliteo", nome: "Popliteo", nervi: ["tibiale"], radici: "L4, L5, S1", azione: "Intrarotazione della tibia; 'sblocca' il ginocchio esteso.", test: "Non testabile isolatamente in modo affidabile.",
    forma: [{ seg: "gamba", p1: [-0.25, -0.1, -0.25], p2: [0.2, -0.6, -0.2], r: 0.08 }] },
  { id: "tibiale-posteriore", nome: "Tibiale posteriore", nervi: ["tibiale"], radici: "L4, L5", azione: "Inversione e flessione plantare del piede.", test: "Piede in flessione plantare: invertire contro resistenza.", nota: "Alcune fonti indicano L5, S1. Muscolo chiave nel piede cadente (debole nella radicolopatia L5, normale nel peroneo).",
    forma: [{ seg: "gamba", da: 0.15, a: 0.75, off: [0, -0.08], r: 0.1 }] },
  { id: "fdl", nome: "Flessore lungo delle dita", nervi: ["tibiale"], radici: "L5, S1, S2 (variabile)", azione: "Flessione delle dita (II–V).", test: "Flettere le falangi distali delle dita contro resistenza.",
    forma: [{ seg: "gamba", da: 0.25, a: 0.85, off: [0.18, -0.12], r: 0.08 }] },
  { id: "fhl", nome: "Flessore lungo dell'alluce", nervi: ["tibiale"], radici: "L5, S1, S2 (variabile)", azione: "Flessione dell'alluce.", test: "Flettere la falange distale dell'alluce contro resistenza.",
    forma: [{ seg: "gamba", da: 0.4, a: 0.88, off: [-0.15, -0.15], r: 0.08 }] },
  // --- Piede (nn. plantari)
  { id: "abduttore-alluce", nome: "Abduttore dell'alluce", nervi: ["tibiale"], ramo: "n. plantare mediale", radici: "S1, S2", azione: "Abduzione e flessione dell'alluce.", test: "Palpare il ventre al margine mediale del piede durante l'abduzione dell'alluce.",
    forma: [{ seg: "piede", p1: [0.4, -0.45, -0.05], p2: [0.4, -0.45, 1.6], r: 0.1 }] },
  { id: "fdb", nome: "Flessore breve delle dita", nervi: ["tibiale"], ramo: "n. plantare mediale", radici: "S1, S2", azione: "Flessione delle interfalangee prossimali delle dita.", test: "Non testabile isolatamente in modo affidabile.",
    forma: [{ seg: "piede", p1: [0, -0.6, 0.1], p2: [0, -0.6, 1.45], r: 0.09 }] },
  { id: "fhb", nome: "Flessore breve dell'alluce", nervi: ["tibiale"], ramo: "n. plantare mediale", radici: "S1, S2", azione: "Flessione della metatarsofalangea dell'alluce.", test: "Non testabile isolatamente in modo affidabile.",
    forma: [] },
  { id: "abduttore-v-dito", nome: "Abduttore del V dito", nervi: ["tibiale"], ramo: "n. plantare laterale", radici: "S1, S2", azione: "Abduzione e flessione del V dito.", test: "Non testabile isolatamente in modo affidabile; utile all'EMG.",
    forma: [{ seg: "piede", p1: [-0.42, -0.45, 0.0], p2: [-0.42, -0.45, 1.5], r: 0.08 }] },
  { id: "fdm-piede", nome: "Flessore breve del V dito del piede", nervi: ["tibiale"], ramo: "n. plantare laterale", radici: "S1, S2", azione: "Flessione della metatarsofalangea del V dito.", test: "Non testabile isolatamente.",
    forma: [] },
  { id: "quadrato-plantare", nome: "Quadrato plantare", nervi: ["tibiale"], ramo: "n. plantare laterale", radici: "S1, S2", azione: "Corregge la trazione obliqua del flessore lungo delle dita.", test: "Non testabile isolatamente.",
    forma: [] },
  { id: "adduttore-alluce", nome: "Adduttore dell'alluce", nervi: ["tibiale"], ramo: "n. plantare laterale", radici: "S1, S2", azione: "Adduzione dell'alluce; sostiene l'arco trasverso.", test: "Non testabile isolatamente in modo affidabile.",
    forma: [] },
  { id: "interossei-piede", nome: "Interossei del piede", nervi: ["tibiale"], ramo: "n. plantare laterale", radici: "S1, S2", azione: "Abduzione/adduzione delle dita e flessione delle metatarsofalangee.", test: "Non testabili isolatamente in modo affidabile.",
    forma: [-0.22, -0.02, 0.18].map((x) => ({ seg: "piede", p1: [x, -0.35, 0.9], p2: [x, -0.35, 1.8], r: 0.04 })) },
];

// Articolazioni: anca, ginocchio, caviglia, alluce_mtf, alluce_if, dita_mtf, dita_if.
// anca: flessione = x negativa, abduzione = z negativa, intrarotazione = y positiva
// ginocchio: flessione = x positiva; caviglia: flessione plantare = x positiva, inversione = z positiva
// dita: flessione = x positiva; abduzione dell'alluce = z positiva
const SEDUTO = { anca: { r: [-90, 0, 0] }, ginocchio: { r: [90, 0, 0] } };

export const MOVIMENTI = [
  { id: "hip-flex", nome: "Flessione dell'anca", distretto: "Anca", vista: "laterale",
    muscoli: [{ id: "ileopsoas", ruolo: "principale" }, { id: "quadricipite", ruolo: "accessorio" }, { id: "sartorio", ruolo: "accessorio" }, { id: "tfl", ruolo: "accessorio" }],
    nota: "Del quadricipite contribuisce solo il retto femorale.",
    a: { anca: { r: [-95, 0, 0] }, ginocchio: { r: [90, 0, 0] } } },
  { id: "hip-ext", nome: "Estensione dell'anca", distretto: "Anca", vista: "laterale",
    muscoli: [{ id: "grande-gluteo", ruolo: "principale" }, { id: "semitendinoso", ruolo: "accessorio" }, { id: "semimembranoso", ruolo: "accessorio" }, { id: "bicipite-femorale-lungo", ruolo: "accessorio" }],
    a: { anca: { r: [25, 0, 0] } } },
  { id: "hip-abd", nome: "Abduzione dell'anca", distretto: "Anca",
    muscoli: [{ id: "gluteo-medio", ruolo: "principale" }, { id: "gluteo-piccolo", ruolo: "principale" }, { id: "tfl", ruolo: "accessorio" }],
    a: { anca: { r: [0, 0, -40] } } },
  { id: "hip-add", nome: "Adduzione dell'anca", distretto: "Anca",
    muscoli: [{ id: "adduttore-lungo", ruolo: "principale" }, { id: "adduttore-breve", ruolo: "principale" }, { id: "adduttore-grande", ruolo: "principale" }, { id: "gracile", ruolo: "accessorio" }, { id: "pettineo", ruolo: "accessorio" }],
    da: { anca: { r: [0, 0, -35] } }, a: { anca: { r: [0, 0, 10] } } },
  { id: "hip-ir", nome: "Intrarotazione dell'anca", distretto: "Anca", vista: "anteriore",
    muscoli: [{ id: "gluteo-medio", ruolo: "principale" }, { id: "gluteo-piccolo", ruolo: "principale" }, { id: "tfl", ruolo: "accessorio" }],
    nota: "Mostrata da seduti: nell'intrarotazione il piede si sposta lateralmente.",
    da: SEDUTO, a: { anca: { r: [-90, 35, 0] }, ginocchio: { r: [90, 0, 0] } } },
  { id: "hip-er", nome: "Extrarotazione dell'anca", distretto: "Anca", vista: "anteriore",
    muscoli: [{ id: "grande-gluteo", ruolo: "principale" }, { id: "sartorio", ruolo: "accessorio" }],
    nota: "Contribuiscono gli extrarotatori profondi (piriforme, otturatori, gemelli, quadrato del femore), non rappresentati nel modello.",
    da: SEDUTO, a: { anca: { r: [-90, -35, 0] }, ginocchio: { r: [90, 0, 0] } } },
  { id: "knee-ext", nome: "Estensione del ginocchio", distretto: "Ginocchio", vista: "laterale",
    muscoli: [{ id: "quadricipite", ruolo: "principale" }],
    da: SEDUTO, a: { anca: { r: [-90, 0, 0] } } },
  { id: "knee-flex", nome: "Flessione del ginocchio", distretto: "Ginocchio", vista: "laterale",
    muscoli: [{ id: "semitendinoso", ruolo: "principale" }, { id: "semimembranoso", ruolo: "principale" }, { id: "bicipite-femorale-lungo", ruolo: "principale" }, { id: "bicipite-femorale-breve", ruolo: "principale" }, { id: "gastrocnemio", ruolo: "accessorio" }, { id: "gracile", ruolo: "accessorio" }, { id: "sartorio", ruolo: "accessorio" }],
    nota: "In clinica si testa a paziente prono.",
    a: { ginocchio: { r: [100, 0, 0] } } },
  { id: "ank-df", nome: "Dorsiflessione della caviglia", distretto: "Caviglia",
    muscoli: [{ id: "tibiale-anteriore", ruolo: "principale" }, { id: "edl", ruolo: "accessorio" }, { id: "ehl", ruolo: "accessorio" }, { id: "peroneo-terzo", ruolo: "accessorio" }],
    a: { caviglia: { r: [-20, 0, 0] } } },
  { id: "ank-pf", nome: "Flessione plantare della caviglia", distretto: "Caviglia",
    muscoli: [{ id: "gastrocnemio", ruolo: "principale" }, { id: "soleo", ruolo: "principale" }, { id: "plantare", ruolo: "accessorio" }, { id: "tibiale-posteriore", ruolo: "accessorio" }, { id: "fdl", ruolo: "accessorio" }, { id: "fhl", ruolo: "accessorio" }, { id: "peroneo-lungo", ruolo: "accessorio" }],
    a: { caviglia: { r: [40, 0, 0] } } },
  { id: "ank-inv", nome: "Inversione del piede", distretto: "Caviglia",
    muscoli: [{ id: "tibiale-posteriore", ruolo: "principale" }, { id: "tibiale-anteriore", ruolo: "accessorio" }],
    nota: "Conservata nella lesione del peroneo, ridotta nella radicolopatia L5.",
    a: { caviglia: { r: [0, 0, 25] } } },
  { id: "ank-ev", nome: "Eversione del piede", distretto: "Caviglia",
    muscoli: [{ id: "peroneo-lungo", ruolo: "principale" }, { id: "peroneo-breve", ruolo: "principale" }, { id: "peroneo-terzo", ruolo: "accessorio" }],
    a: { caviglia: { r: [0, 0, -18] } } },
  { id: "toe-ext-alluce", nome: "Estensione dell'alluce", distretto: "Dita del piede",
    muscoli: [{ id: "ehl", ruolo: "principale" }],
    a: { alluce_mtf: { r: [-40, 0, 0] }, alluce_if: { r: [-10, 0, 0] } } },
  { id: "toe-ext", nome: "Estensione delle dita (II–V)", distretto: "Dita del piede",
    muscoli: [{ id: "edl", ruolo: "principale" }, { id: "edb", ruolo: "principale" }],
    a: { dita_mtf: { r: [-35, 0, 0] } } },
  { id: "toe-flex-alluce", nome: "Flessione dell'alluce", distretto: "Dita del piede",
    muscoli: [{ id: "fhl", ruolo: "principale" }, { id: "fhb", ruolo: "accessorio" }],
    a: { alluce_mtf: { r: [20, 0, 0] }, alluce_if: { r: [40, 0, 0] } } },
  { id: "toe-flex", nome: "Flessione delle dita (II–V)", distretto: "Dita del piede",
    muscoli: [{ id: "fdl", ruolo: "principale" }, { id: "fdb", ruolo: "principale" }, { id: "quadrato-plantare", ruolo: "accessorio" }, { id: "interossei-piede", ruolo: "accessorio" }, { id: "abduttore-v-dito", ruolo: "accessorio" }],
    a: { dita_mtf: { r: [25, 0, 0] }, dita_if: { r: [45, 0, 0] } } },
  { id: "toe-abd", nome: "Abduzione dell'alluce", distretto: "Dita del piede",
    muscoli: [{ id: "abduttore-alluce", ruolo: "principale" }],
    a: { alluce_mtf: { r: [0, 0, 15] } },
    // nel modello realistico le dita non hanno un orientamento di riposo ruotato: l'abduzione è attorno all'asse verticale
    realistico: { a: { alluce_mtf: { r: [0, 15, 0] } } } },
];

// Inquadratura della camera suggerita per ciascun distretto (un movimento può indicarne una propria con `vista`)
export const VISTE_DISTRETTO = { Anca: "generale", Ginocchio: "laterale", Caviglia: "piede", "Dita del piede": "piede" };

// Schema del plesso lombosacrale (coordinate per il diagramma SVG)
export const PLESSO = {
  nome: "Plesso lombosacrale",
  altezza: 470,
  colonne: [[50, "Radici"], [190, "Tronco lombosacrale"], [360, "Nervi"], [640, "Rami terminali"]],
  descrizione: "Schema semplificato: plesso lombare (L1–L4) e sacrale (L4–S3), uniti dal tronco lombosacrale (L4–L5). Sono indicati i nervi trattati nelle schede.",
  nodi: [
    { id: "L1", tipo: "radice", x: 50, y: 40 }, { id: "L2", tipo: "radice", x: 50, y: 90 }, { id: "L3", tipo: "radice", x: 50, y: 140 },
    { id: "L4", tipo: "radice", x: 50, y: 190 }, { id: "L5", tipo: "radice", x: 50, y: 240 }, { id: "S1", tipo: "radice", x: 50, y: 290 },
    { id: "S2", tipo: "radice", x: 50, y: 340 }, { id: "S3", tipo: "radice", x: 50, y: 390 },
    { id: "TLS", etichetta: "Tronco lombosacrale", tipo: "tronco", x: 190, y: 245 },
    { id: "cutaneo-femorale-laterale", etichetta: "Cutaneo femorale laterale", tipo: "terminale", x: 330, y: 50 },
    { id: "femorale", etichetta: "Femorale", tipo: "terminale", x: 330, y: 115 },
    { id: "otturatore", etichetta: "Otturatore", tipo: "terminale", x: 330, y: 175 },
    { id: "gluteo-superiore", etichetta: "Gluteo superiore", tipo: "terminale", x: 330, y: 245 },
    { id: "gluteo-inferiore", etichetta: "Gluteo inferiore", tipo: "terminale", x: 330, y: 300 },
    { id: "sciatico", etichetta: "Sciatico", tipo: "terminale", x: 420, y: 370 },
    { id: "peroneo", etichetta: "Peroneo comune", tipo: "terminale", x: 610, y: 320 },
    { id: "tibiale", etichetta: "Tibiale", tipo: "terminale", x: 610, y: 395 },
    { id: "surale", etichetta: "Surale", tipo: "collaterale", x: 690, y: 445 },
  ],
  archi: [
    ["L2", "cutaneo-femorale-laterale"], ["L3", "cutaneo-femorale-laterale"],
    ["L2", "femorale"], ["L3", "femorale"], ["L4", "femorale"],
    ["L2", "otturatore"], ["L3", "otturatore"], ["L4", "otturatore"],
    ["L4", "TLS"], ["L5", "TLS"],
    ["TLS", "gluteo-superiore"], ["S1", "gluteo-superiore"],
    ["TLS", "gluteo-inferiore"], ["S1", "gluteo-inferiore"], ["S2", "gluteo-inferiore"],
    ["TLS", "sciatico"], ["S1", "sciatico"], ["S2", "sciatico"], ["S3", "sciatico"],
    ["sciatico", "peroneo"], ["sciatico", "tibiale"],
    ["tibiale", "surale"], ["peroneo", "surale"],
  ],
};

// Atteggiamenti tipici delle lesioni (pose statiche nel modello 3D)
export const ATTEGGIAMENTI = [
  { id: "piede-cadente", nome: "Piede cadente (peroneo alla testa della fibula)", lesione: { sorgente: "peroneo", sito: "testa-fibula" }, vista: "oscillante",
    posa: { anca: { r: [-35, 0, 0] }, ginocchio: { r: [55, 0, 0] }, caviglia: { r: [35, 0, 12] }, dita_mtf: { r: [15, 0, 0] }, alluce_mtf: { r: [10, 0, 0] } },
    descrizione: "Nella fase oscillante del passo il piede cade in flessione plantare con lieve inversione; il paziente compensa flettendo di più anca e ginocchio (andatura steppante).",
    nota: "Inversione (tibiale posteriore) e abduzione dell'anca (medio gluteo) normali: lo distinguono dalla radicolopatia L5." },
  { id: "piede-talo", nome: "Piede talo e dita ad artiglio (tibiale)", lesione: { sorgente: "tibiale", sito: "popliteo" }, vista: "piede",
    posa: { caviglia: { r: [-15, 0, -8] }, dita_mtf: { r: [-20, 0, 0] }, dita_if: { r: [40, 0, 0] }, alluce_mtf: { r: [-15, 0, 0] }, alluce_if: { r: [30, 0, 0] } },
    descrizione: "Prevalgono i dorsiflessori e gli evertori (peroneo) sui flessori plantari paralizzati: piede in dorsiflessione e lieve eversione; la paralisi dei muscoli intrinseci del piede produce dita ad artiglio.",
    nota: "Impossibile camminare sulle punte; riflesso achilleo ridotto o assente." },
];

// Muscoli chiave dell'esame obiettivo, con le radici prevalenti (miotomi) usate per la localizzazione
export const MUSCOLI_CHIAVE = [
  { id: "ileopsoas", movimento: "Flessione dell'anca", radici: ["L2", "L3"] },
  { id: "adduttore-lungo", movimento: "Adduzione dell'anca", radici: ["L2", "L3"] },
  { id: "quadricipite", movimento: "Estensione del ginocchio", radici: ["L3", "L4"] },
  { id: "gluteo-medio", movimento: "Abduzione dell'anca", radici: ["L5"] },
  { id: "grande-gluteo", movimento: "Estensione dell'anca", radici: ["S1"] },
  { id: "bicipite-femorale-lungo", movimento: "Flessione del ginocchio (ischiocrurali)", radici: ["L5", "S1"] },
  { id: "tibiale-anteriore", movimento: "Dorsiflessione della caviglia", radici: ["L4", "L5"] },
  { id: "ehl", movimento: "Estensione dell'alluce", radici: ["L5"] },
  { id: "peroneo-lungo", movimento: "Eversione del piede", radici: ["L5", "S1"] },
  { id: "tibiale-posteriore", movimento: "Inversione del piede", radici: ["L5"] },
  { id: "gastrocnemio", movimento: "Flessione plantare", radici: ["S1"] },
  { id: "abduttore-alluce", movimento: "Abduzione dell'alluce", radici: ["S1", "S2"] },
];

// Esempi per la scheda d'esame: gradi MRC dei muscoli non normali
export const ESEMPI_ESAME = [
  { nome: "Piede cadente", mrc: { "tibiale-anteriore": 2, ehl: 1, "peroneo-lungo": 3 } },
  { nome: "Radicolopatia L5", mrc: { "gluteo-medio": 4, "tibiale-anteriore": 4, ehl: 3, "peroneo-lungo": 4, "tibiale-posteriore": 4 } },
  { nome: "Radicolopatia S1", mrc: { gastrocnemio: 4, "grande-gluteo": 4 } },
  { nome: "Lesione del femorale", mrc: { quadricipite: 2 } },
];
