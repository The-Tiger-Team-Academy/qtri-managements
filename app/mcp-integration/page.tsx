'use client'

import { useState, useCallback } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  NodeTypes,
  Panel,
  MarkerType
} from 'reactflow'
import 'reactflow/dist/style.css'
import { FiSettings, FiPlus, FiEdit2, FiTrash2, FiLink } from 'react-icons/fi'

interface IntegrationNode {
  id: string
  name: string
  description: string
  type: 'system' | 'database' | 'api' | 'service'
  category: 'internal' | 'external' | 'cloud'
  position: { x: number; y: number }
}

const nodeTypes: NodeTypes = {
  default: ({ data }) => (
    <div className="p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="font-medium">{data.label}</div>
      <div className="text-sm text-gray-500">{data.description}</div>
    </div>
  )
}

const getNodeBackground = (type: string) => {
  switch (type) {
    case 'system': return '#E5E7EB'
    case 'database': return '#D1FAE5'
    case 'api': return '#DBEAFE'
    case 'service': return '#FEE2E2'
    default: return '#F3F4F6'
  }
}

export default function MCPIntegrationPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSystem, setSelectedSystem] = useState<IntegrationNode | null>(null)
  const [showLabels, setShowLabels] = useState(true)
  const [showConnections, setShowConnections] = useState(true)
  const [autoLayout, setAutoLayout] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null)
  const [newNode, setNewNode] = useState<Partial<IntegrationNode>>({
    type: 'system',
    category: 'internal'
  })
  const [n8nConfig, setN8nConfig] = useState({
    enabled: false,
    url: '',
    apiKey: '',
    webhookUrl: ''
  })
  const [isConnecting, setIsConnecting] = useState(false)

  const initialNodes: IntegrationNode[] = [
    {
      id: 'mcp-core',
      name: 'MCP Core System',
      description: 'Main quantum computing management system',
      type: 'system',
      category: 'internal',
      position: { x: 400, y: 200 }
    },
    {
      id: 'quantum-db',
      name: 'Quantum Database',
      description: 'Quantum data storage and processing',
      type: 'database',
      category: 'internal',
      position: { x: 200, y: 400 }
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      description: 'External API integration point',
      type: 'api',
      category: 'external',
      position: { x: 600, y: 400 }
    }
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes.map(node => ({
      id: node.id,
      type: 'default',
      position: node.position,
      data: { 
        label: node.name,
        description: node.description,
        category: node.category
      },
      style: {
        background: getNodeBackground(node.type),
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '10px',
        width: '200px'
      }
    }))
  )

  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: 'e1-2',
      source: 'mcp-core',
      target: 'quantum-db',
      type: 'smoothstep',
      label: 'data',
      style: { stroke: '#3B82F6', strokeWidth: 2 },
      animated: true,
      markerEnd: {
        type: MarkerType.Arrow,
        color: '#3B82F6'
      }
    },
    {
      id: 'e1-3',
      source: 'mcp-core',
      target: 'api-gateway',
      type: 'smoothstep',
      label: 'api',
      style: { stroke: '#10B981', strokeWidth: 2 },
      animated: true,
      markerEnd: {
        type: MarkerType.Arrow,
        color: '#10B981'
      }
    }
  ])

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges]
  )

  const handleAddNode = () => {
    if (!newNode.name) return

    const nodeId = `node-${Date.now()}`
    const newNodeData = {
      id: nodeId,
      type: 'default',
      position: { x: 400, y: 300 },
      data: { 
        label: newNode.name,
        description: newNode.description || '',
        category: newNode.category || 'internal'
      },
      style: {
        background: getNodeBackground(newNode.type || 'system'),
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        padding: '10px',
        width: '200px'
      }
    }

    setNodes((nds) => [...nds, newNodeData])
    setNewNode({ type: 'system', category: 'internal' })
  }

  const handleDeleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId))
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
  }

  const handleDeleteEdge = (edgeId: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId))
  }

  const handleUpdateNode = (nodeId: string, updates: Partial<Node>) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, ...updates }
        }
        return node
      })
    )
  }

  const handleN8nConnect = async () => {
    if (!n8nConfig.url || !n8nConfig.apiKey) {
      alert('Please provide n8n URL and API Key')
      return
    }

    setIsConnecting(true)
    try {
      // Test connection to n8n
      const response = await fetch(`${n8nConfig.url}/api/v1/credentials`, {
        headers: {
          'X-N8N-API-KEY': n8nConfig.apiKey
        }
      })

      if (!response.ok) {
        throw new Error('Failed to connect to n8n')
      }

      alert('Successfully connected to n8n!')
      setN8nConfig(prev => ({ ...prev, enabled: true }))
    } catch (error) {
      console.error('n8n connection error:', error)
      alert('Failed to connect to n8n. Please check your credentials.')
    } finally {
      setIsConnecting(false)
    }
  }

  const handleN8nDisconnect = () => {
    setN8nConfig(prev => ({ ...prev, enabled: false }))
  }

  const handleN8nWebhookTest = async () => {
    if (!n8nConfig.webhookUrl) {
      alert('Please provide a webhook URL')
      return
    }

    try {
      const response = await fetch(n8nConfig.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event: 'test',
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('Webhook test failed')
      }

      alert('Webhook test successful!')
    } catch (error) {
      console.error('Webhook test error:', error)
      alert('Webhook test failed. Please check your webhook URL.')
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">MCP Integration</h1>
        <p className="text-gray-600">Manage system integrations and connections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 rounded hover:bg-gray-100"
                >
                  <FiEdit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowLabels(!showLabels)}
                  className="p-2 rounded hover:bg-gray-100"
                >
                  <FiLink className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowConnections(!showConnections)}
                  className="p-2 rounded hover:bg-gray-100"
                >
                  <FiLink className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleAddNode}
                className="p-2 rounded hover:bg-gray-100"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>

            <div className="h-[500px] border rounded-lg">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
              >
                <Background />
                <Controls />
              </ReactFlow>
            </div>
          </div>

          {isEditing && (
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h3 className="text-lg font-medium mb-4">Add New Node</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={newNode.name || ''}
                    onChange={(e) => setNewNode({ ...newNode, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={newNode.type || 'system'}
                    onChange={(e) => setNewNode({ ...newNode, type: e.target.value as any })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="system">System</option>
                    <option value="database">Database</option>
                    <option value="api">API</option>
                    <option value="service">Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={newNode.category || 'internal'}
                    onChange={(e) => setNewNode({ ...newNode, category: e.target.value as any })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="internal">Internal</option>
                    <option value="external">External</option>
                    <option value="cloud">Cloud</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    value={newNode.description || ''}
                    onChange={(e) => setNewNode({ ...newNode, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleAddNode}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Node
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="text-lg font-medium mb-4">n8n Integration</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={n8nConfig.enabled}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleN8nConnect()
                      } else {
                        handleN8nDisconnect()
                      }
                    }}
                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2">Enable n8n Integration</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">n8n URL</label>
                <input
                  type="text"
                  value={n8nConfig.url}
                  onChange={(e) => setN8nConfig({ ...n8nConfig, url: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">API Key</label>
                <input
                  type="password"
                  value={n8nConfig.apiKey}
                  onChange={(e) => setN8nConfig({ ...n8nConfig, apiKey: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Webhook URL</label>
                <input
                  type="text"
                  value={n8nConfig.webhookUrl}
                  onChange={(e) => setN8nConfig({ ...n8nConfig, webhookUrl: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleN8nConnect}
                  disabled={isConnecting}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </button>
                <button
                  onClick={handleN8nWebhookTest}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Test Webhook
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-medium mb-4">System Details</h3>
            {selectedSystem ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">{selectedSystem.name}</h4>
                  <p className="text-sm text-gray-600">{selectedSystem.description}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Type:</span>
                  <span className="ml-2 text-sm text-gray-600">{selectedSystem.type}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  <span className="ml-2 text-sm text-gray-600">{selectedSystem.category}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Select a system to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 