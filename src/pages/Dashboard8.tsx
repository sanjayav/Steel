import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import { 
  FileText, 
  Award, 
  Shield, 
  Download, 
  Eye, 
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Search
} from 'lucide-react'

interface Document {
  id: string
  title: string
  type: 'EPD' | 'Audit' | 'Compliance' | 'Test' | 'Certificate'
  site: string
  issueDate: string
  expiryDate: string
  status: 'valid' | 'expiring' | 'expired'
  description: string
}

const documents: Document[] = [
  {
    id: '1',
    title: 'Environmental Product Declaration',
    type: 'EPD',
    site: 'IJmuiden Plant',
    issueDate: '2024-01-15',
    expiryDate: '2027-01-15',
    status: 'valid',
    description: 'Complete life cycle assessment and environmental impact data per EN 15804+A2'
  },
  {
    id: '2',
    title: 'ISO 14001:2015 Certificate',
    type: 'Certificate',
    site: 'IJmuiden Plant',
    issueDate: '2023-03-20',
    expiryDate: '2026-03-20',
    status: 'valid',
    description: 'Environmental management system certification'
  },
  {
    id: '3',
    title: 'ResponsibleSteel Certification',
    type: 'Certificate',
    site: 'IJmuiden Plant',
    issueDate: '2023-06-10',
    expiryDate: '2026-06-10',
    status: 'valid',
    description: 'Responsible sourcing and sustainability certification'
  },
  {
    id: '4',
    title: 'Third-Party Carbon Audit',
    type: 'Audit',
    site: 'IJmuiden Plant',
    issueDate: '2024-10-15',
    expiryDate: '2025-10-15',
    status: 'expiring',
    description: 'TÜV SÜD verification of PCF calculation and data quality'
  },
  {
    id: '5',
    title: 'REACH Compliance Declaration',
    type: 'Compliance',
    site: 'All Sites',
    issueDate: '2024-09-01',
    expiryDate: '2025-09-01',
    status: 'valid',
    description: 'Substances of Concern compliance per EU REACH regulation'
  },
  {
    id: '6',
    title: 'Mechanical Properties Test Report',
    type: 'Test',
    site: 'IJmuiden Lab',
    issueDate: '2024-11-01',
    expiryDate: '2025-11-01',
    status: 'valid',
    description: 'Tensile strength, yield, elongation, and impact testing per EN 10025-2'
  },
  {
    id: '7',
    title: 'RoHS Compliance Certificate',
    type: 'Compliance',
    site: 'All Sites',
    issueDate: '2024-08-15',
    expiryDate: '2025-08-15',
    status: 'valid',
    description: 'Restriction of Hazardous Substances compliance'
  },
  {
    id: '8',
    title: 'Material Composition Analysis',
    type: 'Test',
    site: 'IJmuiden Lab',
    issueDate: '2024-10-20',
    expiryDate: '2025-10-20',
    status: 'valid',
    description: 'XRF and chemical analysis of steel composition'
  },
]

