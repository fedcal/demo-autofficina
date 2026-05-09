import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { Servizio } from '../../data/types';

interface CategoriaView {
  id: string;
  nome: string;
  servizi: Servizio[];
}

@Component({
  selector: 'app-servizi',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri servizi</h1>
        <p>15 interventi di meccanica, carrozzeria ed elettronica — preventivo sempre gratuito.</p>
      </div>
    </section>

    <article class="demo-container" *ngIf="categorie$ | async as categorie">
      <section *ngFor="let cat of categorie" class="categoria-section" [id]="cat.id">
        <h2>{{ cat.nome }}</h2>
        <ul class="servizi-list">
          <li *ngFor="let s of cat.servizi" class="servizio-item">
            <div class="servizio-item__head">
              <h3>{{ s.nome }}</h3>
              <span class="servizio-item__price">
                {{ s.prezzoMin | currency: 'EUR':'symbol':'1.0-0' }} –
                {{ s.prezzoMax | currency: 'EUR':'symbol':'1.0-0' }}
              </span>
            </div>
            <p class="servizio-item__desc">{{ s.descrizione }}</p>
            <div class="servizio-item__meta">
              <span class="badge badge--durata">Tempo medio: {{ s.durataMedio }}</span>
              <span *ngIf="s.garanzia" class="badge badge--garanzia">Garanzia 12 mesi</span>
              <span *ngIf="s.popolare" class="badge badge--popolare">Molto richiesto</span>
            </div>
          </li>
        </ul>
      </section>

      <div class="cta-row">
        <p>Hai bisogno di un intervento non in lista? Contattaci per un preventivo personalizzato.</p>
        <a routerLink="/preventivo" class="btn btn-primary">Richiedi preventivo</a>
      </div>

      <p class="disclaimer">
        I prezzi indicati sono orientativi e variano in base alla marca, al modello e al tipo di ricambio scelto
        (originale / equivalente omologato). Il costo definitivo è comunicato prima di ogni intervento.
      </p>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .categoria-section {
        padding: 3rem 1rem 1.5rem;
      }
      .categoria-section h2 {
        font-size: 1.4rem;
        margin: 0 0 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .servizi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.25rem;
      }
      .servizio-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .servizio-item__head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 0.5rem;
      }
      .servizio-item__head h3 {
        margin: 0;
        font-size: 1rem;
      }
      .servizio-item__price {
        color: var(--color-accent);
        font-weight: 700;
        flex-shrink: 0;
        font-size: 0.9rem;
      }
      .servizio-item__desc {
        color: var(--color-fg-muted);
        font-size: 0.875rem;
        margin: 0 0 0.75rem;
        line-height: 1.45;
      }
      .servizio-item__meta {
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
      .badge--popolare {
        background: #fff8c5;
        color: var(--color-warning);
      }
      .cta-row {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        flex-wrap: wrap;
        padding: 2rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        margin: 2rem 1rem;
      }
      .cta-row p {
        margin: 0;
        flex: 1;
        min-width: 200px;
        color: var(--color-fg-muted);
      }
      .btn {
        display: inline-block;
        padding: 0.65rem 1.4rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        transition: background 0.15s ease;
        flex-shrink: 0;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #334155;
      }
      .disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        text-align: center;
        margin: 1rem 1rem 3rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiziComponent {
  private readonly mockData = inject(MockDataService);

  readonly categorie$ = this.mockData.servizi$.pipe(
    map((data) =>
      data.categorie
        .slice()
        .sort((a, b) => a.ordine - b.ordine)
        .map((cat): CategoriaView => ({
          id: cat.id,
          nome: cat.nome,
          servizi: data.servizi.filter((s) => s.categoria === cat.id)
        }))
    )
  );
}
