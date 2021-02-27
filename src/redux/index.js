import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import AllReducer from './reducers';
import firebase from '../firebase';

const initialState = {}

const store = createStore(AllReducer, initialState, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument({getFirestore})), 
  reduxFirestore(firebase)
  ))

export default store