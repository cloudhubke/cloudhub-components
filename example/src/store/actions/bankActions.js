import { axiosinstance, CONFIG } from '../store';

export const GET_BANKS = 'GET_BANKS';
export const EDIT_BANK_ROW = 'EDIT_BANK_ROW';
export const ADD_BANK = 'ADD_BANK';
export const UPDATE_BANK = 'UPDATE_BANK';
export const ADD_TO_DELETE_BANKS = 'ADD_TO_DELETE_BANKS';
export const DELETE_BANKS = 'DELETE_BANKS';

export const getBanks = params => dispatch =>
  axiosinstance()
    .get(`${CONFIG.API_ENDPOINT}/bank/getall`, { params })
    .then(({ data }) => {
      dispatch({
        type: GET_BANKS,
        payload: data
      });
    })
    .catch(({ response }) => {
      console.log('Error', response.data.message || response.data);
    });

export const addBank = bank => {
  if (bank._id) return updateBank(bank);
  return dispatch => {
    axiosinstance()
      .post(`${CONFIG.API_ENDPOINT}/bank/savebank`, bank)
      .then(({ data }) => {
        dispatch({
          type: ADD_BANK,
          payload: data
        });
        console.log('Success', 'Bank saved');
        stopeditBankRow(dispatch);
      })
      .catch(({ response }) => {
        console.log('Error', response.data.message || response.data);
      });
  };
};

export const stopeditBankRow = dispatch =>
  dispatch({
    type: EDIT_BANK_ROW,
    payload: null
  });

export const addToDeleteBanks = banks => ({
  type: ADD_TO_DELETE_BANKS,
  payload: banks
});

export const deleteBanks = banks => dispatch =>
  axiosinstance()
    .get(`${CONFIG.API_ENDPOINT}/bank/delete`, { params: { banks } })
    .then(() => {
      dispatch({
        type: DELETE_BANKS,
        payload: null
      });
      console.log('Success', 'Bank deleted');
    })
    .catch(({ response }) => {
      console.log('Error', response.data.message || response.data);
    });

export const updateBank = bank => dispatch =>
  axiosinstance()
    .post(`${CONFIG.API_ENDPOINT}/bank/updatebank`, { ...bank, id: bank._id })
    .then(({ data }) => {
      dispatch({ type: UPDATE_BANK, payload: data });
      console.log('Success', 'Bank saved');
      stopeditBankRow(dispatch);
    })
    .catch(({ response }) => {
      console.log('Error', response.data.message || response.data);
    });

export const editBankRow = bank => ({
  type: EDIT_BANK_ROW,
  payload: bank
});
