'use client'
import { useState } from 'react'
import { 
  FaSearch, 
  FaPlus, 
  FaFileExport,
  FaDollarSign,
  FaUserTie,
  FaCalendarAlt,
  FaChartLine
} from 'react-icons/fa'

interface Employee {
  id: string
  name: string
  position: string
  department: string
  baseSalary: number
  bonus: number
  deductions: number
  startDate: string
  lastReview: string
}

const initialEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    position: 'Senior Developer',
    department: 'Engineering',
    baseSalary: 85000,
    bonus: 5000,
    deductions: 1200,
    startDate: '2022-03-15',
    lastReview: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sarah Smith',
    position: 'Product Manager',
    department: 'Product',
    baseSalary: 95000,
    bonus: 7500,
    deductions: 1500,
    startDate: '2021-06-01',
    lastReview: '2024-02-01'
  }
]

export default function SalaryPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof Employee>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getTotalCompensation = (employee: Employee) => {
    return employee.baseSalary + employee.bonus - employee.deductions
  }

  const sortedEmployees = [...employees]
    .filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      }
      return aValue < bValue ? 1 : -1
    })

  return (
    <div className="p-6" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <h1 className="text-2xl font-semibold mb-6">Salary Management</h1>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <FaFileExport className="mr-2" />
            Export
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
            <FaPlus className="mr-2" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Payroll</p>
              <h3 className="text-2xl font-bold">
                {formatCurrency(employees.reduce((sum, emp) => sum + getTotalCompensation(emp), 0))}
              </h3>
            </div>
            <FaDollarSign className="text-green-500 text-3xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Employees</p>
              <h3 className="text-2xl font-bold">{employees.length}</h3>
            </div>
            <FaUserTie className="text-blue-500 text-3xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Average Salary</p>
              <h3 className="text-2xl font-bold">
                {formatCurrency(
                  employees.reduce((sum, emp) => sum + emp.baseSalary, 0) / employees.length
                )}
              </h3>
            </div>
            <FaChartLine className="text-purple-500 text-3xl" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Next Review</p>
              <h3 className="text-xl font-bold">
                {formatDate(
                  employees
                    .map(emp => emp.lastReview)
                    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0]
                )}
              </h3>
            </div>
            <FaCalendarAlt className="text-orange-500 text-3xl" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-lg"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position/Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Base Salary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bonus
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Review
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedEmployees.map(employee => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{employee.name}</div>
                  <div className="text-sm text-gray-500">ID: {employee.id}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{employee.position}</div>
                  <div className="text-sm text-gray-500">{employee.department}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatCurrency(employee.baseSalary)}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {formatCurrency(employee.bonus)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatCurrency(getTotalCompensation(employee))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(employee.lastReview)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 