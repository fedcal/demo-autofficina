// Tipi TypeScript per i dati mock dell'autofficina

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    facebook?: string;
    instagram?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface ServiziAttivita {
  autoSostitutiva: boolean;
  ritiroConsegna: boolean;
  preventivOgratuito: boolean;
  garanzia: string;
  accessibileDisabili: boolean;
  pagamentoFinanziato: boolean;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  fondazione: number;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  servizi: ServiziAttivita;
  metaSeo: MetaSeo;
}

export interface CategoriaServizio {
  id: string;
  nome: string;
  ordine: number;
}

export interface Servizio {
  id: number;
  categoria: string;
  nome: string;
  descrizione: string;
  prezzoMin: number;
  prezzoMax: number;
  durataMedio: string;
  garanzia: boolean;
  popolare: boolean;
}

export interface ServiziData {
  categorie: CategoriaServizio[];
  servizi: Servizio[];
}

export interface Membro {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  anniEsperienza: number;
  image: string;
  specialita: string[];
}

export interface Team {
  team: Membro[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface Faq {
  faq: FaqItem[];
}

export interface PreventivoForm {
  nome: string;
  cognome: string;
  email: string;
  telefono: string;
  marca: string;
  modello: string;
  anno: number | null;
  km: number | null;
  intervento: string;
  note: string;
  fotoMock: boolean;
  privacy: boolean;
}
