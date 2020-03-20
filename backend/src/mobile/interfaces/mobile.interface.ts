export interface SuggestionInterface {
  changed: string;
  number: number;
}

export enum ChangedEnum {
  'first-two',
  'first-two-fourth',
}
export interface MobileInterface {
  id: string;
  number: number;
  originalNumber: number;
  changed?: ChangedEnum;
  isValid: boolean;
  suggestions?: SuggestionInterface[];
  deleted: boolean;
}
