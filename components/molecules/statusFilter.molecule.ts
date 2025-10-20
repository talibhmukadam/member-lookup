import { Page } from '@playwright/test';
import { LocaleStrings } from '../../i18n/types';
import { ComboboxAtom } from '../atoms/combobox.atom';

export class StatusFilterMolecule {
  private readonly trigger: ComboboxAtom;

  constructor(private readonly page: Page, locale: LocaleStrings) {
    this.trigger = new ComboboxAtom(
      page.locator('[data-slot="select-trigger"]').first(),
      page,
    );
  }

  async selectStatus(label: string) {
    await this.trigger.open();
    await this.trigger.selectOptionByText(label);
  }
}
