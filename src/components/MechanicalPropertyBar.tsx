import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MechanicalPropertyBarProps {
    label: string;
    value: number;
    unit: string;
    min: number;
    max: number;
    required?: number;
    passed?: boolean;
    color?: 'emerald' | 'blue' | 'purple' | 'amber';
    className?: string;
}

export default function MechanicalPropertyBar({
    label,
    value,
    unit,
    min,
    max,
    required,
    passed = true,
    color = 'emerald',
    className = ''
}: MechanicalPropertyBarProps) {
    const [animatedValue, setAnimatedValue] = useState(0);

    const colorClasses = {
        emerald: {
            bar: 'from-emerald-500 to-emerald-600',
            glow: 'shadow-emerald-500/50',
            text: 'text-emerald-400',
            bg: 'bg-emerald-500/10'
        },
        blue: {
            bar: 'from-blue-500 to-blue-600',
            glow: 'shadow-blue-500/50',
            text: 'text-blue-400',
            bg: 'bg-blue-500/10'
        },
        purple: {
            bar: 'from-purple-500 to-purple-600',
            glow: 'shadow-purple-500/50',
            text: 'text-purple-400',
            bg: 'bg-purple-500/10'
        },
        amber: {
            bar: 'from-amber-500 to-amber-600',
            glow: 'shadow-amber-500/50',
            text: 'text-amber-400',
            bg: 'bg-amber-500/10'
        }
    };

    const styles = colorClasses[color];
    const percentage = ((value - min) / (max - min)) * 100;
    const requiredPercentage = required ? ((required - min) / (max - min)) * 100 : undefined;

    useEffect(() => {
        const duration = 1500;
        const steps = 60;
        const interval = duration / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            setAnimatedValue(Math.floor(value * progress));

            if (currentStep >= steps) {
                clearInterval(timer);
                setAnimatedValue(value);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <div className={`flex flex-col gap-3 p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="text-white font-semibold">{label}</h4>
                        {passed !== undefined && (
                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                                }`}>
                                {passed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                                {passed ? 'Passed' : 'Failed'}
                            </div>
                        )}
                    </div>
                    {required && (
                        <p className="text-xs text-white/50 mt-1">
                            Required: ≥ {required} {unit}
                        </p>
                    )}
                </div>
                <div className="text-right">
                    <div className={`text-2xl font-bold ${styles.text}`}>
                        {animatedValue}
                        <span className="text-sm ml-1">{unit}</span>
                    </div>
                </div>
            </div>

            {/* Vertical Bar Container */}
            <div className="relative w-full">
                {/* Background bar */}
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden relative">
                    {/* Required marker line */}
                    {requiredPercentage !== undefined && (
                        <div
                            className="absolute top-0 bottom-0 w-0.5 bg-white/40 z-10"
                            style={{ left: `${requiredPercentage}%` }}
                        >
                            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-[10px] text-white/60 whitespace-nowrap">
                                ↓
                            </div>
                        </div>
                    )}

                    {/* Progress bar */}
                    <div
                        className={`h-full bg-gradient-to-r ${styles.bar} rounded-full transition-all duration-1500 ease-out shadow-lg ${styles.glow} relative`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 shimmer opacity-50" />
                    </div>
                </div>

                {/* Scale labels */}
                <div className="flex justify-between mt-1 text-xs text-white/40">
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>
        </div>
    );
}
