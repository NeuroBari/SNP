// Sensibilità: dermatomi e territori dei nervi cutanei, arto superiore e inferiore destro.
//
// Le mappe sono SCHEMATICHE. Ogni arto è disegnato con "parti" (arto, palmo, dita…) i cui
// margini sono curve x(y): `L` è il margine laterale, `R` quello mediale, nella vista
// anteriore (laterale a sinistra di chi guarda). Una zona si descrive con punti [y, v], dove
// y è la quota nel disegno e v la posizione tra margine laterale (0) e mediale (1): così i
// confini seguono la forma dell'arto. La vista posteriore usa la stessa sagoma specchiata.
// Una zona può anche essere un oggetto { v: [da, a], y: [da, a] } (parte intera se omessi).
//
// STATO: bozza da revisionare. Dermatomi secondo la mappa più usata in clinica, confrontata
// con Lee et al. (2008); punti sensitivi chiave dagli standard ISNCSCI (revisione 2019);
// territori cutanei da Gray's Anatomy, Aids (2023), Russell (2015) e Stewart (2010).
// Dermatomi e territori variano tra individui e si sovrappongono ampiamente.

export const GEOMETRIE = {
  "arto-superiore": {
    larghezza: 290, altezza: 625,
    parti: {
      arto: {
        L: [[14, 168], [18, 140], [28, 113], [45, 97], [75, 90], [130, 93], [190, 98], [255, 100], [290, 95], [330, 99], [390, 110], [452, 120]],
        R: [[14, 200], [60, 192], [95, 182], [150, 178], [210, 179], [255, 185], [290, 186], [330, 180], [390, 170], [452, 163]],
      },
      palmo: {
        L: [[448, 121], [470, 113], [495, 108], [520, 111], [545, 116]],
        R: [[448, 163], [475, 169], [505, 172], [530, 171], [545, 170]],
      },
      d2: { L: [[538, 116], [575, 117], [594, 118.5], [600, 120.5], [603, 123]], R: [[538, 129.5], [575, 128.5], [594, 127.5], [600, 125.5], [603, 123]] },
      d3: { L: [[538, 130.5], [580, 131], [602, 132], [608, 134], [611, 136.5]], R: [[538, 143], [580, 142], [602, 141], [608, 139], [611, 136.5]] },
      d4: { L: [[538, 143.5], [575, 144], [594, 144.5], [600, 146.5], [603, 149.5]], R: [[538, 156], [575, 155], [594, 154.5], [600, 152.5], [603, 149.5]] },
      d5: { L: [[536, 156.5], [565, 157.5], [580, 158], [586, 160], [589, 163]], R: [[536, 170], [565, 168], [580, 167.5], [586, 166], [589, 163]] },
      // pollice: v = 0 sul margine radiale (esterno)
      d1: { L: [[488, 111], [505, 102], [525, 93], [543, 87], [553, 85], [560, 87], [565, 92]], R: [[488, 126], [505, 120], [525, 111], [543, 104], [553, 100], [560, 96], [565, 92]] },
    },
  },
  "arto-inferiore": {
    larghezza: 280, altezza: 680,
    parti: {
      arto: {
        L: [[18, 92], [50, 82], [95, 80], [160, 88], [250, 100], [320, 104], [345, 102], [400, 98], [470, 108], [540, 116], [590, 118]],
        R: [[18, 180], [60, 184], [100, 182], [160, 176], [250, 170], [320, 172], [345, 174], [400, 170], [470, 160], [540, 156], [590, 160]],
      },
      // dorso del piede visto dall'avanti: v = 0 sul margine laterale (V dito)
      piede: { L: [[586, 118], [605, 108], [625, 99], [640, 96]], R: [[586, 160], [605, 168], [625, 175], [640, 177]] },
      p5: { L: [[636, 97], [648, 97.5], [653, 99], [656, 102.5]], R: [[636, 108], [648, 107.5], [653, 106], [656, 102.5]] },
      p4: { L: [[636, 109], [652, 109.5], [658, 111], [661, 115]], R: [[636, 121], [652, 120.5], [658, 119], [661, 115]] },
      p3: { L: [[636, 122], [655, 122.5], [661, 124.5], [664, 128.5]], R: [[636, 135], [655, 134.5], [661, 132.5], [664, 128.5]] },
      p2: { L: [[636, 136], [658, 136.5], [664, 139], [667, 143]], R: [[636, 150], [658, 149.5], [664, 147], [667, 143]] },
      p1: { L: [[634, 151], [655, 151], [662, 154], [666, 163]], R: [[634, 177], [655, 176], [662, 172], [666, 163]] },
      // tallone, solo nella vista posteriore
      tallone: { L: [[586, 118], [600, 117], [612, 122], [620, 131], [624, 139]], R: [[586, 160], [600, 161], [612, 156], [620, 147], [624, 139]] },
    },
  },
  // pianta del piede destro, dita in alto, alluce a destra: v = 0 sul margine laterale
  pianta: {
    larghezza: 190, altezza: 335,
    parti: {
      pianta: {
        L: [[48, 60], [80, 52], [130, 50], [180, 54], [230, 58], [270, 62], [300, 70], [318, 84], [324, 96]],
        R: [[48, 140], [80, 145], [110, 140], [150, 128], [190, 121], [230, 126], [270, 130], [300, 124], [318, 110], [324, 96]],
      },
      p5: { L: [[28, 57.5], [31, 55], [36, 53.5], [52, 53]], R: [[28, 57.5], [31, 60], [36, 61.5], [52, 63]] },
      p4: { L: [[20, 72], [23, 68], [28, 66.5], [52, 66]], R: [[20, 72], [23, 76], [28, 77.5], [52, 78]] },
      p3: { L: [[16, 86], [19, 81.5], [24, 80], [52, 79.5]], R: [[16, 86], [19, 90.5], [24, 92], [52, 92.5]] },
      p2: { L: [[12, 101], [15, 96], [20, 94], [52, 93.5]], R: [[12, 101], [15, 106], [20, 108], [52, 108.5]] },
      p1: { L: [[14, 124], [18, 116], [25, 111], [50, 110]], R: [[14, 124], [18, 132], [25, 137], [50, 140]] },
    },
  },
};

