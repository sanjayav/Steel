import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import {
  Mountain,
  Boxes,
  Flame,
  Factory,
  Zap,
  Package,
  Cpu,
  Shield,
  Truck,
  RefreshCw,
  MapPin,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Download,
  FileText,
  AlertTriangle,
  Activity,
  Leaf,
  BarChart3,
  Hash,
  Calendar,
  Award,
  ShieldCheck,
  CircleDot,
  ExternalLink,
  Target
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'

interface Stage {
  id: string
  name: string
  icon: any
  status: 'verified' | 'pending' | 'broken'
  actor: string
  location: string
  coordinates: [number, number]
  timestamp: string
  co2Intensity: number
  renewableShare: number
  verificationLevel: string
  hasEPD: boolean
  hasCert: boolean
  hasAudit: boolean
}

const stages: Stage[] = [
  { id: '1', name: 'Mining', icon: Mountain, status: 'verified', actor: 'Vale S.A.', location: 'Carajás, Brazil', coordinates: [-6.0626, -50.1546], timestamp: '2024-03-15', co2Intensity: 0.12, renewableShare: 85, verificationLevel: 'VC Signed', hasEPD: true, hasCert: true, hasAudit: true },
  { id: '2', name: 'Pelletizing', icon: Boxes, status: 'verified', actor: 'Pellet Corp', location: 'Vitória, Brazil', coordinates: [-20.3155, -40.3128], timestamp: '2024-04-02', co2Intensity: 0.08, renewableShare: 72, verificationLevel: 'VC Signed', hasEPD: true, hasCert: true, hasAudit: true },
  { id: '3', name: 'Coking', icon: Flame, status: 'verified', actor: 'Coke Industries', location: 'IJmuiden, NL', coordinates: [52.4619, 4.5957], timestamp: '2024-05-10', co2Intensity: 0.18, renewableShare: 45, verificationLevel: 'VC Signed', hasEPD: true, hasCert: true, hasAudit: false },
  { id: '4', name: 'DRI/BF', icon: Factory, status: 'verified', actor: 'Tata Steel', location: 'IJmuiden, NL', coordinates: [52.4619, 4.5957], timestamp: '2024-06-01', co2Intensity: 0.52, renewableShare: 67, verificationLevel: 'VC Signed', hasEPD: true, hasCert: true, hasAudit: true },
  { id: '5', name: 'BOF/EAF', icon: Zap, status: 'verified', actor: 'Tata Steel', location: 'IJmuiden, NL', coordinates: [52.4619, 4.5957], timestamp: '2024-06-15', co2Intensity: 0.18, renewableShare: 78, verificationLevel: 'VC Signed', hasEPD: true, hasCert: true, hasAudit: true },
  { id: '6', name: 'Casting', icon: Package, status: 'verified', actor: 'Tata Steel', location: 'IJmuiden, NL', coordinates: [52.4619, 4.5957], timestamp: '2024-07-01', co2Intensity: 0.07, renewableShare: 68, verificationLevel: 'VC Signed', hasEPD: true, hasCert: true, hasAudit: true },
  { id: '7', name: 'Rolling', icon: Cpu, status: 'pending', actor: 'Tata Steel', location: 'IJmuiden, NL', coordinates: [52.4619, 4.5957], timestamp: '2024-08-12', co2Intensity: 0.09, renewableShare: 65, verificationLevel: 'Pending', hasEPD: true, hasCert: true, hasAudit: false },
  { id: '8', name: 'Coating', icon: Shield, status: 'verified', actor: 'Tata Steel', location: 'IJmuiden, NL', coordinates: [52.4619, 4.5957], timestamp: '2024-09-05', co2Intensity: 0.06, renewableShare: 70, verificationLevel: 'VC Signed', hasEPD: true, hasCert: true, hasAudit: true },
  { id: '9', name: 'Component', icon: Package, status: 'verified', actor: 'Auto Parts Ltd', location: 'Stuttgart, DE', coordinates: [48.7758, 9.1829], timestamp: '2024-10-10', co2Intensity: 0.05, renewableShare: 62, verificationLevel: 'VC Signed', hasEPD: true, hasCert: true, hasAudit: true },
  { id: '10', name: 'OEM', icon: Factory, status: 'verified', actor: 'Mercedes-Benz', location: 'Stuttgart, DE', coordinates: [48.7758, 9.1829], timestamp: '2024-10-25', co2Intensity: 0.04, renewableShare: 55, verificationLevel: 'VC Signed', hasEPD: true, hasCert: true, hasAudit: true },
  { id: '11', name: 'Logistics', icon: Truck, status: 'verified', actor: 'DHL Logistics', location: 'In Transit', coordinates: [50.1109, 8.6821], timestamp: '2024-11-01', co2Intensity: 0.03, renewableShare: 0, verificationLevel: 'VC Signed', hasEPD: false, hasCert: true, hasAudit: true },
  { id: '12', name: 'Recycling', icon: RefreshCw, status: 'verified', actor: 'ELV Recyclers', location: 'Future', coordinates: [48.7758, 9.1829], timestamp: 'TBD', co2Intensity: 0.0, renewableShare: 0, verificationLevel: 'Planned', hasEPD: false, hasCert: false, hasAudit: false },
]

const pcfWaterfallData = [
  { name: 'Mining', value: 0.12 },
  { name: 'Pelletizing', value: 0.08 },
  { name: 'Coking', value: 0.18 },
  { name: 'DRI/BF', value: 0.52 },
  { name: 'BOF/EAF', value: 0.18 },
  { name: 'Casting', value: 0.07 },
  { name: 'Rolling', value: 0.09 },
  { name: 'Coating', value: 0.06 },
]

const energyMixData = [
  { name: 'Renewable', value: 56, color: '#00D48E' },
  { name: 'Grid', value: 32, color: '#4ED0FF' },
  { name: 'Fossil', value: 12, color: '#666666' },
]

const epcisEvents = [
  { type: 'Commissioning', icon: CircleDot, time: '2024-03-15 08:23', hash: 'a3f9c2...4e7b', signer: 'Vale S.A.' },
  { type: 'Transformation', icon: Zap, time: '2024-04-02 14:12', hash: 'b8e1d5...9a2c', signer: 'Pellet Corp' },
  { type: 'Aggregation', icon: Package, time: '2024-05-10 09:45', hash: 'c7f2a8...3d1e', signer: 'Coke Industries' },
  { type: 'Transformation', icon: Factory, time: '2024-06-01 11:30', hash: 'd9b3c4...7f8a', signer: 'Tata Steel' },
  { type: 'Shipment', icon: Truck, time: '2024-06-15 16:45', hash: 'e2a5f1...6c9b', signer: 'Tata Steel' },
  { type: 'Audit', icon: ShieldCheck, time: '2024-10-15 13:20', hash: 'f4c8b2...1e5d', signer: 'TÜV Rheinland' },
]

// Fix default marker icons in Leaflet
const createCustomIcon = (color: string) => {
  return L.divIcon({
    html: `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.125 12.5 28.125S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z" fill="${color}"/>
      <circle cx="12.5" cy="12.5" r="5" fill="white"/>
    </svg>`,
    className: 'custom-marker-icon',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41]
  })
}

