import * as React from "react"
import { useSelector } from "react-redux"
import { Redirect, Route, Switch } from "react-router-dom"
import { authSelectors } from "../../states/ducks/auth"
import PrivateRoute from "../components/common/PrivateRoute"
import Login from "../pages/auth"
import AddPost from "../pages/post/AddPost"
import ListPost from "../pages/post/ListPost"
import UpdatePost from "../pages/post/UpdatePost"
import NotFound from "../pages/not-found/NotFound"

const Component: React.FC = () => {
  const user = useSelector(authSelectors.getUser)
  const isAuthenticated: boolean = !!user
  return (
    <Switch>
      <Route path="/login" render={() => (isAuthenticated ? <Redirect to="/" /> : <Login />)} />
      <PrivateRoute exact={true} path="/" component={ListPost} />
      <PrivateRoute exact={true} path="/post" component={ListPost} />
      <PrivateRoute exact={true} path="/post/add" component={AddPost} />
      <PrivateRoute exact={true} path="/post/update/:id" component={UpdatePost} />
      <Route component={NotFound} />
      <Redirect from="/" to={isAuthenticated ? "/post" : "/login"} />
    </Switch>
  )
}

export default Component