// Dermatomi: colore, area e punto sensitivo chiave degli standard ISNCSCI
export const DERMATOMI = {
  C4: { colore: "#b39ddb", area: "Parte superiore della spalla (mantellina).", punto: "Sopra l'articolazione acromioclavicolare." },
  C5: { colore: "#f4a261", area: "Faccia laterale del braccio fino al gomito.", punto: "Lato laterale della fossa antecubitale, appena sopra la piega del gomito." },
  C6: { colore: "#e9c46a", area: "Faccia laterale dell'avambraccio, pollice e indice.", punto: "Dorso della falange prossimale del pollice." },
  C7: { colore: "#90be6d", area: "Dito medio; striscia centrale del dorso dell'avambraccio e della mano.", punto: "Dorso della falange prossimale del dito medio." },
  C8: { colore: "#2a9d8f", area: "Anulare e mignolo, margine ulnare della mano e dell'avambraccio distale.", punto: "Dorso della falange prossimale del mignolo." },
  T1: { colore: "#7aa6f0", area: "Faccia mediale dell'avambraccio prossimale e del braccio distale.", punto: "Lato mediale (ulnare) della fossa antecubitale, appena sopra l'epicondilo mediale." },
  T2: { colore: "#9d8df1", area: "Cavo ascellare e faccia mediale della parte alta del braccio.", punto: "Apice del cavo ascellare." },
  T12: { colore: "#c39bd3", area: "Regione sopra il legamento inguinale e cresta iliaca.", punto: "Punto medio del legamento inguinale." },
  L1: { colore: "#f28482", area: "Regione inguinale e parte superiore della coscia.", punto: "A metà tra i punti chiave di T12 e L2." },
  L2: { colore: "#f4a261", area: "Faccia anteriore e laterale della metà superiore della coscia (banda obliqua).", punto: "Faccia anteromediale della coscia, a metà tra legamento inguinale e condilo femorale mediale." },
  L3: { colore: "#e9c46a", area: "Faccia anteriore della metà inferiore della coscia fino al ginocchio, versante mediale.", punto: "Condilo femorale mediale, appena sopra il ginocchio." },
  L4: { colore: "#90be6d", area: "Faccia mediale della gamba e del piede fino al malleolo mediale.", punto: "Malleolo mediale." },
  L5: { colore: "#2a9d8f", area: "Faccia laterale della gamba, dorso del piede e dita I–IV; parte mediale della pianta.", punto: "Dorso del piede all'altezza della III articolazione metatarsofalangea." },
  S1: { colore: "#7aa6f0", area: "Margine laterale del piede, V dito, tallone e pianta laterale; faccia posterolaterale della gamba.", punto: "Faccia laterale del calcagno." },
  S2: { colore: "#9d8df1", area: "Striscia centrale della faccia posteriore di coscia e gamba.", punto: "Centro del cavo popliteo." },
  S3: { colore: "#cdb4db", area: "Parte mediale della regione glutea.", punto: "Tuberosità ischiatica o piega glutea." },
};

