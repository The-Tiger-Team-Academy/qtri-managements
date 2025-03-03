'use client'
import { useState, useRef, useEffect } from 'react'
import { FaPaperPlane, FaRobot, FaUser, FaSpinner } from 'react-icons/fa'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! How can I help you today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Add assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a simulated response. In a real implementation, this would be replaced with an actual API call to your AI service.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Failed to get response:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="flex flex-col h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">AI Assistant</h1>
        <div className="flex items-center text-gray-600">
          <FaRobot className="w-5 h-5 mr-2" />
          <span>Online</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4 mb-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex max-w-[70%] ${
                  message.role === 'user'
                    ? 'flex-row-reverse items-end'
                    : 'items-start'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    message.role === 'user'
                      ? 'bg-blue-500 ml-2'
                      : 'bg-gray-500'
                  }`}
                >
                  {message.role === 'user' ? (
                    <FaUser className="w-4 h-4 text-white" />
                  ) : (
                    <FaRobot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border'
                  }`}
                >
                  <div className="mb-1">{message.content}</div>
                  <div
                    className={`text-xs ${
                      message.role === 'user'
                        ? 'text-blue-100'
                        : 'text-gray-400'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-lg p-4">
                <FaSpinner className="w-5 h-5 animate-spin text-gray-500" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <FaSpinner className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <FaPaperPlane className="w-5 h-5 mr-2" />
              Send
            </>
          )}
        </button>
      </form>
    </div>
  )
} 