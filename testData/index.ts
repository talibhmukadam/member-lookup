import { testDataEn } from './en';
import { TestDataBundle } from './types';

export function loadTestData(localeCode: string): TestDataBundle {
  switch (localeCode) {
    case 'en':
    case 'en-US':
      return testDataEn;
    default:
      throw new Error(`Unsupported test data locale: ${localeCode}`);
  }
}
