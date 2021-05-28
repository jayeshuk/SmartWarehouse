import {produce} from 'immer';
import {LOG_USER, LOG_USER_OUT} from '../actions/actionTypes';

const initialState = {
  logged_user: {
    token: '',
    email: '',
    id: '',
    role: '',
    address: '',
    container: [],
  },
};

const main_app = (state = initialState, action) => {
  switch (action.type) {
    case LOG_USER:
      return produce(state, newState => {
        // console.log('LOGGED USER Payload:', action.payload);
        newState.logged_user.token = action.payload.token;
        newState.logged_user.email = action.payload.email;
        newState.logged_user.id = action.payload.id;
        newState.logged_user.role = action.payload.role;
        newState.logged_user.address = action.payload.address;
        newState.logged_user.container = action.payload.container;

        // console.log(newState);
      });

    case LOG_USER_OUT:
      return produce(state, newState => {
        // console.log('LOGGED USER Payload:', action.payload);
        newState.logged_user.token = '';
        newState.logged_user.email = '';
        newState.logged_user.id = '';
        newState.logged_user.role = '';
        newState.logged_user.address = '';
        newState.logged_user.container = [];

        // console.log(newState);
      });

    default:
      return state;
  }
};

export default main_app;
