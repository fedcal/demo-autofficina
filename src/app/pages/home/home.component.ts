import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>Meccanica multimarca + carrozzeria a Milano</h1>
        <p class="hero-tagline">
          Officina Rossi &amp; C. — Via Padova 118, Milano. Dal 2003 al tuo fianco per tagliando,
          freni, gomme, OBD2, revisione e carrozzeria. Preventivo sempre gratuito.
        </p>
        <div class="hero-actions">
          <a routerLink="/preventivo" class="btn btn-primary">Richiedi preventivo</a>
          <a routerLink="/servizi" class="btn btn-secondary">Tutti i servizi</a>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="demo-container">
        <ul class="stats-grid">
          <li>
            <span class="stat-value">20+</span>
            <span class="stat-label">anni di attività</span>
          </li>
          <li>
            <span class="stat-value">15</span>
            <span class="stat-label">servizi disponibili</span>
          </li>
          <li>
            <span class="stat-value">12 mesi</span>
            <span class="stat-label">garanzia ricambi</span>
          </li>
          <li>
            <span class="stat-value">2</span>
            <span class="stat-label">auto sostitutive</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Officina Rossi</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🛠️</span>
          <h3>Meccanica multimarca</h3>
          <p>Interveniamo su tutte le marche e modelli: benzina, diesel, GPL, metano e ibrido.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🔍</span>
          <h3>Diagnosi OBD2</h3>
          <p>Strumentazione professionale su tutte le centraline con report PDF completo.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🎨</span>
          <h3>Carrozzeria in loco</h3>
          <p>Verniciatura a isola, PDR ammaccature, gestione pratiche assicurative.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">✅</span>
          <h3>Preventivo gratuito</h3>
          <p>Nessun costo di diagnosi: ti diciamo cosa serve prima di procedere.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="serviziPopolare$ | async as servizi">
      <div class="section-header">
        <h2>Servizi più richiesti</h2>
        <a routerLink="/servizi" class="link-more">Tutti i 15 servizi →</a>
      </div>
      <ul class="servizi-grid">
        <li *ngFor="let s of servizi" class="servizio-card">
          <div class="servizio-card__head">
            <h3>{{ s.nome }}</h3>
            <span class="servizio-card__price">da {{ s.prezzoMin | currency: 'EUR':'symbol':'1.0-0' }}</span>
          </div>
          <p class="servizio-card__desc">{{ s.descrizione }}</p>
          <div class="servizio-card__meta">
            <span class="badge badge--durata">{{ s.durataMedio }}</span>
            <span *ngIf="s.garanzia" class="badge badge--garanzia">Garanzia 12m</span>
          </div>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Prenota un intervento o richiedi un preventivo</h2>
        <p>Rispondiamo entro 2 ore in orario lavorativo. Lun–Ven 08:00–18:30 · Sab 08:00–12:30.</p>
        <div class="hero-actions">
          <a routerLink="/preventivo" class="btn btn-primary">Preventivo online</a>
          <a href="tel:+390255557890" class="btn btn-secondary">Chiama ora</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #f1f5f9 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.2rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.1rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 620px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
        cursor: pointer;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #334155;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .stats {
        background: var(--color-accent);
        color: #ffffff;
        padding: 2.5rem 1rem;
      }
      .stats-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 1.5rem;
        text-align: center;
      }
      .stat-value {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: #ffffff;
      }
      .stat-label {
        display: block;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.75);
        margin-top: 0.25rem;
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .servizi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
      }
      .servizio-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .servizio-card__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.5rem;
        gap: 0.5rem;
      }
      .servizio-card__head h3 {
        margin: 0;
        font-size: 1rem;
      }
      .servizio-card__price {
        color: var(--color-accent);
        font-weight: 700;
        font-size: 0.95rem;
        flex-shrink: 0;
      }
      .servizio-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.875rem;
        margin: 0 0 0.75rem;
        line-height: 1.4;
      }
      .servizio-card__meta {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
      }
      .badge {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .badge--durata {
        background: #e2e8f0;
        color: #475569;
      }
      .badge--garanzia {
        background: #dafbe1;
        color: var(--color-success);
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.8);
        margin: 0 0 2rem;
      }
      .cta-band .btn-secondary {
        background: transparent;
        color: #ffffff;
        border-color: rgba(255, 255, 255, 0.35);
      }
      .cta-band .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly serviziPopolare$ = this.mockData.servizi$.pipe(
    map((data) => data.servizi.filter((s) => s.popolare).slice(0, 3))
  );
}
