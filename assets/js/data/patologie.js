// Patologia del sistema nervoso periferico e del motoneurone.
//
// Fonte di riferimento della struttura: Continuum (AAN), vol. 32 n. 5, ottobre 2026,
// "Peripheral Nerve and Motor Neuron Disorders". I contenuti sono RIELABORATI in italiano
// (nessun testo, tabella o figura riprodotti) e integrati con le linee guida citate in ogni
// scheda. Le informazioni regolatorie (EMA, AIFA) sono aggiornate a ottobre 2026 su fonti
// secondarie, perché i siti istituzionali non erano consultabili direttamente: dove indicato
// "da verificare" vanno controllate sull'EPAR (EMA) e sulla banca dati AIFA prima dell'uso.
//
// STATO: bozza da revisionare.

export const AGGIORNAMENTO_REGOLATORIO = "ottobre 2026";

// Sezioni della pagina; `stato: "prossimamente"` per i capitoli non ancora scritti
export const SEZIONI = [
  { id: "approccio", nome: "Approccio alle neuropatie", descrizione: "Dal quadro clinico al sospetto eziologico: cronologia, distribuzione, fibre coinvolte, esami di primo e secondo livello." },
  { id: "metaboliche", nome: "Neuropatie metaboliche, carenziali e tossiche", descrizione: "Le cause più frequenti di polineuropatia: diabete, carenze vitaminiche, alcol, farmaci e tossici." },
  { id: "disimmuni", nome: "Neuropatie disimmuni", descrizione: "Forme acute (Guillain-Barré), croniche (CIDP, nodopatie), paraproteinemiche e infiammatorie assonali (vasculiti, radiculoplessopatie)." },
  { id: "ereditarie", nome: "Neuropatie ereditarie e da accumulo", descrizione: "Charcot-Marie-Tooth e forme correlate; amiloidosi AL e da transtiretina." },
  { id: "piccole-fibre", nome: "Neuropatia delle piccole fibre", descrizione: "Dolore neuropatico e disautonomia con conduzioni normali: diagnosi con biopsia cutanea, ricerca della causa, terapia del dolore." },
  { id: "motoneurone", nome: "Malattie del motoneurone", descrizione: "Sclerosi laterale amiotrofica e atrofia muscolare spinale." },
  { id: "focali", nome: "Mononeuropatie, plessopatie e radicolopatie", stato: "prossimamente",
    descrizione: "Intrappolamenti e lesioni focali. Nel frattempo: sedi di lesione in Anatomia, simulatore di lesioni in Movimenti 3D, mappe sensitive." },
  { id: "giunzione", nome: "Malattie della giunzione neuromuscolare", stato: "prossimamente", descrizione: "Miastenia gravis, sindrome di Lambert-Eaton, botulismo." },
  { id: "muscolo", nome: "Miopatie", stato: "prossimamente", descrizione: "Miopatie infiammatorie, distrofie, miopatie metaboliche e tossiche." },
];

const EMA = "https://www.ema.europa.eu/en/medicines";
const AIFA = "https://medicinali.aifa.gov.it/";

