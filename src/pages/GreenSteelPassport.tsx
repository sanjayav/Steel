import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  ShieldCheck,
  Download,
  Share2,
  Sparkles,
  Leaf,
  Recycle,
  Zap,
  Globe,
  Wind,
  Check,
  ArrowRight,
  Mail,
  Factory,
  TrendingDown,
  FileText,
  ChevronRight,
  Activity,
  Layers,
  Award
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import PremiumMetricCard from "@/components/PremiumMetricCard";
import RadialGauge from "@/components/RadialGauge";
import { ClimateRatingBadge, CircularityScoreBadge, VerificationBadge } from "@/components/TrustBadges";
import { Link } from "react-router-dom";

/**
 * STEEL PASSPORT 2.0 — ULTIMATE EDITION
 * A high-fidelity, data-rich, premium dark-mode experience.
 */

const sample = {
  brand: "Data Steel",
  productName: "Green Steel Coil — HR 355MC",
  grade: "EN 10025-2 S355J2+N",
  heroImage: "https://images.unsplash.com/photo-1535063406552-9995616647f9?q=80&w=1600&auto=format&fit=crop", // Authentic, high-quality steel coil/sheet
  gs1DigitalLink: "https://id.gs1.org/01/09506000123457/21/TS-2025-000982?lot=HEAT-11-0925",

  metrics: {
    co2: 640,
    industryAvg: 1850,
    recycled: 72,
    renewable: 62,
    water: 2.1,
    strength: 520
  },

  details: {
    gtin: "09506000123457",
    serial: "TS-2025-000982",
    lot: "HEAT-11-0925",
    weight: 24150,
    location: "Kalinganagar, India",
    route: "DRI-EAF (Hydrogen-Ready)"
  }
};

