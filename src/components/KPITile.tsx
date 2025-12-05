import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface KPITileProps {
  value: string | number
  label: string
  unit?: string
  reference?: string
  icon?: ReactNode
  highlighted?: boolean
}

export default function KPITile({ value, label, unit, reference, icon, highlighted }: KPITileProps) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)' }}
      transition={{ duration: 0.2 }}
      className={`
        glass-card rounded-lg p-6 border
        ${highlighted 
          ? 'border-primary shadow-glow-primary' 
          : 'border-divider hover:border-primary/50'
        }
        transition-all duration-200
      `}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl number-tile text-primary">
              {value}
            </span>
            {unit && (
              <span className="text-lg text-gray-400">{unit}</span>
            )}
          </div>
        </div>
        {icon && (
          <div className="text-primary opacity-70">
            {icon}
          </div>
        )}
      </div>
      
      <div className="text-sm font-semibold text-gray-300 mb-1">
        {label}
      </div>
      
      {reference && (
        <div className="text-xs text-gray-500 mt-2">
          {reference}
        </div>
      )}
    </motion.div>
  )
}