export const PATOLOGIE = [
  // ------------------------------------------------------------------ Approccio
  {
    id: "approccio-neuropatia", sezione: "approccio", nome: "Approccio diagnostico alle neuropatie",
    breve: "Metodo per inquadrare una polineuropatia e scegliere gli esami.",
    continuum: "contSadjadi",
    sintesi: "La diagnosi resta clinica: anamnesi ed esame obiettivo orientano gli esami strumentali, che completano ma non sostituiscono la valutazione. Il diabete è il fattore di rischio più frequente (circa un terzo dei casi) e quasi metà delle polineuropatie resta idiopatica, ma una parte delle forme considerate idiopatiche si rivela ereditaria o acquisita con indagini mirate.",
    clinica: [
      "Tre domande iniziali: da quanto tempo (acuta < 4 settimane, subacuta, cronica)? È simmetrica? È lunghezza-dipendente (piedi prima delle mani, 'a calza e guanto')?",
      "Fibre coinvolte: motorie, sensitive di grosso calibro (vibrazione, posizione, atassia), di piccolo calibro (dolore, temperatura), autonomiche.",
      "Un'atassia sensitiva marcata fa pensare a una neuronopatia sensitiva (ganglionopatia) o a una mielopatia, non a una comune polineuropatia lunghezza-dipendente.",
      "Indagare sempre i sintomi autonomici: occhi e bocca secchi, ipotensione ortostatica, alvo e minzione, disfunzione erettile, sudorazione, sazietà precoce. Nell'amiloidosi possono precedere i sintomi sensitivo-motori.",
      "Storia sistemica e familiare: diabete, malattie reumatologiche, tumori (le neuropatie paraneoplastiche possono precedere di mesi la diagnosi di neoplasia), cardiomiopatia, calo ponderale, chirurgia bariatrica, farmaci e tossici. Per la familiarità sono utili domande indirette (scarpe sempre larghe, andatura dei parenti).",
      "Riflessi vivaci con neuropatia: pensare a mieloneuropatia (es. carenza di B12 o di rame), malattia del motoneurone, paraparesi spastica ereditaria.",
      "Nell'anziano la riduzione della pallestesia alle dita dei piedi, l'ipotrofia dell'estensore breve delle dita e la riduzione degli achillei possono essere fisiologiche.",
    ],
    diagnosi: [
      "Esami di primo livello nella polineuropatia cronica lunghezza-dipendente: glicemia ed emoglobina glicata (se dubbio, curva da carico), vitamina B12 (con acido metilmalonico se borderline), elettroforesi e immunofissazione sieriche, funzione renale ed epatica, emocromo, TSH.",
      "ENG/EMG: distingue forme sensitive e motorie, pre- e postgangliari, assonali e demielinizzanti; documenta simmetria e lunghezza-dipendenza; l'EMG valuta la cronicità e distingue un processo miopatico. Attenzione agli artefatti (arto freddo, stimolazione prossimale sottomassimale).",
      "Nella sindrome di Guillain-Barré precoce riflessi, liquor e conduzioni possono essere ancora normali.",
      "Biopsia cutanea (densità delle fibre intraepidermiche) per le piccole fibre, non necessaria in tutti i casi; biopsia di nervo per vasculite, amiloidosi e infiltrazioni.",
      "Imaging: ispessimento o captazione di radici e plessi alla RM, aumento dell'area di sezione dei nervi all'ecografia sono criteri di supporto per la CIDP.",
      "Genetica a gradini: dal fenotipo clinico ed elettrofisiologico al gene più probabile (es. duplicazione PMP22), poi pannelli multigenici.",
    ],
    allarme: [
      "Esordio acuto o subacuto, decorso rapidamente progressivo",
      "Asimmetria marcata o distribuzione non lunghezza-dipendente",
      "Debolezza precoce o prossimale",
      "Disautonomia importante",
      "Atassia sensitiva prevalente",
      "Calo ponderale, sintomi sistemici, componente monoclonale",
    ],
    collegamenti: [["esame.html", "Esame obiettivo e localizzazione"], ["sensibilita.html", "Mappe sensitive"], ["riflessi.html", "Riflessi"]],
    fonti: ["contSadjadi", "preston4"],
  },

  // ------------------------------------------------------------------ Metaboliche
  {
    id: "diabetica", sezione: "metaboliche", nome: "Neuropatie diabetiche",
    breve: "Polineuropatia distale simmetrica, neuropatia autonomica e altre forme associate al diabete.",
    continuum: "contFridman",
    sintesi: "Il danno nervoso nel diabete è eterogeneo: polineuropatia distale simmetrica (la più frequente), neuropatia autonomica cardiovascolare, gastrointestinale e urogenitale, perdita della sensibilità protettiva con rischio di ulcere del piede. È una delle prime cinque cause neurologiche di disabilità nel mondo ed è ancora poco ricercata.",
    epidemiologia: "Il rischio cresce con la durata del diabete indipendentemente dall'emoglobina glicata. Dopo l'iperglicemia i principali fattori di rischio metabolici sono l'obesità e l'ipertrigliceridemia (sindrome metabolica); contano anche i determinanti sociali (svantaggio socioeconomico, isolamento sociale).",
    clinica: [
      "Polineuropatia distale simmetrica sensitiva, lunghezza-dipendente, spesso con interessamento precoce delle piccole fibre; la debolezza compare tardi e solo distalmente.",
      "Dolore neuropatico non sempre persistente: alcuni pazienti vanno in remissione spontanea, per cui la terapia del dolore va rivalutata periodicamente.",
      "Neuropatia autonomica cardiovascolare: precocemente ridotta variabilità della frequenza cardiaca, poi tachicardia a riposo (prevalenza simpatica), infine ipotensione ortostatica. È sottodiagnosticata e aumenta la mortalità.",
      "Neuropatia gastrointestinale: sazietà precoce, nausea, vomito, diarrea acquosa; l'assorbimento irregolare di cibo e farmaci rende instabile la glicemia (ipoglicemie).",
      "Disfunzione urogenitale e sessuale molto frequente; la nicturia aumenta il rischio di cadute.",
      "Altre forme associate al diabete (da distinguere): radiculoplessopatia lombosacrale (amiotrofia diabetica, vedi neuropatie infiammatorie assonali), mononeuropatie e intrappolamenti.",
    ],
    diagnosi: [
      "Esame mirato annuale: pallestesia con diapason 128 Hz all'alluce e alla caviglia, puntura o freddo per le piccole fibre, riflessi achillei, monofilamento 10 g (perdita della sensibilità protettiva; poco sensibile per le forme iniziali), test di Ipswich, ispezione del piede e dei polsi.",
      "Screening autonomico al letto: frequenza a riposo (> 100/min sospetta), pressione e frequenza dopo 5 minuti supino e a 1, 2 e 3 minuti in piedi (ipotensione ortostatica: calo > 20 mmHg sistolica o > 10 diastolica); la variabilità RR si può stimare dall'ECG standard.",
      "Nelle forme tipiche bastano emocromo, profilo metabolico, vitamina B12 (soprattutto in terapia con metformina), elettroforesi e immunofissazione; ENG solo se il quadro è atipico.",
      "Caratteristiche atipiche che impongono altre indagini: esordio acuto o subacuto, debolezza precoce o grave, asimmetria marcata, areflessia diffusa, distribuzione non lunghezza-dipendente, disautonomia grave precoce.",
    ],
    terapia: [
      "Prevenzione: controllo glicemico (efficace soprattutto nel diabete di tipo 1, meno nel tipo 2 dove pesano insulino-resistenza e sindrome metabolica), calo ponderale, esercizio fisico, cura del piede; lavoro multidisciplinare.",
      "Dolore neuropatico (raccomandazioni NeuPSIG 2025): prima linea antidepressivi triciclici, gabapentinoidi (pregabalin, gabapentin), SNRI (duloxetina); seconda linea capsaicina 8% cerotto, capsaicina crema, lidocaina 5% cerotto; terza linea tossina botulinica, rTMS, oppioidi. Scegliere in base a comorbilità e interazioni; non associare triciclici e SNRI (rischio di sindrome serotoninergica).",
      "Ulcere del piede: identificare i pazienti a rischio e inviarli presto (calzature, podologo, centro del piede diabetico).",
    ],
    farmaci: [
      { nome: "Duloxetina", uso: "Dolore della neuropatia diabetica periferica (indicazione EU in scheda tecnica)", ema: "Autorizzata", aifa: "La Nota AIFA 4 (gabapentin, pregabalin, duloxetina nel dolore neuropatico) è stata abolita nel 2025: verificare le attuali condizioni di rimborsabilità" },
      { nome: "Pregabalin, gabapentin", uso: "Dolore neuropatico periferico", ema: "Autorizzati (procedure nazionali o centralizzate)", aifa: "Come sopra: Nota 4 abolita nel 2025, da verificare" },
      { nome: "Capsaicina 8% cerotto", uso: "Dolore neuropatico periferico dell'adulto, uso ambulatoriale", ema: "Autorizzata (procedura centralizzata)", aifa: "Da verificare" },
    ],
    collegamenti: [["sensibilita.html#regione=inferiore", "Mappe sensitive dell'arto inferiore"], ["patologia.html#piccole-fibre", "Neuropatia delle piccole fibre"]],
    fonti: ["contFridman", "neupsig2025"],
  },
  {
    id: "carenziali-tossiche", sezione: "metaboliche", nome: "Neuropatie carenziali e tossiche",
    breve: "Vitamine B12, B1, B6, E, rame; protossido d'azoto, metalli, chemioterapici, inibitori dei checkpoint.",
    continuum: "contGable",
    sintesi: "Carenze nutrizionali, tossici e farmaci sono cause frequenti e spesso correggibili: riconosciute presto, la neuropatia si stabilizza o migliora. Sono in aumento le forme dopo chirurgia bariatrica (supplementazione insufficiente), da uso ricreativo di protossido d'azoto e da inibitori dei checkpoint immunitari.",
    clinica: [
      "Vitamina B12: servono 4–5 anni di malassorbimento o scarso apporto per esaurire le riserve. Neuropatia sensitiva, mielopatia (degenerazione combinata subacuta), deficit cognitivi. Fattori di rischio: gastrite atrofica, metformina, inibitori di pompa, dieta vegana.",
      "Protossido d'azoto ('palloncini'): carenza funzionale di B12 nei giovani; B12 sierica anche normale, acido metilmalonico e omocisteina molto elevati; mieloneuropatia.",
      "Tiamina (B1): riserve brevi, carenza già dopo 2–3 settimane di grave deplezione (alcol, iperemesi, anoressia, chirurgia bariatrica, malattie gastrointestinali). Beriberi secco: neuropatia assonale sensitivo-motoria, talora con quadro simil-Guillain-Barré; encefalopatia di Wernicke e sindrome di Korsakoff; scompenso cardiaco (beriberi umido).",
      "Vitamina B6: neuropatia sia per carenza sia per eccesso (integratori ad alte dosi: neuronopatia sensitiva).",
      "Vitamina E: malassorbimento (epatopatie, pancreatiti, fibrosi cistica); neuropatia delle grosse fibre sensitive con sindrome spinocerebellare simil-Friedreich, possibili segni piramidali.",
      "Rame: malassorbimento (bariatrica, celiachia), eccesso di zinco; quadro simile alla carenza di B12 con mieloneuropatia e atassia sensitiva.",
      "Piombo: neuropatia motoria con polso cadente (nervo radiale), anemia, dolori addominali, linea gengivale. Arsenico: neuropatia assonale o poliradicoloneuropatia subacuta, strie di Mees ungueali, disturbi gastrointestinali. Mercurio: neuropatia assonale e tremore.",
      "Chemioterapici: platino (cisplatino e oxaliplatino più del carboplatino), taxani (dolore distale dose-dipendente), alcaloidi della vinca, bortezomib, talidomide. Inibitori dei checkpoint: neuropatie immunomediate (simil-Guillain-Barré, simil-CIDP, vasculitiche) che richiedono una valutazione urgente.",
    ],
    diagnosi: [
      "B12 con acido metilmalonico e omocisteina; folati; tiamina difosfato ematica (< 70 nmol/L; prelevare prima di integrare, un valore normale non esclude la carenza); vitamina B6; vitamina E (correggere per i lipidi); rame, ceruloplasmina, zinco.",
      "Metalli: piombo su sangue venoso; arsenico e mercurio su urine delle 24 ore (astenersi da pesce e frutti di mare per 5 giorni prima del dosaggio dell'arsenico); capelli per esposizioni croniche.",
      "Neuropatia da checkpoint: ENG, liquor con citologia, esami ematici; raramente biopsia di nervo.",
    ],
    terapia: [
      "B12: cianocobalamina o idrossicobalamina intramuscolare nelle forme neurologiche, poi mantenimento; per tutta la vita se il malassorbimento persiste. Il miglioramento atteso entro 6 mesi può essere preceduto da un transitorio peggioramento.",
      "Tiamina: 100–300 mg/die; nelle forme neurologiche gravi 500 mg tre volte al giorno ev per 2–3 giorni, poi 250 mg ev o im per 3–5 giorni, poi 50–100 mg/die per os. Somministrarla prima del glucosio nei pazienti a rischio.",
      "Vitamina B6: 50–100 mg/die nella carenza; sospendere gli integratori nella tossicità (miglioramento lento).",
      "Rame: integrazione orale o ev; correggere la fonte di zinco.",
      "Metalli: eliminare l'esposizione; chelazione se i livelli sono significativamente elevati.",
      "Inibitori dei checkpoint: sospensione, corticosteroidi e, nelle forme gravi, IVIg o plasmaferesi secondo le linee guida oncologiche; evitare se possibile la ripresa del farmaco.",
    ],
    perle: [
      "Dopo chirurgia bariatrica la supplementazione va mantenuta e monitorata: B1, B12, rame, vitamina E.",
      "Un giovane con mielopatia e neuropatia: chiedere del protossido d'azoto e dosare acido metilmalonico e omocisteina.",
    ],
    collegamenti: [["anatomia.html#radiale", "Nervo radiale (polso cadente da piombo)"]],
    fonti: ["contGable"],
  },

  // ------------------------------------------------------------------ Disimmuni
  {
    id: "gbs", sezione: "disimmuni", nome: "Sindrome di Guillain-Barré",
    breve: "Poliradicoloneuropatia acuta immunomediata: emergenza neuromuscolare.",
    continuum: "contPasnoor",
    sintesi: "Poliradicoloneuropatia acuta immunomediata, di solito monofasica e postinfettiva, con debolezza progressiva e iporeflessia che raggiungono il nadir entro 4 settimane. È un'emergenza: fino a un terzo dei pazienti richiede ventilazione.",
    epidemiologia: "Incidenza di circa 1–2 casi ogni 100 000 persone l'anno, più alta nei maschi e con l'età. Circa due terzi dei casi seguono un'infezione (Campylobacter jejuni, CMV, EBV, Mycoplasma, virus influenzali, Zika); il fenotipo dipende anche dalla risposta immunitaria dell'ospite.",
    clinica: [
      "Criteri clinici principali (EAN/PNS 2023): debolezza progressiva di arti superiori o inferiori, riflessi ridotti o assenti negli arti colpiti, peggioramento per non più di 4 settimane.",
      "Forma sensitivo-motoria nell'85–95% dei casi in Europa e Nord America; debolezza prossimale e distale (coinvolgimento di radici e nervi), di solito ascendente; dolore lombare o radicolare in due terzi dei pazienti.",
      "Nervi cranici (faciale bilaterale, muscoli bulbari), insufficienza respiratoria nel 10–30%.",
      "Disautonomia in circa due terzi: aritmie, pressione instabile (fino a PRES e cardiomiopatia da stress), ipotensione ortostatica, ileo, ritenzione urinaria.",
      "Varianti: motoria pura (più frequente in Asia), faringo-cervico-brachiale, diplegia faciale con parestesie, paraparetica, sensitiva pura. Sindrome di Miller Fisher: oftalmoplegia, atassia, areflessia (anticorpi anti-GQ1b nell'85–90%, prognosi buona anche senza terapia); encefalite di Bickerstaff con alterazione della coscienza e segni piramidali.",
      "Sottotipi elettrofisiologici: AIDP (demielinizzante), AMAN (motoria assonale: più grave, riflessi conservati o vivaci all'inizio, recupero rapido se blocco di conduzione reversibile o lento se degenerazione assonale), AMSAN (sensitivo-motoria assonale, spesso esiti gravi).",
    ],
    diagnosi: [
      "Liquor: dissociazione albumino-citologica, spesso assente nella prima settimana; fino a 50 cellule/µL sono compatibili, oltre impongono di cercare altre cause.",
      "ENG: può essere normale all'inizio, ripetere dopo 2–3 settimane; utile per i sottotipi e la prognosi. Il 'risparmio del surale' (potenziale surale conservato con mediano e ulnare ridotti) sostiene una neuropatia acquisita.",
      "Anticorpi anti-gangliosidi: poco utili nella forma tipica, utili nelle varianti (GQ1b nella Miller Fisher). Se non c'è risposta alla terapia, cercare anticorpi delle nodopatie (neurofascina, contactina).",
      "RM del midollo con gadolinio: captazione e ispessimento delle radici; utile soprattutto nei bambini e per escludere una mielopatia.",
      "Neurofilamenti leggeri sierici: più alti nell'AMAN e nelle forme gravi, promettenti come marcatore prognostico (uso ancora di ricerca).",
    ],
    allarme: [
      "Segni sensitivi marcati con debolezza modesta all'esordio",
      "Febbre all'esordio",
      "Asimmetria marcata e persistente",
      "Disturbi sfinterici all'esordio",
      "Livello sensitivo netto sul tronco",
      "Iperreflessia o altri segni di primo motoneurone (salvo AMAN e Bickerstaff)",
      "Liquor con più di 50 cellule/µL o polimorfonucleati",
      "Nadir entro 24 ore o peggioramento oltre 4 settimane",
      "Esami ematici di routine alterati",
    ],
    terapia: [
      "Indicazione: pazienti che non camminano autonomamente per 10 metri; considerarla anche se deambulano ma peggiorano rapidamente o hanno coinvolgimento bulbare, autonomico o respiratorio. Nella Miller Fisher di solito basta l'osservazione, salvo estensione agli arti o ai muscoli respiratori.",
      "IVIg 2 g/kg in 5 giorni (0,4 g/kg/die) entro 2 settimane dall'esordio, oppure plasmaferesi (200–250 mL/kg in circa 5 sedute) entro 4 settimane: efficacia equivalente. Le IVIg sono spesso preferite per praticità; non serve attendere il dosaggio delle IgA.",
      "Non raccomandati (EAN/PNS 2023): secondo ciclo di IVIg, corticosteroidi, plasmaferesi seguita subito da IVIg.",
      "Fluttuazioni legate al trattamento (fino al 10%, entro 8 settimane dopo un iniziale miglioramento o stabilizzazione): ripetere la stessa terapia. Con 3 o più fluttuazioni o progressione oltre 8 settimane considerare una CIDP a esordio acuto (circa 5% dei casi).",
      "Terapia di supporto: monitoraggio frequente di capacità vitale, forza cervicale e deglutizione, ritmo e pressione; terapia intensiva se debolezza in rapido peggioramento, deficit bulbare, disautonomia grave o insufficienza respiratoria; intubazione elettiva piuttosto che d'urgenza (rischio di bradicardia e sbalzi pressori). Profilassi tromboembolica, gestione del dolore (gabapentinoidi, triciclici, carbamazepina), riabilitazione precoce; PEG e tracheostomia se necessarie.",
      "In studio: tanruprubart (anti-C1q, studio di fase 3 positivo in Bangladesh e Filippine), imlifidase, efgartigimod; eculizumab non ha dimostrato beneficio.",
    ],
    farmaci: [
      { nome: "Immunoglobuline umane per via endovenosa (IVIg)", uso: "Prima linea, ospedaliera", ema: "Indicazione per la sindrome di Guillain-Barré nelle schede tecniche di diversi prodotti", aifa: "Uso ospedaliero; in caso di carenza seguire le indicazioni nazionali sull'uso appropriato delle immunoglobuline. Da verificare per il singolo prodotto" },
      { nome: "Tanruprubart (ANX005)", uso: "Sperimentale", ema: "Non autorizzato nell'UE (designazioni FDA di farmaco orfano e fast track)", aifa: "Non disponibile" },
    ],
    prognosi: "Il punteggio EGRIS (Erasmus GBS Respiratory Insufficiency Score) stima il rischio di ventilazione nella prima settimana; il mEGOS predice la capacità di camminare a 6 mesi. Mortalità 3–7%, circa 20% nei pazienti ventilati; circa il 20% ha esiti significativi. Recidive in meno del 5%.",
    perle: [
      "Più del 95% dei casi è monofasico: un secondo episodio o un peggioramento dopo 8 settimane fa riconsiderare la diagnosi (CIDP a esordio acuto, nodopatia).",
      "La CIDP a esordio acuto ha più spesso atassia e deficit sensitivi e meno spesso infezione precedente, disautonomia, paralisi faciale o necessità di ventilazione.",
    ],
    collegamenti: [["riflessi.html", "Riflessi osteotendinei e scala NINDS"], ["patologia.html#cidp", "CIDP"]],
    fonti: ["contPasnoor", "eanpnsGbs2023"],
  },
  {
    id: "cidp", sezione: "disimmuni", nome: "Poliradicoloneuropatia demielinizzante infiammatoria cronica (CIDP)",
    breve: "Neuropatia demielinizzante immunomediata cronica, trattabile e spesso sbagliata nella diagnosi.",
    continuum: "contSethAllen",
    sintesi: "Sindrome immunomediata cronica (progressione oltre 8 settimane) con forma tipica e varianti. Rara ma trattabile: l'80–90% dei pazienti migliora con almeno una delle terapie di provata efficacia. Le diagnosi errate sono frequenti e espongono a terapie inutili.",
    epidemiologia: "Prevalenza di pochi casi ogni 100 000 abitanti; più frequente negli adulti e nei maschi.",
    clinica: [
      "CIDP tipica: debolezza simmetrica prossimale e distale degli arti, deficit sensitivo, riflessi ridotti o assenti, progressione per più di 8 settimane (o recidive).",
      "Varianti (EAN/PNS 2021): distale, multifocale (sindrome di Lewis-Sumner), focale, motoria, sensitiva. Esistono fenotipi incompleti (risparmio prossimale o distale degli arti superiori, debolezza solo prossimale, paraparesi).",
      "Dolore e fatica possono esserci, ma non definiscono la malattia in assenza di debolezza e ipoestesia.",
      "Rispetto alla Guillain-Barré: nervi cranici, insufficienza respiratoria, disautonomia e infezione precedente favoriscono la GBS; prevalenza sensitiva e ricadute oltre 8 settimane la CIDP a esordio acuto.",
      "Entità ora separate: poliradicoloneuropatia sensitiva infiammatoria cronica (CISP: atassia, iporeflessia, conduzioni quasi normali; terapia uguale alla CIDP) e nodopatie autoimmuni (5–10% dei casi): anti-neurofascina 155 (esordio giovanile, tremore, atassia, debolezza distale; IgG4), anti-contactina 1 (esordio subacuto, atassia, danno assonale precoce, possibile sindrome nefrosica), anti-Caspr1 (dolore), anti-pan-neurofascina (forma grave simil-GBS).",
    ],
    diagnosi: [
      "Criteri EAN/PNS 2021: due soli livelli di certezza, 'CIDP' e 'CIDP possibile', in base a fenotipo, criteri elettrodiagnostici di demielinizzazione motoria (in più nervi) ed esclusione di altre cause.",
      "L'ENG non è sufficiente se i potenziali motori sono molto ridotti o se il rallentamento è limitato alle sedi di compressione; controllare la temperatura degli arti.",
      "Criteri di supporto (utili nei casi dubbi): proteine liquorali aumentate (aspecifiche: diabete, discopatie, età > 50 anni), RM di radici e plessi, ecografia dei nervi, risposta oggettiva alla terapia, biopsia di nervo.",
      "In tutti: ricerca di componente monoclonale. IgM: anti-MAG, CANOMAD; IgG o IgA lambda con trombocitosi: POEMS (dosare il VEGF). Prevalenza motoria multifocale: anticorpi anti-GM1 (neuropatia motoria multifocale). Mancata risposta, tremore, atassia: anticorpi delle nodopatie.",
      "Misurare disabilità e deficit (I-RODS, INCAT, forza di presa, somma MRC) per documentare la risposta alla terapia.",
    ],
    terapia: [
      "Induzione (forte raccomandazione): IVIg o corticosteroidi; plasmaferesi se inefficaci. Nella CIDP motoria preferire le IVIg (possibile peggioramento con steroidi).",
      "IVIg: 2 g/kg in 2–5 giorni, poi 1 g/kg ogni 3 settimane; se la risposta è insufficiente si può provare 2 g/kg ogni 3–4 settimane prima di dichiarare il fallimento. Poi ridurre alla dose minima efficace (tipicamente 0,4–1 g/kg ogni 2–6 settimane).",
      "Immunoglobuline sottocutanee (convenzionali o facilitate con ialuronidasi) per il mantenimento nei pazienti dipendenti dalle IVIg, a dose equivalente.",
      "Corticosteroidi: prednisone 60 mg/die con riduzione in 6–8 mesi, oppure boli (desametasone, metilprednisolone) con efficacia simile, risposta più rapida e meno effetti avversi.",
      "Efgartigimod alfa sottocute (antagonista del recettore FcRn): efficace su disabilità e ricadute in una parte dei pazienti (studio ADHERE); risposta di solito entro 12 settimane. Peggioramenti riportati in pazienti pretrattati con IVIg.",
      "Rivalutare scelta, dose o diagnosi se non c'è un miglioramento chiaro entro 3–6 mesi; dopo il massimo beneficio tentare periodicamente la riduzione, perché non tutti richiedono una terapia a lungo termine. Il rituximab ha un ruolo incerto nella CIDP (è invece efficace nelle nodopatie IgG4).",
    ],
    farmaci: [
      { nome: "IVIg", uso: "Induzione e mantenimento", ema: "Indicazione CIDP nelle schede tecniche di diversi prodotti", aifa: "Uso ospedaliero; da verificare per il singolo prodotto e in caso di carenza" },
      { nome: "Immunoglobuline sottocutanee (convenzionali e facilitate)", uso: "Mantenimento dopo stabilizzazione con IVIg", ema: "Indicazione CIDP per alcuni prodotti", aifa: "Da verificare per il singolo prodotto" },
      { nome: "Efgartigimod alfa sc (Vyvgart)", uso: "Monoterapia negli adulti con CIDP attiva progressiva o recidivante dopo corticosteroidi o immunoglobuline", ema: "Estensione di indicazione approvata dalla Commissione europea il 19 giugno 2025 (parere CHMP aprile 2025)", aifa: "Rimborsato per la miastenia con registro di monitoraggio; una nuova indicazione è stata ammessa alla rimborsabilità da novembre 2025: verificare che riguardi la CIDP e le condizioni del registro" },
    ],
    prognosi: "Decorso cronico progressivo o recidivante; con terapia tempestiva la maggior parte dei pazienti mantiene l'autonomia, ma un ritardo diagnostico può lasciare deficit assonali permanenti.",
    perle: [
      "Prima di intensificare l'immunoterapia in un paziente che non risponde, rimettere in discussione la diagnosi: le imitazioni più comuni sono POEMS, amiloidosi da transtiretina, anti-MAG, neuropatia diabetica, CMT.",
      "La CIDP è la diagnosi errata più frequente dell'amiloidosi ATTRv in Europa.",
    ],
    collegamenti: [["patologia.html#paraproteinemiche", "Neuropatie paraproteinemiche"], ["patologia.html#amiloide", "Amiloidosi"], ["patologia.html#gbs", "Sindrome di Guillain-Barré"]],
    fonti: ["contSethAllen", "cidp2021"],
  },
  {
    id: "paraproteinemiche", sezione: "disimmuni", nome: "Neuropatie paraproteinemiche",
    breve: "Anti-MAG, CANOMAD, POEMS, amiloidosi AL, mieloma e crioglobulinemia.",
    continuum: "contStinoBecker",
    sintesi: "Le gammopatie monoclonali sono frequenti e aumentano con l'età: spesso una MGUS con polineuropatia distale simmetrica è una coincidenza. Alcuni segni d'allarme impongono invece un percorso guidato dal fenotipo, perché tipo di paraproteina, neuropatia e malattia ematologica sottostante sono collegati.",
    clinica: [
      "Neuropatia anti-MAG: IgM, maschi anziani, debolezza distale (estensori delle dita dei piedi, dorsiflessori, intrinseci delle mani), atassia e tremore, demielinizzazione con latenze distali molto prolungate. Variante MYD88 frequente (soprattutto con macroglobulinemia di Waldenström).",
      "CANOMAD/CANDA: IgM con anticorpi anti-disialosil (GD1b, GQ1b), atassia sproporzionata, oftalmoplegia in circa metà dei casi (CANOMAD), agglutinine fredde in un terzo; demielinizzazione a chiazze.",
      "POEMS (polineuropatia, organomegalia, endocrinopatia, componente monoclonale, alterazioni cutanee): disordine plasmacellulare lambda guidato da citochine e VEGF. È l'imitatore più stretto della CIDP (debolezza prossimale e distale, demielinizzazione), ma con demielinizzazione più uniforme, più danno assonale, trombocitosi (metà dei casi), lesioni ossee sclerotiche (95%), papilledema, edemi, versamenti, coinvolgimento polmonare. Ritardo diagnostico medio di oltre un anno.",
      "Amiloidosi AL: neuropatia rapidamente progressiva, dolorosa, con disautonomia (vedi scheda amiloidosi).",
      "Mieloma multiplo: neuropatia clinica solo nel 7–17% dei pazienti non trattati; più spesso neuropatia dolorosa distale da farmaci (bortezomib, talidomide).",
      "Crioglobulinemia: polineuropatia distale o mononeurite multipla con porpora dolorosa (meccanismo vasculitico).",
    ],
    diagnosi: [
      "Screening: elettroforesi e immunofissazione sieriche, rapporto delle catene leggere libere (aumenta la resa per AL e mieloma), elettroforesi urinaria soprattutto se c'è insufficienza renale.",
      "Se positivo: calcemia, funzione renale, emocromo, studio dello scheletro, invio all'ematologo per la biopsia osteomidollare.",
      "Segni d'allarme oltre alla polineuropatia distale tipica: debolezza simmetrica distale o prossimale, atassia, disautonomia, oftalmoplegia, demielinizzazione all'ENG, IgM o catena lambda.",
      "POEMS: VEGF sierico (falsamente basso in corso di steroidi), TC total body o PET per lesioni sclerotiche, versamenti, organomegalia. Proposto il dosaggio del VEGF in ogni nuova polineuropatia demielinizzante.",
      "Anti-MAG: titolo anticorpale e stato di MYD88.",
    ],
    terapia: [
      "Anti-MAG: risposta scarsa alle terapie della CIDP; rituximab spesso tentato con beneficio incerto; in studio inibitori della tirosin-chinasi di Bruton (es. zanubrutinib), da decidere con l'ematologo.",
      "CANOMAD: migliore risposta a IVIg e rituximab.",
      "POEMS: non risponde a IVIg, steroidi o plasmaferesi (la mancata risposta è spesso l'indizio). Una o due lesioni ossee senza malattia sistemica: radioterapia; altrimenti chemio-immunoterapia e/o autotrapianto di cellule staminali; lenalidomide con desametasone con alte percentuali di risposta neurologica.",
      "Gestione condivisa con l'ematologo in tutti i casi con malattia ematologica.",
    ],
    collegamenti: [["patologia.html#cidp", "CIDP"], ["patologia.html#amiloide", "Amiloidosi"]],
    fonti: ["contStinoBecker"],
  },
  {
    id: "infiammatorie-assonali", sezione: "disimmuni", nome: "Neuropatie infiammatorie assonali e vasculitiche",
    breve: "Mononeurite multipla, vasculiti sistemiche e non sistemiche, radiculoplessopatie, sarcoidosi.",
    continuum: "contFanChaudhry",
    sintesi: "Gruppo di neuropatie immunomediate con danno assonale. Quattro quadri di presentazione: mononeurite multipla, polineuropatia sensitivo-motoria asimmetrica, atassia sensitiva (ganglionopatia), radiculoplessopatia. La diagnosi richiede sospetto clinico, ENG mirato dall'esame obiettivo e attenzione ai segni sistemici.",
    clinica: [
      "Vasculiti: colpiscono i tratti intermedi degli arti (zone di confine vascolare), con quadro distale prevalente; esordio doloroso, a gradini, asimmetrico, prevalente agli arti inferiori.",
      "Vasculiti sistemiche (ANCA: granulomatosi con poliangioite, poliangioite microscopica, granulomatosi eosinofila; poliarterite nodosa; crioglobulinemia, artrite reumatoide, Sjögren) e neuropatia vasculitica non sistemica (limitata al nervo). Una VES > 100 mm/h orienta verso una vasculite sistemica.",
      "Radiculoplessopatia lombosacrale diabetica (amiotrofia diabetica) e non diabetica: dolore acuto alla coscia, poi debolezza prossimale e calo ponderale; microvasculite.",
      "Radiculoplessopatia cervicobrachiale (amiotrofia nevralgica, sindrome di Parsonage-Turner): dolore acuto intenso alla spalla, seguito da paresi multifocale (toracico lungo, soprascapolare, interosseo anteriore); spesso dopo infezioni, interventi, sforzi. Sottodiagnosticata.",
      "Sarcoidosi: più spesso nervi cranici (faciale), ma anche polineuropatia, mononeurite multipla, plessopatie, piccole fibre.",
      "Il dolore non distingue le forme infiammatorie dalle altre, e la sua risposta non segue l'attività di malattia.",
    ],
    diagnosi: [
      "ENG guidato dall'esame obiettivo; attenzione: un danno assonale acuto focale può simulare un blocco di conduzione demielinizzante.",
      "Esami ematici per infiammazione sistemica, coinvolgimento d'organo, infezioni (HBV, HCV, HIV), ANCA, crioglobuline, complemento, autoanticorpi.",
      "Biopsia di nervo (surale o peroneo superficiale, eventualmente con muscolo peroneo breve) su un nervo moderatamente colpito, lunga 30–50 mm, prima dell'immunoterapia. La vasculite certa richiede infiammazione della parete con danno vascolare; infiltrati perivascolari senza danno sono aspecifici.",
      "Criteri PNS 2010 di vasculite 'clinicamente probabile' quando manca la conferma bioptica.",
      "RM neurografia e PET-FDG per scegliere la sede della biopsia; neurofilamenti leggeri come indice di danno assonale attivo.",
    ],
    terapia: [
      "Neuropatia vasculitica non sistemica: se stabile o in miglioramento, osservazione. Altrimenti prednisone 1 mg/kg/die (boli di metilprednisolone nelle forme gravi) con riduzione a circa 25 mg a 3 mesi, 15 mg a 4 mesi, 10 mg a 6 mesi; basse dosi (5–7,5 mg) per 6–18 mesi riducono le recidive (fino al 30%).",
      "Forme gravi o refrattarie: ciclofosfamide in induzione (metotrexato in alternativa; non azatioprina, troppo lenta); mantenimento con rituximab, micofenolato, azatioprina o metotrexato.",
      "Vasculiti ANCA sistemiche: induzione con rituximab sempre più preferito alla ciclofosfamide, in collaborazione con il reumatologo.",
      "Radiculoplessopatie lombosacrali: miglioramento spontaneo in mesi o anni, spesso incompleto; prove a favore dell'immunoterapia limitate.",
      "Amiotrofia nevralgica: terapia del dolore e riabilitazione (coordinazione scapolare, poi rinforzo); gli steroidi riducono il dolore ma non la debolezza. Senza recupero a 3–6 mesi valutare la chirurgia delle strozzature 'a clessidra'; transfer tendinei nei deficit irreversibili. Dolore e limitazioni persistono nel 25–33% a 2 anni.",
      "Il dolore neuropatico persiste spesso anche dopo il controllo della vasculite.",
    ],
    farmaci: [
      { nome: "Rituximab", uso: "Induzione e mantenimento delle vasculiti ANCA-associate", ema: "Indicazione per granulomatosi con poliangioite e poliangioite microscopica", aifa: "Da verificare per l'indicazione; nella neuropatia vasculitica non sistemica è fuori indicazione" },
    ],
    collegamenti: [["sensibilita.html", "Mappe sensitive: mononeurite multipla"], ["movimenti.html#nervo=tronchi-brachiali&lesione=tronco-superiore", "Simulatore: lesioni del plesso brachiale"]],
    fonti: ["contFanChaudhry", "pnsVasculite2010"],
  },

  // ------------------------------------------------------------------ Ereditarie e da accumulo
  {
    id: "ereditarie", sezione: "ereditarie", nome: "Neuropatie ereditarie (Charcot-Marie-Tooth e forme correlate)",
    breve: "La malattia neuromuscolare ereditaria più frequente: oltre 100 geni.",
    continuum: "contSaportaZuchner",
    sintesi: "Le neuropatie ereditarie sono tra le malattie neuromuscolari genetiche più comuni. La Charcot-Marie-Tooth (CMT), sensitivo-motoria, è il prototipo ed è legata a varianti in oltre 100 geni; esistono forme prevalentemente motorie (neuropatie motorie ereditarie distali), sensitivo-autonomiche (HSAN) e forme multisistemiche (amiloidosi familiare, neuropatie metaboliche).",
    epidemiologia: "Prevalenza della CMT 10–40 ogni 100 000 abitanti.",
    clinica: [
      "Polineuropatia lunghezza-dipendente, sensitivo-motoria, lentamente progressiva, con piede cavo e dita a martello.",
      "Esordio spesso nell'infanzia con sintomi sfumati (inciampi, cadute, difficoltà nella corsa o sui pattini), notati solo a domande dirette.",
      "Indizi: esordio precoce, lunga durata con progressione lenta, deformità del piede, pochi sintomi positivi nonostante deficit sensitivi obiettivi.",
      "Una familiarità negativa non esclude una forma genetica (varianti de novo, forme recessive, famiglie piccole, esordio tardivo); non è raro che pazienti trattati per una neuropatia infiammatoria ricevano poi una diagnosi genetica.",
      "Quadri particolari: neuropatia ereditaria con predisposizione alle paralisi da pressione (HNPP, delezione di PMP22) e neuropatia ereditaria del plesso brachiale (episodiche, asimmetriche); CMT1X (GJB1) con asimmetrie ed episodi transitori di disfunzione del sistema nervoso centrale; MFN2 (CMT2A) con esordio precoce e debolezza anche prossimale; CANVAS (espansione in RFC1) con neuronopatia sensitiva, atassia cerebellare e areflessia vestibolare.",
    ],
    diagnosi: [
      "ENG per distinguere forme demielinizzanti (velocità di conduzione motoria del mediano < 38 m/s), assonali (> 38 m/s) e intermedie (25–45 m/s).",
      "Demielinizzante: prima l'analisi del numero di copie di PMP22 (duplicazione = CMT1A); se negativa pannello con MPZ, NEFL, EGR2. Assonale: MFN2. Intermedia: GJB1, MPZ, DNM2, YARS. Le tre cause principali delle forme dominanti sono PMP22, MPZ e MFN2.",
      "Il pannello multigenico è il test di scelta; nelle forme recessive verificare che due varianti siano su cromosomi diversi (fase). La trasmissione maschio-maschio esclude l'X-linked.",
      "SORD: la causa più frequente di neuropatia recessiva prevalentemente motoria, anche a esordio adulto e sporadico; sorbitolo e xilitolo urinari sono il primo biomarcatore diagnostico delle neuropatie ereditarie.",
      "Limiti: varianti di significato incerto; il sequenziamento dell'esoma può non rilevare varianti strutturali, delle copie, espansioni di ripetizioni (RFC1) e varianti introniche profonde.",
      "Ecografia e RM mostrano nervi ipertrofici omogenei nelle forme demielinizzanti come la CMT1A.",
    ],
    terapia: [
      "Nessuna terapia modificante approvata: riabilitazione, ortesi, chirurgia del piede, gestione del dolore e della fatica.",
      "Evitare i farmaci neurotossici (in particolare vincristina) e mantenere peso e attività fisica.",
      "Consulenza genetica per il paziente e i familiari a rischio.",
      "In sperimentazione approcci modificanti la malattia, tra cui il primo studio clinico su una forma recessiva (neuropatia da SORD).",
    ],
    collegamenti: [["patologia.html#amiloide", "Amiloidosi familiare da transtiretina"]],
    fonti: ["contSaportaZuchner"],
  },
  {
    id: "amiloide", sezione: "ereditarie", nome: "Neuropatie amiloidotiche",
    breve: "Amiloidosi AL e da transtiretina (ATTRv, ATTRwt): progressive ma trattabili.",
    continuum: "contPinto",
    sintesi: "Quasi tutte le neuropatie amiloidotiche sono dovute ad amiloidosi a catene leggere (AL) o ad amiloidosi ereditaria da transtiretina (ATTRv): malattie trattabili da non mancare. Progressione rapida e disautonomia sono i due indizi principali.",
    epidemiologia: "Nell'ATTRv la variante più frequente varia per area geografica (Val30Met nelle aree endemiche europee; in Italia sono descritte anche altre varianti, con focolai regionali); negli Stati Uniti prevale Val122Ile (3–4% degli afroamericani). L'ATTR wild-type (ATTRwt) colpisce soprattutto uomini anziani con cardiomiopatia restrittiva.",
    clinica: [
      "Polineuropatia distale simmetrica dolorosa, con interessamento precoce delle piccole fibre, che peggiora più rapidamente delle altre polineuropatie comuni. Una neuropatia di lunga durata senza debolezza è molto improbabile che sia amiloidotica.",
      "Ipotensione ortostatica neurogena nel 40–60%; disautonomia anche isolata, simile alle sinucleinopatie.",
      "Sindrome del tunnel carpale: la neuropatia più frequente nell'amiloidosi sistemica (fino al 21% nell'AL, 74% nell'ATTRv con neuropatia, 60% nell'ATTRwt), spesso bilaterale e anni prima.",
      "Segni sistemici: cardiomiopatia ipertrofica inspiegata, proteinuria, calo ponderale > 5 kg in 6 mesi, edemi, dispnea, porpora periorbitaria (AL), opacità vitreali, stenosi lombare.",
      "Amiloidosi da gelsolina: diplegia faciale, cute lassa, distrofia corneale a reticolo (patognomonica).",
    ],
    diagnosi: [
      "In ogni neuropatia progressiva di causa incerta: studio della componente monoclonale con catene leggere libere e biopsia minimamente invasiva (aspirato di grasso addominale o biopsia cutanea; sensibilità 48–83%).",
      "Rapporto kappa/lambda normale: AL molto improbabile; elevato oltre 8 volte la norma molto sospetto, oltre 3 volte sospetto.",
      "Tipizzazione del deposito con spettrometria di massa: fino al 25% dei pazienti con ATTR ha anche una MGUS e l'amiloidosi può essere duplice.",
      "Sequenziamento del gene TTR (pannello che includa anche gelsolina e APOA1); se negativi ma il sospetto resta alto, biopsia del nervo surale.",
      "Coinvolgimento cardiaco: scintigrafia ossea con traccianti difosfonati; captazione miocardica di grado elevato senza componente monoclonale è diagnostica di cardiomiopatia ATTR senza biopsia.",
      "Valutare sempre pressione e frequenza in clino- e ortostatismo.",
    ],
    terapia: [
      "ATTRv con polineuropatia: silenziatori genici, che riducono la transtiretina circolante dell'85–90% e rallentano nettamente la progressione: patisiran (siRNA ev ogni 3 settimane), vutrisiran (siRNA sc ogni 3 mesi), eplontersen (oligonucleotide antisenso sc mensile). Stabilizzatori del tetramero: tafamidis (stadio iniziale), diflunisal (fuori indicazione).",
      "Non ci sono prove a favore del trattamento dei portatori asintomatici: controlli ogni 1–2 anni a partire da 10 anni prima dell'età di esordio attesa.",
      "In studio: editing genico CRISPR (nexiguran ziclumeran, fase 3) e RNA di terza generazione (nucresiran).",
      "AL: terapia ematologica contro il clone plasmacellulare; i regimi con daratumumab hanno migliorato la sopravvivenza e il trapianto autologo non è più la prima linea.",
    ],
    farmaci: [
      { nome: "Tafamidis (Vyndaqel)", uso: "ATTRv con polineuropatia di stadio 1; anche cardiomiopatia ATTR", ema: "Autorizzato", aifa: "Da verificare (indicazione neurologica e cardiologica hanno condizioni diverse)" },
      { nome: "Patisiran (Onpattro)", uso: "ATTRv con polineuropatia stadio 1–2", ema: "Autorizzato (2018)", aifa: "Da verificare (registro di monitoraggio)" },
      { nome: "Vutrisiran (Amvuttra)", uso: "ATTRv con polineuropatia stadio 1–2", ema: "Autorizzato (2022)", aifa: "Da verificare (registro di monitoraggio)" },
      { nome: "Eplontersen (Wainzua)", uso: "ATTRv con polineuropatia stadio 1–2, autoiniezione mensile", ema: "Approvato dalla Commissione europea a marzo 2025", aifa: "Da verificare" },
      { nome: "Inotersen (Tegsedi)", uso: "Primo oligonucleotide antisenso", ema: "Da verificare: ritirato dal mercato statunitense dopo l'arrivo di eplontersen", aifa: "Da verificare" },
    ],
    perle: [
      "In Europa la diagnosi errata più frequente dell'ATTRv è la CIDP; negli Stati Uniti la neuropatia idiopatica.",
      "Non inviare di routine il legamento traverso del carpo all'esame istologico per l'amiloide se il tunnel carpale è l'unico indizio.",
    ],
    collegamenti: [["anatomia.html#mediano", "Nervo mediano e tunnel carpale"], ["patologia.html#paraproteinemiche", "Neuropatie paraproteinemiche"]],
    fonti: ["contPinto", "adamsAttr2020"],
  },

  // ------------------------------------------------------------------ Piccole fibre
  {
    id: "piccole-fibre-scheda", sezione: "piccole-fibre", nome: "Neuropatia delle piccole fibre",
    breve: "Dolore urente e disautonomia con conduzioni nervose normali.",
    continuum: "contEckensteinWaheed",
    sintesi: "Interessamento selettivo delle fibre Aδ sottilmente mieliniche e C amieliniche (dolore, temperatura, funzioni autonomiche). L'incidenza è in aumento soprattutto per il miglior riconoscimento; dolore cronico e disautonomia pesano molto sulla qualità di vita.",
    clinica: [
      "Dolore urente, puntorio, scosse; allodinia meccanica e al freddo; prurito; deficit di sensibilità termica e dolorifica con forza, riflessi e pallestesia normali.",
      "Sintomi autonomici: secchezza di occhi e bocca, alterazioni della sudorazione e del colorito, ortostatismo, disturbi gastrointestinali e urinari.",
      "Schema 'cosa, dove, quando, in che contesto': lunghezza-dipendente e lentamente progressiva fa pensare a cause ereditarie, tossiche, metaboliche o idiopatiche; non lunghezza-dipendente (volto, tronco, prossimale) e acuta o subacuta a cause immunomediate, paraneoplastiche o infettive (ganglionopatia); sintomi parossistici a una canalopatia.",
      "Cause: diabete e prediabete (le più frequenti), carenza di B12, tireopatie, alcol, chemioterapici, Sjögren, celiachia, sarcoidosi, infezioni (HIV, HCV), gammopatie e amiloidosi, malattia di Fabry, porfiria; genetiche nel 10–30% (canali del sodio SCN9A, SCN10A, SCN11A e canali TRP, più fattori di rischio che cause dirette).",
    ],
    diagnosi: [
      "Diagnosi basata su sintomi tipici (questionari validati), esame delle piccole fibre e test strumentali; ENG di solito normale (serve a escludere un coinvolgimento delle grosse fibre).",
      "Biopsia cutanea con densità delle fibre intraepidermiche (PGP 9.5; sensibilità e specificità circa 90%): almeno due sedi, distale e prossimale, per distinguere forme lunghezza-dipendenti e non.",
      "Altri test: test sensitivi quantitativi, microscopia confocale corneale, test sudomotori (QSART), batteria autonomica cardiovascolare.",
      "Esami di screening: emocromo, profilo metabolico (con curva da carico di glucosio se la glicemia è normale), B12 con metaboliti, funzione tiroidea, elettroforesi e immunofissazione, catene leggere libere; poi esami mirati (anti-SSA/SSB, anticorpi della celiachia, ACE, HIV e HCV, alfa-galattosidasi A, TTR).",
    ],
    terapia: [
      "Trattare la causa quando possibile: malattie genetiche sistemiche trattabili sono l'amiloidosi ATTRv (silenziatori e stabilizzatori), la malattia di Fabry (terapia enzimatica sostitutiva o chaperone migalastat) e la porfiria.",
      "Dolore (NeuPSIG 2025): prima linea SNRI, triciclici, gabapentinoidi; seconda linea capsaicina 8% cerotto, capsaicina crema, lidocaina 5% cerotto; terza linea tossina botulinica, rTMS, oppioidi (tra cui il tramadolo).",
      "Approccio multidisciplinare: sonno, umore, attività fisica; stimolazione elettrica transcutanea o midollare in casi selezionati.",
    ],
    farmaci: [
      { nome: "Migalastat (Galafold)", uso: "Malattia di Fabry con varianti 'amenabili'", ema: "Autorizzato", aifa: "Da verificare" },
      { nome: "Agalsidasi alfa e beta", uso: "Malattia di Fabry, terapia enzimatica sostitutiva", ema: "Autorizzate", aifa: "Da verificare" },
    ],
    collegamenti: [["patologia.html#diabetica", "Neuropatie diabetiche"], ["patologia.html#amiloide", "Amiloidosi"]],
    fonti: ["contEckensteinWaheed", "neupsig2025"],
  },

  // ------------------------------------------------------------------ Motoneurone
  {
    id: "sla", sezione: "motoneurone", nome: "Sclerosi laterale amiotrofica",
    breve: "Degenerazione del primo e del secondo motoneurone; frequente coinvolgimento frontotemporale.",
    continuum: "contBromberg",
    sintesi: "Malattia neurodegenerativa del primo (UMN) e secondo motoneurone (LMN), a esordio focale e diffusione progressiva ad altre regioni. La diagnosi è soprattutto clinica e i veri imitatori sono rari. Circa metà dei pazienti ha anche sintomi non motori.",
    epidemiologia: "Malattia dell'adulto; varianti genetiche patogene o di rischio sono presenti in una quota di pazienti, anche senza familiarità (C9orf72, SOD1, TARDBP, FUS…). Modello a più passaggi ('multistep'): circa sei nella popolazione europea, meno nei portatori di varianti. Fattori ambientali ipotizzati (fumo, attività atletica, basso indice di massa corporea, servizio militare, pesticidi e metalli) senza fattori evitabili dimostrati.",
    clinica: [
      "LMN: debolezza con ipotrofia (compare dopo la perdita di circa metà dei motoneuroni), crampi, fascicolazioni diffuse spontanee e da contrazione.",
      "UMN: riflessi relativamente vivaci in muscoli ipotrofici, spesso asimmetrici; Hoffmann e Trömner frequenti e asimmetrici, Babinski meno comune; spasticità.",
      "Fenotipi: esordio bulbare o spinale; sclerosi laterale primaria (solo UMN; diagnosi definitiva dopo 5 anni senza segni LMN); atrofia muscolare progressiva (solo LMN); forme 'flail arm' e 'flail leg' (LMN limitata a due arti per oltre 2 anni, progressione più lenta); paralisi bulbare progressiva.",
      "Sintomi non motori: demenza o sindrome frontotemporale, labilità emotiva (affetto pseudobulbare).",
    ],
    diagnosi: [
      "Criteri di Gold Coast (2020): deficit motorio progressivo con segni UMN e LMN in almeno una regione o LMN in almeno due, ed esclusione di altre cause.",
      "EMG: documenta denervazione attiva e cronica anche subclinica oltre il territorio di singoli nervi e radici; potenziali sensitivi normali; CMAP spesso ridotti.",
      "Nessun esame di laboratorio specifico; la RM di encefalo e midollo è poco sensibile per la perdita UMN e serve a escludere altre cause. Le alterazioni degenerative del rachide sono frequenti: la decompressione chirurgica non modifica la malattia.",
      "Test genetico da offrire a tutti i pazienti, non solo alle forme familiari (implicazioni terapeutiche per SOD1 e per la consulenza).",
    ],
    terapia: [
      "Comunicare la diagnosi con tecniche strutturate e presa in carico in un centro multidisciplinare (migliora qualità e durata della vita).",
      "Riluzolo 50 mg due volte al giorno: modesto prolungamento della sopravvivenza.",
      "Tofersen (oligonucleotide antisenso intratecale) nelle forme con variante SOD1: riduce i neurofilamenti leggeri; autorizzato nell'UE in circostanze eccezionali.",
      "Edaravone ev: approvato da FDA, non autorizzato nell'UE; in Italia erogabile ai sensi della legge 648/96 con criteri di eleggibilità (verificare lo stato attuale).",
      "Nutrizione: PEG o gastrostomia radiologica prima che la capacità vitale sia troppo ridotta. Respirazione: ventilazione non invasiva all'insufficienza respiratoria (ortopnea, ipercapnia notturna). Sintomi: scialorrea, crampi, spasticità, affetto pseudobulbare, secrezioni dense, dolore; comunicazione aumentativa; cure palliative e pianificazione condivisa delle cure (linee guida EAN 2024).",
    ],
    farmaci: [
      { nome: "Riluzolo", uso: "Tutti i pazienti con SLA", ema: "Autorizzato", aifa: "Rimborsato (verificare la classe del medicinale prescritto)" },
      { nome: "Tofersen (Qalsody)", uso: "Adulti con SLA e variante patogena di SOD1 (circa 2% dei casi)", ema: "Autorizzazione in circostanze eccezionali, in vigore dal 29 maggio 2024", aifa: "Da verificare" },
      { nome: "Edaravone (Radicut, ev)", uso: "Pazienti selezionati", ema: "Non autorizzato nell'UE", aifa: "Inserito nel 2017 nell'elenco della legge 648/96, con prescrizione del neurologo e somministrazione ospedaliera: verificare la permanenza nell'elenco" },
    ],
    prognosi: "Sopravvivenza mediana di alcuni anni dall'esordio, molto variabile per fenotipo (più lunga nelle forme 'flail' e nella sclerosi laterale primaria).",
    perle: [
      "I veri imitatori sono rari ma vanno esclusi: neuropatia motoria multifocale (blocchi di conduzione, anti-GM1), mielopatia cervicale, miosite da corpi inclusi, malattia di Kennedy.",
      "Il Babinski è meno frequente di quanto si pensi; più utili il confronto dei riflessi con colpi leggeri e i segni di Hoffmann e Trömner.",
    ],
    collegamenti: [["riflessi.html#hoffmann", "Segno di Hoffmann"], ["riflessi.html", "Riflessi patologici"]],
    fonti: ["contBromberg", "goldCoast2020", "eanSla2024"],
  },
  {
    id: "sma", sezione: "motoneurone", nome: "Atrofia muscolare spinale",
    breve: "Malattia autosomica recessiva da perdita di SMN1; storia naturale cambiata da terapie e screening neonatale.",
    continuum: "contLeeCiafaloni",
    sintesi: "Malattia autosomica recessiva del secondo motoneurone dovuta alla perdita biallelica del gene SMN1 (5q). Il gene 'di riserva' SMN2 produce solo il 15% circa di proteina funzionante: più copie di SMN2, fenotipo più lieve. Terapie modificanti la malattia e screening neonatale hanno trasformato la storia naturale, ma non esiste una cura.",
    clinica: [
      "Tipi definiti da età d'esordio e massima tappa motoria: tipo 0 (prenatale), 1 (esordio < 6 mesi, non acquisisce la posizione seduta), 2 (seduta ma non cammino), 3 (cammino autonomo, esordio dopo 18 mesi), 4 (adulto).",
      "Debolezza prossimale simmetrica, ipotonia, areflessia, fascicolazioni della lingua, tremore delle mani; insufficienza respiratoria e disfagia nelle forme gravi; scoliosi.",
      "Riconosciuti ritardi del linguaggio, difficoltà cognitive e comportamentali in alcuni bambini.",
    ],
    diagnosi: [
      "Test molecolare: delezione omozigote dell'esone 7 di SMN1 e conteggio delle copie di SMN2.",
      "Screening neonatale: sfugge circa il 5% dei casi 5q (varianti puntiformi in eterozigosi composta) e tutte le forme non 5q. In Italia lo screening è attivo in molte Regioni ed è in corso l'inserimento nel pannello nazionale (verificare lo stato del decreto).",
      "Neurofilamenti (pNfH, NfL) come marcatori prognostici e di risposta, ancora poco disponibili.",
    ],
    terapia: [
      "Trattare il prima possibile, idealmente in fase presintomatica: la vulnerabilità inizia presto, soprattutto con 2 copie di SMN2.",
      "Nusinersen: oligonucleotide antisenso intratecale che modifica lo splicing di SMN2 (inclusione dell'esone 7). Nell'UE è stato approvato a gennaio 2026 anche un regime a dosi più alte (due carichi da 50 mg a 14 giorni, poi 28 mg ogni 4 mesi).",
      "Risdiplam: piccola molecola orale quotidiana (liquida o compresse) che modifica lo splicing di SMN2; per tutte le età e i tipi, senza monitoraggio di laboratorio.",
      "Onasemnogene abeparvovec: terapia genica con vettore AAV9, infusione endovenosa unica; formulazione intratecale per pazienti dai 2 anni.",
      "In studio: inibitori della miostatina (apitegromab, taldefgrobep alfa, GYM329) e altri bersagli muscolari.",
      "Gestione multidisciplinare: respiratoria, nutrizionale, ortopedica, riabilitativa, neuropsicologica.",
    ],
    farmaci: [
      { nome: "Nusinersen (Spinraza)", uso: "SMA 5q", ema: "Autorizzato (2017); regime ad alte dosi approvato a gennaio 2026", aifa: "Rimborsato con condizioni definite da AIFA: verificare il regime ad alte dosi" },
      { nome: "Risdiplam (Evrysdi)", uso: "SMA 5q da 2 mesi di età con tipo 1–3 o 1–4 copie di SMN2 (verificare l'estensione alla nascita)", ema: "Autorizzato", aifa: "Da verificare" },
      { nome: "Onasemnogene abeparvovec ev (Zolgensma)", uso: "SMA 5q con diagnosi clinica di tipo 1 o fino a 3 copie di SMN2, dosaggio per peso", ema: "Autorizzazione condizionata (2020)", aifa: "Da verificare (condizioni di rimborsabilità e centri prescrittori)" },
      { nome: "Onasemnogene abeparvovec intratecale (Itvisma)", uso: "SMA 5q dai 2 anni di età, somministrazione unica in ospedale", ema: "Autorizzazione UE del 30 giugno 2026 (parere CHMP aprile 2026)", aifa: "Rimborsabilità nazionale da definire: verificare" },
    ],
    collegamenti: [["patologia.html#sla", "Sclerosi laterale amiotrofica"]],
    fonti: ["contLeeCiafaloni"],
  },
];

export const LINK_REGOLATORI = { ema: EMA, aifa: AIFA };
