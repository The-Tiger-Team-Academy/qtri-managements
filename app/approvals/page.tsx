'use client'
import { useState } from 'react'
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaFileAlt,
  FaSearch,
  FaFilter,
  FaEye
} from 'react-icons/fa'

interface ApprovalRequest {
  id: string
  type: 'document' | 'leave' | 'expense' | 'project'
  title: string
  requester: {
    name: string
    department: string
    avatar?: string
  }
  status: 'pending' | 'approved' | 'rejected'
  priority: 'low' | 'medium' | 'high'
  submittedAt: string
  dueDate?: string
  description: string
  attachments?: number
}

const initialRequests: ApprovalRequest[] = [
  {
    id: 'REQ-001',
    type: 'document',
    title: 'Project Proposal Document',
    requester: {
      name: 'John Doe',
      department: 'Engineering',
    },
    status: 'pending',
    priority: 'high',
    submittedAt: '2024-03-15T09:00:00',
    dueDate: '2024-03-17',
    description: 'Approval needed for the new project proposal document',
    attachments: 2
  },
  {
    id: 'REQ-002',
    type: 'leave',
    title: 'Annual Leave Request',
    requester: {
      name: 'Sarah Smith',
      department: 'HR',
    },
    status: 'pending',
    priority: 'medium',
    submittedAt: '2024-03-14T15:30:00',
    dueDate: '2024-03-16',
    description: 'Requesting annual leave for next week'
  },
  // Add more sample requests...
]

export default function ApprovalsPage() {
  const [requests, setRequests] = useState<ApprovalRequest[]>(initialRequests)
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const handleApprove = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' } : req
    ))
  }

  const handleReject = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ))
  }

  const filteredRequests = requests.filter(req => {
    const matchesFilter = filter === 'all' || req.status === filter
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.requester.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status: ApprovalRequest['status']) => {
    switch (status) {
      case 'approved': return 'text-green-600'
      case 'rejected': return 'text-red-600'
      default: return 'text-yellow-600'
    }
  }

  const getPriorityColor = (priority: ApprovalRequest['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Approval System</h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Requests List */}
        <div className="col-span-7">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y">
              {filteredRequests.map((request) => (
                <div 
                  key={request.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    selectedRequest?.id === request.id ? 'bg-gray-50' : ''
                  }`}
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{request.title}</h3>
                      <p className="text-sm text-gray-600">
                        {request.requester.name} • {request.requester.department}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                      {request.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className={`flex items-center ${getStatusColor(request.status)}`}>
                        {request.status === 'approved' && <FaCheckCircle className="mr-1" />}
                        {request.status === 'rejected' && <FaTimesCircle className="mr-1" />}
                        {request.status === 'pending' && <FaClock className="mr-1" />}
                        {request.status}
                      </span>
                      {request.attachments && (
                        <span className="flex items-center text-gray-500">
                          <FaFileAlt className="mr-1" />
                          {request.attachments} attachments
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500">
                      Submitted {new Date(request.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="col-span-5">
          {selectedRequest ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{selectedRequest.title}</h2>
                  <p className="text-gray-600">Request ID: {selectedRequest.id}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReject(selectedRequest.id)}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    disabled={selectedRequest.status !== 'pending'}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedRequest.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    disabled={selectedRequest.status !== 'pending'}
                  >
                    Approve
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Requester</h3>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {selectedRequest.requester.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{selectedRequest.requester.name}</p>
                      <p className="text-sm text-gray-600">{selectedRequest.requester.department}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                  <p className="text-gray-700">{selectedRequest.description}</p>
                </div>

                {selectedRequest.attachments && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Attachments</h3>
                    <div className="space-y-2">
                      {[...Array(selectedRequest.attachments)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center p-2 border rounded hover:bg-gray-50 cursor-pointer"
                        >
                          <FaFileAlt className="text-gray-400 mr-2" />
                          <span>Document {i + 1}</span>
                          <FaEye className="ml-auto text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Submitted</h3>
                    <p>{new Date(selectedRequest.submittedAt).toLocaleString()}</p>
                  </div>
                  {selectedRequest.dueDate && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Due Date</h3>
                      <p>{new Date(selectedRequest.dueDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center text-gray-500">
              Select a request to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 