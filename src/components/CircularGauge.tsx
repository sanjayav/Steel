import { motion } from 'framer-motion'

interface CircularGaugeProps {
  value: number
  maxValue: number
  size?: number
  label: string
  color?: string
}

export default function CircularGauge({ 
  value, 
  maxValue, 
  size = 200, 
  label,
  color = '#00D48E' 
}: CircularGaugeProps) {
  const percentage = (value / maxValue) * 100
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1F2933"
            strokeWidth={strokeWidth}
            fill="none"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${color})`
            }}
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-primary number-tile">
            {value}
          </span>
          <span className="text-sm text-gray-400 mt-1">
            / {maxValue}
          </span>
        </div>
      </div>
      
      <div className="text-center mt-4 text-sm font-semibold text-gray-300">
        {label}
      </div>
    </div>
  )
}