// Territori cutanei. `nervo`: nervo di appartenenza (scheda in Anatomia se esiste, colore)
export const TERRITORI = {
  // --- Arto superiore
  sopraclaveari: { nome: "Nn. sopraclaveari", nervo: "sopraclaveari", radici: "C3–C4", origine: "Plesso cervicale",
    descrizione: "Cute della spalla sopra l'acromion, della regione clavicolare e della parte alta del deltoide." },
  ascellare: { nome: "N. cutaneo laterale superiore del braccio", nervo: "ascellare", radici: "C5–C6",
    descrizione: "Cute sopra la metà inferiore del deltoide (area 'del distintivo reggimentale'), territorio utile per distinguere la lesione dell'ascellare." },
  intercostobrachiale: { nome: "N. intercostobrachiale", nervo: "intercostobrachiale", radici: "T2", origine: "Ramo cutaneo laterale del II nervo intercostale",
    descrizione: "Cavo ascellare e faccia mediale e posteriore della parte alta del braccio. Spesso leso nella dissezione ascellare." },
  "cutaneo-mediale-braccio": { nome: "N. cutaneo mediale del braccio", nervo: "cutaneo-mediale-braccio", radici: "C8–T1", origine: "Corda mediale del plesso brachiale",
    descrizione: "Faccia mediale e posteromediale della metà inferiore del braccio." },
  "radiale-cut-post-braccio": { nome: "N. cutaneo posteriore del braccio", nervo: "radiale", radici: "C5–C8",
    descrizione: "Faccia posteriore del braccio. Origina dal radiale nell'ascella: è risparmiato nelle lesioni al solco spirale." },
  "radiale-cut-lat-inf-braccio": { nome: "N. cutaneo laterale inferiore del braccio", nervo: "radiale", radici: "C5–C6",
    descrizione: "Faccia laterale della metà inferiore del braccio." },
  "radiale-cut-post-avambraccio": { nome: "N. cutaneo posteriore dell'avambraccio", nervo: "radiale", radici: "C5–C8",
    descrizione: "Striscia centrale della faccia posteriore dell'avambraccio fino al polso. Origina nel braccio, prima o dentro il solco spirale: coinvolgimento variabile nelle lesioni del solco." },
  "radiale-superficiale": { nome: "Ramo superficiale del n. radiale", nervo: "radiale", radici: "C6–C7",
    descrizione: "Dorso radiale della mano e tabacchiera anatomica, dorso del pollice e delle falangi prossimali di indice, medio e metà radiale dell'anulare. Area più costante: dorso del primo spazio interosseo. Neuropatia di Wartenberg (cheiralgia parestesica) da bracciali, manette, orologi stretti." },
  muscolocutaneo: { nome: "N. cutaneo laterale dell'avambraccio", nervo: "muscolocutaneo", radici: "C5–C6",
    descrizione: "Faccia laterale (anteriore e posteriore) dell'avambraccio fino alla base dell'eminenza tenar." },
  "cutaneo-mediale-avambraccio": { nome: "N. cutaneo mediale dell'avambraccio", nervo: "cutaneo-mediale-avambraccio", radici: "C8–T1", origine: "Corda mediale del plesso brachiale",
    descrizione: "Faccia mediale (anteriore e posteriore) dell'avambraccio. L'ipoestesia in quest'area indica una lesione prossimale al nervo ulnare (corda mediale, tronco inferiore, radici C8–T1)." },
  "mediano-palmare": { nome: "Ramo cutaneo palmare del n. mediano", nervo: "mediano", radici: "C6–C7",
    descrizione: "Eminenza tenar e parte prossimale del palmo. Origina circa 5 cm sopra il polso e passa superficialmente al retinacolo dei flessori: è risparmiato nella sindrome del tunnel carpale." },
  "mediano-digitale": { nome: "Nn. digitali palmari del mediano", nervo: "mediano", radici: "C6–C8",
    descrizione: "Faccia palmare di pollice, indice, medio e metà radiale dell'anulare con il palmo distale corrispondente; sul dorso, le falangi distali delle stesse dita. Area più costante: polpastrello dell'indice." },
  "ulnare-palmare": { nome: "Ramo cutaneo palmare del n. ulnare", nervo: "ulnare", radici: "C8",
    descrizione: "Eminenza ipotenar prossimale. Origina nell'avambraccio: è risparmiato nelle lesioni al canale di Guyon." },
  "ulnare-digitale": { nome: "Ramo superficiale del n. ulnare", nervo: "ulnare", radici: "C8",
    descrizione: "Faccia palmare di mignolo e metà ulnare dell'anulare con il palmo distale corrispondente. Area più costante: polpastrello del mignolo." },
  "ulnare-dorsale": { nome: "Ramo cutaneo dorsale del n. ulnare", nervo: "ulnare", radici: "C8",
    descrizione: "Dorso ulnare della mano, del mignolo e della metà ulnare dell'anulare. Origina 5–8 cm sopra il polso: coinvolto nelle lesioni al gomito, risparmiato in quelle al canale di Guyon." },

  // --- Arto inferiore
  ileoipogastrico: { nome: "N. ileoipogastrico", nervo: "ileoipogastrico", radici: "T12–L1", origine: "Plesso lombare",
    descrizione: "Cute sopra la cresta iliaca e la regione glutea laterale (ramo cutaneo laterale) e regione sovrapubica (ramo cutaneo anteriore)." },
  ilioinguinale: { nome: "N. ilioinguinale", nervo: "ilioinguinale", radici: "L1", origine: "Plesso lombare",
    descrizione: "Parte superomediale della coscia e regione genitale anteriore. Può essere leso nella chirurgia dell'ernia inguinale." },
  genitofemorale: { nome: "N. genitofemorale (ramo femorale)", nervo: "genitofemorale", radici: "L1–L2", origine: "Plesso lombare",
    descrizione: "Piccola area della coscia sotto la parte centrale del legamento inguinale (triangolo femorale)." },
  "cutaneo-femorale-laterale": { nome: "N. cutaneo femorale laterale", nervo: "cutaneo-femorale-laterale", radici: "L2–L3",
    descrizione: "Faccia anterolaterale della coscia fino al ginocchio. Meralgia parestesica: compressione sotto o attraverso il legamento inguinale, vicino alla spina iliaca anteriore superiore." },
  "femorale-cutaneo-anteriore": { nome: "Rami cutanei anteriori del n. femorale", nervo: "femorale", radici: "L2–L3",
    descrizione: "Faccia anteriore e anteromediale della coscia fino al ginocchio (nn. cutanei intermedio e mediale della coscia)." },
  otturatore: { nome: "Ramo cutaneo del n. otturatore", nervo: "otturatore", radici: "L2–L4",
    descrizione: "Area variabile, talora assente, della faccia mediale della coscia." },
  safeno: { nome: "N. safeno", nervo: "femorale", radici: "L3–L4",
    descrizione: "Faccia mediale del ginocchio (ramo infrapatellare), della gamba e del piede fino alla base dell'alluce. Lesioni: canale degli adduttori, chirurgia del ginocchio, prelievo della vena safena." },
  "cutaneo-surale-laterale": { nome: "N. cutaneo laterale della sura", nervo: "peroneo", radici: "L5–S1",
    descrizione: "Faccia laterale del terzo superiore della gamba. Origina dal peroneo comune nel cavo popliteo: spesso risparmiato nelle lesioni alla testa della fibula." },
  "peroneo-superficiale": { nome: "N. peroneo superficiale", nervo: "peroneo", radici: "L4–S1",
    descrizione: "Faccia anterolaterale dei due terzi inferiori della gamba, dorso del piede e delle dita, eccetto il primo spazio interdigitale e il margine laterale." },
  "peroneo-profondo": { nome: "N. peroneo profondo (ramo cutaneo)", nervo: "peroneo", radici: "L5",
    descrizione: "Primo spazio interdigitale dorsale (lati affrontati di alluce e II dito): area da esaminare nel piede cadente." },
  surale: { nome: "N. surale", nervo: "surale", radici: "S1–S2",
    descrizione: "Faccia posterolaterale del terzo distale della gamba, margine laterale del piede e del V dito, tallone laterale. Formato dal n. cutaneo mediale della sura (tibiale) e dal ramo comunicante del peroneo." },
  "tibiale-calcaneare": { nome: "Rami calcaneari mediali del n. tibiale", nervo: "tibiale", radici: "S1–S2",
    descrizione: "Tallone (faccia mediale e plantare). Originano spesso sopra il tunnel tarsale e possono essere risparmiati nella sindrome del tunnel tarsale." },
  "plantare-mediale": { nome: "N. plantare mediale", nervo: "tibiale", radici: "L4–L5",
    descrizione: "Due terzi mediali della pianta e faccia plantare di alluce, II, III dito e metà mediale del IV." },
  "plantare-laterale": { nome: "N. plantare laterale", nervo: "tibiale", radici: "S1–S2",
    descrizione: "Terzo laterale della pianta, faccia plantare del V dito e della metà laterale del IV." },
  "clunei-superiori": { nome: "Nn. clunei superiori", nervo: "clunei-superiori", radici: "L1–L3", origine: "Rami dorsali dei nervi spinali",
    descrizione: "Parte superiore della regione glutea. Possibile intrappolamento sulla cresta iliaca (dolore lombare e gluteo)." },
  "clunei-medi": { nome: "Nn. clunei medi", nervo: "clunei-medi", radici: "S1–S3", origine: "Rami dorsali dei nervi spinali",
    descrizione: "Parte mediale della regione glutea, accanto al sacro." },
  "clunei-inferiori": { nome: "Nn. clunei inferiori", nervo: "cutaneo-femorale-posteriore", radici: "S1–S3",
    descrizione: "Parte inferiore della regione glutea (rami del n. cutaneo femorale posteriore)." },
  "cutaneo-femorale-posteriore": { nome: "N. cutaneo femorale posteriore", nervo: "cutaneo-femorale-posteriore", radici: "S1–S3", origine: "Plesso sacrale",
    descrizione: "Faccia posteriore della coscia e cavo popliteo fino al terzo superiore della sura. Origina dal plesso sacrale indipendentemente dallo sciatico: è risparmiato nelle lesioni dello sciatico." },
};

