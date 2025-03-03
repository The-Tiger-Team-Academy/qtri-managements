'use client'
import { useState } from 'react'
import { 
  FaPlus, 
  FaChevronLeft, 
  FaChevronRight,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaListUl,
  FaCalendarAlt
} from 'react-icons/fa'
import { Dialog } from '@headlessui/react'

interface Event {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
  location?: string
  attendees: string[]
  type: 'meeting' | 'task' | 'reminder' | 'event'
  status: 'upcoming' | 'in-progress' | 'completed'
}

interface NewEvent extends Omit<Event, 'id' | 'start' | 'end'> {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
}

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly team sync-up',
    start: new Date(2024, 2, 20, 10, 0),
    end: new Date(2024, 2, 20, 11, 0),
    location: 'Conference Room A',
    attendees: ['John Doe', 'Sarah Smith', 'Mike Johnson'],
    type: 'meeting',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Project Deadline',
    description: 'Website redesign completion',
    start: new Date(2024, 2, 25, 9, 0),
    end: new Date(2024, 2, 25, 18, 0),
    attendees: ['Development Team'],
    type: 'task',
    status: 'upcoming'
  }
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [view, setView] = useState<'year' | 'month' | 'week' | 'day'>('month')
  const [showList, setShowList] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newEvent, setNewEvent] = useState<NewEvent>({
    title: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endDate: new Date().toISOString().split('T')[0],
    endTime: '10:00',
    location: '',
    attendees: [],
    type: 'meeting',
    status: 'upcoming'
  })

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    const days = []
    const startPadding = firstDay.getDay()
    
    // Add padding days from previous month
    for (let i = 0; i < startPadding; i++) {
      const paddingDate = new Date(year, month, -startPadding + i + 1)
      days.push({ date: paddingDate, isPadding: true })
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isPadding: false })
    }
    
    // Add padding days for next month to complete the grid
    const remainingDays = 42 - days.length // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isPadding: true })
    }
    
    return days
  }

  const getEventsByDate = (date: Date) => {
    return events.filter(event => 
      event.start.getDate() === date.getDate() &&
      event.start.getMonth() === date.getMonth() &&
      event.start.getFullYear() === date.getFullYear()
    )
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800'
      case 'task': return 'bg-green-100 text-green-800'
      case 'reminder': return 'bg-yellow-100 text-yellow-800'
      case 'event': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMonthData = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const monthEvents = events.filter(event => 
      event.start.getMonth() === month && 
      event.start.getFullYear() === year
    )
    return {
      name: firstDay.toLocaleString('default', { month: 'short' }),
      days: lastDay.getDate(),
      events: monthEvents
    }
  }

  const renderYearView = () => {
    const year = currentDate.getFullYear()
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(year, i, 1)
      return {
        name: date.toLocaleString('default', { month: 'long' }),
        days: getDaysInMonth(date)
      }
    })

    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-4xl font-bold text-center mb-8">{year}</div>
        <div className="grid grid-cols-3 gap-8">
          {months.map((month, monthIndex) => (
            <div key={monthIndex} className="text-center">
              <div className="font-semibold text-lg mb-2">{month.name}</div>
              <div className="grid grid-cols-7 gap-1 text-sm">
                <div className="font-medium">Su</div>
                <div className="font-medium">Mo</div>
                <div className="font-medium">Tu</div>
                <div className="font-medium">We</div>
                <div className="font-medium">Th</div>
                <div className="font-medium">Fr</div>
                <div className="font-medium">Sa</div>
                
                {month.days.map(({ date, isPadding }, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`p-1 ${
                      isPadding ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    {date.getDate()}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderEventList = () => {
    const sortedEvents = [...events].sort((a, b) => a.start.getTime() - b.start.getTime())

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <button
            onClick={() => setShowList(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaCalendarAlt className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          {sortedEvents.map(event => (
            <div key={event.id} className="border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getEventTypeColor(event.type)}`}>
                  {event.type}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <div className="flex items-center">
                  <FaClock className="w-4 h-4 mr-2" />
                  <span>
                    {formatTime(event.start)} - {formatTime(event.end)}
                  </span>
                </div>
                {event.location && (
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.attendees.length > 0 && (
                  <div className="flex items-center">
                    <FaUsers className="w-4 h-4 mr-2" />
                    <span>{event.attendees.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const handleCreateEvent = () => {
    const start = new Date(`${newEvent.startDate}T${newEvent.startTime}`)
    const end = new Date(`${newEvent.endDate}T${newEvent.endTime}`)

    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
      start,
      end,
      attendees: newEvent.attendees.filter(Boolean)
    }

    setEvents(prev => [...prev, event])
    setIsModalOpen(false)
    setNewEvent({
      title: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endDate: new Date().toISOString().split('T')[0],
      endTime: '10:00',
      location: '',
      attendees: [],
      type: 'meeting',
      status: 'upcoming'
    })
  }

  const renderWeekView = () => {
    // Get start of week (Sunday)
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())
    
    // Get week days
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      return date
    })

    // Get all events for the week
    const weekEvents = events.filter(event => {
      const eventDate = new Date(event.start)
      return weekDays.some(day => 
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      )
    })

    // Time slots from 7 AM to 9 PM
    const timeSlots = Array.from({ length: 15 }, (_, i) => i + 7)

    return (
      <div className="bg-white rounded-lg shadow">
        {/* Week Header */}
        <div className="grid grid-cols-8 border-b">
          <div className="p-4 border-r"></div> {/* Time column header */}
          {weekDays.map((date, index) => (
            <div 
              key={index}
              className={`p-4 text-center ${
                date.getDate() === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() &&
                date.getFullYear() === new Date().getFullYear()
                  ? 'bg-blue-50'
                  : ''
              }`}
            >
              <div className="font-medium">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <div className={`text-2xl mt-1 ${
                date.getDate() === new Date().getDate() ? 'text-blue-600' : ''
              }`}>
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        <div className="grid grid-cols-8">
          {/* Time Labels */}
          <div className="border-r">
            {timeSlots.map(hour => (
              <div key={hour} className="h-20 border-b p-2 text-sm text-gray-500">
                {hour % 12 || 12}{hour >= 12 ? 'PM' : 'AM'}
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {weekDays.map((date, dayIndex) => (
            <div key={dayIndex} className="relative">
              {/* Time slot backgrounds */}
              {timeSlots.map(hour => (
                <div 
                  key={hour} 
                  className="h-20 border-b border-r"
                />
              ))}

              {/* Events */}
              {weekEvents
                .filter(event => 
                  event.start.getDate() === date.getDate() &&
                  event.start.getMonth() === date.getMonth()
                )
                .map(event => {
                  const startHour = event.start.getHours()
                  const endHour = event.end.getHours()
                  const startMinutes = event.start.getMinutes()
                  const endMinutes = event.end.getMinutes()
                  
                  const top = ((startHour - 7) * 80) + (startMinutes / 60 * 80)
                  const height = ((endHour - startHour) * 80) + 
                               ((endMinutes - startMinutes) / 60 * 80)

                  return (
                    <div
                      key={event.id}
                      className={`absolute left-0 right-0 mx-1 rounded px-2 py-1 overflow-hidden ${
                        getEventTypeColor(event.type)
                      }`}
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                      }}
                    >
                      <div className="font-medium text-sm truncate">
                        {event.title}
                      </div>
                      <div className="text-xs truncate">
                        {formatTime(event.start)} - {formatTime(event.end)}
                      </div>
                    </div>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Calendar</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowList(!showList)}
            className={`px-4 py-2 rounded-lg ${
              showList 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <FaListUl className="w-5 h-5" />
          </button>
          {!showList && (
            <>
              <div className="flex space-x-2">
                <button
                  onClick={() => setView('year')}
                  className={`px-4 py-2 rounded-lg ${
                    view === 'year' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Year
                </button>
                <button
                  onClick={() => setView('month')}
                  className={`px-4 py-2 rounded-lg ${
                    view === 'month' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setView('week')}
                  className={`px-4 py-2 rounded-lg ${
                    view === 'week' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setView('day')}
                  className={`px-4 py-2 rounded-lg ${
                    view === 'day' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Day
                </button>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <FaPlus className="mr-2" />
                Add Event
              </button>
            </>
          )}
        </div>
      </div>

      {showList ? (
        renderEventList()
      ) : (
        <>
          {/* Calendar Navigation */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const newDate = new Date(currentDate)
                  if (view === 'year') {
                    newDate.setFullYear(newDate.getFullYear() - 1)
                  } else {
                    newDate.setMonth(newDate.getMonth() - 1)
                  }
                  setCurrentDate(newDate)
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-medium">
                {view === 'year' 
                  ? currentDate.getFullYear()
                  : currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })
                }
              </h2>
              <button
                onClick={() => {
                  const newDate = new Date(currentDate)
                  if (view === 'year') {
                    newDate.setFullYear(newDate.getFullYear() + 1)
                  } else {
                    newDate.setMonth(newDate.getMonth() + 1)
                  }
                  setCurrentDate(newDate)
                }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Today
            </button>
          </div>

          {/* Calendar Content */}
          {view === 'year' ? (
            renderYearView()
          ) : view === 'week' ? (
            renderWeekView()
          ) : (
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow">
                  {/* Weekday Headers */}
                  <div className="grid grid-cols-7 gap-px border-b">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {getDaysInMonth(currentDate).map(({ date, isPadding }, index) => (
                      <div
                        key={index}
                        className={`min-h-[120px] bg-white ${
                          isPadding ? 'text-gray-400' : 'text-gray-900'
                        }`}
                      >
                        <div className="p-2">
                          <span className={`text-sm ${
                            date.getDate() === new Date().getDate() &&
                            date.getMonth() === new Date().getMonth() &&
                            date.getFullYear() === new Date().getFullYear()
                              ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                              : ''
                          }`}>
                            {date.getDate()}
                          </span>
                          <div className="space-y-1 mt-1">
                            {getEventsByDate(date).map(event => (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded ${getEventTypeColor(event.type)} truncate`}
                                title={event.title}
                              >
                                {formatTime(event.start)} - {event.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-80">
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="font-semibold mb-3">Today's Events</h3>
                  <div className="space-y-2">
                    {getEventsByDate(new Date()).map(event => (
                      <div
                        key={event.id}
                        className={`p-2 rounded ${getEventTypeColor(event.type)}`}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm">
                          {formatTime(event.start)} - {formatTime(event.end)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Event Creation Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg p-6">
            <Dialog.Title className="text-xl font-semibold mb-6">
              Create New Event
            </Dialog.Title>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event title"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter event description"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date & Time *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={newEvent.startDate}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, startDate: e.target.value }))}
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-24 px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date & Time *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={newEvent.endDate}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, endDate: e.target.value }))}
                      className="flex-1 px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                      className="w-24 px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type *
                </label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent(prev => ({ 
                    ...prev, 
                    type: e.target.value as Event['type']
                  }))}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="meeting">Meeting</option>
                  <option value="task">Task</option>
                  <option value="reminder">Reminder</option>
                  <option value="event">Event</option>
                </select>
              </div>

              {/* Attendees */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attendees
                </label>
                <div className="space-y-2">
                  {[...newEvent.attendees, ''].map((attendee, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={attendee}
                        onChange={(e) => {
                          const newAttendees = [...newEvent.attendees]
                          newAttendees[index] = e.target.value
                          setNewEvent(prev => ({ ...prev, attendees: newAttendees }))
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg"
                        placeholder="Enter attendee name"
                      />
                      {index > 0 && (
                        <button
                          onClick={() => {
                            const newAttendees = newEvent.attendees.filter((_, i) => i !== index)
                            setNewEvent(prev => ({ ...prev, attendees: newAttendees }))
                          }}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                disabled={!newEvent.title || !newEvent.startDate || !newEvent.endDate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Create Event
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
} 