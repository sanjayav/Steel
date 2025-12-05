import { motion } from 'framer-motion'
import Card from '../components/Card'
import { Database, Shield, Link, CheckCircle, Award, User, Clock, Hash } from 'lucide-react'

const dataQualityLevels = [
  { level: 5, label: 'Audited', desc: 'Third-party verified', active: true, coverage: 45 },
  { level: 4, label: 'Measured', desc: 'Primary site data', active: true, coverage: 40 },
  { level: 3, label: 'Calculated', desc: 'Based on inputs', active: true, coverage: 10 },
  { level: 2, label: 'Literature', desc: 'Public databases', active: false, coverage: 5 },
  { level: 1, label: 'Estimated', desc: 'Industry average', active: false, coverage: 0 },
]

const verifiableCredentials = [
  { 
    type: 'PCF Claim', 
    issuer: 'TÜV SÜD', 
    issued: '2024-10-15', 
    expires: '2025-10-15',
    status: 'valid',
    icon: Database
  },
  { 
    type: 'Recycled Content', 
    issuer: 'SCS Global', 
    issued: '2024-09-20', 
    expires: '2025-09-20',
    status: 'valid',
    icon: Shield
  },
  { 
    type: 'Material Composition', 
    issuer: 'Tata Steel Lab', 
    issued: '2024-11-01', 
    expires: '2025-11-01',
    status: 'valid',
    icon: Award
  },
  { 
    type: 'Chain-of-Custody', 
    issuer: 'EPCIS Network', 
    issued: '2024-03-15', 
    expires: '2025-03-15',
    status: 'valid',
    icon: Link
  },
]

const custodyEvents = [
  { 
    actor: 'Vale S.A.', 
    role: 'Raw Material Supplier', 
    timestamp: '2024-03-15 08:23:45', 
    location: 'Carajás, Brazil',
    hash: 'a3f9c2...4e7b',
    event: 'Material Extraction'
  },
  { 
    actor: 'Pellet Corp', 
    role: 'Pelletizer', 
    timestamp: '2024-04-02 14:12:33', 
    location: 'Vitória, Brazil',
    hash: 'b8e1d5...9a2c',
    event: 'Pelletizing Process'
  },
  { 
    actor: 'Maritime Transport', 
    role: 'Logistics', 
    timestamp: '2024-04-20 09:45:22', 
    location: 'Atlantic Ocean',
    hash: 'c7f2a8...3d1e',
    event: 'Shipment'
  },
  { 
    actor: 'Tata Steel', 
    role: 'Steel Producer', 
    timestamp: '2024-06-01 11:30:15', 
    location: 'IJmuiden, NL',
    hash: 'd9b3c4...7f8a',
    event: 'Steel Production'
  },
  { 
    actor: 'Tata Steel', 
    role: 'Steel Producer', 
    timestamp: '2024-09-05 16:45:08', 
    location: 'IJmuiden, NL',
    hash: 'e2a5f1...6c9b',
    event: 'Coating Applied'
  },
  { 
    actor: 'Mercedes-Benz', 
    role: 'OEM', 
    timestamp: '2024-10-25 13:20:44', 
    location: 'Stuttgart, DE',
    hash: 'f4c8b2...1e5d',
    event: 'Component Assembly'
  },
]

