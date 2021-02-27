const SET_LIST_DATA = 'SET_LIST_DATA';
const SET_LIST_DATA_SUCCESS = 'SET_LIST_DATA_SUCCESS';
const SET_LIST_DATA_FAIL = 'SET_LIST_DATA_FAIL';
const UNMOUNT_LIST_DATA = 'UNMOUNT_LIST_DATA';

const initialState = {
  loading: true,
  data: []
}

export default function movieListReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_LIST_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_LIST_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case SET_LIST_DATA_FAIL:
      return {
        ...state,
        loading: false,
        data: [],
      };
    case UNMOUNT_LIST_DATA:
      return {
        ...state,
        loading: true,
        data: [],
      };
    default:
      return state;
  }
}
