import { motion } from 'framer-motion'
import Card from '../components/Card'
import { 
  AlertTriangle, 
  CheckCircle, 
  Trash2, 
  Recycle, 
  Package, 
  Zap,
  Droplets,
  Wind
} from 'lucide-react'

const socItems = [
  { substance: 'Lead (Pb)', status: 'safe', concentration: '< 0.01%', limit: '0.1%' },
  { substance: 'Cadmium (Cd)', status: 'safe', concentration: '< 0.001%', limit: '0.01%' },
  { substance: 'Mercury (Hg)', status: 'safe', concentration: 'Not Detected', limit: '0.1%' },
  { substance: 'Hexavalent Chromium', status: 'safe', concentration: '< 0.05%', limit: '0.1%' },
  { substance: 'PAH', status: 'safe', concentration: 'Not Detected', limit: '1 mg/kg' },
  { substance: 'PFAS', status: 'safe', concentration: 'Not Detected', limit: 'REACH Compliant' },
]

const dismantlingSteps = [
  { step: 1, action: 'Remove organic coating', tool: 'Heat/Chemical strip', time: '15 min', icon: Package },
  { step: 2, action: 'Separate bolted joints', tool: 'Standard wrench', time: '20 min', icon: Package },
  { step: 3, action: 'Cut welded sections', tool: 'Plasma cutter', time: '30 min', icon: Zap },
  { step: 4, action: 'Sort by steel grade', tool: 'XRF analyzer', time: '10 min', icon: CheckCircle },
  { step: 5, action: 'Prepare for shredding', tool: 'None', time: '5 min', icon: Trash2 },
]

const recyclingStages = [
  { name: 'Collection', icon: Trash2, recovery: 98, color: '#00D48E' },
  { name: 'Shredding', icon: Package, recovery: 95, color: '#00D48E' },
  { name: 'Magnetic Sep.', icon: Zap, recovery: 99, color: '#00D48E' },
  { name: 'De-coating', icon: Droplets, recovery: 92, color: '#4ED0FF' },
  { name: 'Re-melting', icon: Recycle, recovery: 97, color: '#00D48E' },
]

