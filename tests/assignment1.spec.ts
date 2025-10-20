import { test } from '@playwright/test';
import { loadLocale } from '../i18n';
import { loadTestData } from '../testData';
import { MemberLookupKeywords } from '../keywords/memberLookup.keywords';

const localeCode = 'en';
const locale = loadLocale(localeCode);
const testData = loadTestData(localeCode);

test.describe('Assignment 1 • Member Lookup', () => {
  test('Assignment 1.1 • Text-based filtering maintains accuracy', async ({ page }) => {
    const keywords = await MemberLookupKeywords.create(page, locale, testData);
    await keywords.verifyTextSearchFlow();
  });

  test('Assignment 1.1 • Account status filters respect counts', async ({ page }) => {
    const keywords = await MemberLookupKeywords.create(page, locale, testData);
    await keywords.verifyStatusFilterFlow();
  });

  test('Assignment 1.1 • Date range filters constrain sign-up dates', async ({ page }) => {
    const keywords = await MemberLookupKeywords.create(page, locale, testData);
    await keywords.verifyDateRangeFlow();
  });

  test('Assignment 1.2 • Jennifer Brown details remain consistent', async ({ page }) => {
    const keywords = await MemberLookupKeywords.create(page, locale, testData);
    await keywords.verifyMemberDetailStatuses();
  });

  test('Assignment 1.3 • Non-existent members return appropriate messaging', async ({ page }) => {
    const keywords = await MemberLookupKeywords.create(page, locale, testData);
    await keywords.verifyMissingMemberHandling();
  });
});
