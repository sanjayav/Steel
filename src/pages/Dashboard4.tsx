import { motion } from 'framer-motion'
import { useState } from 'react'
import Card from '../components/Card'
import CircularGauge from '../components/CircularGauge'
import ProgressBar from '../components/ProgressBar'
import { Recycle, Sparkles, Factory, Droplets, Zap } from 'lucide-react'

const elementData = [
  { symbol: 'Fe', name: 'Iron', percentage: 98.2, atomicNumber: 26, color: '#00D48E', category: 'Major' },
  { symbol: 'C', name: 'Carbon', percentage: 0.18, atomicNumber: 6, color: '#4ED0FF', category: 'Alloying' },
  { symbol: 'Mn', name: 'Manganese', percentage: 0.85, atomicNumber: 25, color: '#4ED0FF', category: 'Alloying' },
  { symbol: 'Si', name: 'Silicon', percentage: 0.25, atomicNumber: 14, color: '#4ED0FF', category: 'Alloying' },
  { symbol: 'Cr', name: 'Chromium', percentage: 0.15, atomicNumber: 24, color: '#666666', category: 'Trace' },
  { symbol: 'Ni', name: 'Nickel', percentage: 0.12, atomicNumber: 28, color: '#666666', category: 'Trace' },
  { symbol: 'Mo', name: 'Molybdenum', percentage: 0.08, atomicNumber: 42, color: '#666666', category: 'Trace' },
  { symbol: 'Cu', name: 'Copper', percentage: 0.10, atomicNumber: 29, color: '#666666', category: 'Trace' },
  { symbol: 'P', name: 'Phosphorus', percentage: 0.03, atomicNumber: 15, color: '#666666', category: 'Trace' },
  { symbol: 'S', name: 'Sulfur', percentage: 0.02, atomicNumber: 16, color: '#666666', category: 'Trace' },
]

const byProducts = [
  { name: 'Slag', utilized: 92, total: 100, color: '#00D48E' },
  { name: 'Mill Scale', utilized: 78, total: 100, color: '#4ED0FF' },
  { name: 'Dust Recovery', utilized: 65, total: 100, color: '#FFB800' },
  { name: 'Sludge', utilized: 45, total: 100, color: '#FF6B6B' },
]

// Enhanced Element Card Component
function ElementCard({ element, index }: { element: typeof elementData[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const isMajor = element.percentage > 1

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotateY: -180 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotateY: 0,
      }}
      transition={{ 
        delay: index * 0.08,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.15, 
        y: -8,
        rotateZ: isHovered ? [0, -2, 2, -2, 0] : 0,
        transition: { duration: 0.3 }
      }}
      whileTap={{ 
        scale: 0.95,
        rotateZ: 5
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className={`
        relative aspect-square rounded-lg p-3
        flex flex-col items-center justify-center
        cursor-pointer transition-all group overflow-hidden
        ${isMajor 
          ? 'bg-primary/20 border-2 border-primary' 
          : 'bg-card border border-divider hover:border-primary/50'
        }
        ${isClicked ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
      `}
      style={{
        boxShadow: isHovered ? `0 0 30px ${element.color}40, inset 0 0 20px ${element.color}20` : 'none',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Animated Background Particles */}
      {isMajor && (
        <>
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                `radial-gradient(circle at 20% 30%, ${element.color}40 0%, transparent 50%)`,
                `radial-gradient(circle at 80% 70%, ${element.color}40 0%, transparent 50%)`,
                `radial-gradient(circle at 50% 50%, ${element.color}40 0%, transparent 50%)`,
                `radial-gradient(circle at 20% 30%, ${element.color}40 0%, transparent 50%)`,
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary"
              initial={{ 
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0
              }}
              animate={{
                x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.7,
              }}
            />
          ))}
        </>
      )}

      {/* Pulsing Border Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          boxShadow: isHovered 
            ? [
                `inset 0 0 0px ${element.color}`,
                `inset 0 0 20px ${element.color}`,
                `inset 0 0 0px ${element.color}`,
              ]
            : 'none'
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Atomic Number Badge */}
      <motion.div 
        className="absolute top-1 left-1 text-[8px] font-bold opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0.5 }}
      >
        {element.atomicNumber}
      </motion.div>

      {/* Category Badge */}
      {isHovered && (
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute top-1 right-1"
        >
          {element.category === 'Major' && <Zap size={10} className="text-primary" />}
        </motion.div>
      )}

      {/* Element Symbol with Animation */}
      <motion.div
        className={`
          text-3xl font-extrabold number-tile relative z-10
          ${isMajor ? 'text-primary' : 'text-gray-400'}
        `}
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
          textShadow: isHovered 
            ? `0 0 20px ${element.color}`
            : 'none'
        }}
        transition={{ duration: 0.5 }}
      >
        {element.symbol}
      </motion.div>

      {/* Element Name */}
      <motion.div 
        className="text-[10px] text-gray-500 mt-1 relative z-10"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
      >
        {element.name}
      </motion.div>

      {/* Percentage with Counter Animation */}
      <motion.div
        className={`
          text-xs font-bold mt-1 relative z-10
          ${isMajor ? 'text-primary' : 'text-gray-400'}
        `}
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          color: isHovered ? element.color : undefined
        }}
        transition={{ delay: index * 0.08 + 0.3, type: "spring" }}
      >
        {element.percentage}%
      </motion.div>

      {/* Progress Ring for Major Elements */}
      {isMajor && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            rotate: 360
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            opacity: { duration: 0.3 }
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke={element.color}
              strokeWidth="1"
              strokeDasharray="10 5"
              opacity="0.3"
            />
          </svg>
        </motion.div>
      )}

      {/* Enhanced Tooltip */}
      <motion.div
        className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2
                  bg-background/95 backdrop-blur-sm px-4 py-3 rounded-lg border-2
                  whitespace-nowrap pointer-events-none z-50 shadow-2xl"
        style={{ borderColor: element.color }}
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.8
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="text-xs font-bold mb-1" style={{ color: element.color }}>
          {element.name} ({element.symbol})
        </div>
        <div className="text-[10px] text-gray-400 space-y-0.5">
          <div>Atomic #: {element.atomicNumber}</div>
          <div>Composition: {element.percentage}% by weight</div>
          <div>Category: {element.category}</div>
        </div>
        {/* Tooltip Arrow */}
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-[2px]
                     border-4 border-transparent"
          style={{ borderTopColor: element.color }}
        />
      </motion.div>

      {/* Click Indicator */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{
            border: `2px solid ${element.color}`,
            boxShadow: `0 0 20px ${element.color}`
          }}
        />
      )}
    </motion.div>
  )
}

