export interface Website {
  id: string;
  name: string;
  url: string;
  risk: 'High' | 'Medium' | 'Low';
  traffic: string;
  revenue: string;
  riskColor: string;
  mfaScore: number;
  topics: string[];
  gam_id: string;
  status?: 'approved' | 'rejected' | 'pending';
  adminType?: 'direct' | 'programmatic';
  addedBy?: {
    name: string;
    email: string;
    role: string;
  };
  monthlyStats: {
    traffic: number;
    revenue: number;
    mfaScore: number;
  }[];
  trafficSources: {
    source: string;
    percentage: number;
  }[];
}

export interface AdAccount {
  id: string;
  name: string;
  lastPayment: string;
  status: 'Active' | 'Review' | 'Suspended';
  statusColor: string;
}

export interface MFAStat {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
  bg: string;
}

export interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
}

export interface MonthlyRevenue {
  month: string;
  amount: number;
  change: number;
}

export interface NewSiteForm {
  url: string;
  name: string;
  topics: string[];
  gam_id: string;
}