import { configureStore } from "@reduxjs/toolkit";
import skillMatchReducer from "./skillMatchSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Use localStorage
};

const persistedReducer = persistReducer(persistConfig, skillMatchReducer);

const store = configureStore({
  reducer: {
    skillMatch: persistedReducer,
  },
  // Ignore non-serializable values in actions
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["register"], // Ignore paths with non-serializable data
      },
    }),
});

export const persistor = persistStore(store); // Create a persistor
export default store;
