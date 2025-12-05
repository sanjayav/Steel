import { motion } from 'framer-motion'
import { Check, Circle, X } from 'lucide-react'

type Status = 'completed' | 'partial' | 'missing'

interface StatusBadgeProps {
  status: Status
  label: string
  onClick?: () => void
}

export default function StatusBadge({ status, label, onClick }: StatusBadgeProps) {
  const configs = {
    completed: {
      icon: Check,
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/50',
      glow: 'shadow-glow-primary',
    },
    partial: {
      icon: Circle,
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/50',
      glow: '',
    },
    missing: {
      icon: X,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      border: 'border-red-500/50',
      glow: '',
    },
  }

  const config = configs[status]
  const Icon = config.icon

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        flex items-center gap-3 p-4 rounded-lg border
        ${config.bg} ${config.border} ${config.glow}
        transition-all duration-200 cursor-pointer
      `}
    >
      <Icon className={config.color} size={20} />
      <span className="text-sm font-medium text-gray-300">{label}</span>
    </motion.div>
  )
}

