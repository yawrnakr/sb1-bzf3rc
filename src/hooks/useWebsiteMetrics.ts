import { useState, useEffect } from 'react';
import { gamAPI } from '../services/gam-api';

interface WebsiteMetrics {
  impressions: {
    total: number;
    change: number;
  };
  revenue: {
    total: number;
    change: number;
  };
  cpm: {
    value: number;
    change: number;
  };
  fillRate: {
    value: number;
    change: number;
  };
}

export function useWebsiteMetrics(websiteId: string) {
  const [metrics, setMetrics] = useState<WebsiteMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get the date range for comparison
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sixtyDaysAgo = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000);

        // Fetch current period and previous period data
        const [currentData, previousData] = await Promise.all([
          gamAPI.getReportData(
            thirtyDaysAgo.toISOString().split('T')[0],
            today.toISOString().split('T')[0]
          ),
          gamAPI.getReportData(
            sixtyDaysAgo.toISOString().split('T')[0],
            thirtyDaysAgo.toISOString().split('T')[0]
          )
        ]);

        // Calculate metrics and changes
        const calculateChange = (current: number, previous: number) => 
          previous === 0 ? 0 : ((current - previous) / previous) * 100;

        setMetrics({
          impressions: {
            total: currentData.totals[0],
            change: calculateChange(currentData.totals[0], previousData.totals[0])
          },
          revenue: {
            total: currentData.totals[1],
            change: calculateChange(currentData.totals[1], previousData.totals[1])
          },
          cpm: {
            value: currentData.totals[1] / (currentData.totals[0] / 1000),
            change: calculateChange(
              currentData.totals[1] / (currentData.totals[0] / 1000),
              previousData.totals[1] / (previousData.totals[0] / 1000)
            )
          },
          fillRate: {
            value: (currentData.totals[0] / currentData.totals[2]) * 100,
            change: calculateChange(
              currentData.totals[0] / currentData.totals[2],
              previousData.totals[0] / previousData.totals[2]
            )
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics');
      } finally {
        setLoading(false);
      }
    };

    if (websiteId) {
      fetchMetrics();
    }
  }, [websiteId]);

  return { metrics, loading, error };
}