import { Page, expect } from '@playwright/test';
import { LocaleStrings } from '../../i18n/types';
import { DateRangeScenario } from '../../testData/types';

type MemberRowSnapshot = {
  id: string;
  text: string;
  cells: string[];
};

export class MemberTableOrganism {
  constructor(private readonly page: Page, private readonly locale: LocaleStrings) {}

  private rowsLocator() {
    return this.page.locator(`[data-testid^="${this.locale.testIds.memberRowPrefix}"]`);
  }

  private async uniqueRows(): Promise<MemberRowSnapshot[]> {
    const raw = await this.rowsLocator().evaluateAll((elements) =>
      elements.map((row) => {
        const id = row.getAttribute('data-testid') ?? '';
        const text = (row.textContent ?? '').trim();
        const cells = Array.from(row.querySelectorAll('td')).map((cell) =>
          (cell.textContent ?? '').trim(),
        );
        return { id, text, cells };
      }),
    );

    const seen = new Set<string>();
    const unique: MemberRowSnapshot[] = [];
    for (const row of raw) {
      if (!seen.has(row.id)) {
        seen.add(row.id);
        unique.push(row);
      }
    }
    return unique;
  }

  async expectCount(expected: number) {
    await expect
      .poll(async () => this.uniqueCount(), { timeout: 10000 })
      .toBe(expected);
    const suffix =
      expected === 1 ? this.locale.ui.memberFoundSingular : this.locale.ui.membersFoundPlural;
    await expect(this.page.getByText(`${expected} ${suffix}`)).toBeVisible();
  }

  async uniqueCount() {
    const unique = await this.uniqueRows();
    return unique.length;
  }

  async uniqueIds() {
    const unique = await this.uniqueRows();
    return unique.map((row) => row.id.replace(this.locale.testIds.memberRowPrefix, ''));
  }

  async expectTopRowContains(segments: string[]) {
    const unique = await this.uniqueRows();
    const topRow = unique[0];
    expect(topRow).toBeDefined();
    for (const segment of segments) {
      const matchesText = topRow.text.includes(segment);
      const matchesCell = topRow.cells.some((cell) => cell.includes(segment));
      expect(
        matchesText || matchesCell,
        `Expected top-row content to include "${segment}"`,
      ).toBeTruthy();
    }
  }

  async expectAllRowsWithin(range: DateRangeScenario) {
    const unique = await this.uniqueRows();
    const start = new Date(`${range.start.month} ${range.start.day}, ${range.start.year} UTC`);
    const end = new Date(`${range.end.month} ${range.end.day}, ${range.end.year} UTC`);

    for (const row of unique) {
      const dateCell = row.cells[5];
      const value = new Date(`${dateCell} UTC`);
      expect(
        value >= start && value <= end,
        `Expected ${value.toISOString()} to be within ${start.toISOString()} - ${end.toISOString()}`,
      ).toBeTruthy();
    }
  }

  async resetState() {
    await this.page.waitForLoadState('networkidle');
    await expect(await this.uniqueRows()).not.toHaveLength(0);
  }

  async openMemberByName(name: string) {
    const target = this.page.getByRole('link', { name, exact: true });
    await target.waitFor({ state: 'visible' });
    await target.evaluate((element: HTMLElement) => element.click());
  }

  async statusCounts() {
    const unique = await this.uniqueRows();
    const counts: Record<string, number> = {};
    for (const row of unique) {
      const status = row.cells[3];
      counts[status] = (counts[status] ?? 0) + 1;
    }
    return counts;
  }
}
