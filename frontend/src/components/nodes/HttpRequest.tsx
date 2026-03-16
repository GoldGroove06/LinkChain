import { Position, Handle, useNodeId, useNodesData } from '@xyflow/react';
import { useEffect, useState } from 'react';
import UpdateNodeData from '../UpdateNodeData';
import { Dialog } from '../Dialog';
import { data } from 'react-router';


function HttpRequest() {
    const nodeId = useNodeId();
    const nodeData = useNodesData(`${nodeId}`);
    const [dataStore, setDataStore] = useState<{ url: string, method: string, queryParams: Array<{ name: string, value: string }>, body: string, headers: Array<{ name: string, value: string }> }>(nodeData?.data.dataStore || { url: "", method: "GET", queryParams: [{ name: "", value: "" }], body: "", headers: [{ name: "", value: "" }] });
    UpdateNodeData(nodeId, dataStore);

    function updateDataStore(index: number, toUpdate: string, toUpdateValue: string | number | boolean, type: string) {
        const updatedDataStore = dataStore[`${type}`];
        updatedDataStore[index][toUpdate] = toUpdateValue;
        setDataStore({ ...dataStore, [`${type}`]: updatedDataStore });
    }
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
                        Http Url to request: <input type='text' className='border bg-red-700 rounded-md p-2' value={dataStore.url} onChange={(e) => setDataStore({ ...dataStore, url: e.target.value })} />
                        method: <select value={dataStore.method} onChange={(e) => setDataStore({ ...dataStore, method: e.target.value })}>
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                        send Query Params:
                        {dataStore.queryParams.map((qp, index) => (
                            <div key={index}>
                                Name: <input type='text' value={qp.name} onChange={(e) => updateDataStore(index, "name", e.target.value, "queryParams")} />
                                Value: <input type="text" value={qp.value} onChange={(e) => updateDataStore(index, "value", e.target.value, "queryParams")} />
                                <button onClick={() => {
                                    const updatedDataStore = [...dataStore.queryParams];
                                    updatedDataStore.splice(index, 1);
                                    setDataStore({ ...dataStore, queryParams: updatedDataStore })
                                }}
                                >Delete</button>
                            </div>
                        ))}
                        <button onClick={() => {
                            setDataStore({ ...dataStore, queryParams: [...dataStore.queryParams, { name: "", value: "" }] })
                        }}>Add more</button>
                        {/* <input type='textarea' className='border bg-red-700 rounded-md p-2' value={dataStore.queryParams} onChange={(e) => setDataStore({ ...dataStore, queryParams: e.target.value })} /> */}
                        <br />
                        send Body: <input type='textarea' className='border bg-red-700 rounded-md p-2' value={dataStore.body} onChange={(e) => setDataStore({ ...dataStore, body: e.target.value })} />
                        send Headers:
                        {/* <input type='textarea' className='border bg-red-700 rounded-md p-2' value={dataStore.headers} onChange={(e) => setDataStore({ ...dataStore, headers: e.target.value })} /> */}
                        {dataStore.headers.map((header, index) => (
                            <div key={index}>
                                Name: <input type='text' value={header.name} onChange={(e) => updateDataStore(index, "name", e.target.value, "headers")} />
                                Value: <input type="text" value={header.value} onChange={(e) => updateDataStore(index, "value", e.target.value, "headers")} />
                            <button onClick={() => {
                                    const updatedDataStore = [...dataStore.headers];
                                    updatedDataStore.splice(index, 1);
                                    setDataStore({ ...dataStore, headers: updatedDataStore })
                                }}
                                >Delete</button>
                            </div>
                        ))}
                        <button onClick={() => {
                            setDataStore({ ...dataStore, headers: [...dataStore.headers, { name: "", value: "" }] })
                        }}>Add more</button>
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

export default HttpRequest;