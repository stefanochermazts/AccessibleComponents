# Guida Componenti - Documentazione Dettagliata

## Indice

### A. Navigazione
1. [Skip Link](#skip-link)
2. [Breadcrumbs](#breadcrumbs)
3. [Tabs](#tabs)
4. [Main Navigation](#main-navigation)

### B. Input & Form
5. [Buttons](#buttons)
6. [Input Fields](#input-fields)
7. [Custom Checkbox/Radio](#custom-checkboxradio)

### C. Contenuto & Feedback
8. [Accordion](#accordion)
9. [Modal](#modal)
10. [Cards](#cards)
11. [Alerts](#alerts)

### D. Media
12. [Carousel](#carousel)

### E. Componenti W3C APG
13. [Combobox](#combobox)
14. [Disclosure](#disclosure)
15. [Tooltip](#tooltip)
16. [Slider](#slider)
17. [Listbox](#listbox)
18. [Meter](#meter)
19. [Spinbutton](#spinbutton)
20. [Toolbar](#toolbar)
21. [Table](#table)
22. [Grid](#grid)
23. [Tree View](#tree-view)
24. [Treegrid](#treegrid)
25. [Feed](#feed)
26. [Window Splitter](#window-splitter)

---

## A. Navigazione

### Skip Link

**Descrizione:** Link nascosto che appare al primo Tab, permette di saltare la navigazione e andare direttamente al contenuto principale.

**Quando usarlo:**
- Sempre, in tutte le pagine con header complesso

**Markup:**

```html
<a href="#main-content" class="skip-link">Vai al contenuto principale</a>

<!-- Più avanti nella pagina -->
<main id="main-content">
  <!-- Contenuto -->
</main>
```

**CSS Classes:**
- `.skip-link` - Classe principale

**ARIA Attributes:**
- Nessuno richiesto

**Keyboard Interaction:**
- **Tab:** Mostra il link
- **Enter:** Salta al contenuto

**Accessibilità:**
- ✅ Il link è nascosto finché non riceve focus
- ✅ Il target `#main-content` deve esistere
- ✅ Il focus si sposta effettivamente al target

---

### Breadcrumbs

**Descrizione:** Percorso gerarchico che mostra la posizione dell'utente nel sito.

**Quando usarlo:**
- Siti con struttura gerarchica profonda (es. e-commerce, documentazione)

**Markup:**

```html
<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/prodotti">Prodotti</a></li>
    <li><a href="/prodotti/elettronica">Elettronica</a></li>
    <li><a href="/prodotti/elettronica/laptop" aria-current="page">Laptop</a></li>
  </ol>
</nav>
```

**CSS Classes:**
- `.breadcrumb` - Contenitore
- Separatori generati automaticamente con CSS `::after`

**ARIA Attributes:**
- `aria-label="Breadcrumb"` - Identifica la navigazione
- `aria-current="page"` - Indica la pagina corrente (NON deve essere un link)

**Keyboard Interaction:**
- **Tab/Shift+Tab:** Naviga tra i link

**Accessibilità:**
- ✅ Usa `<nav>` con label appropriata
- ✅ Usa lista ordinata `<ol>` per semantica
- ✅ L'ultimo elemento non è un link

---

### Tabs

**Descrizione:** Pannelli a schede che mostrano un contenuto alla volta.

**Quando usarlo:**
- Organizzare contenuti correlati ma separati
- Dashboard, settings, product details

**Markup:**

```html
<div class="tabs">
  <div role="tablist" aria-label="Descrizione tabs">
    <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1" class="tab-button">
      Tab 1
    </button>
    <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2" class="tab-button" tabindex="-1">
      Tab 2
    </button>
  </div>
  
  <div id="panel-1" role="tabpanel" aria-labelledby="tab-1" class="tab-panel">
    Contenuto pannello 1
  </div>
  <div id="panel-2" role="tabpanel" aria-labelledby="tab-2" class="tab-panel" hidden>
    Contenuto pannello 2
  </div>
</div>
```

**CSS Classes:**
- `.tabs` - Contenitore
- `.tab-button` - Singolo tab
- `.tab-panel` - Pannello di contenuto

**ARIA Attributes:**
- `role="tablist"` - Contenitore tabs
- `role="tab"` - Singola tab
- `role="tabpanel"` - Pannello contenuto
- `aria-selected="true/false"` - Stato selezione
- `aria-controls="panel-id"` - Collega tab a pannello
- `aria-labelledby="tab-id"` - Collega pannello a tab

**Keyboard Interaction:**
- **←/→:** Naviga tra le tab (NON Tab!)
- **Home/End:** Prima/ultima tab
- **Tab:** Entra nel pannello attivo

**JavaScript:**
- `initTabs()` - Auto-inizializzazione

**Accessibilità:**
- ✅ Solo la tab attiva ha `tabindex="0"`, le altre `-1`
- ✅ Il pannello nascosto ha attributo `hidden`
- ✅ La navigazione con frecce è implementata

---

### Main Navigation

**Descrizione:** Menu principale del sito, responsive con bottone hamburger su mobile.

**Markup:**

```html
<nav class="main-nav" aria-label="Menu principale">
  <button class="mobile-menu-btn" aria-expanded="false" aria-controls="main-menu">
    ☰
  </button>
  <ul id="main-menu" class="nav-list">
    <li><a href="#" class="nav-link">Home</a></li>
    <li><a href="#" class="nav-link">About</a></li>
    <li><a href="#" class="nav-link">Contatti</a></li>
  </ul>
</nav>
```

**CSS Classes:**
- `.main-nav` - Contenitore
- `.mobile-menu-btn` - Bottone hamburger (visibile solo su mobile)
- `.nav-list` - Lista link
- `.nav-list.is-open` - Menu aperto su mobile

**ARIA Attributes:**
- `aria-label="Menu principale"` - Identifica la navigazione
- `aria-expanded="true/false"` - Stato menu mobile
- `aria-controls="main-menu"` - Collega bottone a menu

**Keyboard Interaction:**
- **Tab:** Naviga tra i link
- **Enter/Spazio:** Apre/chiude menu mobile
- **Esc:** Chiude menu mobile (quando aperto)

**JavaScript:**
- `initMobileMenu()` - Gestisce apertura/chiusura mobile

---

## B. Input & Form

### Buttons

**Descrizione:** Pulsanti accessibili con stati chiari.

**Varianti:**
- Primary: `.btn.btn-primary`
- Secondary: `.btn.btn-secondary`
- Outline: `.btn.btn-outline`

**Markup:**

```html
<!-- Bottone normale -->
<button class="btn btn-primary">Invia</button>

<!-- Bottone disabilitato -->
<button class="btn btn-primary" disabled>Disabilitato</button>

<!-- Oppure con aria-disabled (mantiene il focus) -->
<button class="btn btn-primary" aria-disabled="true">Non disponibile</button>
```

**CSS Classes:**
- `.btn` - Classe base
- `.btn-primary` / `.btn-secondary` / `.btn-outline` - Varianti

**ARIA Attributes:**
- `aria-disabled="true"` - Alternativa a `disabled` che mantiene il focus

**Keyboard Interaction:**
- **Enter/Spazio:** Attiva il bottone

**Best Practices:**
- ✅ Usa sempre `<button>` invece di `<div role="button">`
- ✅ Fornisci label chiare e descrittive
- ✅ Per bottoni icon-only, usa `aria-label`

---

### Input Fields

**Descrizione:** Campi di input con label e gestione errori accessibile.

**Markup:**

```html
<!-- Input normale -->
<div class="form-group">
  <label for="username" class="form-label">Nome utente</label>
  <input type="text" id="username" class="form-input">
</div>

<!-- Input con errore -->
<div class="form-group">
  <label for="email" class="form-label">Email</label>
  <input 
    type="email" 
    id="email" 
    class="form-input" 
    aria-invalid="true" 
    aria-describedby="email-error"
  >
  <span id="email-error" class="form-error">Inserisci un'email valida.</span>
</div>
```

**CSS Classes:**
- `.form-group` - Contenitore
- `.form-label` - Label
- `.form-input` - Input field
- `.form-error` - Messaggio errore

**ARIA Attributes:**
- `aria-invalid="true"` - Input non valido
- `aria-describedby="error-id"` - Collega input a messaggio errore

**Keyboard Interaction:**
- Standard input behavior

**Accessibilità:**
- ✅ Usa sempre `<label>` con `for` attribute
- ✅ Il messaggio di errore deve essere presente nel DOM (anche se nascosto)
- ✅ Gli screen reader leggeranno label + valore + errore

---

### Custom Checkbox/Radio

**Descrizione:** Checkbox e radio button stilizzati mantenendo accessibilità.

**Markup:**

```html
<!-- Checkbox Custom -->
<label class="custom-control custom-checkbox">
  <input type="checkbox" class="custom-control-input">
  <span class="custom-control-indicator"></span>
  <span>Accetto i termini</span>
</label>

<!-- Radio Custom -->
<label class="custom-control custom-radio">
  <input type="radio" name="theme" class="custom-control-input">
  <span class="custom-control-indicator"></span>
  <span>Tema Chiaro</span>
</label>
```

**CSS Classes:**
- `.custom-control` - Contenitore
- `.custom-checkbox` / `.custom-radio` - Tipo
- `.custom-control-input` - Input (nascosto visivamente)
- `.custom-control-indicator` - Indicatore stilizzato

**Tecnica:**
- L'input nativo è nascosto con classe `.visually-hidden` (opacity:0, width:0)
- Lo stile è applicato su `.custom-control-indicator`
- Il focus sull'input nativo mostra l'outline sull'indicatore

**Keyboard Interaction:**
- **Spazio:** Toggle checkbox
- **Frecce:** Seleziona radio (all'interno di un gruppo)

**Accessibilità:**
- ✅ L'input nativo è presente nel DOM
- ✅ Il focus ring appare sull'indicatore custom
- ✅ Screen reader leggono stato checked/unchecked

---

## C. Contenuto & Feedback

### Accordion

**Descrizione:** Pannelli espandibili/collassabili, ideale per FAQ.

**Markup:**

```html
<div class="accordion-item">
  <h3 class="accordion-header">
    <button aria-expanded="false" aria-controls="acc-content-1">
      <span>Domanda 1</span>
      <span class="accordion-icon">▼</span>
    </button>
  </h3>
  <div id="acc-content-1" class="accordion-panel" hidden>
    <p>Risposta alla domanda 1.</p>
  </div>
</div>
```

**CSS Classes:**
- `.accordion-item` - Singolo item
- `.accordion-header` - Header con bottone
- `.accordion-panel` - Contenuto
- `.accordion-icon` - Icona (ruota con animazione)

**ARIA Attributes:**
- `aria-expanded="true/false"` - Stato pannello
- `aria-controls="content-id"` - Collega bottone a contenuto

**Keyboard Interaction:**
- **Tab:** Naviga tra i bottoni
- **Enter/Spazio:** Espande/collassa

**JavaScript:**
- `initAccordions()` - Auto-inizializzazione

**Accessibilità:**
- ✅ Il bottone è dentro un heading (`<h2>`, `<h3>`, ecc.)
- ✅ Il pannello collassato ha attributo `hidden`
- ✅ `aria-expanded` viene aggiornato dinamicamente

---

### Modal

**Descrizione:** Finestra di dialogo modale con focus trap.

**Markup:**

```html
<!-- Trigger -->
<button data-modal-target="modal-example">Apri Modale</button>

<!-- Modal -->
<div id="modal-example" class="modal-overlay" aria-hidden="true">
  <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <h2 id="modal-title">Titolo Modale</h2>
    <p>Contenuto della modale.</p>
    <button data-modal-close>Chiudi</button>
    <button class="modal-close-btn" data-modal-close" aria-label="Chiudi">×</button>
  </div>
</div>
```

**CSS Classes:**
- `.modal-overlay` - Sfondo scuro
- `.modal-dialog` - Contenitore modale
- `.modal-close-btn` - Bottone chiusura (X)

**ARIA Attributes:**
- `role="dialog"` - Ruolo modale
- `aria-modal="true"` - Indica che è modale
- `aria-labelledby="modal-title"` - Collega a titolo
- `aria-hidden="true/false"` - Stato visibilità

**Keyboard Interaction:**
- **Esc:** Chiude la modale
- **Tab:** Intrappolato dentro la modale (focus trap)
- **Shift+Tab:** Navigazione inversa (sempre dentro modale)

**JavaScript:**
- `initModals()` - Gestisce apertura, focus trap, chiusura
- Il focus ritorna al trigger dopo chiusura

**Accessibilità:**
- ✅ Il focus si sposta sul primo elemento interattivo nella modale
- ✅ Tab è intrappolato (non esce dalla modale)
- ✅ Esc chiude sempre la modale
- ✅ Il focus torna al bottone che ha aperto la modale

---

### Cards

**Descrizione:** Card cliccabili con link semantico unico.

**Markup:**

```html
<article class="card">
  <h3 class="card-title">
    <a href="/articolo">Titolo Articolo</a>
  </h3>
  <p>Descrizione breve dell'articolo.</p>
</article>
```

**CSS Classes:**
- `.card` - Contenitore
- `.card-title` - Titolo con link

**Tecnica:**
- Un solo link nel titolo
- CSS `::after` pseudo-element sul link copre tutta la card
- L'intera card diventa cliccabile mantenendo semantica corretta

**Keyboard Interaction:**
- **Tab:** Focus sul link del titolo
- **Enter:** Segue il link

**Accessibilità:**
- ✅ Un solo link per card (migliore per screen reader)
- ✅ Heading level appropriato (`<h3>`, `<h4>` basato sul contesto)
- ✅ Hover effect su tutta la card

---

### Alerts

**Descrizione:** Messaggi di feedback per l'utente.

**Varianti:**
- Info: `.alert-info` + `role="status"`
- Success: `.alert-success` + `role="status"`
- Error: `.alert-error` + `role="alert"`
- Warning: `.alert-warning` + `role="status"`

**Markup:**

```html
<!-- Info/Success (non critico) -->
<div class="alert alert-info" role="status">
  <strong>Info:</strong> Operazione completata.
</div>

<!-- Errore (critico - interrompe) -->
<div class="alert alert-error" role="alert">
  <strong>Errore:</strong> Si è verificato un problema.
</div>
```

**ARIA Attributes:**
- `role="alert"` - Messaggio critico (errore), annunciato immediatamente
- `role="status"` - Messaggio non critico, annunciato quando conveniente
- `aria-live="polite"` - Alternativa a `role="status"`

**Accessibilità:**
- ✅ Usa `role="alert"` solo per errori critici
- ✅ Gli alert vengono annunciati automaticamente dagli screen reader
- ✅ Non abusare degli alert (solo per messaggi importanti)

---

## D. Media

### Carousel

**Descrizione:** Slider di immagini/contenuti con controlli accessibili.

**Markup:**

```html
<div class="carousel" aria-roledescription="carousel" aria-label="Descrizione carousel">
  <div class="carousel-inner">
    <div class="carousel-slide" role="group" aria-roledescription="slide" aria-label="1 di 3">
      Contenuto slide 1
    </div>
    <div class="carousel-slide" role="group" aria-roledescription="slide" aria-label="2 di 3" aria-hidden="true">
      Contenuto slide 2
    </div>
  </div>
  
  <div class="carousel-controls">
    <button data-action="prev" aria-label="Slide Precedente">◀</button>
    <button data-action="play-pause" aria-label="Play Carousel">▶</button>
    <button data-action="next" aria-label="Slide Successiva">▶</button>
  </div>
</div>
```

**CSS Classes:**
- `.carousel` - Contenitore
- `.carousel-inner` - Contenitore slide
- `.carousel-slide` - Singola slide
- `.carousel-controls` - Controlli

**ARIA Attributes:**
- `aria-roledescription="carousel"` - Descrive il widget
- `aria-label` - Descrive il carousel
- `aria-hidden="true"` - Nasconde slide non visibili agli screen reader
- `aria-label` su bottoni - Descrive l'azione

**Keyboard Interaction:**
- **Tab:** Naviga tra i controlli
- **Enter/Spazio:** Attiva il controllo

**JavaScript:**
- `initCarousels()` - Gestisce navigazione e auto-play
- Le slide nascoste hanno `aria-hidden="true"` e `tabindex="-1"`

**Accessibilità:**
- ✅ Pulsante Play/Pause obbligatorio se c'è auto-play
- ✅ Le slide non visibili sono nascoste agli screen reader
- ✅ Ogni slide ha label descrittiva (es. "1 di 3")

---

## E. Componenti W3C APG

### Combobox

**Descrizione:** Input con dropdown autocomplete.

**Pattern APG:** [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

**Markup:** Vedi `components/combobox.html`

**ARIA Attributes:**
- `role="combobox"` - Input principale
- `aria-autocomplete="list"` - Tipo di autocomplete
- `aria-expanded="true/false"` - Stato listbox
- `aria-haspopup="listbox"` - Indica che c'è un popup
- `aria-controls="listbox-id"` - Collega a listbox
- `aria-activedescendant="option-id"` - Opzione con focus virtuale

**Keyboard Interaction:**
- **↓:** Apre listbox e naviga verso il basso
- **↑:** Apre listbox e naviga verso l'alto
- **Enter:** Seleziona opzione corrente
- **Esc:** Chiude listbox
- **Tab:** Chiude listbox e va al prossimo elemento

**JavaScript:**
- `initComboboxes()` - Gestisce apertura, navigazione, selezione

---

### Disclosure

**Descrizione:** Widget mostra/nascondi contenuto.

**Pattern APG:** [Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

**Markup:** Vedi `components/disclosure.html`

**ARIA Attributes:**
- `aria-expanded="true/false"` - Stato contenuto
- `aria-controls="content-id"` - Collega bottone a contenuto

**Keyboard Interaction:**
- **Enter/Spazio:** Toggle mostra/nascondi

**JavaScript:**
- `initDisclosures()` - Gestisce toggle

**Differenza con Accordion:**
- Disclosure: Componente singolo, più semplice
- Accordion: Gruppo di disclosure, spesso con solo uno aperto alla volta

---

### Tooltip

**Descrizione:** Popup informativo che appare al hover/focus.

**Pattern APG:** [Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

**Markup:** Vedi `components/tooltip.html`

**ARIA Attributes:**
- `role="tooltip"` - Ruolo tooltip
- `aria-describedby="tooltip-id"` - Collega elemento a tooltip

**Keyboard Interaction:**
- **Tab:** Mostra tooltip al focus
- **Esc:** Nasconde tooltip

**CSS:**
- Il tooltip è nascosto di default
- Appare con `:hover` e `:focus` pseudo-selectors

**JavaScript:**
- `initTooltips()` - Gestisce Esc per chiudere

**Accessibilità:**
- ✅ Appare sia al hover che al focus
- ✅ Esc permette di nasconderlo (WCAG 1.4.13)

---

### Slider

**Descrizione:** Input range per selezionare un valore da un continuum.

**Pattern APG:** [Slider Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)

**Markup:** Vedi `components/slider.html`

**ARIA Attributes:**
- `role="slider"` - Ruolo slider
- `aria-valuenow="50"` - Valore corrente
- `aria-valuemin="0"` - Valore minimo
- `aria-valuemax="100"` - Valore massimo
- `aria-labelledby="label-id"` - Collega a label

**Keyboard Interaction:**
- **←/→** o **↓/↑:** Incrementa/decrementa di 1
- **Home/End:** Va a min/max
- **PageUp/PageDown:** Incrementa/decrementa di 10

**Mouse:**
- Drag & drop del thumb
- Click sulla track per saltare al valore

**JavaScript:**
- `initSliders()` - Gestisce mouse e tastiera, aggiorna `aria-valuenow`

---

### Listbox

**Descrizione:** Lista di opzioni selezionabili (alternativa a `<select>`).

**Pattern APG:** [Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)

**Markup:** Vedi `components/listbox.html`

**ARIA Attributes:**
- `role="listbox"` - Contenitore
- `role="option"` - Singola opzione
- `aria-selected="true/false"` - Stato selezione
- `aria-multiselectable="true/false"` - Abilita selezione multipla

**Keyboard Interaction:**
- **↓/↑:** Naviga tra le opzioni
- **Spazio:** Seleziona (toggle se multi-select)
- **Enter:** Seleziona
- **Home/End:** Prima/ultima opzione

**JavaScript:**
- `initListboxes()` - Gestisce navigazione e selezione

---

### Meter

**Descrizione:** Indicatore grafico di un valore in un range (es. spazio disco).

**Pattern APG:** [Meter Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/meter/)

**Markup:** Vedi `components/meter.html`

**ARIA Attributes:**
- `role="meter"` - Ruolo meter
- `aria-valuenow="75"` - Valore corrente
- `aria-valuemin="0"` - Valore minimo
- `aria-valuemax="100"` - Valore massimo
- `data-valuelow="33"` - Soglia bassa (data attribute, non ARIA)
- `data-valuehigh="66"` - Soglia alta (data attribute, non ARIA)

**Nota:** `aria-valuelow` e `aria-valuehigh` non sono attributi ARIA validi, usiamo data attributes invece.

**Colori:**
- Rosso: valore < `aria-valuelow` (low)
- Giallo: valore tra low e high (medium)
- Verde: valore ≥ `aria-valuehigh` (high)

**JavaScript:**
- `initMeters()` - Calcola percentuale, applica colore

**Differenza con Slider:**
- Meter: Solo visualizzazione, non interattivo
- Slider: Input, l'utente può modificare il valore

---

### Spinbutton

**Descrizione:** Input numerico con pulsanti +/-.

**Pattern APG:** [Spinbutton Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/)

**Markup:** Vedi `components/spinbutton.html`

**ARIA Attributes:**
- `role="spinbutton"` - Ruolo spinbutton
- `aria-valuenow="5"` - Valore corrente
- `aria-valuemin="0"` - Valore minimo
- `aria-valuemax="10"` - Valore massimo

**Keyboard Interaction:**
- **↑/↓:** Incrementa/decrementa
- **PageUp/PageDown:** Incrementa/decrementa di 10
- **Home/End:** Va a min/max

**JavaScript:**
- `initSpinbuttons()` - Gestisce +/-, tastiera, aggiorna valore

---

### Toolbar

**Descrizione:** Gruppo di controlli (bottoni, menu) raggruppati logicamente.

**Pattern APG:** [Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)

**Markup:** Vedi `components/toolbar.html`

**ARIA Attributes:**
- `role="toolbar"` - Contenitore
- `aria-label="Descrizione toolbar"` - Nome toolbar

**Keyboard Interaction:**
- **Tab:** Entra nella toolbar (focus sul primo controllo)
- **←/→:** Naviga tra i controlli (NON Tab!)
- **Home/End:** Primo/ultimo controllo

**JavaScript:**
- `initToolbars()` - Gestisce navigazione con frecce

---

### Table

**Descrizione:** Tabella con ordinamento per colonne.

**Pattern APG:** [Table Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/)

**Markup:** Vedi `components/table.html`

**ARIA Attributes:**
- `role="table"` - Contenitore (opzionale se `<table>`)
- `aria-sort="ascending/descending/none"` - Stato ordinamento colonna

**Keyboard Interaction:**
- **Tab:** Naviga tra gli header cliccabili
- **Enter/Spazio:** Ordina per colonna

**JavaScript:**
- `initTables()` - Gestisce ordinamento, aggiorna `aria-sort`

**Accessibilità:**
- ✅ Usa `<caption>` per descrivere la tabella
- ✅ Header ordinabili devono essere `<th>` con `aria-sort`

---

### Grid

**Descrizione:** Griglia interattiva navigabile con frecce.

**Pattern APG:** [Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)

**Markup:** Vedi `components/grid.html`

**ARIA Attributes:**
- `role="grid"` - Contenitore
- `role="row"` - Riga
- `role="gridcell"` - Cella
- `role="columnheader"` - Header colonna

**Keyboard Interaction:**
- **↑↓←→:** Naviga tra le celle
- **Home/End:** Prima/ultima cella della riga
- **Ctrl+Home/End:** Prima/ultima cella della griglia

**JavaScript:**
- `initGrids()` - Gestisce navigazione, focus su celle

**Differenza con Table:**
- Grid: Interattiva, celle modificabili/selezionabili
- Table: Statica, solo visualizzazione dati

---

### Tree View

**Descrizione:** Albero gerarchico espandibile (es. file system).

**Pattern APG:** [Tree View Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/)

**Markup:** Vedi `components/treeview.html`

**ARIA Attributes:**
- `role="tree"` - Contenitore radice
- `role="treeitem"` - Elemento dell'albero
- `aria-expanded="true/false"` - Stato espansione (se ha figli)
- `aria-selected="true/false"` - Stato selezione

**Keyboard Interaction:**
- **↓/↑:** Naviga tra gli elementi
- **→:** Espande elemento (se ha figli e non è espanso)
- **←:** Collassa elemento (se espanso)
- **Enter/Spazio:** Seleziona elemento

**JavaScript:**
- `initTreeViews()` - Gestisce espansione, navigazione, selezione

---

### Treegrid

**Descrizione:** Griglia con righe gerarchiche espandibili.

**Pattern APG:** [Treegrid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/)

**Markup:** Vedi `components/treegrid.html`

**ARIA Attributes:**
- `role="treegrid"` - Contenitore
- `role="row"` - Riga
- `role="gridcell"` - Cella
- `aria-level="1/2/3"` - Livello gerarchico
- `aria-expanded="true/false"` - Stato espansione

**Keyboard Interaction:**
- Click su pulsante espandi/collassa
- **↑↓:** Naviga tra le righe visibili

**JavaScript:**
- `initTreegrids()` - Gestisce espansione, mostra/nasconde righe figlie

---

### Feed

**Descrizione:** Lista con caricamento automatico (infinite scroll).

**Pattern APG:** [Feed Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/feed/)

**Markup:** Vedi `components/feed.html`

**ARIA Attributes:**
- `role="feed"` - Contenitore
- `role="article"` - Singolo articolo
- `aria-posinset="1"` - Posizione nell'insieme
- `aria-setsize="-1"` - Dimensione insieme (indeterminata)
- `aria-busy="false"` - Stato caricamento
- `aria-live="polite"` - Live region per nuovi contenuti

**Keyboard Interaction:**
- **PageDown/Scroll:** Carica nuovi articoli quando si avvicina al fondo

**JavaScript:**
- `initFeeds()` - Monitora scroll, carica nuovi articoli

**Accessibilità:**
- ✅ Indicatore di caricamento con `role="status"`
- ✅ Screen reader annunciano quando nuovi articoli sono caricati

---

### Window Splitter

**Descrizione:** Separatore ridimensionabile tra due pannelli.

**Pattern APG:** [Window Splitter Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/)

**Markup:** Vedi `components/splitter.html`

**ARIA Attributes:**
- `role="separator"` - Ruolo separatore
- `aria-orientation="vertical/horizontal"` - Orientamento
- `aria-valuenow="50"` - Posizione corrente (percentuale)
- `aria-valuemin="10"` - Posizione minima
- `aria-valuemax="90"` - Posizione massima

**Keyboard Interaction:**
- **←/→:** Ridimensiona (vertical splitter)
- **↑/↓:** Ridimensiona (horizontal splitter)
- **Home/End:** Va a min/max

**Mouse:**
- Drag & drop per ridimensionare

**JavaScript:**
- `initSplitters()` - Gestisce drag & drop, tastiera

---

## 🎯 Best Practices Generali

### ARIA Usage

1. **Usa HTML semantico quando possibile**
   - ✅ `<button>` invece di `<div role="button">`
   - ✅ `<nav>` invece di `<div role="navigation">`

2. **ARIA corregge, non sostituisce**
   - ARIA aggiunge semantica, ma non comportamento
   - Devi implementare il comportamento con JavaScript

3. **Testa sempre con screen reader**
   - NVDA (Windows), VoiceOver (macOS), Orca (Linux)

### Keyboard Support

1. **Tutti i componenti devono essere raggiungibili da tastiera**
   - Tab/Shift+Tab per navigazione sequenziale
   - Frecce per navigazione all'interno di widget

2. **Focus visibile sempre**
   - Usa outline chiaro (min 3px)
   - Non rimuovere mai l'outline senza alternativa

3. **Gestisci focus logicamente**
   - Ripristina focus dopo chiusura modal/menu
   - Usa focus trap quando appropriato

### Testing

Usa la checklist in `ACCESSIBILITY-TESTING.md` per ogni componente!

---

## 📞 Supporto

Per domande, issue o contributi, consulta:
- **GitHub Issues:** [Link al repository]
- **Documentazione completa:** `README.md`
- **Guide WCAG:** https://www.w3.org/WAI/WCAG21/quickref/

---

<p align="center">
  <strong>Tutti i componenti sono conformi WCAG 2.1 AA</strong>
</p>

