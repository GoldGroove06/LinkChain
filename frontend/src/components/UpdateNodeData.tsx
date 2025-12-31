import React, { useEffect } from 'react';
import { AutomationContext } from '../pages/Automation';
const { updateNodeData } = React.useContext(AutomationContext);



function UpdateNodeData(nodeId: string|null, dataToStore: any) {
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