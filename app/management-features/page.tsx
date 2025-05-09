'use client'
import { useState } from 'react'
import { 
  FaCog, 
  FaToggleOn, 
  FaToggleOff, 
  FaProjectDiagram, 
  FaUsers, 
  FaChartLine, 
  FaGraduationCap,
  FaRobot,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBook
} from 'react-icons/fa'

interface Feature {
  id: number
  name: string
  description: string
  enabled: boolean
  category: 'project' | 'team' | 'finance' | 'education' | 'ai' | 'other'
  icon: React.ReactNode
}

export default function ManagementFeaturesPage() {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 1,
      name: 'Project Timeline',
      description: 'Manage and track project progress with timeline visualization',
      enabled: true,
      category: 'project',
      icon: <FaProjectDiagram className="w-5 h-5" />
    },
    {
      id: 2,
      name: 'Team Management',
      description: 'Organize and manage team members, roles, and responsibilities',
      enabled: true,
      category: 'team',
      icon: <FaUsers className="w-5 h-5" />
    },
    {
      id: 3,
      name: 'HR Management',
      description: 'Human resources management and employee tracking',
      enabled: true,
      category: 'team',
      icon: <FaUsers className="w-5 h-5" />
    },
    {
      id: 4,
      name: 'Finance Management',
      description: 'Track expenses, budgets, and financial reports',
      enabled: false,
      category: 'finance',
      icon: <FaMoneyBillWave className="w-5 h-5" />
    },
    {
      id: 5,
      name: 'Education Management',
      description: 'Manage educational programs and student progress',
      enabled: true,
      category: 'education',
      icon: <FaGraduationCap className="w-5 h-5" />
    },
    {
      id: 6,
      name: 'AI Assistant',
      description: 'Get help and insights from our AI assistant',
      enabled: true,
      category: 'ai',
      icon: <FaRobot className="w-5 h-5" />
    },
    {
      id: 7,
      name: 'Calendar & Scheduling',
      description: 'Manage events, meetings, and schedules',
      enabled: true,
      category: 'other',
      icon: <FaCalendarAlt className="w-5 h-5" />
    },
    {
      id: 8,
      name: 'Document Management',
      description: 'Store and organize important documents',
      enabled: true,
      category: 'other',
      icon: <FaBook className="w-5 h-5" />
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', name: 'All Features' },
    { id: 'project', name: 'Project Management' },
    { id: 'team', name: 'Team & HR' },
    { id: 'finance', name: 'Finance' },
    { id: 'education', name: 'Education' },
    { id: 'ai', name: 'AI Tools' },
    { id: 'other', name: 'Other' }
  ]

  const toggleFeature = (id: number) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
    ))
  }

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || feature.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Management Features</h1>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFeatures.map(feature => (
          <div 
            key={feature.id} 
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                </div>
              </div>
              <button
                onClick={() => toggleFeature(feature.id)}
                className={`p-2 rounded-full transition-colors ${
                  feature.enabled ? 'text-green-500 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'
                }`}
              >
                {feature.enabled ? <FaToggleOn className="w-6 h-6" /> : <FaToggleOff className="w-6 h-6" />}
              </button>
            </div>
            <div className="mt-4">
              <span className={`text-xs px-2 py-1 rounded-full ${
                feature.enabled 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {feature.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredFeatures.length === 0 && (
        <div className="text-center py-12">
          <FaCog className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No features found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
} 