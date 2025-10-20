import { Page, expect } from '@playwright/test';
import { LocaleStrings } from '../i18n/types';
import { TestDataBundle } from '../testData/types';
import { MemberLookupPage } from '../components/pages/memberLookup.page';
import { MemberDetailPage } from '../components/pages/memberDetail.page';
import { MemberNotFoundPage } from '../components/pages/memberNotFound.page';

export class MemberLookupKeywords {
  private constructor(
    private readonly page: Page,
    private readonly locale: LocaleStrings,
    private readonly data: TestDataBundle,
    private readonly memberLookup: MemberLookupPage,
    private readonly baselineCount: number,
  ) {}

  static async create(page: Page, locale: LocaleStrings, data: TestDataBundle) {
    const memberLookup = new MemberLookupPage(page, locale);
    await memberLookup.goto();
    await memberLookup.ensureLoaded();
    await expect
      .poll(async () => memberLookup.table.uniqueCount(), { timeout: 10000 })
      .toBeGreaterThan(0);
    const baselineCount = await memberLookup.table.uniqueCount();
    return new MemberLookupKeywords(page, locale, data, memberLookup, baselineCount);
  }

  async verifyTextSearchFlow() {
    for (const scenario of this.data.searchScenarios) {
      await this.memberLookup.applySearchScenario(scenario);
      await this.memberLookup.table.expectCount(scenario.expectedCount);
      const ids = await this.memberLookup.table.uniqueIds();
      expect(ids[0]).toBe(scenario.expectedMemberId);
      for (const segment of scenario.expectedSegments) {
        await expect(this.page.locator('body')).toContainText(segment);
      }
    }
    await this.memberLookup.clearFilters();
    await this.memberLookup.table.expectCount(this.baselineCount);
  }

  async verifyStatusFilterFlow() {
    for (const scenario of this.data.statusScenarios) {
      await this.memberLookup.applyStatusScenario(scenario);
      await this.memberLookup.table.expectCount(scenario.expectedCount);
      await this.memberLookup.clearFilters();
      await this.memberLookup.table.expectCount(this.baselineCount);
    }
  }

  async verifyDateRangeFlow() {
    for (const range of this.data.dateRanges) {
      await this.memberLookup.applyDateRange(range);
      await this.memberLookup.table.expectCount(range.expectedCount);
      await this.memberLookup.table.expectAllRowsWithin(range);
      await this.memberLookup.clearFilters();
      await this.memberLookup.table.expectCount(this.baselineCount);
    }
  }

  async verifyMemberDetailStatuses() {
    await this.page.goto(this.locale.routes.memberDetail(this.data.memberDetail.id));
    const detailPage = new MemberDetailPage(this.page, this.locale);
    await detailPage.verifyStatuses(this.data.memberDetail);
  }

  async verifyMissingMemberHandling() {
    const notFoundPage = new MemberNotFoundPage(this.page, this.locale);

    await this.page.goto(this.locale.routes.memberDetail(this.data.fallback.missingMemberId));
    await notFoundPage.verifyMessage(this.data.fallback.defaultMessage);

    await this.page.route('**/members/*', async (route) => {
      const url = route.request().url();
      if (!url.endsWith(this.data.fallback.interceptMemberId)) {
        await route.continue();
        return;
      }

      const upstream = await route.fetch();
      const body = (await upstream.text())
        .replace(
          this.locale.ui.memberNotFoundHeading,
          this.data.fallback.customHeading,
        )
        .replace(
          this.data.fallback.defaultMessage,
          this.data.fallback.customMessage,
        );
      await route.fulfill({
        status: upstream.status(),
        headers: upstream.headers(),
        body,
      });
    });

    await this.page.goto(this.locale.routes.memberDetail(this.data.fallback.interceptMemberId));
    await notFoundPage.verifyMessage(
      this.data.fallback.customMessage,
      this.data.fallback.customHeading,
    );

    await this.memberLookup.goto();
    await this.memberLookup.ensureLoaded();
    await this.memberLookup.table.expectCount(this.baselineCount);
  }
}
