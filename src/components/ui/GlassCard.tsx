import React from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

export function GlassCard({ children, className, title, action }: GlassCardProps) {
  return (
    <div className={cn("glass-dark rounded-2xl p-5 overflow-hidden flex flex-col", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-sm font-bold tracking-tight text-white uppercase opacity-70">{title}</h3>}
          {action && action}
        </div>
      )}
      {children}
    </div>
  );
}
