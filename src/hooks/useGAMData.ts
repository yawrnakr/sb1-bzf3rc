import { useState, useEffect } from 'react';
import { gamAPI } from '../services/gam-api';

interface GAMData {
  networkCode: string;
  networkName: string;
  status: string;
  properties: {
    adSenseEnabled: boolean;
    adExchangeEnabled: boolean;
  };
}

interface AdUnit {
  id: string;
  name: string;
  status: string;
  adUnitCode: string;
}

export function useGAMData() {
  const [networkData, setNetworkData] = useState<GAMData | null>(null);
  const [adUnits, setAdUnits] = useState<AdUnit[]>([]);
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGAMData = async () => {
      try {
        setLoading(true);
        
        // Get network data
        const network = await gamAPI.getNetwork();
        setNetworkData(network);

        // Get ad units
        const units = await gamAPI.getAdUnits();
        setAdUnits(units.results || []);

        // Get last 30 days report
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];
        
        const report = await gamAPI.getReportData(startDate, endDate);
        setReportData(report);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch GAM data');
      } finally {
        setLoading(false);
      }
    };

    fetchGAMData();
  }, []);

  return { networkData, adUnits, reportData, loading, error };
}