import { FaTasks, FaUserClock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'

export default function WorkloadPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Workload Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <FaTasks className="mr-2" />
          Assign Task
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Tasks</p>
              <h3 className="text-2xl font-bold mt-1">156</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaTasks className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">In Progress</p>
              <h3 className="text-2xl font-bold mt-1">64</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaUserClock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Overdue</p>
              <h3 className="text-2xl font-bold mt-1">12</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <FaExclamationTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <h3 className="text-2xl font-bold mt-1">80</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaCheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Workload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Team Workload</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">John Doe</span>
                <span className="text-red-600">High Load</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Jane Smith</span>
                <span className="text-yellow-600">Medium Load</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Mike Johnson</span>
                <span className="text-green-600">Normal Load</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Priority Tasks</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded">
              <div>
                <h3 className="font-medium">Project Deadline</h3>
                <p className="text-sm text-gray-600">Due in 2 days</p>
              </div>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                High Priority
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
              <div>
                <h3 className="font-medium">Client Meeting</h3>
                <p className="text-sm text-gray-600">Tomorrow</p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                Medium Priority
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded">
              <div>
                <h3 className="font-medium">Team Review</h3>
                <p className="text-sm text-gray-600">Next Week</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Low Priority
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 