import React from 'react';
import { Position, Handle, useNodeId } from '@xyflow/react';
import { AutomationContext } from '../../pages/Automation';

function ManualTrigger() {
    const nodeId = useNodeId();
    const { runAutomation } = React.useContext(AutomationContext);
    const onClick = () => {
        runAutomation(nodeId);
    }
    
    return (
        <div className='p-2 px-16 bg-white border border-black rounded-sm'>
            <button onClick={onClick} className='border bg-red-700 rounded-md p-2'>Trigger</button>
            <Handle type="source" position={Position.Top} id="a" />
            <Handle type="target" position={Position.Bottom} id="b"/>
        </div>
    );
}

export default ManualTrigger;