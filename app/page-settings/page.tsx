'use client'
import { useState } from 'react'
import { FaImage, FaSave } from 'react-icons/fa'
import Image from 'next/image'

export default function PageSettingsPage() {
  const [pageTitle, setPageTitle] = useState('QUANTUM TECHNOLOGY RESEARCH INITIATIVE')
  const [logoPreview, setLogoPreview] = useState('/qtric.svg')
  const [isSaving, setIsSaving] = useState(false)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Here you would typically make an API call to save the settings
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Settings saved successfully!')
    } catch (error) {
      alert('Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Page Settings</h1>
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="space-y-6">
            {/* Logo Upload */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Logo</h2>
              <div className="flex items-center space-x-6">
                <div className="w-32 h-32 relative border rounded-lg overflow-hidden">
                  <Image
                    src={logoPreview}
                    alt="Current Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Upload New Logo
                  </label>
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg cursor-pointer hover:bg-blue-100">
                      <FaImage className="mr-2" />
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                    <span className="text-sm text-gray-500">PNG, JPG, SVG (max. 2MB)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Page Title */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Page Title</h2>
              <input
                type="text"
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter page title"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <FaSave className="mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 