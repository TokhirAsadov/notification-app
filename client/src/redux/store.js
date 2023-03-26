import {compose, configureStore} from "@reduxjs/toolkit";
import user from './slice/user/user_slice'
import stringMiddleware from "./middleware/stringMiddleware";
import {loadFromLocalStorage} from "./actions/user/user_actions";

const preloadedState = {
  user:{
    user: loadFromLocalStorage(),
    userId: "",
    userLoadingStatus: "start"
  },
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = configureStore({
  reducer: {
    user,
  },
  middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware)),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState
  // enhancers: composeEnhancers
})

// export const store1 = createStore({
//   reducer: { user },
//   middleware: (getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware)),
//   devTools: process.env.NODE_ENV !== "production"
// })