export enum PrayerCategory {
  BASIC = 'Básicas',
  MARIAN = 'Marianas',
  NOVENA = 'Novenas',
  SAINTS = 'Santos',
  MASS = 'Misa',
  PSALMS = 'Salmos'
}

export interface Prayer {
  id: string;
  title: string;
  content: string;
  category: PrayerCategory;
  duration?: string; // e.g., "9 Días" or "2 min"
  isNovena?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export enum AppView {
  HOME = 'home',
  LIBRARY = 'library',
  CHAPLAIN = 'chaplain', // AI Chat
  SETTINGS = 'settings'
}