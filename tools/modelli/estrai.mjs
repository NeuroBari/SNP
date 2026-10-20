// Estrae un arto destro (ossa, muscoli, nervi) dai modelli Z-Anatomy e produce
// assets/models/arto-<regione>.glb per il visualizzatore 3D. La selezione delle
// strutture e il calcolo dei centri articolari sono in regioni/<regione>.mjs.
//
// Fonte: Z-Anatomy (CC BY-SA 4.0), derivato da BodyParts3D (DBCLS, CC BY-SA 2.1 JP).
// Il file prodotto è un'opera derivata e va distribuito con la stessa licenza:
// vedi assets/models/LICENZA.md.
//
// Uso (vedi README.md in questa cartella):
//   node estrai.mjs <superiore|inferiore> <cartella con i .glb convertiti> [file di uscita]

import { NodeIO, Document } from "@gltf-transform/core";
import { EXTMeshoptCompression, KHRMeshQuantization } from "@gltf-transform/extensions";
import { weld, simplify, quantize, prune, reorder } from "@gltf-transform/functions";
import { MeshoptEncoder, MeshoptSimplifier } from "meshoptimizer";
import path from "node:path";
import { vertici } from "./geometria.mjs";

const [regione, cartella, uscita = `../../assets/models/arto-${regione}.glb`] = process.argv.slice(2);
if (!["superiore", "inferiore"].includes(regione) || !cartella) {
  console.error("Uso: node estrai.mjs <superiore|inferiore> <cartella con SkeletalSystem100.glb, MuscularSystem100.glb, NervousSystem100.glb> [uscita]");
  process.exit(1);
}
const config = await import(`./regioni/${regione}.mjs`);

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
    const classi = config.classifica(nome, sorgente);
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
// Scrittura del glTF

const strutture = [...(await estrai("Skeletal")), ...(await estrai("Muscular")), ...(await estrai("Nervous"))];
const scheletro = config.calcolaScheletro((nome) => {
  const s = strutture.find((x) => x.nome === nome);
  if (!s) throw new Error(`Osso non trovato: ${nome}`);
  return vertici(s);
});
const conteggio = {};
strutture.forEach((s) => (conteggio[s.tipo] = (conteggio[s.tipo] || 0) + 1));
console.log("Strutture selezionate:", conteggio);
const idMuscoliTrovati = new Set(strutture.filter((s) => s.tipo === "muscolo").map((s) => s.id));
const mancanti = [...Object.keys(config.MUSCOLI), ...Object.values(config.DA_DIVIDERE).flat()].filter((id) => !idMuscoliTrovati.has(id));
if (mancanti.length) console.warn("Muscoli non trovati:", mancanti);

const out = new Document();
const buffer = out.createBuffer();
const materiali = {};
const scena = out.createScene(config.NOME);
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
  fonte: `Z-Anatomy (CC BY-SA 4.0), derivato da BodyParts3D, The Database Center for Life Science (CC BY-SA 2.1 JP). Modificato: selezione dell'${config.NOME.toLowerCase()}, semplificazione e compressione.`,
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
