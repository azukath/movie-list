import { combineReducers } from "redux";
import listMovie from './movieListReducer';
import myList from './myListReducer';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
  fireStore: firestoreReducer,
  listMovie,
  myList
})