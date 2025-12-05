import { Download, FileText, FlaskConical, Hammer, Shield, Award, ChevronLeft, Microscope, Layers, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MechanicalPropertyBar from '@/components/MechanicalPropertyBar';
import RadialGauge from '@/components/RadialGauge';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';

const sampleData = {
    product: 'Green Steel Coil — HR 355MC',
    grade: 'EN 10025-2 Grade S355J2+N',
    heatNumber: 'HEAT-11-0925',
    serial: 'TS-2025-000982',

    // Material Composition (%)
    composition: [
        { element: 'Fe', value: 98.2, description: 'Iron', type: 'Base' },
        { element: 'C', value: 0.18, max: 0.20, description: 'Carbon', type: 'Alloy' },
        { element: 'Mn', value: 1.45, max: 1.60, description: 'Manganese', type: 'Alloy' },
        { element: 'Si', value: 0.45, max: 0.55, description: 'Silicon', type: 'Alloy' },
        { element: 'P', value: 0.018, max: 0.025, description: 'Phosphorus', type: 'Impurity' },
        { element: 'S', value: 0.012, max: 0.025, description: 'Sulfur', type: 'Impurity' },
        { element: 'Cr', value: 0.08, max: 0.30, description: 'Chromium', type: 'Trace' },
        { element: 'Ni', value: 0.05, max: 0.30, description: 'Nickel', type: 'Trace' },
    ],

    // Mechanical Properties
    mechanical: {
        tensileStrength: { value: 520, required: 470, unit: 'MPa', min: 400, max: 600 },
        yieldStrength: { value: 355, required: 355, unit: 'MPa', min: 300, max: 500 },
        elongation: { value: 22, required: 20, unit: '%', min: 0, max: 50 },
        impactEnergy: { value: 27, required: 27, unit: 'J', min: 0, max: 50 },
    },

    // Use Phase Properties
    usePhase: {
        corrosionResistance: 78, // out of 100
        fatigueLife: 85,
        materialEfficiency: 92,
    },

    // Radar Chart Data - Comparison with Industry Average
    radarComparison: [
        { property: 'Strength', dataSteel: 95, industryAvg: 85 },
        { property: 'Ductility', dataSteel: 88, industryAvg: 80 },
        { property: 'Toughness', dataSteel: 90, industryAvg: 82 },
        { property: 'Weldability', dataSteel: 92, industryAvg: 85 },
        { property: 'Formability', dataSteel: 87, industryAvg: 78 },
        { property: 'Durability', dataSteel: 93, industryAvg: 80 },
    ],
};

export default function TechnicalDataPage() {
    return (
        <div className="min-h-screen w-full bg-[#050505] text-white font-sans selection:bg-emerald-500/30">

            {/* 🌌 AMBIENT BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            </div>

            {/* 🟢 NAVBAR */}
            <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/passport">
                            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5">
                                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Passport
                            </Button>
                        </Link>
                        <div className="h-4 w-[1px] bg-white/10" />
                        <span className="font-bold text-lg tracking-tight">Technical Data Sheet</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                            <Activity className="h-3 w-3 mr-1" /> Live Lab Data
                        </Badge>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20">
                            <Download className="h-4 w-4 mr-2" /> Download MTC
                        </Button>
                    </div>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-8">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border-emerald-500/30">
                                PASSED
                            </Badge>
                            <span className="text-white/40 text-sm font-mono">{sampleData.grade}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{sampleData.product}</h1>
                        <p className="text-white/60">
                            Heat: <span className="text-white font-mono">{sampleData.heatNumber}</span> •
                            Serial: <span className="text-white font-mono">{sampleData.serial}</span>
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Standard</div>
                            <div className="font-bold text-white">EN 10025-2</div>
                        </div>
                        <div className="w-[1px] bg-white/10" />
                        <div className="text-right">
                            <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Lab ID</div>
                            <div className="font-bold text-white">L-2025-892</div>
                        </div>
                    </div>
                </div>

                {/* 1️⃣ MATERIAL COMPOSITION (PERIODIC TABLE STYLE) */}
                <section className="space-y-6">
                    <div className="flex items-center gap-2 text-xl font-bold text-white">
                        <FlaskConical className="h-5 w-5 text-blue-500" />
                        <h2>Chemical Composition</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                        {sampleData.composition.map((comp, i) => (
                            <div
                                key={i}
                                className={`
                  relative group p-4 rounded-xl border transition-all duration-300 hover:scale-105
                  ${comp.element === 'Fe'
                                        ? 'bg-blue-500/20 border-blue-500/40'
                                        : comp.type === 'Impurity'
                                            ? 'bg-red-500/5 border-red-500/20 hover:bg-red-500/10'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                    }
                `}
                            >
                                <div className="text-xs text-white/40 mb-2">{comp.element === 'Fe' ? '56' : ''}</div>
                                <div className={`text-3xl font-bold mb-1 ${comp.element === 'Fe' ? 'text-blue-400' : 'text-white'}`}>
                                    {comp.element}
                                </div>
                                <div className="text-xs font-medium text-white/60 mb-2">{comp.description}</div>
                                <div className="text-lg font-bold text-white">
                                    {comp.value}%
                                </div>
                                {comp.max && (
                                    <div className="text-[10px] text-white/40 mt-1">
                                        Max: {comp.max}%
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* 2️⃣ MECHANICAL PROPERTIES */}
                    <section className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-2 text-xl font-bold text-white">
                            <Hammer className="h-5 w-5 text-amber-500" />
                            <h2>Mechanical Properties</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <MechanicalPropertyBar
                                label="Tensile Strength (Rm)"
                                value={sampleData.mechanical.tensileStrength.value}
                                unit={sampleData.mechanical.tensileStrength.unit}
                                min={sampleData.mechanical.tensileStrength.min}
                                max={sampleData.mechanical.tensileStrength.max}
                                required={sampleData.mechanical.tensileStrength.required}
                                passed={true}
                                color="emerald"
                                className="bg-[#0A0A0A] border-white/5"
                            />
                            <MechanicalPropertyBar
                                label="Yield Strength (ReH)"
                                value={sampleData.mechanical.yieldStrength.value}
                                unit={sampleData.mechanical.yieldStrength.unit}
                                min={sampleData.mechanical.yieldStrength.min}
                                max={sampleData.mechanical.yieldStrength.max}
                                required={sampleData.mechanical.yieldStrength.required}
                                passed={true}
                                color="blue"
                                className="bg-[#0A0A0A] border-white/5"
                            />
                            <MechanicalPropertyBar
                                label="Elongation (A)"
                                value={sampleData.mechanical.elongation.value}
                                unit={sampleData.mechanical.elongation.unit}
                                min={sampleData.mechanical.elongation.min}
                                max={sampleData.mechanical.elongation.max}
                                required={sampleData.mechanical.elongation.required}
                                passed={true}
                                color="purple"
                                className="bg-[#0A0A0A] border-white/5"
                            />
                            <MechanicalPropertyBar
                                label="Impact Energy (KV)"
                                value={sampleData.mechanical.impactEnergy.value}
                                unit={sampleData.mechanical.impactEnergy.unit}
                                min={sampleData.mechanical.impactEnergy.min}
                                max={sampleData.mechanical.impactEnergy.max}
                                required={sampleData.mechanical.impactEnergy.required}
                                passed={true}
                                color="amber"
                                className="bg-[#0A0A0A] border-white/5"
                            />
                        </div>
                    </section>

                    {/* 3️⃣ PERFORMANCE RADAR */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 text-xl font-bold text-white">
                            <Activity className="h-5 w-5 text-purple-500" />
                            <h2>Performance Profile</h2>
                        </div>

                        <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 h-[400px] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={sampleData.radarComparison}>
                                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                    <PolarAngleAxis dataKey="property" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Data Steel"
                                        dataKey="dataSteel"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        fill="#8b5cf6"
                                        fillOpacity={0.3}
                                    />
                                    <Radar
                                        name="Industry Avg"
                                        dataKey="industryAvg"
                                        stroke="#94a3b8"
                                        strokeWidth={1}
                                        fill="#94a3b8"
                                        fillOpacity={0.1}
                                        strokeDasharray="4 4"
                                    />
                                </RadarChart>
                            </ResponsiveContainer>

                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                                    <span className="text-xs text-white/60">This Batch</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-slate-500" />
                                    <span className="text-xs text-white/40">Standard</span>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* 4️⃣ USE PHASE & MICROSCOPY */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-500/30 transition-colors">
                        <Shield className="h-8 w-8 text-blue-500 mb-4" />
                        <div className="text-2xl font-bold text-white mb-1">Class C4</div>
                        <div className="text-sm text-white/60">Corrosion Resistance</div>
                        <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[80%]" />
                        </div>
                    </div>

                    <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-purple-500/30 transition-colors">
                        <Microscope className="h-8 w-8 text-purple-500 mb-4" />
                        <div className="text-2xl font-bold text-white mb-1">Grade 9</div>
                        <div className="text-sm text-white/60">Grain Size (ASTM E112)</div>
                        <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[90%]" />
                        </div>
                    </div>

                    <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-emerald-500/30 transition-colors">
                        <Layers className="h-8 w-8 text-emerald-500 mb-4" />
                        <div className="text-2xl font-bold text-white mb-1">0.89</div>
                        <div className="text-sm text-white/60">Carbon Equivalent (CEV)</div>
                        <div className="mt-4 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[40%]" />
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}
