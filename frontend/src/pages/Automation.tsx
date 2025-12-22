import { useCallback, useEffect, useState } from 'react';
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

const nodeType = {
  manualTrigger: ManualTrigger,
  webhook: Webhook,
  cron: Cron
}

function Automation() {
  const [fetchedData, setFetchedData] = useState({})
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const {id} = useParams();

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
      if(data.automation.edges.length > 0){
        console.log(data.automation.edges,"from fetch")
          setEdges(data.automation.edges)
      }
      if(data.automation.nodes.length > 0){
        console.log(data.automation.nodes,"from fetch")
        const fetchedNodes = data.automation.nodes
      // console.log(initialNodesStructure)
      setNodes(fetchedNodes)

      
      }
      
    }
    fetchTree()
    },[])

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
       
      },1000)
      return () => clearTimeout(delayInput)
  },[nodes,edges])
  console.log("nodes:",nodes,"edges:", edges)

  return (
    <div className="flex flex-row h-screen">
      <div className="reactflow-wrapper w-[80%]">
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
      <Sidebar />
    </div>
  );
}

export default () => (
  <ReactFlowProvider>
    <Automation />
  </ReactFlowProvider>
);
