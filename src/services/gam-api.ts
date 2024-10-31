// Mock GAM API service
export class GoogleAdManagerAPI {
  async getNetwork() {
    return {
      networkCode: '21700000001',
      networkName: 'Premium Publisher Network',
      status: 'ACTIVE',
      properties: {
        adSenseEnabled: true,
        adExchangeEnabled: true
      }
    };
  }

  async getAdUnits() {
    return {
      results: [
        {
          id: '1234567890',
          name: 'Homepage Banner',
          status: 'ACTIVE',
          adUnitCode: 'div-gpt-ad-123456789-0'
        },
        {
          id: '0987654321',
          name: 'Sidebar Rectangle',
          status: 'ACTIVE',
          adUnitCode: 'div-gpt-ad-123456789-1'
        }
      ]
    };
  }

  async getReportData(startDate: string, endDate: string) {
    return {
      rows: [
        {
          dimensionValues: ['2024-03-01', 'Homepage Banner'],
          metricValues: [150000, 2500, 1.67]
        },
        {
          dimensionValues: ['2024-03-01', 'Sidebar Rectangle'],
          metricValues: [120000, 2000, 1.67]
        }
      ],
      totals: [270000, 4500, 1.67]
    };
  }
}

export const gamAPI = new GoogleAdManagerAPI();