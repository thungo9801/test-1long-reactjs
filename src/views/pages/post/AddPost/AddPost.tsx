import { Container } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { postsOperations, postsSelectors } from "../../../../states/ducks/posts"
import PostForm from "../../../components/post/PostForm"

const AddPost: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { loading } = useSelector(postsSelectors.getPosts)

  const onSubmit = (values: any) => {
    try {
      dispatch(postsOperations.addPost(values.title, values.body, 1, (error: any, data) => {
        // case add post success => show snackbar success and go to main screen
        if (data) {
          enqueueSnackbar("Add post success", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: {
              horizontal: "center",
              vertical: "bottom",
            },
          })
          history.push("/post")

        }

        // case add post failed => show snackbar fail
        if (error) {
          enqueueSnackbar(error.response.data.message, {
            variant: "error",
            autoHideDuration: 3000,
            anchorOrigin: {
              horizontal: "center",
              vertical: "bottom",
            },
          })
        }
      }))

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container maxWidth="md">
      <h1>Add a new post</h1>
      <PostForm loading={loading} title="" body="" onSubmit={onSubmit} submitButtonTitle="Add post" />
    </Container>
  )
}

export default AddPost
