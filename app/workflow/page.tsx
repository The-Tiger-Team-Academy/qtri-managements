'use client'
import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { FaPlus, FaEllipsisH } from 'react-icons/fa'

interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  assignee: string
  dueDate: string
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

export default function WorkflowPage() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        {
          id: '1',
          title: 'Design System Update',
          description: 'Update the design system components',
          priority: 'high',
          assignee: 'John Doe',
          dueDate: '2024-03-25'
        },
        {
          id: '2',
          title: 'API Integration',
          description: 'Integrate with payment gateway',
          priority: 'medium',
          assignee: 'Jane Smith',
          dueDate: '2024-03-28'
        }
      ]
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      tasks: [
        {
          id: '3',
          title: 'User Authentication',
          description: 'Implement OAuth2 authentication',
          priority: 'high',
          assignee: 'Mike Johnson',
          dueDate: '2024-03-24'
        }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [
        {
          id: '4',
          title: 'Dashboard Analytics',
          description: 'Add analytics charts to dashboard',
          priority: 'medium',
          assignee: 'Sarah Wilson',
          dueDate: '2024-03-23'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: []
    }
  ])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result
    const sourceColumn = columns.find(col => col.id === source.droppableId)
    const destColumn = columns.find(col => col.id === destination.droppableId)

    if (sourceColumn && destColumn) {
      const sourceTasks = Array.from(sourceColumn.tasks)
      const destTasks = Array.from(destColumn.tasks)
      const [movedTask] = sourceTasks.splice(source.index, 1)
      destTasks.splice(destination.index, 0, movedTask)

      setColumns(columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, tasks: sourceTasks }
        }
        if (col.id === destination.droppableId) {
          return { ...col, tasks: destTasks }
        }
        return col
      }))
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6" style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <h1 className="text-2xl font-semibold mb-6">Workflow</h1>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Workflow Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <FaPlus className="mr-2" />
          Add Task
        </button>
      </div>

      {/* Workflow Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-6">
          {columns.map(column => (
            <div key={column.id} className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-semibold text-gray-700 mb-4">{column.title}</h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white rounded-lg p-4 shadow-sm"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium">{task.title}</h3>
                              <button className="text-gray-400 hover:text-gray-600">
                                <FaEllipsisH />
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                              <span className="text-sm text-gray-500">{task.assignee}</span>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
} 