export default function Dashboard8() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [filterType, setFilterType] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredDocs = documents.filter(doc => {
    const matchesType = filterType === 'All' || doc.type === filterType
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  const validDocs = documents.filter(d => d.status === 'valid').length
  const expiringDocs = documents.filter(d => d.status === 'expiring').length
  const totalDocs = documents.length
  const completeness = (validDocs / totalDocs) * 100

  const documentTypes = ['All', 'EPD', 'Certificate', 'Audit', 'Compliance', 'Test']

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'valid':
        return { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/50', icon: CheckCircle }
      case 'expiring':
        return { color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/50', icon: Clock }
      case 'expired':
        return { color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/50', icon: AlertCircle }
      default:
        return { color: 'text-gray-500', bg: 'bg-gray-500/10', border: 'border-gray-500/50', icon: FileText }
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'EPD':
        return FileText
      case 'Certificate':
        return Award
      case 'Audit':
        return Shield
      case 'Compliance':
        return CheckCircle
      case 'Test':
        return FileText
      default:
        return FileText
    }
  }

  return (
    <div className="p-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <FileText className="text-primary" size={40} />
          Documents & Certifications
        </h1>
        <p className="text-gray-400">Complete document archive and certification vault</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">{totalDocs}</div>
          <div className="text-sm text-gray-400 mb-1">Total Documents</div>
          <div className="text-xs text-gray-500">All types & sites</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">{validDocs}</div>
          <div className="text-sm text-gray-400 mb-1">Valid Documents</div>
          <div className="text-xs text-gray-500">Active & current</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-yellow-500 number-tile mb-2">{expiringDocs}</div>
          <div className="text-sm text-gray-400 mb-1">Expiring Soon</div>
          <div className="text-xs text-gray-500">Within 365 days</div>
        </Card>
        <Card>
          <div className="text-4xl font-extrabold text-primary number-tile mb-2">
            {completeness.toFixed(0)}%
          </div>
          <div className="text-sm text-gray-400 mb-1">Evidence Completeness</div>
          <div className="text-xs text-gray-500">Document coverage</div>
        </Card>
      </div>

      {/* Evidence Progress Bar */}
      <Card className="mb-8">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Evidence Completeness</h2>
          <p className="text-sm text-gray-400">Overall document and certification coverage</p>
        </div>
        <ProgressBar
          value={completeness}
          maxValue={100}
          label="Document Coverage"
          color="#00D48E"
          height="h-6"
        />
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{validDocs}</div>
            <div className="text-xs text-gray-400 mt-1">Valid</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-500">{expiringDocs}</div>
            <div className="text-xs text-gray-400 mt-1">Expiring</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-500">
              {totalDocs - validDocs - expiringDocs}
            </div>
            <div className="text-xs text-gray-400 mt-1">Expired</div>
          </div>
        </div>
      </Card>

      {/* Search and Filters */}
      <Card className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-divider rounded-lg
                       text-white placeholder-gray-500 focus:border-primary outline-none
                       transition-colors"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <div className="flex gap-2 flex-wrap">
              {documentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-semibold transition-all
                    ${filterType === type
                      ? 'bg-primary text-background shadow-glow-primary'
                      : 'bg-card border border-divider text-gray-400 hover:border-primary/50'
                    }
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc, index) => {
          const statusConfig = getStatusConfig(doc.status)
          const StatusIcon = statusConfig.icon
          const TypeIcon = getTypeIcon(doc.type)

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover className="h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    w-14 h-14 rounded-lg flex items-center justify-center border-2
                    ${statusConfig.bg} ${statusConfig.border}
                  `}>
                    <TypeIcon className={statusConfig.color} size={24} />
                  </div>

                  <div className={`
                    flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold
                    ${statusConfig.bg} ${statusConfig.color}
                  `}>
                    <StatusIcon size={12} />
                    {doc.status.toUpperCase()}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{doc.title}</h3>
                <p className="text-xs text-gray-400 mb-4 line-clamp-2">{doc.description}</p>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Type</span>
                    <span className="font-semibold">{doc.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Site</span>
                    <span className="font-semibold">{doc.site}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Issued</span>
                    <span className="font-semibold">{doc.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expires</span>
                    <span className={`font-semibold ${statusConfig.color}`}>{doc.expiryDate}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2
                             bg-primary/10 border border-primary/50 rounded-lg
                             hover:bg-primary/20 transition-colors text-primary text-sm font-semibold"
                  >
                    <Eye size={16} />
                    Preview
                  </button>
                  <button
                    className="flex items-center justify-center px-4 py-2
                             bg-secondary/10 border border-secondary/50 rounded-lg
                             hover:bg-secondary/20 transition-colors text-secondary"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Preview Drawer */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDoc(null)}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto
                       bg-card border-2 border-primary rounded-lg shadow-2xl"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {(() => {
                        const Icon = getTypeIcon(selectedDoc.type)
                        return <Icon className="text-primary" size={32} />
                      })()}
                      <div>
                        <h2 className="text-3xl font-bold">{selectedDoc.title}</h2>
                        <p className="text-sm text-gray-400">{selectedDoc.type} Document</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                  {(() => {
                    const config = getStatusConfig(selectedDoc.status)
                    const StatusIcon = config.icon
                    return (
                      <div className={`
                        inline-flex items-center gap-2 px-4 py-2 rounded-lg
                        ${config.bg} ${config.border} border
                      `}>
                        <StatusIcon className={config.color} size={20} />
                        <span className={`font-semibold ${config.color}`}>
                          {selectedDoc.status.toUpperCase()}
                        </span>
                      </div>
                    )
                  })()}
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-background rounded-lg border border-divider">
                    <div className="text-xs text-gray-400 mb-1">Issue Date</div>
                    <div className="text-lg font-semibold">{selectedDoc.issueDate}</div>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-divider">
                    <div className="text-xs text-gray-400 mb-1">Expiry Date</div>
                    <div className="text-lg font-semibold">{selectedDoc.expiryDate}</div>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-divider">
                    <div className="text-xs text-gray-400 mb-1">Site</div>
                    <div className="text-lg font-semibold">{selectedDoc.site}</div>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-divider">
                    <div className="text-xs text-gray-400 mb-1">Document Type</div>
                    <div className="text-lg font-semibold">{selectedDoc.type}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-400">{selectedDoc.description}</p>
                </div>

                {/* Document Preview Placeholder */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Document Preview</h3>
                  <div className="w-full h-96 bg-background rounded-lg border-2 border-divider
                                flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                    <div className="relative text-center">
                      <FileText className="text-primary mx-auto mb-3" size={64} />
                      <div className="text-gray-400">Document preview would appear here</div>
                      <div className="text-xs text-gray-500 mt-1">PDF, Image, or embedded viewer</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3
                             bg-primary text-background rounded-lg font-semibold
                             hover:shadow-glow-primary transition-all"
                  >
                    <Download size={20} />
                    Download Document
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 px-6 py-3
                             bg-secondary/10 border border-secondary/50 rounded-lg
                             text-secondary font-semibold hover:bg-secondary/20 transition-colors"
                  >
                    <Shield size={20} />
                    Verify Authenticity
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

