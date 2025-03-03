export default function HRManagementPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">HR Management</h1>
      </div>

      {/* HR Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Employees Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Employees</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              150 Total
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active</span>
              <span className="text-green-600">142</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">On Leave</span>
              <span className="text-orange-600">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New Hires</span>
              <span className="text-blue-600">3</span>
            </div>
          </div>
        </div>

        {/* Departments Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Departments</h2>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
              8 Total
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">IT Department</span>
              <span>45 members</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">HR Department</span>
              <span>12 members</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Marketing</span>
              <span>28 members</span>
            </div>
          </div>
        </div>

        {/* Recruitment Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Recruitment</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Active
            </span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Open Positions</span>
              <span>12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Applications</span>
              <span>48</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Interviews</span>
              <span>8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 text-left">
            <h3 className="font-medium">Add Employee</h3>
            <p className="text-sm text-blue-600">Create new employee record</p>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 text-left">
            <h3 className="font-medium">Leave Requests</h3>
            <p className="text-sm text-purple-600">Review pending requests</p>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 text-left">
            <h3 className="font-medium">Payroll</h3>
            <p className="text-sm text-green-600">Process monthly payroll</p>
          </button>
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-700 text-left">
            <h3 className="font-medium">Reports</h3>
            <p className="text-sm text-orange-600">View HR reports</p>
          </button>
        </div>
      </div>
    </div>
  )
} 