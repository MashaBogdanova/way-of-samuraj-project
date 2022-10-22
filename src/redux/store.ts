import React from "react"
import {Action} from "redux"
import {configureStore, combineReducers} from "@reduxjs/toolkit"
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import profileReducer from "./reducers/profileReducer"
import usersReducer from "./reducers/usersReducer"
import authReducer from "./reducers/authReducer"
import chatReducer from "./reducers/chatReducer"
import dialogsSlice from "./reducers/dialogsSlice"
import appSlice from "./reducers/appSlice"
import friendsSlice from "./reducers/friendsSlice";

// для useAppDispatch и useAppSelectors
// export type AppStore = ReturnType<typeof setupStore>
// export type AppDispatch = AppStore['dispatch']

export type stateType = ReturnType<typeof rootReducer>
export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, stateType, unknown, A>
export type baseActionType<T> = T extends {[key:string]: (...args: any[]) => infer U} ? U : never


const rootReducer = combineReducers({
    app: appSlice,
    profilePage: profileReducer,
    usersPage: usersReducer,
    dialogs: dialogsSlice,
    chat: chatReducer,
    auth: authReducer,
    friends: friendsSlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware]
})
