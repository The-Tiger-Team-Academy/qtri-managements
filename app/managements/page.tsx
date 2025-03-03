import { FaUserPlus, FaChartLine, FaDollarSign } from 'react-icons/fa'

// Add these interfaces at the top of the file
interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  indicator?: 'up' | 'down' | null;
  score: string;
  color: string;
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  type: 'positive' | 'negative' | 'neutral';
}

interface ProgressCardProps {
  title: string;
  percentage: number;
  color: string;
}

export default function ManagementPage() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Minimal Dashboard</h1>
        <select className="border p-2 rounded">
          <option>Select period...</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="NEW ACCOUNTS"
          value="234"
          unit="%"
          indicator="up"
          score="58"
          color="blue"
        />
        <StatCard 
          title="TOTAL EXPENSES"
          value="71"
          unit="%"
          indicator="down"
          score="62"
          color="red"
        />
        <StatCard 
          title="COMPANY VALUE"
          value="1.45M"
          unit="$"
          indicator={null}
          score="72"
          color="yellow"
        />
        <StatCard 
          title="NEW EMPLOYEES"
          value="34"
          unit="hires"
          indicator={null}
          score="81"
          color="green"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Traffic Sources</h2>
            <button className="bg-yellow-400 px-3 py-1 rounded text-sm">Actions</button>
          </div>
          {/* Add your chart component here */}
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Income</h2>
            <button className="text-gray-400">⋮</button>
          </div>
          {/* Add your donut chart component here */}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard 
          title="Income"
          value="$5,456"
          change="+14%"
          type="positive"
        />
        <MetricCard 
          title="Expenses"
          value="$4,764"
          change="8%"
          type="negative"
        />
        <MetricCard 
          title="Spendings"
          value="$1.5M"
          change="15%"
          type="positive"
        />
        <MetricCard 
          title="Totals"
          value="$31,564"
          change="76%"
          type="neutral"
        />
      </div>

      {/* Target Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ProgressCard 
          title="Income Target"
          percentage={71}
          color="red"
        />
        <ProgressCard 
          title="Expenses Target"
          percentage={54}
          color="green"
        />
        <ProgressCard 
          title="Spendings Target"
          percentage={32}
          color="yellow"
        />
        <ProgressCard 
          title="Totals Target"
          percentage={89}
          color="blue"
        />
      </div>
    </div>
  )
}

// Component for stat cards
function StatCard({ title, value, unit, indicator, score, color }: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold">{value}</span>
          <span className="ml-1 text-gray-500">{unit}</span>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
          ${color === 'blue' ? 'bg-blue-100 text-blue-600' :
          color === 'red' ? 'bg-red-100 text-red-600' :
          color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
          'bg-green-100 text-green-600'}`}>
          {score}
        </div>
      </div>
    </div>
  )
}

// Component for metric cards
function MetricCard({ title, value, change, type }: MetricCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xl font-semibold">{value}</span>
        <span className={`${
          type === 'positive' ? 'text-green-500' :
          type === 'negative' ? 'text-red-500' :
          'text-yellow-500'
        }`}>
          {change}
        </span>
      </div>
    </div>
  )
}

// Component for progress cards
function ProgressCard({ title, percentage, color }: ProgressCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              color === 'red' ? 'bg-red-500' :
              color === 'green' ? 'bg-green-500' :
              color === 'yellow' ? 'bg-yellow-500' :
              'bg-blue-500'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-sm font-semibold mt-1 inline-block">{percentage}%</span>
      </div>
    </div>
  )
} 