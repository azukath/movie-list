import axios from "axios"
import { API_URL } from "../../config"
import moment from 'moment'

export const unmoutListData = () => async dispatch => {
  return dispatch({type: 'UNMOUNT_LIST_DATA'})
}

export const getListData = (page) => async (dispatch, getState) => {
  const stateBefore = getState();
  axios.get(`${API_URL}&page=${page}`).then((response) => {
    const newRes = [...stateBefore.listMovie.data, ...response.data.results]
    return dispatch({ type: 'SET_LIST_DATA_SUCCESS', payload: { data: newRes } })
  })
}

export const addMovieToList = (value, successCB, failedCB) => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()
  const collect = firestore.collection('listMovie');
  value.time = moment().format('HH:mm:ss')
  const movie = await collect.where('id', '==', value.id).where('uidGroup', '==', `${value.uidGroup}`).get();
  if(movie.docs.length > 0){
    return failedCB && failedCB()
  }else{
    await collect.doc().set(value).then(() => {
      return successCB && successCB()
    }).catch((err) => {
      return failedCB && failedCB(err)
    })
  }
}


