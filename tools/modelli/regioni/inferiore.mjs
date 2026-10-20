// Configurazione dell'estrazione: arto inferiore destro.
import { X, Y, Z, estremo, vicini, puntoMedio } from "../geometria.mjs";

export const NOME = "Arto inferiore destro";

// Le dita II–V hanno ossa proprie ma condividono la posa (alias) del modello schematico
const DITA = { second: 2, third: 3, fourth: 4, fifth: 5 };
const GERARCHIA = [
  ["tronco", null], ["anca", "tronco"], ["ginocchio", "anca"], ["caviglia", "ginocchio"],
  ["alluce_mtf", "caviglia"], ["alluce_if", "alluce_mtf"],
  ...Object.values(DITA).flatMap((d) => [
    [`dito${d}_mtf`, "caviglia", "dita_mtf"], [`dito${d}_ifp`, `dito${d}_mtf`, "dita_if"], [`dito${d}_ifd`, `dito${d}_ifp`, "dita_if"],
  ]),
];

const TARSO_METATARSO = [
  "Talus", "Calcaneus", "Navicular bone", "Cuboid bone", "Medial cuneiform bone", "Intermediate cuneiform bone", "Lateral cuneiform bone",
  "First metatarsal bone", "Second metatarsal bone", "Third metatarsal bone", "Fourth metatarsal bone", "Fifth metatarsal bone", "Sesamoid bones of foot",
];
export const OSSA = {
  "Femur.r": "anca", "Patella.r": "anca", "Tibia.r": "ginocchio", "Fibula.r": "ginocchio",
  ...Object.fromEntries(TARSO_METATARSO.map((n) => [`${n}.r`, "caviglia"])),
  "Proximal phalanx of first finger of foot.r": "alluce_mtf", "Distal phalanx of first finger of foot.r": "alluce_if",
};
for (const [nome, d] of Object.entries(DITA)) {
  OSSA[`Proximal phalanx of ${nome} finger of foot.r`] = `dito${d}_mtf`;
  OSSA[`Middle phalanx of ${nome} finger of foot.r`] = `dito${d}_ifp`;
  OSSA[`Distal phalanx of ${nome} finger of foot.r`] = `dito${d}_ifd`;
}

// Ossa di contesto (fisse): bacino, colonna lombare, arto inferiore sinistro
const OSSA_SINISTRE = Object.keys(OSSA).map((n) => n.replace(/\.r$/, ".l"));
const CONTESTO = [/^Hip bone\.[rl]$/, /^Sacrum$/, /^Coccyx$/, /^Vertebra L\d$/];

