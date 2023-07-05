import { useEffect } from 'react';

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (!ref.current?.contains(e.target)) {
        handler;
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    document.addEventListener('touchstart', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
      document.removeEventListener('touchstart', handleClickOutSide);
    };
  }, [ref, handler]);
}
export default useOnClickOutside;
