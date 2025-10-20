export type CalendarDate = {
  month: string;
  day: number;
  year: number;
};

export type DateRangeScenario = {
  key: string;
  start: CalendarDate;
  end: CalendarDate;
  expectedCount: number;
};

export type SearchScenario = {
  key: string;
  input: string;
  expectedSegments: string[];
  expectedCount: number;
  expectedMemberId: string;
};

export type StatusScenario = {
  label: string;
  expectedCount: number;
};

export type MemberDetailExpectations = {
  id: string;
  name: string;
  heading: string;
  kycStatus: string;
  cashoutStatus: string;
  accountStatus: string;
};

export type FallbackScenario = {
  missingMemberId: string;
  interceptMemberId: string;
  defaultMessage: string;
  customMessage: string;
  customHeading: string;
};

export interface TestDataBundle {
  searchScenarios: SearchScenario[];
  statusScenarios: StatusScenario[];
  dateRanges: DateRangeScenario[];
  memberDetail: MemberDetailExpectations;
  fallback: FallbackScenario;
}
