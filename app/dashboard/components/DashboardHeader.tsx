import { FaPlus, FaCog } from 'react-icons/fa'

interface DashboardHeaderProps {
  onAddWidget: () => void
  onToggleEdit: () => void
}

export function DashboardHeader({ onAddWidget, onToggleEdit }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="space-x-2">
        <button
          onClick={onAddWidget}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Widget
        </button>
        <button
          onClick={onToggleEdit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <FaCog className="mr-2" />
          Toggle Edit Mode
        </button>
      </div>
    </div>
  )
} 