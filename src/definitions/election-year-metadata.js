export const yearData = {
  'le2022': {
    years: {
      '2022': {
        election: 'le2022',
        colour: '#390099',
        offset: 9,
        zIndex: 2,
        current: true,
        periodLength: 81, // 3 days + 5hours and extra 4 hours to end at 18:00
        actualLength: 77 // 3 days + 5hours 
      },
      '2021': {
        election: 'le2020',
          colour: '#ffa900',
          offset: 9,
          zIndex: 1,
          periodLength: 81,
          actualLength: 77
      }
    },
    minTime: Date.UTC(2022, 3 - 1, 14, 0, 0, 0),
    startTime: Date.UTC(2022, 3 - 1, 14, 6, 0, 0),
    endTime: Date.UTC(2022, 3 - 1, 17, 18, 0, 0),
    startTimeThisYear: Date.UTC(2022, 3 - 1, 14, 9, 0, 0),
    endTimeThisYear: Date.UTC(2022, 3 - 1, 17, 14, 0, 0),
    maxTime: Date.UTC(2022, 3 - 1, 18, 0, 0, 0),
    votingPeriodText: 'Voting period for Leadership Elections 2022'
  },
  'le2023': {
    years: {
      '2023': {
        election: 'le2023',
        colour: '#390099',
        offset: 9,
        zIndex: 2,
        current: true,
        periodLength: 81, // 3 days + 5hours and extra 4 hours to end at 18:00
        actualLength: 77 // 3 days + 5hours 
      },
      '2022': {
        election: 'le2022',
        colour: '#ffa900',
        offset: 9,
        zIndex: 1,
        periodLength: 81,
        actualLength: 77
      }
    },
    minTime: Date.UTC(2023, 3 - 1, 13, 0, 0, 0),
    startTime: Date.UTC(2023, 3 - 1, 13, 6, 0, 0),
    endTime: Date.UTC(2023, 3 - 1, 16, 18, 0, 0),
    startTimeThisYear: Date.UTC(2023, 3 - 1, 13, 9, 0, 0),
    endTimeThisYear: Date.UTC(2023, 3 - 1, 16, 14, 0, 0),
    maxTime: Date.UTC(2023, 3 - 1, 17, 0, 0, 0),
    votingPeriodText: 'Voting period for Leadership Elections 2023'
  },
  'le2024': {
    years: {
      '2024': {
        election: 'le2024',
        colour: '#390099',
        offset: 9,
        zIndex: 2,
        current: true,
        periodLength: 81, // 3 days + 5hours and extra 4 hours to end at 18:00
        actualLength: 77 // 3 days + 5hours
      },
      '2023': {
        election: 'le2023',
        colour: '#ffa900',
        offset: 9,
        zIndex: 1,
        periodLength: 81,
        actualLength: 77
      }
    },
    minTime: Date.UTC(2024, 3 - 1, 11, 0, 0, 0),
    startTime: Date.UTC(2024, 3 - 1, 11, 6, 0, 0),
    endTime: Date.UTC(2024, 3 - 1, 14, 18, 0, 0),
    startTimeThisYear: Date.UTC(2024, 3 - 1, 11, 9, 0, 0),
    endTimeThisYear: Date.UTC(2024, 3 - 1, 14, 14, 0, 0),
    maxTime: Date.UTC(2024, 3 - 1, 15, 0, 0, 0),
    votingPeriodText: 'Voting period for Leadership Elections 2024'
  },
  'le2025': {
    years: {
      '2025': {
        election: 'le2025',
        colour: '#390099',
        offset: 9,
        zIndex: 2,
        current: true,
        periodLength: 81, // 3 days + 5hours and extra 4 hours to end at 18:00
        actualLength: 77 // 3 days + 5hours
      },
      '2024': {
        election: 'le2024',
        colour: '#ffa900',
        offset: 9,
        zIndex: 1,
        periodLength: 81,
        actualLength: 77
      }
    },
    minTime: Date.UTC(2025, 3 - 1, 10, 0, 0, 0),
    startTime: Date.UTC(2025, 3 - 1, 10, 6, 0, 0),
    endTime: Date.UTC(2025, 3 - 1, 13, 18, 0, 0),
    startTimeThisYear: Date.UTC(2025, 3 - 1, 10, 9, 0, 0),
    endTimeThisYear: Date.UTC(2025, 3 - 1, 13, 14, 0, 0),
    maxTime: Date.UTC(2025, 3 - 1, 14, 0, 0, 0),
    votingPeriodText: 'Voting period for Leadership Elections 2025'
  }
}
