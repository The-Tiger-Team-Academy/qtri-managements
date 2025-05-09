'use client'
import { useState, useCallback, useMemo } from 'react'
import { 
  FaUserFriends, 
  FaChartBar, 
  FaClock, 
  FaStar, 
  FaChartLine,
  FaFilter,
  FaPlus,
  FaNetworkWired,
  FaSearch,
  FaEdit,
  FaTrash
} from 'react-icons/fa'
import { Dialog } from '@headlessui/react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
} from 'chart.js'
import { Bar, Line, Radar } from 'react-chartjs-2'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Position
} from 'reactflow'
import 'reactflow/dist/style.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
)

interface Stakeholder {
  id: number
  name: string
  role: string
  position: string
  company: string
  influence: number
  interest: number
  impact: number
  timeline: 'short' | 'medium' | 'long'
  benefits: string[]
  risks: string[]
  relationships: {
    stakeholderId: number
    type: 'collaboration' | 'dependency' | 'influence' | 'conflict'
    strength: number
  }[]
}

interface StakeholderForm {
  id?: number
  name: string
  role: string
  position: string
  company: string
  influence: number
  interest: number
  impact: number
  timeline: 'short' | 'medium' | 'long'
  benefits: string[]
  risks: string[]
  relationships: {
    stakeholderId: number
    type: 'collaboration' | 'dependency' | 'influence' | 'conflict'
    strength: number
  }[]
}

