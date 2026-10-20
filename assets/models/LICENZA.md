# Licenza dei modelli 3D

I file `arto-superiore.glb` e `arto-inferiore.glb` sono **opere derivate** dei modelli anatomici di Z-Anatomy
e sono distribuiti con licenza **Creative Commons Attribuzione – Condividi allo stesso modo 4.0
Internazionale (CC BY-SA 4.0)**: https://creativecommons.org/licenses/by-sa/4.0/deed.it
(testo legale completo in `LICENSE-CC-BY-SA-4.0.txt`).

## Attribuzione
- **Z-Anatomy** – The open source atlas of anatomy – CC BY-SA 4.0 – https://www.z-anatomy.com/
  (file FBX distribuiti nel repository https://github.com/LluisV/Z-Anatomy, di Lluís Vinent Juanico, CC BY-SA 4.0).
- **BodyParts3D** – © The Database Center for Life Science (DBCLS) – CC BY-SA 2.1 Japan –
  https://lifesciencedb.jp/bp3d/ (modelli di base da cui deriva Z-Anatomy).

## Modifiche apportate
- selezione delle sole strutture dell'arto superiore o inferiore destro (ossa, muscoli, nervi periferici)
  e di alcune ossa di contesto (torace e colonna cervico-toracica; bacino, colonna lombare e arto inferiore sinistro);
- conversione da FBX a glTF, semplificazione delle mesh (circa 50%), quantizzazione e compressione meshopt;
- divisione delle mesh del flessore profondo delle dita e dei lombricali in parte laterale e mediale,
  per rappresentarne la doppia innervazione (mediano/ulnare);
- aggiunta di metadati (tipo di struttura, identificativo usato nel sito, centri articolari).

Il procedimento è riproducibile con `tools/modelli/estrai.mjs` (vedi `tools/modelli/README.md`).

## Componenti esclusi
Z-Anatomy include anche modelli di terzi con licenze **non commerciali** (es. orecchio interno,
CC BY-NC-SA; rene, CC BY-NC). Nessuno di questi è usato in questo sito: sono incluse solo
strutture muscolo-scheletriche e nervose derivate da BodyParts3D/Z-Anatomy.

## Uso e ridistribuzione
Chi riusa o modifica questi modelli deve citare le fonti sopra indicate, indicare le modifiche e
distribuire le opere derivate con la stessa licenza (CC BY-SA 4.0). Il codice del sito e i testi
didattici non sono un'opera derivata dei modelli e possono avere una licenza propria.
