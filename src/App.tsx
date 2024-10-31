import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import WebsiteAnalytics from './components/WebsiteAnalytics';
import AdAccountsOverview from './components/AdAccountsOverview';
import MFAScorecard from './components/MFAScorecard';
import ThreatMap from './components/ThreatMap';
import RevenueChart from './components/RevenueChart';
import WebsitesPage from './components/WebsitesPage';
import MFADetectionPage from './components/MFADetectionPage';
import RevenueAnalyticsPage from './components/RevenueAnalyticsPage';
import AnalyticsPage from './components/AnalyticsPage';
import CompliancePage from './components/CompliancePage';
import SignInPage from './components/auth/SignInPage';
import SignUpPage from './components/auth/SignUpPage';
import ResetPasswordPage from './components/auth/ResetPasswordPage';
import SettingsPage from './components/settings/SettingsPage';

type AuthPage = 'signin' | 'signup' | 'reset-password';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [authPage, setAuthPage] = useState<AuthPage>('signin');

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    setAuthPage('signin');
  };

  if (!isAuthenticated) {
    switch (authPage) {
      case 'signup':
        return <SignUpPage onSignIn={() => setIsAuthenticated(true)} onNavigate={setAuthPage} />;
      case 'reset-password':
        return <ResetPasswordPage onNavigate={setAuthPage} />;
      default:
        return <SignInPage onSignIn={() => setIsAuthenticated(true)} onNavigate={setAuthPage} />;
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            <MFAScorecard />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ThreatMap />
              <RevenueChart />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <WebsiteAnalytics />
              <AdAccountsOverview />
            </div>
          </div>
        );
      case 'websites':
        return <WebsitesPage />;
      case 'mfa-detection':
        return <MFADetectionPage />;
      case 'revenue':
        return <RevenueAnalyticsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'compliance':
        return <CompliancePage />;
      case 'settings':
        return <SettingsPage onSignOut={handleSignOut} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-950">
      <Sidebar 
        onNavigate={setCurrentPage} 
        activePage={currentPage}
        onSignOut={handleSignOut}
      />
      <main className="flex-1 overflow-y-auto bg-gray-950">
        <DashboardHeader />
        {renderPage()}
      </main>
    </div>
  );
}

export default App;