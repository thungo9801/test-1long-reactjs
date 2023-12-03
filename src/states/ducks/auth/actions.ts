import { createStandardAction } from "typesafe-actions"
import { User } from "./models"

// GET POST
export const loginRequest = createStandardAction("LOGIN_REQUEST ")()
export const loginSuccess = createStandardAction("LOGIN_SUCCESS")<User>()
export const loginFailure = createStandardAction("LOGIN_FAILURE")<string>()
export const logout = createStandardAction("LOGOUT")()

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout
}
