import React from "react"
import { useSelector } from "react-redux"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { authSelectors } from "../../../../states/ducks/auth"

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const user = useSelector(authSelectors.getUser)
  const isAuthenticated: boolean = !!user
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute
