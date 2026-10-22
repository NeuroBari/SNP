// Intestazione e piè di pagina comuni a tutte le pagine.
const PAGINE = [
  ["index.html", "Home"],
  ["anatomia.html", "Anatomia"],
  ["movimenti.html", "Movimenti 3D"],
  ["esame.html", "Esame obiettivo"],
  ["sensibilita.html", "Sensibilità"],
  ["riflessi.html", "Riflessi"],
  ["patologia.html", "Patologia"],
  ["eng-emg.html", "ENG/EMG"],
  ["fonti.html", "Fonti"],
];

const corrente = document.body.dataset.pagina;

document.getElementById("testata").outerHTML = `
<header class="testata">
  <div class="barra">
    <a class="marchio" href="index.html">SNP<span>·</span>Neurologia</a>
    <nav class="nav" aria-label="Sezioni">
      ${PAGINE.map(([href, nome]) => `<a href="${href}"${href === corrente ? ' aria-current="page"' : ""}>${nome}</a>`).join("")}
    </nav>
  </div>
</header>`;

const pie = document.getElementById("pie");
if (pie) {
  pie.outerHTML = `
<footer class="pie"><div>
  Materiale didattico per specializzandi in Neurologia. Non sostituisce i testi di riferimento né il giudizio clinico.
  Contenuti in revisione: vedi <a href="fonti.html">Fonti</a>.
</div></footer>`;
}
