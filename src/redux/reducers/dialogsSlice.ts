import {DialogType, MessagesType} from "../../types/types"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export type initialStateType = {
    dialog: Array<DialogType>
    messages: Array<MessagesType>
}

const initialState: initialStateType = {
    dialog: [
        {id: 1, name: "Han Solo", lastMessage: '"message"'},
        {id: 2, name: "efremos", lastMessage: '"message"'}
    ],
    messages: [
        {id: 1, message: "I'm not a real message from the server"},
        {id: 2, message: "I'm just an imitation"},
        {id: 3, message: "That's why I won't change"}
    ]
}

const dialogsSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<string>) {
            state.messages.push({
                id: Math.random(),
                message: action.payload
            })
        },
        deleteMessage(state, action: PayloadAction<number>) {
            state.messages = state.messages.filter(m => m.id !== action.payload)
        }
    }
})

export default dialogsSlice.reducer
export const {addMessage, deleteMessage} = dialogsSlice.actions