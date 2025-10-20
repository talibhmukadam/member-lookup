import { LocaleStrings } from './types';

export const localeEn: LocaleStrings = {
  meta: {
    locale: 'en-US',
  },
  routes: {
    memberLookup: '/',
    memberDetail: (id: string) => `/members/${id}`,
  },
  ui: {
    heading: 'Find community members',
    memberFoundSingular: 'member found',
    membersFoundPlural: 'members found',
    clearFiltersLabel: 'Clear filters',
    memberNotFoundHeading: 'Member Not Found',
    kycLabel: 'KYC:',
    cashoutLabel: 'Cashout:',
    accountLabel: 'Account:',
  },
  testIds: {
    searchInput: 'member-search',
    dateRangeTrigger: 'date-range-picker',
    memberRowPrefix: 'member-row-',
  },
};
