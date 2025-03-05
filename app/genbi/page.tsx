'use client'
import { useState } from 'react'
import Chat from '../components/Chat'
import { FaGraduationCap, FaChartBar, FaCalendarAlt, FaComments } from 'react-icons/fa'

export default function GenbiPage() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="p-6" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <h1 className="text-2xl font-semibold mb-6">Genbi</h1>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Genbi Management</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'dashboard' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FaChartBar className="mr-2" />
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'schedule' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FaCalendarAlt className="mr-2" />
          Schedule
        </button>
        <button
          onClick={() => setActiveTab('assistant')}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'assistant' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FaComments className="mr-2" />
          Assistant
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Genbi Dashboard</h2>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Total Members</h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-2xl font-bold">248</div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Active
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">New Applications</h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-2xl font-bold">45</div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Pending
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Events</h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-2xl font-bold">12</div>
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    This Month
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm">Projects</h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-2xl font-bold">8</div>
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Ongoing
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Member Activities */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Member Activities</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <h3 className="font-medium">Community Service</h3>
                      <p className="text-sm text-gray-600">Environmental Cleanup</p>
                    </div>
                    <span className="text-sm text-gray-500">23 Participants</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <h3 className="font-medium">Workshop</h3>
                      <p className="text-sm text-gray-600">Digital Marketing</p>
                    </div>
                    <span className="text-sm text-gray-500">45 Participants</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <h3 className="font-medium">Seminar</h3>
                      <p className="text-sm text-gray-600">Financial Literacy</p>
                    </div>
                    <span className="text-sm text-gray-500">78 Participants</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Leadership Training</h3>
                        <p className="text-sm text-gray-600">Building Future Leaders</p>
                      </div>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Next Week
                      </span>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Social Project</h3>
                        <p className="text-sm text-gray-600">Community Development</p>
                      </div>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        2 Weeks
                      </span>
                    </div>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Annual Meeting</h3>
                        <p className="text-sm text-gray-600">Year End Evaluation</p>
                      </div>
                      <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        Next Month
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 text-left">
                  <h3 className="font-medium">Add Member</h3>
                  <p className="text-sm text-blue-600">Register new member</p>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 text-left">
                  <h3 className="font-medium">Create Event</h3>
                  <p className="text-sm text-green-600">Schedule new event</p>
                </button>
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 text-left">
                  <h3 className="font-medium">Projects</h3>
                  <p className="text-sm text-purple-600">Manage projects</p>
                </button>
                <button className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-yellow-700 text-left">
                  <h3 className="font-medium">Reports</h3>
                  <p className="text-sm text-yellow-600">View activities report</p>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'schedule' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Genbi Schedule</h2>
            {/* Add schedule content */}
          </div>
        )}
        
        {activeTab === 'assistant' && (
          <Chat 
            title="Genbi Assistant" 
            initialMessage="Hello! I'm your Genbi assistant. How can I help you today?"
            className="h-[calc(100vh-16rem)]"
          />
        )}
      </div>
    </div>
  )
} 