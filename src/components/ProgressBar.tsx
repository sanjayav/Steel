import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  maxValue?: number
  label?: string
  color?: string
  height?: string
  showPercentage?: boolean
  segments?: Array<{ value: number; color: string; label: string }>
}

export default function ProgressBar({ 
  value, 
  maxValue = 100,
  label,
  color = '#00D48E',
  height = 'h-3',
  showPercentage = true,
  segments
}: ProgressBarProps) {
  const percentage = (value / maxValue) * 100

  if (segments) {
    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-300">{label}</span>
          </div>
        )}
        <div className={`w-full bg-card rounded-full overflow-hidden ${height} flex`}>
          {segments.map((segment, index) => {
            const segmentPercentage = (segment.value / maxValue) * 100
            return (
              <motion.div
                key={index}
                initial={{ width: 0 }}
                animate={{ width: `${segmentPercentage}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative group"
                style={{ backgroundColor: segment.color }}
              >
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                              bg-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100
                              transition-opacity whitespace-nowrap pointer-events-none">
                  {segment.label}: {segment.value}%
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold text-primary">{percentage.toFixed(1)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-card rounded-full overflow-hidden ${height}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}`
          }}
        />
      </div>
    </div>
  )
}

