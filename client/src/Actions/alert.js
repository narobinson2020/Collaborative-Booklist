import { uuid } from 'uuidv4';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (message, alertType) => (dispatch) => {
  const id = uuid();

  dispatch({
    type: SET_ALERT,
    payload: { message, alertType, id },
  });
};
