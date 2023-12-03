import { Dispatch } from "redux"
import actions from "./actions"
import { User } from "./models"

import axios from "../../../service/http"
import { StateAll } from "../types"

const login = (username: string, password: string, callback?: (error: Error | null, data: User | null) => void) => async (dispatch: Dispatch, getState: () => StateAll) => {
  dispatch(actions.loginRequest())
  try {
    const response = await axios.post("auth/login", {
      username,
      password,
    })
    const user: User = response.data
    dispatch(actions.loginSuccess(user))

    if (callback) {
      callback(null, user);
    }
  } catch (error: any) {
    dispatch(actions.loginFailure((error && error.response.data.message) || "Login failed"))

    if (callback) {
      callback(error, null);
    }
  }
}

const logout = () => async (dispatch: Dispatch, getState: () => StateAll) => {
  try {
    dispatch(actions.logout())
  } catch (error: any) {
    console.log(error)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  logout
}
