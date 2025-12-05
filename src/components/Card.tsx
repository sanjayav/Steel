import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  noBorder?: boolean
}

export default function Card({ children, className = '', hover = true, noBorder = false }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)' } : {}}
      transition={{ duration: 0.2 }}
      className={`
        glass-card rounded-lg p-6
        ${noBorder ? '' : 'border border-divider'}
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

