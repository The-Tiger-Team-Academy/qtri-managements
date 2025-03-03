import { Widget } from '../types'

export function generateWidgetHTML(widget: Widget): string {
  return `
    <div class="widget-content h-full">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <div class="grid-stack-item-handle cursor-move mr-2 text-gray-400 hover:text-gray-600">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"/>
            </svg>
          </div>
          <h3 class="font-semibold text-gray-700">${widget.title}</h3>
        </div>
      </div>
      <div class="flex items-center justify-center h-[calc(100%-2rem)] bg-gray-50 rounded">
        ${widget.type}
      </div>
    </div>
  `
} 