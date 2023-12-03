import { AuthState } from "./auth/models"
import { PostsState } from "./posts/models"

export interface StateAll {
  auth: AuthState
  posts: PostsState
}
