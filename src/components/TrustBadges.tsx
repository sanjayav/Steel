import { LucideIcon } from 'lucide-react';

interface ClimateRatingBadgeProps {
    rating: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    className?: string;
}

export function ClimateRatingBadge({ rating, size = 'md', showLabel = true, className = '' }: ClimateRatingBadgeProps) {
    const sizeClasses = {
        sm: 'text-lg px-3 py-1',
        md: 'text-2xl px-5 py-2',
        lg: 'text-4xl px-7 py-3'
    };

    const ratingColors = {
        'A+': 'bg-emerald-500 border-emerald-400 shadow-emerald-500/50',
        'A': 'bg-emerald-600 border-emerald-500 shadow-emerald-600/50',
        'B+': 'bg-blue-500 border-blue-400 shadow-blue-500/50',
        'B': 'bg-blue-600 border-blue-500 shadow-blue-600/50',
        'C': 'bg-amber-500 border-amber-400 shadow-amber-500/50',
        'D': 'bg-red-500 border-red-400 shadow-red-500/50'
    };

    return (
        <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
            <div className={`${sizeClasses[size]} ${ratingColors[rating]} border-2 rounded-2xl font-bold text-white shadow-2xl flex items-center justify-center min-w-[4rem] hover:scale-105 transition-transform duration-300`}>
                {rating}
            </div>
            {showLabel && (
                <span className="text-xs text-white/70 font-medium">Climate Rating</span>
            )}
        </div>
    );
}

interface CircularityScoreBadgeProps {
    score: number; // 0-100
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    className?: string;
}

export function CircularityScoreBadge({ score, size = 'md', showLabel = true, className = '' }: CircularityScoreBadgeProps) {
    const sizeClasses = {
        sm: 'text-lg px-3 py-1',
        md: 'text-2xl px-5 py-2',
        lg: 'text-4xl px-7 py-3'
    };

    const getColor = (score: number) => {
        if (score >= 90) return 'bg-emerald-500 border-emerald-400 shadow-emerald-500/50';
        if (score >= 75) return 'bg-teal-500 border-teal-400 shadow-teal-500/50';
        if (score >= 60) return 'bg-blue-500 border-blue-400 shadow-blue-500/50';
        if (score >= 40) return 'bg-amber-500 border-amber-400 shadow-amber-500/50';
        return 'bg-orange-500 border-orange-400 shadow-orange-500/50';
    };

    const getLabel = (score: number) => {
        if (score >= 90) return 'Top 10%';
        if (score >= 75) return 'Top 25%';
        if (score >= 60) return 'Above Average';
        if (score >= 40) return 'Average';
        return 'Below Average';
    };

    return (
        <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
            <div className={`${sizeClasses[size]} ${getColor(score)} border-2 rounded-2xl font-bold text-white shadow-2xl flex items-center justify-center min-w-[5rem] hover:scale-105 transition-transform duration-300`}>
                {score}%
            </div>
            {showLabel && (
                <div className="text-center">
                    <div className="text-xs text-white/70 font-medium">Circularity Score</div>
                    <div className="text-xs text-emerald-400 font-semibold">{getLabel(score)}</div>
                </div>
            )}
        </div>
    );
}

interface VerificationBadgeProps {
    icon: LucideIcon;
    label: string;
    verified: boolean;
    verifier?: string;
    date?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function VerificationBadge({
    icon: Icon,
    label,
    verified,
    verifier,
    date,
    size = 'md',
    className = ''
}: VerificationBadgeProps) {
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    };

    return (
        <div
            className={`${sizeClasses[size]} inline-flex items-center gap-2 rounded-full transition-all duration-300 hover:scale-105 ${verified
                    ? 'bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/20'
                    : 'bg-gray-500/20 border-2 border-gray-500/50 text-gray-400'
                } ${className}`}
        >
            <Icon className={`h-4 w-4 ${verified ? 'text-emerald-400' : 'text-gray-500'}`} />
            <div className="flex flex-col items-start">
                <span className="font-semibold">{label}</span>
                {verifier && (
                    <span className="text-xs opacity-75">
                        {verifier} {date && `• ${date}`}
                    </span>
                )}
            </div>
            {verified && (
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
        </div>
    );
}

interface ComplianceBadgeProps {
    standard: string;
    compliant: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function ComplianceBadge({ standard, compliant, size = 'md', className = '' }: ComplianceBadgeProps) {
    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base'
    };

    return (
        <div
            className={`${sizeClasses[size]} inline-flex items-center gap-1.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${compliant
                    ? 'bg-emerald-500/90 text-white shadow-lg shadow-emerald-500/30'
                    : 'bg-gray-600/90 text-gray-300'
                } ${className}`}
        >
            <span>{compliant ? '✓' : '✗'}</span>
            <span>{standard}</span>
        </div>
    );
}
