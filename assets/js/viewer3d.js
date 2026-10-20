// Visualizzatore 3D dell'arto superiore o inferiore destro.
//
// Due modelli possibili:
//  - SCHEMATICO, procedurale: segmenti (es. braccio, avambraccio, mano, dita)
//    collegati da articolazioni con nomi fissi;
//  - REALISTICO (solo arto superiore): ossa, muscoli e nervi di Z-Anatomy
//    (CC BY-SA 4.0) caricati da assets/models/arto-superiore.glb. Le ossa seguono
//    rigidamente le articolazioni, muscoli e nervi si deformano con pesi calcolati
//    dalla distanza dai segmenti ossei.
// I movimenti in `data/arto-*.js` agiscono solo sui nomi delle articolazioni,
// quindi guidano entrambi i modelli. Vedi docs/MODELLI-3D.md.

import * as THREE from "three";
import { OrbitControls } from "three/addons/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";

const DEG = Math.PI / 180;
const L_BRACCIO = 3.0;
const L_AVAMBRACCIO = 2.6;
const L_COSCIA = 4.2;
const L_GAMBA = 3.9;

const COLORE_MUSCOLO = 0xb35a50;
const COLORE_PELLE = 0xe8c4a8;
const COLORE_OSSO = 0xf2ede0;
const COLORE_NERVO = 0xe9c46a;

const VISTE_SUPERIORE = {
  generale: [[-8, 2, 16], [1.0, -2.8, 0]],
  anteriore: [[1.0, -2.8, 19], [1.0, -2.8, 0]],
  laterale: [[-18, -2, 1], [0, -2.8, 0]],
  posteriore: [[1.0, -2.0, -19], [1.0, -2.8, 0]],
  scapola: [[-7, 1, -14], [1.0, -1.0, 0]],
  spalla: [[-12, 3, 14], [0.5, -0.8, 0]],
  avambraccio: [[-7, 1.5, 9], [0, -3, 1.6]],
  mano: [[-3, -5.2, 6.5], [0, -6.4, 0.3]],
};
// Il modello realistico è in metri, con la spalla destra circa qui:
// 1 unità del modello schematico corrisponde a ~10 cm.
const SCALA_REALISTICO = 0.1;
const SPALLA_REALISTICO = [-0.165, 1.395, -0.02];

// Gerarchia dello scheletro di animazione del modello realistico
const OSSA_REALISTICO = [
  ["tronco", null], ["cingolo", "tronco"], ["spalla", "cingolo"], ["gomito", "spalla"], ["avambraccio", "gomito"], ["polso", "avambraccio"],
  ...[2, 3, 4, 5].flatMap((d) => [[`dito${d}_mcf`, "polso"], [`dito${d}_ifp`, `dito${d}_mcf`], [`dito${d}_ifd`, `dito${d}_ifp`]]),
  ["pollice_cmc", "polso"], ["pollice_mcf", "pollice_cmc"], ["pollice_if", "pollice_mcf"],
];

export class Visualizzatore {
  constructor(contenitore, { regione = "superiore", modello = "schematico", urlModello, onCaricamento, onMuscoloClick, onMuscoloHover } = {}) {
    this.contenitore = contenitore;
    this.onMuscoloClick = onMuscoloClick;
    this.onMuscoloHover = onMuscoloHover;
    this.articolazioni = {}; // nome -> { obj, riposo: {r: Euler, p: Vector3} }
    this.muscoli = {}; // id -> [Mesh]
    this.altriMuscoli = []; // muscoli del modello realistico senza scheda
    this.nervi = {}; // id -> [Mesh] (solo modello realistico)
    this.scalaPosa = 1; // fattore per le traslazioni delle pose
    this.movimento = null;
    this.velocita = 1;
    this.ampiezza = 1; // <1 simula un deficit di forza (escursione ridotta)
    this.inPausa = false;
    this.fase = 0;

    this._initScena();
    this.pronto = Promise.resolve();
    if (regione === "inferiore") this._costruisciArtoInferiore();
    else if (modello === "realistico") {
      this.realistico = true;
      this._impostaVisteRealistiche(SPALLA_REALISTICO);
      this.pronto = this._caricaRealistico(urlModello, onCaricamento);
    } else this._costruisciArtoSuperiore();
    this.vista("generale");
    this._initInterazione();
    this._loop = this._loop.bind(this);
    this._orologio = new THREE.Clock();
    requestAnimationFrame(this._loop);
  }

