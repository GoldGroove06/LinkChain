import { Position, Handle, useNodeId, useNodesData } from '@xyflow/react';
import { useState } from 'react';
import UpdateNodeData from '../UpdateNodeData';
import { Dialog } from '../Dialog';

function Filter() {
    const nodeId = useNodeId();
    const nodeData = useNodesData(`${nodeId}`);
    const [dataStore, setDataStore] = useState<{ filterCondition: string }>(nodeData?.data.dataStore || { filterCondition: "" });
    UpdateNodeData(nodeId, dataStore);
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
                        Filter Condition: <input type='text' className='border bg-red-700 rounded-md p-2' value={dataStore.filterCondition} onChange={(e) => setDataStore({ filterCondition: e.target.value })} />
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
        </div>
    );
}

export default Filter;