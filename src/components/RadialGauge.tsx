import { useEffect, useState } from 'react';

interface RadialGaugeProps {
    value: number; // 0-100
    max?: number;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    label?: string;
    sublabel?: string;
    color?: 'emerald' | 'blue' | 'gold' | 'purple';
    showPercentage?: boolean;
    animated?: boolean;
    className?: string;
}

export default function RadialGauge({
    value,
    max = 100,
    size = 'md',
    label,
    sublabel,
    color = 'emerald',
    showPercentage = true,
    animated = true,
    className = ''
}: RadialGaugeProps) {
    const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

    const sizeClasses = {
        sm: { container: 'w-24 h-24', stroke: 6, fontSize: 'text-lg', labelSize: 'text-xs' },
        md: { container: 'w-32 h-32', stroke: 8, fontSize: 'text-2xl', labelSize: 'text-sm' },
        lg: { container: 'w-48 h-48', stroke: 10, fontSize: 'text-4xl', labelSize: 'text-base' },
        xl: { container: 'w-64 h-64', stroke: 12, fontSize: 'text-5xl', labelSize: 'text-lg' }
    };

    const colorClasses = {
        emerald: {
            trail: 'stroke-emerald-500/20',
            path: 'stroke-emerald-500',
            glow: 'drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]',
            text: 'text-emerald-400'
        },
        blue: {
            trail: 'stroke-blue-500/20',
            path: 'stroke-blue-500',
            glow: 'drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]',
            text: 'text-blue-400'
        },
        gold: {
            trail: 'stroke-amber-500/20',
            path: 'stroke-amber-500',
            glow: 'drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]',
            text: 'text-amber-400'
        },
        purple: {
            trail: 'stroke-purple-500/20',
            path: 'stroke-purple-500',
            glow: 'drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]',
            text: 'text-purple-400'
        }
    };

    const styles = sizeClasses[size];
    const colors = colorClasses[color];

    // Get the integer part of the container size (assuming square)
    const containerSize = parseInt(styles.container.split(' ')[0].replace('w-', '')) * 4; // Convert to pixels (assuming 1 = 4px)
    const radius = (containerSize / 2) - (styles.stroke * 2);
    const circumference = 2 * Math.PI * radius;
    const percentage = Math.min(Math.max((displayValue / max) * 100, 0), 100);
    const offset = circumference - (percentage / 100) * circumference;

    useEffect(() => {
        if (!animated) return;

        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            setDisplayValue(Math.floor(value * progress));

            if (currentStep >= steps) {
                clearInterval(timer);
                setDisplayValue(value);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [value, animated]);

    return (
        <div className={`flex flex-col items-center gap-3 ${className}`}>
            <div className={`relative ${styles.container}`}>
                <svg className="transform -rotate-90 w-full h-full">
                    {/* Background circle */}
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        strokeWidth={styles.stroke}
                        className={`fill-none ${colors.trail}`}
                    />
                    {/* Progress circle */}
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        strokeWidth={styles.stroke}
                        strokeLinecap="round"
                        className={`fill-none ${colors.path} ${colors.glow} transition-all duration-1000 ease-out`}
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: offset
                        }}
                    />
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`font-bold ${styles.fontSize} ${colors.text}`}>
                        {Math.round(percentage)}
                        {showPercentage && <span className="text-sm">%</span>}
                    </div>
                </div>
            </div>

            {label && (
                <div className="text-center">
                    <div className={`font-semibold text-white ${styles.labelSize}`}>
                        {label}
                    </div>
                    {sublabel && (
                        <div className="text-white/60 text-xs mt-1">
                            {sublabel}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
