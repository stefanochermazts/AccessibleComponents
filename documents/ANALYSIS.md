# Analisi Funzionale: Ecosistema Componenti Accessibili (WCAG 2.1 AA) & Plugin WordPress

**Data:** 05 Dicembre 2025
**Obiettivo:** Creazione di una libreria di componenti UI framework-agnostic (Vanilla JS, HTML5, CSS) conforme alle WCAG 2.1 Livello AA, integrata in un Design System centralizzato e distribuita come Plugin WordPress.

---

## 1. Obiettivi e Principi Guida

1.  **Accessibilità "By Design":** Ogni componente nasce conforme alle WCAG 2.1 AA (Navigazione da tastiera, contrasto, supporto Screen Reader).
2.  **Framework Agnostic:** Logica basata su Vanilla JS (ES6+) per garantire longevità e performance, senza dipendenze (no jQuery, no React/Vue nel frontend).
3.  **Design System Centralizzato:** Layout e stile controllati globalmente tramite CSS Custom Properties (Variables).
4.  **Integrazione WordPress:** Plugin wrapper con blocchi Gutenberg nativi e pannello di gestione del tema.

---

## 2. Architettura del Design System (CSS Tokens)

Il "cervello" visivo del sistema. Queste variabili sono definite nel `:root` e possono essere sovrascritte dal pannello di amministrazione di WordPress.

### 2.1 Categorie dei Token

| Categoria | Token Esempio | Descrizione / Utilizzo |
| :--- | :--- | :--- |
| **Colori Brand** | `--c-primary`, `--c-secondary` | Colori principali del marchio. |
| **Colori Neutrali** | `--c-gray-100` ... `--c-gray-900` | Testi, bordi, sfondi secondari. |
| **Colori Semantici** | `--c-success`, `--c-error`, `--c-warning` | Feedback utente (messaggi, validazione). |
| **Tipografia** | `--font-family-base`, `--fs-md`, `--lh-base` | Famiglie font, scala dimensionale, altezza riga. |
| **Spaziatura** | `--space-4`, `--space-8`, `--space-16` | Padding e Margin (sistema a griglia morbida 4/8px). |
| **Bordi & Forme** | `--radius-sm`, `--radius-pill` | Arrotondamento degli angoli. |
| **Elevazione** | `--shadow-sm`, `--shadow-lg`, `--z-modal` | Ombre e gestione Z-Index. |
| **Focus (A11y)** | `--focus-ring-color`, `--focus-width` | **Critico:** Stile dell'outline di focus (es. 2px solid blue). |

---

## 3. Specifiche Componenti (Dettaglio Funzionale & WCAG)

Tutti i componenti devono supportare il **Progressive Enhancement**: se JS è disabilitato, il contenuto deve rimanere fruibile.

### Famiglia A: Navigazione

#### A.1 Main Navigation (Menu)
* **Struttura:** `<nav>`, `<ul>`, `<li>`, `<a>` o `<button>` (per trigger sottomenu).
* **Accessibilità:**
    * `aria-label="Menu principale"`.
    * Supporto tastiera completo (Tab + Frecce).
    * **Mobile:** Focus trap all'interno del menu quando aperto. Tasto `Esc` per chiudere.
    * Attributi: `aria-expanded`, `aria-haspopup`.

#### A.2 Breadcrumbs
* **Struttura:** `<nav aria-label="Breadcrumb">`, `<ol>`.
* **Accessibilità:**
    * L'elemento corrente deve avere `aria-current="page"` (non link).
    * Separatori visivi (`/` o `>`) generati via CSS (`::after`) o con `aria-hidden="true"`.

#### A.3 Tabs (Schede)
* **Logica:** Mostra un pannello alla volta.
* **Accessibilità:**
    * Navigazione tra le tab con **Frecce Sinistra/Destra** (non Tab).
    * `role="tablist"`, `role="tab"`, `role="tabpanel"`.
    * Attributi: `aria-selected`, `aria-controls`.

#### A.4 Skip Link
* **Logica:** Link nascosto che appare al primo focus.
* **Funzione:** Permette di saltare l'header e andare al `#main-content`.

### Famiglia B: Input & Form

#### B.1 Accessible Button
* **Tag:** Sempre `<button>` (o `<a>` con `role="button"` se necessario, ma evitare).
* **Stati:** Hover, Active, Focus, Disabled (`aria-disabled="true"` invece dell'attributo `disabled` per permettere il focus e spiegare perché è disabilitato).

#### B.2 Input Fields & Validation
* **Logica:** Associazione Label-Input rigorosa (`for` + `id`).
* **Errori:**
    * `aria-invalid="true"` in caso di errore.
    * `aria-describedby="error-id"` collega l'input al testo dell'errore.

#### B.3 Custom Checkbox/Radio/Switch
* **Tecnica:** Input nativo nascosto visivamente (`.visually-hidden`) ma presente nel DOM.
* **Stile:** Applicato su `label::before` o elemento adiacente.
* **Focus:** Il focus ring deve apparire sull'elemento stilizzato quando l'input nascosto riceve focus.

### Famiglia C: Contenuto & Feedback

#### C.1 Accordion
* **Struttura:** `<h3><button>Titolo</button></h3>` + `<div>Contenuto</div>`.
* **Accessibilità:**
    * `aria-expanded="true/false"`.
    * `aria-controls="content-id"`.

#### C.2 Modal (Dialog)
* **Criticità:** Gestione del Focus.
* **Comportamento:**
    1.  Apertura: Il focus si sposta sul primo elemento interattivo nella modale.
    2.  Navigazione: Il tasto Tab è intrappolato nella modale (**Focus Trap**).
    3.  Chiusura: `Esc`, Click overlay, Click "Chiudi".
    4.  **Restore:** Il focus torna al bottone che ha aperto la modale.
* **Ruoli:** `role="dialog"`, `aria-modal="true"`.

#### C.3 Cards
* **Problema:** "Card cliccabile".
* **Soluzione:** Un solo link nel titolo. Estensione dell'area cliccabile tramite CSS (`::after` su link che copre la card) o JS event delegation.
* **Gerarchia:** Assicurare che i titoli interni alla card rispettino la gerarchia della pagina (es. `h3` o `h4`).

#### C.4 Alerts (Notifiche)
* **Ruoli:** `role="alert"` (errori critici), `role="status"` (info).
* **Live Regions:** Uso di `aria-live="polite"` per messaggi che appaiono dinamicamente.

### Famiglia D: Media Avanzati

#### D.1 Carousel (Slider)
* **Requisiti:**
    * Pulsante **Pause/Play** obbligatorio per auto-play.
    * Pulsanti Prev/Next accessibili.
    * Nascondere le slide non attive (`aria-hidden="true"`, `tabindex="-1"`).

---

## 4. Architettura Plugin WordPress

Il plugin funge da ponte tra il Design System e l'editor Gutenberg.

### 4.1 Struttura File Plugin
```text
/my-a11y-system
  /assets
    /css
      tokens.css       (Variabili CSS base)
      components.css   (Stili layout componenti)
    /js
      main.js          (Logica Vanilla JS: Accordion, Modal, etc.)
  /inc
    admin-settings.php (Pagina opzioni per modificare i Tokens)
    blocks-register.php (Registrazione blocchi Gutenberg)
  /blocks              (Cartelle per singoli blocchi React/Gutenberg)
  my-a11y-system.php   (Main file)