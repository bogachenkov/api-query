import React, { useRef, useCallback, useState } from 'react';
import { Copy, X, Play } from 'react-feather';

// Import hooks
import useOnClickOutside from '@hooks/useOnClickOutside';

interface ITabOptionsProps {
  cb: (e: MouseEvent | TouchEvent) => void;
  onRemove: () => void;
  onCopy: () => Promise<void>;
  onRun: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
}

const TabOptions:React.FC<ITabOptionsProps> = ({ cb, btnRef, onRemove, onCopy, onRun }) => {
  const ref = useRef<HTMLUListElement>(null);
  const [copiedMessage, setCopiedMessage] = useState(null);
  useOnClickOutside(cb, ref, btnRef);

  const handleCopyClick = useCallback(() => {
    try {
      onCopy();
      setCopiedMessage('Скопировано')
    } catch (error) {
      setCopiedMessage('Ошибка');
    } finally {
      setTimeout(() => {
        setCopiedMessage(null);
      }, 3000)
    }
  }, [copiedMessage]);

  return (
    <ul ref={ref} className="tab--options" onClick={e => e.stopPropagation()}>
      <li role="button" onClick={onRun}>
        <Play size={16} />
        Выполнить
        </li>
      <li role="button" onClick={handleCopyClick}>
        <Copy size={16} />
        {copiedMessage || 'Скопировать'}
      </li>
      <hr/>
      <li role="button" onClick={onRemove}>
        <X size={16} />
        Удалить
        </li>
    </ul>
  );
};

export default TabOptions;