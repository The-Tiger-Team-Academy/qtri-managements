'use client'
import { useState } from 'react'
import { FaCog, FaToggleOn, FaToggleOff } from 'react-icons/fa'

export default function ManagementFeaturesPage() {
  const [features, setFeatures] = useState([
    { id: 1, name: 'Project Timeline', enabled: true },
    { id: 2, name: 'Team Management', enabled: true },
    { id: 3, name: 'HR Management', enabled: true },
    { id: 4, name: 'Finance Management', enabled: false },
    { id: 5, name: 'Education Management', enabled: true },
    { id: 6, name: 'AI Assistant', enabled: true }
  ])

  const toggleFeature = (id: number) => {
    setFeatures(features.map(feature => 
      feature.id === id ? { ...feature, enabled: !feature.enabled } : feature
    ))
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Management Features</h1>
      </div>

      {/* Features List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Available Features</h2>
          <div className="space-y-4">
            {features.map(feature => (
              <div key={feature.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FaCog className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">{feature.name}</span>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 