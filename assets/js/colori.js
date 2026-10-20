// Colore identificativo di ciascun nervo (usato in 3D, nel plesso e nelle etichette)
export const COLORI_NERVI = {
  accessorio: "#8e6c8a",
  "dorsale-scapolare": "#6b8e23",
  "toracico-lungo": "#2e8b57",
  soprascapolare: "#c9a227",
  pettorali: "#a0522d",
  sottoscapolari: "#708090",
  toracodorsale: "#16a085",
  ascellare: "#e67e22",
  muscolocutaneo: "#3cae5c",
  radiale: "#2f80c9",
  mediano: "#8e44ad",
  ulnare: "#e0457b",
};

export const coloreNervo = (id) => COLORI_NERVI[id] || "#888888";
