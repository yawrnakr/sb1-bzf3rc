import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { useWebsites } from '../hooks/useWebsites';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface ComplianceCheck {
  id: string;
  name: string;
  description: string;
  status: 'passed' | 'failed' | 'warning';
  impact: 'high' | 'medium' | 'low';
  details: string[];
}

export default function CompliancePage() {
  const { websites, loading, error } = useWebsites();
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const getComplianceChecks = (mfaScore: number): ComplianceCheck[] => [
    {
      id: 'traffic-source',
      name: 'Traffic Source Verification',
      description: 'Validates that traffic sources are legitimate and traceable',
      status: mfaScore > 70 ? 'warning' : mfaScore > 50 ? 'failed' : 'passed',
      impact: 'high',
      details: [
        'Analyze traffic patterns for suspicious activity',
        'Verify referral sources authenticity',
        'Monitor bot traffic signatures'
      ]
    },
    {
      id: 'content-quality',
      name: 'Content Quality Assessment',
      description: 'Ensures content meets quality guidelines and is original',
      status: mfaScore > 60 ? 'failed' : 'passed',
      impact: 'high',
      details: [
        'Check for duplicate content',
        'Analyze content readability scores',
        'Verify content originality'
      ]
    },
    {
      id: 'ad-placement',
      name: 'Ad Placement Compliance',
      description: 'Checks if ad placements follow platform policies',
      status: mfaScore > 40 ? 'warning' : 'passed',
      impact: 'medium',
      details: [
        'Validate ad density ratios',
        'Check viewability metrics',
        'Monitor click-through rates'
      ]
    },
    {
      id: 'user-experience',
      name: 'User Experience Standards',
      description: 'Evaluates site navigation and content accessibility',
      status: mfaScore > 80 ? 'failed' : mfaScore > 60 ? 'warning' : 'passed',
      impact: 'medium',
      details: [
        'Measure page load times',
        'Analyze user engagement metrics',
        'Check mobile responsiveness'
      ]
    },
  ];

  const getStatusColor = (status: ComplianceCheck['status']) => {
    switch (status) {
      case 'passed':
        return 'text-sage bg-sage/10';
      case 'failed':
        return 'text-red-500 bg-red-500/10';
      case 'warning':
        return 'text-yellow-500 bg-yellow-500/10';
    }
  };

  const getImpactColor = (impact: ComplianceCheck['impact']) => {
    switch (impact) {
      case 'high':
        return 'text-red-500 bg-red-500/10';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'low':
        return 'text-sage bg-sage/10';
    }
  };

  const getStatusIcon = (status: ComplianceCheck['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-sage" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Shield className="h-8 w-8 text-sage mr-3" />
        <div>
          <h1 className="text-2xl font-bold text-white">Compliance Monitor</h1>
          <p className="text-sm text-gray-400">Website compliance and policy adherence</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {websites.map((site) => (
          <div key={site.id} className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">{site.name}</h3>
                <p className="text-sm text-gray-400">{site.url}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">MFA Score</p>
                  <p className="text-xl font-bold text-white">{site.mfaScore}/100</p>
                </div>
                <button
                  onClick={() => setSelectedSite(selectedSite === site.id ? null : site.id)}
                  className="px-4 py-2 text-sm font-medium text-sage bg-sage/10 rounded-lg hover:bg-sage/20"
                >
                  {selectedSite === site.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>
            </div>

            {selectedSite === site.id && (
              <div className="space-y-4">
                {getComplianceChecks(site.mfaScore).map((check) => (
                  <div
                    key={check.id}
                    className="bg-gray-800/50 rounded-lg p-6 border border-gray-800"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">
                        {getStatusIcon(check.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-white">
                            {check.name}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                              {check.status.charAt(0).toUpperCase() + check.status.slice(1)}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getImpactColor(check.impact)}`}>
                              {check.impact.charAt(0).toUpperCase() + check.impact.slice(1)} Impact
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">{check.description}</p>
                        <div className="bg-gray-900/50 rounded-lg p-4">
                          <div className="flex items-start space-x-2 mb-2">
                            <Info className="h-4 w-4 text-sage mt-0.5" />
                            <h5 className="text-sm font-medium text-white">Compliance Details</h5>
                          </div>
                          <ul className="space-y-2">
                            {check.details.map((detail, index) => (
                              <li key={index} className="flex items-center space-x-2 text-sm text-gray-400">
                                <div className="w-1.5 h-1.5 rounded-full bg-sage"></div>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}