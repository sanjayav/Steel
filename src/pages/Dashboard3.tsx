import { motion } from 'framer-motion'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import { Leaf, Zap, Flame, Award, TrendingDown, Database } from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

const waterfallData = [
  { name: 'Raw Materials', value: 0.45, quality: 'Measured' },
  { name: 'Mining', value: 0.12, quality: 'Measured' },
  { name: 'Transport', value: 0.08, quality: 'Calculated' },
  { name: 'Iron Making', value: 0.52, quality: 'Measured' },
  { name: 'Steel Making', value: 0.18, quality: 'Measured' },
  { name: 'Rolling', value: 0.07, quality: 'Measured' },
]

const energyMixData = [
  { name: 'Renewable', value: 67, color: '#00D48E' },
  { name: 'Grid', value: 23, color: '#4ED0FF' },
  { name: 'Fossil', value: 10, color: '#666666' },
]

const dataQualityLevels = [
  { level: 1, label: 'Estimated', active: true, desc: 'Industry average' },
  { level: 2, label: 'Literature', active: true, desc: 'Public data' },
  { level: 3, label: 'Calculated', active: true, desc: 'Based on inputs' },
  { level: 4, label: 'Measured', active: true, desc: 'Primary data' },
  { level: 5, label: 'Audited', active: true, desc: 'Third-party verified' },
]

