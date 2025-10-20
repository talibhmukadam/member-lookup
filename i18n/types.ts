export interface LocaleStrings {
  meta: {
    locale: string;
  };
  routes: {
    memberLookup: string;
    memberDetail: (id: string) => string;
  };
  ui: {
    heading: string;
    memberFoundSingular: string;
    membersFoundPlural: string;
    clearFiltersLabel: string;
    memberNotFoundHeading: string;
    kycLabel: string;
    cashoutLabel: string;
    accountLabel: string;
  };
  testIds: {
    searchInput: string;
    dateRangeTrigger: string;
    memberRowPrefix: string;
  };
}
