import React from 'react';
import { Position, Handle, useNodeId, useNodesData } from '@xyflow/react';
import { AutomationContext } from '../../pages/Automation';

function Console() {
    const { updateNodeData } = React.useContext(AutomationContext);
    const nodeId = useNodeId();
    const nodeData = useNodesData(`${nodeId}`);

    if (nodeData && nodeData.data.consoleValue) {
        return (
            {nodeData}
        )
    }
    return (
        <div className='p-2 px-16 bg-white border border-black rounded-sm'>
           Consoled Value
                    
            <Handle type="source" position={Position.Top} id="a" />
        </div>
    );
}

export default Console;