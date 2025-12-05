import { motion } from 'framer-motion'
import { useState } from 'react'
import { Leaf, Shield, ArrowRight, Mail, Lock, Sparkles } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate login delay
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true')
      // Force a full page reload to update authentication state
      window.location.href = '/'
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-[#0F1419] to-background p-4">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl relative"
      >
        <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
          {/* Left Panel - Login Form */}
          <div className="bg-card/95 backdrop-blur-xl p-12 flex flex-col justify-center relative overflow-hidden">
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 brushed-steel opacity-30" />
            
            <div className="relative z-10">
              {/* Logo and Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-primary">
                    <Leaf className="text-background" size={24} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">FeC Trail</h1>
                    <p className="text-xs bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse font-semibold">
                      Powered by Aeiforo
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                  <Shield size={14} className="text-secondary" />
                  <span>Partnered with TÜV Rheinland</span>
                </div>
              </motion.div>

              {/* Welcome Text */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Welcome Back!
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Digital Passports for a Smarter Aluminium Future.
                  <br />
                  Track, trace, and verify your supply chain with confidence.
                </p>
              </motion.div>

              {/* Login Form */}
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleLogin}
                className="space-y-5"
              >
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full bg-background/50 border border-divider rounded-xl py-3 pl-12 pr-4
                               text-white placeholder-gray-500 outline-none
                               focus:border-primary focus:ring-2 focus:ring-primary/20
                               transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full bg-background/50 border border-divider rounded-xl py-3 pl-12 pr-4
                               text-white placeholder-gray-500 outline-none
                               focus:border-primary focus:ring-2 focus:ring-primary/20
                               transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-divider bg-background/50 
                               text-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <span className="text-gray-400">Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:text-secondary transition-colors">
                    Forgot password?
                  </a>
                </div>

                {/* Sign In Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-background font-bold py-4 rounded-xl
                           flex items-center justify-center gap-3 shadow-lg shadow-primary/30
                           hover:shadow-xl hover:shadow-primary/40 transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full"
                      />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </motion.button>
              </motion.form>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center"
              >
                <p className="text-sm text-gray-400">
                  Don't have an account?{' '}
                  <a href="#" className="text-primary hover:text-secondary transition-colors font-semibold">
                    Request Access
                  </a>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Panel - Hero Image/Graphics */}
          <div className="relative bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/20 p-12 
                        flex flex-col justify-center items-center overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-8"
              >
                <div className="relative inline-block">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-48 h-48 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-3xl absolute inset-0 -z-10"
                  />
                  <div className="w-48 h-48 bg-card/50 backdrop-blur-xl rounded-3xl flex items-center justify-center
                               border border-primary/30 shadow-2xl relative overflow-hidden">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotateY: [0, 10, 0, -10, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    >
                      <Sparkles className="text-primary" size={80} />
                    </motion.div>
                    
                    {/* Floating particles around the icon */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full"
                        animate={{
                          x: [0, Math.cos(i * Math.PI / 4) * 60, 0],
                          y: [0, Math.sin(i * Math.PI / 4) * 60, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                  Enterprise Traceability
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Blockchain-verified supply chain transparency from mining to end-of-life. 
                  Track carbon footprint, certifications, and compliance in real-time.
                </p>
                
                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Blockchain Verified', 'ISO Certified', 'Real-time Data', 'EU DPP Ready'].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + idx * 0.1 }}
                      className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs font-semibold text-primary"
                    >
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 text-xs mt-6"
        >
          © 2025 FeC Trail by Aeiforo. All rights reserved. | Privacy Policy | Terms of Service
        </motion.p>
      </motion.div>
    </div>
  )
}

