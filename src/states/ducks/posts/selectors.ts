import { createSelector } from "reselect"

import { StateAll } from "../types"
import { PostsState } from "./models"

const getPosts = createSelector(
  (state: StateAll) => {
    console.log(state)
    return state.posts
  },
  (post: PostsState) => post
)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPosts,
}
