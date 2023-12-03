import { getType } from "typesafe-actions"
import actions from "./actions"
import { PostsState } from "./models"

const initialState: PostsState = {
  posts: [],
  error: null,
  loading: false,
}

const postsReducer = (state: PostsState = initialState, action: { type: any; payload: any }) => {
  switch (action.type) {
    // FETCH POST
    case getType(actions.fetchPostsRequest):
      return {
        ...state,
        loading: true,
      }
    case getType(actions.fetchPostsSuccess):
      return {
        ...state,
        loading: false,
        posts: action.payload,
      }
    case getType(actions.fetchPostsFailure):
      return {
        ...state,
        posts: [],
        error: action.payload,
        loading: false,
      }
   
    // ADD POST
    case getType(actions.addPostRequest):
      return {
        ...state,
        loading: true,
      }
    case getType(actions.addPostSuccess):
      return {
        ...state,
        loading: false,
        error: null,
        posts: [action.payload, ...state.posts],
      }
    case getType(actions.addPostFailure):
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    // UPDATE POST
    case getType(actions.updatePostRequest):
      return {
        ...state,
        loading: true,
      }
    case getType(actions.updatePostSuccess):
      const editedPosts = state.posts.map(post => (post.id === action.payload.id ? action.payload : post))
      return {
        ...state,
        posts: editedPosts,
        loading: false,
        error: null,
      }
    case getType(actions.updatePostFailure):
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    // DELETE POST
    case getType(actions.deletePostRequest):
      return {
        ...state,
        loading: true,
      }
    case getType(actions.deletePostSuccess):
      const updatedPosts = state.posts.filter(post => post.id !== action.payload)
      return {
        ...state,
        posts: updatedPosts,
        loading: false,
        error: null,
      }
    case getType(actions.deletePostFailure):
      return { ...state, error: action.payload, loading: false }

    // SEARCH POST
    case getType(actions.searchPostsRequest):
      return { ...state, loading: true }
    case getType(actions.searchPostsSuccess):
      return {
        ...state,
        posts: [...action.payload],
        loading: false,
        error: null,
      }
    case getType(actions.searchPostsFailure):
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export default postsReducer
