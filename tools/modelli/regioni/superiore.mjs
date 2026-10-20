// Configurazione dell'estrazione: arto superiore destro.
import { X, Y, media, estremo } from "../geometria.mjs";

export const NOME = "Arto superiore destro";

// Scheletro di animazione: [articolazione, padre, alias della posa]
const GERARCHIA = [
  ["tronco", null], ["cingolo", "tronco"], ["spalla", "cingolo"], ["gomito", "spalla"], ["avambraccio", "gomito"], ["polso", "avambraccio"],
  ...[2, 3, 4, 5].flatMap((d) => [[`dito${d}_mcf`, "polso"], [`dito${d}_ifp`, `dito${d}_mcf`], [`dito${d}_ifd`, `dito${d}_ifp`]]),
  ["pollice_cmc", "polso"], ["pollice_mcf", "pollice_cmc"], ["pollice_if", "pollice_mcf"],
];

// Selezione delle strutture: nome Z-Anatomy (lato destro, suffisso .r) -> id del sito

export const OSSA = {
  "Clavicle.r": "cingolo", "Scapula.r": "cingolo", "Humerus.r": "spalla",
  "Ulna.r": "gomito", "Radius.r": "avambraccio",
  "Scaphoid bone.r": "polso", "Lunate bone.r": "polso", "Triquetrum bone.r": "polso", "Pisiform bone.r": "polso",
  "Trapezium bone.r": "polso", "Trapezoid bone.r": "polso", "Capitate bone.r": "polso", "Hamate bone.r": "polso",
  "Second metacarpal bone.r": "polso", "Third metacarpal bone.r": "polso", "Fourth metacarpal bone.r": "polso", "Fifth metacarpal bone.r": "polso",
  "First metacarpal bone.r": "pollice_cmc",
  "Proximal phalanx of first finger of hand.r": "pollice_mcf", "Distal phalanx of first finger of hand.r": "pollice_if",
};
const ORDINALI = { second: 2, third: 3, fourth: 4, fifth: 5 };
for (const [nome, d] of Object.entries(ORDINALI)) {
  OSSA[`Proximal phalanx of ${nome} finger of hand.r`] = `dito${d}_mcf`;
  OSSA[`Middle phalanx of ${nome} finger of hand.r`] = `dito${d}_ifp`;
  OSSA[`Distal phalanx of ${nome} finger of hand.r`] = `dito${d}_ifd`;
}

// Ossa di contesto (fisse): torace, colonna cervico-toracica, cingolo controlaterale
const CONTESTO = [/^Vertebra (C[3-7]|T\d+)$/, /rib\.[rl]$/i, /^Costal cartilage of .* rib\.[rl]$/, /sternum$/, /^Xiphoid process$/, /^Clavicle\.l$/, /^Scapula\.l$/];

