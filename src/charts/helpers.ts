import { Country } from '../types';

export const mapCountryCode = (code: Country) => {
  switch (code) {
    case 'EL':
      return 'gr';
    default:
      return code.toLowerCase();
  }
};
