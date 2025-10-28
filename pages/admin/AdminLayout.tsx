import React from 'react';
import { PageState } from '../../App';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminOverviewPage from './AdminOverviewPage';
import UserManagementPage from './UserManagementPage';
import TemplateManagementPage from './TemplateManagementPage';
import BlogManagementPage from './BlogManagementPage';
import PaymentManagementPage from './PaymentManagementPage';

interface AdminLayoutProps {
  onNavigate: (page: PageState) => void;
  section: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ onNavigate, section }) => {
  const renderSection = () => {
    switch (section) {
      case 'users':
        return <UserManagementPage />;
      case 'templates':
        return <TemplateManagementPage />;
      case 'blog':
        return <BlogManagementPage />;
      case 'payments':
        return <PaymentManagementPage />;
      case 'overview':
      default:
        return <AdminOverviewPage />;
    }
  };

  return (
    <div className="flex bg-secondary">
      <AdminSidebar onNavigate={onNavigate} activeSection={section} />
      <main className="flex-1 h-screen overflow-y-auto p-8">
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminLayout;
