# Autofficina / Carrozzeria — Tier Features & Pricing 2026

## Panoramica

Sito professionale + prenotazione online + gestione preventivi per officine e carrozzerie. Mercato: ~35k officine + ~8k carrozzerie. Pain: prenotazioni telefoniche, preventivi manuali, OBD2 non integrato, inventory caotico.

---

## Tier Base — €500–800 (75 ore)

**Per chi**: Officina 1-2 meccanici, primo sito digitale.

### Incluso
- Home hero + foto salone/bancone lavoro + flotta servita (auto marche specializzate)
- Servizi listati: tagliando, freni, batteria, gomme, diagnosi, carrozzeria
- Listino prezzi standard: cambio olio €40, filtri €25, pastiglie freni €80, batteria €120 (ogni servizio taggato)
- Meccanici: foto, certificazioni (ASE, MG, etc), specializzazioni (benzina/diesel/ibridi)
- Orari apertura + Maps embed + recapiti (phone, WhatsApp, email)
- Schema JSON-LD: AutoRepair + LocalBusiness
- Contact form prenotazione manuale
- SEO base

### NON incluso
- Prenotazione online
- Preventivatore
- OBD2 integration
- Inventory tracking
- Analytics

### Manutenzione
**€50/mese**: foto, listino prezzi, backup.

### Add-on
- Foto salone professionali (€350 shooting)
- Certificazioni digitali meccanici (€150 setup)
- Listino espanso (€200 categoria)

---

## Tier Intermedio — €1.500–2.200 (240 ore)

**Per chi**: Officina 3-5 meccanici, clientela base gestione moderna.

### Incluso (Base + )
- Prenotazione online
  - Slot 1h prenotabili online (calendario occupazione realtime)
  - Blocchi specifici servizio (es. "diagnosi computer" 2h slot)
  - SMS + Email conferma automatica
  - Reminder SMS 48h e 24h prima appuntamento
  - Cliente vede storico riparazioni passate
- Google Calendar sync bidirezionale
  - Prenota online → Google Calendar ufficiale sincronizza
  - Blocchi privati (pausa pranzo, manutenzione attrezzature) invisibili online
  - Multi-meccanico scheduling (es. collaudo=2 persone)
- Preventivatore semi-automatico
  - Form: seleziona intervento (freni) → sistema copia listino prezzi
  - Aggiungi ricambi manuali (es. "pastiglie Bosch €80")
  - Sistema calcola: ricambi + ore manodopera (tariffario €45/h) + totale
  - Export PDF preventivo cliente firmabile
  - Cliente accetta → auto-prenota slot appuntamento
- Memo auto cliente
  - Scheda auto: targa, km, marca/modello/anno, colore
  - Storico riparazioni precedenti (data, tipo intervento, costo)
  - Note importanti ("cliente vuole solo ricambi OEM", "sensibile prezzo")
  - Ricerca rapida "tutte le auto Fiat cliente Giovanni"
- Upload foto pre-ricezione
  - Cliente carica foto danni (es. paraurti ammaccato) prima appuntamento
  - Meccanico vede foto, prepara preventivo più accurato
  - Timeline foto: prima/dopo intervento
- SMS/WhatsApp progresso auto
  - "Auto arrivata, stiamo iniziando diagnosi"
  - "Ricambi ordinati, installazione domani 15:00"
  - "Auto pronta, puoi venire ore 16-18 oppure domani 9-13"
  - Link conferma ritiro (SMS)
- Pagamenti Stripe
  - Prenota + pagamenti deposito online (es. €50 su €200 preventivo)
  - Saldo alla ricezione auto
  - Ricevute PDF email
  - Finanziamento ricambi costosi (es. batteria €300 → 3 rate)
- Fatturazione auto-generata
  - Preventivo accettato → fattura automatica (dati cliente + lista ricambi + ore)
  - Integrazione PEC trasmissione fatture clienti PMI
  - Storico fatture per aziende (IVA ricalc)
- Storico riparazioni dettagliato
  - Per auto: data, servizio, costo, meccanico
  - Per cliente: somma spese anno, trend (più/meno visite)
  - Export PDF storico per assicurazione cliente
- SEO avanzato (LocalBusiness Service schema)

### NON incluso
- OBD2 diagnostic uploader
- AI mechanic advisor
- Parts compatibility database
- Advanced analytics
- Magazzino ricambi tracking

### Manutenzione
**€100/mese**: gestione booking, preventivi, PDF generation.

### Add-on
- OBD2 scanner integration (vedi Tier Avanzato)
- SMS reminder premium (€30/mese + €0.04/SMS)
- Traduzioni (€150 lingua)
- Video diagnosi condivisa (€250 setup)

---

## Tier Avanzato — €4.000–6.000 (520 ore)

**Per chi**: Officina rete multi-sedi, diagnosi avanzate, operazioni fleet aziendali.

