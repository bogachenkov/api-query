import { useEffect } from "react";

type ReactRef = React.RefObject<HTMLElement>;

function useOnClickOutside(handler: (e: MouseEvent | TouchEvent) => void, ...refs: ReactRef[]) {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        if (refs.some(ref => !ref.current || ref.current.contains(event.target as HTMLElement))) {
          return;
        }

        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    [refs, handler]
  );
}

export default useOnClickOutside;