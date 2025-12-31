import { Position, Handle } from '@xyflow/react';

function HttpRequest() {
    return (
        <div className='p-2 px-16 bg-white border border-black rounded-sm'>
            Http Url to request: <input type='text' className='border bg-red-700 rounded-md p-2'/>
            method: <select>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
            </select>
            send Query Params:
            <input type='textarea' className='border bg-red-700 rounded-md p-2'/>
            send Body: <input type='textarea' className='border bg-red-700 rounded-md p-2'/>
            send Headers: <input type='textarea' className='border bg-red-700 rounded-md p-2'/>
            <Handle type="target" position={Position.Top} id="a" />
            <Handle type="source" position={Position.Bottom} id="b"/>
        </div>
    );
}

export default HttpRequest;