import { Page } from '@playwright/test';
import { LocaleStrings } from '../../i18n/types';
import {
  DateRangeScenario,
  StatusScenario,
  SearchScenario,
} from '../../testData/types';
import { MemberLookupTemplate } from '../templates/memberLookup.template';

export class MemberLookupPage extends MemberLookupTemplate {
  constructor(page: Page, locale: LocaleStrings) {
    super(page, locale);
  }

  async goto() {
    await this.page.goto(this.locale.routes.memberLookup);
  }

  async applySearchScenario(scenario: SearchScenario) {
    await this.filters.search.setValue(scenario.input);
  }

  async applyStatusScenario(scenario: StatusScenario) {
    await this.filters.applyStatus(scenario.label);
  }

  async applyDateRange(range: DateRangeScenario) {
    await this.filters.applyDateRange(range);
  }

  async clearFilters() {
    await this.filters.clearAll();
  }

}
