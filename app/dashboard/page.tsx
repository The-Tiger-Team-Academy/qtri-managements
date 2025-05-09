'use client'
import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'
import { FaChartBar, FaUsers, FaList, FaCalendarAlt, FaCog, FaPlus, FaGripVertical, FaArrowUp } from 'react-icons/fa'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface Widget extends Omit<GridStackNode, 'content'> {
  id: string
  title: string
  type: string
  data?: any
}

const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue (Million Baht)',
      data: [12.5, 15.8, 14.2, 16.5, 18.2, 19.5],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 2,
    }
  ]
};

const userStatsData = {
  totalUsers: 1250,
  activeUsers: 890,
  newUsers: 45,
  growth: 12.5
};

const recentActivities = [
  { id: 1, user: 'Dr. Smith', action: 'Started new quantum experiment', time: '2 hours ago' },
  { id: 2, user: 'Lab Team A', action: 'Updated research data', time: '4 hours ago' },
  { id: 3, user: 'System', action: 'Backup completed', time: '5 hours ago' },
  { id: 4, user: 'Dr. Johnson', action: 'Published new findings', time: '1 day ago' },
];

const calendarEvents = [
  { id: 1, title: 'Team Meeting', date: '2024-02-20', type: 'meeting' },
  { id: 2, title: 'Experiment #245', date: '2024-02-21', type: 'experiment' },
  { id: 3, title: 'Data Review', date: '2024-02-22', type: 'review' },
];

