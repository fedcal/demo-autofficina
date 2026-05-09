import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Contatti</h1>
        <p>Siamo in via Padova 118, Milano. Chiamaci, scrivici su WhatsApp o vieni direttamente in officina.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">
        <section class="info-block">
          <h2>Dove siamo</h2>
          <address class="address-card">
            <p>
              {{ info.indirizzo.via }}<br />
              {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
              {{ info.indirizzo.regione }}
            </p>
            <a
              href="https://maps.google.com/?q={{ info.indirizzo.via }},{{ info.indirizzo.citta }}"
              target="_blank"
              rel="noopener"
              class="map-link"
            >
              Apri in Google Maps →
            </a>
          </address>

          <h2>Contatti diretti</h2>
          <ul class="contact-list">
            <li>
              <span class="contact-list__label">Telefono</span>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <span class="contact-list__label">WhatsApp</span>
              <a [href]="whatsappLink(info.contatti.whatsapp)" target="_blank" rel="noopener">
                {{ info.contatti.whatsapp }}
              </a>
            </li>
            <li>
              <span class="contact-list__label">Email</span>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h2>Orari di apertura</h2>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span class="closed">{{ info.orari.domenica }}</span></li>
          </ul>
        </section>

        <section class="info-block">
          <h2>Servizi rapidi</h2>
          <ul class="services-list">
            <li>
              <span class="svc-icon" aria-hidden="true">🚗</span>
              <div>
                <strong>Auto sostitutiva</strong>
                <p>2 vetture disponibili per lavori lunghi (gratuita sopra €200).</p>
              </div>
            </li>
            <li>
              <span class="svc-icon" aria-hidden="true">📋</span>
              <div>
                <strong>Preventivo gratuito</strong>
                <p>Nessun costo di diagnosi. Ti diciamo i costi prima di procedere.</p>
              </div>
            </li>
            <li>
              <span class="svc-icon" aria-hidden="true">💳</span>
              <div>
                <strong>Pagamenti accettati</strong>
                <p>Contanti, carta, bancomat, bonifico, Satispay. Nessun sovrapprezzo.</p>
              </div>
            </li>
            <li>
              <span class="svc-icon" aria-hidden="true">🛡️</span>
              <div>
                <strong>Garanzia 12 mesi</strong>
                <p>Su tutti i ricambi originali e equivalenti omologati montati da noi.</p>
              </div>
            </li>
          </ul>

          <div class="cta-box">
            <p>Vuoi un preventivo prima di venire? Compila il modulo online.</p>
            <a routerLink="/preventivo" class="btn btn-primary">Preventivo online</a>
          </div>
        </section>
      </div>
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
      .content {
        padding: 3rem 1rem;
      }
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 2rem 0 0.75rem;
        font-size: 1.15rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .address-card {
        font-style: normal;
        line-height: 1.7;
        color: var(--color-fg-muted);
      }
      .address-card p {
        margin: 0 0 0.5rem;
      }
      .map-link {
        font-size: 0.875rem;
        font-weight: 600;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
      }
      .contact-list li {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }
      .contact-list__label {
        font-weight: 600;
        font-size: 0.85rem;
        min-width: 80px;
        color: var(--color-fg-muted);
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .closed {
        color: var(--color-danger);
        font-weight: 600;
      }
      .services-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .services-list li {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
      }
      .svc-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
        margin-top: 2px;
      }
      .services-list strong {
        display: block;
        margin-bottom: 0.2rem;
        font-size: 0.95rem;
      }
      .services-list p {
        margin: 0;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .cta-box {
        margin-top: 2rem;
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .cta-box p {
        margin: 0;
        flex: 1;
        min-width: 180px;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .btn {
        display: inline-block;
        padding: 0.65rem 1.4rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.9rem;
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);

  readonly info$ = this.mockData.info$;

  whatsappLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }
}
