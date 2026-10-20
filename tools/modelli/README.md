# Estrazione dei modelli 3D da Z-Anatomy

Produce `assets/models/arto-superiore.glb` (CC BY-SA 4.0, vedi `assets/models/LICENZA.md`).

## Requisiti
Node.js ≥ 18. Nessun software grafico necessario.

## Passaggi
```bash
# 1. Scaricare i modelli FBX di Z-Anatomy (CC BY-SA 4.0)
GIT_LFS_SKIP_SMUDGE=1 git clone --depth 1 https://github.com/LluisV/Z-Anatomy /tmp/z-anatomy

# 2. Installare gli strumenti
cd tools/modelli && npm install

# 3. Convertire FBX -> glTF binario
mkdir -p /tmp/za-glb
for f in SkeletalSystem100 MuscularSystem100 NervousSystem100; do
  ./node_modules/fbx2gltf/bin/Linux/FBX2glTF --binary \
    --input "/tmp/z-anatomy/Resources/Models/FBX/$f.fbx" --output "/tmp/za-glb/$f"
done
# (su macOS/Windows usare bin/Darwin o bin/Windows_NT; se il file non è eseguibile: chmod +x)

# 4. Estrarre l'arto superiore destro
node estrai-arto-superiore.mjs /tmp/za-glb ../../assets/models/arto-superiore.glb
```

## Cosa fa lo script
- seleziona per nome (lato destro, suffisso `.r`) ossa, muscoli e nervi e li associa agli
  identificativi usati nei dati del sito (`assets/js/data/arto-superiore.js`);
- calcola i centri articolari (spalla, gomito, prono-supinazione, polso, dita) dalla geometria delle ossa;
- semplifica e comprime le mesh (~2 MB in totale).

Per aggiungere una struttura: inserire il nome Z-Anatomy nelle tabelle `MUSCOLI`/`NERVI` dello script.