// Nervi cutanei senza scheda in Anatomia: nome del gruppo e colore
export const NERVI_CUTANEI = {
  sopraclaveari: { nome: "Nn. sopraclaveari", colore: "#a3a3a3" },
  intercostobrachiale: { nome: "N. intercostobrachiale", colore: "#b48ead" },
  "cutaneo-mediale-braccio": { nome: "N. cutaneo mediale del braccio", colore: "#7f8c8d" },
  "cutaneo-mediale-avambraccio": { nome: "N. cutaneo mediale dell'avambraccio", colore: "#17a589" },
  ileoipogastrico: { nome: "N. ileoipogastrico", colore: "#b07aa1" },
  ilioinguinale: { nome: "N. ilioinguinale", colore: "#d98cb3" },
  genitofemorale: { nome: "N. genitofemorale", colore: "#7fb3d5" },
  "clunei-superiori": { nome: "Nn. clunei superiori", colore: "#a3a3a3" },
  "clunei-medi": { nome: "Nn. clunei medi", colore: "#c2b280" },
  "cutaneo-femorale-posteriore": { nome: "N. cutaneo femorale posteriore", colore: "#5d6d7e" },
};

// Mappe per regione: viste con le zone [id, parte, zona]
const tutto = {};
export const MAPPE = {
  superiore: {
    radici: ["C4", "C5", "C6", "C7", "C8", "T1", "T2"],
    viste: [
      {
        id: "anteriore", nome: "Faccia anteriore", geometria: "arto-superiore", parti: ["arto", "palmo", "d2", "d3", "d4", "d5", "d1"], bordo: ["d1"],
        note: [["laterale", 40, 70, "end"], ["mediale", 250, 70, "start"], ["palmo", 236, 505, "start"]],
        dermatomi: [
          ["C4", "arto", [[14, 0], [14, 0.75], [30, 0.62], [48, 0.25], [55, 0]]],
          ["T2", "arto", [[14, 0.75], [14, 1], [140, 1], [30, 0.62]]],
          ["T1", "arto", [[30, 0.62], [140, 1], [372, 1], [330, 0.7], [262, 0.56], [150, 0.56]]],
          ["C5", "arto", [[55, 0], [48, 0.25], [30, 0.62], [150, 0.56], [262, 0.56], [272, 0.3], [278, 0]]],
          ["C6", "arto", [[278, 0], [272, 0.3], [262, 0.56], [452, 0.5], [452, 0]]],
          ["C8", "arto", [[262, 0.56], [330, 0.7], [372, 1], [452, 1], [452, 0.5]]],
          ["C6", "palmo", [[448, 0], [448, 0.4], [545, 0.26], [545, 0]]],
          ["C7", "palmo", [[448, 0.4], [448, 0.5], [545, 0.5], [545, 0.26]]],
          ["C8", "palmo", [[448, 0.5], [448, 1], [545, 1], [545, 0.5]]],
          ["C6", "d1", tutto], ["C6", "d2", tutto], ["C7", "d3", tutto], ["C8", "d4", tutto], ["C8", "d5", tutto],
        ],
        territori: [
          ["sopraclaveari", "arto", [[14, 0], [14, 0.75], [30, 0.62], [48, 0.25], [55, 0]]],
          ["ascellare", "arto", [[55, 0], [48, 0.25], [38, 0.48], [140, 0.48], [150, 0]]],
          ["intercostobrachiale", "arto", [[14, 0.75], [14, 1], [150, 1], [110, 0.48], [38, 0.48], [30, 0.62]]],
          ["cutaneo-mediale-braccio", "arto", [[110, 0.48], [150, 1], [230, 1], [230, 0.48]]],
          ["radiale-cut-lat-inf-braccio", "arto", [[150, 0], [140, 0.48], [245, 0.48], [252, 0]]],
          ["cutaneo-mediale-avambraccio", "arto", [[230, 0.48], [230, 1], [452, 1], [452, 0.5], [245, 0.48]]],
          ["muscolocutaneo", "arto", [[252, 0], [245, 0.48], [452, 0.5], [452, 0]]],
          ["mediano-palmare", "palmo", [[448, 0], [448, 0.62], [500, 0.62], [500, 0]]],
          ["ulnare-palmare", "palmo", [[448, 0.62], [448, 1], [500, 1], [500, 0.62]]],
          ["mediano-digitale", "palmo", [[500, 0], [500, 0.62], [545, 0.62], [545, 0]]],
          ["ulnare-digitale", "palmo", [[500, 0.62], [500, 1], [545, 1], [545, 0.62]]],
          ["mediano-digitale", "d1", tutto], ["mediano-digitale", "d2", tutto], ["mediano-digitale", "d3", tutto],
          ["mediano-digitale", "d4", { v: [0, 0.5] }], ["ulnare-digitale", "d4", { v: [0.5, 1] }], ["ulnare-digitale", "d5", tutto],
        ],
        punti: [["C4", "arto", 22, 0.3], ["T2", "arto", 70, 0.94], ["C5", "arto", 250, 0.12], ["T1", "arto", 250, 0.9]],
      },
      {
        id: "posteriore", nome: "Faccia posteriore", geometria: "arto-superiore", specchio: true, parti: ["arto", "palmo", "d2", "d3", "d4", "d5", "d1"], bordo: ["d1"],
        note: [["mediale", 40, 70, "end"], ["laterale", 250, 70, "start"], ["dorso", 54, 505, "end"]],
        dermatomi: [
          ["C4", "arto", [[14, 0], [14, 0.75], [30, 0.62], [48, 0.25], [55, 0]]],
          ["T2", "arto", [[14, 0.75], [14, 1], [140, 1], [30, 0.62]]],
          ["T1", "arto", [[30, 0.62], [140, 1], [372, 1], [330, 0.75], [262, 0.6], [262, 0.45], [150, 0.5]]],
          ["C5", "arto", [[55, 0], [48, 0.25], [30, 0.62], [150, 0.5], [262, 0.45], [272, 0.2], [278, 0]]],
          ["C6", "arto", [[278, 0], [272, 0.2], [262, 0.45], [452, 0.3], [452, 0]]],
          ["C7", "arto", [[262, 0.45], [262, 0.6], [330, 0.75], [452, 0.68], [452, 0.3]]],
          ["C8", "arto", [[330, 0.75], [372, 1], [452, 1], [452, 0.68]]],
          ["C6", "palmo", [[448, 0], [448, 0.3], [545, 0.26], [545, 0]]],
          ["C7", "palmo", [[448, 0.3], [448, 0.68], [545, 0.5], [545, 0.26]]],
          ["C8", "palmo", [[448, 0.68], [448, 1], [545, 1], [545, 0.5]]],
          ["C6", "d1", tutto], ["C6", "d2", tutto], ["C7", "d3", tutto], ["C8", "d4", tutto], ["C8", "d5", tutto],
        ],
        territori: [
          ["sopraclaveari", "arto", [[14, 0], [14, 0.75], [30, 0.62], [48, 0.25], [55, 0]]],
          ["ascellare", "arto", [[55, 0], [48, 0.25], [38, 0.45], [140, 0.4], [150, 0]]],
          ["radiale-cut-post-braccio", "arto", [[38, 0.45], [30, 0.62], [60, 0.78], [228, 0.8], [245, 0.35], [140, 0.4]]],
          ["intercostobrachiale", "arto", [[14, 0.75], [14, 1], [120, 1], [60, 0.78], [30, 0.62]]],
          ["cutaneo-mediale-braccio", "arto", [[60, 0.78], [120, 1], [232, 1], [228, 0.8]]],
          ["radiale-cut-lat-inf-braccio", "arto", [[150, 0], [140, 0.4], [245, 0.35], [255, 0]]],
          ["muscolocutaneo", "arto", [[255, 0], [248, 0.25], [452, 0.22], [452, 0]]],
          ["radiale-cut-post-avambraccio", "arto", [[248, 0.25], [245, 0.35], [232, 0.7], [452, 0.68], [452, 0.22]]],
          ["cutaneo-mediale-avambraccio", "arto", [[232, 0.7], [228, 0.8], [232, 1], [452, 1], [452, 0.68]]],
          ["radiale-superficiale", "palmo", [[448, 0], [448, 0.62], [545, 0.62], [545, 0]]],
          ["ulnare-dorsale", "palmo", [[448, 0.62], [448, 1], [545, 1], [545, 0.62]]],
          ["radiale-superficiale", "d1", { y: [488, 551] }], ["mediano-digitale", "d1", { y: [551, 565] }],
          ["radiale-superficiale", "d2", { y: [538, 572] }], ["mediano-digitale", "d2", { y: [572, 603] }],
          ["radiale-superficiale", "d3", { y: [538, 575] }], ["mediano-digitale", "d3", { y: [575, 611] }],
          ["radiale-superficiale", "d4", { v: [0, 0.5], y: [538, 572] }], ["mediano-digitale", "d4", { v: [0, 0.5], y: [572, 603] }],
          ["ulnare-dorsale", "d4", { v: [0.5, 1] }], ["ulnare-dorsale", "d5", tutto],
        ],
        punti: [["C4", "arto", 22, 0.3], ["C6", "d1", 520, 0.5], ["C7", "d3", 556, 0.5], ["C8", "d5", 552, 0.5]],
      },
    ],
  },
  inferiore: {
    radici: ["T12", "L1", "L2", "L3", "L4", "L5", "S1", "S2", "S3"],
    viste: [
      {
        id: "anteriore", nome: "Faccia anteriore", geometria: "arto-inferiore", parti: ["arto", "piede", "p5", "p4", "p3", "p2", "p1"],
        note: [["laterale", 70, 60, "end"], ["mediale", 196, 60, "start"], ["dorso del piede", 186, 612, "start"]],
        dermatomi: [
          ["T12", "arto", [[18, 0], [18, 0.7], [28, 0.4], [45, 0]]],
          ["L1", "arto", [[45, 0], [28, 0.4], [18, 0.7], [18, 1], [110, 1], [70, 0.5], [95, 0]]],
          ["L2", "arto", [[95, 0], [70, 0.5], [110, 1], [240, 1], [195, 0.5], [160, 0]]],
          ["L3", "arto", [[160, 0], [195, 0.5], [240, 1], [360, 1], [330, 0.4], [300, 0]]],
          ["L4", "arto", [[330, 0.4], [360, 1], [590, 1], [590, 0.6], [450, 0.48]]],
          ["L5", "arto", [[300, 0], [330, 0.4], [450, 0.48], [590, 0.6], [590, 0.12], [540, 0]]],
          ["S1", "arto", [[540, 0], [590, 0.12], [590, 0]]],
          ["L4", "piede", [[586, 0.85], [586, 1], [625, 1], [625, 0.85]]],
          ["L5", "piede", [[586, 0.15], [586, 0.85], [625, 0.85], [625, 1], [640, 1], [640, 0.15]]],
          ["S1", "piede", [[586, 0], [586, 0.15], [640, 0.15], [640, 0]]],
          ["S1", "p5", tutto], ["L5", "p4", tutto], ["L5", "p3", tutto], ["L5", "p2", tutto], ["L5", "p1", tutto],
        ],
        territori: [
          ["ileoipogastrico", "arto", [[18, 0], [18, 1], [30, 1], [32, 0.6], [40, 0.3], [55, 0]]],
          ["genitofemorale", "arto", [[40, 0.3], [32, 0.6], [75, 0.68], [85, 0.4]]],
          ["ilioinguinale", "arto", [[32, 0.6], [30, 1], [100, 1], [100, 0.8], [75, 0.68]]],
          ["cutaneo-femorale-laterale", "arto", [[55, 0], [40, 0.3], [85, 0.4], [200, 0.36], [310, 0.25], [325, 0]]],
          ["femorale-cutaneo-anteriore", "arto", [[85, 0.4], [75, 0.68], [100, 0.8], [230, 0.8], [230, 1], [330, 1], [345, 0.3], [310, 0.25], [200, 0.36]]],
          ["otturatore", "arto", [[100, 0.8], [100, 1], [230, 1], [230, 0.8]]],
          ["cutaneo-surale-laterale", "arto", [[325, 0], [310, 0.25], [345, 0.3], [440, 0.35], [450, 0]]],
          ["safeno", "arto", [[330, 1], [340, 0.55], [590, 0.6], [590, 1]]],
          ["peroneo-superficiale", "arto", [[345, 0.3], [340, 0.55], [590, 0.6], [590, 0], [450, 0], [440, 0.35]]],
          ["surale", "piede", [[586, 0], [586, 0.12], [640, 0.12], [640, 0]]],
          ["safeno", "piede", [[586, 0.82], [586, 1], [620, 1], [620, 0.85]]],
          ["peroneo-superficiale", "piede", [[586, 0.12], [586, 0.82], [620, 0.85], [620, 1], [640, 1], [640, 0.84], [628, 0.82], [622, 0.7], [640, 0.66], [640, 0.12]]],
          ["peroneo-profondo", "piede", [[622, 0.7], [640, 0.66], [640, 0.84], [628, 0.82]]],
          ["surale", "p5", { v: [0, 0.5] }], ["peroneo-superficiale", "p5", { v: [0.5, 1] }],
          ["peroneo-superficiale", "p4", tutto], ["peroneo-superficiale", "p3", tutto],
          ["peroneo-superficiale", "p2", { v: [0, 0.5] }], ["peroneo-profondo", "p2", { v: [0.5, 1] }],
          ["peroneo-profondo", "p1", { v: [0, 0.4] }], ["peroneo-superficiale", "p1", { v: [0.4, 1] }],
        ],
        punti: [["T12", "arto", 22, 0.55], ["L1", "arto", 60, 0.8], ["L2", "arto", 160, 0.72], ["L3", "arto", 322, 0.9], ["L4", "arto", 582, 0.95], ["L5", "piede", 630, 0.4]],
      },
      {
        id: "posteriore", nome: "Faccia posteriore", geometria: "arto-inferiore", specchio: true, parti: ["arto", "tallone"],
        note: [["mediale", 70, 60, "end"], ["laterale", 196, 60, "start"]],
        dermatomi: [
          ["L1", "arto", [[18, 0], [18, 0.7], [30, 0.65], [55, 0]]],
          ["L2", "arto", [[55, 0], [30, 0.65], [18, 0.7], [18, 0.82], [40, 0.7], [70, 0.35], [110, 0]]],
          ["S3", "arto", [[18, 0.82], [18, 1], [125, 1], [120, 0.75], [40, 0.7]]],
          ["L3", "arto", [[110, 0], [70, 0.35], [40, 0.7], [120, 0.75], [130, 0.35], [330, 0.25], [340, 0]]],
          ["S2", "arto", [[130, 0.35], [120, 0.75], [125, 1], [300, 1], [340, 0.75], [470, 0.62], [470, 0.4], [330, 0.25]]],
          ["L3", "arto", [[300, 1], [360, 1], [340, 0.75]]],
          ["L4", "arto", [[360, 1], [340, 0.75], [470, 0.62], [590, 0.7], [590, 1]]],
          ["L5", "arto", [[340, 0], [330, 0.25], [470, 0.4], [480, 0.3], [460, 0]]],
          ["S1", "arto", [[460, 0], [480, 0.3], [470, 0.4], [470, 0.62], [590, 0.7], [590, 0]]],
          ["S1", "tallone", tutto],
        ],
        territori: [
          ["ileoipogastrico", "arto", [[18, 0], [18, 0.1], [60, 0.15], [70, 0]]],
          ["clunei-superiori", "arto", [[18, 0.1], [18, 0.8], [55, 0.7], [60, 0.15]]],
          ["clunei-medi", "arto", [[18, 0.8], [18, 1], [100, 1], [55, 0.7]]],
          ["clunei-inferiori", "arto", [[60, 0.15], [55, 0.7], [100, 1], [125, 1], [115, 0.3]]],
          ["cutaneo-femorale-laterale", "arto", [[70, 0], [60, 0.15], [115, 0.3], [260, 0.2], [290, 0]]],
          ["cutaneo-femorale-posteriore", "arto", [[115, 0.3], [123, 0.85], [320, 0.82], [400, 0.65], [400, 0.35], [320, 0.2], [260, 0.2]]],
          ["otturatore", "arto", [[123, 0.85], [125, 1], [260, 1], [320, 0.82]]],
          ["femorale-cutaneo-anteriore", "arto", [[260, 1], [340, 1], [320, 0.82]]],
          ["safeno", "arto", [[340, 1], [320, 0.82], [400, 0.65], [480, 0.75], [590, 0.85], [590, 1]]],
          ["cutaneo-surale-laterale", "arto", [[290, 0], [260, 0.2], [320, 0.2], [400, 0.35], [480, 0.4], [470, 0]]],
          ["surale", "arto", [[400, 0.35], [400, 0.65], [480, 0.75], [590, 0.85], [590, 0], [470, 0], [480, 0.4]]],
          ["surale", "tallone", { v: [0, 0.4] }], ["tibiale-calcaneare", "tallone", { v: [0.4, 1] }],
        ],
        punti: [["S3", "arto", 112, 0.86], ["S2", "arto", 350, 0.5], ["S1", "tallone", 610, 0.12]],
      },
      {
        id: "pianta", nome: "Pianta del piede (ingrandita)", geometria: "pianta", parti: ["pianta", "p5", "p4", "p3", "p2", "p1"],
        note: [["lat.", 44, 180, "end"], ["med.", 146, 180, "start"]],
        dermatomi: [
          ["S1", "pianta", [[48, 0], [48, 0.35], [180, 0.4], [240, 0.55], [240, 1], [324, 1], [324, 0]]],
          ["L5", "pianta", [[48, 0.35], [48, 1], [140, 1], [150, 0.85], [240, 0.55], [180, 0.4]]],
          ["L4", "pianta", [[140, 1], [150, 0.85], [240, 0.55], [240, 1]]],
          ["S1", "p5", tutto], ["S1", "p4", tutto], ["L5", "p3", tutto], ["L5", "p2", tutto], ["L5", "p1", tutto],
        ],
        territori: [
          ["surale", "pianta", [[100, 0], [100, 0.07], [240, 0.1], [324, 0.15], [324, 0]]],
          ["tibiale-calcaneare", "pianta", [[240, 0.1], [240, 1], [324, 1], [324, 0.15]]],
          ["plantare-laterale", "pianta", [[48, 0], [48, 0.42], [240, 0.4], [240, 0.1], [100, 0.07], [100, 0]]],
          ["plantare-mediale", "pianta", [[48, 0.42], [48, 1], [140, 1], [140, 0.94], [230, 0.94], [230, 1], [240, 1], [240, 0.4]]],
          ["safeno", "pianta", [[140, 0.94], [140, 1], [230, 1], [230, 0.94]]],
          ["plantare-laterale", "p5", tutto], ["plantare-laterale", "p4", { v: [0, 0.5] }], ["plantare-mediale", "p4", { v: [0.5, 1] }],
          ["plantare-mediale", "p3", tutto], ["plantare-mediale", "p2", tutto], ["plantare-mediale", "p1", tutto],
        ],
        punti: [],
      },
    ],
  },
};

