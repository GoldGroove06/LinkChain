import { Position, Handle } from '@xyflow/react';

function Loop() {
    return (
        <div className='p-2 px-16 bg-white border border-black rounded-sm'>
            how many times <input type='number' className='border'/><br/>
            what to loop <input type='text' className='border'/>
            <Handle type="target" position={Position.Top} id="a" />
            <Handle type="source" position={Position.Bottom} id="b"/>
        </div>
    );
}

export default Loop;