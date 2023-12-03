import { Button, Paper, TextField, Typography } from "@mui/material"
import { Field, Form, Formik } from "formik"
import { useSnackbar } from "notistack"
import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import * as Yup from "yup"
import { authOperations } from "../../../states/ducks/auth"
import { rootSelector } from "../../../states/ducks/auth/selectors"

const validationSchema = Yup.object({
  username: Yup.string().required("Please enter username"),
  password: Yup.string().required("Please enter password"),
})

const Login: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { loading } = useSelector(rootSelector)

  const handleLogin = async (values: any) => {
    try {
      dispatch(authOperations.login(values.username, values.password, (error: any, data) => {
        // case login success => show snackbar success and navigate to main screen
        if (data) {
          enqueueSnackbar("Login success", {
            variant: "success",
            autoHideDuration: 2000,
            anchorOrigin: {
              horizontal: "center",
              vertical: "bottom",
            },
          })
          history.push("/")
        }

        // case login failed => show snackbar fail
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
    <Paper elevation={2} sx={{ padding: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h5" component="div" gutterBottom>
        Sign in
      </Typography>
      <Formik
        initialValues={{ username: "kminchelle", password: "0lelplR" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="username"
              as={TextField}
              label="Username"
              variant="outlined"
              margin="normal"
              fullWidth
              error={errors.username && touched.username}
              helperText={errors.username && touched.username ? errors.username : ""}
              sx={{
                "& .Mui-error": {
                  marginLeft: "0px",
                },
              }}
            />
            <Field
              name="password"
              as={TextField}
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              error={errors.password && touched.password}
              helperText={errors.password && touched.password ? errors.password : ""}
              sx={{
                "& .Mui-error": {
                  marginLeft: "0px",
                },
              }}
            />
            <Button disabled={loading} type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  )
}

export default Login
