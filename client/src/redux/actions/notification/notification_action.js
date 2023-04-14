import { NOTIFICATION_STORE} from "../../../utills/ServiceUrls";
import {
  notificationAddFetched,
} from "../../slice/notification/notification_slice";

export const fetchNotification = (payload) => (dispatch) => {
  dispatch(notificationAddFetched(payload))

  console.log(loadNotificationFromLocalStorage(),"localstorage")
  saveToLocalStorage([...loadNotificationFromLocalStorage() || [],...payload || []])
}

export function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store);
    window.localStorage.setItem(NOTIFICATION_STORE,serializedStore);
  }catch (e){
    console.log(e);
  }
}


// export const dispatch = useDispatch();
export function loadNotificationFromLocalStorage() {
  try {
    const serializedStore = window.localStorage.getItem(NOTIFICATION_STORE);
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  }catch (e){
    console.log(e);
    return undefined;
  }
}