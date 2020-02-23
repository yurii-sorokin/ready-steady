import { StoreModel } from './store';
import { createTypedHooks } from 'easy-peasy';

const { useStoreState, useStoreActions, useStoreDispatch } = createTypedHooks<
  StoreModel
>();

export { useStoreState, useStoreActions, useStoreDispatch };
