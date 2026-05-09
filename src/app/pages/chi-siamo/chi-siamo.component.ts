import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Oltre 20 anni di esperienza in meccanica multimarca e carrozzeria nel cuore di Milano est.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>Officina Rossi &amp; C. dal 2003</h2>
        <p>
          Marco Rossi apre l'officina nel 2003 in via Padova dopo cinque anni da meccanico ufficiale Fiat e
          una formazione avanzata Bosch. L'idea è semplice: portare la qualità del concessionario a prezzi
          onesti, con un rapporto diretto tra cliente e meccanico. Nessun intermediario, nessuna sorpresa in
          fattura.
        </p>
        <p>
          Negli anni il team cresce: arriva Luca con la sua specializzazione su trasmissioni e ibridi,
          Sofia porta la competenza in carrozzeria e verniciatura — gestendo anche le pratiche
          assicurative — e Ahmed completa la squadra come specialista pneumatici e geometria ruote. Quattro
          persone, quattro competenze, un solo obiettivo: restituire la tua auto in perfetto stato.
        </p>
      </section>

      <section class="values">
        <h2>I nostri impegni</h2>
        <ul class="values-grid">
          <li>
            <h3>Trasparenza</h3>
            <p>Preventivo prima di ogni intervento. Nessun lavoro aggiuntivo senza la tua approvazione.</p>
          </li>
          <li>
            <h3>Garanzia</h3>
            <p>12 mesi su tutti i ricambi originali o equivalenti omologati montati da noi.</p>
          </li>
          <li>
            <h3>Rapidità</h3>
            <p>Interventi ordinari entro la giornata. Auto sostitutiva disponibile per lavori lunghi.</p>
          </li>
          <li>
            <h3>Multimarca</h3>
            <p>Qualsiasi marchio, qualsiasi alimentazione. Non sei vincolato al concessionario ufficiale.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as team">
        <h2>Il team</h2>
        <ul class="team-grid">
          <li *ngFor="let m of team.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="faq-section" *ngIf="faq$ | async as data">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let item of data.faq" class="faq-item">
            <h3>{{ item.domanda }}</h3>
            <p>{{ item.risposta }}</p>
          </li>
        </ul>
      </section>
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
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border-left: 3px solid var(--color-accent);
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
      }
      .team-card__role {
        margin: 0 0 0.75rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.875rem;
      }
      .team-card__bio {
        font-size: 0.875rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
        line-height: 1.5;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.7rem;
        background: var(--color-bg-subtle);
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
      }
      .faq-section {
        margin-bottom: 4rem;
      }
      .faq-section h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 720px;
        margin-left: auto;
        margin-right: auto;
      }
      .faq-item {
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .faq-item h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: var(--color-fg-default);
      }
      .faq-item p {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.55;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly faq$ = this.mockData.faq$;
}
