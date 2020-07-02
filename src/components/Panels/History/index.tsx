import React, { useRef, useCallback } from 'react';
import { X } from 'react-feather';

// Import Redux
import { useSelector, useDispatch } from 'react-redux';
import Actions from '@actions';
import { getHistoryRecords, getSelectedID } from '@selectors';

// Import Components
import Tab from '@/Tab';

// Import styles
import './history.scss';

const History:React.FC = () => {
  const records = useSelector(getHistoryRecords);
  const selectedID = useSelector(getSelectedID);
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleScroll = useCallback((e: React.WheelEvent<HTMLElement>) => {
    if (!ref.current) return;
    ref.current.scrollTo({
        top: 0,
        left: ref.current.scrollLeft + e.deltaY
    });
  }, []);

  return (
    <section className="history">
      <div ref={ref} onWheel={handleScroll}  className="history--tabs">
        {
          [...records].reverse().map(({ id, name, value }) => 
            <Tab key={id}
                id={id}
                name={name}
                value={value}
                active={id === selectedID}
            />
          )
        }    
      </div>
      <button onClick={() => dispatch(Actions.clearHistory())} className="history--clear">
        <X size={24} />  
      </button>    
    </section>
  );
};

export default React.memo(History);