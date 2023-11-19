// Redux Hooks
// This file provides custom Redux hooks for dispatch and selector.
// - useAppDispatch: Hook for dispatching actions with type inference.
// - useAppSelector: Hook for selecting state from the Redux store.

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
