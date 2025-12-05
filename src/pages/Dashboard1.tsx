import { motion } from 'framer-motion'
import KPITile from '../components/KPITile'
import Card from '../components/Card'
import CircularGauge from '../components/CircularGauge'
import StatusBadge from '../components/StatusBadge'
import { Shield, Leaf, Recycle, Zap, Target, CheckCircle } from 'lucide-react'

export default function Dashboard1() {
  const kpis = [
    { value: '1.42', label: 'Product Carbon Footprint', unit: 'tCO₂e/t', reference: 'ESPR DA 2026', icon: <Leaf size={24} /> },
    { value: '34', label: 'Recycled Content', unit: '%', reference: 'ESPR Art. 7', icon: <Recycle size={24} /> },
    { value: 'Published', label: 'DPP Status', reference: 'EU Regulation 2024', icon: <CheckCircle size={24} />, highlighted: true },
    { value: '67', label: 'Renewable Energy', unit: '%', reference: 'CBAM 2026', icon: <Zap size={24} /> },
    { value: '8.2', label: 'Circularity Score', unit: '/10', reference: 'ESPR Framework', icon: <Target size={24} /> },
  ]

  const complianceItems = [
    { status: 'completed' as const, label: 'Product Carbon Footprint (PCF)' },
    { status: 'completed' as const, label: 'Recycled Content Declaration' },
    { status: 'completed' as const, label: 'Material Composition' },
    { status: 'completed' as const, label: 'Energy Source Mix' },
    { status: 'partial' as const, label: 'Durability & Reparability Index' },
    { status: 'completed' as const, label: 'End-of-Life Instructions' },
    { status: 'partial' as const, label: 'Substances of Concern (SoC)' },
    { status: 'completed' as const, label: 'Chain-of-Custody Verification' },
    { status: 'missing' as const, label: 'Water Consumption Data' },
    { status: 'completed' as const, label: 'Verifiable Credentials (VCs)' },
    { status: 'completed' as const, label: 'EPCIS Event History' },
    { status: 'partial' as const, label: 'Circular Design Score' },
  ]

  return (
    <div className="p-8 min-h-screen">
      {/* Scanning animation overlay */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: [0, 0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="fixed top-0 left-20 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent pointer-events-none"
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Shield className="text-primary" size={40} />
          ESPR & DPP Compliance Overview
        </h1>
        <p className="text-gray-400">Real-time regulatory compliance dashboard</p>
      </div>

      {/* Top Ribbon - KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {kpis.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <KPITile {...kpi} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Compliance Score */}
        <Card className="lg:col-span-1 flex flex-col items-center justify-center">
          <CircularGauge
            value={87}
            maxValue={100}
            size={220}
            label="ESPR Compliance Score"
          />
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mt-8 flex items-center gap-3 bg-primary/10 border border-primary/50 
                       rounded-lg px-6 py-3 shadow-glow-primary"
          >
            <Shield className="text-primary" size={24} />
            <div>
              <div className="text-sm font-semibold text-primary">ESPR-READY</div>
              <div className="text-xs text-gray-400">Verified Status</div>
            </div>
          </motion.div>
        </Card>

        {/* Compliance Checklist Grid */}
        <Card className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Compliance Checklist</h2>
            <p className="text-sm text-gray-400">
              Track ESPR data point completion status
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {complianceItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <StatusBadge {...item} />
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 pt-6 border-t border-divider grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">9</div>
              <div className="text-xs text-gray-400 mt-1">Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500">3</div>
              <div className="text-xs text-gray-400 mt-1">Partial</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500">1</div>
              <div className="text-xs text-gray-400 mt-1">Missing</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="text-primary" size={20} />
            DPP Publication
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Status</span>
              <span className="text-sm font-semibold text-primary">Published</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Version</span>
              <span className="text-sm font-semibold">2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Last Updated</span>
              <span className="text-sm font-semibold">Nov 12, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">DPP ID</span>
              <span className="text-sm font-mono text-secondary">DPP-8A3F92</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Regulatory Timeline</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              <div>
                <div className="text-sm font-semibold">ESPR Delegated Act</div>
                <div className="text-xs text-gray-400">Effective: Jan 2026</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
              <div>
                <div className="text-sm font-semibold">CBAM Reporting</div>
                <div className="text-xs text-gray-400">Mandatory: Oct 2026</div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-500 mt-2" />
              <div>
                <div className="text-sm font-semibold">DPP Obligation</div>
                <div className="text-xs text-gray-400">Full: Jan 2027</div>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Third-Party Audit</span>
              <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                Verified
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Data Quality</span>
              <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                Level 4
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Next Audit</span>
              <span className="text-sm font-semibold">Feb 2026</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Auditor</span>
              <span className="text-sm font-semibold">TÜV SÜD</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

