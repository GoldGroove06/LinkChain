import React from 'react';
import { useDraggable } from '@neodrag/react';
import { useReactFlow, XYPosition } from '@xyflow/react';
import { useCallback, useRef, useState } from 'react';
import { cn } from '../utils/utils';

// This is a simple ID generator for the nodes.
// You can customize this to use your own ID generation logic.
const getId = () => crypto.randomUUID();

const HamburgerMenuSvg = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
const CrossSvg = () => <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

interface DraggableNodeProps {
  className?: string;
  children: React.ReactNode;
  nodeType: string;
  onDrop: (nodeType: string, position: XYPosition) => void;
}

const nodesArray = ['manualTrigger', 'webhook', 'cron', 'setData', 'ifCondition', 'console', 'errorCatch', 'httpRequest', 'filter', 'function', 'loop', 'respond', 'stop', 'delay'];


function DraggableNode({ className, children, nodeType, onDrop }: DraggableNodeProps) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<XYPosition>({ x: 0, y: 0 });

  useDraggable(draggableRef, {
    position: position,
    onDrag: ({ offsetX, offsetY }) => {
      // Calculate position relative to the viewport
      setPosition({
        x: offsetX,
        y: offsetY,
      });
    },
    onDragEnd: ({ event }) => {
      setPosition({ x: 0, y: 0 });
      onDrop(nodeType, {
        x: event.clientX,
        y: event.clientY,
      });
    },
  });

  return (
    <div className={cn('dndnode', className)} ref={draggableRef}>
      {children}
    </div>
  );
}

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) {
  const { setNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeDrop = useCallback(
    (nodeType: string, screenPosition: XYPosition) => {
      const flow = document.querySelector('.react-flow');
      const flowRect = flow?.getBoundingClientRect();
      const isInFlow =
        flowRect &&
        screenPosition.x >= flowRect.left &&
        screenPosition.x <= flowRect.right &&
        screenPosition.y >= flowRect.top &&
        screenPosition.y <= flowRect.bottom;

      // Create a new node and add it to the flow
      if (isInFlow) {
        const position = screenToFlowPosition(screenPosition);

        const newNode = {
          id: getId(),
          type: nodeType,
          position,
          data: { label: `${nodeType} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [setNodes, screenToFlowPosition],
  );
  console.log(isOpen)

  return (
    <aside className={`${isOpen ? 'block' : 'hidden'}`}>
      <div className="description">
        <button onClick={() => setIsOpen(false)}><CrossSvg /></button>
        <p>Drag a node to the canvas</p>
      </div>
      <div className='flex flex-col gap-2'>


        {nodesArray.map((nodeType) => (
          <DraggableNode className={nodeType} nodeType={nodeType} key={nodeType} onDrop={handleNodeDrop} className='border border-black items-center justify-center flex'>
            {nodeType}
          </DraggableNode>
        ))}
      </div>
    </aside>
  );
}