  _initScena() {
    const w = this.contenitore.clientWidth;
    const h = this.contenitore.clientHeight;
    this.scena = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 200);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.renderer.localClippingEnabled = true;
    this.contenitore.appendChild(this.renderer.domElement);

    this.controlli = new OrbitControls(this.camera, this.renderer.domElement);
    this.controlli.enableDamping = true;

    this.scena.add(new THREE.HemisphereLight(0xffffff, 0x8a7f73, 1.1));
    const luce = new THREE.DirectionalLight(0xffffff, 1.6);
    luce.position.set(-5, 8, 10);
    this.scena.add(luce);
    const controluce = new THREE.DirectionalLight(0xffffff, 0.6);
    controluce.position.set(5, 2, -10);
    this.scena.add(controluce);

    new ResizeObserver(() => this._ridimensiona()).observe(this.contenitore);
  }

  _ridimensiona() {
    const w = this.contenitore.clientWidth;
    const h = this.contenitore.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  _registra(nome, obj) {
    this.articolazioni[nome] = { obj, riposo: { r: obj.rotation.clone(), p: obj.position.clone() } };
    return obj;
  }

  _materialePelle() {
    return new THREE.MeshStandardMaterial({ color: COLORE_PELLE, transparent: true, opacity: 0.22, roughness: 0.8, depthWrite: false });
  }

  _capsula(raggio, lunghezza, materiale, y0 = 0) {
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(raggio, Math.max(lunghezza - 2 * raggio, 0.01), 8, 16), materiale);
    m.position.y = y0 - lunghezza / 2;
    return m;
  }

  _osso(raggio, lunghezza, x = 0, z = 0) {
    const m = this._capsula(raggio, lunghezza, new THREE.MeshStandardMaterial({ color: COLORE_OSSO, roughness: 0.6 }));
    m.position.x = x;
    m.position.z = z;
    return m;
  }

  _costruisciArtoSuperiore() {
    this.lunghezze = { braccio: L_BRACCIO, avambraccio: L_AVAMBRACCIO };
    this.viste = VISTE_SUPERIORE;
    const corpo = new THREE.Group();
    this.scena.add(corpo);
    this.segmenti = { tronco: corpo };

    // Tronco e testa (contesto)
    const pelle = this._materialePelle();
    const tronco = new THREE.Mesh(new THREE.BoxGeometry(3.6, 4.8, 1.6, 1, 1, 1), pelle);
    tronco.position.set(2.2, -1.8, 0);
    corpo.add(tronco);
    const collo = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.8, 16), pelle);
    collo.position.set(2.2, 0.95, 0);
    corpo.add(collo);
    const testa = new THREE.Mesh(new THREE.SphereGeometry(0.85, 24, 16), pelle);
    testa.position.set(2.2, 2.0, 0.05);
    corpo.add(testa);
    const naso = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 8), pelle);
    naso.rotation.x = Math.PI / 2;
    naso.position.set(2.2, 2.0, 0.95);
    corpo.add(naso); // indica la faccia anteriore

    // Cingolo scapolare (trasla per elevazione / retrazione / protrazione)
    const cingolo = this._registra("cingolo", new THREE.Group());
    corpo.add(cingolo);
    const scapola = new THREE.Mesh(
      new THREE.ShapeGeometry(new THREE.Shape([new THREE.Vector2(0.2, 0.3), new THREE.Vector2(1.5, 0.35), new THREE.Vector2(1.3, -1.8)])),
      new THREE.MeshStandardMaterial({ color: COLORE_OSSO, side: THREE.DoubleSide, roughness: 0.6 })
    );
    scapola.position.z = -0.84;
    cingolo.add(scapola);
    const clavicola = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.0, 8), new THREE.MeshStandardMaterial({ color: COLORE_OSSO }));
    clavicola.rotation.z = Math.PI / 2 - 0.12;
    clavicola.position.set(1.15, 0.38, 0.6);
    cingolo.add(clavicola);

    // Spalla e braccio
    const spalla = this._registra("spalla", new THREE.Group());
    cingolo.add(spalla);
    spalla.add(new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 12), pelle));
    spalla.add(this._capsula(0.42, L_BRACCIO, pelle));
    spalla.add(this._osso(0.09, L_BRACCIO - 0.1, 0, 0));
    this.segmenti.braccio = spalla;

    // Gomito, prono-supinazione e avambraccio
    const gomito = new THREE.Group();
    gomito.position.y = -L_BRACCIO;
    this._registra("gomito", gomito);
    spalla.add(gomito);
    gomito.add(new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 12), pelle));
    const avambraccio = this._registra("avambraccio", new THREE.Group());
    gomito.add(avambraccio);
    avambraccio.add(this._capsula(0.35, L_AVAMBRACCIO, pelle));
    avambraccio.add(this._osso(0.06, L_AVAMBRACCIO - 0.1, -0.15, 0)); // radio (laterale)
    avambraccio.add(this._osso(0.06, L_AVAMBRACCIO - 0.1, 0.15, -0.02)); // ulna (mediale)
    this.segmenti.avambraccio = avambraccio;

    // Polso e mano
    const polso = new THREE.Group();
    polso.position.y = -L_AVAMBRACCIO;
    this._registra("polso", polso);
    avambraccio.add(polso);
    const palmo = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.92, 0.26), pelle);
    palmo.position.y = -0.46;
    polso.add(palmo);
    [-0.3, -0.1, 0.1, 0.3].forEach((x) => {
      const mc = this._osso(0.035, 0.8, x, 0);
      mc.position.y = -0.48;
      polso.add(mc);
    });
    this.segmenti.mano = polso;

    const falangi = { 2: [0.45, 0.28, 0.2], 3: [0.5, 0.3, 0.22], 4: [0.47, 0.29, 0.21], 5: [0.36, 0.22, 0.18] };
    const xDita = { 2: -0.3, 3: -0.1, 4: 0.1, 5: 0.3 };
    const matDito = new THREE.MeshStandardMaterial({ color: COLORE_PELLE, roughness: 0.7, transparent: true, opacity: 0.85 });
    for (const d of [2, 3, 4, 5]) {
      let padre = polso;
      let y = -0.92;
      ["mcf", "ifp", "ifd"].forEach((art, i) => {
        const g = new THREE.Group();
        g.position.set(i === 0 ? xDita[d] : 0, y, 0);
        padre.add(g);
        this._registra(`dito${d}_${art}`, g);
        g.add(this._capsula(0.085 - i * 0.008, falangi[d][i], matDito));
        padre = g;
        y = -falangi[d][i];
      });
    }

    // Pollice: flesso-estensione nel piano del palmo (asse z), abduzione-adduzione perpendicolare (asse x)
    const cmc = new THREE.Group();
    cmc.position.set(-0.38, -0.12, 0.06);
    cmc.rotation.z = -30 * DEG;
    polso.add(cmc);
    this._registra("pollice_cmc", cmc);
    cmc.add(this._capsula(0.1, 0.42, matDito));
    const mcfP = new THREE.Group();
    mcfP.position.y = -0.42;
    this._registra("pollice_mcf", mcfP);
    cmc.add(mcfP);
    mcfP.add(this._capsula(0.09, 0.32, matDito));
    const ifP = new THREE.Group();
    ifP.position.y = -0.32;
    mcfP.add(ifP);
    this._registra("pollice_if", ifP);
    ifP.add(this._capsula(0.085, 0.26, matDito));
  }

  _costruisciArtoInferiore() {
    this.lunghezze = { coscia: L_COSCIA, gamba: L_GAMBA };
    this.viste = {
      generale: [[-11, 1, 20], [1.0, -3.8, 0]],
      anteriore: [[1.0, -3.5, 24], [1.0, -3.8, 0]],
      laterale: [[-23, -2, 2], [0, -3.8, 0]],
      posteriore: [[1.0, -2.5, -24], [1.0, -3.8, 0]],
      piede: [[-4.5, -6.2, 6.5], [0, -8.5, 0.8]],
    };
    const corpo = new THREE.Group();
    this.scena.add(corpo);
    this.segmenti = { bacino: corpo };
    const pelle = this._materialePelle();

    // Bacino, tronco inferiore e arto controlaterale (contesto, fissi)
    const bacino = new THREE.Mesh(new THREE.BoxGeometry(4.4, 1.6, 1.8), pelle);
    bacino.position.set(1.8, 0.45, 0);
    corpo.add(bacino);
    const tronco = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.0, 1.6), pelle);
    tronco.position.set(1.8, 2.75, 0);
    corpo.add(tronco);
    const ombelico = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), pelle);
    ombelico.position.set(1.8, 2.0, 0.82);
    corpo.add(ombelico); // indica la faccia anteriore
    const osso = new THREE.MeshStandardMaterial({ color: COLORE_OSSO, roughness: 0.6 });
    const pelvi = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.12, 8, 32, Math.PI), osso);
    pelvi.rotation.z = Math.PI;
    pelvi.position.set(1.8, 0.75, 0);
    corpo.add(pelvi);
    const controlaterale = this._capsula(0.55, L_COSCIA + L_GAMBA, pelle);
    controlaterale.position.x = 3.6;
    corpo.add(controlaterale);
    const piedeSx = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.55, 2.2), pelle);
    piedeSx.position.set(3.6, -L_COSCIA - L_GAMBA - 0.33, 0.75);
    corpo.add(piedeSx);

    // Anca e coscia
    const anca = this._registra("anca", new THREE.Group());
    corpo.add(anca);
    anca.add(new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), pelle));
    anca.add(this._capsula(0.58, L_COSCIA, pelle));
    anca.add(this._osso(0.12, L_COSCIA - 0.1, 0, 0)); // femore
    this.segmenti.coscia = anca;

    // Ginocchio e gamba
    const ginocchio = new THREE.Group();
    ginocchio.position.y = -L_COSCIA;
    this._registra("ginocchio", ginocchio);
    anca.add(ginocchio);
    ginocchio.add(new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 12), pelle));
    const rotula = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8), osso);
    rotula.position.set(0, 0.15, 0.42);
    ginocchio.add(rotula);
    ginocchio.add(this._capsula(0.45, L_GAMBA, pelle));
    ginocchio.add(this._osso(0.1, L_GAMBA - 0.1, 0.1, 0.12)); // tibia (anteromediale)
    ginocchio.add(this._osso(0.05, L_GAMBA - 0.2, -0.28, -0.05)); // fibula (laterale)
    this.segmenti.gamba = ginocchio;

    // Caviglia e piede (il piede si estende lungo z+)
    const caviglia = new THREE.Group();
    caviglia.position.y = -L_GAMBA;
    this._registra("caviglia", caviglia);
    ginocchio.add(caviglia);
    const piede = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.55, 2.2), pelle);
    piede.position.set(0, -0.33, 0.75);
    caviglia.add(piede);
    [0.3, 0.12, -0.05, -0.2, -0.34].forEach((x) => {
      const mt = this._osso(0.04, 1.1, x, 0);
      mt.rotation.x = -Math.PI / 2;
      mt.position.set(x, -0.3, 0.7);
      caviglia.add(mt);
    });
    this.segmenti.piede = caviglia;

    // Dita: gruppi ruotati di -90° su x, così le falangi (lungo -y locale) puntano in avanti
    const matDito = new THREE.MeshStandardMaterial({ color: COLORE_PELLE, roughness: 0.7, transparent: true, opacity: 0.85 });
    const dito = (nomeMtf, nomeIf, x, raggio, l1, l2) => {
      const mtf = new THREE.Group();
      mtf.position.set(x, -0.42, 1.85);
      mtf.rotation.x = -Math.PI / 2;
      if (nomeMtf) this._registra(nomeMtf, mtf);
      caviglia.add(mtf);
      mtf.add(this._capsula(raggio, l1, matDito));
      const ip = new THREE.Group();
      ip.position.y = -l1;
      if (nomeIf) this._registra(nomeIf, ip);
      mtf.add(ip);
      ip.add(this._capsula(raggio * 0.9, l2, matDito));
      return [mtf, ip];
    };
    dito("alluce_mtf", "alluce_if", 0.3, 0.13, 0.36, 0.3);
    // Le dita II–V si muovono insieme: sono figlie di un'unica coppia di articolazioni
    const [mtfDita, ifDita] = dito("dita_mtf", "dita_if", 0.08, 0.075, 0.28, 0.2);
    [-0.1, -0.24, -0.37].forEach((dx, i) => {
      const l1 = 0.26 - i * 0.03;
      const f1 = this._capsula(0.07, l1, matDito);
      f1.position.x = dx - 0.08;
      mtfDita.add(f1);
      const f2 = this._capsula(0.065, 0.18, matDito);
      f2.position.x = dx - 0.08;
      f2.position.y += 0.28 - l1;
      ifDita.add(f2);
    });
  }

  // --- Modello realistico (Z-Anatomy)

  _impostaVisteRealistiche(spalla) {
    const conv = (v) => v.map((c, i) => c * SCALA_REALISTICO + spalla[i]);
    this.viste = Object.fromEntries(Object.entries(VISTE_SUPERIORE).map(([k, [pos, target]]) => [k, [conv(pos), conv(target)]]));
    this.camera.near = 0.01;
    this.camera.updateProjectionMatrix();
  }

  async _caricaRealistico(url, onCaricamento) {
    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);
    const gltf = await loader.loadAsync(url, (ev) => onCaricamento?.(ev.total ? ev.loaded / ev.total : null));
    const info = gltf.scene.userData;
    this.scalaPosa = SCALA_REALISTICO;
    this._impostaVisteRealistiche(info.articolazioni.spalla);
    this.vista(this._vistaCorrente);

    // Scheletro: le ossa hanno orientamento allineato agli assi del mondo, tranne
    // l'avambraccio, il cui asse y coincide con l'asse di prono-supinazione.
    const posizioni = { tronco: [0, 1.3, -0.05], ...info.articolazioni };
    const [testaRadio, testaUlna] = info.assePronoSupinazione.map((p) => new THREE.Vector3(...p));
    const qMondo = { avambraccio: new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), testaRadio.clone().sub(testaUlna).normalize()) };
    const ossa = {};
    for (const [nome, padre] of OSSA_REALISTICO) {
      const b = new THREE.Bone();
      b.name = nome;
      const qPadre = (padre && qMondo[padre]) || new THREE.Quaternion();
      const q = qMondo[nome] || new THREE.Quaternion();
      const p = new THREE.Vector3(...posizioni[nome]);
      if (padre) p.sub(new THREE.Vector3(...posizioni[padre])).applyQuaternion(qPadre.clone().invert());
      b.position.copy(p);
      b.quaternion.copy(qPadre.clone().invert().multiply(q));
      if (padre) ossa[padre].add(b);
      ossa[nome] = b;
      if (padre) this.articolazioni[nome] = { obj: b, riposo: { q: b.quaternion.clone(), p: b.position.clone() } };
    }
    const radice = ossa.tronco;
    this.scena.add(radice);
    radice.updateMatrixWorld(true);
    const elencoOssa = OSSA_REALISTICO.map(([n]) => n);
    const scheletro = new THREE.Skeleton(elencoOssa.map((n) => ossa[n]));

    // Segmenti ossei per i pesi di deformazione
    const segmenti = [];
    for (const [nome, lista] of Object.entries(info.segmenti)) {
      for (const [a, b] of lista) segmenti.push({ indice: elencoOssa.indexOf(nome), a: new THREE.Vector3(...a), b: new THREE.Vector3(...b) });
    }

    const materiali = {
      osso: () => new THREE.MeshStandardMaterial({ color: COLORE_OSSO, roughness: 0.6 }),
      contesto: () => new THREE.MeshStandardMaterial({ color: COLORE_OSSO, roughness: 0.7, transparent: true, opacity: 0.35, depthWrite: false }),
      muscolo: () => new THREE.MeshStandardMaterial({ color: COLORE_MUSCOLO, roughness: 0.55, transparent: true, opacity: 0.9 }),
      nervo: () => new THREE.MeshStandardMaterial({ color: COLORE_NERVO, roughness: 0.4 }),
    };
    const mesh = [];
    gltf.scene.updateMatrixWorld(true);
    gltf.scene.traverse((o) => o.isMesh && mesh.push(o));
    for (const o of mesh) {
      const d = o.userData;
      const geo = this._geometriaMondo(o);
      if (d.tipo === "osso" || d.tipo === "contesto") this._pesoRigido(geo, elencoOssa.indexOf(d.osso));
      else this._pesiDaSegmenti(geo, segmenti);
      const sm = new THREE.SkinnedMesh(geo, materiali[d.tipo]());
      sm.frustumCulled = false;
      sm.userData = { tipo: d.tipo, id: d.id || null, nome: d.nome };
      if (d.tipo === "muscolo") sm.userData.muscolo = d.id || null;
      this.scena.add(sm);
      sm.bind(scheletro, new THREE.Matrix4());
      if (d.tipo === "muscolo") (d.id ? (this.muscoli[d.id] ||= []) : this.altriMuscoli).push(sm);
      if (d.tipo === "nervo") (this.nervi[d.id] ||= []).push(sm);
    }
    this.fonte = info.fonte;
    if (this._statiMuscoli) this.coloraMuscoli(...this._statiMuscoli);
    if (this._statiNervi) this.coloraNervi(...this._statiNervi);
    if (this.movimento) this.impostaMovimento(this.movimento);
  }

  // Copia la geometria in coordinate del mondo e in float (il file è quantizzato)
  _geometriaMondo(o) {
    const src = o.geometry.attributes.position;
    const pos = new Float32Array(src.count * 3);
    const v = new THREE.Vector3();
    for (let i = 0; i < src.count; i++) {
      v.fromBufferAttribute(src, i).applyMatrix4(o.matrixWorld);
      pos.set([v.x, v.y, v.z], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    if (o.geometry.index) geo.setIndex(Array.from(o.geometry.index.array));
    geo.computeVertexNormals();
    return geo;
  }

  _pesoRigido(geo, indice) {
    const n = geo.attributes.position.count;
    const idx = new Uint16Array(n * 4);
    const w = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) (idx[i * 4] = indice), (w[i * 4] = 1);
    geo.setAttribute("skinIndex", new THREE.BufferAttribute(idx, 4));
    geo.setAttribute("skinWeight", new THREE.BufferAttribute(w, 4));
  }

  // Ogni vertice è legato alle ossa più vicine; la transizione è più morbida
  // per i vertici lontani dalle ossa (es. muscoli del tronco).
  _pesiDaSegmenti(geo, segmenti) {
    const pos = geo.attributes.position;
    const n = pos.count;
    const idx = new Uint16Array(n * 4);
    const w = new Float32Array(n * 4);
    const p = new THREE.Vector3();
    const tmp = new THREE.Vector3();
    const ab = new THREE.Vector3();
    const perOsso = new Map();
    for (let i = 0; i < n; i++) {
      p.fromBufferAttribute(pos, i);
      perOsso.clear();
      for (const s of segmenti) {
        ab.subVectors(s.b, s.a);
        const t = THREE.MathUtils.clamp(tmp.subVectors(p, s.a).dot(ab) / ab.lengthSq(), 0, 1);
        const d = tmp.copy(s.a).addScaledVector(ab, t).distanceTo(p);
        if (!perOsso.has(s.indice) || d < perOsso.get(s.indice)) perOsso.set(s.indice, d);
      }
      const ordinati = [...perOsso.entries()].sort((x, y) => x[1] - y[1]).slice(0, 4);
      const dMin = ordinati[0][1];
      const sigma = 0.004 + 0.3 * dMin;
      let somma = 0;
      ordinati.forEach(([ossoI, d], j) => {
        const peso = Math.exp(-(((d - dMin) / sigma) ** 2));
        idx[i * 4 + j] = ossoI;
        w[i * 4 + j] = peso;
        somma += peso;
      });
      for (let j = 0; j < 4; j++) w[i * 4 + j] /= somma;
    }
    geo.setAttribute("skinIndex", new THREE.BufferAttribute(idx, 4));
    geo.setAttribute("skinWeight", new THREE.BufferAttribute(w, 4));
  }

  // Crea i ventri muscolari a partire dalla lista MUSCOLI (solo modello schematico).
  aggiungiMuscoli(listaMuscoli) {
    if (this.realistico) return;
    const lunghezze = this.lunghezze;
    for (const m of listaMuscoli) {
      const mesh = [];
      for (const f of m.forma || []) {
        let p1, p2;
        if (f.p1) {
          p1 = new THREE.Vector3(...f.p1);
          p2 = new THREE.Vector3(...f.p2);
        } else {
          const L = lunghezze[f.seg];
          p1 = new THREE.Vector3(f.off[0], -f.da * L, f.off[1]);
          p2 = new THREE.Vector3(f.off[0], -f.a * L, f.off[1]);
        }
        const dir = new THREE.Vector3().subVectors(p2, p1);
        const len = dir.length();
        const geo = new THREE.SphereGeometry(1, 20, 14);
        const mat = new THREE.MeshStandardMaterial({ color: COLORE_MUSCOLO, roughness: 0.55, transparent: true, opacity: 0.9 });
        const ventre = new THREE.Mesh(geo, mat);
        ventre.scale.set(f.r, len / 2, f.r * 0.8);
        ventre.position.copy(p1).addScaledVector(dir, 0.5);
        ventre.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
        ventre.userData.muscolo = m.id;
        this.segmenti[f.seg].add(ventre);
        mesh.push(ventre);
      }
      this.muscoli[m.id] = mesh;
    }
  }

  // stati: { idMuscolo: { colore, opacita, emissivo } }; i muscoli assenti tornano allo stato base
  coloraMuscoli(stati = {}, base = { colore: COLORE_MUSCOLO, opacita: 0.35 }) {
    this._statiMuscoli = [stati, base];
    for (const [id, meshes] of [...Object.entries(this.muscoli), ["", this.altriMuscoli]]) {
      const s = stati[id] || base;
      for (const mesh of meshes) {
        mesh.material.color.set(s.colore ?? COLORE_MUSCOLO);
        mesh.material.opacity = s.opacita ?? 0.9;
        mesh.material.emissive.set(s.emissivo ?? 0x000000);
        mesh.material.depthWrite = (s.opacita ?? 0.9) > 0.5;
        mesh.visible = (s.opacita ?? 0.9) > 0.02;
      }
    }
  }

  // stati: { idNervo: { colore, opacita } } (solo modello realistico)
  coloraNervi(stati = {}, base = { colore: COLORE_NERVO, opacita: 1 }) {
    this._statiNervi = [stati, base];
    for (const [id, meshes] of Object.entries(this.nervi)) {
      const s = stati[id] || base;
      for (const mesh of meshes) {
        mesh.material.color.set(s.colore ?? COLORE_NERVO);
        mesh.material.emissive.set(stati[id] ? 0x333333 : 0x000000);
        mesh.material.transparent = (s.opacita ?? 1) < 1;
        mesh.material.opacity = s.opacita ?? 1;
        mesh.visible = (s.opacita ?? 1) > 0.02;
      }
    }
  }

  impostaMovimento(movimento) {
    this.movimento = movimento;
    this.fase = 0;
    this._t = 0;
    if (!movimento) this._applicaPosa({}, {}, 0);
  }

  _applicaPosa(da, a, k) {
    const e = new THREE.Euler();
    const q = new THREE.Quaternion();
    const s = this.scalaPosa;
    for (const [nome, { obj, riposo }] of Object.entries(this.articolazioni)) {
      const r0 = da[nome]?.r || [0, 0, 0];
      const r1 = a[nome]?.r || [0, 0, 0];
      const p0 = da[nome]?.p || [0, 0, 0];
      const p1 = a[nome]?.p || [0, 0, 0];
      if (riposo.q) {
        // modello realistico: rotazione composta con l'orientamento di riposo dell'osso
        e.set(...[0, 1, 2].map((i) => (r0[i] + (r1[i] - r0[i]) * k) * DEG));
        obj.quaternion.copy(riposo.q).multiply(q.setFromEuler(e));
        obj.position.set(...[0, 1, 2].map((i) => riposo.p.getComponent(i) + (p0[i] + (p1[i] - p0[i]) * k) * s));
        continue;
      }
      e.set(
        riposo.r.x + (r0[0] + (r1[0] - r0[0]) * k) * DEG,
        riposo.r.y + (r0[1] + (r1[1] - r0[1]) * k) * DEG,
        riposo.r.z + (r0[2] + (r1[2] - r0[2]) * k) * DEG
      );
      obj.rotation.copy(e);
      obj.position.set(
        riposo.p.x + p0[0] + (p1[0] - p0[0]) * k,
        riposo.p.y + p0[1] + (p1[1] - p0[1]) * k,
        riposo.p.z + p0[2] + (p1[2] - p0[2]) * k
      );
    }
  }

  // Fissa il movimento a una frazione (0..1) dell'escursione; null riprende l'animazione
  impostaFase(k) {
    this.faseManuale = k;
  }

  _loop() {
    const dt = this._orologio.getDelta();
    if (this.movimento) {
      if (!this.inPausa && this.faseManuale == null) this._t = (this._t || 0) + dt * this.velocita;
      const k = (this.faseManuale ?? (1 - Math.cos(this._t * 1.6)) / 2) * this.ampiezza;
      const mv = (this.realistico && this.movimento.realistico) || this.movimento;
      this._applicaPosa(mv.da || this.movimento.da || {}, mv.a || {}, k);
    }
    this.controlli.update();
    this.renderer.render(this.scena, this.camera);
    requestAnimationFrame(this._loop);
  }

  _initInterazione() {
    const ray = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const el = this.renderer.domElement;
    const colpito = (ev) => {
      const r = el.getBoundingClientRect();
      mouse.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(mouse, this.camera);
      const visibili = [...Object.values(this.muscoli).flat(), ...this.altriMuscoli, ...Object.values(this.nervi).flat()].filter((m) => m.visible);
      const o = ray.intersectObjects(visibili, false)[0]?.object;
      if (!o) return null;
      return o.userData.tipo ? o.userData : { tipo: "muscolo", id: o.userData.muscolo };
    };
    let giu = null;
    el.addEventListener("pointerdown", (ev) => (giu = [ev.clientX, ev.clientY]));
    el.addEventListener("pointerup", (ev) => {
      if (!giu || Math.hypot(ev.clientX - giu[0], ev.clientY - giu[1]) > 5) return;
      const info = colpito(ev);
      if (info && this.onMuscoloClick) this.onMuscoloClick(info);
    });
    // Il raycast sulle mesh deformate è costoso: al massimo ~12 volte al secondo
    let ultimo = 0;
    el.addEventListener("pointermove", (ev) => {
      if (!this.onMuscoloHover || ev.timeStamp - ultimo < 80) return;
      ultimo = ev.timeStamp;
      this.onMuscoloHover(colpito(ev), ev);
    });
  }

  vista(nome) {
    this._vistaCorrente = nome;
    const [pos, target] = this.viste[nome] || this.viste.generale;
    this.camera.position.set(...pos);
    this.controlli.target.set(...target);
  }

}
