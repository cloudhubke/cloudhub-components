import { List } from 'immutable';
import _ from 'lodash';
import {
  GET_BANKS,
  ADD_BANK,
  UPDATE_BANK,
  EDIT_BANK_ROW,
  ADD_TO_DELETE_BANKS,
  DELETE_BANKS,
} from '../actions';

const INITIAL_STATE = {
  editTitle: 'Edit Bank',
  editingRow: null,
  deletingRows: [],
  banks: List(),
  totalCount: 0,
};
export const bankReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_BANKS:
      return {
        ...state,
        banks: List(action.payload.items),
        totalCount: action.payload.totalCount,
      };
    case ADD_BANK:
      return { ...state, banks: state.banks.push(action.payload) };
    case EDIT_BANK_ROW:
      return {
        ...state,
        editingRow: action.payload,
        editTitle: getTitle(),
      };
    case ADD_TO_DELETE_BANKS:
      return { ...state, deletingRows: action.payload };
    case DELETE_BANKS:
      return deleteBanks();
    case UPDATE_BANK:
      return {
        ...state,
        banks: state.banks.map(item => {
          if (item._id === action.payload._id) return action.payload;
          return item;
        }),
      };

    default:
      return state;
  }
  function getTitle() {
    return _.isEmpty(action.payload) ? 'Add Bank' : action.payload.BankName;
  }

  function deleteBanks() {
    let data = state.banks;
    state.deletingRows.forEach(item => {
      const index = data.findIndex(row => row._id === item._id);
      data = data.delete(index);
    });
    return { ...state, banks: data, deletingRows: [] };
  }
};

export default bankReducer;