export default function Dashboard2() {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showAudit, setShowAudit] = useState(false)
  const [selectedBatch, setSelectedBatch] = useState('TS-BF11-0925')
  const [hoveredStage, setHoveredStage] = useState<Stage | null>(null)

  const totalCO2 = stages.reduce((sum, s) => sum + s.co2Intensity, 0)
  const avgRenewable = Math.round(stages.reduce((sum, s) => sum + s.renewableShare, 0) / stages.length)
  const verifiedCount = stages.filter(s => s.status === 'verified').length
  const vcSignedCount = stages.filter(s => s.verificationLevel === 'VC Signed').length
  const verificationPercentage = Math.round((vcSignedCount / stages.length) * 100)

  return (
    <div className="p-8 min-h-screen">
      {/* Context Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Truck className="text-secondary" size={40} />
          Value Chain & Traceability Map
          <span className="text-sm text-gray-500 font-normal">— Enterprise View</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Batch Selector */}
          <Card className="flex items-center justify-between" hover={false}>
            <div>
              <div className="text-xs text-gray-400 mb-1">Batch / Heat ID</div>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="bg-transparent text-lg font-bold text-primary outline-none cursor-pointer"
              >
                <option value="TS-BF11-0925">TS-BF11-0925</option>
                <option value="TS-EAF-1124">TS-EAF-1124</option>
                <option value="TS-DRI-1015">TS-DRI-1015</option>
              </select>
            </div>
            <Activity className="text-primary" size={24} />
          </Card>

          {/* Route Badge */}
          <Card className="flex items-center justify-between" hover={false}>
            <div>
              <div className="text-xs text-gray-400 mb-1">Production Route</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-lg font-bold">DRI-EAF</span>
              </div>
              <div className="text-xs text-primary mt-1">Low-Carbon Route</div>
            </div>
            <Zap className="text-primary" size={24} />
          </Card>

          {/* Verification Status */}
          <Card className="flex items-center justify-between" hover={false}>
            <div>
              <div className="text-xs text-gray-400 mb-1">Blockchain Verified</div>
              <div className="text-3xl font-extrabold text-primary number-tile">
                {verificationPercentage}%
              </div>
              <div className="text-xs text-gray-400 mt-1">{vcSignedCount}/12 VC-signed</div>
            </div>
            <ShieldCheck className="text-primary" size={24} />
          </Card>

          {/* Last Update */}
          <Card className="flex items-center justify-between" hover={false}>
            <div>
              <div className="text-xs text-gray-400 mb-1">Last Verified By</div>
              <div className="text-sm font-bold">TÜV Rheinland</div>
              <div className="text-xs text-gray-400 mt-1">12 Nov 2025</div>
            </div>
            <Award className="text-secondary" size={24} />
          </Card>
        </div>

        {/* Export Actions */}
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-primary/10 border border-primary/50 rounded-lg
                           hover:bg-primary/20 transition-colors text-primary font-semibold text-sm
                           flex items-center gap-2">
            <Download size={16} />
            Export DPP JSON
          </button>
          <button className="px-4 py-2 bg-secondary/10 border border-secondary/50 rounded-lg
                           hover:bg-secondary/20 transition-colors text-secondary font-semibold text-sm
                           flex items-center gap-2">
            <FileText size={16} />
            Download EPD Pack
          </button>
          <button
            onClick={() => setShowAudit(!showAudit)}
            className="px-4 py-2 bg-card border border-divider rounded-lg
                     hover:border-primary/50 transition-colors font-semibold text-sm
                     flex items-center gap-2">
            <Shield size={16} />
            Audit & Compliance
          </button>
        </div>
      </div>

      {/* Audit Panel */}
      <AnimatePresence>
        {showAudit && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 overflow-hidden"
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Shield className="text-primary" size={20} />
                  Audit & Compliance Panel
                </h3>
                <button onClick={() => setShowAudit(false)}>
                  <XCircle className="text-gray-400 hover:text-white" size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-background rounded-lg border border-primary/30">
                  <div className="text-xs text-gray-400 mb-1">EU DPP Status</div>
                  <div className="text-sm font-bold text-primary">Published</div>
                  <div className="text-xs text-gray-400 mt-1">Portal sync: 14 Nov 2025</div>
                </div>
                <div className="p-4 bg-background rounded-lg border border-divider">
                  <div className="text-xs text-gray-400 mb-1">Certifier</div>
                  <div className="text-sm font-bold">TÜV Rheinland</div>
                  <div className="text-xs text-secondary mt-1 font-mono">VC: 0x...e2a</div>
                </div>
                <div className="p-4 bg-background rounded-lg border border-divider">
                  <div className="text-xs text-gray-400 mb-1">Audit Trail</div>
                  <div className="text-sm font-bold">{vcSignedCount} VCs signed</div>
                  <div className="text-xs text-yellow-500 mt-1">2 pending review</div>
                </div>
                <div className="p-4 bg-background rounded-lg border border-divider">
                  <div className="text-xs text-gray-400 mb-1">Blockchain Log</div>
                  <div className="text-sm font-bold">Polygon Network</div>
                  <div className="text-xs text-secondary mt-1 font-mono">tx: 0xabc...</div>
                </div>
                <div className="p-4 bg-background rounded-lg border border-primary/30">
                  <div className="text-xs text-gray-400 mb-1">Data Quality Score</div>
                  <div className="text-2xl font-bold text-primary">92/100</div>
                  <div className="text-xs text-gray-400 mt-1">High assurance</div>
                </div>
                <div className="p-4 bg-background rounded-lg border border-divider">
                  <div className="text-xs text-gray-400 mb-1">Certification</div>
                  <div className="text-sm font-bold">ISO 14064-1</div>
                  <div className="text-xs text-gray-400 mt-1">Valid until 2026</div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
                <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="text-sm font-semibold text-yellow-500">Alerts</div>
                  <div className="text-xs text-gray-400 mt-1">
                    ⚠ Coking data missing for Batch TS-COK-A42<br />
                    🔒 EPD for Rolling expired (Renew by Dec 2025)
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chain Flow Section */}
      <Card className="mb-6 overflow-x-auto relative">
        <div className="min-w-max pb-4">
          <div className="flex items-center gap-4 relative">
            {stages.map((stage, index) => {
              const Icon = stage.icon
              const isLast = index === stages.length - 1
              const isHovered = hoveredStage?.id === stage.id

              return (
                <div key={stage.id} className="flex items-center">
                  {/* Stage Card */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      onClick={() => setSelectedStage(stage)}
                      onMouseEnter={() => setHoveredStage(stage)}
                      onMouseLeave={() => setHoveredStage(null)}
                      className={`
                        relative w-28 h-28 rounded-lg border-2 cursor-pointer
                        flex flex-col items-center justify-center gap-2
                        transition-all duration-200
                        ${stage.status === 'verified'
                          ? 'bg-primary/10 border-primary shadow-glow-primary'
                          : stage.status === 'pending'
                            ? 'bg-yellow-500/10 border-yellow-500'
                            : 'bg-red-500/10 border-red-500'
                        }
                      `}
                    >
                      <Icon
                        size={32}
                        className={
                          stage.status === 'verified'
                            ? 'text-primary'
                            : stage.status === 'pending'
                              ? 'text-yellow-500'
                              : 'text-red-500'
                        }
                      />
                      <span className="text-xs font-semibold text-center px-2">
                        {stage.name}
                      </span>

                      {/* Status Circle */}
                      <div className={`
                        absolute -top-2 -right-2 w-6 h-6 rounded-full
                        flex items-center justify-center
                        ${stage.status === 'verified'
                          ? 'bg-primary'
                          : stage.status === 'pending'
                            ? 'bg-yellow-500 animate-pulse'
                            : 'bg-red-500 animate-ping'
                        }
                      `}>
                        {stage.status === 'verified' ? (
                          <CheckCircle size={14} className="text-background" />
                        ) : stage.status === 'broken' ? (
                          <XCircle size={14} className="text-background" />
                        ) : (
                          <Clock size={14} className="text-background" />
                        )}
                      </div>
                    </motion.div>

                    {/* Enhanced Hover Tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50
                                   w-72 p-4 bg-card/95 backdrop-blur-md rounded-lg border-2 border-primary
                                   shadow-2xl"
                        >
                          <div className="space-y-3">
                            <div>
                              <div className="text-xs text-gray-400">Actor</div>
                              <div className="text-sm font-bold">{stage.actor}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <div className="text-xs text-gray-400">CO₂ Intensity</div>
                                <div className="text-lg font-bold text-primary">
                                  {stage.co2Intensity.toFixed(2)}
                                </div>
                                <div className="text-xs text-gray-400">tCO₂/t</div>
                              </div>
                              <div>
                                <div className="text-xs text-gray-400">Renewable Share</div>
                                <div className="text-lg font-bold text-secondary">
                                  {stage.renewableShare}%
                                </div>
                                <div className="text-xs text-gray-400">of energy</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 mb-1">Verification Level</div>
                              <div className={`text-sm font-bold ${stage.verificationLevel === 'VC Signed' ? 'text-primary' : 'text-yellow-500'
                                }`}>
                                {stage.verificationLevel}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 mb-1">Last Event</div>
                              <div className="text-xs font-mono text-secondary">{stage.timestamp}</div>
                            </div>
                            <div className="flex gap-2">
                              <span className={`text-xs px-2 py-1 rounded ${stage.hasEPD ? 'bg-primary/20 text-primary' : 'bg-gray-500/20 text-gray-500'
                                }`}>
                                {stage.hasEPD ? '✔' : '✗'} EPD
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${stage.hasCert ? 'bg-primary/20 text-primary' : 'bg-gray-500/20 text-gray-500'
                                }`}>
                                {stage.hasCert ? '✔' : '✗'} Cert
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${stage.hasAudit ? 'bg-primary/20 text-primary' : 'bg-yellow-500/20 text-yellow-500'
                                }`}>
                                {stage.hasAudit ? '✔' : '🔒'} Audit
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Animated Path Line */}
                  {!isLast && (
                    <div className="w-16 h-1 mx-2 bg-divider relative overflow-hidden">
                      <motion.div
                        className={`
                          absolute inset-0 h-full
                          ${stage.status === 'verified'
                            ? 'bg-primary'
                            : 'bg-yellow-500'
                          }
                        `}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        style={{
                          boxShadow: stage.status === 'verified'
                            ? '0 0 10px rgba(0, 212, 142, 0.5)'
                            : '0 0 10px rgba(234, 179, 8, 0.5)'
                        }}
                      />

                      {/* Flowing particles */}
                      <motion.div
                        className="absolute top-0 w-2 h-full bg-white rounded-full"
                        animate={{
                          x: [0, 64],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3 justify-center">
          <button
            onClick={() => setShowAnalytics(!showAnalytics)}
            className="px-6 py-2 bg-primary/10 border border-primary/50 rounded-lg
                     hover:bg-primary/20 transition-colors text-primary font-semibold text-sm
                     flex items-center gap-2">
            <BarChart3 size={16} />
            {showAnalytics ? 'Hide' : 'Show'} Analytics Panel
          </button>
          <button className="px-6 py-2 bg-secondary/10 border border-secondary/50 rounded-lg
                           hover:bg-secondary/20 transition-colors text-secondary font-semibold text-sm
                           flex items-center gap-2">
            <FileText size={16} />
            Generate Full Report
          </button>
        </div>
      </Card>

      {/* Analytics Panel */}
      <AnimatePresence>
        {showAnalytics && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="mb-6"
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <BarChart3 className="text-primary" size={24} />
                  Chain Analytics & Insights
                </h3>
                <button onClick={() => setShowAnalytics(false)}>
                  <XCircle className="text-gray-400 hover:text-white" size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Actor ESG Scores */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-gray-400">Actor ESG Performance</h4>
                  <div className="space-y-2">
                    {['Vale S.A.', 'Tata Steel', 'Mercedes-Benz', 'DHL Logistics'].map((actor, idx) => {
                      const score = [85, 92, 88, 78][idx]
                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-32 text-sm">{actor}</div>
                          <div className="flex-1">
                            <ProgressBar value={score} maxValue={100} height="h-3" showPercentage={false} />
                          </div>
                          <div className="text-sm font-bold text-primary w-12 text-right">{score}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Top Emission Contributors */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-gray-400">Top Emission Contributors</h4>
                  <ResponsiveContainer width="100%" height={150}>
                    <BarChart data={pcfWaterfallData.slice(0, 5)}>
                      <XAxis dataKey="name" stroke="#666" style={{ fontSize: '10px' }} />
                      <YAxis stroke="#666" style={{ fontSize: '10px' }} />
                      <Bar dataKey="value" fill="#00D48E" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Certification Coverage */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-gray-400">Certification Coverage</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-primary/10 border border-primary/50 rounded-lg text-center">
                      <Award className="text-primary mx-auto mb-1" size={20} />
                      <div className="text-xs font-semibold">ResponsibleSteel</div>
                    </div>
                    <div className="p-3 bg-secondary/10 border border-secondary/50 rounded-lg text-center">
                      <Shield className="text-secondary mx-auto mb-1" size={20} />
                      <div className="text-xs font-semibold">ISO 14001</div>
                    </div>
                    <div className="p-3 bg-primary/10 border border-primary/50 rounded-lg text-center">
                      <ShieldCheck className="text-primary mx-auto mb-1" size={20} />
                      <div className="text-xs font-semibold">ISO 14064</div>
                    </div>
                  </div>
                </div>

                {/* Anomalies/Alerts */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-gray-400">Anomalies & Alerts</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-2">
                      <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-0.5" size={16} />
                      <div className="text-xs">Coking data missing for Batch TS-COK-A42</div>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-2">
                      <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-0.5" size={16} />
                      <div className="text-xs">EPD for Rolling expired (Renew by Dec 2025)</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced KPIs - 8 cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-400">Total Stages</div>
            <Activity className="text-primary" size={16} />
          </div>
          <div className="text-4xl font-extrabold text-primary number-tile mb-1">12</div>
          <div className="text-xs text-gray-500">Supply chain nodes</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-400">Verified Stages</div>
            <CheckCircle className="text-primary" size={16} />
          </div>
          <div className="text-4xl font-extrabold text-primary number-tile mb-1">{verifiedCount}</div>
          <div className="text-xs text-gray-500">VC-signed or audited</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-400">Unique Actors</div>
            <User className="text-secondary" size={16} />
          </div>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-1">7</div>
          <div className="text-xs text-gray-500">Distinct companies</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-400">Days in Chain</div>
            <Calendar className="text-primary" size={16} />
          </div>
          <div className="text-4xl font-extrabold text-primary number-tile mb-1">234</div>
          <div className="text-xs text-gray-500">Mining to assembly</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-400">Avg CO₂ Intensity</div>
            <Leaf className="text-primary" size={16} />
          </div>
          <div className="text-4xl font-extrabold text-primary number-tile mb-1">
            {totalCO2.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">tCO₂e/t steel</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-400">Renewable Share</div>
            <Zap className="text-secondary" size={16} />
          </div>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-1">
            {avgRenewable}%
          </div>
          <div className="text-xs text-gray-500">Of total energy</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-400">Scrap Utilization</div>
            <RefreshCw className="text-primary" size={16} />
          </div>
          <div className="text-4xl font-extrabold text-primary number-tile mb-1">48%</div>
          <div className="text-xs text-gray-500">Feedstock share</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-400">Circularity Score</div>
            <Target className="text-secondary" size={16} />
          </div>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-1">8.2</div>
          <div className="text-xs text-gray-500">Out of 10</div>
        </Card>
      </div>

      {/* Global Supply Chain Map */}
      <Card className="mb-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <MapPin className="text-secondary" size={20} />
            Global Supply Chain Map
          </h3>
          <p className="text-sm text-gray-400">Interactive map showing all production stages across the value chain</p>
        </div>

        <div className="w-full h-[500px] bg-background rounded-lg border border-divider overflow-hidden">
          <MapContainer
            center={[30, 10]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Draw polyline connecting all stages */}
            <Polyline
              positions={stages.map(s => s.coordinates).filter((_, idx) => idx < 11)}
              color="#00D48E"
              weight={2}
              opacity={0.6}
              dashArray="10, 10"
            />

            {/* Add markers for each stage */}
            {stages.slice(0, 11).map((stage, idx) => (
              <Marker
                key={stage.id}
                position={stage.coordinates}
                icon={createCustomIcon(
                  stage.status === 'verified' ? '#00D48E' :
                    stage.status === 'pending' ? '#EAB308' : '#EF4444'
                )}
                eventHandlers={{
                  click: () => setSelectedStage(stage)
                }}
              >
                <Popup>
                  <div className="text-black min-w-[200px]">
                    <strong className="text-base">{stage.name}</strong>
                    <div className="mt-2 space-y-1 text-sm">
                      <div><strong>Actor:</strong> {stage.actor}</div>
                      <div><strong>Location:</strong> {stage.location}</div>
                      <div><strong>Status:</strong> {stage.status}</div>
                      <div><strong>CO₂:</strong> {stage.co2Intensity} tCO₂e/t</div>
                      <div><strong>Renewable:</strong> {stage.renewableShare}%</div>
                      <div className="text-xs text-gray-600 mt-1">Stage {idx + 1} of 12</div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="mt-4 flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-gray-400">Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-400">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-400">Issue</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-8 h-0.5 bg-primary"></div>
            <span className="text-gray-400">Supply Chain Route</span>
          </div>
        </div>
      </Card>

      {/* Chain-of-Custody Timeline */}
      <Card className="mb-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Hash className="text-primary" size={20} />
            Interactive Chain-of-Custody Timeline
          </h3>
          <p className="text-sm text-gray-400">Blockchain-verified EPCIS events with transaction hashes</p>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          {epcisEvents.map((event, idx) => {
            const Icon = event.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-shrink-0 w-48 p-4 bg-card rounded-lg border border-primary/30
                         hover:border-primary hover:shadow-glow-primary transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="text-primary" size={20} />
                  <span className="text-sm font-semibold">{event.type}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{event.time}</div>
                <div className="text-xs text-gray-400 mb-1">Signer: {event.signer}</div>
                <div className="flex items-center gap-1 text-xs font-mono text-secondary">
                  <Hash size={10} />
                  {event.hash}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 bg-primary/10 border border-primary/50 rounded-lg
                           hover:bg-primary/20 transition-colors text-primary font-semibold text-sm
                           flex items-center gap-2">
            <ExternalLink size={14} />
            View on Blockchain Explorer
          </button>
        </div>
      </Card>

      {/* Lifecycle Impact Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* PCF Waterfall */}
        <Card>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Leaf className="text-primary" size={16} />
            PCF Waterfall
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={pcfWaterfallData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2933" />
              <XAxis dataKey="name" stroke="#666" angle={-45} textAnchor="end" height={80} style={{ fontSize: '10px' }} />
              <YAxis stroke="#666" style={{ fontSize: '10px' }} />
              <RechartsTooltip
                contentStyle={{ backgroundColor: '#161C23', border: '1px solid #00D48E', borderRadius: '8px' }}
              />
              <Bar dataKey="value" fill="#00D48E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Energy Mix */}
        <Card>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Zap className="text-secondary" size={16} />
            Energy Mix
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie
                data={energyMixData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {energyMixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip
                contentStyle={{ backgroundColor: '#161C23', border: '1px solid #4ED0FF', borderRadius: '8px' }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 text-xs mt-2">
            {energyMixData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-400">{item.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Compliance Status */}
        <Card>
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <ShieldCheck className="text-primary" size={16} />
            Compliance Status
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-2 bg-primary/10 rounded border border-primary/30">
              <span className="text-xs font-semibold">CBAM Reporting</span>
              <span className="text-xs text-primary font-bold">Ready</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-primary/10 rounded border border-primary/30">
              <span className="text-xs font-semibold">EU Taxonomy</span>
              <span className="text-xs text-primary font-bold">Aligned</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-secondary/10 rounded border border-secondary/30">
              <span className="text-xs font-semibold">SBTi Targets</span>
              <span className="text-xs text-secondary font-bold">On Track</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-yellow-500/10 rounded border border-yellow-500/30">
              <span className="text-xs font-semibold">CSRD Data</span>
              <span className="text-xs text-yellow-500 font-bold">In Progress</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
