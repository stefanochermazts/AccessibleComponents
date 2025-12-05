# Guida ai Test di Accessibilità

## Indice
1. [Test Automatici](#test-automatici)
2. [Test Manuali da Tastiera](#test-manuali-da-tastiera)
3. [Test con Screen Reader](#test-con-screen-reader)
4. [Checklist per Componente](#checklist-per-componente)

---

## Test Automatici

### Strumenti Consigliati

#### 1. axe DevTools (Browser Extension)
- **Chrome/Edge:** [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
- **Firefox:** [axe DevTools](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)

**Come usare:**
1. Apri `index.html` nel browser
2. Apri DevTools (F12)
3. Vai alla tab "axe DevTools"
4. Clicca "Scan ALL of my page"
5. Verifica che non ci siano violazioni "Critical" o "Serious"

#### 2. WAVE (Web Accessibility Evaluation Tool)
- URL: https://wave.webaim.org/
- Extension: [WAVE Browser Extension](https://wave.webaim.org/extension/)

#### 3. Lighthouse (Chrome DevTools)
```bash
# Da terminale
npm install -g lighthouse
lighthouse http://localhost:8000/index.html --only-categories=accessibility --view
```

### Script di Test Automatico

Crea un file `test-accessibility.html`:

```html
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <title>Accessibility Test Runner</title>
  <script src="https://cdn.jsdelivr.net/npm/axe-core@4.7.0/axe.min.js"></script>
</head>
<body>
  <h1>Test di Accessibilità</h1>
  <div id="results"></div>
  
  <script>
    axe.run().then(results => {
      const resultsDiv = document.getElementById('results');
      
      if (results.violations.length === 0) {
        resultsDiv.innerHTML = '<h2 style="color: green;">✅ Nessuna violazione trovata!</h2>';
      } else {
        let html = '<h2 style="color: red;">❌ Violazioni trovate:</h2><ul>';
        results.violations.forEach(violation => {
          html += `<li><strong>${violation.id}:</strong> ${violation.description} 
                   (Impact: ${violation.impact}, Nodes: ${violation.nodes.length})</li>`;
        });
        html += '</ul>';
        resultsDiv.innerHTML = html;
      }
      
      console.log('Risultati completi axe:', results);
    }).catch(err => {
      console.error('Errore durante il test:', err);
    });
  </script>
</body>
</html>
```

---

## Test Manuali da Tastiera

### Requisiti Base per TUTTI i Componenti

- [ ] **Tab**: Raggiungere tutti gli elementi interattivi
- [ ] **Shift+Tab**: Navigazione inversa
- [ ] **Enter/Spazio**: Attivare pulsanti e controlli
- [ ] **Esc**: Chiudere popup, modal, dropdown
- [ ] **Focus visibile**: Outline chiaro su tutti gli elementi con focus

### Test per Componente

#### A. Navigazione

##### **Breadcrumbs**
- [ ] Tab naviga attraverso i link
- [ ] Enter attiva i link
- [ ] Focus visibile su ogni elemento

##### **Tabs**
- [ ] ← / → naviga tra le tab (NON Tab)
- [ ] Home/End va alla prima/ultima tab
- [ ] Enter/Spazio attiva la tab
- [ ] Il pannello corrispondente viene mostrato

##### **Menu Mobile**
- [ ] Bottone menu è raggiungibile da tastiera
- [ ] Enter/Spazio apre il menu
- [ ] Esc chiude il menu
- [ ] Focus ritorna al bottone dopo chiusura

---

#### B. Form & Input

##### **Buttons**
- [ ] Tab raggiunge i bottoni
- [ ] Enter/Spazio attiva il bottone
- [ ] Bottoni disabilitati non ricevono focus (se `disabled`) o lo ricevono ma non sono attivabili (se `aria-disabled`)

##### **Input Fields**
- [ ] Label associata correttamente (clicca label → focus su input)
- [ ] Input con errore ha `aria-invalid="true"`
- [ ] Messaggio di errore è associato via `aria-describedby`

##### **Checkbox/Radio Custom**
- [ ] Tab raggiunge il controllo
- [ ] Spazio attiva/disattiva
- [ ] Focus ring visibile sull'indicatore custom
- [ ] Screen reader annuncia stato checked/unchecked

---

#### C. Contenuto & Feedback

##### **Accordion**
- [ ] Tab raggiunge i bottoni header
- [ ] Enter/Spazio espande/collassa
- [ ] `aria-expanded` aggiornato correttamente
- [ ] Contenuto collassato ha `hidden` attribute

##### **Modal**
- [ ] Apre con Enter/Spazio sul trigger
- [ ] Focus si sposta sul primo elemento nella modale
- [ ] Tab è intrappolato dentro la modale (non esce)
- [ ] Esc chiude la modale
- [ ] Focus ritorna al trigger dopo chiusura

##### **Alerts**
- [ ] Alert con `role="alert"` vengono annunciate automaticamente
- [ ] Status con `role="status"` vengono annunciate in modo "polite"

---

#### D. Media

##### **Carousel**
- [ ] Pulsanti Prev/Next raggiungibili da tastiera
- [ ] Pulsante Play/Pause presente e funzionante
- [ ] Slide non visibili hanno `aria-hidden="true"`
- [ ] Focus non entra nelle slide nascoste

---

#### E. Componenti APG

##### **Combobox**
- [ ] Input è raggiungibile da tastiera
- [ ] ↓ apre la listbox
- [ ] ↑/↓ naviga tra le opzioni
- [ ] Enter seleziona l'opzione
- [ ] Esc chiude la listbox
- [ ] `aria-activedescendant` aggiornato durante navigazione

##### **Disclosure**
- [ ] Bottone raggiungibile da tastiera
- [ ] Enter/Spazio espande/collassa
- [ ] `aria-expanded` aggiornato
- [ ] Icona ruota per indicare stato

##### **Tooltip**
- [ ] Appare al focus (non solo hover)
- [ ] Esc nasconde il tooltip
- [ ] `aria-describedby` collega elemento e tooltip

##### **Slider**
- [ ] Slider riceve focus
- [ ] ←/→ o ↓/↑ regolano il valore
- [ ] Home/End vanno a min/max
- [ ] PageUp/PageDown fanno salti grandi
- [ ] `aria-valuenow` aggiornato in tempo reale

##### **Listbox**
- [ ] Listbox riceve focus
- [ ] ↓/↑ naviga tra le opzioni
- [ ] Spazio/Enter seleziona
- [ ] Home/End va a prima/ultima opzione
- [ ] Multi-select: Spazio toglie/aggiunge selezione

##### **Meter**
- [ ] `role="meter"` presente
- [ ] `aria-valuenow`, `aria-valuemin`, `aria-valuemax` definiti
- [ ] Colore cambia in base a soglie (low/medium/high)

##### **Spinbutton**
- [ ] Focus sul valore centrale
- [ ] ↑/↓ incrementa/decrementa
- [ ] PageUp/PageDown per salti grandi
- [ ] Home/End per min/max
- [ ] Pulsanti +/- funzionano con Enter/Spazio

##### **Toolbar**
- [ ] Tab entra nella toolbar
- [ ] ←/→ naviga tra i controlli (NON Tab)
- [ ] Home/End va al primo/ultimo controllo
- [ ] Enter/Spazio attiva il controllo corrente

##### **Table (Sortable)**
- [ ] Header sono raggiungibili da tastiera
- [ ] Enter/Spazio ordina la colonna
- [ ] `aria-sort` aggiornato (ascending/descending/none)
- [ ] Righe vengono riordinate visualmente

##### **Grid**
- [ ] Grid riceve focus
- [ ] Frecce (↑↓←→) navigano tra le celle
- [ ] Home/End vanno a prima/ultima cella della riga
- [ ] Ctrl+Home/End vanno a prima/ultima cella della griglia

##### **Tree View**
- [ ] Primo treeitem riceve focus
- [ ] ↓/↑ naviga tra gli elementi
- [ ] → espande elemento (se ha figli)
- [ ] ← collassa elemento (se espanso)
- [ ] Enter/Spazio seleziona l'elemento
- [ ] `aria-expanded` aggiornato

##### **Treegrid**
- [ ] Pulsanti espandi/collassa raggiungibili
- [ ] Click o Enter/Spazio espande/collassa
- [ ] Righe figlie vengono mostrate/nascoste
- [ ] `aria-level` indica la profondità

##### **Feed**
- [ ] Feed è scrollabile da tastiera (focus + frecce)
- [ ] Articoli ricevono focus (tabindex="0")
- [ ] Nuovi articoli caricati automaticamente allo scroll
- [ ] Loading indicator ha `role="status"` e `aria-live="polite"`

##### **Window Splitter**
- [ ] Splitter riceve focus
- [ ] ←/→ ridimensiona i pannelli
- [ ] Home/End va a dimensione min/max
- [ ] `aria-valuenow` aggiornato durante ridimensionamento

---

## Test con Screen Reader

### Screen Reader Consigliati

- **Windows:** NVDA (gratuito) - https://www.nvaccess.org/
- **Windows:** JAWS (commerciale)
- **macOS:** VoiceOver (integrato) - Cmd+F5
- **Linux:** Orca (gratuito)

### Comandi Base NVDA (Windows)

- **Avvia/Ferma:** Insert + Q
- **Leggi tutto:** Insert + ↓
- **Elemento successivo:** ↓
- **Elemento precedente:** ↑
- **Prossimo heading:** H
- **Prossimo link:** K
- **Prossimo bottone:** B
- **Prossimo form field:** F
- **Elenco elementi:** Insert + F7

### Comandi Base VoiceOver (macOS)

- **Avvia/Ferma:** Cmd + F5
- **Leggi tutto:** VO + A (VO = Ctrl+Option)
- **Elemento successivo:** VO + →
- **Elemento precedente:** VO + ←
- **Web Rotor:** VO + U

### Checklist Screen Reader

Per OGNI componente:

- [ ] Il ruolo viene annunciato correttamente (es. "button", "combobox", "slider")
- [ ] Il nome/label è chiaro e descrittivo
- [ ] Lo stato è annunciato (es. "expanded", "collapsed", "checked")
- [ ] I valori sono annunciati (es. "50 out of 100" per slider)
- [ ] Le modifiche dinamiche sono comunicate (live regions)
- [ ] Elementi decorativi sono nascosti (`aria-hidden="true"`)
- [ ] I landmark (navigation, main, etc.) sono presenti

---

## Checklist Rapida WCAG 2.1 AA

### Perceivable (Percepibile)

- [ ] **1.4.3 Contrast (Minimum):** Contrasto minimo 4.5:1 per testo normale, 3:1 per testo grande
- [ ] **1.4.11 Non-text Contrast:** Contrasto 3:1 per elementi UI e grafici
- [ ] **1.4.13 Content on Hover or Focus:** Tooltip dismissable con Esc

### Operable (Operabile)

- [ ] **2.1.1 Keyboard:** Tutte le funzioni accessibili da tastiera
- [ ] **2.1.2 No Keyboard Trap:** Nessuna trappola da tastiera (eccetto modal con Esc)
- [ ] **2.4.3 Focus Order:** Ordine di focus logico
- [ ] **2.4.7 Focus Visible:** Indicatore di focus sempre visibile

### Understandable (Comprensibile)

- [ ] **3.2.1 On Focus:** Il focus non causa cambiamenti di contesto inaspettati
- [ ] **3.2.2 On Input:** L'input non causa cambiamenti di contesto inaspettati
- [ ] **3.3.1 Error Identification:** Gli errori sono identificati e descritti
- [ ] **3.3.2 Labels or Instructions:** Label e istruzioni presenti per input

### Robust (Robusto)

- [ ] **4.1.2 Name, Role, Value:** Tutti i controlli hanno nome, ruolo e valore appropriati
- [ ] **4.1.3 Status Messages:** I messaggi di stato sono comunicati agli screen reader

---

## Risultati Attesi

### ✅ Test Superati

Tutti i componenti dovrebbero:
- ✅ Passare axe-core senza violazioni "Critical" o "Serious"
- ✅ Essere completamente navigabili da tastiera
- ✅ Avere indicatori di focus chiari e visibili
- ✅ Essere annunciati correttamente dagli screen reader
- ✅ Rispettare il contrasto WCAG AA (4.5:1)

### Report di Test

Dopo aver eseguito i test, documentare:
1. **Strumento usato:** (es. axe DevTools, NVDA)
2. **Browser:** (es. Chrome 120, Firefox 121)
3. **Data:** 
4. **Risultati:** Numero di violazioni trovate (se presenti)
5. **Note:** Eventuali problemi da risolvere

---

## Risorse Aggiuntive

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Keyboard Testing](https://webaim.org/articles/keyboard/)
- [Deque University](https://dequeuniversity.com/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

