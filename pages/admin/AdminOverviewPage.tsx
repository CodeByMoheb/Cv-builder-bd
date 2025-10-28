import React, { useState, useEffect } from 'react';
import { AdminStats } from '../../types';
import * as api from '../../services/api';
import StatCard from '../../components/admin/StatCard';
import { UsersIcon, DocumentTextIcon } from '../../components/ui/Icons';

const AdminOverviewPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboardStats()
      .then(setStats)
      .catch(err => console.error("Failed to fetch stats", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (!stats) return <div>Failed to load dashboard statistics.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers.toString()} icon={<UsersIcon className="w-8 h-8"/>} />
        <StatCard title="Resumes Created" value={stats.totalResumes.toString()} icon={<DocumentTextIcon className="w-8 h-8"/>} />
        <StatCard title="Blog Posts" value={stats.totalBlogPosts.toString()} icon={<PencilIcon className="w-8 h-8"/>} />
        <StatCard title="Total Revenue" value={`৳${stats.totalRevenue.toFixed(2)}`} icon={<BkashIcon className="w-8 h-8"/>} />
      </div>
       {/* Future development: Add charts and recent activity logs here */}
    </div>
  );
};


const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);
const BkashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M208.1 36.1C184.8 19.3 156.4 8 126.8 8c-67.6 0-120.4 51.5-120.4 122.2 0 44.5 20.8 83.1 53.8 104.2 2.3 1.5 5.1 1.9 7.7 1.3 2.7-.6 4.9-2.4 6.2-4.9l20.4-38.3c1-2 1.2-4.4.5-6.6-3.8-12.2-5.9-25.1-5.9-38.3 0-45.6 30.6-83.9 72.8-83.9 4.3 0 8.5.3 12.6 1 .2.1.5.1.8.2 2.5.4 4.9 1.5 6.8 3.1l29.4 25.5c1.4 1.2 3.1 1.9 4.9 1.9h.2c1.7 0 3.3-.6 4.7-1.7l14.8-11.9c2.8-2.3 3.6-6.2 1.8-9.4z" fill="#D82A7D"/>
    <path d="M126.8 248c-32.9 0-62.7-12.8-84.7-33.6 31.9 19.3 70.3 22.3 103 8.3 21-9.1 37.8-24.8 48.7-44.5l-20.4-38.3c-.7-1.3-1.8-2.3-3.1-2.9-10.4-4.8-21.7-7.4-33.5-7.4-42.2 0-72.8 38.3-72.8 83.9 0 13.2 2.1 26.1 5.9 38.3.7 2.2.5 4.6-.5 6.6l-20.4 38.3c-1.3 2.5-3.5 4.3-6.2 4.9-2.6.6-5.4.2-7.7-1.3z" fill="#E2136E"/>
  </svg>
);

export default AdminOverviewPage;
