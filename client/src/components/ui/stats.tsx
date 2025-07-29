import { ReactNode } from 'react';

interface StatsCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
}

export function StatsCard({ value, label, icon }: StatsCardProps) {
  return (
    <div className="text-center">
      {icon && <div className="flex justify-center mb-2">{icon}</div>}
      <div className="text-4xl font-bold text-kerit-yellow mb-2">{value}</div>
      <div className="text-kerit-light">{label}</div>
    </div>
  );
}

interface StatsGridProps {
  children: ReactNode;
  className?: string;
}

export function StatsGrid({ children, className = '' }: StatsGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {children}
    </div>
  );
}
