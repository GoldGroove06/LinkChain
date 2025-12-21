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

let initialNodesStructure = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 600},
  },
  {
    id: '2',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 400 },
  },
  {
    id: '3',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 200 },
  },
];

function Automation() {
  const [fetchedData, setFetchedData] = useState({})
  const [nodes, _, onNodesChange] = useNodesState(initialNodesStructure);
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
          // setEdges(data.automation.edges)
      }
      if(data.automation.nodes.length > 0){
        console.log(data.automation.nodes,"from fetch")
        const fetchedNodes = data.automation.nodes
        // initialNodesStructure = fetchedNodes
      
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
        if (fetchedData){

        
        if (fetchedData.nodes != nodes && fetchedData.edges != edges){
          console.log("update")
          //  updateBackend()
        }
      }
       
      },2000)
      return () => clearTimeout(delayInput)
  },[nodes,edges])
  console.log("nodes:",nodes,"edges:", edges)

  return (
    <div className="flex flex-row h-screen">
      <div className="reactflow-wrapper w-[80%]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
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
