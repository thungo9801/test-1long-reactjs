import { TextField } from "@mui/material"
import Button from "@mui/material/Button"
import { Field, Form, Formik } from "formik"
import React from "react"
import { styled } from "styled-components"
import * as Yup from "yup"

interface Props {
  title: string
  body: string
  onSubmit: (values: any) => void
  submitButtonTitle?: string
  loading?: boolean
}

// Validate form
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Body is required"),
})

const Space = styled.div`
  height: 32px;
`

const PostForm = (props: Props) => {
  const initialValues = {
    title: props.title || "",
    body: props.body || "",
  }

  const handleSubmit = (values: any, { resetForm, setErrors, setTouched }: any) => {
    props.onSubmit(values)
    resetForm()
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            as={TextField}
            fullWidth
            variant="outlined"
            label="Title"
            disabled={props.loading}
            name="title"
            error={!!errors.title && touched.title}
            helperText={touched.title && errors.title}
          />
          <Space />
          <Field
            as={TextField}
            fullWidth
            multiline
            disabled={props.loading}
            rows={10}
            variant="outlined"
            label="Body"
            name="body"
            error={!!errors.body && touched.body}
            helperText={touched.body && errors.body}
          />
          <Space />
          <Button disabled={props.loading} type="submit" variant="contained" fullWidth size="large">
            {props.submitButtonTitle || "Submit"}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default PostForm
