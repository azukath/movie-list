const SET_MY_LIST = 'SET_MY_LIST';
const SET_MY_LIST_SUCCESS = 'SET_MY_LIST_SUCCESS';
const SET_MY_LIST_FAIL = 'SET_MY_LIST_FAIL';
const UNMOUNT_LIST_DATA = 'UNMOUNT_LIST_DATA';

const initialState = {
  loading: true,
  data: null,
  movieData: null
}

export default function myListReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_MY_LIST:
      return {
        ...state,
        loading: true,
      };
    case SET_MY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        movieData: action.payload.movieData
      };
    case SET_MY_LIST_FAIL:
      return {
        ...state,
        loading: false,
        data: null,
      };
    case UNMOUNT_LIST_DATA:
      return {
        ...state,
        loading: true,
        data: null,
      };
    default:
      return state;
  }
}