export default function GreenSteelPassport() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'chain'>('overview');
  const [countUp, setCountUp] = useState({ co2: 0, recycled: 0, renewable: 0 });
  const [imageError, setImageError] = useState(false);

  const [qrValue, setQrValue] = useState("");

  // Set QR value to current URL on mount
  useEffect(() => {
    setQrValue(window.location.href);
  }, []);

  const savings = Math.round(((sample.metrics.industryAvg - sample.metrics.co2) / sample.metrics.industryAvg) * 100);

  // Animated counters
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCountUp({
        co2: Math.floor(sample.metrics.co2 * progress),
        recycled: Math.floor(sample.metrics.recycled * progress),
        renewable: Math.floor(sample.metrics.renewable * progress),
      });
      if (currentStep >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(qrValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">

      {/* 🌌 AMBIENT BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-teal-500/5 rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      {/* 📱 MOBILE LAYOUT (Visible < md) */}
      <div className="block md:hidden pb-24">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-base tracking-tight">Data Steel</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-medium px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </div>
        </div>

        {/* Mobile Hero Image */}
        <div className="relative h-64 w-full">
          <img
            src={sample.heroImage}
            alt="Steel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-emerald-500 text-black font-bold hover:bg-emerald-400 border-none">
                A+ RATED
              </Badge>
              <Badge variant="outline" className="bg-black/40 backdrop-blur-md border-white/20 text-white">
                {sample.grade}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold leading-tight text-white mb-1">
              {sample.productName}
            </h1>
          </div>
        </div>

        <div className="px-4 space-y-8 mt-4">
          {/* Mobile Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-center">
              <div className="text-[10px] text-white/40 uppercase mb-1">CO₂</div>
              <div className="text-lg font-bold text-emerald-400">{countUp.co2}</div>
            </div>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-center">
              <div className="text-[10px] text-white/40 uppercase mb-1">Recycled</div>
              <div className="text-lg font-bold text-blue-400">{countUp.recycled}%</div>
            </div>
            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-center">
              <div className="text-[10px] text-white/40 uppercase mb-1">Renewable</div>
              <div className="text-lg font-bold text-amber-400">{countUp.renewable}%</div>
            </div>
          </div>

          {/* Mobile Metrics Carousel */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" /> Performance
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
              <div className="min-w-[280px] snap-center">
                <PremiumMetricCard
                  icon={TrendingDown}
                  title="Carbon Footprint"
                  description="Cradle-to-Gate"
                  value={`${sample.metrics.co2} kg`}
                  badge="Verified"
                  trend="down"
                  trendLabel={`${savings}%`}
                  variant="emerald"
                />
              </div>
              <div className="min-w-[280px] snap-center">
                <PremiumMetricCard
                  icon={Recycle}
                  title="Circularity"
                  description="Scrap Utilization"
                  value={`${sample.metrics.recycled}%`}
                  badge="SCS Certified"
                  variant="blue"
                />
              </div>
              <div className="min-w-[280px] snap-center">
                <PremiumMetricCard
                  icon={Factory}
                  title="Technical Specs"
                  description="Strength & Comp"
                  value={`${sample.metrics.strength} MPa`}
                  badge="EN 10025"
                  variant="purple"
                />
              </div>
            </div>
          </div>

          {/* Mobile QR Card */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-5 text-center space-y-4">
            <div className="mx-auto bg-white p-2 rounded-lg w-fit">
              {qrValue && <QRCodeSVG value={qrValue} size={120} level="M" />}
            </div>
            <div>
              <h3 className="font-bold text-white">Digital Passport</h3>
              <p className="text-xs text-white/50 mt-1">Scan to verify on blockchain</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-white/40 bg-white/5 p-2 rounded-lg">
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
              Anchor: 0x71C...9A2F
            </div>
          </div>

          {/* Mobile Certs */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-emerald-500" /> Certificates
            </h3>
            <VerificationBadge icon={CheckCircle2} label="ResponsibleSteel™" verified={true} verifier="DNV" date="2025" className="w-full justify-start bg-white/5" />
            <VerificationBadge icon={Leaf} label="ISO 14067 (PCF)" verified={true} verifier="TÜV SÜD" date="2025" className="w-full justify-start bg-white/5" />
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#050505]/90 backdrop-blur-xl border-t border-white/10 p-4 z-50 flex gap-3">
          <Button variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5" onClick={handleCopy}>
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
          <Button className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/20">
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
        </div>
      </div>

      {/* 🖥️ DESKTOP LAYOUT (Visible >= md) */}
      <div className="hidden md:block">
        {/* 🟢 NAVBAR */}
        <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">Data Steel <span className="text-emerald-500">Passport</span></span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE VERIFICATION ACTIVE
              </div>
              <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5 text-white/80">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20">
                <Download className="h-4 w-4 mr-2" /> Cert
              </Button>
            </div>
          </div>
        </nav>

        <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">

          {/* 1️⃣ HERO SECTION: HIGH-TECH & CINEMATIC */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">Premium Grade • Verified Green</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
                  The Future of
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                  Sustainable Steel
                </span>
              </h1>

              <p className="text-xl text-white/60 max-w-xl leading-relaxed">
                Engineered for performance, verified for the planet.
                <span className="text-white font-medium"> {sample.productName}</span> delivers
                <span className="text-emerald-400 font-bold"> {savings}% lower emissions </span>
                than industry benchmarks.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <ClimateRatingBadge rating="A+" size="sm" showLabel={false} />
                  <div className="h-8 w-[1px] bg-white/10" />
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Climate Rating</div>
                    <div className="text-sm font-bold text-white">Top 1% Globally</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <CircularityScoreBadge score={85} size="sm" showLabel={false} />
                  <div className="h-8 w-[1px] bg-white/10" />
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Circularity</div>
                    <div className="text-sm font-bold text-white">Closed-Loop</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual / Data Visualization */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />
              <div className="relative rounded-3xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-grid-white/[0.02]" />

                {/* Image with overlay */}
                <div className="relative h-64 md:h-80 w-full overflow-hidden">
                  {!imageError ? (
                    <img
                      src={sample.heroImage}
                      alt="Steel"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      <Factory className="h-16 w-16 text-white/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <div className="text-xs text-emerald-400 font-mono mb-1 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        PRODUCTION COMPLETE
                      </div>
                      <div className="text-xl font-bold text-white">{sample.productName}</div>
                      <div className="text-sm text-white/60">{sample.grade}</div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 divide-x divide-white/5 border-t border-white/5">
                  <div className="p-4 text-center group/stat hover:bg-white/5 transition-colors">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">CO₂ Intensity</div>
                    <div className="text-2xl font-bold text-white group-hover/stat:text-emerald-400 transition-colors">{countUp.co2}</div>
                    <div className="text-[10px] text-white/40">kg CO₂e/t</div>
                  </div>
                  <div className="p-4 text-center group/stat hover:bg-white/5 transition-colors">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Recycled</div>
                    <div className="text-2xl font-bold text-white group-hover/stat:text-blue-400 transition-colors">{countUp.recycled}%</div>
                    <div className="text-[10px] text-white/40">Scrap Input</div>
                  </div>
                  <div className="p-4 text-center group/stat hover:bg-white/5 transition-colors">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Renewable</div>
                    <div className="text-2xl font-bold text-white group-hover/stat:text-amber-400 transition-colors">{countUp.renewable}%</div>
                    <div className="text-[10px] text-white/40">Energy Mix</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2️⃣ DETAILED METRICS DASHBOARD */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-500" />
                Performance Metrics
              </h2>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Live Data</Badge>
                <Badge variant="outline" className="bg-white/5 text-white/60 border-white/10">Batch #{sample.details.lot}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <PremiumMetricCard
                icon={TrendingDown}
                title="Carbon Footprint"
                description="Verified Product Carbon Footprint (Cradle-to-Gate)"
                value={`${sample.metrics.co2} kg`}
                badge="TÜV SÜD Verified"
                trend="down"
                trendLabel={`${savings}% vs Industry`}
                variant="emerald"
              >
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/60">Industry Avg</span>
                    <span className="text-white/40">{sample.metrics.industryAvg} kg</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[34%]" />
                  </div>
                </div>
              </PremiumMetricCard>

              <PremiumMetricCard
                icon={Recycle}
                title="Circularity"
                description="Post-consumer recycled scrap utilization"
                value={`${sample.metrics.recycled}%`}
                badge="SCS Certified"
                variant="blue"
              >
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-white/60">
                    <div className="mb-1">Scrap Source</div>
                    <div className="text-white font-medium">Automotive & Construction</div>
                  </div>
                  <RadialGauge value={sample.metrics.recycled} size="sm" showPercentage={false} color="blue" animated={false} />
                </div>
              </PremiumMetricCard>

              <PremiumMetricCard
                icon={Zap}
                title="Energy Mix"
                description="Renewable energy share in production"
                value={`${sample.metrics.renewable}%`}
                badge="RE100 Compliant"
                variant="gold"
              >
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-white/5 text-center">
                    <Wind className="h-3 w-3 text-white/60 mx-auto mb-1" />
                    <div className="text-xs font-bold">Wind</div>
                  </div>
                  <div className="p-2 rounded bg-white/5 text-center">
                    <div className="h-3 w-3 rounded-full bg-amber-500 mx-auto mb-1" />
                    <div className="text-xs font-bold">Solar</div>
                  </div>
                </div>
              </PremiumMetricCard>

              <PremiumMetricCard
                icon={Factory}
                title="Technical Specs"
                description="Mechanical properties & composition"
                value={`${sample.metrics.strength} MPa`}
                badge="EN 10025-2"
                variant="purple"
              >
                <div className="mt-4">
                  <Link to="/technical">
                    <Button size="sm" className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30">
                      View Full Datasheet <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </PremiumMetricCard>
            </div>
          </section>

          {/* 3️⃣ VERIFICATION & TRUST BLOCK */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* QR & Blockchain Panel */}
            <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#0A0A0A] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl" />

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 rounded-xl opacity-20 blur-lg group-hover:opacity-40 transition duration-500 animate-pulse-slow" />
                  <div className="relative bg-white p-4 rounded-xl shadow-2xl">
                    {qrValue && <QRCodeSVG value={qrValue} size={180} level="M" />}
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Digital Product Passport</h3>
                    <p className="text-white/60">
                      This product is digitally twinned and anchored to the blockchain.
                      Scan to verify authenticity, provenance, and sustainability claims in real-time.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                        <span className="text-sm font-bold text-white">Blockchain Anchor</span>
                      </div>
                      <div className="text-xs font-mono text-white/40 break-all bg-black/30 p-2 rounded">
                        0x71C...9A2F
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-bold text-white">GS1 Digital Link</span>
                      </div>
                      <div className="text-xs text-white/60">
                        GTIN: {sample.details.gtin}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleCopy} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/10">
                      {copied ? <Check className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
                      {copied ? "Copied" : "Copy Link"}
                    </Button>
                    <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">
                      Verify on Blockchain
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications List */}
            <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Active Certifications
              </h3>
              <div className="space-y-4">
                <VerificationBadge
                  icon={CheckCircle2}
                  label="ResponsibleSteel™"
                  verified={true}
                  verifier="DNV"
                  date="2025"
                  className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10"
                />
                <VerificationBadge
                  icon={Leaf}
                  label="ISO 14067 (PCF)"
                  verified={true}
                  verifier="TÜV SÜD"
                  date="2025"
                  className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10"
                />
                <VerificationBadge
                  icon={Recycle}
                  label="Recycled Content"
                  verified={true}
                  verifier="SCS Global"
                  date="2024"
                  className="w-full justify-start bg-white/5 border-white/10 hover:bg-white/10"
                />
                <div className="pt-4 border-t border-white/10">
                  <Button variant="ghost" className="w-full text-white/60 hover:text-white justify-between group">
                    View All Certificates <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* 4️⃣ PRODUCT DETAILS & TECHNICAL DATA */}
          <section className="rounded-3xl border border-white/10 bg-[#0A0A0A] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-500" />
                Product Details
              </h2>
              <Link to="/technical">
                <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10">
                  Full Technical Data <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="p-6 hover:bg-white/5 transition-colors">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Manufacturer</div>
                <div className="font-bold text-white mb-1">{sample.brand}</div>
                <div className="text-sm text-white/60">{sample.details.location}</div>
              </div>
              <div className="p-6 hover:bg-white/5 transition-colors">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Production Route</div>
                <div className="font-bold text-white mb-1">{sample.details.route}</div>
                <div className="text-sm text-emerald-400 flex items-center gap-1">
                  <Zap className="h-3 w-3" /> 100% Renewable
                </div>
              </div>
              <div className="p-6 hover:bg-white/5 transition-colors">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Batch Information</div>
                <div className="font-bold text-white mb-1">Lot: {sample.details.lot}</div>
                <div className="text-sm text-white/60">Serial: {sample.details.serial}</div>
              </div>
              <div className="p-6 hover:bg-white/5 transition-colors">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Material Standard</div>
                <div className="font-bold text-white mb-1">{sample.grade}</div>
                <div className="text-sm text-white/60">Hot Rolled Coil</div>
              </div>
            </div>
          </section>

          {/* 5️⃣ CTA FOOTER */}
          <section className="relative rounded-3xl overflow-hidden p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-blue-900/40" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-bold text-white">Ready to procure sustainable steel?</h2>
              <p className="text-white/70">
                Get the full Environmental Product Declaration (EPD) and technical data sheet for this batch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 font-bold px-8">
                  <Download className="h-4 w-4 mr-2" /> Download EPD
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 text-white px-8">
                  <Mail className="h-4 w-4 mr-2" /> Contact Sales
                </Button>
              </div>
            </div>
          </section>

        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-[#020202] py-12 mt-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
              <Leaf className="h-6 w-6" />
              <span className="font-bold text-xl">Data Steel</span>
            </div>
            <p className="text-white/40 text-sm">
              © 2025 Aeiforo Green Steel Division. Blockchain Verified.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
