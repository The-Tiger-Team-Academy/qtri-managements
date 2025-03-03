import { GridStackNode } from 'gridstack'
import { ReactNode } from 'react'

export interface Widget extends GridStackNode {
  id: string
  title: string
  type: string
  content?: ReactNode
} 