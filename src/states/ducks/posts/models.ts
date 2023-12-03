export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: number
}

export interface PostsState {
  posts: Post[]
  error: null
  loading: false
}
