import { Page, expect } from '@playwright/test';
import { LocaleStrings } from '../../i18n/types';
import { MemberFiltersOrganism } from '../organisms/filters.organism';
import { MemberTableOrganism } from '../organisms/memberTable.organism';

export class MemberLookupTemplate {
  readonly filters: MemberFiltersOrganism;
  readonly table: MemberTableOrganism;

  constructor(protected readonly page: Page, protected readonly locale: LocaleStrings) {
    this.filters = new MemberFiltersOrganism(page, locale);
    this.table = new MemberTableOrganism(page, locale);
  }

  async ensureLoaded() {
    await expect(
      this.page.getByRole('heading', { name: this.locale.ui.heading, exact: true }),
    ).toBeVisible();
  }
}
