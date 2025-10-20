import { Page, expect } from '@playwright/test';
import { LocaleStrings } from '../../i18n/types';
import { DateRangeScenario } from '../../testData/types';
import { ButtonAtom } from '../atoms/button.atom';

type MonthLookup = Record<string, number>;

export class DateRangeMolecule {
  private readonly trigger: ButtonAtom;
  private readonly monthToIndex: MonthLookup = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  constructor(private readonly page: Page, locale: LocaleStrings) {
    this.trigger = new ButtonAtom(page.getByTestId(locale.testIds.dateRangeTrigger));
  }

  private parseLabel(label: string) {
    const [month, year] = label.split(' ');
    return { month: this.monthToIndex[month] ?? 0, year: Number(year) };
  }

  private compare(
    a: { month: number; year: number },
    b: { month: number; year: number },
  ) {
    return a.year !== b.year ? a.year - b.year : a.month - b.month;
  }

  private formatDataDay({ month, day, year }: DateRangeScenario['start']) {
    const numericMonth = this.monthToIndex[month] + 1;
    return `${numericMonth}/${day}/${year}`;
  }

  async select(range: DateRangeScenario) {
    await this.trigger.click();

    const startKey = `${range.start.month} ${range.start.year}`;
    const endKey = `${range.end.month} ${range.end.year}`;
    const targetStart = this.parseLabel(startKey);
    const targetEnd = this.parseLabel(endKey);

    for (let i = 0; i < 48; i++) {
      const labels = await this.page
        .locator('[role="grid"]')
        .evaluateAll((grids) => grids.map((grid) => grid.getAttribute('aria-label') ?? ''));
      if (labels.includes(startKey) && labels.includes(endKey)) {
        break;
      }
      const firstLabel = this.parseLabel(labels[0]!);
      const lastLabel = this.parseLabel(labels[labels.length - 1]!);

      let control: 'Go to the Previous Month' | 'Go to the Next Month';
      if (this.compare(targetStart, firstLabel) < 0) {
        control = 'Go to the Previous Month';
      } else if (this.compare(targetEnd, lastLabel) > 0) {
        control = 'Go to the Next Month';
      } else if (!labels.includes(startKey)) {
        control = 'Go to the Previous Month';
      } else {
        control = 'Go to the Next Month';
      }

      const navigator = new ButtonAtom(this.page.getByRole('button', { name: control }));
      await navigator.scrollIntoViewIfNeeded();
      await navigator.evaluateClick();
      await this.page.waitForTimeout(100);
    }

    const finalLabels = await this.page
      .locator('[role="grid"]')
      .evaluateAll((grids) => grids.map((grid) => grid.getAttribute('aria-label') ?? ''));
    if (!(finalLabels.includes(startKey) && finalLabels.includes(endKey))) {
      throw new Error('Unable to align calendar to requested range');
    }

    const startDataDay = this.formatDataDay(range.start);
    const endDataDay = this.formatDataDay(range.end);

    await this.page
      .locator(`[data-day="${startDataDay}"]`)
      .evaluate((button: HTMLElement) => button.click());
    await this.page
      .locator(`[data-day="${endDataDay}"]`)
      .evaluate((button: HTMLElement) => button.click());

    const startDisplay = `${range.start.month.slice(0, 3)} ${range.start.day
      .toString()
      .padStart(2, '0')}, ${range.start.year}`;
    const endDisplay = `${range.end.month.slice(0, 3)} ${range.end.day
      .toString()
      .padStart(2, '0')}, ${range.end.year}`;

    await expect(this.trigger.locatorInstance()).toContainText(startDisplay);
    await expect(this.trigger.locatorInstance()).toContainText(endDisplay);
  }

  async close() {
    await this.page.keyboard.press('Escape');
  }
}
