export interface SuggestionInterface {
  changed: string;
  number: number;
  loading?: boolean;
}

export interface MobileInterface {
  id: string;
  number: number;
  originalNumber: number;
  changed?: string;
  isValid: boolean;
  suggestions?: SuggestionInterface[];
}
