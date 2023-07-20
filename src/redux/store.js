// 
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactReducer } from './contactSlice/contactSlice';
import { filterReducer } from './filterSlice/filterSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReduser = combineReducers({
  contacts: contactReducer,
  filter: filterReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

const persistedReducer = persistReducer(persistConfig, rootReduser);

const store = configureStore({
  reducer: persistedReducer,
  
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistedStore = persistStore(store);
export default store;
