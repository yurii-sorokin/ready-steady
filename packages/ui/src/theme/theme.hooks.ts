import { useStoreActions, useStoreState } from '../store.hooks';

export const useTheme = () => useStoreState(({ theme }) => theme.theme);

export const useSwitchTheme = () =>
  useStoreActions(({ theme }) => theme.switchTheme);