export default function Dashboard6() {
  const overallRecoveryRate = recyclingStages.reduce((acc, stage) => acc * (stage.recovery / 100), 1) * 100

  return (
    <div className="p-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <AlertTriangle className="text-yellow-500" size={40} />
          End-of-Life & Substances of Concern
        </h1>
        <p className="text-gray-400">Safety compliance and circular end-of-life pathways</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">82%</div>
          <div className="text-sm text-gray-400 mb-1">Total Recovery Rate</div>
          <div className="text-xs text-gray-500">End-of-life material recovery</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">100%</div>
          <div className="text-sm text-gray-400 mb-1">SoC Compliance</div>
          <div className="text-xs text-gray-500">All substances within limits</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-2">5</div>
          <div className="text-sm text-gray-400 mb-1">Dismantling Steps</div>
          <div className="text-xs text-gray-500">Minutes to separate</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">99%</div>
          <div className="text-sm text-gray-400 mb-1">Recyclability</div>
          <div className="text-xs text-gray-500">Material can be recycled</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* SoC Flag Panel */}
        <Card className="lg:col-span-1">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="text-primary" size={24} />
              Substances of Concern
            </h2>
            <p className="text-sm text-gray-400">
              REACH & RoHS compliance status
            </p>
          </div>

          {/* Big Status Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="mb-6 p-6 bg-primary/10 border-2 border-primary rounded-lg
                     shadow-glow-primary text-center"
          >
            <CheckCircle className="text-primary mx-auto mb-3" size={48} />
            <div className="text-2xl font-bold text-primary mb-2">SAFE</div>
            <div className="text-sm text-gray-400">All substances within regulatory limits</div>
          </motion.div>

          {/* SoC List */}
          <div className="space-y-2">
            {socItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-3 bg-background rounded-lg border border-divider
                         hover:border-primary/50 transition-all"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">{item.substance}</span>
                  <CheckCircle className="text-primary" size={16} />
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Measured: {item.concentration}</span>
                  <span>Limit: {item.limit}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compliance Badges */}
          <div className="mt-6 flex gap-3">
            <div className="flex-1 p-3 bg-primary/10 border border-primary/50 rounded-lg text-center">
              <div className="text-xs text-primary font-semibold">REACH</div>
              <div className="text-xs text-gray-400 mt-1">Compliant</div>
            </div>
            <div className="flex-1 p-3 bg-primary/10 border border-primary/50 rounded-lg text-center">
              <div className="text-xs text-primary font-semibold">RoHS</div>
              <div className="text-xs text-gray-400 mt-1">Compliant</div>
            </div>
            <div className="flex-1 p-3 bg-primary/10 border border-primary/50 rounded-lg text-center">
              <div className="text-xs text-primary font-semibold">SVHC</div>
              <div className="text-xs text-gray-400 mt-1">None</div>
            </div>
          </div>
        </Card>

        {/* Dismantling Guide */}
        <Card className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <Package className="text-secondary" size={24} />
              Dismantling Guide
            </h2>
            <p className="text-sm text-gray-400">
              Step-by-step end-of-life disassembly instructions
            </p>
          </div>

          <div className="space-y-4">
            {dismantlingSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0, 212, 142, 0.2)' }}
                  className="group p-4 bg-background rounded-lg border border-divider
                           hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    {/* Step Number */}
                    <div className="w-12 h-12 bg-primary/20 border-2 border-primary rounded-full
                                  flex items-center justify-center font-bold text-xl text-primary
                                  group-hover:shadow-glow-primary transition-all">
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center
                                  border border-divider group-hover:border-secondary transition-all">
                      <Icon className="text-secondary" size={24} />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <div className="font-semibold text-lg mb-1">{step.action}</div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>🔧 {step.tool}</span>
                        <span>⏱️ {step.time}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 10 }}
                      className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      →
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Total Time */}
          <div className="mt-6 p-4 bg-secondary/10 border border-secondary/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Total Dismantling Time</div>
                <div className="text-2xl font-bold text-secondary mt-1">~80 minutes</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Skill Level Required</div>
                <div className="text-lg font-bold text-secondary mt-1">Medium</div>
              </div>
            </div>
          </div>

          {/* PPE Requirements */}
          <div className="mt-4 p-4 bg-background rounded-lg border border-yellow-500/30">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="text-yellow-500" size={20} />
              <span className="font-semibold text-yellow-500">Safety Equipment Required</span>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded">
                Safety Gloves
              </span>
              <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded">
                Safety Glasses
              </span>
              <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded">
                Respirator (for coating removal)
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recycling Route Flow */}
      <Card className="mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <Recycle className="text-primary" size={24} />
            Recycling Route & Recovery
          </h2>
          <p className="text-sm text-gray-400">
            Steel recycling process with recovery rates at each stage
          </p>
        </div>

        {/* Horizontal Flow */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-4">
          {recyclingStages.map((stage, index) => {
            const Icon = stage.icon
            const isLast = index === recyclingStages.length - 1

            return (
              <div key={index} className="flex items-center">
                {/* Stage Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex-shrink-0 w-40 p-4 bg-card rounded-lg border-2 border-primary
                           shadow-lg hover:shadow-glow-primary transition-all cursor-pointer"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                      <Icon className="text-primary" size={28} />
                    </div>
                    <div className="text-sm font-semibold text-center mb-2">{stage.name}</div>
                    <div className="text-2xl font-bold text-primary number-tile">{stage.recovery}%</div>
                    <div className="text-xs text-gray-400">Recovery</div>
                  </div>
                </motion.div>

                {/* Arrow */}
                {!isLast && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.3 }}
                    className="flex-shrink-0 mx-3"
                  >
                    <div className="flex items-center">
                      <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary" />
                      <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 
                                    border-b-transparent border-l-8 border-l-secondary" />
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        {/* Overall Recovery */}
        <div className="mt-8 p-6 bg-gradient-to-r from-primary/20 to-secondary/20 
                      rounded-lg border-2 border-primary">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400 mb-1">Overall Material Recovery Rate</div>
              <div className="text-4xl font-extrabold text-primary number-tile">
                {overallRecoveryRate.toFixed(1)}%
              </div>
            </div>
            <Recycle className="text-primary" size={64} />
          </div>
        </div>
      </Card>

      {/* Recovery vs Downcycling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Recovery vs Downcycling</h2>
            <p className="text-sm text-gray-400">
              Material quality retention after recycling
            </p>
          </div>

          {/* Semi-circle Gauge */}
          <div className="flex flex-col items-center py-8">
            <svg width="300" height="160" viewBox="0 0 300 160">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="50%" stopColor="#FFB800" />
                  <stop offset="100%" stopColor="#00D48E" />
                </linearGradient>
              </defs>
              
              {/* Background arc */}
              <path
                d="M 30 150 A 120 120 0 0 1 270 150"
                fill="none"
                stroke="#1F2933"
                strokeWidth="24"
                strokeLinecap="round"
              />
              
              {/* Progress arc */}
              <motion.path
                d="M 30 150 A 120 120 0 0 1 270 150"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="24"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.9 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              {/* Needle */}
              <motion.g
                initial={{ rotate: -90 }}
                animate={{ rotate: 72 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ transformOrigin: '150px 150px' }}
              >
                <line
                  x1="150"
                  y1="150"
                  x2="150"
                  y2="50"
                  stroke="#00D48E"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="150" cy="150" r="8" fill="#00D48E" />
              </motion.g>
            </svg>

            <div className="grid grid-cols-2 gap-8 mt-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary number-tile">90%</div>
                <div className="text-sm text-gray-400 mt-1">True Recycling</div>
                <div className="text-xs text-gray-500">Same-grade steel</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-500 number-tile">10%</div>
                <div className="text-sm text-gray-400 mt-1">Downcycling</div>
                <div className="text-xs text-gray-500">Lower-grade uses</div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-primary/10 border border-primary/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-primary" size={20} />
              <span className="font-semibold">Closed-Loop Recycling</span>
            </div>
            <div className="text-xs text-gray-400">
              Steel maintains material properties through multiple recycling cycles without degradation.
            </div>
          </div>
        </Card>

        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Environmental Impact Savings</h2>
            <p className="text-sm text-gray-400">
              Benefits of recycling vs virgin production
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Wind className="text-primary" size={20} />
                  <span className="text-sm font-semibold">CO₂ Emissions Saved</span>
                </div>
                <span className="text-2xl font-bold text-primary">-58%</span>
              </div>
              <div className="h-3 bg-card rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '58%' }}
                  transition={{ duration: 1 }}
                  className="h-full bg-primary"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="text-secondary" size={20} />
                  <span className="text-sm font-semibold">Energy Saved</span>
                </div>
                <span className="text-2xl font-bold text-secondary">-74%</span>
              </div>
              <div className="h-3 bg-card rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '74%' }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-secondary"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Droplets className="text-primary" size={20} />
                  <span className="text-sm font-semibold">Water Saved</span>
                </div>
                <span className="text-2xl font-bold text-primary">-40%</span>
              </div>
              <div className="h-3 bg-card rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '40%' }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="h-full bg-primary"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-background rounded-lg border border-divider">
            <div className="text-xs text-gray-400 mb-3">Equivalent Environmental Benefit</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xl font-bold text-primary">1.2 tCO₂e</div>
                <div className="text-xs text-gray-400">Saved per tonne recycled</div>
              </div>
              <div>
                <div className="text-xl font-bold text-secondary">4.5 MWh</div>
                <div className="text-xs text-gray-400">Energy saved per tonne</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

