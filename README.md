# SNP · Neurologia

Sito didattico sul **sistema nervoso periferico** per specializzandi in Neurologia:
anatomia, movimenti in 3D, patologia ed ENG/EMG.

## Sezioni
- **Anatomia** (`anatomia.html`): plessi brachiale e lombosacrale interattivi, schede dei nervi (origine, decorso, rami, muscoli con radici, territorio sensitivo, siti di lesione).
- **Movimenti 3D** (`movimenti.html`): modelli dell'arto superiore e inferiore che eseguono i movimenti, evidenzia i muscoli per nervo e simula le lesioni.
- **Patologia**, **ENG/EMG**: in preparazione.
- **Fonti** (`fonti.html`): bibliografia e stato di revisione.

## Struttura
```
assets/js/data/arto-superiore.js   nervi, muscoli, movimenti, plesso brachiale
assets/js/data/arto-inferiore.js   nervi, muscoli, movimenti, plesso lombosacrale
assets/js/data/regioni.js          indici comuni e logica delle lesioni
assets/js/data/fonti.js            bibliografia
assets/js/viewer3d.js              motore 3D (three.js, incluso in assets/vendor)
assets/models/arto-*.glb           modelli realistici (Z-Anatomy, CC BY-SA 4.0)
tools/modelli/                     script di estrazione del modello da Z-Anatomy
docs/MODELLI-3D.md                 come integrare modelli anatomici realistici
```
Sito statico, nessuna compilazione necessaria.

## Anteprima locale
```
python3 -m http.server 8000
```
poi aprire http://localhost:8000 (i moduli JavaScript non funzionano aprendo i file direttamente).

## Pubblicazione su GitHub Pages
Settings → Pages → *Deploy from a branch* → scegliere il branch e la cartella `/ (root)`.

## Contenuti
I contenuti sono una prima stesura da revisionare sulle fonti citate in ogni scheda.
## Licenze
- Modelli 3D degli arti: derivati da **Z-Anatomy** (CC BY-SA 4.0) e **BodyParts3D**, © DBCLS (CC BY-SA 2.1 JP);
  distribuiti con licenza CC BY-SA 4.0. Dettagli e modifiche in `assets/models/LICENZA.md`.
- three.js e meshoptimizer: licenza MIT (`assets/vendor/three/`).
