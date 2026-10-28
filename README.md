# SNP · Neurologia

Sito didattico sul **sistema nervoso periferico** per specializzandi in Neurologia:
anatomia, movimenti in 3D, patologia ed ENG/EMG.

## Sezioni
- **Anatomia** (`anatomia.html`): plessi brachiale e lombosacrale interattivi, schede dei nervi (origine, decorso, rami, muscoli con radici, territorio sensitivo, siti di lesione).
- **Movimenti 3D** (`movimenti.html`): modelli realistici (Z-Anatomy) e schematici degli arti; movimenti con muscoli e nervi responsabili; simulazione di lesioni di nervo, tronco, corda, plesso e radice; atteggiamenti tipici (mano ad artiglio, polso cadente, paralisi di Erb, piede cadente…).
- **Esame obiettivo** (`esame.html`): muscoli chiave per radice e nervo, scala MRC e localizzazione guidata della lesione.
- **Sensibilità** (`sensibilita.html`): mappe schematiche di dermatomi e territori dei nervi cutanei (viste anteriore, posteriore e pianta del piede), sovrapposizione, punti chiave ISNCSCI e confronti guidati radice/nervo; l'area sensitiva compare anche nelle schede dei nervi e nella simulazione delle lesioni.
- **Riflessi** (`riflessi.html`): osteotendinei, superficiali e patologici, scala NINDS, interpretazione; collegati alle schede dei nervi, al 3D e alla simulazione delle lesioni.
- **Patologia** (`patologia.html`): approccio alle neuropatie, forme metaboliche, carenziali e tossiche, disimmuni (GBS, CIDP, paraproteinemiche, vasculitiche), ereditarie e amiloidotiche, piccole fibre, SLA e SMA; struttura dal fascicolo di *Continuum* "Peripheral Nerve and Motor Neuron Disorders" (ottobre 2026), contenuti rielaborati con linee guida e stato regolatorio EMA/AIFA.
- **ENG/EMG**: in preparazione.
- **Fonti** (`fonti.html`): bibliografia e stato di revisione.

## Struttura
```
assets/js/data/arto-superiore.js   nervi, muscoli, movimenti, plesso brachiale
assets/js/data/arto-inferiore.js   nervi, muscoli, movimenti, plesso lombosacrale
assets/js/data/regioni.js          indici comuni e logica delle lesioni
assets/js/data/lesioni-prossimali.js  lesioni di radice, tronco, corda e plesso (calcolate dai dati dei muscoli)
assets/js/data/localizza.js        localizzazione didattica dall'esame della forza (MRC)
assets/js/data/sensibilita.js      dermatomi, territori cutanei e area sensitiva di ogni lesione
assets/js/data/patologie.js        sezioni e schede della pagina Patologia
assets/js/data/fonti.js            bibliografia
assets/js/mappa-sensitiva.js       disegno SVG delle mappe sensitive
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
