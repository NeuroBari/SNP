// Funzioni geometriche per calcolare centri articolari e segmenti dalle mesh delle ossa.

export const X = 0, Y = 1, Z = 2;

export const vertici = (s) => {
  const v = [];
  for (let i = 0; i < s.pos.length; i += 3) v.push([s.pos[i], s.pos[i + 1], s.pos[i + 2]]);
  return v;
};

export const media = (pts) => pts.reduce((a, p) => [a[0] + p[0], a[1] + p[1], a[2] + p[2]], [0, 0, 0]).map((x) => +(x / pts.length).toFixed(4));

// Baricentro dei vertici che si trovano entro `spessore` dall'estremo dell'osso lungo un asse
export const estremo = (v, asse, lato, spessore) => {
  const vals = v.map((p) => p[asse]);
  const lim = lato === "max" ? Math.max(...vals) - spessore : Math.min(...vals) + spessore;
  return media(v.filter((p) => (lato === "max" ? p[asse] >= lim : p[asse] <= lim)));
};

export const vicini = (v, centro, raggio) => media(v.filter((p) => Math.hypot(p[0] - centro[0], p[1] - centro[1], p[2] - centro[2]) < raggio));

export const puntoMedio = (a, b) => a.map((x, i) => +((x + b[i]) / 2).toFixed(4));