export const MUSCOLI = {
  ileopsoas: ["Iliacus muscle.r", "Psoas major.r"],
  pettineo: ["Pectineus muscle.r"],
  sartorio: ["Sartorius muscle.r"],
  quadricipite: ["Rectus femoris muscle.r", "Vastus lateralis muscle.r", "Vastus medialis muscle.r", "Vastus intermedius muscle.r"],
  "adduttore-lungo": ["Adductor longus.r"],
  "adduttore-breve": ["Adductor brevis.r"],
  "adduttore-grande": ["Adductor magnus.r", "(Adductor minimus).r"],
  gracile: ["Gracilis muscle.r"],
  "gluteo-medio": ["Gluteus medius muscle.r"],
  "gluteo-piccolo": ["Gluteus minimus muscle.r"],
  "grande-gluteo": ["Gluteus maximus muscle.r"],
  semitendinoso: ["Semitendinosus muscle.r"],
  semimembranoso: ["Semimembranosus muscle.r"],
  "bicipite-femorale-lungo": ["Long head of biceps femoris.r"],
  "bicipite-femorale-breve": ["Short head of biceps femoris.r"],
  "tibiale-anteriore": ["Tibialis anterior muscle.r"],
  edl: ["Extensor digitorum longus.r", "Tendon of extensor digitorum longus.r"],
  ehl: ["Extensor hallucis longus.r"],
  edb: ["Extensor digitorum brevis.r", "Extensor hallucis brevis.r"],
  "peroneo-terzo": ["Fibularis tertius muscle.r"],
  "peroneo-lungo": ["Fibularis longus muscle.r"],
  "peroneo-breve": ["Fibularis brevis muscle.r"],
  gastrocnemio: ["Lateral head of gastrocnemius.r", "Medial head of gastrocnemius.r"],
  soleo: ["Soleus muscle.r"],
  plantare: ["Plantaris muscle.r"],
  popliteo: ["Popliteus muscle.r"],
  "tibiale-posteriore": ["Tibialis posterior muscle.r"],
  fdl: ["Flexor digitorum longus.r"],
  fhl: ["Flexor hallucis longus.r"],
  "abduttore-alluce": ["Abductor hallucis.r"],
  fdb: ["Flexor digitorum brevis.r"],
  fhb: ["Medial head of flexor hallucis brevis.r", "Lateral head of flexor hallucis brevis.r"],
  "abduttore-v-dito": ["Abductor digiti minimi of foot.r"],
  "fdm-piede": ["Flexor digiti minimi of foot.r"],
  "quadrato-plantare": ["Quadratus plantae muscle.r"],
  "adduttore-alluce": ["Oblique head of adductor hallucis.r", "Transverse head of adductor hallucis.r"],
  "interossei-piede": ["Dorsal interossei muscles of foot.r", "Plantar interossei muscles.r"],
};
export const DA_DIVIDERE = {};
// Muscoli inclusi senza scheda nel sito (extrarotatori profondi, tendine calcaneare, ecc.)
const ALTRI_MUSCOLI = [
  "Piriformis muscle.r", "Obturator internus.r", "Obturator externus.r", "Superior gemellus muscle.r", "Inferior gemellus muscle.r",
  "Quadratus femoris muscle.r", "Calcaneal tendon.r", "Lumbrical muscles of foot.r", "(Opponens digiti minimi muscle of foot).r",
];

const NERVI = {
  "cutaneo-femorale-laterale": [/^Lateral femoral cutaneous nerve\.r$/],
  femorale: [/^Femoral nerve\.r$/, /of femoral nerve\.r$/, /saphenous nerve\.r$/i],
  otturatore: [/^Obturator nerve\.r$/, /of obturator nerve\.r$/],
  "gluteo-superiore": [/^Superior gluteal nerve\.r$/],
  sciatico: [/^Sciatic nerve\.r$/],
  peroneo: [/fibular nerve\.r$/, /^Medial dorsal cutaneous nerve of foot\.r$/, /^Intermediate dorsal cutaneous nerve of foot\.r$/],
  tibiale: [/^Tibial nerve\.r$/, /plantar nerve\.r$/, /^Medial sural cutaneous nerve\.r$/],
  surale: [/^Sural nerve\.r$/],
  // altri rami del plesso lombosacrale presenti nel modello, senza scheda dedicata
  plesso: [/^Ilio-inguinal nerve\.r$/, /^Iliohypogastric nerve\.r$/, /genitofemoral nerve\.r$/i, /posterior femoral cutaneous nerve\.r$/i, /^Nerve to (piriformis|quadratus femoris) muscle\.r$/, /^Pudendal nerve\.r$/],
};

export function classifica(nome, sorgente) {
  if (sorgente === "Skeletal") {
    if (OSSA[nome]) return [{ tipo: "osso", osso: OSSA[nome] }];
    if (OSSA_SINISTRE.includes(nome) || CONTESTO.some((re) => re.test(nome))) return [{ tipo: "contesto", osso: "tronco" }];
  }
  if (sorgente === "Muscular") {
    for (const [id, nomi] of Object.entries(MUSCOLI)) if (nomi.includes(nome)) return [{ tipo: "muscolo", id }];
    if (ALTRI_MUSCOLI.includes(nome)) return [{ tipo: "muscolo", id: null }];
  }
  if (sorgente === "Nervous") {
    for (const [id, regole] of Object.entries(NERVI)) if (regole.some((re) => re.test(nome))) return [{ tipo: "nervo", id }];
  }
  return null;
}

