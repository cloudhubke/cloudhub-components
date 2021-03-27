import create from 'zustand';
import gridReducer, { INITIAL_STATE } from './gridReducer';

const useGridStore = create((set) => ({
  ...INITIAL_STATE,
  dispatch: (args) => set((state) => gridReducer(state, args)),
}));

export default useGridStore;
