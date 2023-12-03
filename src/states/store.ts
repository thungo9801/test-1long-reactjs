import { applyMiddleware, combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"
import { persistedReducer } from "../config/persistConfig"
import * as reducers from "./ducks"
import { persistStore } from "redux-persist"
let middleware: any

if (process.env.NODE_ENV !== "production") {
  middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
} else {
  middleware = applyMiddleware(thunkMiddleware)
}

const rootReducer = persistedReducer(combineReducers(reducers as any))

const store = createStore(rootReducer, middleware)

const persistor = persistStore(store)

export { store, persistor }
