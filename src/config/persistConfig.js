import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["posts"],
}

export const persistedReducer = reducers => {
  const persistedReducer = persistReducer(persistConfig, reducers)
  return persistedReducer
}
