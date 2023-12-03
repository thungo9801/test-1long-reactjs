import { Button, Container, Typography } from "@mui/material"
import React from "react"
import { useHistory } from "react-router-dom"

const NotFound = () => {
  const history = useHistory()
  const goHome = () => {
    history.push("/")
  }
  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        404 - Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        Page does not exist
      </Typography>
      <Button variant="contained" onClick={goHome}>
        Go Home
      </Button>
    </Container>
  )
}

export default NotFound
