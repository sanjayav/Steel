# Green Steel Passport Dashboard

A comprehensive UI/UX implementation for tracking and visualizing steel product sustainability metrics, regulatory compliance, and value chain transparency.

## 🎨 Design System

### Theme
- **Dark industrial steel aesthetics** with neon-green and cyan accents
- Brushed steel texture patterns in headers
- Glass-matte card blend with soft micro-animations

### Colors
- Background: `#0C1117` (deep graphite)
- Cards: `#161C23` (matte steel)
- Dividers: `#1F2933`
- Primary: `#00D48E` (neon green)
- Secondary: `#4ED0FF` (cyan)

### Typography
- Headings: Inter SemiBold
- Body: Inter Regular
- Numbers: Inter ExtraBold with wide letter-spacing

### Animations
- Hover effects: 6px lift with shadow
- Transitions: 0.2s ease
- Micro-animations throughout

## 📊 Dashboards

### 1. ESPR & DPP Compliance Overview
Clean compliance cockpit with:
- Top KPI ribbon (PCF, Recycled %, DPP Status, etc.)
- Large compliance score gauge
- Checklist grid with status badges
- ESPR-Ready shield badge

### 2. Value Chain & Traceability Map
Futuristic supply chain visualization:
- Horizontal flow timeline with 12 stages
- Animated glow paths between stages
- Clickable stage cards with detail drawer
- EPCIS event history

### 3. Carbon, Energy & Climate Performance
Technical analytical dashboard:
- PCF waterfall chart
- Energy mix donut chart
- Production route badge
- 5-level data quality ladder
- Climate performance thermometer

### 4. Material, Circularity & Recycled Content
Circular economy focus:
- Periodic table-style composition grid
- Circularity gauge (0-10)
- Recycled content breakdown
- By-product utilization bars

### 5. Durability, Reparability & Use-Phase
Engineering QC dashboard:
- Vertical mechanical property test bars
- Corrosion resistance classes map
- Lifetime performance curve
- Repairability index (0-10)

### 6. End-of-Life & Substances of Concern
Safety and circular pathways:
- SoC compliance flag panel
- Step-by-step dismantling guide
- Recycling route flow
- Recovery vs downcycling meter

### 7. Data Quality, VCs & Chain-of-Custody
Blockchain-style verification:
- 5-level data quality ladder
- Verifiable credentials (hexagonal tiles)
- Chain-of-custody timeline
- Audit summary cards

### 8. Documents & Certifications
Document vault:
- Searchable document grid
- Type and site filters
- Validity status badges
- Preview drawer with metadata

### 9. Green Premium / Commercial View
Business-centric value storytelling:
- Value proposition hero section
- Carbon savings calculator
- ESPR advantage meter
- Competitive comparison charts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The application will automatically open at `http://localhost:3000`

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **React Router** - Navigation
- **Lucide React** - Icon system

## 📁 Project Structure

```
steel passport/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx       # Main layout with sidebar
│   │   ├── KPITile.tsx      # KPI metric cards
│   │   ├── Card.tsx         # Base card component
│   │   ├── CircularGauge.tsx
│   │   ├── ProgressBar.tsx
│   │   └── StatusBadge.tsx
│   ├── pages/               # Dashboard pages
│   │   ├── Dashboard1.tsx   # ESPR & DPP Compliance
│   │   ├── Dashboard2.tsx   # Traceability Map
│   │   ├── Dashboard3.tsx   # Carbon & Energy
│   │   ├── Dashboard4.tsx   # Material & Circularity
│   │   ├── Dashboard5.tsx   # Durability
│   │   ├── Dashboard6.tsx   # End-of-Life
│   │   ├── Dashboard7.tsx   # Data Quality & VCs
│   │   ├── Dashboard8.tsx   # Documents
│   │   └── Dashboard9.tsx   # Commercial View
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🎯 Key Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Theme** - Industrial steel aesthetic throughout
- **Smooth Animations** - Framer Motion powered transitions
- **Interactive Components** - Hover effects, click actions, drawers
- **Data Visualization** - Charts, gauges, and custom visualizations
- **Type Safety** - Full TypeScript implementation
- **Modern Stack** - Latest React patterns and best practices

## 🌟 Design Highlights

- Neon glow effects on primary elements
- Brushed steel texture patterns
- Glass-morphism card effects
- Micro-animations on hover
- Color-coded status indicators
- Hexagonal badges for certifications
- Blockchain-inspired verification UI
- Elegant gradient overlays

## 📝 License

This project is proprietary and confidential.

## 👥 Credits

Designed and developed for Tata Steel's Green Steel Passport initiative.

