import { useRef, useEffect } from 'react'
import { GridStack } from 'gridstack'
import { Widget } from '../types'
import { generateWidgetHTML } from '../utils/widgetUtils'

export function useGridStack(containerRef: React.RefObject<HTMLDivElement>, initialWidgets: Widget[]) {
  const gridRef = useRef<GridStack>()

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

    return () => {
      grid.destroy()
    }
  }, [initialWidgets])

  const addWidget = () => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      title: 'New Widget',
      type: 'stats',
      x: 0,
      y: 0,
      w: 3,
      h: 4,
      content: null
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

  return { grid: gridRef.current, addWidget, toggleEditMode }
} 