export default function StakeholderMapPage() {
  const [view, setView] = useState<'influence' | 'timeline' | 'impact' | 'benefits' | 'network'>('network')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStakeholder, setSelectedStakeholder] = useState<StakeholderForm | null>(null)
  const [formData, setFormData] = useState<StakeholderForm>({
    name: '',
    role: 'Internal',
    position: '',
    company: '',
    influence: 5,
    interest: 5,
    impact: 5,
    timeline: 'medium',
    benefits: [],
    risks: [],
    relationships: []
  })
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    // Internal Stakeholders
    {
      id: 1,
      name: 'John Smith',
      role: 'Internal',
      position: 'Project Manager',
      company: 'QTRI',
      influence: 9,
      interest: 8,
      impact: 8,
      timeline: 'short',
      benefits: ['Project Success', 'Career Growth', 'Team Leadership'],
      risks: ['Resource Constraints', 'Timeline Pressure'],
      relationships: [
        { stakeholderId: 2, type: 'collaboration', strength: 8 },
        { stakeholderId: 3, type: 'collaboration', strength: 7 }
      ]
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Internal',
      position: 'Technical Lead',
      company: 'QTRI',
      influence: 8,
      interest: 9,
      impact: 7,
      timeline: 'short',
      benefits: ['Technical Innovation', 'Team Development', 'Process Improvement'],
      risks: ['Technical Challenges', 'Team Coordination'],
      relationships: [
        { stakeholderId: 1, type: 'collaboration', strength: 8 },
        { stakeholderId: 4, type: 'collaboration', strength: 6 }
      ]
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Internal',
      position: 'Business Analyst',
      company: 'QTRI',
      influence: 7,
      interest: 8,
      impact: 6,
      timeline: 'short',
      benefits: ['Process Optimization', 'Data Analysis', 'Business Insights'],
      risks: ['Data Quality', 'Requirement Changes'],
      relationships: [
        { stakeholderId: 1, type: 'collaboration', strength: 7 },
        { stakeholderId: 5, type: 'dependency', strength: 6 }
      ]
    },
    // External Stakeholders
    {
      id: 4,
      name: 'Dr. Emily Wong',
      role: 'External',
      position: 'Research Director',
      company: 'Quantum Research Institute',
      influence: 8,
      interest: 7,
      impact: 8,
      timeline: 'medium',
      benefits: ['Research Collaboration', 'Knowledge Sharing', 'Joint Publications'],
      risks: ['Intellectual Property', 'Research Alignment'],
      relationships: [
        { stakeholderId: 2, type: 'collaboration', strength: 6 },
        { stakeholderId: 6, type: 'influence', strength: 7 }
      ]
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'External',
      position: 'Product Manager',
      company: 'Tech Solutions Inc.',
      influence: 7,
      interest: 8,
      impact: 7,
      timeline: 'medium',
      benefits: ['Product Integration', 'Market Access', 'Customer Feedback'],
      risks: ['Integration Challenges', 'Market Competition'],
      relationships: [
        { stakeholderId: 3, type: 'dependency', strength: 6 },
        { stakeholderId: 7, type: 'collaboration', strength: 5 }
      ]
    },
    // Partner Stakeholders
    {
      id: 6,
      name: 'Prof. Robert Lee',
      role: 'Partner',
      position: 'Academic Advisor',
      company: 'National University',
      influence: 9,
      interest: 6,
      impact: 7,
      timeline: 'long',
      benefits: ['Academic Validation', 'Student Resources', 'Research Funding'],
      risks: ['Academic Timeline', 'Research Focus'],
      relationships: [
        { stakeholderId: 4, type: 'influence', strength: 7 },
        { stakeholderId: 8, type: 'collaboration', strength: 6 }
      ]
    },
    {
      id: 7,
      name: 'Lisa Martinez',
      role: 'Partner',
      position: 'Business Development',
      company: 'Global Tech Partners',
      influence: 7,
      interest: 8,
      impact: 6,
      timeline: 'medium',
      benefits: ['Market Expansion', 'Business Opportunities', 'Network Access'],
      risks: ['Market Volatility', 'Partner Alignment'],
      relationships: [
        { stakeholderId: 5, type: 'collaboration', strength: 5 },
        { stakeholderId: 8, type: 'influence', strength: 6 }
      ]
    },
    // Regulatory Stakeholders
    {
      id: 8,
      name: 'James Wilson',
      role: 'Regulatory',
      position: 'Compliance Officer',
      company: 'Technology Standards Board',
      influence: 8,
      interest: 6,
      impact: 7,
      timeline: 'long',
      benefits: ['Regulatory Compliance', 'Industry Standards', 'Quality Assurance'],
      risks: ['Regulatory Changes', 'Compliance Requirements'],
      relationships: [
        { stakeholderId: 6, type: 'collaboration', strength: 6 },
        { stakeholderId: 7, type: 'influence', strength: 6 }
      ]
    }
  ])

  const getEdgeColor = (type: string) => {
    switch (type) {
      case 'collaboration': return '#3B82F6'
      case 'dependency': return '#10B981'
      case 'influence': return '#F59E0B'
      case 'conflict': return '#EF4444'
      default: return '#6B7280'
    }
  }

  // Convert stakeholders to ReactFlow nodes and edges with radar layout
  const initialNodes: Node[] = useMemo(() => {
    const centerX = 500
    const centerY = 300
    const radius = 200

    return stakeholders.map((stakeholder, index) => {
      const angle = (index * 2 * Math.PI) / stakeholders.length
      const x = centerX + radius * Math.cos(angle)
      const y = centerY + radius * Math.sin(angle)

      return {
        id: stakeholder.id.toString(),
        type: 'default',
        position: { x, y },
        data: { 
          label: stakeholder.name,
          role: stakeholder.role,
          position: stakeholder.position,
          company: stakeholder.company,
          influence: stakeholder.influence,
          timeline: stakeholder.timeline
        },
        style: {
          background: stakeholder.role === 'Internal' ? '#EFF6FF' : 
                     stakeholder.role === 'External' ? '#F0FDF4' :
                     stakeholder.role === 'Partner' ? '#FEF3C7' :
                     '#FEE2E2',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '10px',
          width: '200px'
        }
      }
    })
  }, [stakeholders])

  const initialEdges: Edge[] = stakeholders.flatMap(stakeholder => 
    stakeholder.relationships.map(rel => ({
      id: `e${stakeholder.id}-${rel.stakeholderId}`,
      source: stakeholder.id.toString(),
      target: rel.stakeholderId.toString(),
      label: rel.type,
      style: {
        stroke: getEdgeColor(rel.type),
        strokeWidth: rel.strength / 2
      },
      animated: rel.type === 'conflict'
    }))
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const influenceData = {
    labels: stakeholders.map(s => s.name),
    datasets: [
      {
        label: 'Influence',
        data: stakeholders.map(s => s.influence),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      },
      {
        label: 'Interest',
        data: stakeholders.map(s => s.interest),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1
      }
    ]
  }

  const timelineData = {
    labels: stakeholders.map(s => s.name),
    datasets: [
      {
        label: 'Impact Over Time',
        data: stakeholders.map(s => s.impact),
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.5)',
        tension: 0.1
      }
    ]
  }

  const impactData = {
    labels: ['Influence', 'Interest', 'Impact'],
    datasets: stakeholders.map(s => ({
      label: s.name,
      data: [s.influence, s.interest, s.impact],
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
      borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
      borderWidth: 1
    }))
  }

  const benefitsData = {
    labels: stakeholders.map(s => s.name),
    datasets: [
      {
        label: 'Benefits',
        data: stakeholders.map(s => s.benefits.length),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1
      },
      {
        label: 'Risks',
        data: stakeholders.map(s => s.risks.length),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1
      }
    ]
  }

  const viewOptions = [
    { id: 'network', name: 'Network View', icon: <FaNetworkWired /> },
    { id: 'influence', name: 'Influence & Interest', icon: <FaUserFriends /> },
    { id: 'timeline', name: 'Timeline Impact', icon: <FaClock /> },
    { id: 'impact', name: 'Impact Analysis', icon: <FaStar /> },
    { id: 'benefits', name: 'Benefits & Risks', icon: <FaChartLine /> }
  ]

  const [searchTerm, setSearchTerm] = useState('')

  const filteredStakeholders = useMemo(() => {
    return stakeholders.filter(stakeholder => 
      stakeholder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stakeholder.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stakeholder.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [stakeholders, searchTerm])

  const handleAddStakeholder = () => {
    setSelectedStakeholder(null)
    setFormData({
      name: '',
      role: 'Internal',
      position: '',
      company: '',
      influence: 5,
      interest: 5,
      impact: 5,
      timeline: 'medium',
      benefits: [],
      risks: [],
      relationships: []
    })
    setIsModalOpen(true)
  }

  const handleEditStakeholder = (stakeholder: Stakeholder) => {
    setSelectedStakeholder(stakeholder)
    setFormData({
      ...stakeholder,
      benefits: [...stakeholder.benefits],
      risks: [...stakeholder.risks],
      relationships: [...stakeholder.relationships]
    })
    setIsModalOpen(true)
  }

  const handleDeleteStakeholder = (id: number) => {
    if (window.confirm('Are you sure you want to delete this stakeholder?')) {
      setStakeholders(prev => prev.filter(s => s.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedStakeholder) {
      // Update existing stakeholder
      setStakeholders(prev => prev.map(s => 
        s.id === selectedStakeholder.id ? { ...formData, id: s.id } : s
      ))
    } else {
      // Add new stakeholder
      const newId = Math.max(...stakeholders.map(s => s.id)) + 1
      setStakeholders(prev => [...prev, { ...formData, id: newId }])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Stakeholder Map</h1>
        <button 
          onClick={handleAddStakeholder}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Add Stakeholder
        </button>
      </div>

      {/* View Selector */}
      <div className="mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {viewOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setView(option.id as any)}
              className={`flex items-center justify-center p-4 rounded-lg transition-colors ${
                view === option.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{option.icon}</span>
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart/Network Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            {viewOptions.find(v => v.id === view)?.name} Analysis
          </h2>
          <div className="h-[600px]">
            {view === 'network' ? (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
              >
                <Background />
                <Controls />
              </ReactFlow>
            ) : view === 'influence' ? (
              <Bar
                data={influenceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 10
                    }
                  }
                }}
              />
            ) : view === 'timeline' ? (
              <Line
                data={timelineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 10
                    }
                  }
                }}
              />
            ) : view === 'impact' ? (
              <Radar
                data={impactData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      beginAtZero: true,
                      max: 10
                    }
                  }
                }}
              />
            ) : (
              <Bar
                data={benefitsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* Stakeholder List and Search */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stakeholders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStakeholders.map(stakeholder => (
                  <tr 
                    key={stakeholder.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          stakeholder.role === 'Internal' ? 'bg-blue-500' :
                          stakeholder.role === 'External' ? 'bg-green-500' :
                          stakeholder.role === 'Partner' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <div className="text-sm font-medium text-gray-900">{stakeholder.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stakeholder.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stakeholder.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stakeholder.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditStakeholder(stakeholder)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteStakeholder(stakeholder.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stakeholder Form Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-lg p-6">
            <Dialog.Title className="text-lg font-medium mb-4">
              {selectedStakeholder ? 'Edit Stakeholder' : 'Add New Stakeholder'}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="Internal">Internal</option>
                    <option value="External">External</option>
                    <option value="Partner">Partner</option>
                    <option value="Regulatory">Regulatory</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Influence (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.influence}
                    onChange={(e) => setFormData({ ...formData, influence: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Interest (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Impact (1-10)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: parseInt(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timeline</label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value as any })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="short">Short Term</option>
                    <option value="medium">Medium Term</option>
                    <option value="long">Long Term</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {selectedStakeholder ? 'Update' : 'Add'} Stakeholder
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
} 