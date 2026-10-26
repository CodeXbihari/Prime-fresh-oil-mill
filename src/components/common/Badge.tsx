import React from 'react';
import { OrderStatus } from '../../types';

interface BadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, size = 'md' }) => {
  const getStyles = () => {
    switch (status) {
      case 'Requested':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Quotation Sent':
        return 'bg-purple-100 text-purple-900 border-purple-300 font-semibold';
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 font-semibold';
      case 'Processing':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Dispatched':
        return 'bg-cyan-100 text-cyan-900 border-cyan-300 font-semibold';
      case 'Delivered':
        return 'bg-forest-100 text-forest-900 border-forest-300 font-semibold';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3.5 py-1.5'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm ${getStyles()} ${sizeClasses[size]}`}
    >
      <span className={`h-2 w-2 rounded-full ${
        status === 'Requested' ? 'bg-amber-500 animate-pulse' :
        status === 'Quotation Sent' ? 'bg-purple-600' :
        status === 'Confirmed' ? 'bg-emerald-600' :
        status === 'Processing' ? 'bg-blue-600 animate-spin' :
        status === 'Dispatched' ? 'bg-cyan-600' :
        status === 'Delivered' ? 'bg-forest-700' : 'bg-rose-500'
      }`} />
      {status}
    </span>
  );
};

