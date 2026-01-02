import React, { useMemo, useState } from 'react';
import { Position, Handle, useNodeId, useNodesData } from '@xyflow/react';
import { Dialog } from '../Dialog';
import UpdateNodeData from '../UpdateNodeData';

function SetData() {
  const nodeId = useNodeId();
  const nodeData = useNodesData(`${nodeId}`);
  const [dataStore, setDataStore] = useState<[{ name: string, value: string, type: string }]>(nodeData?.data.dataStore || [{ name: "", value: "", type: "" }]);
  const type = ["string", "number", "boolean"];

  UpdateNodeData(nodeId, dataStore);

  function updateDataStore(index: number, toUpdate: string, toUpdateValue: string | number | boolean) {
        const updatedDataStore = [...dataStore];
        updatedDataStore[index][toUpdate] = toUpdateValue;
        setDataStore(updatedDataStore);
    }

  return (
    <div className='p-2 px-16 bg-white border border-black rounded-sm'>
      Set Data
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
            {dataStore.map((data, index) => (
              <div key={index}>
                name<input type='text' value={data.name} onChange={(e) => updateDataStore(index, "name", e.target.value)} />
                type <select value={data.type} onChange={(e) => updateDataStore(index, "type", e.target.value)}>
                  {type.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
                value<input type='text' value={data.value} onChange={(e) => updateDataStore(index, "value", e.target.value)} />
              </div>
            ))}
            <button onClick={() => setDataStore([...dataStore, { name: "", value: "", type: "" }])}>Add + </button>

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

export default SetData;