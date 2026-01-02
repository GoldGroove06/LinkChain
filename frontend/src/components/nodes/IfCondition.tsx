import React, { useEffect, useState, useMemo } from 'react';
import { Position, Handle, useNodeId, useNodesData } from '@xyflow/react';
import { Dialog } from '../Dialog';
import UpdateNodeData from '../UpdateNodeData';
import { data } from 'react-router';

function IfCondition() {
    const nodeId = useNodeId();
    const nodeData = useNodesData(`${nodeId}`);
    console.log("if condition", nodeData);
    const [dataStore, setDataStore] = useState<[{ value1: string, value2: string }]>(nodeData?.data.dataStore ||[{ value1: "", value2: "" }]);
    const [compareType, setCompareType] = React.useState<"and" | "or">(nodeData?.data.compareType || "and");

    // const send =  {dataStore, compareType};
    UpdateNodeData(nodeId, useMemo(() => { return {dataStore, compareType}}, [dataStore, compareType]));

    function updateDataStore(index: number, toUpdate: string, toUpdateValue: string | number | boolean) {
        const updatedDataStore = [...dataStore];
        updatedDataStore[index][toUpdate] = toUpdateValue;
        setDataStore(updatedDataStore);
    }

    return (
        <div className='p-2 px-16 bg-white border border-black rounded-sm'>
            if
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
                                value 1 <input
                                    type="text"
                                    value={data.value1}
                                    onChange={(e) => updateDataStore(index, "value1", e.target.value)}
                                />

                                value 2<input
                                    type="text"
                                    value={data.value2}
                                    onChange={(e) => updateDataStore(index, "value2", e.target.value)}
                                />

                                {index == 0 ?
                                    (<select
                                        value={compareType}
                                        onChange={(e) => setCompareType(e.target.value)}
                                    >
                                        <option value="and">AND</option>
                                        <option value="or">OR</option>
                                    </select>)
                                    :
                                    compareType
                                }
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

export default IfCondition;