import { Page } from '@playwright/test';
import { InputAtom } from '../atoms/input.atom';
import { LocaleStrings } from '../../i18n/types';

export class SearchFieldMolecule {
  private readonly input: InputAtom;

  constructor(page: Page, locale: LocaleStrings) {
    this.input = new InputAtom(page.getByTestId(locale.testIds.searchInput));
  }

  async setValue(value: string) {
    await this.input.fill(value);
  }
}
