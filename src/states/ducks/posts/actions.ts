import { createStandardAction } from "typesafe-actions"
import { Post, PostsState } from "./models"

// GET POST
export const fetchPostsRequest = createStandardAction("FETCH_POSTS_REQUEST")()
export const fetchPostsSuccess = createStandardAction("FETCH_POSTS_SUCCESS")<PostsState["posts"]>()
export const fetchPostsFailure = createStandardAction("FETCH_POSTS_FAILURE")<PostsState["error"]>()

// ADD POST
export const addPostRequest = createStandardAction("ADD_POST_REQUEST")()
export const addPostSuccess = createStandardAction("ADD_POST_SUCCESS")<Post>()
export const addPostFailure = createStandardAction("ADD_POST_FAILURE")<PostsState["error"]>()

// UPDATE POST
export const updatePostRequest = createStandardAction("UPDATE_POST_REQUEST")()
export const updatePostSuccess = createStandardAction("UPDATE_POST_SUCCESS")<Post>()
export const updatePostFailure = createStandardAction("UPDATE_POST_FAILURE")<PostsState["error"]>()

// DELETE POST
export const deletePostRequest = createStandardAction("DELETE_POST_REQUEST")()
export const deletePostSuccess = createStandardAction("DELETE_POST_SUCCESS")<Post["id"]>()
export const deletePostFailure = createStandardAction("DELETE_POST_FAILURE")<PostsState["error"]>()

// SEARCH POST
export const searchPostsRequest = createStandardAction("SEARCH_POSTS_REQUEST")()
export const searchPostsSuccess = createStandardAction("SEARCH_POSTS_SUCCESS")<PostsState["posts"]>()
export const searchPostsFailure = createStandardAction("SEARCH_POSTS_FAILURE")<PostsState["error"]>()

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchPostsRequest,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPostRequest,
  addPostSuccess,
  addPostFailure,
  updatePostRequest,
  updatePostSuccess,
  updatePostFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  searchPostsRequest,
  searchPostsSuccess,
  searchPostsFailure,
}