export default function Dashboard4() {
  return (
    <div className="p-8 min-h-screen">
      {/* Background circular pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <Recycle size={400} />
        </motion.div>
      </div>

      {/* Header */}
      <div className="mb-8 relative z-10">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Recycle className="text-primary" size={40} />
          Material, Circularity & Recycled Content
        </h1>
        <p className="text-gray-400">Composition analysis and circular economy metrics</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 relative z-10">
        <Card>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">34%</div>
          <div className="text-sm text-gray-400 mb-1">Total Recycled Content</div>
          <div className="text-xs text-gray-500">Post + Pre-consumer scrap</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-2">8.2</div>
          <div className="text-sm text-gray-400 mb-1">Circularity Score</div>
          <div className="text-xs text-gray-500">Out of 10 points</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">99.2%</div>
          <div className="text-sm text-gray-400 mb-1">Recyclability</div>
          <div className="text-xs text-gray-500">End-of-life recovery potential</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-secondary number-tile mb-2">78%</div>
          <div className="text-sm text-gray-400 mb-1">By-product Utilization</div>
          <div className="text-xs text-gray-500">Industrial symbiosis</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 relative z-10">
        {/* Material Composition Table */}
        <Card className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="text-primary" size={24} />
              Material Composition
            </h2>
            <p className="text-sm text-gray-400">
              Chemical composition analysis (% by weight)
            </p>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {elementData.map((element, index) => (
              <ElementCard key={element.symbol} element={element} index={index} />
            ))}
          </div>

          <div className="mt-6 p-4 bg-background rounded-lg border border-divider">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="text-secondary" size={20} />
              <span className="font-semibold">Steel Grade: S355J2+N</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Standard:</span>
                <span className="ml-2 font-semibold">EN 10025-2</span>
              </div>
              <div>
                <span className="text-gray-400">Yield Strength:</span>
                <span className="ml-2 font-semibold text-primary">355 MPa</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Circularity Meter */}
        <Card className="flex flex-col items-center justify-center">
          <CircularGauge
            value={8.2}
            maxValue={10}
            size={220}
            label="Circularity Index"
          />

          <div className="mt-8 w-full space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Design for Disassembly</span>
              <span className="text-primary font-bold">9.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Recycled Input</span>
              <span className="text-primary font-bold">7.5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Material Efficiency</span>
              <span className="text-primary font-bold">8.8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">By-product Recovery</span>
              <span className="text-secondary font-bold">7.8</span>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 px-6 py-3 bg-primary/10 border border-primary/50 
                     rounded-lg shadow-glow-primary text-center"
          >
            <div className="text-sm font-semibold text-primary">High Circularity</div>
            <div className="text-xs text-gray-400 mt-1">Top 15% performance</div>
          </motion.div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 relative z-10">
        {/* Recycled Content Breakdown */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <Recycle className="text-primary" size={24} />
              Recycled Content Breakdown
            </h2>
            <p className="text-sm text-gray-400">
              Source and type of recycled materials
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <ProgressBar
                value={0}
                maxValue={100}
                segments={[
                  { value: 22, color: '#00D48E', label: 'Post-Consumer' },
                  { value: 8, color: '#4ED0FF', label: 'Pre-Consumer' },
                  { value: 4, color: '#FFB800', label: 'Internal Scrap' },
                ]}
                height="h-8"
              />
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">22%</div>
                  <div className="text-xs text-gray-400 mt-1">Post-Consumer</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-secondary">8%</div>
                  <div className="text-xs text-gray-400 mt-1">Pre-Consumer</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-500">4%</div>
                  <div className="text-xs text-gray-400 mt-1">Internal Scrap</div>
                </div>
              </div>
            </div>

            {/* Animated fill effect */}
            <div className="relative h-32 bg-card rounded-lg overflow-hidden border border-divider">
              <motion.div
                initial={{ height: '0%' }}
                animate={{ height: '34%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-secondary
                         opacity-20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl font-extrabold text-primary number-tile"
                  >
                    34%
                  </motion.div>
                  <div className="text-sm text-gray-400 mt-2">Total Recycled Content</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-background rounded-lg border border-primary/30">
              <div className="text-xs text-gray-400 mb-2">Scrap Source Verification</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-primary rounded-full" />
                <span className="text-xs font-semibold text-primary">100% Verified</span>
              </div>
            </div>
          </div>
        </Card>

        {/* By-product Utilization */}
        <Card>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
              <Factory className="text-secondary" size={24} />
              By-product Utilization
            </h2>
            <p className="text-sm text-gray-400">
              Industrial symbiosis and waste recovery
            </p>
          </div>

          <div className="space-y-6">
            {byProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold">{product.name}</span>
                  <span className="text-sm font-bold" style={{ color: product.color }}>
                    {product.utilized}%
                  </span>
                </div>
                
                <div className="relative">
                  <div className="h-12 bg-card rounded-lg overflow-hidden border border-divider
                                flex items-center justify-center relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${product.utilized}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="absolute left-0 top-0 bottom-0 rounded-lg"
                      style={{ 
                        backgroundColor: product.color,
                        boxShadow: `0 0 10px ${product.color}`
                      }}
                    />
                    <span className="relative z-10 text-xs font-semibold">
                      {product.utilized}% Utilized
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary/10 border border-primary/50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Droplets className="text-primary" size={20} />
              <span className="font-semibold">Industrial Symbiosis</span>
            </div>
            <div className="text-xs text-gray-400">
              Steel slag used in cement production, mill scale recycled back to furnace,
              dust and sludge processed for metal recovery.
            </div>
          </div>
        </Card>
      </div>

      {/* Material Passport Summary */}
      <Card className="relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Material Passport Summary</h2>
          <p className="text-sm text-gray-400">
            Complete material traceability and composition data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 bg-background rounded-lg border border-divider">
            <div className="text-xs text-gray-400 mb-1">Primary Material</div>
            <div className="text-lg font-bold">Steel (98.2% Fe)</div>
          </div>
          <div className="p-4 bg-background rounded-lg border border-divider">
            <div className="text-xs text-gray-400 mb-1">Material Origin</div>
            <div className="text-lg font-bold">Europe + Brazil</div>
          </div>
          <div className="p-4 bg-background rounded-lg border border-divider">
            <div className="text-xs text-gray-400 mb-1">Traceability Level</div>
            <div className="text-lg font-bold text-primary">Full Chain</div>
          </div>
          <div className="p-4 bg-background rounded-lg border border-divider">
            <div className="text-xs text-gray-400 mb-1">Material ID</div>
            <div className="text-sm font-mono text-secondary">MAT-7C9E24</div>
          </div>
        </div>
      </Card>
    </div>
  )
}

