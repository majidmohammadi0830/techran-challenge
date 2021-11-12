import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    userReducer
})

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
