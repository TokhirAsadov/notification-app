import {userFetched, userFetchingError} from "../../slice/user/user_slice";
import {BASE_URL, TOKEN, TokenType, USER} from "../../../utills/ServiceUrls";

export const fetchUser = (request) => (dispatch) => {
  const token=localStorage.getItem(TOKEN)
  const headers={
    'Authorization':TokenType+token,
    'Access-Control-Allow-Origin': '*'
  }
  request(BASE_URL+USER.USER_ACTION,"GET",null,headers)
    .then(data => {
      dispatch(userFetched(data));
      saveToLocalStorage(data);
    })
    .catch(err => dispatch(userFetchingError(err)));
}

export function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem("store",serializedStore);
  }catch (e){
    console.log(e);
  }
}


// export const dispatch = useDispatch();
export function loadFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem("store");
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  }catch (e){
    console.log(e);
    return undefined;
  }
}


// export const fetchFilter = (request) => (dispatch) => {
//   dispatch(filtersFetching());
//   request("http://localhost:3001/filters")
//     .then(data => dispatch(filtersFetched(data)))
//     .catch(err => filtersFetchingError(err))
// }
// export const fetchNewsAdd = (request,newNews) => (dispatch) => {
//   request("http://localhost:3001/news","POST",JSON.stringify(newNews))
//     .then(res => console.log(res))
//     .then(dispatch(newsCreated(newNews)))
//     .catch(err => console.log(err))
// }
// export const fetchNews = (request) => (dispatch) => {
//   dispatch(newsFetching())
//   request("http://localhost:3001/news")
//     .then(data => dispatch(newsFetched(data)))
//     .catch(()=> dispatch(newsFetchingError()))
// }
// export const fetchDelete = (request,id) => (dispatch) => {
//   request(`http://localhost:3001/news/${id}`,"DELETE")
//     .then(data => console.log(data+" deleted"))
//     .then(dispatch(newsDeleted(id)))
//     .catch(err=>console.log(err))
// }