import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border flex items-center gap-4">
      <div className="bg-primary/10 text-primary p-3 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-muted">{title}</p>
        <p className="text-2xl font-bold text-dark">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
