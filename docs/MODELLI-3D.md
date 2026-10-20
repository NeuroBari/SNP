# Modelli 3D: dallo schema al modello realistico

## Stato attuale
`movimenti.html` usa un modello **schematico** generato via codice (`assets/js/viewer3d.js`, three.js).
I movimenti (`assets/js/data/arto-superiore.js`, array `MOVIMENTI`) agiscono solo su **articolazioni con nome**:

| Articolazione | Movimenti |
|---|---|
| `cingolo` | elevazione, retrazione, protrazione (traslazione) |
| `spalla` | flesso-estensione (x), intra/extrarotazione (y), abduzione/adduzione (z) |
| `gomito` | flesso-estensione (x) |
| `avambraccio` | prono-supinazione (y) |
| `polso` | flesso-estensione (x), deviazione radiale/ulnare (z) |
| `dito2..dito5_mcf/_ifp/_ifd` | flessione (x), abduzione (z, solo MCF) |
| `pollice_cmc/_mcf/_if` | flesso-estensione nel piano del palmo (z), abduzione palmare (x) |

Un modello realistico con un'**armatura** (scheletro di animazione) le cui ossa abbiano gli stessi nomi
può quindi essere guidato dagli stessi dati, senza riscrivere i movimenti.

## Fonti di modelli anatomici utilizzabili
| Fonte | Contenuto | Licenza | Note |
|---|---|---|---|
| **Z-Anatomy** (z-anatomy.com) | Ossa, muscoli, nervi, vasi; file Blender | CC BY-SA 4.0 | Scelta consigliata: include i nervi periferici. |
| **BodyParts3D** (DBCLS) | Mesh OBJ per singola struttura | CC BY-SA 2.1 JP | Base di Z-Anatomy; scaricabile per parti. |
| Sketchfab | Modelli di vari autori | Variabile per modello | Verificare la licenza caso per caso. |
| BioDigital Human, Complete Anatomy | Atlanti commerciali | Proprietaria | Non ridistribuibili su GitHub Pages. |

> CC BY-SA impone attribuzione e che le opere derivate (i modelli modificati) siano rilasciate con la stessa licenza.

## Pipeline
1. **Blender** (gratuito): aprire il file Z-Anatomy, isolare arto superiore e cingolo (ossa, muscoli, nervi del plesso brachiale).
2. Ridurre i poligoni (modificatore *Decimate*) per restare sotto ~10–20 MB complessivi.
3. Creare un'armatura con le ossa nominate come in tabella e collegarvi le mesh (*Parent → With Automatic Weights*, poi correggere i pesi).
4. Nominare ogni mesh muscolare con l'`id` usato nei dati (es. `bicipite`, `fds`, `apb`) così da colorarla per nervo/lesione.
5. Esportare in **glTF binario (.glb)**; comprimere con `npx @gltf-transform/cli optimize in.glb out.glb --compress draco`.
6. Salvare in `assets/models/` e attivare il caricamento nel visualizzatore (GLTFLoader di three.js).

Limiti GitHub Pages: file < 100 MB, sito < 1 GB; per un caricamento rapido conviene restare sotto 20 MB per modello.