export const MUSCOLI = {
  trapezio: ["Descending part of trapezius muscle.r", "Transverse part of trapezius muscle.r", "Ascending part of trapezius muscle.r"],
  "elevatore-scapola": ["Levator scapulae.r"],
  romboidi: ["Rhomboid major muscle.r", "Rhomboid minor muscle.r"],
  "serrato-anteriore": ["Serratus anterior muscle.r"],
  sovraspinato: ["Supraspinatus muscle.r"],
  infraspinato: ["Infraspinatus muscle.r"],
  "piccolo-rotondo": ["Teres minor muscle.r"],
  "grande-rotondo": ["Teres major muscle.r"],
  sottoscapolare: ["Subscapularis muscle.r"],
  "pettorale-clavicolare": ["Clavicular head of pectoralis major muscle.r"],
  "pettorale-sternocostale": ["Sternocostal head of pectoralis major muscle.r", "(Abdominal part of pectoralis major muscle).r"],
  "piccolo-pettorale": ["Pectoralis minor muscle.r"],
  "grande-dorsale": ["Latissimus dorsi muscle.r"],
  deltoide: ["Clavicular part of deltoid muscle.r", "Acromial part of deltoid muscle.r", "Scapular spinal part of deltoid muscle.r"],
  coracobrachiale: ["Coracobrachialis muscle.r"],
  bicipite: ["Long head of biceps brachii.r", "Short head of biceps brachii.r"],
  brachiale: ["Brachialis muscle.r"],
  tricipite: ["Long head of triceps brachii.r", "Lateral head of triceps brachii.r", "Medial head of triceps brachii.r"],
  brachioradiale: ["Brachioradialis muscle.r"],
  "pronatore-rotondo": ["Superficial head of pronator teres.r", "Deep head of pronator teres.r"],
  fcr: ["Flexor carpi radialis.r"],
  "palmare-lungo": ["Palmaris longus muscle.r"],
  fcu: ["Humeral head of flexor carpi ulnaris.r", "Ulnar head of flexor carpi ulnaris.r"],
  fds: ["Humero-ulnar head of flexor digitorum superficialis.r", "Radial head of flexor digitorum superficialis.r"],
  fpl: ["Flexor pollicis longus.r"],
  "pronatore-quadrato": ["Pronator quadratus.r"],
  anconeo: ["Anconeus muscle.r"],
  ecrl: ["Extensor carpi radialis longus.r"],
  ecrb: ["Extensor carpi radialis brevis.r"],
  supinatore: ["Supinator.r"],
  edc: ["Extensor digitorum.r"],
  edm: ["Extensor digiti minimi.r"],
  ecu: ["Humeral head of extensor carpi ulnaris.r", "Ulnar head of extensor carpi ulnaris.r"],
  apl: ["Abductor pollicis longus.r"],
  epb: ["Extensor pollicis brevis.r"],
  epl: ["Extensor pollicis longus.r"],
  eip: ["Extensor indicis.r"],
  apb: ["Abductor pollicis brevis.r"],
  "opponente-pollice": ["Opponens pollicis muscle.r"],
  fpb: ["Superficial head of flexor pollicis brevis.r"],
  "fpb-profondo": ["Deep head of flexor pollicis brevis.r"],
  "adduttore-pollice": ["Oblique head of adductor pollicis.r", "Transverse head of adductor pollicis.r"],
  adm: ["Abductor digiti minimi of hand.r"],
  odm: ["Opponens digiti minimi muscle of hand.r"],
  fdm: ["Flexor digiti minimi of hand.r"],
  "interossei-dorsali": ["Dorsal interossei muscles of hand.r"],
  "interossei-palmari": ["Palmar interossei muscles.r"],
};
// Muscoli a doppia innervazione presenti come un'unica mesh: divisi lungo x
// (x minore = laterale). FDP: indice e medio -> mediano; anulare e mignolo -> ulnare.
export const DA_DIVIDERE = {
  "Flexor digitorum profundus.r": ["fdp-mediano", "fdp-ulnare"],
  "Lumbrical muscles of hand.r": ["lombricali-mediano", "lombricali-ulnare"],
};

const NERVI = {
  accessorio: [/^Accessory nerve \(XI\)\.r$/],
  "dorsale-scapolare": [/^Dorsal scapular nerve\.r$/],
  "toracico-lungo": [/^Long thoracic nerve\.r$/],
  soprascapolare: [/^Suprascapular nerve\.r$/],
  pettorali: [/^(Lateral|Medial) pectoral nerve\.r$/],
  sottoscapolari: [/^(Superior|Inferior) subscapular nerve\.r$/],
  toracodorsale: [/^Thoracodorsal nerve\.r$/],
  ascellare: [/^Axillary nerve\.r$/, /of axillary nerve\.r$/, /^Superior lateral brachial cutaneous nerve\.r$/],
  muscolocutaneo: [/^Musculocutaneous nerve\.r$/, /^Lateral antebrachial cutaneous nerve\.r$/],
  radiale: [/^Radial nerve\.r$/, /of radial nerve\.r$/, /^Posterior interosseous nerve of forearm\.r$/, /^Posterior antebrachial cutaneous nerve\.r$/, /^Inferior lateral brachial cutaneous nerve\.r$/, /^Posterior brachial cutaneous nerve\.r$/],
  mediano: [/^Median nerve\.r$/, /of median nerve\.r$/, /^Anterior interosseous nerve of forearm\.r$/, /^\(Communicating branch of median nerve with ulnar nerve\)\.r$/],
  ulnare: [/^Ulnar nerve\.r$/, /of ulnar nerve\.r$/],
  plesso: [/brachial plexus\.r$/, /^Medial (brachial|antebrachial) cutaneous nerve\.r$/, /branch of medial antebrachial cutaneous nerve\.r$/, /^Subclavian nerve\.r$/],
};

