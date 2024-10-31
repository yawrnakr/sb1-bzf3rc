import { useState, useEffect } from 'react';
import { AdAccount } from '../types';

export function useAdAccounts() {
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        // Simulate API call
        const mockData: AdAccount[] = [
          {
            id: 'GAM-21209458',
            name: 'Premium News Network',
            lastPayment: '$34,290',
            status: 'Active',
            statusColor: 'text-green-600 bg-green-50',
          },
          {
            id: 'GAM-18872365',
            name: 'Global Media Group',
            lastPayment: '$28,150',
            status: 'Review',
            statusColor: 'text-yellow-600 bg-yellow-50',
          },
          {
            id: 'GAM-15943267',
            name: 'Digital First Media',
            lastPayment: '$12,840',
            status: 'Active',
            statusColor: 'text-green-600 bg-green-50',
          },
          {
            id: 'GAM-19234567',
            name: 'Content Hub Network',
            lastPayment: '$8,920',
            status: 'Suspended',
            statusColor: 'text-red-600 bg-red-50',
          },
        ];

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setAccounts(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch ad accounts');
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const filterAccounts = (status: AdAccount['status']) => {
    return accounts.filter(account => account.status === status);
  };

  return { accounts, loading, error, filterAccounts };
}