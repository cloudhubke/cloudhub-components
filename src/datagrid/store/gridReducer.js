const GRID_STATE = {
  params: {},
  selection: {},
  data: [],
  totalCount: 0,
  loading: false,
};
export const INITIAL_STATE = {};

const gridReducer = (state = INITIAL_STATE, { url, type, payload }) => {
  if (`${url}`) {
    const gridState = state[url] || { ...GRID_STATE };
    switch (type) {
      case 'update': {
        return { ...state, [url]: { ...gridState, ...payload } };
      }
      default:
        return { ...state };
    }
  }

  return { ...state };
};

export default gridReducer;
