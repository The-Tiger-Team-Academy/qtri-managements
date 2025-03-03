'use client'
import { useEffect, useRef } from 'react'
import { GridStack, GridStackNode } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import { FaChartBar, FaUsers, FaDollarSign, FaCalendarAlt, FaCog, FaPlus } from 'react-icons/fa'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface Widget extends Omit<GridStackNode, 'content'> {
  id: string
  title: string
  type: string
  content?: string
}

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Revenue',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

export default function DashboardPage() {
  const gridRef = useRef<GridStack>()
  const containerRef = useRef<HTMLDivElement>(null)

  const initialWidgets: Widget[] = [
    { 
      id: '1', 
      title: 'Revenue Overview', 
      type: 'chart',
      x: 0, y: 0, w: 6, h: 4
    },
    { 
      id: '2', 
      title: 'User Statistics', 
      type: 'stats',
      x: 6, y: 0, w: 3, h: 4
    },
    { 
      id: '3', 
      title: 'Recent Activities', 
      type: 'list',
      x: 0, y: 4, w: 6, h: 4
    },
    { 
      id: '4', 
      title: 'Calendar', 
      type: 'calendar',
      x: 6, y: 4, w: 6, h: 4
    }
  ]

  useEffect(() => {
    if (!containerRef.current) return

    const grid = GridStack.init({
      column: 12,
      row: 12,
      cellHeight: 60,
      animate: true,
      draggable: {
        handle: '.grid-stack-item-handle'
      },
      resizable: {
        handles: 'e,se,s,sw,w'
      }
    }, containerRef.current)

    gridRef.current = grid

    // Add initial widgets
    grid.load(initialWidgets.map(widget => ({
      ...widget,
      content: generateWidgetHTML(widget)
    })))

    // Render charts after widgets are loaded
    initialWidgets.forEach(widget => {
      if (widget.type === 'chart') {
        const chartElement = document.getElementById(`chart-${widget.id}`)
        if (chartElement) {
          new ChartJS(chartElement as HTMLCanvasElement, {
            type: 'bar',
            data: data,
            options: {
              responsive: true,
              maintainAspectRatio: false,
            }
          })
        }
      }
    })

    return () => {
      if (gridRef.current) {
        gridRef.current.removeAll()
        gridRef.current.destroy(false)
      }
    }
  }, [])

  const getWidgetIcon = (type: string) => {
    switch (type) {
      case 'chart':
        return `<div class="bg-blue-100 p-4 rounded-full">
                  <i class="fas fa-chart-bar text-blue-500 text-2xl"></i>
                </div>`
      case 'stats':
        return `<div class="bg-green-100 p-4 rounded-full">
                  <i class="fas fa-users text-green-500 text-2xl"></i>
                </div>`
      case 'list':
        return `<div class="bg-purple-100 p-4 rounded-full">
                  <i class="fas fa-list text-purple-500 text-2xl"></i>
                </div>`
      case 'calendar':
        return `<div class="bg-orange-100 p-4 rounded-full">
                  <i class="fas fa-calendar text-orange-500 text-2xl"></i>
                </div>`
      default:
        return ''
    }
  }

  const generateWidgetHTML = (widget: Widget): string => {
    const widgetContent = widget.type === 'chart' 
      ? `<div id="chart-${widget.id}" class="h-full"></div>`
      : `<div class="flex items-center justify-center h-[calc(100%-2rem)] bg-gray-50 rounded">
          ${getWidgetIcon(widget.type)}
         </div>`

    return `
      <div class="widget-content h-full bg-white rounded-lg shadow-sm p-4">
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center">
            <div class="grid-stack-item-handle cursor-move mr-2 text-gray-400 hover:text-gray-600">
              <i class="fas fa-grip-vertical"></i>
            </div>
            <h3 class="font-semibold text-gray-700">${widget.title}</h3>
          </div>
        </div>
        ${widgetContent}
      </div>
    `
  }

  const addWidget = () => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      title: 'New Widget',
      type: 'stats',
      x: 0,
      y: 0,
      w: 3,
      h: 4
    }

    gridRef.current?.addWidget({
      ...newWidget,
      content: generateWidgetHTML(newWidget)
    })
  }

  const toggleEditMode = () => {
    if (gridRef.current) {
      const isMovable = gridRef.current.opts.draggable?.handle === '.grid-stack-item-handle'
      gridRef.current.setStatic(!isMovable)
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="space-x-2">
          <button
            onClick={addWidget}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Widget
          </button>
          <button
            onClick={toggleEditMode}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaCog className="mr-2" />
            Toggle Edit Mode
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div 
        ref={containerRef} 
        className="grid-stack bg-gray-100 rounded-lg p-4 min-h-[600px]"
      />
    </div>
  )
} 