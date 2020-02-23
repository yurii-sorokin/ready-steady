import { useCallback, useState } from 'react';

export interface UseToggleResult {
  enabled: boolean;
  setOn: () => void;
  setOff: () => void;
  toggle: () => void;
}

export const useToggle = (enabledInitial = false): UseToggleResult => {
  const [enabled, setEnabled] = useState(enabledInitial);
  const setOn = useCallback(() => setEnabled(true), []);
  const setOff = useCallback(() => setEnabled(false), []);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);
  return { enabled, setOn, setOff, toggle };
};
