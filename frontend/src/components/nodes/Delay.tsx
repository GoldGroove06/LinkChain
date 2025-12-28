import { Position, Handle } from '@xyflow/react';

function Delay() {
    return (
        <div className='p-2 px-16 bg-white border border-black rounded-sm'>
            Delay(in seconds): <input type='number' className='border bg-red-700 rounded-md p-2'/>
            <Handle type="target" position={Position.Top} id="a" />
            <Handle type="source" position={Position.Bottom} id="b"/>
        </div>
    );
}

export default Delay;