import { motion } from 'framer-motion'
import Card from '../components/Card'
import { Shield, Wrench, Activity, MapPin, TrendingUp } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mechanicalProperties = [
  { name: 'Tensile Strength', value: 520, unit: 'MPa', max: 600, threshold: 470 },
  { name: 'Yield Strength', value: 355, unit: 'MPa', max: 400, threshold: 355 },
  { name: 'Elongation', value: 22, unit: '%', max: 30, threshold: 20 },
  { name: 'Impact Energy', value: 27, unit: 'J', max: 40, threshold: 27 },
  { name: 'Hardness', value: 165, unit: 'HB', max: 200, threshold: 140 },
]

const lifetimeData = [
  { year: 0, performance: 100 },
  { year: 5, performance: 98 },
  { year: 10, performance: 95 },
  { year: 15, performance: 92 },
  { year: 20, performance: 88 },
  { year: 25, performance: 82 },
  { year: 30, performance: 75 },
  { year: 35, performance: 65 },
  { year: 40, performance: 50 },
]

const corrosionClasses = [
  { class: 'C2', name: 'Low', location: 'Indoor dry', color: '#00D48E', serviceLife: '50+' },
  { class: 'C3', name: 'Medium', location: 'Urban/Coastal', color: '#4ED0FF', serviceLife: '35-45' },
  { class: 'C4', name: 'High', location: 'Industrial/Marine', color: '#FFB800', serviceLife: '25-35' },
  { class: 'C5', name: 'Very High', location: 'Aggressive', color: '#FF6B6B', serviceLife: '15-25' },
]

const repairabilityChecklist = [
  { item: 'Standardized Fasteners', score: 10, status: 'excellent' },
  { item: 'Accessible Joints', score: 9, status: 'excellent' },
  { item: 'Modular Design', score: 8, status: 'good' },
  { item: 'Repair Manual Available', score: 10, status: 'excellent' },
  { item: 'Spare Parts Availability', score: 7, status: 'good' },
  { item: 'Tool Requirements', score: 9, status: 'excellent' },
]

