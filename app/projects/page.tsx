'use client'
import { useState } from 'react'
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaEllipsisH,
  FaRegClock,
  FaUserCircle,
  FaTasks,
  FaRegCalendarAlt
} from 'react-icons/fa'

interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'in-progress' | 'review' | 'completed'
  progress: number
  dueDate: string
  team: TeamMember[]
  tasks: number
  completedTasks: number
}

interface TeamMember {
  id: string
  name: string
  role: string
  avatar?: string
}

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign and rebuild the company website with modern technologies',
    status: 'in-progress',
    progress: 65,
    dueDate: '2024-04-15',
    team: [
      { id: '1', name: 'John Doe', role: 'Lead Developer' },
      { id: '2', name: 'Sarah Smith', role: 'Designer' }
    ],
    tasks: 24,
    completedTasks: 16
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Develop a new mobile app for customer engagement',
    status: 'planning',
    progress: 25,
    dueDate: '2024-05-30',
    team: [
      { id: '3', name: 'Mike Johnson', role: 'Project Manager' },
      { id: '4', name: 'Emily Brown', role: 'Developer' }
    ],
    tasks: 18,
    completedTasks: 4
  }
]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-purple-100 text-purple-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Project Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" />
          New Project
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">All Status</option>
          <option value="planning">Planning</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg">{project.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{project.description}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <FaEllipsisH />
              </button>
            </div>

            <div className="space-y-4">
              {/* Status and Progress */}
              <div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ').charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 rounded-full h-2" 
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Tasks and Due Date */}
              <div className="flex justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <FaTasks className="mr-2" />
                  <span>{project.completedTasks}/{project.tasks} tasks</span>
                </div>
                <div className="flex items-center">
                  <FaRegCalendarAlt className="mr-2" />
                  <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Team */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Team Members</h4>
                <div className="flex -space-x-2">
                  {project.team.map(member => (
                    <div
                      key={member.id}
                      className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                      title={`${member.name} - ${member.role}`}
                    >
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        <FaUserCircle className="w-full h-full text-gray-400" />
                      )}
                    </div>
                  ))}
                  <button className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-gray-500 hover:bg-gray-200">
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 