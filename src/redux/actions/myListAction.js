import moment from 'moment';

export const getMyList = (value) => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()
  const collect = firestore.collection('listMovie');
  let arr = [];
  firestore.collection(`${value}`).orderBy("time", "asc").get().then((res) => {
    if(res.docs.length > 0){
      res.forEach((item) => {
        let obj = item.data();
        arr.push(obj)
      })
    }
    return dispatch({ type: 'SET_MY_LIST_SUCCESS', payload: { data: arr, movieData: null } })
  })
}

export const addNewList = (value, successCB, failedCB) => async (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore()
  const doc = firestore.collection('listGroup').doc();
  value.time = moment().format('HH:mm:ss')
  value.uid = doc.id
  doc.set(value).then(() => {
    return successCB && successCB()
  }).catch((err) => {
    return failedCB && failedCB(err)
  })
}

