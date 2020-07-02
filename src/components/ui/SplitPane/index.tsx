import React, { useState, useRef, useCallback, useEffect } from 'react';

// Import styles
import './split-pane.scss';

interface ISplitPaneProps {
  minWidth: number;
  initialWidth: number;
  callback?: (width: number) => void;
}

interface IMousePosition {
  x: number;
  width: number;
}

const SplitPane:React.FC<ISplitPaneProps> = ({ children, initialWidth, minWidth, callback, ...props }) => {
  const [ sectionWidth, setSectionWidth ] = useState<number>(null);

  const container = useRef<HTMLDivElement>(null);
  const splitter = useRef<HTMLDivElement>(null);
  const mpos = useRef<IMousePosition | null>(null);

  useEffect(() => {
    const width = initialWidth ? initialWidth : container.current!.clientWidth / 2;
    setSectionWidth(width >= minWidth ? width : minWidth);
  }, []);

  useEffect(() => {
    if (!callback) return;
    const timeout = setTimeout(() => callback(sectionWidth), 1000);
    return () => clearTimeout(timeout);
  }, [sectionWidth])

  const onDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!splitter.current) return;

    mpos.current = {
      x: e.clientX,
      width: sectionWidth
    };

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', onDragEnd);
  }, [sectionWidth]);

  const onDrag = useCallback((e: MouseEvent) => {
    if (!mpos.current || !container.current) return;

    const deltaX = Math.max(e.clientX - mpos.current.x, -mpos.current.width);
    const width = mpos.current.width + deltaX;

    if (width <= minWidth) {
      return (sectionWidth !== minWidth) && setSectionWidth(minWidth);
    }

    if (width >= container.current.clientWidth - minWidth) {
      return (sectionWidth !== (container.current.clientWidth - minWidth)) && setSectionWidth(container.current.clientWidth - minWidth);
    }

    setSectionWidth(width);
  }, [sectionWidth]);

  const onDragEnd = useCallback(() => {
    mpos.current = null;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', onDragEnd);
  }, [onDrag]);

  if (React.Children.count(children) < 2 || React.Children.count(children) > 2) {
    console.error('Error: SplitPane must have two children components')
    return null;
  }

  return (
    <section {...props} className="split-pane" ref={container} style={{ gridTemplateColumns: `${sectionWidth}px 1fr` }}>
      <div className="split-pane--section">
        { React.Children.toArray(children)[0] }
      </div>
      <div className="split-pane--section">
        <div className="split-pane--separator" ref={splitter} onMouseDown={onDragStart} />
        { React.Children.toArray(children)[1] }
      </div>
    </section>
  );
};

export default SplitPane;