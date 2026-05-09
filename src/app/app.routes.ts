import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Officina Rossi & C. — Meccanica multimarca + carrozzeria Milano'
  },
  {
    path: 'servizi',
    loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
    title: 'Servizi — Officina Rossi & C.'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Officina Rossi & C.'
  },
  {
    path: 'preventivo',
    loadComponent: () => import('./pages/preventivo/preventivo.component').then((m) => m.PreventivoComponent),
    title: 'Preventivo gratuito — Officina Rossi & C.'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Contatti — Officina Rossi & C.'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
