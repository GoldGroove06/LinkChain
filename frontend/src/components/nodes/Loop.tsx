import { Position, Handle, useNodeId, useNodesData } from '@xyflow/react';
import { Dialog } from '../Dialog';
import { useState } from 'react';
import UpdateNodeData from '../UpdateNodeData';

function Loop() {
    const nodeId = useNodeId();
    const nodeData = useNodesData(`${nodeId}`);
    const [dataStore, setDataStore] = useState<{ noOfTimes: number }>({ noOfTimes: nodeData.data.noOfTimes || 0 });
    UpdateNodeData(nodeId, dataStore);
    console.log(nodeData)
    return (
        <div className='p-2 px-16 bg-white border border-black rounded-sm'>
            <Dialog.Root>
                <Dialog.Trigger className="px-4 py-2 bg-blue-600 text-white rounded">
                    Edit
                </Dialog.Trigger>

                <Dialog.Overlay />

                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Set Data</Dialog.Title>

                    </Dialog.Header>
                    <div>
                        how many times <input type='number' className='border' value={dataStore.noOfTimes} onChange={(e) => setDataStore({ noOfTimes: e.target.value })} /><br />


                    </div>

                    <Dialog.Footer>
                        <Dialog.Close className="px-3 py-1 rounded bg-zinc-700">
                            Cancel
                        </Dialog.Close>
                        <button className="px-3 py-1 rounded bg-red-600">
                            Delete
                        </button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>

            <Handle type="target" position={Position.Top} id="a" />
            <Handle type="source" position={Position.Bottom} id="b" />
            <Handle type="source" position={Position.Right} id="c" />
        </div>
    );
}

export default Loop;