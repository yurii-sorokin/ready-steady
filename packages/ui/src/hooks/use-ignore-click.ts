import { RefObject, useCallback, MouseEvent } from 'react';

export const useIgnoreClick = (
  onClick: ((event: MouseEvent<any>) => void) | undefined,
  refList: RefObject<any>[]
) => {
  return useCallback(
    (event: MouseEvent<any>) => {
      if (!refList.some(ref => ref?.current?.contains(event.target))) {
        onClick && onClick(event);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onClick]
  );
};