const WidgetContent = ({ widget }: { widget: Widget }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: widget.title
      }
    }
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'chart':
        return (
          <div className="h-[calc(100%-4rem)]">
            <Bar data={revenueData} options={options} />
          </div>
        );
      case 'stats':
        return (
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-blue-600">{userStatsData.totalUsers}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{userStatsData.activeUsers}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">New Users</p>
              <p className="text-2xl font-bold text-purple-600">{userStatsData.newUsers}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Growth</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-orange-600">{userStatsData.growth}%</p>
                <FaArrowUp className="ml-2 text-green-500" />
              </div>
            </div>
          </div>
        );
      case 'list':
        return (
          <div className="overflow-auto h-[calc(100%-4rem)]">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center p-3 border-b hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        );
      case 'calendar':
        return (
          <div className="overflow-auto h-[calc(100%-4rem)]">
            {calendarEvents.map(event => (
              <div key={event.id} className="flex items-center p-3 border-b hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  event.type === 'meeting' ? 'bg-blue-500' :
                  event.type === 'experiment' ? 'bg-green-500' : 'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="widget-content h-full bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="grid-stack-item-handle cursor-move mr-2 text-gray-400 hover:text-gray-600">
            <FaGripVertical />
          </div>
          <h3 className="font-semibold text-gray-700">{widget.title}</h3>
        </div>
      </div>
      {renderWidgetContent()}
    </div>
  );
};

export default function DashboardPage() {
  const gridRef = useRef<GridStack>()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    const initGrid = () => {
      if (!containerRef.current) return;

      // Clear existing content and grid
      if (gridRef.current) {
        gridRef.current.removeAll();
        gridRef.current.destroy(false); // false = don't remove DOM elements
        gridRef.current = undefined;
      }
      containerRef.current.innerHTML = '';

      // Create widget elements
      const widgets = [
        { id: 'revenue', title: 'Revenue Overview', type: 'chart', x: 0, y: 0, w: 8, h: 4 },
        { id: 'stats', title: 'User Statistics', type: 'stats', x: 8, y: 0, w: 4, h: 4 },
        { id: 'activities', title: 'Recent Activities', type: 'list', x: 0, y: 4, w: 6, h: 4 },
        { id: 'calendar', title: 'Calendar', type: 'calendar', x: 6, y: 4, w: 6, h: 4 }
      ];

      // Create grid container if needed
      const gridContainer = document.createElement('div');
      gridContainer.className = 'grid-stack';
      containerRef.current.appendChild(gridContainer);

      // Add widgets to container
      widgets.forEach(widget => {
        const widgetEl = document.createElement('div');
        widgetEl.className = 'grid-stack-item';
        widgetEl.setAttribute('gs-x', widget.x.toString());
        widgetEl.setAttribute('gs-y', widget.y.toString());
        widgetEl.setAttribute('gs-w', widget.w.toString());
        widgetEl.setAttribute('gs-h', widget.h.toString());

        const content = document.createElement('div');
        content.className = 'grid-stack-item-content';
        content.id = widget.id;
        widgetEl.appendChild(content);
        gridContainer.appendChild(widgetEl);
      });

      // Initialize GridStack
      gridRef.current = GridStack.init({
        column: 12,
        row: 12,
        cellHeight: 100,
        margin: 16,
        animate: true,
        draggable: {
          handle: '.grid-stack-item-handle'
        },
        resizable: {
          handles: 'e,se,s,sw,w'
        },
        float: true,
        staticGrid: !isEditMode,
      }, gridContainer);

      // Render widget contents
      renderWidgetContents();
    };

    initGrid();

    // Cleanup function
    return () => {
      if (gridRef.current && containerRef.current) {
        try {
          // Remove all widgets first
          gridRef.current.removeAll();
          // Destroy grid without removing DOM elements
          gridRef.current.destroy(false);
        } catch (error) {
          console.log('Grid cleanup error:', error);
        }
        // Clear the container
        containerRef.current.innerHTML = '';
        gridRef.current = undefined;
      }
    };
  }, [isEditMode]);

  const renderWidgetContents = () => {
    // Revenue Chart
    const revenueWidget = document.getElementById('revenue')
    if (revenueWidget) {
      const root = createRoot(revenueWidget)
      root.render(
        <div className="h-full p-4">
          <div className="flex items-center mb-4">
            <div className="grid-stack-item-handle cursor-move mr-2 text-gray-400">
              <FaGripVertical />
            </div>
            <h3 className="font-semibold text-gray-700">Revenue Overview</h3>
          </div>
          <div className="h-[calc(100%-4rem)]">
            <Bar data={revenueData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
              }
            }} />
          </div>
        </div>
      )
    }

    // User Stats
    const statsWidget = document.getElementById('stats')
    if (statsWidget) {
      const root = createRoot(statsWidget)
      root.render(
        <div className="h-full p-4">
          <div className="flex items-center mb-4">
            <div className="grid-stack-item-handle cursor-move mr-2 text-gray-400">
              <FaGripVertical />
            </div>
            <h3 className="font-semibold text-gray-700">User Statistics</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-blue-600">{userStatsData.totalUsers}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{userStatsData.activeUsers}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">New Users</p>
              <p className="text-2xl font-bold text-purple-600">{userStatsData.newUsers}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Growth</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-orange-600">{userStatsData.growth}%</p>
                <FaArrowUp className="ml-2 text-green-500" />
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Recent Activities
    const activitiesWidget = document.getElementById('activities')
    if (activitiesWidget) {
      const root = createRoot(activitiesWidget)
      root.render(
        <div className="h-full p-4">
          <div className="flex items-center mb-4">
            <div className="grid-stack-item-handle cursor-move mr-2 text-gray-400">
              <FaGripVertical />
            </div>
            <h3 className="font-semibold text-gray-700">Recent Activities</h3>
          </div>
          <div className="overflow-auto h-[calc(100%-4rem)]">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center p-3 border-b hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      )
    }

    // Calendar
    const calendarWidget = document.getElementById('calendar')
    if (calendarWidget) {
      const root = createRoot(calendarWidget)
      root.render(
        <div className="h-full p-4">
          <div className="flex items-center mb-4">
            <div className="grid-stack-item-handle cursor-move mr-2 text-gray-400">
              <FaGripVertical />
            </div>
            <h3 className="font-semibold text-gray-700">Calendar</h3>
          </div>
          <div className="overflow-auto h-[calc(100%-4rem)]">
            {calendarEvents.map(event => (
              <div key={event.id} className="flex items-center p-3 border-b hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  event.type === 'meeting' ? 'bg-blue-500' :
                  event.type === 'experiment' ? 'bg-green-500' : 'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <button
          onClick={toggleEditMode}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center shadow-sm"
        >
          <FaCog className="mr-2" />
          {isEditMode ? 'Save Layout' : 'Edit Layout'}
        </button>
      </div>

      <div 
        ref={containerRef}
        className="grid-stack bg-white rounded-xl shadow-sm p-6"
        style={{ minHeight: '800px' }}
      />
    </div>
  )
} 