import * as React from "react"
import { Route } from "react-router"
import { BrowserRouter, Link } from "react-router-dom"

import { Routes } from "./routers"
import { styled } from "styled-components"
import { SnackbarProvider } from "notistack"

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`

const Component: React.FC = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <div>
          <BodyWrapper>
            <Route path="/" component={Routes} />
          </BodyWrapper>
        </div>
      </BrowserRouter>
    </SnackbarProvider>
  )
}

export default Component
