import { TextField } from "@mui/material"
import React, { useState } from "react"

interface Props {
  onChangeText: (query: string) => void
}

const SearchBar: React.FC<Props> = props => {
  const [searchTerm, setSearchTerm] = useState("")

  const onChangeText = (value: string) => {
    setSearchTerm(value)
    props.onChangeText(value)
  }

  return (
    <TextField
      label="Search"
      fullWidth
      variant="outlined"
      value={searchTerm}
      onChange={e => {
        onChangeText(e.target.value)
      }}
      style={{ marginTop: 20 }}
    />
  )
}

export default SearchBar
