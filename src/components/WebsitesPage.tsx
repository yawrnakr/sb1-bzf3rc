import React, { useState } from 'react';
import { Globe, Plus, Shield } from 'lucide-react';
import { useWebsites } from '../hooks/useWebsites';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import WebsiteDetails from './WebsiteDetails';
import AddSiteModal from './AddSiteModal';
import WebsiteFilters from './websites/WebsiteFilters';
import WebsiteCard from './websites/WebsiteCard';
import WebsiteMetrics from './websites/WebsiteMetrics';
import { Website } from '../types';

export default function WebsitesPage() {
  const { websites, loading, error } = useWebsites();
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [adminFilter, setAdminFilter] = useState('all');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const handleAddSite = async (formData: any) => {
    console.log('Adding new site:', formData);
    // Implementation would go here
  };

  const handleStatusChange = async (id: string, status: string) => {
    console.log('Changing status:', id, status);
    // Implementation would go here
  };

  const filteredWebsites = websites
    .filter(site => 
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.url.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(site => 
      riskFilter === 'all' ? true : site.risk.toLowerCase() === riskFilter.toLowerCase()
    )
    .filter(site =>
      statusFilter === 'all' ? true : site.status?.toLowerCase() === statusFilter.toLowerCase()
    )
    .filter(site =>
      adminFilter === 'all' ? true : site.addedBy?.name.toLowerCase().includes(adminFilter.toLowerCase())
    );

  const selectedWebsite = websites.find(site => site.id === selectedSite);

  return (
    <div className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-sage mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-white">Connected Websites</h1>
              <p className="text-sm text-gray-400">Manage and monitor your publishers</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Site
          </button>
        </div>

        {selectedWebsite && (
          <WebsiteMetrics websiteId={selectedWebsite.id} />
        )}

        <WebsiteFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          riskFilter={riskFilter}
          onRiskFilterChange={setRiskFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          adminFilter={adminFilter}
          onAdminFilterChange={setAdminFilter}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredWebsites.map((site) => (
            <WebsiteCard
              key={site.id}
              website={site}
              onStatusChange={handleStatusChange}
              onClick={() => setSelectedSite(site.id === selectedSite ? null : site.id)}
            />
          ))}
        </div>

        {filteredWebsites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-900 rounded-xl border border-gray-800">
            <Shield className="h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-white">No websites found</h3>
            <p className="text-sm text-gray-400 mt-2">
              Try adjusting your filters or add a new website
            </p>
          </div>
        )}
      </div>

      {selectedSite && (
        <WebsiteDetails
          website={websites.find(site => site.id === selectedSite)!}
          onClose={() => setSelectedSite(null)}
        />
      )}

      {showAddModal && (
        <AddSiteModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddSite}
        />
      )}
    </div>
  );
}