import { getType } from "typesafe-actions"
import actions from "./actions"
import { AuthState } from "./models"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

const authReducer = (state: AuthState = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    case getType(actions.loginRequest):
      return { ...state, loading: true, error: null }
    case getType(actions.loginSuccess):
      console.log(action)
      return { ...state, user: action.payload, loading: false, error: null }
    case getType(actions.loginFailure):
      return { ...state, loading: false, error: action.payload }
    case getType(actions.logout):
      return { ...state, user: null }
    default:
      return state
  }
}

const persistConfig = {
  key: "auth",
  storage: storage,
  blacklist: ["loading", "error"],
}

export default persistReducer(persistConfig, authReducer)