export function calcolaScheletro(osso) {
  const femore = osso("Femur.r"), tibia = osso("Tibia.r"), fibula = osso("Fibula.r"), bacino = osso("Hip bone.r");
  // Testa del femore: parte prossimale più mediale (il grande trocantere è laterale)
  const yMax = Math.max(...femore.map((p) => p[Y]));
  const prossimale = femore.filter((p) => p[Y] > yMax - 0.07);
  const xMedio = prossimale.reduce((a, p) => a + p[X], 0) / prossimale.length;
  const testaFemore = estremo(prossimale.filter((p) => p[X] > xMedio), Y, "max", 0.045);
  const trocantere = estremo(femore, X, "min", 0.01);
  const ginocchio = estremo(femore, Y, "min", 0.03);
  const piattoTibiale = estremo(tibia, Y, "max", 0.02);
  const malleoloMediale = estremo(tibia, Y, "min", 0.015);
  const testaFibula = estremo(fibula, Y, "max", 0.015);
  const malleoloLaterale = estremo(fibula, Y, "min", 0.015);
  const caviglia = puntoMedio(malleoloMediale, malleoloLaterale);
  const calcagno = estremo(osso("Calcaneus.r"), Z, "min", 0.01);
  const acetabolo = vicini(bacino, testaFemore, 0.04);
  const cresta = estremo(bacino, Y, "max", 0.01);
  const ischio = estremo(bacino, Y, "min", 0.01);
  const pube = estremo(bacino, X, "max", 0.01);
  const sacro = [0, 0.97, -0.07];

  const articolazioni = { anca: testaFemore, ginocchio, caviglia };
  const segmenti = {
    tronco: [[[0, 1.13, -0.03], [0, 0.95, -0.05]], [sacro, [0, 0.84, -0.08]], [cresta, acetabolo], [acetabolo, ischio], [acetabolo, pube], [cresta, sacro]],
    anca: [[testaFemore, ginocchio], [trocantere, ginocchio]],
    ginocchio: [[piattoTibiale, malleoloMediale], [testaFibula, malleoloLaterale]],
    caviglia: [[caviglia, calcagno]],
  };
  // il piede è orientato lungo z+: estremo prossimale = z minima, distale = z massima
  const capi = (nome) => [estremo(osso(nome), Z, "min", 0.004), estremo(osso(nome), Z, "max", 0.004)];
  const ordinali = { first: 1, ...DITA };
  for (const nome of Object.keys(ordinali)) segmenti.caviglia.push([caviglia, capi(`${nome[0].toUpperCase() + nome.slice(1)} metatarsal bone.r`)[1]]);
  for (const [osso_, art] of [["Proximal phalanx of first finger of foot.r", "alluce_mtf"], ["Distal phalanx of first finger of foot.r", "alluce_if"]]) {
    const [a, b] = capi(osso_);
    articolazioni[art] = a;
    segmenti[art] = [[a, b]];
  }
  for (const [nome, d] of Object.entries(DITA)) {
    for (const [fal, art] of [["Proximal", "mtf"], ["Middle", "ifp"], ["Distal", "ifd"]]) {
      const [a, b] = capi(`${fal} phalanx of ${nome} finger of foot.r`);
      articolazioni[`dito${d}_${art}`] = a;
      segmenti[`dito${d}_${art}`] = [[a, b]];
    }
  }
  return {
    tronco: [0, 0.95, -0.05],
    articolazioni,
    segmenti,
    assi: {},
    gerarchia: GERARCHIA,
    viste: { scala: 0.1, origine: "anca" },
  };
}
