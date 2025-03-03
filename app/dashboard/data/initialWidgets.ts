import { FaChartBar, FaUsers, FaDollarSign, FaCalendarAlt } from 'react-icons/fa'
import { Widget } from '../types'

export const initialWidgets: Widget[] = [
  { 
    id: '1', 
    title: 'Revenue Overview', 
    type: 'chart',
    x: 0, y: 0, w: 6, h: 4,
    content: <FaChartBar className="w-12 h-12 text-blue-500" />
  },
  { 
    id: '2', 
    title: 'User Statistics', 
    type: 'stats',
    x: 6, y: 0, w: 3, h: 4,
    content: <FaUsers className="w-12 h-12 text-green-500" />
  },
  { 
    id: '3', 
    title: 'Recent Activities', 
    type: 'list',
    x: 0, y: 4, w: 6, h: 4,
    content: <FaDollarSign className="w-12 h-12 text-purple-500" />
  },
  { 
    id: '4', 
    title: 'Calendar', 
    type: 'calendar',
    x: 6, y: 4, w: 6, h: 4,
    content: <FaCalendarAlt className="w-12 h-12 text-orange-500" />
  }
] 