import { Position, Handle, useNodeId } from '@xyflow/react';
import { useState } from 'react';
import UpdateNodeData from '../UpdateNodeData';
import { Dialog } from '../Dialog';


function HttpRequest() {
    const nodeId = useNodeId();
    const [dataStore, setDataStore] = useState<{ url: string, method: string, queryParams: string, body: string, headers: string }>({ url: "", method: "GET", queryParams: "", body: "", headers: "" });
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
                        <Dialog.Description>
                            <div>
                                Http Url to request: <input type='text' className='border bg-red-700 rounded-md p-2' value={dataStore.url} onChange={(e) => setDataStore({ ...dataStore, url: e.target.value })} />
                                method: <select value={dataStore.method} onChange={(e) => setDataStore({ ...dataStore, method: e.target.value })}>
                                    <option value="GET">GET</option>
                                    <option value="POST">POST</option>
                                    <option value="PUT">PUT</option>
                                    <option value="DELETE">DELETE</option>
                                </select>
                                send Query Params:
                                <input type='textarea' className='border bg-red-700 rounded-md p-2' value={dataStore.queryParams} onChange={(e) => setDataStore({ ...dataStore, queryParams: e.target.value })} />
                                send Body: <input type='textarea' className='border bg-red-700 rounded-md p-2' value={dataStore.body} onChange={(e) => setDataStore({ ...dataStore, body: e.target.value })} />
                                send Headers: <input type='textarea' className='border bg-red-700 rounded-md p-2' value={dataStore.headers} onChange={(e) => setDataStore({ ...dataStore, headers: e.target.value })} />

                            </div>
                        </Dialog.Description>
                    </Dialog.Header>

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