export default function Dashboard7() {
  const totalCoverage = dataQualityLevels.reduce((sum, level) => sum + level.coverage, 0)
  const avgQuality = dataQualityLevels
    .filter(l => l.active)
    .reduce((sum, l) => sum + l.level * l.coverage, 0) / totalCoverage

  return (
    <div className="p-8 min-h-screen relative overflow-hidden">
      {/* Blockchain Animation Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 border-2 border-primary rounded-lg"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              rotate: 0
            }}
            animate={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360
            }}
            transition={{ 
              duration: 20 + i * 5, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Database className="text-primary" size={40} />
          Data Quality, VCs & Chain-of-Custody
        </h1>
        <p className="text-gray-400">Trust, verification, and audit-grade security</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <Card>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">
            {avgQuality.toFixed(1)}
          </div>
          <div className="text-sm text-gray-400 mb-1">Avg. Data Quality</div>
          <div className="text-xs text-gray-500">Out of 5 levels</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-2">85%</div>
          <div className="text-sm text-gray-400 mb-1">Primary Data</div>
          <div className="text-xs text-gray-500">Level 4-5 coverage</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">4</div>
          <div className="text-sm text-gray-400 mb-1">Active VCs</div>
          <div className="text-xs text-gray-500">Verifiable credentials</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-2">6</div>
          <div className="text-sm text-gray-400 mb-1">Custody Events</div>
          <div className="text-xs text-gray-500">Verified handovers</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 relative z-10">
        {/* Data Quality Ladder */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <Database className="text-primary" size={24} />
              Data Quality Ladder
            </h2>
            <p className="text-sm text-gray-400">
              Source verification levels
            </p>
          </div>

          <div className="space-y-3">
            {dataQualityLevels.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative p-4 rounded-lg border-2 transition-all
                  ${level.active 
                    ? 'bg-primary/10 border-primary shadow-glow-primary' 
                    : 'bg-card/30 border-divider opacity-40'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center
                    font-extrabold text-2xl border-2
                    ${level.active 
                      ? 'bg-primary text-background border-primary' 
                      : 'bg-divider text-gray-600 border-divider'
                    }
                  `}>
                    {level.level}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{level.label}</div>
                    <div className="text-xs text-gray-400 mb-2">{level.desc}</div>
                    {level.active && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-card rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${level.coverage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-primary"
                          />
                        </div>
                        <span className="text-xs text-primary font-bold">{level.coverage}%</span>
                      </div>
                    )}
                  </div>
                  {level.active && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-primary rounded-full"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-background rounded-lg border border-primary/30">
            <div className="text-xs text-gray-400 mb-2">Current Data Quality Score</div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-primary">{avgQuality.toFixed(1)}</div>
              <div className="text-sm text-gray-400">/ 5.0</div>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              85% Level 4-5 (Measured/Audited)
            </div>
          </div>
        </Card>

        {/* Verifiable Credentials */}
        <Card className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <Shield className="text-secondary" size={24} />
              Verifiable Credentials
            </h2>
            <p className="text-sm text-gray-400">
              Blockchain-backed digital certificates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifiableCredentials.map((vc, index) => {
              const Icon = vc.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                  whileHover={{ 
                    scale: 1.03,
                    boxShadow: '0 0 30px rgba(0, 212, 142, 0.3)'
                  }}
                  className="relative p-5 bg-gradient-to-br from-card to-background
                           rounded-lg border-2 border-primary shadow-lg
                           cursor-pointer group overflow-hidden"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)'
                  }}
                >
                  {/* Certified tick animation */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.15 + 0.5, type: "spring" }}
                    className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full
                             flex items-center justify-center"
                  >
                    <CheckCircle className="text-background" size={20} />
                  </motion.div>

                  {/* Hexagonal icon */}
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center
                                  border-2 border-primary group-hover:shadow-glow-primary transition-all">
                      <Icon className="text-primary" size={28} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-lg">{vc.type}</div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <User size={12} />
                      <span>Issuer: {vc.issuer}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock size={12} />
                      <span>Issued: {vc.issued}</span>
                    </div>

                    <div className="pt-2 border-t border-divider">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">Expires</span>
                        <span className="text-xs font-semibold text-secondary">{vc.expires}</span>
                      </div>
                    </div>

                    <div className={`
                      inline-block px-3 py-1 rounded text-xs font-bold
                      ${vc.status === 'valid'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-red-500/20 text-red-500'
                      }
                    `}>
                      {vc.status.toUpperCase()}
                    </div>
                  </div>

                  {/* Corner cut effect */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 bg-background" 
                       style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
                </motion.div>
              )
            })}
          </div>

          <div className="mt-6 p-4 bg-primary/10 border border-primary/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="text-primary" size={24} />
              <div>
                <div className="font-semibold">All Credentials Valid</div>
                <div className="text-xs text-gray-400">
                  Cryptographically signed and anchored on distributed ledger
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Chain-of-Custody Timeline */}
      <Card className="relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <Link className="text-primary" size={24} />
            Chain-of-Custody Timeline
          </h2>
          <p className="text-sm text-gray-400">
            Complete material handover history with cryptographic verification
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary" />

          <div className="space-y-6">
            {custodyEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="relative flex gap-6"
              >
                {/* Timeline node */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
                    className="w-16 h-16 bg-primary rounded-full border-4 border-background
                             flex items-center justify-center shadow-glow-primary"
                  >
                    <User className="text-background" size={24} />
                  </motion.div>
                </div>

                {/* Event card */}
                <motion.div
                  whileHover={{ x: 10, boxShadow: '0 8px 30px rgba(0, 212, 142, 0.2)' }}
                  className="flex-1 p-5 bg-card rounded-lg border border-divider
                           hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold mb-1">{event.actor}</div>
                      <div className="text-sm text-gray-400">{event.role}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">{event.timestamp}</div>
                      <div className="text-xs text-secondary mt-1">{event.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="text-primary" size={16} />
                    <span className="text-sm font-semibold">{event.event}</span>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-background rounded border border-divider">
                    <Hash className="text-secondary" size={14} />
                    <span className="text-xs font-mono text-secondary">{event.hash}</span>
                    <span className="text-xs text-gray-500 ml-auto">Hash Verified</span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Audit Summary */}
        <div className="mt-8 pt-6 border-t border-divider grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-background rounded-lg border border-primary/30">
            <div className="flex items-center gap-3 mb-3">
              <Award className="text-primary" size={24} />
              <div>
                <div className="text-sm text-gray-400">Last Audit</div>
                <div className="font-semibold">Oct 15, 2024</div>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Auditor: TÜV SÜD
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg border border-secondary/30">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="text-secondary" size={24} />
              <div>
                <div className="text-sm text-gray-400">Next Audit</div>
                <div className="font-semibold">Feb 15, 2026</div>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              In 92 days
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg border border-primary/30">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="text-primary" size={24} />
              <div>
                <div className="text-sm text-gray-400">Certification</div>
                <div className="font-semibold">ISO 14064-1</div>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Valid until 2026
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

