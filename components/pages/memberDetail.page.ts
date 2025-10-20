import { Page, expect } from '@playwright/test';
import { LocaleStrings } from '../../i18n/types';

export class MemberDetailPage {
  constructor(private readonly page: Page, private readonly locale: LocaleStrings) {}

  async verifyStatuses(expected: {
    heading: string;
    kycStatus: string;
    cashoutStatus: string;
    accountStatus: string;
  }) {
    await expect(this.page.getByRole('heading', { name: expected.heading, exact: true })).toBeVisible();
    await expect(this.page.getByText(this.locale.ui.kycLabel).locator('..')).toContainText(
      expected.kycStatus,
    );
    await expect(this.page.getByText(this.locale.ui.cashoutLabel).locator('..')).toContainText(
      expected.cashoutStatus,
    );
    await expect(this.page.getByText(this.locale.ui.accountLabel).locator('..')).toContainText(
      expected.accountStatus,
    );
  }
}
