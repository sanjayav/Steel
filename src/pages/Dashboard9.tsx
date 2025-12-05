import { motion } from 'framer-motion'
import { useState } from 'react'
import Card from '../components/Card'
import CircularGauge from '../components/CircularGauge'
import { TrendingUp, Award, DollarSign, Leaf, Shield, Target, Sparkles } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const comparisonData = [
  { category: 'PCF', yourSteel: 1.42, industry: 1.85, competitor: 1.65 },
  { category: 'Recycled %', yourSteel: 34, industry: 25, competitor: 28 },
  { category: 'Renewable %', yourSteel: 67, industry: 42, competitor: 48 },
  { category: 'Circularity', yourSteel: 8.2, industry: 6.5, competitor: 7.1 },
]

export default function Dashboard9() {
  const [productionVolume, setProductionVolume] = useState(10000)
  
  const yourPCF = 1.42
  const industryPCF = 1.85
  const pcfReduction = industryPCF - yourPCF
  const percentBetter = ((pcfReduction / industryPCF) * 100).toFixed(0)
  
  const carbonSavings = (pcfReduction * productionVolume).toFixed(0)
  const carbonPrice = 85 // EUR per tonne CO2
  const monetarySavings = ((pcfReduction * productionVolume * carbonPrice) / 1000).toFixed(0)

  return (
    <div className="p-8 min-h-screen relative overflow-hidden">
      {/* Elegant gradient overlay background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/10 blur-[150px]" />
      </div>

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <TrendingUp className="text-primary" size={40} />
          Green Premium & Commercial View
        </h1>
        <p className="text-gray-400">Value storytelling and competitive positioning for sustainable steel</p>
      </div>

      {/* Value Proposition Hero */}
      <Card className="mb-8 relative z-10 overflow-hidden" noBorder>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-50" />
        <div className="relative z-10 p-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary rounded-full mb-4">
                  <Award className="text-background" size={20} />
                  <span className="font-bold text-background">LOW-CARBON STEEL</span>
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl font-extrabold mb-4 leading-tight"
              >
                This product emits{' '}
                <span className="text-primary neon-glow">{percentBetter}%</span>
                <br />
                less CO₂ than sector average
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-300 mb-6"
              >
                Premium quality steel with verified environmental performance
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg border border-primary/30">
                  <Shield className="text-primary" size={20} />
                  <span className="text-sm font-semibold">ESPR Ready</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg border border-secondary/30">
                  <Sparkles className="text-secondary" size={20} />
                  <span className="text-sm font-semibold">Verified Claims</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg border border-primary/30">
                  <Award className="text-primary" size={20} />
                  <span className="text-sm font-semibold">Top 20% Performer</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="hidden lg:block"
            >
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full 
                              opacity-20 blur-2xl animate-pulse" />
                <div className="relative w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 
                              rounded-full border-4 border-primary flex items-center justify-center
                              shadow-glow-primary">
                  <div className="text-center">
                    <div className="text-6xl font-extrabold text-primary number-tile">{percentBetter}%</div>
                    <div className="text-sm text-gray-300 mt-2">Lower Carbon</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Card>

      {/* Top Value Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <Leaf className="text-primary" size={24} />
          </div>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">1.42</div>
          <div className="text-sm text-gray-400 mb-1">Product Carbon Footprint</div>
          <div className="text-xs text-primary font-semibold">-23% vs industry</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <Target className="text-secondary" size={24} />
          </div>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-2">8.2</div>
          <div className="text-sm text-gray-400 mb-1">Circularity Score</div>
          <div className="text-xs text-secondary font-semibold">Top 15% globally</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <Shield className="text-primary" size={24} />
          </div>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">100%</div>
          <div className="text-sm text-gray-400 mb-1">Compliance Ready</div>
          <div className="text-xs text-primary font-semibold">ESPR + CBAM</div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <Award className="text-secondary" size={24} />
          </div>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-2">A+</div>
          <div className="text-sm text-gray-400 mb-1">Climate Rating</div>
          <div className="text-xs text-secondary font-semibold">Premium grade</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
        {/* Savings Calculator */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <DollarSign className="text-primary" size={24} />
              Carbon Savings Calculator
            </h2>
            <p className="text-sm text-gray-400">
              Calculate your environmental and economic benefits
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3">
              Your Annual Steel Consumption (tonnes)
            </label>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={productionVolume}
              onChange={(e) => setProductionVolume(Number(e.target.value))}
              className="w-full h-3 bg-card rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-6
                       [&::-webkit-slider-thumb]:h-6
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-primary
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:shadow-glow-primary"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-400">
              <span>1,000</span>
              <span className="text-primary font-bold text-lg">{productionVolume.toLocaleString()} tonnes</span>
              <span>100,000</span>
            </div>
          </div>

          <div className="space-y-6">
            <motion.div
              key={carbonSavings}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border-2 border-primary"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Leaf className="text-primary" size={20} />
                  <span className="text-sm text-gray-400">CO₂ Emissions Reduced</span>
                </div>
              </div>
              <div className="text-5xl font-extrabold text-primary number-tile">
                {carbonSavings}
              </div>
              <div className="text-sm text-gray-400 mt-1">tonnes CO₂e annually</div>
              <div className="mt-3 text-xs text-gray-400">
                Equivalent to removing {Math.round(Number(carbonSavings) / 4.6)} cars from the road for a year
              </div>
            </motion.div>

            <motion.div
              key={monetarySavings}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-lg border-2 border-secondary"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="text-secondary" size={20} />
                  <span className="text-sm text-gray-400">Estimated Carbon Cost Savings</span>
                </div>
              </div>
              <div className="text-5xl font-extrabold text-secondary number-tile">
                €{monetarySavings}k
              </div>
              <div className="text-sm text-gray-400 mt-1">annually at €{carbonPrice}/tCO₂e</div>
              <div className="mt-3 text-xs text-gray-400">
                Based on EU ETS carbon pricing mechanism
              </div>
            </motion.div>
          </div>

          <div className="mt-6 p-4 bg-background rounded-lg border border-divider">
            <div className="text-xs text-gray-400 mb-2">Calculation Basis</div>
            <div className="text-sm">
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Your Steel PCF:</span>
                <span className="font-semibold">{yourPCF} tCO₂e/t</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Industry Average:</span>
                <span className="font-semibold">{industryPCF} tCO₂e/t</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Savings per tonne:</span>
                <span className="font-semibold text-primary">{pcfReduction.toFixed(2)} tCO₂e/t</span>
              </div>
            </div>
          </div>
        </Card>

        {/* ESPR Advantage Meter */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <Shield className="text-primary" size={24} />
              ESPR Regulatory Advantage
            </h2>
            <p className="text-sm text-gray-400">
              Compliance risk assessment and market positioning
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <CircularGauge
              value={9.2}
              maxValue={10}
              size={240}
              label="ESPR Readiness Score"
            />
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="font-semibold">DPP Compliance</span>
              </div>
              <span className="text-primary font-bold">LOW RISK</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="font-semibold">Carbon Reporting</span>
              </div>
              <span className="text-primary font-bold">LOW RISK</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/10 border border-secondary/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                <span className="font-semibold">Circularity Requirements</span>
              </div>
              <span className="text-secondary font-bold">LOW RISK</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                <span className="font-semibold">Durability Data</span>
              </div>
              <span className="text-yellow-500 font-bold">MEDIUM RISK</span>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-br from-primary/20 to-transparent rounded-lg border border-primary/50">
            <div className="flex items-center gap-3 mb-3">
              <Award className="text-primary" size={28} />
              <div>
                <div className="font-bold text-lg">Market Advantage</div>
                <div className="text-xs text-gray-400">First-mover positioning</div>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Early compliance with ESPR requirements provides competitive advantage in
              regulated markets and premium brand positioning.
            </p>
          </div>
        </Card>
      </div>

      {/* Comparison Chart */}
      <Card className="relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Competitive Positioning</h2>
          <p className="text-sm text-gray-400">
            Performance comparison: Your steel vs Industry benchmark vs Competitor average
          </p>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2933" />
            <XAxis dataKey="category" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#161C23', 
                border: '1px solid #00D48E',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="yourSteel" name="Your Steel" fill="#00D48E" radius={[8, 8, 0, 0]} />
            <Bar dataKey="industry" name="Industry Avg" fill="#666666" radius={[8, 8, 0, 0]} />
            <Bar dataKey="competitor" name="Competitor" fill="#4ED0FF" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/10 border border-primary/50 rounded-lg text-center">
            <div className="text-3xl font-extrabold text-primary number-tile mb-1">
              {percentBetter}%
            </div>
            <div className="text-sm text-gray-400">Better than Industry</div>
          </div>
          <div className="p-4 bg-secondary/10 border border-secondary/50 rounded-lg text-center">
            <div className="text-3xl font-extrabold text-secondary number-tile mb-1">
              Top 20%
            </div>
            <div className="text-sm text-gray-400">Global Performance</div>
          </div>
          <div className="p-4 bg-primary/10 border border-primary/50 rounded-lg text-center">
            <div className="text-3xl font-extrabold text-primary number-tile mb-1">
              A+ Grade
            </div>
            <div className="text-sm text-gray-400">Climate Rating</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