### Incluso (Base + Intermedio + )
- OBD2 Diagnostic Uploader
  - Cliente carica foto display OBD2 (es. "P0420 Catalyst System")
  - AI vision (LLaVA) legge codici errori da foto display
  - Associazione automatica a lista ricambi probabile (es. P0420 → oxygen sensor)
  - Meccanico approva diagnosi, genera preventivo
  - Integrazione scanner portatile Bluetooth (upload diretta foto)
  - Database storico codici errori → pattern diagnostico
  - Modello llava:7b on-prem VPS (privacy, zero cloud)
- AI Mechanic Advisor RAG (Ollama local)
  - Q&A "P0420 quale parte cambiare?", "freni squillano, controllo?"
  - Context sorgenti: forum automotive, manuali Bosch/OEM, archivio riparazioni storico
  - Modello llama3.1:8b (training su 500+ riparazioni officina)
  - Suggerimenti prevenzione: "batteria 4 anni, prossimo controllo primavera"
- Parts Compatibility Checker
  - VIN auto cliente → auto-estrae modello esatto
  - Filtri ricambi: "quali batterie vanno su Fiat 500X 2019?"
  - OEM parte numbers auto-lookup
  - Cross-compatibility check (quale ricambio universale conviene?)
  - Integrazione supplier API (stock reale ricambi)
- Dashboard KPI avanzata
  - Job completion rate (quanti lavori finiti in tempo)
  - Cost per job medio (ricambi/manodopera)
  - Productivity meccanico (auto processate/settimana, fatturato/persona)
  - Vehicle type breakdown (quante riparazioni frenatura, sospensioni, etc)
  - Profit margin per categoria intervento (carrozzeria vs motore)
  - Forecasting revenue prossime 4 settimane
- Magazzino ricambi smart
  - Inventario digitale (ricambi in stock, costo, supplier, stock minimo)
  - Auto-alert "batterie sotto soglia, ordinare 5 unità"
  - Ricerca rapida ricambi (filtri marca/modello)
  - Integrazione e-shop (clienti privati comprano ricambi ritiro store)
  - Storico movimenti (quando ordinato, da chi, costo)
- Firma digitale preventivi
  - Cliente firma digitalmente preventivo su tablet (senza carta)
  - Archivio automatico (compliance 10 anni)
  - Consent tracciato (cliente ha firmato [data/ora])
- QR Tracking ordini
  - QR sulla macchina/bancone → cliente scansiona → vede progresso lavoro
  - Timeline foto (auto arrivata, iniziato lavoro, collaudo, pronta)
  - Stima orario ritiro aggiornata real-time
- Scheda tecnica VIN auto-extract
  - Cliente inserisce VIN → sistema estrae:
    - Modello esatto, anno, cilindrata, tipo motore
    - Capacità serbatoio, filtri compatibili, batteria OEM
    - Manutenzione consigliata (revisione motore a 60k km, etc)
  - Export PDF scheda tecnica cliente
  - Integrazione Bosch TechInfo (se abbonati)
- Backup geo-redundato

### NON incluso
- Custom ML modelli riparazioni (research esterno)
- POS incasso integrato (terzo sistema)
- Gestionale completo fleet aziendali (ERP)

### Manutenzione
**€200/mese**: AI training, VIN parser updates, parts DB sync.

### Add-on
- AI training storico riparazioni (€1.200 una tantum)
- Branded mobile app (€1.800 setup)
- Advanced DTC marketing (€150/mese)
- Fleet management premium (€200/mese)

---

## Confronto Tier

| Feature | Base | Intermedio | Avanzato |
|---------|------|-----------|----------|
| Servizi showcase | ✓ | ✓ | ✓ |
| Listino prezzi | ✓ | ✓ | ✓ |
| Meccanici team | ✓ | ✓ | ✓ |
| Prenotazione online | – | ✓ | ✓ |
| Google Calendar sync | – | ✓ | ✓ |
| Preventivatore | – | ✓ | ✓ |
| Memo auto cliente | – | ✓ | ✓ |
| Upload foto | – | ✓ | ✓ |
| SMS/WhatsApp progress | – | ✓ | ✓ |
| Pagamenti online | – | ✓ | ✓ |
| Fatturazione auto | – | ✓ | ✓ |
| OBD2 uploader | – | – | ✓ |
| AI mechanic advisor | – | – | ✓ |
| Parts compatibility | – | – | ✓ |
| Analytics KPI | – | – | ✓ |
| Magazzino smart | – | – | ✓ |
| Firma digitale | – | – | ✓ |
| QR tracking | – | – | ✓ |
| VIN auto-extract | – | – | ✓ |
| Manutenzione/mese | €50 | €100 | €200 |

---

## Implementation Timeline

- **Base**: 2-3 settimane
- **Intermedio**: 4-5 settimane (booking, preventivatore, SMS)
- **Avanzato**: 10-12 settimane (OBD2 vision, AI, VIN parser, magazzino)

## Success Metrics

- Tier Base: local search visibility +25%
- Tier Intermedio: 40%+ booking online, customer lifetime value +30%
- Tier Avanzato: diagnostic efficiency +50%, inventory shrinkage -20%, preventivo accuracy 95%+
