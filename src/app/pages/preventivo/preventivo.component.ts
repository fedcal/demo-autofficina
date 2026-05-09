import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const MARCHE_AUTO: string[] = [
  'Alfa Romeo', 'Audi', 'BMW', 'Citroën', 'Dacia', 'Fiat', 'Ford',
  'Honda', 'Hyundai', 'Jeep', 'Kia', 'Lancia', 'Mazda', 'Mercedes-Benz',
  'Mitsubishi', 'Nissan', 'Opel', 'Peugeot', 'Renault', 'Seat', 'Skoda',
  'Suzuki', 'Toyota', 'Volkswagen', 'Volvo', 'Altro'
];

const INTERVENTI: string[] = [
  'Tagliando (cambio olio + filtri)',
  'Freni (pastiglie / dischi)',
  'Pneumatici (montaggio / sostituzione)',
  'Revisione ministeriale',
  'Diagnosi OBD2',
  'Climatizzatore (ricarica / riparazione)',
  'Cinghia di distribuzione',
  'Ammortizzatori',
  'Batteria',
  'Carrozzeria / Verniciatura',
  'Lucidatura e Polish',
  'Altro (specificare nelle note)'
];

@Component({
  selector: 'app-preventivo',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Richiedi un preventivo gratuito</h1>
        <p>Compila il modulo con i dati del veicolo e l'intervento richiesto. Ti risponderemo entro 2 ore.</p>
      </div>
    </section>

    <article class="demo-container form-wrapper">
      <form
        [formGroup]="form"
        (ngSubmit)="onSubmit()"
        *ngIf="!submitted(); else thankyou"
        class="preventivo-form"
        novalidate
      >
        <fieldset>
          <legend>Dati personali</legend>
          <div class="row-2">
            <div class="field">
              <label for="nome">Nome <span class="required">*</span></label>
              <input id="nome" type="text" formControlName="nome" autocomplete="given-name" required />
              <span class="error" *ngIf="showError('nome')">Campo obbligatorio (min 2 caratteri)</span>
            </div>
            <div class="field">
              <label for="cognome">Cognome <span class="required">*</span></label>
              <input id="cognome" type="text" formControlName="cognome" autocomplete="family-name" required />
              <span class="error" *ngIf="showError('cognome')">Campo obbligatorio (min 2 caratteri)</span>
            </div>
          </div>
          <div class="row-2">
            <div class="field">
              <label for="email">Email <span class="required">*</span></label>
              <input id="email" type="email" formControlName="email" autocomplete="email" required />
              <span class="error" *ngIf="showError('email')">Inserisci un indirizzo email valido</span>
            </div>
            <div class="field">
              <label for="telefono">Telefono <span class="required">*</span></label>
              <input id="telefono" type="tel" formControlName="telefono" autocomplete="tel" required />
              <span class="error" *ngIf="showError('telefono')">Inserisci un numero di telefono valido</span>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Dati del veicolo</legend>
          <div class="row-3">
            <div class="field">
              <label for="marca">Marca <span class="required">*</span></label>
              <select id="marca" formControlName="marca" required>
                <option value="">Seleziona marca</option>
                <option *ngFor="let m of marche" [value]="m">{{ m }}</option>
              </select>
              <span class="error" *ngIf="showError('marca')">Seleziona la marca del veicolo</span>
            </div>
            <div class="field">
              <label for="modello">Modello <span class="required">*</span></label>
              <input id="modello" type="text" formControlName="modello" placeholder="es. Golf, Panda, 500…" required />
              <span class="error" *ngIf="showError('modello')">Inserisci il modello</span>
            </div>
            <div class="field">
              <label for="anno">Anno immatricolazione <span class="required">*</span></label>
              <input id="anno" type="number" formControlName="anno" min="1990" [max]="annoCorrente" required />
              <span class="error" *ngIf="showError('anno')">Anno non valido (1990 – {{ annoCorrente }})</span>
            </div>
          </div>
          <div class="field">
            <label for="km">Chilometraggio attuale (km)</label>
            <input id="km" type="number" formControlName="km" min="0" placeholder="es. 85000" />
          </div>
        </fieldset>

        <fieldset>
          <legend>Intervento richiesto</legend>
          <div class="field">
            <label for="intervento">Tipo di intervento <span class="required">*</span></label>
            <select id="intervento" formControlName="intervento" required>
              <option value="">Seleziona intervento</option>
              <option *ngFor="let i of interventi" [value]="i">{{ i }}</option>
            </select>
            <span class="error" *ngIf="showError('intervento')">Seleziona l'intervento richiesto</span>
          </div>
          <div class="field">
            <label for="note">Note aggiuntive (sintomi, preferenze ricambi, ecc.)</label>
            <textarea id="note" formControlName="note" rows="4" placeholder="Descrivi il problema o eventuali richieste specifiche…"></textarea>
          </div>
          <div class="field field--checkbox">
            <input id="foto" type="checkbox" formControlName="fotoMock" />
            <label for="foto">
              Ho foto o video del problema da allegare
              <em>(in questo demo nessun file viene caricato)</em>
            </label>
          </div>
        </fieldset>

        <div class="field field--checkbox">
          <input id="privacy" type="checkbox" formControlName="privacy" required />
          <label for="privacy">
            Accetto la <a href="#" (click)="$event.preventDefault()">privacy policy</a> e il trattamento dei dati
            personali per rispondere alla mia richiesta di preventivo. <span class="required">*</span>
          </label>
          <span class="error error--privacy" *ngIf="showError('privacy')">Devi accettare la privacy policy</span>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia richiesta</button>
        </div>

        <p class="form-disclaimer">
          Demo non funzionale: nessun dato viene inviato. In un sito reale riceveresti un'email di conferma
          entro pochi minuti e una risposta con preventivo entro 2 ore lavorative.
        </p>
      </form>

      <ng-template #thankyou>
        <div class="thankyou">
          <span class="thankyou__icon" aria-hidden="true">✅</span>
          <h2>Richiesta inviata, {{ form.value['nome'] }}!</h2>
          <p>
            Abbiamo ricevuto la tua richiesta per la tua
            <strong>{{ form.value['marca'] }} {{ form.value['modello'] }}</strong>
            ({{ form.value['anno'] }}).
          </p>
          <p>
            In un sito reale ti contatteremmo entro 2 ore lavorative al numero
            <strong>{{ form.value['telefono'] }}</strong> con il preventivo dettagliato.
          </p>
          <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
        </div>
      </ng-template>
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
      .form-wrapper {
        padding: 3rem 1rem;
        max-width: 760px;
      }
      .preventivo-form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      fieldset {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        margin: 0;
      }
      legend {
        font-weight: 700;
        font-size: 1rem;
        padding: 0 0.5rem;
        color: var(--color-fg-default);
      }
      .row-2 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
      .row-3 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }
      .field {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
      }
      fieldset > .field:first-of-type,
      fieldset > .row-2:first-of-type,
      fieldset > .row-3:first-of-type {
        margin-top: 0;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .required {
        color: var(--color-danger);
      }
      .field input,
      .field select,
      .field textarea {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field select:focus,
      .field textarea:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.875rem;
        color: var(--color-fg-muted);
        flex: 1;
      }
      .field--checkbox input[type="checkbox"] {
        margin-top: 2px;
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        padding: 0;
      }
      .error {
        font-size: 0.78rem;
        color: var(--color-danger);
        margin-top: 0.2rem;
      }
      .error--privacy {
        width: 100%;
        margin-left: 24px;
      }
      .form-actions {
        display: flex;
        justify-content: flex-end;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.75rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
        border: none;
        cursor: pointer;
        transition: background 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover:not(:disabled) {
        background: #334155;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin: 0;
      }
      .thankyou {
        text-align: center;
        padding: 3rem 1rem;
        max-width: 520px;
        margin: 0 auto;
      }
      .thankyou__icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
      }
      .thankyou h2 {
        margin: 0 0 1rem;
        color: var(--color-success);
      }
      .thankyou p {
        color: var(--color-fg-muted);
        margin-bottom: 1rem;
      }
      @media (max-width: 600px) {
        .row-2,
        .row-3 {
          grid-template-columns: 1fr;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreventivoComponent {
  private readonly fb = inject(FormBuilder);

  readonly marche = MARCHE_AUTO;
  readonly interventi = INTERVENTI;
  readonly annoCorrente = new Date().getFullYear();
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    cognome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    marca: ['', Validators.required],
    modello: ['', [Validators.required, Validators.minLength(1)]],
    anno: [
      null,
      [Validators.required, Validators.min(1990), Validators.max(this.annoCorrente)]
    ],
    km: [null],
    intervento: ['', Validators.required],
    note: [''],
    fotoMock: [false],
    privacy: [false, Validators.requiredTrue]
  });

  showError(field: string): boolean {
    const control = this.form.get(field);
    return control !== null && control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ anno: null, km: null, fotoMock: false, privacy: false });
    this.submitted.set(false);
  }
}
