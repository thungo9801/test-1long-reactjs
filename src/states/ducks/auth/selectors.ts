import { createSelector, Selector } from "reselect"

import { StateAll } from "../types"
import { AuthState } from "./models"

export const rootSelector: Selector<StateAll, AuthState> = (state: StateAll) => state.auth

const getUser = createSelector(
  rootSelector,
  (state: AuthState) => {
    return state.user
  }
)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUser,
}
