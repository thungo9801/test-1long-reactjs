import { Dispatch } from "redux"
import http from "../../../service/http"
import { StateAll } from "../types"
import actions from "./actions"
import { Post } from "./models"

const getPosts = (skip: number, limit: number = 20, callback?: (error: Error | null, data: Post[] | null) => void) =>
  async (dispatch: Dispatch, getState: () => StateAll) => {
    const state = getState()
    const { posts } = state.posts
    dispatch(actions.fetchPostsRequest())
    try {
      const response = await http.get(`posts?limit=${limit}&skip=${skip}`)
      const data: Post[] = response.data.posts
      const newPosts = skip === 0 ? data : [...posts, ...data]
      dispatch(actions.fetchPostsSuccess(newPosts))

      if (callback) {
        callback(null, data);
      }
    } catch (error: any) {
      dispatch(actions.fetchPostsFailure(error.message || "Failed to fetch posts"))

      if (callback) {
        callback(error, null);
      }
    }
  }

const addPost = (title: string, body: string, userId: number, callback?: (error: Error | null, data: Post | null) => void) => async (
  dispatch: Dispatch,
  getState: () => StateAll
) => {
  dispatch(actions.addPostRequest())
  try {
    const response = await http.post("/posts/add", { title, body, userId })
    dispatch(actions.addPostSuccess(response.data))

    if (callback) {
      callback(null, response.data);
    }
  } catch (error: any) {
    dispatch(actions.addPostFailure(error.message || "Failed to add post"))

    if (callback) {
      callback(error, null);
    }
  }
}

const updatePost = (postId: any, title: string, body: string, userId: number, callback?: (error: Error | null, data: Post | null) => void) => async (
  dispatch: Dispatch,
  getState: () => StateAll
) => {
  dispatch(actions.updatePostRequest())
  try {
    const response = await http.put(`/posts/${postId}`, { title, body, userId })
    dispatch(actions.updatePostSuccess(response.data))

    if (callback) {
      callback(null, response.data);
    }
  } catch (error: any) {
    dispatch(actions.updatePostFailure(error.message || "Failed to update post"))

    if (callback) {
      callback(error, null);
    }
  }
}

const deletePost = (id: number) => async (dispatch: Dispatch, getState: () => StateAll) => {
  dispatch(actions.deletePostRequest())
  try {
    // await http.delete(`/api/posts/${id}`)
    dispatch(actions.deletePostSuccess(id))
  } catch (error: any) {
    dispatch(actions.deletePostFailure(error.message || "Failed to delete post"))
  }
}

const searchPosts = (query: string, callback?: (error: Error | null, data: Post[] | null) => void) => async (dispatch: Dispatch, getState: () => StateAll) => {
  dispatch(actions.searchPostsRequest())
  try {
    const response = await http.get(`posts/search?q=${query}`)
    dispatch(actions.searchPostsSuccess(response.data.posts))

    if (callback) {
      callback(null, response.data.posts);
    }
  } catch (error: any) {
    dispatch(actions.searchPostsFailure(error.message || "Failed to search posts"))

    if (callback) {
      callback(error, null);
    }
  }
}

const getPostDetail = async (id: any) => {
  try {
    const response = await http.get(`/posts/${id}`)
    return response.data
  } catch (error: any) {
    throw error
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPosts,
  addPost,
  updatePost,
  deletePost,
  searchPosts,
  getPostDetail,
}
