import React, { useEffect } from 'react';
import { AutomationContext } from '../pages/Automation';

function UpdateNodeData(nodeId: string|null, dataToStore: any) {
    const { updateNodeData } = React.useContext(AutomationContext);
    useEffect(() => {
            console.log("useEffect called", nodeId)
            const delayInput = setTimeout(() => {
                if (nodeId && dataToStore) {
                    updateNodeData(nodeId, { ...dataToStore });
                }
            }, 1000);
    
            return () => clearTimeout(delayInput);
        }, [dataToStore]);
}

export default UpdateNodeData;