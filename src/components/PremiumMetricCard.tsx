import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface PremiumMetricCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  value?: string;
  badge?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  variant?: 'emerald' | 'blue' | 'gold' | 'purple';
  className?: string;
  children?: ReactNode;
}

export default function PremiumMetricCard({
  icon: Icon,
  title,
  description,
  value,
  badge,
  trend,
  trendLabel,
  variant = 'emerald',
  className = '',
  children
}: PremiumMetricCardProps) {
  const variantStyles = {
    emerald: {
      gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
      border: 'border-emerald-500/30 hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20',
      badgeText: 'text-emerald-300',
      badgeBorder: 'border-emerald-500/30'
    },
    blue: {
      gradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
      border: 'border-blue-500/30 hover:border-blue-500/50',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      badgeBg: 'bg-blue-500/20',
      badgeText: 'text-blue-300',
      badgeBorder: 'border-blue-500/30'
    },
    gold: {
      gradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
      border: 'border-amber-500/30 hover:border-amber-500/50',
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/20',
      badgeText: 'text-amber-300',
      badgeBorder: 'border-amber-500/30'
    },
    purple: {
      gradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
      border: 'border-purple-500/30 hover:border-purple-500/50',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
      badgeBg: 'bg-purple-500/20',
      badgeText: 'text-purple-300',
      badgeBorder: 'border-purple-500/30'
    }
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${styles.gradient} border-2 ${styles.border} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-${variant}-500/20 ${className}`}
    >
      {/* Animated background shimmer */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`h-14 w-14 rounded-2xl ${styles.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <Icon className={`h-7 w-7 ${styles.iconColor}`} />
          </div>
          
          {badge && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles.badgeBg} ${styles.badgeText} border ${styles.badgeBorder}`}>
              {badge}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 text-premium-heading">
          {title}
        </h3>
        
        <p className="text-white/70 text-sm mb-4 text-premium-body">
          {description}
        </p>

        {value && (
          <div className="mb-3">
            <div className="text-3xl font-bold text-white">
              {value}
            </div>
          </div>
        )}

        {trend && trendLabel && (
          <div className="flex items-center gap-2 text-sm">
            <span className={`
              ${trend === 'down' ? 'text-emerald-400' : ''}
              ${trend === 'up' ? 'text-red-400' : ''}
              ${trend === 'neutral' ? 'text-gray-400' : ''}
              font-medium
            `}>
              {trend === 'down' && '↓'}
              {trend === 'up' && '↑'}
              {trend === 'neutral' && '→'}
              {' '}{trendLabel}
            </span>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