// Area sensitiva di ciascuna lesione ("sorgente:sito"): territori cutanei o dermatomi
const RADIALE = ["radiale-cut-post-braccio", "radiale-cut-lat-inf-braccio", "radiale-cut-post-avambraccio", "radiale-superficiale"];
const ULNARE = ["ulnare-palmare", "ulnare-digitale", "ulnare-dorsale"];
const SCIATICO = ["cutaneo-surale-laterale", "peroneo-superficiale", "peroneo-profondo", "surale", "tibiale-calcaneare", "plantare-mediale", "plantare-laterale"];
const SOLO_MOTORIO = "Nessun deficit sensitivo cutaneo: il nervo è (quasi) solo motorio.";

const AREE = {
  "radiale:ascella": { territori: RADIALE },
  "radiale:solco-spirale": { territori: ["radiale-superficiale"], nota: "Il n. cutaneo posteriore del braccio origina nell'ascella ed è risparmiato; i nn. cutaneo laterale inferiore del braccio e posteriore dell'avambraccio sono coinvolti in modo variabile. Il deficit sensitivo è spesso modesto." },
  "radiale:pin": { territori: [], nota: "Nessun deficit sensitivo cutaneo: il n. interosseo posteriore porta solo fibre motorie e articolari." },
  "radiale:superficiale": { territori: ["radiale-superficiale"] },
  "mediano:ain": { territori: [], nota: "Nessun deficit sensitivo cutaneo: il n. interosseo anteriore porta solo fibre motorie e articolari." },
  "mediano:tunnel-carpale": { territori: ["mediano-digitale"], nota: "L'eminenza tenar è risparmiata: il ramo cutaneo palmare passa sopra il retinacolo dei flessori." },
  "ulnare:gomito": { territori: ULNARE, nota: "La faccia mediale dell'avambraccio (n. cutaneo mediale dell'avambraccio) è risparmiata: se è ipoestesica la lesione è più prossimale." },
  "ulnare:guyon": { territori: ["ulnare-digitale"], nota: "Risparmiati il dorso della mano (ramo cutaneo dorsale) e l'ipotenar prossimale (ramo cutaneo palmare). Se è colpito solo il ramo profondo il deficit è esclusivamente motorio." },
  "ulnare:ramo-profondo": { territori: [], nota: "Il ramo profondo è motorio: nessun deficit sensitivo." },
  "tronchi-brachiali:tronco-superiore": { dermatomi: ["C5", "C6"], nota: "Ipoestesia della faccia laterale di braccio e avambraccio e del pollice, simile ai dermatomi C5–C6; i potenziali sensitivi (cutaneo laterale dell'avambraccio, radiale superficiale, mediano dal pollice) sono ridotti perché la lesione è postgangliare." },
  "tronchi-brachiali:tronco-medio": { dermatomi: ["C7"], nota: "Ipoestesia nel territorio di C7 (dito medio) con potenziale sensitivo del mediano dal dito medio ridotto." },
  "tronchi-brachiali:tronco-inferiore": { dermatomi: ["C8", "T1"], nota: "Ipoestesia del margine ulnare di mano e avambraccio; potenziali sensitivi dell'ulnare e del cutaneo mediale dell'avambraccio ridotti." },
  "corde-brachiali:corda-laterale": { territori: ["muscolocutaneo", "mediano-palmare", "mediano-digitale"], nota: "Le fibre sensitive del mediano per pollice, indice e medio provengono soprattutto dalla corda laterale (C6–C7)." },
  "corde-brachiali:corda-posteriore": { territori: ["ascellare", ...RADIALE] },
  "corde-brachiali:corda-mediale": { territori: ["cutaneo-mediale-braccio", "cutaneo-mediale-avambraccio", ...ULNARE] },
  "femorale:safeno": { territori: ["safeno"] },
  "sciatico:gluteo": { territori: SCIATICO, nota: "Risparmiate la faccia posteriore della coscia (n. cutaneo femorale posteriore) e la faccia mediale di gamba e piede (n. safeno)." },
  "peroneo:testa-fibula": { territori: ["peroneo-superficiale", "peroneo-profondo"], nota: "Il n. cutaneo laterale della sura origina più in alto, nel cavo popliteo, ed è spesso risparmiato." },
  "peroneo:profondo": { territori: ["peroneo-profondo"] },
  "peroneo:superficiale": { territori: ["peroneo-superficiale"] },
  "peroneo:tarsale-anteriore": { territori: ["peroneo-profondo"] },
  "tibiale:popliteo": { territori: ["surale", "tibiale-calcaneare", "plantare-mediale", "plantare-laterale"], nota: "Il surale riceve anche un ramo comunicante dal peroneo: il deficit nel suo territorio può essere parziale." },
  "tibiale:tunnel-tarsale": { territori: ["plantare-mediale", "plantare-laterale"], nota: "I rami calcaneari mediali originano spesso sopra il retinacolo: il tallone può essere risparmiato." },
  "plesso-lombosacrale:plesso-lombare": { territori: ["ileoipogastrico", "ilioinguinale", "genitofemorale", "cutaneo-femorale-laterale", "femorale-cutaneo-anteriore", "otturatore", "safeno"] },
  "plesso-lombosacrale:tronco-lombosacrale": { dermatomi: ["L5"], nota: "Ipoestesia della faccia laterale della gamba e del dorso del piede come nella radicolopatia L5, ma con potenziale sensitivo del peroneo superficiale ridotto (lesione postgangliare)." },
  "plesso-lombosacrale:plesso-sacrale": { territori: ["cutaneo-femorale-posteriore", "clunei-inferiori", ...SCIATICO], nota: "A differenza della lesione dello sciatico è ipoestesica anche la faccia posteriore della coscia (n. cutaneo femorale posteriore)." },
};

