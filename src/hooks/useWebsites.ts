import { useState, useEffect } from 'react';
import { Website } from '../types';

export function useWebsites() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        // Simulate API call to GAM
        const mockData: Website[] = [
          {
            id: '1',
            name: 'news-daily.com',
            url: 'https://news-daily.com',
            risk: 'High',
            traffic: '125K',
            revenue: '$12,420',
            riskColor: 'text-red-600 bg-red-50',
            mfaScore: 72,
            topics: ['News', 'Politics'],
            gam_id: '21700000001',
            monthlyStats: [
              { traffic: 120000, revenue: 11500, mfaScore: 70 },
              { traffic: 125000, revenue: 12420, mfaScore: 72 },
              { traffic: 118000, revenue: 11800, mfaScore: 71 }
            ],
            trafficSources: [
              { source: 'Direct', percentage: 35 },
              { source: 'Social', percentage: 25 },
              { source: 'Search', percentage: 40 }
            ]
          },
          {
            id: '2',
            name: 'techblog.io',
            url: 'https://techblog.io',
            risk: 'Low',
            traffic: '95K',
            revenue: '$8,230',
            riskColor: 'text-green-600 bg-green-50',
            mfaScore: 28,
            topics: ['Technology', 'Programming'],
            gam_id: '21700000002',
            monthlyStats: [
              { traffic: 90000, revenue: 7800, mfaScore: 30 },
              { traffic: 95000, revenue: 8230, mfaScore: 28 },
              { traffic: 92000, revenue: 8000, mfaScore: 29 }
            ],
            trafficSources: [
              { source: 'Direct', percentage: 45 },
              { source: 'Social', percentage: 15 },
              { source: 'Search', percentage: 40 }
            ]
          }
        ];

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setWebsites(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch websites');
        setLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  const sortWebsites = (key: keyof Website) => {
    setWebsites([...websites].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    }));
  };

  return { websites, loading, error, sortWebsites };
}