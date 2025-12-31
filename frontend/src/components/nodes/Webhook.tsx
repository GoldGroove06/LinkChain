import { Position, Handle } from '@xyflow/react';

function Webhook() {

    return (
        <div className='p-2 px-16 bg-white border border-black rounded-sm'>
            URL: <input type="text" className='border bg-red-700 rounded-md p-2' placeholder='enter the url'/>
            Method: <select>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
            </select>
            Path: <input type="text" className='border bg-red-700 rounded-md p-2' placeholder='enter the path'/>
            <Handle type="target" position={Position.Top} id="a" />
            <Handle type="source" position={Position.Bottom} id="b"/>
        </div>
    );
}

export default Webhook;