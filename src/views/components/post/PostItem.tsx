import { Button, Paper, Typography } from "@mui/material"
import * as React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { postsOperations } from "../../../states/ducks/posts"
import { Post } from "../../../states/ducks/posts/models"

interface Props {
  post: Post
}

const PostItem: React.FC<Props> = (props: Props) => {
  const { post } = props

  const dispatch = useDispatch()
  const history = useHistory()

  const goToUpdate = (e: any, postId: any) => {
    e.stopPropagation()
    history.push(`/post/update/${postId}`)
  }

  const handleDeletePost = (e: any, postId: any) => {
    e.stopPropagation()
    dispatch(postsOperations.deletePost(postId))
  }

  return (
    <Paper
      key={post.id}
      style={{ marginTop: 16, paddingBottom: 16, paddingTop: 16, cursor: 'pointer' }}
      onClick={e => goToUpdate(e, post.id)}
    >
      <Typography variant="h6">{post.title}</Typography>
      <Typography>{post.body}</Typography>
      <Button variant="outlined" color="primary" onClick={e => goToUpdate(e, post.id)}>
        Update
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={e => handleDeletePost(e, post.id)}
        style={{ marginLeft: 16 }}
      >
        Delete
      </Button>
    </Paper>
  )
}

export default PostItem
