import React, { useEffect } from 'react';
import { Position, Handle, useNodeId, useNodesData } from '@xyflow/react';
import { AutomationContext } from '../../pages/Automation';

function IfLoop() {
    const { updateNodeData } = React.useContext(AutomationContext);
    const nodeId = useNodeId();
    const nodeData = useNodesData(`${nodeId}`);
    console.log(nodeData)
    const [condition, setCondition] = React.useState(nodeData?.data.condition);

    useEffect(() => {
        console.log("useEffect called", nodeId)
        const delayInput = setTimeout(() => {
            if (nodeId && condition){
            updateNodeData(nodeId, { condition: condition})
            }
        }, 1000);

        return () => clearTimeout(delayInput);
    }, [condition]);
    return (
        <div className='p-2 px-16 bg-white border border-black rounded-sm'>
            if Loop
            Condition: <input type='text' value={condition} onChange={(e) => setCondition(e.target.value)}/>

            <Handle type="source" position={Position.Top} id="a" />
            <Handle type="target" position={Position.Bottom} id="b"/>
        </div>
    );
}

export default IfLoop;