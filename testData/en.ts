import { TestDataBundle } from './types';

export const testDataEn: TestDataBundle = {
  searchScenarios: [
    {
      key: 'searchName',
      input: 'Jennifer',
      expectedSegments: ['Jennifer Brown', '543210987', 'jennifer.brown@example.com'],
      expectedCount: 1,
      expectedMemberId: '543210987',
    },
    {
      key: 'searchUserId',
      input: '543210987',
      expectedSegments: ['Jennifer Brown', '543210987'],
      expectedCount: 1,
      expectedMemberId: '543210987',
    },
    {
      key: 'searchEmail',
      input: 'jennifer.brown@example.com',
      expectedSegments: ['Jennifer Brown', 'jennifer.brown@example.com'],
      expectedCount: 1,
      expectedMemberId: '543210987',
    },
  ],
  statusScenarios: [
    { label: 'Active', expectedCount: 12 },
    { label: 'Pending', expectedCount: 7 },
    { label: 'Closed', expectedCount: 4 },
  ],
  dateRanges: [
    {
      key: 'decToJan',
      start: { month: 'December', day: 1, year: 2024 },
      end: { month: 'January', day: 31, year: 2025 },
      expectedCount: 5,
    },
    {
      key: 'julToAug',
      start: { month: 'July', day: 1, year: 2025 },
      end: { month: 'August', day: 31, year: 2025 },
      expectedCount: 5,
    },
  ],
  memberDetail: {
    id: '543210987',
    name: 'Jennifer Brown',
    heading: 'Jennifer Brown',
    kycStatus: 'KYC Verified',
    cashoutStatus: 'Completed',
    accountStatus: 'Active',
  },
  fallback: {
    missingMemberId: '123456789',
    interceptMemberId: '987654321',
    defaultMessage: "The member you're looking for doesn't exist or has been removed.",
    customMessage: 'The member is pending review by account manager. Please wait.',
    customHeading: 'Member Not Ready',
  },
};
