import { Container } from "@mui/material"
import { enqueueSnackbar } from "notistack"
import * as React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { postsOperations, postsSelectors } from "../../../../states/ducks/posts"
import { Post } from "../../../../states/ducks/posts/models"
import PostForm from "../../../components/post/PostForm"

const UpdatePost: React.FC = () => {
  let { id }: any = useParams()
  const [postDetail, setPostDetail] = useState<Post>()
  const [isFetchingPostDetail, setIsFetchingPostDetail] = useState<boolean>(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const { loading } = useSelector(postsSelectors.getPosts)

  const getPostDetail = async () => {
    try {
      setIsFetchingPostDetail(true)
      const data = await postsOperations.getPostDetail(id)
      setPostDetail(data)
      setIsFetchingPostDetail(false)
      console.log(data)
    } catch (error) {
      setIsFetchingPostDetail(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getPostDetail()
  }, [])

  const onSubmit = (values: any) => {
    try {
      dispatch(postsOperations.updatePost(id, values.title, values.body, 1, (error: any, data) => {
        if (data) {
          enqueueSnackbar("Update post success", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: {
              horizontal: "center",
              vertical: "bottom",
            }
          })
          history.push("/post")
        }

        if (error) {
          enqueueSnackbar(error, {
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
      <h1>Edit post</h1>
      <PostForm
        loading={loading || isFetchingPostDetail}
        onSubmit={onSubmit}
        title={postDetail ? postDetail.title : ""}
        body={postDetail ? postDetail.body : ""}
        submitButtonTitle="Update post"
      />
    </Container>
  )
}

export default UpdatePost
