"use client";

import { useState, useRef, useEffect } from 'react';
import DragHandleIcon from '@mui/icons-material/DragHandle';

interface ResizableSplitterProps {
    top?: React.ReactNode;
    bottom?: React.ReactNode;
    left?: React.ReactNode;
    right?: React.ReactNode;
    // Helper to map old props if needed, or we enforce new usage
    panel1?: React.ReactNode; // Alternative name for first panel (top/left)
    panel2?: React.ReactNode; // Alternative name for second panel (bottom/right)

    initialSplit?: number; // percentage (0-100)
    direction?: 'horizontal' | 'vertical';
    minSize?: number; // percent
}

export default function ResizableSplitter({
    top, bottom, left, right,
    panel1, panel2,
    initialSplit = 70,
    direction = 'vertical',
    minSize = 0
}: ResizableSplitterProps) {
    // Normalize inputs
    // vertical: top = p1, bottom = p2
    // horizontal: left = p1, right = p2
    const p1 = panel1 || (direction === 'vertical' ? top : left);
    const p2 = panel2 || (direction === 'vertical' ? bottom : right);

    const [split, setSplit] = useState(initialSplit); // Percent
    const isDragging = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const onMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        isDragging.current = true;
        document.body.style.cursor = direction === 'vertical' ? 'row-resize' : 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault(); // Prevent text selection
    };

    useEffect(() => {
        const handleMove = (clientX: number, clientY: number) => {
            if (isDragging.current && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                let newSplit = 50;

                if (direction === 'vertical') {
                    const offset = clientY - rect.top;
                    newSplit = (offset / rect.height) * 100;
                } else {
                    const offset = clientX - rect.left;
                    newSplit = (offset / rect.width) * 100;
                }

                setSplit(Math.min(Math.max(newSplit, minSize), 100 - minSize));
            }
        };

        const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY);

        const onUp = () => {
            if (isDragging.current) {
                isDragging.current = false;
                document.body.style.cursor = '';
                document.body.style.userSelect = '';
                window.dispatchEvent(new Event('resize'));
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onUp);
        };
    }, [direction, minSize]);

    const isVertical = direction === 'vertical';

    return (
        <div ref={containerRef} className={`flex ${isVertical ? 'flex-col' : 'flex-row'} h-full w-full overflow-hidden`}>
            {/* Panel 1 */}
            <div style={{ [isVertical ? 'height' : 'width']: `${split}%` }} className="relative">
                {p1}
            </div>

            {/* Handle */}
            <div
                className={`${isVertical ? 'w-full h-4 cursor-row-resize' : 'h-full w-4 cursor-col-resize'} 
                            bg-gray-200 hover:bg-gray-300 flex items-center justify-center z-50 shadow-sm shrink-0`}
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
            >
                <DragHandleIcon
                    fontSize="small"
                    className={`text-gray-500 ${isVertical ? 'rotate-90' : ''}`}
                />
            </div>

            {/* Panel 2 */}
            <div style={{ [isVertical ? 'height' : 'width']: `${100 - split}%` }} className="relative bg-white flex-1 overflow-hidden">
                {p2}
            </div>
        </div>
    );
}
