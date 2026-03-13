import { useCallback, useEffect, useState, createContext } from 'react';
import {
  Background,
  Connection,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { useParams } from "react-router";
import '@xyflow/react/dist/style.css';

import { Sidebar } from '../components/AutomationSidebar';
import ManualTrigger from '../components/nodes/ManualTrigger';
import Webhook from '../components/nodes/Webhook';
import Cron from '../components/nodes/Cron';
import SetData from '../components/nodes/SetData';
import Console from '../components/nodes/Console';
import JsonParse from '../components/nodes/JsonParse';
import Loop from '../components/nodes/Loop';
import Stop from '../components/nodes/Stop';
import Respond from '../components/nodes/Respond';
import Merge from '../components/nodes/Merge';
import HttpRequest from '../components/nodes/HttpRequest';
import Function from '../components/nodes/Function';
import Filter from '../components/nodes/Filter';
import ErrorCatch from '../components/nodes/ErrorCatch';
import Delay from '../components/nodes/Delay';
import IfCondition from '../components/nodes/IfCondition';
import AutomationConsole from '../components/AutomationConsole';

const nodeType = {
  manualTrigger: ManualTrigger,
  webhook: Webhook,
  cron: Cron,
  setData: SetData,
  ifCondition: IfCondition,
  console: Console,
  jsonParse: JsonParse,
  loop: Loop,
  stop: Stop,
  respond: Respond,
  merge: Merge,
  httpRequest: HttpRequest,
  function: Function,
  filter: Filter,
  errorCatch: ErrorCatch,
  delay: Delay,
}

interface AutomationContextType {
  updateNodeData: (nodeId: string, updateData: { [key: string]: any }) => void;
  runAutomation: (nodeId: string) => void
}

const PlusIcon = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
export const AutomationContext = createContext<AutomationContextType>({} as AutomationContextType)

function Automation() {
  const [fetchedData, setFetchedData] = useState({})
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [consoleData, setConsoleData] = useState([])

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );


  useEffect(() => {
    const fetchTree = async () => {
      const response = await fetch(`http://localhost:3000/automation/tree/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // send cookies
      });
      const data = await response.json();
      setFetchedData(data.automation)
      if (data.automation.edges.length > 0) {
        console.log(data.automation.edges, "from fetch")
        setEdges(data.automation.edges)
      }
      if (data.automation.nodes.length > 0) {
        console.log(data.automation.nodes, "from fetch")
        const fetchedNodes = data.automation.nodes
        // console.log(initialNodesStructure)
        setNodes(fetchedNodes)


      }

    }
    fetchTree()
  }, [])

  const updateBackend = async () => {
    const response = await fetch(`http://localhost:3000/automation/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ nodes, edges }),

    })
    const data = await response.json()
    console.log(data)
  }

  useEffect(() => {
    const delayInput = setTimeout(() => {
      const changed =
        JSON.stringify(nodes) !== JSON.stringify(fetchedData.nodes) ||
        JSON.stringify(edges) !== JSON.stringify(fetchedData.edges);

      if (changed) {
        console.log("changed detected updated the backend")
        updateBackend();
      }

    }, 1000)
    return () => clearTimeout(delayInput)
  }, [nodes, edges])
  console.log("nodes:", nodes, "edges:", edges)

  function updateNodeData(nodeId: string, updateData: any) {
    setNodes((nds: any) =>
      nds.map((node: any) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              ...updateData
            }
          }
        }
        return node;
      })

    )
  }

  async function runAutomation(nodeId: string) {
    const response = await fetch(`http://localhost:3000/automation/run/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ nodeId })

    })
    const data = await response.json()
    console.log(data)
    setConsoleData(data.consoleData)
  }

  return (
    <AutomationContext.Provider value={{ updateNodeData, runAutomation }}>
      <div className='flex flex-col'>
        <div className="flex flex-row h-screen relative">
          <div className="reactflow-wrapper w-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeType}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
            >
              <Controls />
              <Background />
            </ReactFlow>
          </div>
          <button className={`border boder-black p-2 h-8 bg-gray-200 mt-8 absolute right-4 ${isSidebarOpen ? "hidden" : ""}`} onClick={() => setIsSidebarOpen(true)}><PlusIcon /></button>
          <button className={`border boder-black p-2 h-8 bg-gray-200 mt-8 absolute right-4 bottom-4 ${isConsoleOpen ? "hidden" : ""}`} onClick={() => setIsConsoleOpen(true)}><PlusIcon /></button>
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>
        {
          isConsoleOpen ?

            <AutomationConsole isOpen={isConsoleOpen} setIsOpen={setIsConsoleOpen} consoleData={consoleData} /> : ""
        }
      </div>
    </AutomationContext.Provider>
  );
}

export default () => (
  <ReactFlowProvider>
    <Automation />
  </ReactFlowProvider>
);
