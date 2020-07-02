import { useRef, useEffect } from "react";

function useEventListener<T extends HTMLElement | Document | Window, K extends keyof DocumentEventMap>
  (event: K, handler: (e: DocumentEventMap[K]) => void, element: T): void {

  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [ handler ]);

  const eventListener = (event: DocumentEventMap[K]) => handlerRef.current(event);

  useEffect(() => {
    if (!element.addEventListener) return;
    element.addEventListener(event, eventListener as EventListener);
    
    return () => {
      console.log('Removing event listener');
      element.removeEventListener(event, eventListener as EventListener);
    }
  }, [])
}

export default useEventListener;