// Territori di un nervo intero (senza sede di lesione)
export function territoriDelNervo(idNervo) {
  if (idNervo === "sciatico") return SCIATICO;
  return Object.keys(TERRITORI).filter((t) => TERRITORI[t].nervo === idNervo);
}

// Area sensitiva di una lesione: { territori, dermatomi, nota }
export function areaSensitiva(sorgente, sito, lesione = {}) {
  const definita = AREE[`${sorgente}:${sito}`];
  if (definita) return { territori: definita.territori || [], dermatomi: definita.dermatomi || [], nota: definita.nota || "" };
  if (lesione.radice) return { territori: [], dermatomi: [lesione.radice], nota: "" };
  const territori = territoriDelNervo(sorgente);
  return { territori, dermatomi: [], nota: territori.length ? "" : SOLO_MOTORIO };
}

// Confronti radice/nervo con quadri sensitivi simili
export const CONFRONTI = {
  superiore: [
    {
      id: "c6-mediano", titolo: "Parestesie a pollice e indice", dermatoma: "C6", territori: ["mediano-digitale"],
      a: "Radicolopatia C6", b: "N. mediano al carpo",
      righe: [
        ["Area", "Faccia laterale dell'avambraccio, pollice e indice, sul palmo e sul dorso", "Palmo di pollice, indice, medio e metà radiale dell'anulare; risparmiate eminenza tenar e avambraccio"],
        ["Forza", "Bicipite, brachioradiale, estensori radiali del carpo", "Abduttore breve del pollice, opponente"],
        ["Riflessi", "Bicipitale e brachioradiale ridotti", "Normali"],
        ["Indizi", "Dolore cervicale irradiato, peggiora con i movimenti del collo (Spurling)", "Sintomi notturni, migliorano scuotendo la mano; Tinel e Phalen"],
        ["ENG", "Potenziali sensitivi normali (lesione pregangliare)", "Rallentamento della conduzione del mediano attraverso il carpo"],
      ],
    },
    {
      id: "c8-ulnare", titolo: "Parestesie a mignolo e anulare", dermatoma: "C8", territori: ["ulnare-palmare", "ulnare-digitale", "ulnare-dorsale"],
      a: "Radicolopatia C8", b: "N. ulnare al gomito",
      righe: [
        ["Area", "Mignolo e anulare interi, margine ulnare di mano e avambraccio distale", "Mignolo e metà ulnare dell'anulare (l'anulare è 'diviso'), dorso ulnare della mano; avambraccio risparmiato"],
        ["Forza", "Anche muscoli non ulnari: abduttore breve del pollice, flessore lungo del pollice, estensore dell'indice", "Solo muscoli ulnari: interosseo dorsale I, abduttore del mignolo, flessore profondo di IV e V dito"],
        ["Riflessi", "Normali o flessore delle dita ridotto", "Normali"],
        ["ENG", "Potenziale sensitivo dell'ulnare normale", "Potenziale sensitivo dell'ulnare (e del ramo cutaneo dorsale) ridotto; rallentamento al gomito"],
      ],
    },
    {
      id: "c5-ascellare", titolo: "Ipoestesia della faccia laterale del braccio", dermatoma: "C5", territori: ["ascellare"],
      a: "Radicolopatia C5", b: "N. ascellare",
      righe: [
        ["Area", "Faccia laterale del braccio fino al gomito", "Area più piccola sopra il deltoide"],
        ["Forza", "Deltoide, sovraspinato, infraspinato, bicipite, romboidi", "Solo deltoide e piccolo rotondo"],
        ["Riflessi", "Bicipitale ridotto", "Normali"],
      ],
    },
  ],
  inferiore: [
    {
      id: "l5-peroneo", titolo: "Piede cadente con ipoestesia del dorso del piede", dermatoma: "L5", territori: ["peroneo-superficiale", "peroneo-profondo"],
      a: "Radicolopatia L5", b: "N. peroneo alla testa della fibula",
      righe: [
        ["Area", "Faccia laterale della gamba, dorso del piede e alluce; spesso anche parte della pianta", "Faccia anterolaterale della gamba distale e dorso del piede; pianta risparmiata"],
        ["Forza", "Anche inversione (tibiale posteriore) e abduzione dell'anca (medio gluteo)", "Inversione e abduzione dell'anca normali"],
        ["Riflessi", "Normali (talora ridotto quello degli ischiocrurali mediali)", "Normali"],
        ["ENG", "Potenziale sensitivo del peroneo superficiale normale", "Potenziale sensitivo del peroneo superficiale ridotto (lesione assonale); blocco di conduzione alla testa della fibula"],
      ],
    },
    {
      id: "l4-safeno", titolo: "Ipoestesia della faccia mediale della gamba", dermatoma: "L4", territori: ["safeno"],
      a: "Radicolopatia L4", b: "N. safeno",
      righe: [
        ["Area", "Faccia mediale di gamba e piede, spesso anche ginocchio anteriore", "Faccia mediale di ginocchio, gamba e piede"],
        ["Forza", "Quadricipite, tibiale anteriore, adduttori", "Nessun deficit (nervo solo sensitivo); se è leso il femorale, deficit di quadricipite con adduttori normali"],
        ["Riflessi", "Rotuleo ridotto", "Normali (rotuleo ridotto se è leso il femorale)"],
      ],
    },
    {
      id: "l2-meralgia", titolo: "Parestesie della faccia laterale della coscia", dermatoma: "L2", territori: ["cutaneo-femorale-laterale"],
      a: "Radicolopatia L2–L3", b: "Meralgia parestesica",
      righe: [
        ["Area", "Banda obliqua anteriore della coscia che prosegue medialmente verso il ginocchio", "Faccia anterolaterale della coscia, senza estensione mediale"],
        ["Forza", "Flessione e adduzione dell'anca, estensione del ginocchio", "Nessun deficit"],
        ["Riflessi", "Rotuleo talora ridotto (L3)", "Normali"],
        ["Indizi", "Dolore lombare irradiato", "Peggiora con anca estesa, cinture strette, obesità o gravidanza"],
      ],
    },
    {
      id: "s1-surale", titolo: "Ipoestesia del margine laterale del piede", dermatoma: "S1", territori: ["surale"],
      a: "Radicolopatia S1", b: "N. surale",
      righe: [
        ["Area", "Margine laterale del piede, tallone e pianta laterale, faccia posterolaterale della gamba", "Margine laterale del piede e del V dito, terzo distale posterolaterale della gamba"],
        ["Forza", "Flessione plantare (difficoltà a camminare sulle punte), estensione dell'anca", "Nessun deficit (nervo solo sensitivo)"],
        ["Riflessi", "Achilleo ridotto o assente", "Normali"],
        ["ENG", "Potenziale sensitivo del surale normale", "Potenziale sensitivo del surale ridotto o assente"],
      ],
    },
  ],
};
