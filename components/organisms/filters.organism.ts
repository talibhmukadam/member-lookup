import { Page } from '@playwright/test';
import { LocaleStrings } from '../../i18n/types';
import { DateRangeScenario } from '../../testData/types';
import { SearchFieldMolecule } from '../molecules/search.molecule';
import { StatusFilterMolecule } from '../molecules/statusFilter.molecule';
import { DateRangeMolecule } from '../molecules/dateRange.molecule';
import { ButtonAtom } from '../atoms/button.atom';

export class MemberFiltersOrganism {
  readonly search: SearchFieldMolecule;
  readonly status: StatusFilterMolecule;
  readonly dateRange: DateRangeMolecule;
  private readonly clear: ButtonAtom;

  constructor(private readonly page: Page, private readonly locale: LocaleStrings) {
    this.search = new SearchFieldMolecule(page, locale);
    this.status = new StatusFilterMolecule(page, locale);
    this.dateRange = new DateRangeMolecule(page, locale);
    this.clear = new ButtonAtom(page.getByRole('button', { name: locale.ui.clearFiltersLabel }));
  }

  async clearAll() {
    await this.clear.click();
  }

  async applyStatus(label: string) {
    await this.status.selectStatus(label);
  }

  async applyDateRange(range: DateRangeScenario) {
    await this.dateRange.select(range);
  }
}
