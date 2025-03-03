'use client'
import { useState, memo } from 'react'
import ReactFlow, { 
  Node, 
  Edge, 
  Controls, 
  Background,
  MarkerType,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  Position
} from 'reactflow'
import 'reactflow/dist/style.css'
import { FaPlus, FaSave, FaTrash, FaBolt, FaSlack, FaQuestionCircle } from 'react-icons/fa'

// Custom Node Components
const TriggerNode = memo(({ data }: { data: { label: string, description?: string, type?: string } }) => (
  <div className="min-w-[300px] bg-white rounded-lg border-2 border-teal-400">
    <div className="p-3 border-b flex items-center gap-2">
      <FaBolt className="text-teal-500" />
      <div className="font-medium">{data.label}</div>
      {data.type && <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">{data.type}</span>}
    </div>
    {data.description && (
      <div className="p-3 text-sm text-gray-600">{data.description}</div>
    )}
    <Handle type="source" position={Position.Bottom} />
  </div>
))

const ConditionNode = memo(({ data }: { data: { label: string, description?: string } }) => (
  <div className="min-w-[300px] bg-white rounded-lg border-2 border-yellow-400">
    <div className="p-3 border-b flex items-center gap-2">
      <FaQuestionCircle className="text-yellow-500" />
      <div className="font-medium">{data.label}</div>
    </div>
    {data.description && (
      <div className="p-3 text-sm text-gray-600">{data.description}</div>
    )}
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
  </div>
))

const ActionNode = memo(({ data }: { data: { label: string, description?: string, type?: string } }) => (
  <div className="min-w-[300px] bg-white rounded-lg border-2 border-blue-400">
    <div className="p-3 border-b flex items-center gap-2">
      <FaSlack className="text-blue-500" />
      <div className="font-medium">{data.label}</div>
      {data.type && <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">{data.type}</span>}
    </div>
    {data.description && (
      <div className="p-3 text-sm text-gray-600">{data.description}</div>
    )}
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
  </div>
))

// Node types mapping
const nodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  action: ActionNode,
}

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 5 },
    data: { 
      label: 'When Deal status updated',
      description: "Trigger when a Deal's status is updated.",
      type: 'Deals'
    }
  },
  {
    id: '2',
    type: 'condition',
    position: { x: 250, y: 150 },
    data: { 
      label: 'Is status "MQL"?',
      description: 'Continue if the Deal\'s status is "MQL".'
    }
  },
  {
    id: '3',
    type: 'action',
    position: { x: 250, y: 300 },
    data: { 
      label: 'Send action buttons to Slack',
      description: 'Send a summary and action buttons to Slack.',
      type: 'Slack'
    }
  },
  {
    id: '4',
    type: 'action',
    position: { x: 100, y: 450 },
    data: { 
      label: 'Add to "Enterprise" sequence',
      description: 'Add Deal\'s PoC to "Enterprise" sequence.',
      type: 'Outreach'
    }
  },
  {
    id: '5',
    type: 'action',
    position: { x: 400, y: 450 },
    data: { 
      label: 'Add to "SMB" sequence',
      description: 'Add Deal\'s PoC to "SMB" sequence.',
      type: 'Outreach'
    }
  }
]

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    label: 'Enterprise lead',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    label: 'SMB lead',
    markerEnd: { type: MarkerType.ArrowClosed }
  }
]

export default function FlowPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds))
  }

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `${Date.now()}`,
      type,
      position: { x: 250, y: 200 },
      data: { label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}` }
    }
    setNodes((nds) => [...nds, newNode])
  }

  const updateNodeLabel = (label: string) => {
    if (!selectedNode) return
    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id ? { ...node, data: { ...node.data, label } } : node
      )
    )
  }

  const deleteNode = () => {
    if (!selectedNode) return
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id))
    setEdges((eds) => eds.filter((edge) => 
      edge.source !== selectedNode.id && edge.target !== selectedNode.id
    ))
    setSelectedNode(null)
  }

  return (
    <div className="p-6 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Flow Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => addNode('trigger')}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Trigger
          </button>
          <button
            onClick={() => addNode('condition')}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Condition
          </button>
          <button
            onClick={() => addNode('action')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Action
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
            <FaSave className="mr-2" />
            Save Flow
          </button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-8rem)]">
        {/* Flow Canvas */}
        <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>

        {/* Properties Panel */}
        {selectedNode && (
          <div className="w-64 ml-6 bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Node Properties</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={selectedNode.data.label}
                  onChange={(e) => updateNodeLabel(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                onClick={deleteNode}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
              >
                <FaTrash className="mr-2" />
                Delete Node
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 