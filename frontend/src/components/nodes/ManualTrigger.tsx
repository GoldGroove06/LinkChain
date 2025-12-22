import { Position, Handle } from '@xyflow/react';

function ManualTrigger() {
    const onClick = () => {
        console.log("clicked")
    }
    return (
        <div className='p-2 px-16 bg-white border border-black rounded-sm'>
            <button onClick={onClick} className='border bg-red-700 rounded-md p-2'>Trigger</button>
            <Handle type="source" position={Position.Top} id="a" />
            <Handle type="target" position={Position.Bottom} id="b"/>
        </div>
    );
}

export default ManualTrigger;