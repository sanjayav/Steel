# Data Steel Passport — The Future of Sustainable Steel Verification

![Status](https://img.shields.io/badge/Status-Production%20Ready-emerald)
![License](https://img.shields.io/badge/License-MIT-blue)
![Tech](https://img.shields.io/badge/Tech-React%20%7C%20Vite%20%7C%20Tailwind-0ea5e9)

**Data Steel Passport** is a cutting-edge Digital Product Passport (DPP) platform designed to bring transparency, trust, and premium value to the green steel supply chain. By combining blockchain-backed verification with a high-fidelity, cinematic user experience, we empower manufacturers to showcase their sustainability achievements and buyers to procure with confidence.

---

## Product Overview

The steel industry is transitioning to net-zero, but verifying claims is complex. **Data Steel Passport** solves this by creating an immutable, digital twin for every steel coil produced.

### Core Value Proposition
*   **Transparency**: End-to-end traceability from mining to recycling.
*   **Trust**: Blockchain-anchored data points and third-party certifications (TÜV SÜD, DNV).
*   **Premium Experience**: A "Tesla-like" marketing interface that elevates the perceived value of green products.
*   **Compliance**: Ready for EU Digital Product Passport (DPP), CBAM, and ESPR regulations.

---

## Key Features

### 1. The Ultimate Green Passport (/passport)
A public-facing, mobile-optimized digital identity for steel products.
*   **Cinematic Hero Section**: Immersive visuals showcasing the physical product.
*   **Live Sustainability Metrics**: Real-time data on CO2 intensity, recycled content, and renewable energy mix.
*   **Trust Badges**: Animated, verified badges for Climate Rating (A+), Circularity, and Standards.
*   **QR & Blockchain Verification**: Instant authenticity checks via dynamic QR codes and on-chain transaction hashes.

### 2. Value Chain Traceability (/traceability)
An enterprise-grade map visualizing the complete product journey.
*   **Global Supply Chain Map**: Interactive Leaflet map tracking movement from mines to OEMs.
*   **Chain of Custody Timeline**: Scrollable event log of every transformation, shipment, and audit.
*   **ESG Analytics**: Detailed breakdown of Scope 1, 2, & 3 emissions and actor performance.

### 3. Technical Data Sheet (/technical)
A comprehensive engineering resource for procurement and quality teams.
*   **Material Composition**: Periodic table visualization of chemical elements.
*   **Mechanical Properties**: Precision bar charts for Yield Strength, Tensile Strength, and Elongation.
*   **Performance Radar**: Comparative analysis against industry standards (EN 10025).

---

## Technology Stack

Built with a modern, performance-first stack designed for scalability and developer experience.

*   **Core**: [React 18](https://reactjs.org/) (TypeScript) + [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom Design System (Glassmorphism, Neon Accents)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) for fluid transitions and micro-interactions.
*   **Visualization**: [Recharts](https://recharts.org/) for data analytics & [React Leaflet](https://react-leaflet.js.org/) for mapping.
*   **Icons**: [Lucide React](https://lucide.dev/) for consistent, crisp iconography.
*   **Utilities**: `clsx`, `tailwind-merge` for robust class handling.

---

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sanjayav/Steel.git
    cd Steel
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the app**
    Visit `http://localhost:5173` (or the port shown in your terminal) to view the application.

---

## Project Structure

```bash
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI primitives (Buttons, Badges)
│   ├── PremiumMetricCard.tsx  # High-fidelity data cards
│   ├── TrustBadges.tsx        # Verified certification badges
│   └── ...
├── pages/             # Main application views
│   ├── GreenSteelPassport.tsx # Public marketing page
│   ├── Dashboard2.tsx         # Traceability map
│   ├── TechnicalData.tsx      # Engineering data
│   └── ...
├── index.css          # Global styles & Tailwind directives
└── App.tsx            # Routing and layout configuration
```

---

## Design System

Our design philosophy centers on **"Industrial Precision meets Digital Future"**.

*   **Colors**: Deep Obsidian (`#050505`) backgrounds with Emerald (`#10B981`) and Electric Blue (`#3B82F6`) accents.
*   **Typography**: Clean, sans-serif fonts optimized for readability and data density.
*   **Effects**: Extensive use of backdrop blur, subtle gradients, and glowing borders to create depth.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Built with by the Aeiforo Digital Team</p>
</div>