export function classifica(nome, sorgente) {
  if (sorgente === "Skeletal") {
    if (OSSA[nome]) return [{ tipo: "osso", osso: OSSA[nome] }];
    if (CONTESTO.some((re) => re.test(nome))) return [{ tipo: "contesto", osso: "tronco" }];
  }
  if (sorgente === "Muscular") {
    for (const [id, nomi] of Object.entries(MUSCOLI)) if (nomi.includes(nome)) return [{ tipo: "muscolo", id }];
    if (DA_DIVIDERE[nome]) return DA_DIVIDERE[nome].map((id, i) => ({ tipo: "muscolo", id, meta: i }));
    if (nome === "Subclavius muscle.r") return [{ tipo: "muscolo", id: null }];
  }
  if (sorgente === "Nervous") {
    for (const [id, regole] of Object.entries(NERVI)) if (regole.some((re) => re.test(nome))) return [{ tipo: "nervo", id }];
  }
  return null;
}

export function calcolaScheletro(osso) {
  const omero = osso("Humerus.r"), radio = osso("Radius.r"), ulna = osso("Ulna.r");
  const scapola = osso("Scapula.r"), clavicola = osso("Clavicle.r");
  const testaOmero = estremo(omero, Y, "max", 0.035);
  const gomito = estremo(omero, Y, "min", 0.02);
  const testaRadio = estremo(radio, Y, "max", 0.015);
  const radioDistale = estremo(radio, Y, "min", 0.02);
  const ulnaProssimale = estremo(ulna, Y, "max", 0.02);
  const testaUlna = estremo(ulna, Y, "min", 0.015);
  const sternoclaveare = estremo(clavicola, X, "max", 0.01);
  const acromioclaveare = estremo(clavicola, X, "min", 0.01);
  const glena = media(scapola.filter((p) => Math.hypot(p[0] - testaOmero[0], p[1] - testaOmero[1], p[2] - testaOmero[2]) < 0.04));
  const margineMediale = estremo(scapola, X, "max", 0.01);
  const angoloInferiore = estremo(scapola, Y, "min", 0.01);
  const polso = media(osso("Capitate bone.r"));

  const articolazioni = {
    cingolo: sternoclaveare, spalla: testaOmero, gomito, avambraccio: testaRadio, polso,
  };
  const segmenti = {
    tronco: [[[0, 1.52, -0.05], [0, 1.0, -0.07]], [[0, 1.4, 0.06], [0, 1.18, 0.1]], [[-0.13, 1.35, 0.0], [-0.13, 1.05, 0.0]]],
    cingolo: [[sternoclaveare, acromioclaveare], [glena, margineMediale], [angoloInferiore, glena]],
    spalla: [[testaOmero, gomito]],
    gomito: [[ulnaProssimale, testaUlna]],
    avambraccio: [[testaRadio, radioDistale]],
    polso: [],
  };
  const capi = (nome) => [estremo(osso(nome), Y, "max", 0.006), estremo(osso(nome), Y, "min", 0.006)];
  for (const [n, d] of Object.entries(ORDINALI)) {
    const mc = capi(`${n[0].toUpperCase() + n.slice(1)} metacarpal bone.r`);
    segmenti.polso.push([polso, mc[1]]);
    for (const [fal, art] of [["Proximal", "mcf"], ["Middle", "ifp"], ["Distal", "ifd"]]) {
      const [a, b] = capi(`${fal} phalanx of ${n} finger of hand.r`);
      articolazioni[`dito${d}_${art}`] = a;
      segmenti[`dito${d}_${art}`] = [[a, b]];
    }
  }
  for (const [nomeOsso, art] of [["First metacarpal bone.r", "pollice_cmc"], ["Proximal phalanx of first finger of hand.r", "pollice_mcf"], ["Distal phalanx of first finger of hand.r", "pollice_if"]]) {
    const [a, b] = capi(nomeOsso);
    articolazioni[art] = a;
    segmenti[art] = [[a, b]];
  }
  return {
    tronco: [0, 1.3, -0.05],
    articolazioni,
    segmenti,
    // l'asse y dell'avambraccio coincide con l'asse di prono-supinazione (dalla testa dell'ulna a quella del radio)
    assi: { avambraccio: [testaUlna, testaRadio] },
    gerarchia: GERARCHIA,
    viste: { scala: 0.1, origine: "spalla" },
  };
}

