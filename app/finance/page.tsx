'use client'

import { FaChartLine, FaDollarSign, FaArrowUp, FaArrowDown } from 'react-icons/fa'

export default function FinancePage() {
  return (
    <div className="p-6" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Finance Analysis</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <FaChartLine className="mr-2" />
          Generate Report
        </button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">$84,254</h3>
              <div className="flex items-center text-green-600 text-sm mt-1">
                <FaArrowUp className="mr-1" />
                <span>8.2% vs last month</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FaDollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Expenses</p>
              <h3 className="text-2xl font-bold mt-1">$46,892</h3>
              <div className="flex items-center text-red-600 text-sm mt-1">
                <FaArrowUp className="mr-1" />
                <span>3.1% vs last month</span>
              </div>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <FaDollarSign className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Net Profit</p>
              <h3 className="text-2xl font-bold mt-1">$37,362</h3>
              <div className="flex items-center text-green-600 text-sm mt-1">
                <FaArrowUp className="mr-1" />
                <span>12.5% vs last month</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FaChartLine className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Payments</p>
              <h3 className="text-2xl font-bold mt-1">$12,450</h3>
              <div className="flex items-center text-yellow-600 text-sm mt-1">
                <FaArrowDown className="mr-1" />
                <span>2.3% vs last month</span>
              </div>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FaDollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Revenue Breakdown</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <h3 className="font-medium">Project Revenue</h3>
                <p className="text-sm text-gray-600">From completed projects</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold">$45,678</span>
                <p className="text-sm text-green-600">+12.5%</p>
              </div>
            </div>
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <h3 className="font-medium">Service Revenue</h3>
                <p className="text-sm text-gray-600">From services rendered</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold">$28,345</span>
                <p className="text-sm text-green-600">+5.8%</p>
              </div>
            </div>
            <div className="flex justify-between items-center pb-4">
              <div>
                <h3 className="font-medium">Other Revenue</h3>
                <p className="text-sm text-gray-600">Miscellaneous income</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold">$10,231</span>
                <p className="text-sm text-red-600">-2.3%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expense Categories */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Expense Categories</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Operational Costs</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Employee Salaries</span>
                <span>30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Marketing</span>
                <span>15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Other Expenses</span>
                <span>10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 