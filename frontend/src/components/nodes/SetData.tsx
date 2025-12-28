import React, { useEffect } from 'react';
import { Position, Handle, useNodeId, useNodesData } from '@xyflow/react';
import { AutomationContext } from '../../pages/Automation';

function SetData() {   
    const { updateNodeData } = React.useContext(AutomationContext);
    const nodeId = useNodeId();
    const nodeData = useNodesData(`${nodeId}`);
    const [variable, setVariable] = React.useState(nodeData?.data.variable);
    const [variableValue, setVariableValue] = React.useState(nodeData?.data.variableValue);

    useEffect(() => {
        console.log("useEffect called", nodeId)
            const delayInput = setTimeout(() => {
                if (nodeId){
                updateNodeData(nodeId, { variable: variable, variableValue: variableValue})
                }
            }, 1000);
    
            return () => clearTimeout(delayInput);
        }, [variable, variableValue]);

    return (
        <div className='p-2 px-16 bg-white border border-black rounded-sm'>
            <input type="text" className='border bg-red-700 rounded-md p-2' value={variable}  onChange={(e)=> setVariable(e.target.value)}/>
            <input type="text"  value={variableValue} onChange={(e) => setVariableValue(e.target.value)}/>

            <Handle type="target" position={Position.Top} id="a" />
            <Handle type="source" position={Position.Bottom} id="b"/>
        </div>
    );
}

export default SetData;