export default function Dashboard3() {
  const totalPCF = waterfallData.reduce((sum, item) => sum + item.value, 0)
  const sectorBenchmark = 1.85
  const percentageBetter = ((sectorBenchmark - totalPCF) / sectorBenchmark * 100).toFixed(0)

  return (
    <div className="p-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Leaf className="text-primary" size={40} />
          Carbon, Energy & Climate Performance
        </h1>
        <p className="text-gray-400">Detailed climate impact analysis with verified data sources</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <Leaf className="text-primary" size={24} />
            <TrendingDown className="text-primary" size={20} />
          </div>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">
            {totalPCF.toFixed(2)}
          </div>
          <div className="text-sm text-gray-400 mb-1">Product Carbon Footprint</div>
          <div className="text-xs text-gray-500">tCO₂e per tonne steel</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <Award className="text-secondary" size={24} />
          </div>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-2">
            {percentageBetter}%
          </div>
          <div className="text-sm text-gray-400 mb-1">Below Sector Average</div>
          <div className="text-xs text-gray-500">Top 20% performer</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <Zap className="text-primary" size={24} />
          </div>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">
            67
          </div>
          <div className="text-sm text-gray-400 mb-1">Renewable Energy</div>
          <div className="text-xs text-gray-500">% of total energy mix</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <Database className="text-primary" size={24} />
          </div>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">
            Level 4
          </div>
          <div className="text-sm text-gray-400 mb-1">Data Quality</div>
          <div className="text-xs text-gray-500">Measured primary data</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* PCF Waterfall Chart */}
        <Card className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Carbon Footprint Breakdown</h2>
            <p className="text-sm text-gray-400">
              Stage-by-stage emission analysis (tCO₂e/t)
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waterfallData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2933" />
              <XAxis 
                dataKey="name" 
                stroke="#666" 
                angle={-45}
                textAnchor="end"
                height={100}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#666"
                style={{ fontSize: '12px' }}
                label={{ value: 'tCO₂e/t', angle: -90, position: 'insideLeft', fill: '#666' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#161C23', 
                  border: '1px solid #00D48E',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: any, name: string, props: any) => [
                  `${value.toFixed(2)} tCO₂e/t`,
                  props.payload.quality
                ]}
              />
              <Bar 
                dataKey="value" 
                fill="#4ED0FF"
                stroke="#00D48E"
                strokeWidth={2}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

          {/* Benchmark Comparison */}
          <div className="mt-6 pt-6 border-t border-divider">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold">vs. Sector Benchmark</span>
              <span className="text-sm text-primary font-bold">{percentageBetter}% better</span>
            </div>
            <ProgressBar 
              value={totalPCF} 
              maxValue={2.5}
              label="Your Product"
              color="#00D48E"
              showPercentage={false}
            />
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>0.0</span>
              <span className="text-yellow-500">Sector Avg: {sectorBenchmark}</span>
              <span>2.5 tCO₂e/t</span>
            </div>
          </div>
        </Card>

        {/* Energy Mix Donut */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Energy Mix</h2>
            <p className="text-sm text-gray-400">
              Energy source distribution
            </p>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={energyMixData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {energyMixData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#161C23', 
                  border: '1px solid #00D48E',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="space-y-3 mt-4">
            {energyMixData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ 
                      backgroundColor: item.color,
                      boxShadow: item.color === '#00D48E' ? '0 0 10px rgba(0, 212, 142, 0.5)' : 'none'
                    }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: item.color }}>
                  {item.value}%
                </span>
              </div>
            ))}
          </div>

          {energyMixData[0].value >= 50 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mt-6 p-3 bg-primary/10 border border-primary/50 rounded-lg
                         shadow-glow-primary text-center"
            >
              <Zap className="text-primary mx-auto mb-1" size={20} />
              <div className="text-xs text-primary font-semibold">High Renewable Energy</div>
            </motion.div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Route Badge */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Production Route</h2>
            <p className="text-sm text-gray-400">Steel manufacturing pathway</p>
          </div>

          <div className="flex items-center justify-center py-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="w-48 h-48 bg-gradient-to-br from-card to-background 
                            border-2 border-primary rounded-2xl
                            flex flex-col items-center justify-center gap-4
                            shadow-glow-primary"
                   style={{
                     clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                   }}>
                <Flame className="text-primary" size={48} />
                <div className="text-center">
                  <div className="text-xl font-bold">DRI-EAF</div>
                  <div className="text-xs text-gray-400 mt-1">Direct Reduced Iron</div>
                  <div className="text-xs text-gray-400">Electric Arc Furnace</div>
                </div>
              </div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-4 -right-4 
                         bg-primary text-background px-4 py-2 rounded-lg
                         font-bold text-sm shadow-glow-primary"
              >
                LOW CARBON
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Route Type</span>
              <span className="font-semibold">DRI-EAF (Electric)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Scrap Input</span>
              <span className="font-semibold text-primary">34%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Emissions vs BF-BOF</span>
              <span className="font-semibold text-primary">-42%</span>
            </div>
          </div>
        </Card>

        {/* Data Quality Ladder */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Data Quality Ladder</h2>
            <p className="text-sm text-gray-400">
              Source verification and accuracy levels
            </p>
          </div>

          <div className="space-y-4">
            {dataQualityLevels.reverse().map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative p-4 rounded-lg border-2 transition-all
                  ${level.active 
                    ? 'bg-primary/10 border-primary shadow-glow-primary' 
                    : 'bg-card/50 border-divider opacity-50'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    font-bold text-xl
                    ${level.active 
                      ? 'bg-primary text-background' 
                      : 'bg-divider text-gray-600'
                    }
                  `}>
                    {level.level}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{level.label}</div>
                    <div className="text-xs text-gray-400">{level.desc}</div>
                  </div>
                  {level.active && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-background rounded-lg border border-primary/30">
            <div className="text-xs text-gray-400 mb-2">Current Data Quality</div>
            <div className="text-2xl font-bold text-primary">Level 4 - Measured</div>
            <div className="text-xs text-gray-400 mt-1">85% primary data coverage</div>
          </div>
        </Card>
      </div>

      {/* Climate Performance Thermometer */}
      <Card>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Climate Performance Rating</h2>
          <p className="text-sm text-gray-400">
            Comparison against global steel sector performance
          </p>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="relative h-12 bg-gradient-to-r from-primary via-yellow-500 to-red-500 
                          rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: `${(totalPCF / 2.5) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                              bg-primary px-3 py-1 rounded text-sm font-bold whitespace-nowrap">
                  Your Product
                </div>
              </motion.div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Best in Class<br/>(0.5)</span>
              <span>Sector Avg<br/>({sectorBenchmark})</span>
              <span>Worst<br/>(2.5)</span>
            </div>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary
                          flex items-center justify-center shadow-glow-primary">
              <div>
                <div className="text-2xl font-bold text-primary">A+</div>
                <div className="text-xs text-gray-400">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