export default function Dashboard5() {
  const avgRepairability = (repairabilityChecklist.reduce((sum, item) => sum + item.score, 0) / repairabilityChecklist.length).toFixed(1)

  return (
    <div className="p-8 min-h-screen relative">
      {/* Subtle 3D steel beam silhouette */}
      <div className="fixed top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 200 600" className="w-full h-full">
          <path
            d="M 50 0 L 150 0 L 150 600 L 50 600 Z"
            fill="url(#steelGradient)"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="steelGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1F2933" />
              <stop offset="50%" stopColor="#4ED0FF" />
              <stop offset="100%" stopColor="#1F2933" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Shield className="text-primary" size={40} />
          Durability, Reparability & Use-Phase
        </h1>
        <p className="text-gray-400">Engineering properties and product lifetime performance</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <Card>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">50+</div>
          <div className="text-sm text-gray-400 mb-1">Service Life</div>
          <div className="text-xs text-gray-500">Years (C2 environment)</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-2">{avgRepairability}</div>
          <div className="text-sm text-gray-400 mb-1">Repairability Index</div>
          <div className="text-xs text-gray-500">Out of 10 points</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">520</div>
          <div className="text-sm text-gray-400 mb-1">Tensile Strength</div>
          <div className="text-xs text-gray-500">MPa (Tested)</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-2">98%</div>
          <div className="text-sm text-gray-400 mb-1">Material Efficiency</div>
          <div className="text-xs text-gray-500">Performance retention</div>
        </Card>
      </div>

      {/* Mechanical Properties Test Bars */}
      <Card className="mb-8 relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <Activity className="text-primary" size={24} />
            Mechanical Properties
          </h2>
          <p className="text-sm text-gray-400">
            Tested material performance characteristics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {mechanicalProperties.map((prop, index) => {
            const percentage = (prop.value / prop.max) * 100
            const passesThreshold = prop.value >= prop.threshold

            return (
              <motion.div
                key={prop.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                {/* Vertical test bar */}
                <div className="relative w-16 h-64 bg-card rounded-lg overflow-hidden border border-divider">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary to-primary
                             rounded-lg"
                    style={{
                      boxShadow: passesThreshold ? '0 0 20px rgba(0, 212, 142, 0.5)' : 'none'
                    }}
                  />
                  
                  {/* Glow at top when value is high */}
                  {percentage > 75 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-0 left-0 right-0 h-8 bg-primary blur-xl"
                    />
                  )}

                  {/* Threshold line */}
                  <div 
                    className="absolute left-0 right-0 h-0.5 bg-yellow-500"
                    style={{ bottom: `${(prop.threshold / prop.max) * 100}%` }}
                  >
                    <div className="absolute right-full mr-2 text-xs text-yellow-500 whitespace-nowrap">
                      Min
                    </div>
                  </div>
                </div>

                {/* Label and value */}
                <div className="text-center mt-4">
                  <div className="text-2xl font-bold text-primary number-tile">
                    {prop.value}
                  </div>
                  <div className="text-xs text-gray-400 mb-2">{prop.unit}</div>
                  <div className="text-sm font-semibold">{prop.name}</div>
                  {passesThreshold && (
                    <div className="text-xs text-primary mt-1">✓ Passed</div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-8 p-4 bg-primary/10 border border-primary/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="text-primary" size={20} />
              <div>
                <div className="font-semibold">All Properties Meet Specification</div>
                <div className="text-xs text-gray-400">Tested per EN 10025-2 standard</div>
              </div>
            </div>
            <div className="px-4 py-2 bg-primary text-background rounded-lg font-bold">
              CERTIFIED
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
        {/* Corrosion Resistance Map */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <MapPin className="text-secondary" size={24} />
              Corrosion Resistance Classes
            </h2>
            <p className="text-sm text-gray-400">
              Expected service life by environment
            </p>
          </div>

          <div className="space-y-4">
            {corrosionClasses.map((corr, index) => (
              <motion.div
                key={corr.class}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-background rounded-lg border-2 border-divider
                         hover:border-primary/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-lg flex items-center justify-center
                                font-extrabold text-xl border-2"
                      style={{ 
                        backgroundColor: `${corr.color}20`,
                        borderColor: corr.color,
                        color: corr.color
                      }}
                    >
                      {corr.class}
                    </div>
                    <div>
                      <div className="font-semibold">{corr.name} Corrosivity</div>
                      <div className="text-sm text-gray-400">{corr.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: corr.color }}>
                      {corr.serviceLife}
                    </div>
                    <div className="text-xs text-gray-400">years</div>
                  </div>
                </div>

                {/* World map markers (simplified) */}
                <div className="mt-4 pt-4 border-t border-divider opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2 flex-wrap">
                    {['Indoor', 'Urban', 'Coastal', 'Industrial'].map((location, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-2 py-1 rounded bg-card border border-divider"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-background rounded-lg border border-secondary/30">
            <div className="text-xs text-gray-400 mb-2">Coating System</div>
            <div className="text-lg font-bold">Hot-Dip Galvanized + Organic Coating</div>
            <div className="text-xs text-gray-400 mt-1">Z275 + 25μm polyester</div>
          </div>
        </Card>

        {/* Lifetime Performance Curve */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <TrendingUp className="text-primary" size={24} />
              Lifetime Performance Curve
            </h2>
            <p className="text-sm text-gray-400">
              Expected performance degradation over time
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lifetimeData}>
              <defs>
                <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D48E" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00D48E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2933" />
              <XAxis 
                dataKey="year" 
                stroke="#666"
                label={{ value: 'Years in Service', position: 'insideBottom', offset: -5, fill: '#666' }}
              />
              <YAxis 
                stroke="#666"
                label={{ value: 'Performance (%)', angle: -90, position: 'insideLeft', fill: '#666' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#161C23', 
                  border: '1px solid #00D48E',
                  borderRadius: '8px'
                }}
                formatter={(value: any) => [`${value}%`, 'Performance']}
              />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="#00D48E" 
                strokeWidth={3}
                dot={{ fill: '#00D48E', r: 4 }}
                activeDot={{ r: 6, fill: '#00D48E', stroke: '#fff', strokeWidth: 2 }}
                fill="url(#performanceGradient)"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-background rounded-lg">
              <div className="text-xl font-bold text-primary">50+</div>
              <div className="text-xs text-gray-400 mt-1">Design Life</div>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <div className="text-xl font-bold text-secondary">35</div>
              <div className="text-xs text-gray-400 mt-1">Min. Service</div>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <div className="text-xl font-bold text-primary">75%</div>
              <div className="text-xs text-gray-400 mt-1">EoL Performance</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Repairability Assessment */}
      <Card className="relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
            <Wrench className="text-primary" size={24} />
            Repairability Index
          </h2>
          <p className="text-sm text-gray-400">
            Ease of maintenance and repair assessment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {repairabilityChecklist.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${item.status === 'excellent'
                  ? 'bg-primary/10 border-primary'
                  : 'bg-secondary/10 border-secondary'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">{item.item}</span>
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    font-bold text-lg
                    ${item.status === 'excellent'
                      ? 'bg-primary text-background'
                      : 'bg-secondary text-background'
                    }
                  `}
                >
                  {item.score}
                </div>
              </div>
              <div className="w-full h-2 bg-card rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score * 10}%` }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                  className={`h-full ${item.status === 'excellent' ? 'bg-primary' : 'bg-secondary'}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/20 to-secondary/20 
                      rounded-lg border-2 border-primary">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-extrabold text-background number-tile">{avgRepairability}</div>
                <div className="text-xs text-background">/ 10</div>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold">Excellent Repairability</div>
              <div className="text-sm text-gray-400">Product designed for easy maintenance and long service life</div>
            </div>
          </div>
          <Wrench className="text-primary" size={48} />
        </div>
      </Card>
    </div>
  )
}

