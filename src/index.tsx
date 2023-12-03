import * as React from "react"
import ReactDOM from "react-dom"
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import * as serviceWorker from "./serviceWorker"
import { store, persistor } from "./states/store"
import App from "./views"
import { ThemeProvider, createTheme } from "@mui/material/styles"

const theme = createTheme()
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ReduxProvider>
  </ThemeProvider>,

  document.getElementById("root") as HTMLElement
)

serviceWorker.unregister()
