import { ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  GitBranch, 
  Leaf, 
  Recycle, 
  Shield, 
  AlertTriangle, 
  Database, 
  FileText, 
  TrendingUp,
  ShieldCheck,
  LogOut 
} from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const navItems = [
  { path: '/', icon: Home, label: 'ESPR & DPP' },
  { path: '/traceability', icon: GitBranch, label: 'Traceability' },
  { path: '/carbon', icon: Leaf, label: 'Carbon' },
  { path: '/circularity', icon: Recycle, label: 'Circularity' },
  { path: '/durability', icon: Shield, label: 'Durability' },
  { path: '/end-of-life', icon: AlertTriangle, label: 'End-of-Life' },
  { path: '/data-quality', icon: Database, label: 'Data Quality' },
  { path: '/documents', icon: FileText, label: 'Documents' },
  { path: '/commercial', icon: TrendingUp, label: 'Commercial' },
  { path: '/passport', icon: ShieldCheck, label: 'Green Steel Passport' },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-20 steel-gradient brushed-steel border-r border-divider flex flex-col items-center py-8 gap-4 sticky top-0 h-screen"
      >
        {/* Logo */}
        <div className="mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center font-extrabold text-background text-xl">
            GS
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    relative w-14 h-14 rounded-lg flex items-center justify-center
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-primary text-background shadow-glow-primary' 
                      : 'bg-card/50 text-gray-400 hover:text-primary hover:bg-card'
                    }
                  `}
                >
                  <Icon size={24} />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-lg flex items-center justify-center
                   bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300
                   transition-all duration-200 group relative"
          title="Logout"
        >
          <LogOut size={24} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-card rounded text-xs whitespace-nowrap
                        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Logout
          </div>
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}

