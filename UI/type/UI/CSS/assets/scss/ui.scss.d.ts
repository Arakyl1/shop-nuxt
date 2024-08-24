export type IStyles = {
  'btM-dropdown': string;
  'btM-icon': string;
  'btM-link': string;
  'btM-outline': string;
  'btM-pagination': string;
  'btM-primary': string;
  'btM-secondary': string;
  'btM-sort-bt': string;
  'btM-tabs': string;
  'input-black': string;
  'input-outline': string;
  'input-primary': string;
  'input-secondary': string;
};

export type ClassNames = keyof IStyles;

declare const styles: IStyles;

export default styles;
