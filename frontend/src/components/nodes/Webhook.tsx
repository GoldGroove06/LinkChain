import { Position, Handle } from '@xyflow/react';

function Webhook() {

    return (
        <div className='p-2 px-16 bg-white border border-black rounded-sm'>
            <input type="text" className='border bg-red-700 rounded-md p-2' placeholder='enter the webhook'/>
            <Handle type="source" position={Position.Top} id="a" />
            <Handle type="target" position={Position.Bottom} id="b"/>
        </div>
    );
}

export default Webhook;