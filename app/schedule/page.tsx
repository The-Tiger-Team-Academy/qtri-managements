import { FaCalendarAlt, FaClock, FaUsers, FaMapMarkerAlt } from 'react-icons/fa'

export default function SchedulePage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Schedule Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <FaCalendarAlt className="mr-2" />
          Add New Event
        </button>
      </div>

      {/* Calendar Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              {/* Meeting 1 */}
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Team Meeting</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaClock className="mr-2" />
                      <span>09:00 AM - 10:30 AM</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaUsers className="mr-2" />
                      <span>12 Participants</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>Conference Room A</span>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    In Progress
                  </span>
                </div>
              </div>

              {/* Meeting 2 */}
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Project Review</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaClock className="mr-2" />
                      <span>11:00 AM - 12:00 PM</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaUsers className="mr-2" />
                      <span>8 Participants</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>Meeting Room B</span>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Upcoming
                  </span>
                </div>
              </div>

              {/* Meeting 3 */}
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Training Session</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaClock className="mr-2" />
                      <span>02:00 PM - 04:00 PM</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaUsers className="mr-2" />
                      <span>20 Participants</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>Training Hall</span>
                    </div>
                  </div>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    Upcoming
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Schedule Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Today's Events</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Upcoming This Week</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Participants</span>
                <span className="font-semibold">45</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 text-left">
                Schedule Meeting
              </button>
              <button className="w-full p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 text-left">
                Book Room
              </button>
              <button className="w-full p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 text-left">
                Send Invites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 