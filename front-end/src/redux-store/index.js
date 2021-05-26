import {createStore, combineReducers} from 'redux';
import mainApp from './reducers/main-app';

const rootReducer = combineReducers({
  main_app: mainApp,
});

// const configureStore = createStore(rootReducer, initialState);

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
