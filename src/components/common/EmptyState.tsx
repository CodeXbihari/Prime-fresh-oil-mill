import React from 'react';
import { LucideIcon, PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = PackageOpen,
  title,
  description,
  actionText,
  actionLink,
  onActionClick
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border-2 border-dashed border-cream-300 bg-cream-50/60 my-6">
      <div className="w-16 h-16 rounded-2xl bg-mustard-100 flex items-center justify-center text-mustard-700 mb-4 shadow-inner">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-forest-950 font-serif mb-2">{title}</h3>
      <p className="text-slate-600 max-w-md text-sm mb-6 leading-relaxed">{description}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-forest-900 text-cream-50 hover:bg-forest-800 font-semibold text-sm transition-colors shadow-md hover:shadow-lg"
        >
          {actionText}
        </Link>
      )}
      {actionText && onActionClick && !actionLink && (
        <button
          onClick={onActionClick}
          className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-forest-900 text-cream-50 hover:bg-forest-800 font-semibold text-sm transition-colors shadow-md hover:shadow-lg"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

