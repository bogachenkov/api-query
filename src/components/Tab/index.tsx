import React, { useState, useRef, useCallback } from 'react';
import { MoreVertical, Terminal } from 'react-feather';

// Import Redux
import { useDispatch } from 'react-redux';
import Actions from '@actions';

// Import components
import TabOptions from './TabOptions';

// Import styles
import './tab.scss';

interface ITabProps {
  id: string;
  name: string;
  active: boolean;
  value: string;
}

const Tab:React.FC<ITabProps> = ({ id, name, value, active }) => {
  const dispatch = useDispatch();
  const [dropdownIsOpen, toggleDropdown] = useState(false);
  const moreRef = useRef<HTMLButtonElement>(null);

  const handleSelect = useCallback(() => {
    if (active) return;
    dispatch(Actions.selectRecord(id))
  }, [id, active]);

  const handleRemove = useCallback(() => {
    dispatch(Actions.removeRecordRequest(id))
  }, [id]);

  const handleDropdown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleDropdown(current => !current)
  }, [toggleDropdown]);

  const handleRun = useCallback(() => {
    dispatch(Actions.runFromHistory(id, value));
  }, [id, value])

  const handleCopy = useCallback(async() => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error('Failed to copy', error);
    }
  }, [value]);

  return (
    <div onClick={handleSelect} className={`tab ${active ? 'tab-active' : ''} ${dropdownIsOpen ? 'tab-selected' : ''}`}>
      <Terminal size={18} />
      <span className="tab--name">{ name }</span>
      <button title="Действия" className="tab--more" ref={moreRef} onClick={handleDropdown} type="button">
        <MoreVertical size={18} />
      </button>
      {
        dropdownIsOpen &&
        <TabOptions onCopy={handleCopy} 
                    onRemove={handleRemove} 
                    onRun={handleRun}
                    btnRef={moreRef} 
                    cb={() => toggleDropdown(false)}
        />
      }
    </div>
  );
};

export default React.memo(Tab);