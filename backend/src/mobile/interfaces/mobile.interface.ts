export interface SuggestionInterface {
  changed: string;
  number: number;
}

export interface MobileInterface {
  id: string;
  number: number;
  originalNumber: number;
  changed?: string;
  isValid: boolean;
  suggestions?: SuggestionInterface[];
  deleted: boolean;
}
