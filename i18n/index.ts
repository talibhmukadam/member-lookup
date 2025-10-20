import { localeEn } from './en';
import { LocaleStrings } from './types';

export function loadLocale(localeCode: string): LocaleStrings {
  switch (localeCode) {
    case 'en':
    case 'en-US':
      return localeEn;
    default:
      throw new Error(`Unsupported locale: ${localeCode}`);
  }
}
