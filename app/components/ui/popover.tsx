"use client"

import * as React from "react"

export function Popover() {
  return <div>Popover placeholder</div>
}

export function PopoverTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function PopoverContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
} 