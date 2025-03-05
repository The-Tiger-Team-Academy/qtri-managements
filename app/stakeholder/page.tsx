'use client'
import { useState } from 'react'
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSearch,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa'

interface Stakeholder {
  id: string
  name: string
  role: string
  organization: string
  influence: number // 1-5
  interest: number // 1-5
  strategy: string
  status: 'positive' | 'neutral' | 'negative'
  notes: string
}

const initialStakeholders: Stakeholder[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Project Manager',
    organization: 'Tech Corp',
    influence: 5,
    interest: 4,
    strategy: 'Key Player - Engage Closely',
    status: 'positive',
    notes: 'Strong supporter of the project'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Department Head',
    organization: 'Client Co',
    influence: 4,
    interest: 2,
    strategy: 'Keep Satisfied',
    status: 'neutral',
    notes: 'Needs more information about benefits'
  }
]

export default function StakeholderPage() {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(initialStakeholders)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof Stakeholder>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getStatusColor = (status: Stakeholder['status']) => {
    switch (status) {
      case 'positive': return 'bg-green-100 text-green-800'
      case 'neutral': return 'bg-gray-100 text-gray-800'
      case 'negative': return 'bg-red-100 text-red-800'
    }
  }

  const getQuadrant = (influence: number, interest: number) => {
    if (influence >= 3 && interest >= 3) return 'Key Player'
    if (influence >= 3 && interest < 3) return 'Keep Satisfied'
    if (influence < 3 && interest >= 3) return 'Keep Informed'
    return 'Monitor'
  }

  const sortedStakeholders = [...stakeholders]
    .filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.organization.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      }
      return aValue < bValue ? 1 : -1
    })

  return (
    <div className="p-6" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <h1 className="text-2xl font-semibold mb-6">Stakeholder Map</h1>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            setSelectedStakeholder(null)
            setIsModalOpen(true)
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Stakeholder
        </button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search stakeholders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Matrix View */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Power/Interest Matrix</h2>
        <div className="relative h-[400px] border-2">
          {/* Matrix Quadrants */}
          <div className="grid grid-cols-2 grid-rows-2 h-full">
            <div className="border-r-2 border-b-2 p-4 bg-green-50">
              <h3 className="font-medium">Key Players</h3>
            </div>
            <div className="border-b-2 p-4 bg-yellow-50">
              <h3 className="font-medium">Keep Satisfied</h3>
            </div>
            <div className="border-r-2 p-4 bg-blue-50">
              <h3 className="font-medium">Keep Informed</h3>
            </div>
            <div className="p-4 bg-gray-50">
              <h3 className="font-medium">Monitor</h3>
            </div>
          </div>
          
          {/* Plot stakeholders */}
          {stakeholders.map(stakeholder => (
            <div
              key={stakeholder.id}
              className="absolute w-4 h-4 rounded-full bg-blue-600"
              style={{
                left: `${(stakeholder.interest / 5) * 100}%`,
                bottom: `${(stakeholder.influence / 5) * 100}%`,
                transform: 'translate(-50%, 50%)',
              }}
              title={stakeholder.name}
            />
          ))}
        </div>
      </div>

      {/* Table View */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name/Organization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Influence/Interest
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Strategy
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStakeholders.map(stakeholder => (
              <tr key={stakeholder.id}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{stakeholder.name}</div>
                  <div className="text-sm text-gray-500">{stakeholder.organization}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {stakeholder.role}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    Influence: {stakeholder.influence}/5
                  </div>
                  <div className="text-sm text-gray-900">
                    Interest: {stakeholder.interest}/5
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {stakeholder.strategy}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(stakeholder.status)}`}>
                    {stakeholder.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedStakeholder(stakeholder)
                      setIsModalOpen(true)
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => {
                      setStakeholders(stakeholders.filter(s => s.id !== stakeholder.id))
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {selectedStakeholder ? 'Edit' : 'Add'} Stakeholder
            </h2>
            {/* Add form fields here */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle save
                  setIsModalOpen(false)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 