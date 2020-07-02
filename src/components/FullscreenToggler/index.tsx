import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Maximize, Minimize } from 'react-feather';

// Import Components
import HeaderButton from '@/ui/HeaderButton';
import HeaderItem from '@/HeaderItem';

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

const FullscreenToggler:React.FC = () => {
  
  const getBrowserPropName = useCallback(() => {
    if (typeof document.fullscreenElement !== "undefined") {
      return "fullscreenElement";
    } else if (typeof document.mozFullScreenElement !== "undefined") {
      return "mozFullScreenElement";
    } else if (typeof document.msFullscreenElement !== "undefined") {
      return "msFullscreenElement";
    } else if (typeof document.webkitFullscreenElement !== "undefined") {
      return "webkitFullscreenElement";
    } else {
      throw new Error("fullscreenElement is not supported by this browser");
    }
  }, []);

  const [ isFullscreen, setFullscreen ] = useState(document[getBrowserPropName()] != null);

  useLayoutEffect(() => {
    document.onfullscreenchange = () => {
      setFullscreen(document[getBrowserPropName()] != null);
    }

    return () => {
      document.onfullscreenchange = null
    };
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullscreen(false);
      }
    }
  }, [isFullscreen]);

  return (
    <HeaderItem>
      <HeaderButton onClick={toggleFullScreen} active={isFullscreen}>
        { isFullscreen ? <Minimize size={20} /> : <Maximize size={20} /> }
      </HeaderButton>
      <p>{ isFullscreen ? 'Свернуть' : 'Развернуть'  }</p>
    </HeaderItem>
  );
};

export default FullscreenToggler;