import AddIcon from "@mui/icons-material/Add"
import { Container } from "@mui/material"
import Fab from "@mui/material/Fab"
import { isEmpty } from "lodash"
import * as React from "react"
import { useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { styled } from "styled-components"
import { postsOperations, postsSelectors } from "../../../../states/ducks/posts"
import { Post } from "../../../../states/ducks/posts/models"
import PostItem from "../../../components/post/PostItem"
import SearchBar from "../../../components/post/SearchBar"

const Title = styled.h1`
  font-family: "General Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 600;
  font-size: clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem);
  line-height: 1.22222;
  letter-spacing: -0.2px;
  color: rgb(31, 38, 46);
  text-align: center;
`

const ActionButton = styled.div`
  position: fixed;
  bottom: 32px;
  right: 16px;
  @media (min-width: 600px) {
    bottom: 32px;
    right: 16px;
  }
  @media (min-width: 1280px) {
    bottom: 64px;
    right: 312px;
  }
`

const EmptyBox = styled.p`
  font-size: 18px;
  margin-top: 25px;
  text-align: center;
`

const ListPost: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const postsState = useSelector(postsSelectors.getPosts)
  const { loading, posts } = postsState
  const [searchText, setSearchText] = React.useState<string>("")

  useEffect(() => {
    if (!isEmpty(searchText.trim())) {
      dispatch(postsOperations.searchPosts(searchText))
    } else {
      dispatch(postsOperations.getPosts(0))
    }
  }, [dispatch, searchText])

  const fetchMorePosts = () => {
    if (!searchText) {
      dispatch(postsOperations.getPosts(posts.length))
    }
  }

  const goToCreatePost = () => {
    history.push("/post/add")
  }

  const onChangeSearchText = (value: string) => {
    setSearchText(value)
  }

  return (
    <Container maxWidth="lg">
      <ActionButton onClick={goToCreatePost}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </ActionButton>
      <Title>List Post</Title>
      <SearchBar onChangeText={value => onChangeSearchText(value)} />
      <InfiniteScroll
        dataLength={posts.length || 0}
        next={fetchMorePosts}
        hasMore={true}
        loader={loading && <h4 style={{ textAlign: "center" }}>Loading...</h4>}
      >
        {posts.map((post: Post) => (
          <PostItem key={post.id} post={post} />
        ))}
        {!posts.length && !loading && <EmptyBox>No post</EmptyBox>}
      </InfiniteScroll>
    </Container>
  )
}

export default React.memo(ListPost)
