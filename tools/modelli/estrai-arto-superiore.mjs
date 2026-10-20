// Estrae l'arto superiore destro (ossa, muscoli, nervi) dai modelli Z-Anatomy
// e produce assets/models/arto-superiore.glb per il visualizzatore 3D.
//
// Fonte: Z-Anatomy (CC BY-SA 4.0), derivato da BodyParts3D (DBCLS, CC BY-SA 2.1 JP).
// Il file prodotto è un'opera derivata e va distribuito con la stessa licenza:
// vedi assets/models/LICENZA.md.
//
// Uso (vedi README.md in questa cartella):
//   node estrai-arto-superiore.mjs <cartella con i .glb convertiti> [file di uscita]

import { NodeIO, Document } from "@gltf-transform/core";
import { EXTMeshoptCompression, KHRMeshQuantization } from "@gltf-transform/extensions";
import { weld, simplify, quantize, prune, reorder } from "@gltf-transform/functions";
import { MeshoptEncoder, MeshoptSimplifier } from "meshoptimizer";
import path from "node:path";

const [cartella, uscita = "../../assets/models/arto-superiore.glb"] = process.argv.slice(2);
if (!cartella) {
  console.error("Uso: node estrai-arto-superiore.mjs <cartella con SkeletalSystem100.glb, MuscularSystem100.glb, NervousSystem100.glb> [uscita]");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Selezione delle strutture: nome Z-Anatomy (lato destro, suffisso .r) -> id del sito

const OSSA = {
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

const MUSCOLI = {
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
const DA_DIVIDERE = {
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

function classifica(nome, sorgente) {
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

// ---------------------------------------------------------------------------
// Lettura e appiattimento delle mesh (trasformazioni applicate ai vertici)

const io = new NodeIO().registerExtensions([EXTMeshoptCompression, KHRMeshQuantization]).registerDependencies({
  "meshopt.encoder": MeshoptEncoder,
  "meshopt.decoder": MeshoptEncoder,
});

function trasforma(m, x, y, z) {
  return [m[0] * x + m[4] * y + m[8] * z + m[12], m[1] * x + m[5] * y + m[9] * z + m[13], m[2] * x + m[6] * y + m[10] * z + m[14]];
}

async function estrai(sorgente) {
  const doc = await io.read(path.join(cartella, `${sorgente}System100.glb`));
  const scena = doc.getRoot().getDefaultScene() || doc.getRoot().listScenes()[0];
  const risultati = [];
  scena.traverse((nodo) => {
    const mesh = nodo.getMesh();
    if (!mesh) return;
    const nome = nodo.getName();
    const classi = classifica(nome, sorgente);
    if (!classi) return;
    const m = nodo.getWorldMatrix();
    const pos = [];
    const idx = [];
    for (const prim of mesh.listPrimitives()) {
      const a = prim.getAttribute("POSITION");
      const base = pos.length / 3;
      for (let i = 0; i < a.getCount(); i++) pos.push(...trasforma(m, ...a.getElement(i, [])));
      const ind = prim.getIndices();
      if (ind) for (let i = 0; i < ind.getCount(); i++) idx.push(base + ind.getScalar(i));
      else for (let i = 0; i < a.getCount(); i++) idx.push(base + i);
    }
    if (classi.length === 1) risultati.push({ nome, ...classi[0], pos, idx });
    else risultati.push(...dividiLungoX(nome, classi, pos, idx));
  });
  return risultati;
}

function dividiLungoX(nome, classi, pos, idx) {
  let min = Infinity, max = -Infinity;
  for (let i = 0; i < pos.length; i += 3) (min = Math.min(min, pos[i])), (max = Math.max(max, pos[i]));
  const soglia = (min + max) / 2;
  const parti = classi.map(() => []);
  for (let t = 0; t < idx.length; t += 3) {
    const cx = (pos[idx[t] * 3] + pos[idx[t + 1] * 3] + pos[idx[t + 2] * 3]) / 3;
    parti[cx < soglia ? 0 : 1].push(idx[t], idx[t + 1], idx[t + 2]);
  }
  return classi.map((c, i) => ({ nome: `${nome} (${i === 0 ? "parte laterale" : "parte mediale"})`, ...c, pos, idx: parti[i] }));
}

// ---------------------------------------------------------------------------
// Centri articolari e segmenti ossei (per lo scheletro di animazione)

const vertici = (s) => {
  const v = [];
  for (let i = 0; i < s.pos.length; i += 3) v.push([s.pos[i], s.pos[i + 1], s.pos[i + 2]]);
  return v;
};
const media = (pts) => pts.reduce((a, p) => [a[0] + p[0], a[1] + p[1], a[2] + p[2]], [0, 0, 0]).map((x) => +(x / pts.length).toFixed(4));
const estremo = (v, asse, lato, spessore) => {
  const vals = v.map((p) => p[asse]);
  const lim = lato === "max" ? Math.max(...vals) - spessore : Math.min(...vals) + spessore;
  return media(v.filter((p) => (lato === "max" ? p[asse] >= lim : p[asse] <= lim)));
};
const Y = 1, X = 0;

function calcolaScheletro(strutture) {
  const osso = (nome) => {
    const s = strutture.find((x) => x.nome === nome);
    if (!s) throw new Error(`Osso non trovato: ${nome}`);
    return vertici(s);
  };
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
    articolazioni,
    segmenti,
    // asse di prono-supinazione: dalla testa del radio alla testa dell'ulna
    assePronoSupinazione: [testaRadio, testaUlna],
  };
}

// ---------------------------------------------------------------------------
// Scrittura del glTF

const strutture = [...(await estrai("Skeletal")), ...(await estrai("Muscular")), ...(await estrai("Nervous"))];
const scheletro = calcolaScheletro(strutture);
const conteggio = {};
strutture.forEach((s) => (conteggio[s.tipo] = (conteggio[s.tipo] || 0) + 1));
console.log("Strutture selezionate:", conteggio);
const idMuscoliTrovati = new Set(strutture.filter((s) => s.tipo === "muscolo").map((s) => s.id));
const mancanti = [...Object.keys(MUSCOLI), ...Object.values(DA_DIVIDERE).flat()].filter((id) => !idMuscoliTrovati.has(id));
if (mancanti.length) console.warn("Muscoli non trovati:", mancanti);

const out = new Document();
const buffer = out.createBuffer();
const materiali = {};
const scena = out.createScene("Arto superiore destro");
for (const s of strutture) {
  materiali[s.tipo] ||= out.createMaterial(s.tipo);
  const posizioni = out.createAccessor().setType("VEC3").setArray(new Float32Array(s.pos)).setBuffer(buffer);
  const indici = out.createAccessor().setType("SCALAR").setArray(new Uint32Array(s.idx)).setBuffer(buffer);
  const prim = out.createPrimitive().setAttribute("POSITION", posizioni).setIndices(indici).setMaterial(materiali[s.tipo]);
  const mesh = out.createMesh(s.nome).addPrimitive(prim);
  const extras = { tipo: s.tipo, nome: s.nome };
  if (s.id) extras.id = s.id;
  if (s.osso) extras.osso = s.osso;
  scena.addChild(out.createNode(s.nome).setMesh(mesh).setExtras(extras));
}
scena.setExtras({
  ...scheletro,
  fonte: "Z-Anatomy (CC BY-SA 4.0), derivato da BodyParts3D, The Database Center for Life Science (CC BY-SA 2.1 JP). Modificato: selezione dell'arto superiore destro, semplificazione e compressione.",
  licenza: "CC BY-SA 4.0",
});
out.getRoot().setDefaultScene(scena);
out.getRoot().getAsset().copyright = "Z-Anatomy (CC BY-SA 4.0); BodyParts3D, DBCLS (CC BY-SA 2.1 JP)";

await MeshoptSimplifier.ready;
await MeshoptEncoder.ready;
await out.transform(
  weld(),
  simplify({ simplifier: MeshoptSimplifier, ratio: 0.5, error: 0.0004 }),
  prune(),
  reorder({ encoder: MeshoptEncoder }),
  quantize({ quantizePosition: 14 })
);
out.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });
await io.write(uscita, out);
console.log("Scritto", uscita);
